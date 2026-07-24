import { FileText } from 'lucide-react'
import DocumentCard from './DocumentCard'

interface Document {
  id: string
  originalName: string
  summary: string | null
  parties: string[]
  keyDates: string[]
  keyClauses: string[]
  riskFlags: string[]
  createdAt: string
}

interface DocumentGridProps {
  documents: Document[]
  onDelete: () => void
}

export default function DocumentGrid({ documents, onDelete }: DocumentGridProps) {
  if (documents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-14 h-14 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-4">
          <FileText className="w-7 h-7 text-zinc-400" />
        </div>
        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          No documents yet
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Upload a PDF to get started
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {documents.map((doc) => (
        <DocumentCard
          key={doc.id}
          document={doc}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}