import React, { useEffect, useRef } from 'react'
import styles from './ProgressBar.module.css'

function getColor(value) {
  if (value >= 80) return 'var(--accent2)'
  if (value >= 60) return 'var(--accent)'
  return 'var(--danger)'
}

export default function ProgressBar({ label, value = 0, showValue = true, color }) {
  const barRef = useRef(null)
  const barColor = color || getColor(value)

  useEffect(() => {
    const el = barRef.current
    if (!el) return
    // Animate on mount
    el.style.width = '0%'
    const timeout = setTimeout(() => {
      el.style.width = `${Math.min(100, Math.max(0, value))}%`
    }, 50)
    return () => clearTimeout(timeout)
  }, [value])

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        {showValue && (
          <span className={styles.value} style={{ color: barColor }}>
            {value}%
          </span>
        )}
      </div>
      <div className={styles.track}>
        <div
          ref={barRef}
          className={styles.fill}
          style={{
            backgroundColor: barColor,
            boxShadow: `0 0 8px ${barColor}80`,
          }}
        />
      </div>
    </div>
  )
}
