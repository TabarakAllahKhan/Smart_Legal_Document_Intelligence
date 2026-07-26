import { generateEmbedding } from '../document/pipeline/embedder'
import { searchSimilarChunks } from '../document/pipeline/vectorstore'
import { groqClient } from '../config/gemini.config'
import { saveMessage, createConverstaion } from '../conversation/conversation.service'
import { ChatRequest, ChatResponse, SourceCitation } from './chat.types'
import prisma from '../config/prisma.config'

// detect language from question
const detectLanguage = (text: string): string => {
  const urduPattern = /[\u0600-\u06FF]/
  const spanishPattern = /\b(qué|cómo|cuál|cuándo|dónde|tiene|contrato|acuerdo|pago|riesgo|cláusula)\b/i

  if (urduPattern.test(text)) return 'Urdu'
  if (spanishPattern.test(text)) return 'Spanish'
  return 'English'
}

// language aware system prompt with risk mitigation
const getSystemPrompt = (language: string): string => {
  const prompts: Record<string, string> = {
    English: `You are an expert legal document assistant. Answer the user's question based ONLY on the provided document context.

When identifying risk flags or problematic clauses:
- Clearly explain WHY it is a risk
- Rate severity as 🔴 HIGH, 🟡 MEDIUM, or 🟢 LOW risk
- Provide specific actionable suggestions on how to negotiate or handle it
- Suggest alternative clause wording where appropriate

If the answer is not in the context, say "I could not find this information in the document."
Always reference exact sections and be concise.`,

    Spanish: `Eres un asistente experto en documentos legales. Responde ÚNICAMENTE basándote en el contexto del documento proporcionado.

Cuando identifiques riesgos o cláusulas problemáticas:
- Explica claramente POR QUÉ es un riesgo
- Califica la gravedad como 🔴 ALTO, 🟡 MEDIO o 🟢 BAJO riesgo
- Proporciona sugerencias específicas sobre cómo negociarlo
- Sugiere redacción alternativa cuando sea apropiado

Si la respuesta no está en el contexto, di "No pude encontrar esta información en el documento."`,

    Urdu: `آپ ایک ماہر قانونی دستاویز معاون ہیں۔ صرف فراہم کردہ دستاویز کے سیاق و سباق کی بنیاد پر جواب دیں۔

جب خطرات یا مسائل والی شقوں کی نشاندہی کریں:
- واضح طور پر بتائیں کہ یہ خطرہ کیوں ہے
- خطرے کی سطح 🔴 زیادہ، 🟡 درمیانی یا 🟢 کم بتائیں
- اسے کیسے حل کریں اس کے بارے میں مخصوص تجاویز دیں
- متبادل شق کی تجویز دیں

اگر جواب سیاق و سباق میں نہیں ہے تو کہیں "مجھے یہ معلومات دستاویز میں نہیں ملیں۔"`
  }

  return prompts[language] || prompts.English
}

export const processChat = async (
  userId: string,
  body: ChatRequest,
  conversationId?: string
): Promise<ChatResponse> => {
  const { question, documentId } = body

  // verify document belongs to user
  const document = await prisma.document.findFirst({
    where: { id: documentId, userId }
  })

  if (!document) throw new Error('Document not found')

  // detect language from the question
  const detectedLanguage = detectLanguage(question)
  console.log('Detected language:', detectedLanguage)

  // embed the question
  const questionEmbedding = await generateEmbedding(question)

  // find similar chunks from pgvector
  const similarChunks = await searchSimilarChunks(
    questionEmbedding,
    documentId,
    5
  )

  // build context from chunks
  const context = similarChunks
    .map((chunk, i) => `[Source ${i + 1}]:\n${chunk.content}`)
    .join('\n\n')

  // get language aware system prompt
  const systemPrompt = getSystemPrompt(detectedLanguage)

  // build full prompt
  const fullPrompt = `${systemPrompt}

Document Context:
${context}

User Question: ${question}`

  // get or create conversation
  let activeConversationId = conversationId
  if (!activeConversationId) {
    const conversation = await createConverstaion(
      userId,
      documentId,
      question.slice(0, 50)
    )
    activeConversationId = conversation.id
  }

  // save user message
  await saveMessage(activeConversationId, 'user', question)

  // call Groq
  const completion = await groqClient.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    messages: [{ role: 'user', content: fullPrompt }],
    temperature: 0.1
  })

  const answer = completion.choices[0]?.message?.content || 'Could not generate answer'

  // build source citations
  const sources: SourceCitation[] = similarChunks.map((chunk) => ({
    content: chunk.content.slice(0, 200),
    chunkIndex: chunk.chunkIndex
  }))

  // save assistant message
  await saveMessage(
    activeConversationId,
    'assistant',
    answer,
    sources.map((s) => s.content)
  )

  return {
    answer,
    sources,
    conversationId: activeConversationId
  }
}