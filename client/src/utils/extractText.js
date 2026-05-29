/**
 * Extracts plain text from uploaded resume files.
 * Supports PDF, DOC/DOCX (via Mammoth), and TXT.
 */

async function extractFromPDF(file) {
  // Dynamically import pdfjs to keep initial bundle light
  const pdfjsLib = await import('pdfjs-dist')
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`

  const arrayBuffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

  let fullText = ''
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()
    const pageText = content.items.map(item => item.str).join(' ')
    fullText += pageText + '\n'
  }

  return fullText.trim()
}

async function extractFromDocx(file) {
  const mammoth = await import('mammoth')
  const arrayBuffer = await file.arrayBuffer()
  const result = await mammoth.extractRawText({ arrayBuffer })
  return result.value.trim()
}

async function extractFromTxt(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target.result.trim())
    reader.onerror = () => reject(new Error('Failed to read text file'))
    reader.readAsText(file)
  })
}

export async function extractTextFromFile(file) {
  if (!file) throw new Error('No file provided')

  const type = file.type
  const name = file.name.toLowerCase()

  if (type === 'application/pdf' || name.endsWith('.pdf')) {
    return extractFromPDF(file)
  }

  if (
    type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    name.endsWith('.docx')
  ) {
    return extractFromDocx(file)
  }

  if (type === 'application/msword' || name.endsWith('.doc')) {
    // .doc (legacy) — try mammoth, fallback to text
    try {
      return await extractFromDocx(file)
    } catch {
      return extractFromTxt(file)
    }
  }

  if (type === 'text/plain' || name.endsWith('.txt')) {
    return extractFromTxt(file)
  }

  throw new Error(`Unsupported file type: ${type}`)
}
