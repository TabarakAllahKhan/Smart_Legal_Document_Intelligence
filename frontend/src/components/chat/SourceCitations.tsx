import { useState } from 'react'
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react'

interface Source {
  content: string
  chunkIndex: number
}

interface SourceCitationsProps {
  sources: Source[]
}

export default function SourceCitations({ sources }: SourceCitationsProps) {
  const [expanded, setExpanded] = useState(false)

  if (!sources || sources.length === 0) return null

  return (
    <div className="mt-2">
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
      >
        <BookOpen className="w-3.5 h-3.5" />
        {sources.length} source{sources.length > 1 ? 's' : ''}
        {expanded
          ? <ChevronUp className="w-3.5 h-3.5" />
          : <ChevronDown className="w-3.5 h-3.5" />
        }
      </button>

      {expanded && (
        <div className="mt-2 flex flex-col gap-2">
          {sources.map((source, i) => (
            <div
              key={i}
              className="text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-3 leading-relaxed"
            >
              <span className="text-zinc-400 dark:text-zinc-500 font-medium">
                Source {i + 1} · Chunk {source.chunkIndex}
              </span>
              <p className="mt-1">{source.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}