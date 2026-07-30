
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs'

export const loadPDF = async (buffer: Buffer): Promise<string> => {
  try {
    const uint8Array = new Uint8Array(buffer)

    const loadingTask = pdfjsLib.getDocument({
      data: uint8Array,
      useWorkerFetch: false,
      //isEvalSupported: false,
      useSystemFonts: true,
      disableFontFace: true
    })

    const pdf = await loadingTask.promise

    let fullText = ''

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const content = await page.getTextContent()

      const pageText = content.items
        .map((item: unknown) => {
          const textItem = item as { str: string; hasEOL?: boolean }
          return textItem.hasEOL ? textItem.str + '\n' : textItem.str + ' '
        })
        .join('')

      fullText += pageText + '\n\n'
    }

    const cleanedText = fullText
      .replace(/[ \t]+/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .trim()

    console.log('Extracted text preview:', cleanedText.slice(0, 300))
    return cleanedText

  } catch (error) {
    console.error('PDF loading failed:', error)
    throw new Error('Failed to extract text from PDF')
  }
}