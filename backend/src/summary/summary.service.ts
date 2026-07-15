import { gemniModel } from '../config/gemini.config'
import { DocumentSummary } from './summary.types'

export const generateDocumentSummary = async (
  rawText: string,
  documentId: string
): Promise<DocumentSummary> => {
  const prompt = `
    You are a legal document analyst. Analyze the following document and return a JSON object with exactly these fields:
    {
      "summary": "2-3 sentence plain English summary of the document",
      "parties": ["list of parties/companies involved"],
      "keyDates": ["list of important dates mentioned"],
      "keyClauses": ["list of key clauses like payment terms, termination, liability etc"],
      "riskFlags": ["list of any risky or unusual clauses that need attention"]
    }
    
    Return ONLY the JSON object, no markdown, no explanation, nothing else.
    
    Document:
    ${rawText.slice(0, 8000)}
  `

  const result = await gemniModel.generateContent(prompt)
  const responseText = result.response.text()

  try {
    const parsed: DocumentSummary = JSON.parse(responseText)
    return parsed
  } catch {
    return {
      summary: 'Summary could not be generated',
      parties: [],
      keyDates: [],
      keyClauses: [],
      riskFlags: []
    }
  }
}