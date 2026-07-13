import { embeddingModel } from "../../config/gemini.config";

export const generateEmbedding=async(text:string):Promise<number[]>=>{
    const result=await embeddingModel.embedContent(text)
    return result.embedding.values
}
export const generateEmbeddings=async(texts:string[]):Promise<number[][]>=>{
    const embeddings=await Promise.all(
        texts.map((text)=>generateEmbedding(text))
    )
    return embeddings
}