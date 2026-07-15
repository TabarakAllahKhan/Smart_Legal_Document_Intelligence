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
    
    Return ONLY the JSON object. No markdown, no backticks, no explanation, nothing else. Just the raw JSON.
    
    Document:
    ${rawText.slice(0, 3000)}
  `

  try {
    const result = await gemniModel.generateContent(prompt)
    const responseText = result.response.text()

    console.log('Gemini raw response:', responseText)

    // strip markdown code blocks if present
    const cleanedResponse = responseText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim()

    const parsed: DocumentSummary = JSON.parse(cleanedResponse)
    return parsed

  } catch (error) {
    console.error('Summary generation failed:', error)
    return {
      summary: 'Summary could not be generated',
      parties: [],
      keyDates: [],
      keyClauses: [],
      riskFlags: []
    }
  }
}