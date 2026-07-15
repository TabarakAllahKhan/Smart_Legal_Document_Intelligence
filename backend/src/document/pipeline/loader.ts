import pdfParse from 'pdf-parse'

export const loadPDF = async (buffer: Buffer): Promise<string> => {
  const data = await pdfParse(buffer)
  
  // clean up spacing issues from pdf parsing
  const cleanedText = data.text
    .replace(/([a-z])([A-Z])/g, '$1 $2')  // add space between camelCase
    .replace(/\n{3,}/g, '\n\n')             // remove excessive newlines
    .trim()
  
  return cleanedText
}