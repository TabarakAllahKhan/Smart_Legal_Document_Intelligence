import prisma from '../../config/prisma.config'
import { TextChunk } from './splitter'

export const storeChunksWithEmbeddings = async (
  documentId: string,
  chunks: TextChunk[],
  embeddings: number[][]
): Promise<void> => {
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i]
    const embedding = embeddings[i]

    // create chunk record
    const createdChunk = await prisma.chunk.create({
      data: {
        documentId,
        content: chunk.content,
        chunkIndex: chunk.chunkIndex
      }
    })

    // store embedding as vector using raw sql
    const embeddingString = `[${embedding.join(',')}]`
    await prisma.$executeRaw`
      UPDATE "Chunk"
      SET embedding = ${embeddingString}::vector
      WHERE id = ${createdChunk.id}
    `
  }
}

export const searchSimilarChunks = async (
  queryEmbedding: number[],
  documentId: string,
  limit: number = 5
): Promise<{ content: string; chunkIndex: number }[]> => {
  const embeddingString = `[${queryEmbedding.join(',')}]`

  const results = await prisma.$queryRaw<{ content: string; chunkIndex: number }[]>
  `
    SELECT content, "chunkIndex"
    FROM "Chunk"
    WHERE "documentId" = ${documentId}
    ORDER BY embedding <=> ${embeddingString}::vector
    LIMIT ${limit}
  `

  return results
}