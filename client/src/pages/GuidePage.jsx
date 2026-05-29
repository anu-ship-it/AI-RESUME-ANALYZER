import React from 'react'
import Navbar from '../components/Navbar.jsx'
import styles from './GuidePage.module.css'
import { ArrowLeft, Upload, Cpu, BarChart3, ArrowRight, CheckCircle } from 'lucide-react'

const STEPS = [
  {
    num: '01',
    icon: Upload,
    title: 'Upload Your Resume',
    desc: 'Drag and drop or click to upload your resume in PDF, DOC, DOCX, or TXT format. Maximum file size is 5MB.',
    bullets: [
      'Supports PDF, DOCX, DOC, TXT',
      'Max 5MB file size',
      'Client-side validation keeps it fast',
      'File is never stored on any server',
    ],
  },
  {
    num: '02',
    icon: Cpu,
    title: 'AI Extracts & Analyzes',
    desc: 'We extract readable text from your file, then send it to Claude AI — which evaluates it like a real ATS system would.',
    bullets: [
      'PDF text extraction via PDF.js',
      'DOCX parsing via Mammoth.js',
      'Powered by Claude Sonnet AI',
      'Evaluates 6 key resume dimensions',
    ],
  },
  {
    num: '03',
    icon: BarChart3,
    title: 'Get Your Results',
    desc: 'Within seconds, you\'ll have an ATS score, keyword analysis, section grades, and specific improvement suggestions.',
    bullets: [
      'ATS compatibility score (0-100)',
      'Overall grade (A+ through F)',
      'Keyword matching & gap analysis',
      'Prioritized improvement suggestions',
    ],
  },
]

const FAQS = [
  {
    q: 'What is an ATS score?',
    a: 'ATS stands for Applicant Tracking System — software companies use to automatically filter resumes before a human even sees them. The score estimates how well your resume passes these filters based on keywords, formatting, and structure.',
  },
  {
    q: 'Is my resume data private?',
    a: 'Yes. Your file is processed entirely in your browser (for parsing) and the extracted text is sent to the AI for analysis. No files are stored on any server. Once you close the tab, everything is gone.',
  },
  {
    q: 'What job description should I paste?',
    a: 'Paste the full job posting you\'re applying for. This helps the AI do targeted keyword matching — showing you exactly which keywords from that specific job are missing from your resume.',
  },
  {
    q: 'Why is my PDF not extracting text?',
    a: 'If your PDF was created by scanning a physical document (instead of being saved directly from Word or another program), it\'s essentially an image — and standard text extraction won\'t work. Convert it to a text-based PDF or use a DOCX version.',
  },
]

export default function GuidePage({ onBack, onGetStarted }) {
  return (
    <div className={styles.page}>
      <Navbar onHome={onBack} showGuide={false} />

      <div className={styles.container}>
        <button className={styles.backBtn} onClick={onBack}>
          <ArrowLeft size={16} />
          Back to home
        </button>

        <div className={styles.pageHeader}>
          <div className={styles.eyebrow}>How It Works</div>
          <h1 className={styles.title}>Three steps to a better resume</h1>
          <p className={styles.desc}>
            No account needed. No waiting. Just upload your resume and get actionable intelligence in seconds.
          </p>
        </div>

        {/* Steps */}
        <div className={styles.steps}>
          {STEPS.map((step, i) => (
            <div key={step.num} className={styles.stepCard} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={styles.stepTop}>
                <div className={styles.stepNum}>{step.num}</div>
                <div className={styles.stepIconBox}>
                  <step.icon size={22} color="var(--accent)" />
                </div>
              </div>
              <h2 className={styles.stepTitle}>{step.title}</h2>
              <p className={styles.stepDesc}>{step.desc}</p>
              <div className={styles.bulletList}>
                {step.bullets.map(b => (
                  <div key={b} className={styles.bullet}>
                    <CheckCircle size={14} color="var(--accent2)" />
                    {b}
                  </div>
                ))}
              </div>
              {i < STEPS.length - 1 && (
                <div className={styles.stepArrow}>
                  <ArrowRight size={20} color="var(--text-muted)" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className={styles.faqSection}>
          <h2 className={styles.faqTitle}>Common Questions</h2>
          <div className={styles.faqGrid}>
            {FAQS.map((faq, i) => (
              <div key={i} className={styles.faqCard}>
                <h3 className={styles.faqQ}>{faq.q}</h3>
                <p className={styles.faqA}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <h2 className={styles.ctaTitle}>Ready to see your score?</h2>
          <button className={styles.primaryBtn} onClick={onGetStarted}>
            Analyze My Resume
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
