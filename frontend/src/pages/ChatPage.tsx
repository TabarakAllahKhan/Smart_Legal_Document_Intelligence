import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FileText, Menu } from 'lucide-react'
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
  const [sidebarOpen, setSidebarOpen] = useState(false)

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

    const userMessage: Message = { role: 'user', content: question }
    setMessages((prev) => [...prev, userMessage])
    setLoading(true)

    try {
      const data = await sendMessageApi(
        documentId,
        question,
        activeConversationId || undefined
      )

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
    setSidebarOpen(false)
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
    setSidebarOpen(false)
  }

  return (
    <div className="h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <Navbar />

      <div className="flex flex-1 overflow-hidden relative">

        {/* mobile overlay — dark background behind sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* sidebar wrapper — drawer on mobile, static on desktop */}
        <div className={`
        fixed top-14 lg:top-0 bottom-0 left-0 z-30
        lg:relative lg:top-auto lg:bottom-auto
        transform transition-transform duration-300 ease-in-out
       ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
   `}>
          <ChatSidebar
            documentId={documentId!}
            activeConversationId={activeConversationId}
            onSelectConversation={handleSelectConversation}
            onNewConversation={handleNewConversation}
            onBack={() => navigate('/dashboard')}
            refreshTrigger={sidebarRefresh}
          />
        </div>

        {/* main chat area */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">

          {/* document header */}
          {document && (
            <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center gap-3 transition-colors duration-300">

              {/* hamburger menu — mobile only */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 shrink-0"
              >
                <Menu className="w-4 h-4" />
              </button>

              <div className="w-7 h-7 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center shrink-0">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                  {document.originalName}
                </p>
                {document.summary && document.summary !== 'Summary could not be generated' && (
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate max-w-xs sm:max-w-lg">
                    {document.summary}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* messages */}
          <ChatWindow
            messages={messages}
            loading={loading}
            onSuggestedQuestion={handleSend}
          />

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