import { useEffect, useState } from 'react'
import { MessageSquare, Trash2, Plus, ChevronLeft } from 'lucide-react'
import { getConversationsApi, deleteConversationApi } from '../../api/chat.api'
import Button from '../ui/Button'
import Spinner from '../ui/Spinner'

interface Conversation {
  id: string
  title: string | null
  createdAt: string
  document: { originalName: string }
  messages: { content: string }[]
}

interface ChatSidebarProps {
  documentId: string
  activeConversationId: string | null
  onSelectConversation: (id: string) => void
  onNewConversation: () => void
  onBack: () => void
  refreshTrigger: number
}

export default function ChatSidebar({
  documentId,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onBack,
  refreshTrigger
}: ChatSidebarProps) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchConversations = async () => {
    try {
      const data = await getConversationsApi(documentId)
      setConversations(data)
    } catch {
      console.error('Failed to fetch conversations')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchConversations()
  }, [refreshTrigger])

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    setDeletingId(id)
    try {
      await deleteConversationApi(id)
      setConversations((prev) => prev.filter((c) => c.id !== id))
      if (activeConversationId === id) onNewConversation()
    } catch {
      console.error('Failed to delete conversation')
    } finally {
      setDeletingId(null)
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="w-64 h-full bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col transition-colors duration-300">

      {/* header */}
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-3"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Back to dashboard
        </button>
        <Button className="w-full" size="sm" onClick={onNewConversation}>
          <Plus className="w-4 h-4" />
          New conversation
        </Button>
      </div>

      {/* conversations list */}
      <div className="flex-1 overflow-y-auto p-2">
        {loading ? (
          <div className="flex justify-center py-8">
            <Spinner size="sm" />
          </div>
        ) : conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center px-4">
            <MessageSquare className="w-6 h-6 text-zinc-300 dark:text-zinc-700 mb-2" />
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              No conversations yet
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => onSelectConversation(conv.id)}
                className={`
                  group flex items-start justify-between gap-2 p-2.5 rounded-lg cursor-pointer transition-all duration-150
                  ${activeConversationId === conv.id
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                  }
                `}
              >
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium truncate">
                    {conv.title || 'New conversation'}
                  </p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5 truncate">
                    {conv.document?.originalName}
                  </p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                    {formatDate(conv.createdAt)}
                  </p>
                </div>
                <button
                  onClick={(e) => handleDelete(e, conv.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded hover:text-red-500 transition-all shrink-0"
                >
                  {deletingId === conv.id ? (
                    <span className="text-xs">...</span>
                  ) : (
                    <Trash2 className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}