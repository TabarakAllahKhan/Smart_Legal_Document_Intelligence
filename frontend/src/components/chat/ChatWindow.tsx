import { useEffect, useRef } from 'react'
import { Bot } from 'lucide-react'
import MessageBubble from './MessageBubble'
import Spinner from '../ui/Spinner'

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

interface ChatWindowProps {
  messages: Message[]
  loading: boolean
  onSuggestedQuestion: (question: string) => void
}

const suggestions = [
  'What are the risk flags and how do I handle them?',
  'Summarize this contract',
  'What are the payment terms?',
  'What is the termination clause?'
]

export default function ChatWindow({ messages, loading, onSuggestedQuestion }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-6">

      {messages.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center flex-1 text-center py-20">
          <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-3">
            <Bot className="w-6 h-6 text-zinc-400" />
          </div>
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Ask anything about this document
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 mb-6">
            Get instant answers with source citations
          </p>

          {/* quick suggestion buttons */}
          <div className="flex flex-wrap gap-2 justify-center max-w-lg">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => onSuggestedQuestion(suggestion)}
                className="text-xs px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-500 dark:hover:text-blue-400 bg-white dark:bg-zinc-900 transition-all duration-200 cursor-pointer"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {messages.map((message, i) => (
        <MessageBubble key={message.id || i} message={message} />
      ))}

      {loading && (
        <div className="flex gap-3">
          <div className="w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shrink-0">
            <Bot className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
          </div>
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl rounded-tl-sm px-4 py-3">
            <Spinner size="sm" />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}