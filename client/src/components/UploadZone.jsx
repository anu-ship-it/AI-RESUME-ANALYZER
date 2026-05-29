import React, { useState, useRef, useCallback } from 'react'
import { Upload, FileText, X, AlertCircle, CheckCircle } from 'lucide-react'
import styles from './UploadZone.module.css'

const ACCEPTED_TYPES = {
  'application/pdf': 'pdf',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'text/plain': 'txt',
}

const MAX_SIZE_MB = 5

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

export default function UploadZone({ onFileSelect, file, onRemove }) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  const validateFile = useCallback((f) => {
    if (!f) return 'No file selected.'
    if (!ACCEPTED_TYPES[f.type]) {
      return `File type not supported. Please upload PDF, DOC, DOCX, or TXT.`
    }
    if (f.size > MAX_SIZE_MB * 1024 * 1024) {
      return `File too large. Maximum size is ${MAX_SIZE_MB}MB.`
    }
    return null
  }, [])

  const handleFile = useCallback((f) => {
    const err = validateFile(f)
    if (err) {
      setError(err)
      return
    }
    setError('')
    onFileSelect(f)
  }, [validateFile, onFileSelect])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) handleFile(f)
  }, [handleFile])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragging(false)
    }
  }, [])

  const handleInputChange = useCallback((e) => {
    const f = e.target.files[0]
    if (f) handleFile(f)
    e.target.value = ''
  }, [handleFile])

  const handleRemove = useCallback((e) => {
    e.stopPropagation()
    setError('')
    onRemove()
  }, [onRemove])

  const dropzoneClass = [
    styles.dropzone,
    isDragging ? styles.active : '',
    file ? styles.hasFile : '',
    error ? styles.error : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={styles.wrapper}>
      <div
        className={dropzoneClass}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !file && inputRef.current?.click()}
      >
        {!file && (
          <input
            ref={inputRef}
            type="file"
            className={styles.hiddenInput}
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleInputChange}
          />
        )}

        <div className={styles.content}>
          {file ? (
            <>
              <div className={styles.iconWrapper}>
                <CheckCircle size={32} color="var(--accent2)" />
              </div>
              <div className={styles.title}>Resume Ready</div>
              <p className={styles.subtitle}>
                Your file has been uploaded successfully.
              </p>
            </>
          ) : (
            <>
              <div className={styles.iconWrapper}>
                <Upload size={32} className={styles.icon} />
              </div>
              <div className={styles.title}>
                {isDragging ? 'Drop it here' : 'Upload your resume'}
              </div>
              <p className={styles.subtitle}>
                Drag & drop or <span>click to browse</span>.<br />
                Max {MAX_SIZE_MB}MB per file.
              </p>
              <div className={styles.formats}>
                {['PDF', 'DOC', 'DOCX', 'TXT'].map(fmt => (
                  <span key={fmt} className={styles.formatTag}>{fmt}</span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {file && (
        <div className={styles.filePreview}>
          <div className={styles.fileIconWrapper}>
            <FileText size={20} color="var(--accent2)" />
          </div>
          <div className={styles.fileInfo}>
            <div className={styles.fileName}>{file.name}</div>
            <div className={styles.fileSize}>{formatBytes(file.size)}</div>
          </div>
          <button
            className={styles.removeBtn}
            onClick={handleRemove}
            title="Remove file"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {error && (
        <div className={styles.errorMsg}>
          <AlertCircle size={16} />
          {error}
        </div>
      )}
    </div>
  )
}
