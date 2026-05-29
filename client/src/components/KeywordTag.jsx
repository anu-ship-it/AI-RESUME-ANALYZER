import React from 'react'
import styles from './KeywordTag.module.css'

export default function KeywordTag({ word, found = false }) {
  return (
    <span className={`${styles.tag} ${found ? styles.found : styles.missing}`}>
      {found && <span className={styles.dot} />}
      {word}
    </span>
  )
}
