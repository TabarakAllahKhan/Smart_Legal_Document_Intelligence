import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FileText } from 'lucide-react'
import ChatSidebar from '../components/chat/ChatSidebar'
import ChatWindow from '../components/chat/ChatWindow'
import ChatInput from '../components/chat/ChatInput'
import Navbar from '../components/layout/Navbar'
import { sendMessageApi, getConversationApi } from '../api/chat.api'
import { getDocumentById } from '../api/document.api'

interface Source {
  content: string
  chunkIndex: number
}

interface Message {
  id?: string
  role: 'user' | 'assistant'
  content: string
  sources?: Source[]
}

interface Document {
  id: string
  originalName: string
  summary: string | null
}

export default function ChatPage() {
  const { documentId } = useParams<{ documentId: string }>()
  const navigate = useNavigate()

  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null)
  const [document, setDocument] = useState<Document | null>(null)
  const [sidebarRefresh, setSidebarRefresh] = useState(0)

  useEffect(() => {
    if (!documentId) return
    fetchDocument()
  }, [documentId])

  const fetchDocument = async () => {
    try {
      const data = await getDocumentById(documentId!)
      setDocument(data)
    } catch {
      console.error('Failed to fetch document')
    }
  }

  const handleSend = async (question: string) => {
    if (!documentId) return

    // add user message immediately
    const userMessage: Message = { role: 'user', content: question }
    setMessages((prev) => [...prev, userMessage])
    setLoading(true)

    try {
      const data = await sendMessageApi(
        documentId,
        question,
        activeConversationId || undefined
      )

      // set conversation id from first response
      if (!activeConversationId) {
        setActiveConversationId(data.conversationId)
        setSidebarRefresh((prev) => prev + 1)
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.answer,
        sources: data.sources
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch {
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: 'Something went wrong. Please try again.'
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleSelectConversation = async (id: string) => {
    setActiveConversationId(id)
    setLoading(true)
    try {
      const data = await getConversationApi(id)
      const mapped: Message[] = data.messages.map((m: {
        id: string
        role: 'user' | 'assistant'
        content: string
        sources?: string[]
      }) => ({
        id: m.id,
        role: m.role,
        content: m.content,
        sources: m.sources?.map((s: string) => ({
          content: s,
          chunkIndex: 0
        }))
      }))
      setMessages(mapped)
    } catch {
      console.error('Failed to load conversation')
    } finally {
      setLoading(false)
    }
  }

  const handleNewConversation = () => {
    setActiveConversationId(null)
    setMessages([])
  }

  return (
    <div className="h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">

        {/* sidebar */}
        <ChatSidebar
          documentId={documentId!}
          activeConversationId={activeConversationId}
          onSelectConversation={handleSelectConversation}
          onNewConversation={handleNewConversation}
          onBack={() => navigate('/dashboard')}
          refreshTrigger={sidebarRefresh}
        />

        {/* main chat area */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* document header */}
          {document && (
            <div className="px-6 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center gap-3 transition-colors duration-300">
              <div className="w-7 h-7 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {document.originalName}
                </p>
                {document.summary && document.summary !== 'Summary could not be generated' && (
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate max-w-lg">
                    {document.summary}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* messages */}
          <ChatWindow messages={messages} loading={loading} />

          {/* input */}
          <ChatInput
            onSend={handleSend}
            loading={loading}
          />

        </div>
      </div>
    </div>
  )
}