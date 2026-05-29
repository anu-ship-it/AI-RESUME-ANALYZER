import express from 'express'
app.use(express.json({ limit: '5mb' }))

const anthropic = new Anthropic({
  apiKey: process.env.GEMINI_API_KEY,
})

const SYSTEM_PROMPT = `YOUR FULL SYSTEM PROMPT HERE`

app.post('/api/analyze-resume', async (req, res) => {
  try {
    const { resumeText } = req.body

    if (!resumeText || resumeText.length < 50) {
      return res.status(400).json({
        error: 'Resume text too short',
      })
    }

    const truncated = resumeText.slice(0, 6000)

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Please analyze this resume:\n\n${truncated}`,
        },
      ],
    })

    const rawText = response.content
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('')

    const cleaned = rawText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim()

    const parsed = JSON.parse(cleaned)

    res.json(parsed)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: error.message || 'Internal server error',
    })
  }
})

app.listen(5000, () => {
  console.log('Server running on port 5000')
})