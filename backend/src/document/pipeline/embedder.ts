import { genAI } from '../../config/gemini.config'

export const generateEmbeddings = async (
  texts: string[]
): Promise<number[][]> => {
  console.log("Batch embedding called with",texts.length,"text");
  const model = genAI.getGenerativeModel({
    model: 'gemini-embedding-001'
  })

  const result = await model.batchEmbedContents({
    requests: texts.map((text) => ({
      content: { parts: [{ text }], role: 'user' },
      model: 'models/gemini-embedding-001'
    }))
  })

  console.log("Batch embedding completed")

  return result.embeddings.map((e) => e.values)
}

export const generateEmbedding = async (text: string): Promise<number[]> => {
  const embeddings = await generateEmbeddings([text])
  return embeddings[0]
}