import React, { useState } from 'react'
import { ChevronDown, AlertTriangle, Lightbulb, CheckCircle2 } from 'lucide-react'
import styles from './SuggestionCard.module.css'

const ICONS = {
  critical: { icon: AlertTriangle, color: 'var(--danger)' },
  improvement: { icon: Lightbulb, color: 'var(--accent)' },
  positive: { icon: CheckCircle2, color: 'var(--accent2)' },
}

export default function SuggestionCard({ type = 'improvement', title, detail, index = 0 }) {
  const [open, setOpen] = useState(false)
  const { icon: Icon, color } = ICONS[type] || ICONS.improvement

  return (
    <div
      className={`${styles.card} ${styles[type]}`}
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      <button className={styles.header} onClick={() => setOpen(o => !o)}>
        <div className={styles.left}>
          <div className={styles.iconBox} style={{ background: `${color}18`, border: `1px solid ${color}33` }}>
            <Icon size={16} color={color} />
          </div>
          <span className={styles.title}>{title}</span>
        </div>
        <ChevronDown
          size={16}
          className={`${styles.chevron} ${open ? styles.open : ''}`}
          color="var(--text-muted)"
        />
      </button>

      {open && detail && (
        <div className={styles.detail}>
          <p>{detail}</p>
        </div>
      )}
    </div>
  )
}
