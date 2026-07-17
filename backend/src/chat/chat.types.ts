export interface ChatRequest{
    question:string
    documentId:string
}

export interface SourceCitation{
    content:string
    chunkIndex:number
}

export interface ChatResponse{
    answer:string
    sources:SourceCitation[]
    conversationId:string
}

