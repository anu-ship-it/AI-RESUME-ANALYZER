import React, { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

export default function Navbar({ onHome, onGuide, showGuide = true }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <button className={styles.logo} onClick={onHome}>
          <span className={styles.logoMark}>R</span>
          <span className={styles.logoText}>esumeIQ</span>
        </button>

        <div className={styles.actions}>
          {showGuide && (
            <button className={styles.guideBtn} onClick={onGuide}>
              How it works
            </button>
          )}
          <div className={styles.badge}>
            <span className={styles.dot} />
            AI Powered
          </div>
        </div>
      </div>
    </nav>
  )
}
