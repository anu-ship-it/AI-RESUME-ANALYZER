import React, { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import ScoreRing from '../components/ScoreRing.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import KeywordTag from '../components/KeywordTag.jsx'
import SuggestionCard from '../components/SuggestionCard.jsx'
import styles from './ResultsPage.module.css'
import {
  RotateCcw,
  Upload,
  Star,
  TrendingUp,
  Target,
  Layers,
  Tag,
  MessageSquare,
  Briefcase,
  ChevronRight,
} from 'lucide-react'

function getGradeColor(grade) {
  if (!grade) return 'var(--text-muted)'
  if (grade.startsWith('A')) return 'var(--accent2)'
  if (grade.startsWith('B')) return 'var(--accent)'
  if (grade.startsWith('C')) return '#f59e0b'
  return 'var(--danger)'
}

function getScoreLabel(score) {
  if (score >= 85) return 'Excellent'
  if (score >= 70) return 'Good'
  if (score >= 50) return 'Fair'
  return 'Needs Work'
}

const SECTION_LABELS = {
  contact: 'Contact Info',
  experience: 'Work Experience',
  education: 'Education',
  skills: 'Skills Section',
  formatting: 'Formatting',
  keywords: 'Keyword Density',
}

export default function ResultsPage({ results, fileName, onReset, onAnalyzeAnother }) {
  const [activeTab, setActiveTab] = useState('overview')

  if (!results) {
    return (
      <div className={styles.page}>
        <Navbar onHome={onReset} showGuide={false} />
        <div className={styles.emptyState}>
          <p>No results found. Please analyze a resume first.</p>
          <button className={styles.primaryBtn} onClick={onReset}>Go Home</button>
        </div>
      </div>
    )
  }

  const { atsScore, overallGrade, summary, sectionScores, foundKeywords, missingKeywords, suggestions, topStrengths, jobTitles } = results

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Layers },
    { id: 'keywords', label: 'Keywords', icon: Tag },
    { id: 'suggestions', label: 'Suggestions', icon: MessageSquare },
    { id: 'matches', label: 'Job Matches', icon: Briefcase },
  ]

  return (
    <div className={styles.page}>
      <Navbar onHome={onReset} showGuide={false} />

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.fileChip}>
              <div className={styles.fileDot} />
              {fileName}
            </div>
            <h1 className={styles.title}>Analysis Complete</h1>
            <p className={styles.subtitle}>
              Here's a full breakdown of your resume's ATS performance and areas to improve.
            </p>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.outlineBtn} onClick={onAnalyzeAnother}>
              <Upload size={16} />
              New Resume
            </button>
            <button className={styles.ghostBtn} onClick={onReset}>
              <RotateCcw size={16} />
              Start Over
            </button>
          </div>
        </div>

        {/* Score Hero */}
        <div className={styles.scoreHero}>
          <div className={styles.scoreHeroGlow} />

          <div className={styles.mainScore}>
            <ScoreRing score={atsScore} size={180} strokeWidth={12} label="ATS Score" />
          </div>

          <div className={styles.scoreMeta}>
            <div className={styles.gradeBadge} style={{ color: getGradeColor(overallGrade), borderColor: getGradeColor(overallGrade) + '40', background: getGradeColor(overallGrade) + '10' }}>
              <Star size={14} />
              Grade: {overallGrade}
            </div>
            <div className={styles.scoreStatus} style={{ color: getGradeColor(overallGrade) }}>
              {getScoreLabel(atsScore)}
            </div>
            <p className={styles.summary}>{summary}</p>

            {topStrengths.length > 0 && (
              <div className={styles.strengths}>
                <div className={styles.strengthsLabel}>Top Strengths</div>
                <div className={styles.strengthsList}>
                  {topStrengths.map((s, i) => (
                    <div key={i} className={styles.strengthItem}>
                      <TrendingUp size={13} color="var(--accent2)" />
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          {tabs.map(t => (
            <button
              key={t.id}
              className={`${styles.tab} ${activeTab === t.id ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              <t.icon size={15} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className={styles.tabContent}>

          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <div className={styles.overviewGrid}>
              {/* Section Scores */}
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <Target size={16} color="var(--accent)" />
                  <h2 className={styles.cardTitle}>Section Breakdown</h2>
                </div>
                <div className={styles.progressList}>
                  {Object.entries(sectionScores).map(([key, val]) => (
                    <ProgressBar
                      key={key}
                      label={SECTION_LABELS[key] || key}
                      value={val}
                    />
                  ))}
                </div>
              </div>

              {/* Mini keyword preview */}
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <Tag size={16} color="var(--accent)" />
                  <h2 className={styles.cardTitle}>Keyword Snapshot</h2>
                </div>
                <div className={styles.kwMini}>
                  <div className={styles.kwMiniRow}>
                    <span className={styles.kwMiniLabel} style={{ color: 'var(--accent2)' }}>
                      Found ({foundKeywords.length})
                    </span>
                    <div className={styles.kwTags}>
                      {foundKeywords.slice(0, 6).map(kw => (
                        <KeywordTag key={kw} word={kw} found />
                      ))}
                      {foundKeywords.length > 6 && (
                        <button className={styles.moreBtn} onClick={() => setActiveTab('keywords')}>
                          +{foundKeywords.length - 6} more <ChevronRight size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className={styles.kwDivider} />
                  <div className={styles.kwMiniRow}>
                    <span className={styles.kwMiniLabel} style={{ color: 'var(--danger)' }}>
                      Missing ({missingKeywords.length})
                    </span>
                    <div className={styles.kwTags}>
                      {missingKeywords.slice(0, 6).map(kw => (
                        <KeywordTag key={kw} word={kw} found={false} />
                      ))}
                      {missingKeywords.length > 6 && (
                        <button className={styles.moreBtn} onClick={() => setActiveTab('keywords')}>
                          +{missingKeywords.length - 6} more <ChevronRight size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* KEYWORDS */}
          {activeTab === 'keywords' && (
            <div className={styles.keywordsView}>
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.kwDot} style={{ background: 'var(--accent2)' }} />
                  <h2 className={styles.cardTitle}>Keywords Found in Resume</h2>
                  <span className={styles.countBadge} style={{ color: 'var(--accent2)', background: 'var(--accent2-dim)' }}>
                    {foundKeywords.length}
                  </span>
                </div>
                <p className={styles.cardDesc}>
                  These keywords are present in your resume and will be picked up by ATS systems.
                </p>
                <div className={styles.kwCloud}>
                  {foundKeywords.map(kw => (
                    <KeywordTag key={kw} word={kw} found />
                  ))}
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.kwDot} style={{ background: 'var(--danger)' }} />
                  <h2 className={styles.cardTitle}>Keywords to Add</h2>
                  <span className={styles.countBadge} style={{ color: 'var(--danger)', background: 'var(--danger-dim)' }}>
                    {missingKeywords.length}
                  </span>
                </div>
                <p className={styles.cardDesc}>
                  Adding these keywords will significantly improve your ATS score and visibility to recruiters.
                </p>
                <div className={styles.kwCloud}>
                  {missingKeywords.map(kw => (
                    <KeywordTag key={kw} word={kw} found={false} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SUGGESTIONS */}
          {activeTab === 'suggestions' && (
            <div className={styles.suggestionsView}>
              <div className={styles.suggestionsHeader}>
                <div className={styles.typeLegend}>
                  <span className={styles.legendItem} style={{ color: 'var(--danger)' }}>
                    <span className={styles.legendDot} style={{ background: 'var(--danger)' }} />
                    Critical
                  </span>
                  <span className={styles.legendItem} style={{ color: 'var(--accent)' }}>
                    <span className={styles.legendDot} style={{ background: 'var(--accent)' }} />
                    Improvement
                  </span>
                  <span className={styles.legendItem} style={{ color: 'var(--accent2)' }}>
                    <span className={styles.legendDot} style={{ background: 'var(--accent2)' }} />
                    Positive
                  </span>
                </div>
              </div>

              <div className={styles.suggestionsList}>
                {suggestions.map((s, i) => (
                  <SuggestionCard
                    key={i}
                    type={s.type}
                    title={s.title}
                    detail={s.detail}
                    index={i}
                  />
                ))}
                {suggestions.length === 0 && (
                  <p className={styles.emptyTab}>No suggestions generated. Your resume looks great!</p>
                )}
              </div>
            </div>
          )}

          {/* JOB MATCHES */}
          {activeTab === 'matches' && (
            <div className={styles.matchesView}>
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <Briefcase size={16} color="var(--accent)" />
                  <h2 className={styles.cardTitle}>Suitable Job Titles</h2>
                </div>
                <p className={styles.cardDesc}>
                  Based on your skills and experience, these roles are the strongest matches for your profile.
                </p>
                <div className={styles.jobList}>
                  {jobTitles.map((title, i) => (
                    <div key={i} className={styles.jobCard}>
                      <div className={styles.jobNum}>{String(i + 1).padStart(2, '0')}</div>
                      <div className={styles.jobInfo}>
                        <div className={styles.jobTitle}>{title}</div>
                      </div>
                      <ChevronRight size={16} color="var(--text-muted)" />
                    </div>
                  ))}
                  {jobTitles.length === 0 && (
                    <p className={styles.emptyTab}>Could not determine suitable job titles from your resume.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className={styles.bottomCta}>
          <button className={styles.primaryBtn} onClick={onAnalyzeAnother}>
            <Upload size={16} />
            Analyze Another Resume
          </button>
        </div>
      </div>
    </div>
  )
}
