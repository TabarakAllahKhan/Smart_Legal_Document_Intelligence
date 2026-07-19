import { generateEmbedding } from "../document/pipeline/embedder";
import { searchSimilarChunks } from "../document/pipeline/vectorstore";
import { groqClient } from "../config/gemini.config";
import { saveMessage,createConverstaion } from "../conversation/conversation.service";
import { ChatRequest,ChatResponse,SourceCitation } from "./chat.types";
import prisma from "../config/prisma.config";

export const processChat=async(
    userId:string,
    body:ChatRequest,
    conversationId?:string
):Promise<ChatResponse>=>{
    const {question,documentId}=body

    // verifying document belong to particular user
    const document=await prisma.document.findFirst({
        where:{id:documentId,userId:userId}
    })

    if(!document){
        throw new Error("Document not found");
    }

    // Embededding the user Question
    const questionEmbedding=await generateEmbedding(question);

    // find similar chunks from pgvector
    const similarChunks=await searchSimilarChunks(questionEmbedding,documentId,5);

    // build context from chunk

    const context=similarChunks
    .map((chunk,i)=>`[Source ${i+1}:\n${chunk.content}]`);

    // Building a prompt

    const prompt=`You are a legal document assistant for a company.Answer the user's question based only on the provided document context.If is not in the context,say "I could not find this information in the document."
    
    Document Context:
    ${context}

    User Question:${question}

    Provide clear and concise answer.Reference specific sections where relevant
    
    `;

    // get or create conversation

    let activeConversationId=conversationId

    if(!activeConversationId){
        const conversation=await createConverstaion(
            userId,
            documentId,
            question.slice(0,50)
        )
        activeConversationId=conversation.id
    }

    // saving the userMessage 
    await saveMessage(activeConversationId,"user",question);

    // Calling GROQ to answer 

    const completion=await groqClient.chat.completions.create({
        model:"llama-3.1-8b-instant",
        messages:[{role:"user",content:prompt}],
        temperature:0.1
    })

    const answer=completion.choices[0]?.message?.content||'Could not generate answer';

    // build source citation

   const sources: SourceCitation[] = similarChunks.map((chunk) => ({
    content: chunk.content.slice(0, 200),
    chunkIndex: chunk.chunkIndex
  }))

  // save Ai Assistant message 
  await saveMessage(
    activeConversationId,
    'assistant',
    answer,
    sources.map((s)=>s.content)
  )

  return{
    answer,
    sources,
    conversationId:activeConversationId
  }
}