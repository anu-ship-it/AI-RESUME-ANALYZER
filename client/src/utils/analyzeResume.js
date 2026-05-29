/**
 * Sends resume text to Claude AI for structured analysis.
 * Returns a structured JSON result with ATS score, keywords,
 * section scores, and actionable suggestions.
 */

const SYSTEM_PROMPT = `You are an expert ATS (Applicant Tracking System) analyst and career coach with 15+ years of experience reviewing resumes across all industries.

Analyze the given resume text and respond ONLY with a valid JSON object — no preamble, no markdown, no explanation.

Return this exact structure:
{
  "atsScore": <number 0-100>,
  "overallGrade": "<A+|A|B+|B|C+|C|D|F>",
  "summary": "<2-3 sentence executive summary of the resume strengths and main opportunities>",
  "sectionScores": {
    "contact": <0-100>,
    "experience": <0-100>,
    "education": <0-100>,
    "skills": <0-100>,
    "formatting": <0-100>,
    "keywords": <0-100>
  },
  "foundKeywords": ["<word>"],
  "missingKeywords": ["<word>"],
  "suggestions": [
    {
      "type": "critical|improvement|positive",
      "title": "<short actionable title max 80 chars>",
      "detail": "<1-2 sentence specific explanation>"
    }
  ],
  "topStrengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "jobTitles": ["<suitable job title 1>", "<suitable job title 2>", "<suitable job title 3>"]
}

Rules:
- atsScore reflects actual ATS compatibility (keyword density, formatting, section headers)
- foundKeywords: list 8-15 strong keywords actually present in the resume
- missingKeywords: list 6-10 high-value keywords that would strengthen the resume for common roles implied by the content
- suggestions: 6-10 items, mix of all three types; at least 1 positive; order by priority
- Be specific, actionable, and industry-aware
- Never fabricate experience; only analyze what is in the text`

export async function analyzeResume(resumeText) {
  if (!resumeText || resumeText.trim().length < 50) {
    throw new Error('Resume text is too short to analyze.')
  }

  const response = await fetch('http://localhost:5000/api/analyze-resume', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ resumeText }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Failed to analyze resume')
  }

  return data
}

function normalizeResults(raw) {
  return {
    atsScore: clamp(raw.atsScore ?? 50, 0, 100),
    overallGrade: raw.overallGrade ?? 'C',
    summary: raw.summary ?? 'Analysis complete.',
    sectionScores: {
      contact: clamp(raw.sectionScores?.contact ?? 50, 0, 100),
      experience: clamp(raw.sectionScores?.experience ?? 50, 0, 100),
      education: clamp(raw.sectionScores?.education ?? 50, 0, 100),
      skills: clamp(raw.sectionScores?.skills ?? 50, 0, 100),
      formatting: clamp(raw.sectionScores?.formatting ?? 50, 0, 100),
      keywords: clamp(raw.sectionScores?.keywords ?? 50, 0, 100),
    },
    foundKeywords: Array.isArray(raw.foundKeywords) ? raw.foundKeywords.slice(0, 20) : [],
    missingKeywords: Array.isArray(raw.missingKeywords) ? raw.missingKeywords.slice(0, 15) : [],
    suggestions: Array.isArray(raw.suggestions)
      ? raw.suggestions.slice(0, 10).map(s => ({
          type: ['critical', 'improvement', 'positive'].includes(s.type) ? s.type : 'improvement',
          title: s.title ?? 'Suggestion',
          detail: s.detail ?? '',
        }))
      : [],
    topStrengths: Array.isArray(raw.topStrengths) ? raw.topStrengths.slice(0, 5) : [],
    jobTitles: Array.isArray(raw.jobTitles) ? raw.jobTitles.slice(0, 5) : [],
  }
}

function clamp(val, min, max) {
  return Math.min(max, Math.max(min, Number(val) || 0))
}
