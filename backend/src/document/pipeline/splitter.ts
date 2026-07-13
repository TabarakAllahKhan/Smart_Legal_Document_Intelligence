import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export interface TextChunk{
    content:string
    chunkIndex:number
}

export const splitText=async(text:string):Promise<TextChunk[]>=>{
    const splitter=new RecursiveCharacterTextSplitter({
        chunkSize:1000,
        chunkOverlap:200,
        separators: ['\n\n', '\n', ' ', '']
    })
    const docs=await splitter.createDocuments([text])

    return docs.map((doc,index)=>({
        content:doc.pageContent,
        chunkIndex:index
    }))
}
