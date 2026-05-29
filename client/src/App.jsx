import React, { useState } from 'react'
import LandingPage from './pages/LandingPage.jsx'
import AnalyzerPage from './pages/AnalyzerPage.jsx'
import ResultsPage from './pages/ResultsPage.jsx'
import GuidePage from './pages/GuidePage.jsx'

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing') // 'landing' | 'analyzer' | 'results' | 'guide'
  const [analysisResults, setAnalysisResults] = useState(null)
  const [resumeText, setResumeText] = useState('')
  const [fileName, setFileName] = useState('')

  const navigate = (page) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setCurrentPage(page)
  }

  const handleAnalysisComplete = (results, text, name) => {
    setAnalysisResults(results)
    setResumeText(text)
    setFileName(name)
    navigate('results')
  }

  const handleReset = () => {
    setAnalysisResults(null)
    setResumeText('')
    setFileName('')
    navigate('landing')
  }

  return (
    <>
      {currentPage === 'landing' && (
        <LandingPage
          onGetStarted={() => navigate('analyzer')}
          onGuide={() => navigate('guide')}
        />
      )}
      {currentPage === 'analyzer' && (
        <AnalyzerPage
          onBack={() => navigate('landing')}
          onComplete={handleAnalysisComplete}
        />
      )}
      {currentPage === 'results' && (
        <ResultsPage
          results={analysisResults}
          fileName={fileName}
          onReset={handleReset}
          onAnalyzeAnother={() => navigate('analyzer')}
        />
      )}
      {currentPage === 'guide' && (
        <GuidePage
          onBack={() => navigate('landing')}
          onGetStarted={() => navigate('analyzer')}
        />
      )}
    </>
  )
}
