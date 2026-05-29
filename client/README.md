# ResumeIQ — AI Resume Analyzer

A responsive AI-powered resume analyzer built with React + Vite. Upload your resume and get real-time ATS scoring, keyword analysis, section grades, and improvement suggestions — powered by Claude AI.

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```

Then open `http://localhost:5173` in your browser.

### 3. Build for production
```bash
npm run build
```

---

## Project Structure

```
src/
├── components/          # Reusable UI pieces
│   ├── Navbar           # Top navigation bar
│   ├── UploadZone       # Drag-and-drop file upload
│   ├── ScoreRing        # Circular SVG score display
│   ├── ProgressBar      # Animated bar for section scores
│   ├── KeywordTag       # Found/missing keyword pills
│   └── SuggestionCard   # Expandable suggestion items
│
├── pages/               # Full page views
│   ├── LandingPage      # Homepage with hero and features
│   ├── AnalyzerPage     # Upload flow and loading state
│   ├── ResultsPage      # Dashboard with all analysis data
│   └── GuidePage        # How it works + FAQ
│
├── utils/
│   ├── extractText.js   # PDF/DOCX/TXT text extraction
│   └── analyzeResume.js # Claude AI API integration
│
├── styles/
│   └── global.css       # Design tokens and base styles
│
├── App.jsx              # Page routing and state management
└── main.jsx             # React entry point
```

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI components and state |
| Vite | Build tool and dev server |
| PDF.js | Extracting text from PDF files |
| Mammoth.js | Extracting text from DOCX files |
| Claude API | AI-powered resume analysis |
| CSS Modules | Scoped, collision-free styling |

---

## Features

- **File Upload**: Drag-and-drop or click-to-browse with client-side validation
- **Multi-format Support**: PDF, DOCX, DOC, TXT
- **Job Description Input**: Optional field for targeted keyword matching
- **ATS Score**: 0-100 compatibility rating with letter grade
- **Section Breakdown**: Scores for Contact, Experience, Education, Skills, Formatting, Keywords
- **Keyword Analysis**: Found keywords vs. missing keywords
- **AI Suggestions**: Prioritized critical/improvement/positive feedback
- **Job Title Matches**: Suitable roles based on your profile
- **Fully Responsive**: Mobile, tablet, desktop

---

## Notes

- No file storage — resumes are processed in the browser and never saved
- The AI analysis uses `claude-sonnet-4-20250514` via the Anthropic API
- The API key is handled by the Claude.ai artifact environment (no key needed in development)
