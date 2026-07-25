import { Bot, User } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import SourceCitations from './SourceCitations'

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

interface MessageBubbleProps {
  message: Message
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>

      {/* avatar */}
      <div className={`
        w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5
        ${isUser
          ? 'bg-blue-600'
          : 'bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700'
        }
      `}>
        {isUser
          ? <User className="w-3.5 h-3.5 text-white" />
          : <Bot className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
        }
      </div>

      {/* bubble */}
      <div className={`max-w-[75%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        <div className={`
          px-4 py-3 rounded-2xl text-sm leading-relaxed
          ${isUser
            ? 'bg-blue-600 text-white rounded-tr-sm'
            : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-tl-sm'
          }
        `}>
          {isUser ? (
            message.content
          ) : (
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className="mb-2 last:mb-0">{children}</p>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {children}
                  </strong>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-2 flex flex-col gap-1">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside mb-2 flex flex-col gap-1">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-sm">{children}</li>
                ),
                code: ({ children }) => (
                  <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-xs font-mono">
                    {children}
                  </code>
                )
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>

        {/* sources — only for assistant */}
        {!isUser && message.sources && message.sources.length > 0 && (
          <SourceCitations sources={message.sources} />
        )}
      </div>

    </div>
  )
}