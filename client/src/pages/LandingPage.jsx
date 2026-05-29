import React, { useEffect, useRef } from 'react'
import Navbar from '../components/Navbar.jsx'
import styles from './LandingPage.module.css'
import { ArrowRight, Zap, Shield, BarChart3, FileSearch, Star } from 'lucide-react'

const FEATURES = [
  {
    icon: FileSearch,
    title: 'ATS Score Analysis',
    desc: 'Get a precise compatibility score showing how well your resume passes automated screening systems.',
  },
  {
    icon: BarChart3,
    title: 'Section-by-Section Breakdown',
    desc: 'Detailed scoring across Contact, Experience, Education, Skills, Formatting, and Keywords.',
  },
  {
    icon: Zap,
    title: 'Keyword Matching',
    desc: 'Identify the exact keywords that ATS systems look for — and which ones you\'re missing.',
  },
  {
    icon: Shield,
    title: 'Actionable Suggestions',
    desc: 'Receive prioritized, specific improvements — not vague tips. Know exactly what to fix.',
  },
]

const STATS = [
  { value: '98%', label: 'ATS Accuracy' },
  { value: '<30s', label: 'Analysis Time' },
  { value: '10+', label: 'Score Metrics' },
  { value: 'Free', label: 'Always' },
]

export default function LandingPage({ onGetStarted, onGuide }) {
  const heroRef = useRef(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      el.style.setProperty('--mouse-x', `${x}%`)
      el.style.setProperty('--mouse-y', `${y}%`)
    }
    el.addEventListener('mousemove', handleMouseMove)
    return () => el.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className={styles.page}>
      <Navbar onHome={() => {}} onGuide={onGuide} />

      {/* Hero */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.heroGlow} />
        <div className={styles.heroGrid} />

        <div className={styles.heroContent}>
          <div className={styles.eyebrow}>
            <Star size={12} />
            AI-Powered Resume Intelligence
          </div>

          <h1 className={styles.headline}>
            Know exactly why<br />
            <span className={styles.highlight}>your resume fails</span><br />
            ATS systems.
          </h1>

          <p className={styles.subheadline}>
            Upload your resume and get a real-time AI analysis — ATS score,
            keyword gaps, section grades, and specific improvements in under 30 seconds.
          </p>

          <div className={styles.heroActions}>
            <button className={styles.primaryBtn} onClick={onGetStarted}>
              Analyze My Resume
              <ArrowRight size={18} />
            </button>
            <button className={styles.secondaryBtn} onClick={onGuide}>
              How it works
            </button>
          </div>

          <div className={styles.stats}>
            {STATS.map(s => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Floating card preview */}
        <div className={styles.heroCard}>
          <div className={styles.cardInner}>
            <div className={styles.cardHeader}>
              <div className={styles.cardDots}>
                <span /><span /><span />
              </div>
              <span className={styles.cardTitle}>resume_analysis.json</span>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.codeLine}>
                <span className={styles.codeKey}>"atsScore"</span>
                <span className={styles.codeColon}>:</span>
                <span className={styles.codeNum}> 84</span>
                <span className={styles.codeDim}>,</span>
              </div>
              <div className={styles.codeLine}>
                <span className={styles.codeKey}>"grade"</span>
                <span className={styles.codeColon}>:</span>
                <span className={styles.codeStr}> "B+"</span>
                <span className={styles.codeDim}>,</span>
              </div>
              <div className={styles.codeLine}>
                <span className={styles.codeKey}>"keywords"</span>
                <span className={styles.codeColon}>:</span>
                <span className={styles.codeNum}> 12</span>
                <span className={styles.codeDim}> found,</span>
              </div>
              <div className={styles.codeLine}>
                <span className={styles.codeKey}>"missing"</span>
                <span className={styles.codeColon}>:</span>
                <span className={styles.codeDanger}> 6</span>
                <span className={styles.codeDim}>,</span>
              </div>
              <div className={styles.codeLine}>
                <span className={styles.codeKey}>"suggestions"</span>
                <span className={styles.codeColon}>:</span>
                <span className={styles.codeNum}> 8</span>
                <span className={styles.codeDim}> items</span>
              </div>
            </div>
            <div className={styles.cardScore}>
              <div className={styles.scoreBar}>
                <div className={styles.scoreFill} />
              </div>
              <span className={styles.scoreLabel}>ATS Compatibility: Strong</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={styles.features}>
        <div className={styles.container}>
          <div className={styles.sectionLabel}>What you get</div>
          <h2 className={styles.sectionTitle}>
            Every metric that matters
          </h2>

          <div className={styles.featuresGrid}>
            {FEATURES.map((f, i) => (
              <div key={f.title} className={styles.featureCard} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={styles.featureIcon}>
                  <f.icon size={22} color="var(--accent)" />
                </div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaBox}>
            <div className={styles.ctaGlow} />
            <h2 className={styles.ctaTitle}>Ready to fix your resume?</h2>
            <p className={styles.ctaDesc}>
              Upload once. Get insights that took recruiters years to learn.
            </p>
            <button className={styles.primaryBtn} onClick={onGetStarted}>
              Start Free Analysis
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <span className={styles.footerLogo}>
            <span style={{ color: 'var(--accent)' }}>R</span>esumeIQ
          </span>
          <span className={styles.footerNote}>
            Built with React · Powered by Claude AI
          </span>
        </div>
      </footer>
    </div>
  )
}
