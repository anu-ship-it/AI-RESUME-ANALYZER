import React, { useState, useCallback } from 'react'
import Navbar from '../components/Navbar.jsx'
import UploadZone from '../components/UploadZone.jsx'
import { extractTextFromFile } from '../utils/extractText.js'
import { analyzeResume } from '../utils/analyzeResume.js'
import styles from './AnalyzerPage.module.css'
import { ArrowLeft, Sparkles, ChevronRight, AlertCircle, Loader } from 'lucide-react'

const STEPS = [
  { id: 1, label: 'Upload Resume' },
  { id: 2, label: 'Analyze' },
  { id: 3, label: 'Results' },
]

const LOADING_MESSAGES = [
  'Parsing your resume...',
  'Running ATS simulation...',
  'Analyzing keyword density...',
  'Scoring each section...',
  'Generating improvement suggestions...',
  'Finalizing your report...',
]

export default function AnalyzerPage({ onBack, onComplete }) {
  const [file, setFile] = useState(null)
  const [jobDescription, setJobDescription] = useState('')
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [loadingMsg, setLoadingMsg] = useState('')
  const [error, setError] = useState('')

  const handleFileSelect = useCallback((f) => {
    setFile(f)
    setError('')
  }, [])

  const handleRemoveFile = useCallback(() => {
    setFile(null)
  }, [])

  const handleAnalyze = useCallback(async () => {
    if (!file) {
      setError('Please upload your resume first.')
      return
    }

    setLoading(true)
    setError('')
    setStep(2)

    // Cycle through loading messages
    let msgIdx = 0
    setLoadingMsg(LOADING_MESSAGES[0])
    const msgInterval = setInterval(() => {
      msgIdx = (msgIdx + 1) % LOADING_MESSAGES.length
      setLoadingMsg(LOADING_MESSAGES[msgIdx])
    }, 2200)

    try {
      const text = await extractTextFromFile(file)

      if (!text || text.trim().length < 50) {
        throw new Error(
          'Could not extract readable text from this file. Make sure it\'s not a scanned image or a locked PDF.'
        )
      }

      const combinedText = jobDescription.trim()
        ? `RESUME:\n${text}\n\nJOB DESCRIPTION (for context):\n${jobDescription}`
        : text

      const results = await analyzeResume(combinedText)
      clearInterval(msgInterval)
      onComplete(results, text, file.name)
    } catch (err) {
      clearInterval(msgInterval)
      setLoading(false)
      setStep(1)
      setError(err.message || 'Something went wrong. Please try again.')
    }
  }, [file, jobDescription, onComplete])

  return (
    <div className={styles.page}>
      <Navbar onHome={onBack} showGuide={false} />

      <div className={styles.container}>
        {/* Back */}
        <button className={styles.backBtn} onClick={onBack}>
          <ArrowLeft size={16} />
          Back to home
        </button>

        {/* Steps indicator */}
        <div className={styles.steps}>
          {STEPS.map((s, i) => (
            <React.Fragment key={s.id}>
              <div className={`${styles.stepItem} ${step >= s.id ? styles.active : ''} ${step > s.id ? styles.done : ''}`}>
                <div className={styles.stepNum}>
                  {step > s.id ? '✓' : s.id}
                </div>
                <span className={styles.stepLabel}>{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`${styles.stepLine} ${step > s.id ? styles.doneLine : ''}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Main content */}
        {loading ? (
          <div className={styles.loadingState}>
            <div className={styles.spinner}>
              <div className={styles.spinnerRing} />
              <Sparkles size={24} color="var(--accent)" className={styles.spinnerIcon} />
            </div>
            <h2 className={styles.loadingTitle}>Analyzing your resume</h2>
            <p className={styles.loadingMsg}>{loadingMsg}</p>
            <div className={styles.loadingDots}>
              <span /><span /><span />
            </div>
          </div>
        ) : (
          <div className={styles.content}>
            <div className={styles.pageHeader}>
              <h1 className={styles.title}>Upload your resume</h1>
              <p className={styles.desc}>
                We'll extract the text and run a full ATS analysis powered by AI.
                Your file is processed securely and never stored.
              </p>
            </div>

            <div className={styles.uploadSection}>
              <UploadZone
                file={file}
                onFileSelect={handleFileSelect}
                onRemove={handleRemoveFile}
              />
            </div>

            <div className={styles.jdSection}>
              <label className={styles.jdLabel}>
                <span className={styles.jdLabelText}>Job Description</span>
                <span className={styles.jdOptional}>Optional — improves keyword matching</span>
              </label>
              <textarea
                className={styles.jdTextarea}
                placeholder="Paste the job description here to get targeted keyword analysis and role-specific suggestions..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={5}
              />
            </div>

            {error && (
              <div className={styles.errorBanner}>
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <button
              className={styles.analyzeBtn}
              onClick={handleAnalyze}
              disabled={!file || loading}
            >
              <Sparkles size={18} />
              Analyze Resume
              <ChevronRight size={18} />
            </button>

            <p className={styles.disclaimer}>
              Your resume is analyzed securely. No files are stored on our servers.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
