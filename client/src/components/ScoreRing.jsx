import React, { useEffect, useState } from 'react'
import styles from './ScoreRing.module.css'

function getColor(score) {
  if (score >= 80) return 'var(--accent2)'
  if (score >= 60) return 'var(--accent)'
  return 'var(--danger)'
}

export default function ScoreRing({
  score = 0,
  size = 160,
  strokeWidth = 10,
  label = 'Score',
  animate = true,
}) {
  const [displayed, setDisplayed] = useState(animate ? 0 : score)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (displayed / 100) * circumference
  const color = getColor(score)
  const fontSize = size > 120 ? size * 0.22 : size * 0.26

  useEffect(() => {
    if (!animate) return
    const timer = setTimeout(() => setDisplayed(score), 100)
    return () => clearTimeout(timer)
  }, [score, animate])

  return (
    <div className={styles.wrapper}>
      <div className={styles.ring} style={{ width: size, height: size }}>
        <svg
          className={styles.svg}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <circle
            className={styles.trackCircle}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <circle
            className={styles.progressCircle}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            stroke={color}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            filter={score > 0 ? 'url(#glow)' : undefined}
          />
        </svg>
        <div className={styles.center}>
          <span
            className={styles.scoreVal}
            style={{ fontSize, color }}
          >
            {displayed}
          </span>
          <span className={styles.scoreLabel}>/100</span>
        </div>
      </div>
      {label && <div className={styles.label}>{label}</div>}
    </div>
  )
}
