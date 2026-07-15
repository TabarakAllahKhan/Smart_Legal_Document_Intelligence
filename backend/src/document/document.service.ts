import prisma from "../config/prisma.config";
import { loadPDF } from "./pipeline/loader";
import { splitText } from "./pipeline/splitter";
import { generateEmbedding } from "./pipeline/embedder";
import { storeChunksWithEmbeddings } from "./pipeline/vectorstore";
import { DocumentUploadResponse } from "./document.types";
import { generateDocumentSummary } from "../summary/summary.service";

export const uploadDocument = async (
  userId: string,
  file: Express.Multer.File
): Promise<DocumentUploadResponse> => {
  // create document record
  const document = await prisma.document.create({
    data: {
      userId,
      filename: file.fieldname,
      originalName: file.originalname  // fixed typo here
    }
  })

  // load pdf text
  const rawText = await loadPDF(file.buffer)

  // split into chunks
  const chunks = await splitText(rawText)

  // generate embeddings
  const embeddings = await Promise.all(
    chunks.map((c) => generateEmbedding(c.content))
  )

  // store chunks with embeddings
  await storeChunksWithEmbeddings(document.id, chunks, embeddings)

  // generate auto summary
  const summaryResult = await generateDocumentSummary(rawText, document.id)

  // update document with summary fields
  const updatedDocument = await prisma.document.update({
    where: { id: document.id },
    data: {
      summary: summaryResult.summary,
      parties: summaryResult.parties,
      keyDates: summaryResult.keyDates,
      keyClauses: summaryResult.keyClauses,
      riskFlags: summaryResult.riskFlags
    }
  })

  // return the response
  return {
    document: updatedDocument,
    summary: summaryResult.summary,
    parties: summaryResult.parties,
    keyDates: summaryResult.keyDates,
    keyClauses: summaryResult.keyClauses,
    riskFlags: summaryResult.riskFlags
  }
}

export const getUserDocuments = async (userId: string) => {
  return prisma.document.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  })
}

export const getDocumentById = async (
  documentId: string,
  userId: string
) => {
  return prisma.document.findFirst({
    where: { id: documentId, userId }
  })
}

export const deleteDocument = async (
  documentId: string,
  userId: string
): Promise<void> => {
  await prisma.document.deleteMany({
    where: { id: documentId, userId }
  })
}