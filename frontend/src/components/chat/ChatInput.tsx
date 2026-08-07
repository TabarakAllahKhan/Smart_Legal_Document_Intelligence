import { useState } from 'react'
import { Send } from 'lucide-react'

interface ChatInputProps {
  onSend: (question: string) => void
  loading: boolean
  disabled?: boolean
}

export default function ChatInput({ onSend, loading, disabled }: ChatInputProps) {
  const [value, setValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Prevent submission if the input is empty or if it's currently loading
    if (!value.trim() || loading) return
    onSend(value.trim())
    setValue('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-3 p-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-colors duration-300"
    >
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask a question about this document..."
        disabled={disabled || loading}
        rows={1}
        className="flex-1 resize-none px-4 py-2.5 rounded-xl border text-sm
          bg-zinc-50 dark:bg-zinc-800
          text-zinc-900 dark:text-zinc-100
          placeholder:text-zinc-400 dark:placeholder:text-zinc-600
          border-zinc-200 dark:border-zinc-700
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all duration-200 max-h-32 overflow-y-auto
          disabled:opacity-50"
        style={{ height: 'auto' }}
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement
          target.style.height = 'auto'
          target.style.height = `${target.scrollHeight}px`
        }}
      />
      <button
        type="submit"
        disabled={!value.trim() || loading || disabled}
        className="w-9 h-9 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-all duration-200 shrink-0"
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <Send className="w-4 h-4 text-white" />
        )}
      </button>
    </form>
  )
}