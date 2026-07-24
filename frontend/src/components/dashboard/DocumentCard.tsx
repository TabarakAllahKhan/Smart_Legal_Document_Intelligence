import { FileText, MessageSquare, Trash2, AlertTriangle, Calendar, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import { deleteDocumentApi } from '../../api/document.api'
import { useState } from 'react'

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

interface DocumentCardProps {
  document: Document
  onDelete: () => void
}

export default function DocumentCard({ document, onDelete }: DocumentCardProps) {
  const navigate = useNavigate()
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setDeleting(true)
    try {
      await deleteDocumentApi(document.id)
      onDelete()
    } catch {
      setDeleting(false)
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 flex flex-col gap-4 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md transition-all duration-200">

      {/* header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
              {document.originalName}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              {formatDate(document.createdAt)}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          loading={deleting}
          onClick={handleDelete}
          className="shrink-0 text-zinc-400 hover:text-red-500"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      {/* summary */}
      {document.summary && document.summary !== 'Summary could not be generated' && (
        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
          {document.summary}
        </p>
      )}

      {/* parties */}
      {document.parties.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
            <Users className="w-3 h-3" />
            <span>Parties</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {document.parties.slice(0, 2).map((party, i) => (
              <Badge key={i} label={party} variant="info" />
            ))}
            {document.parties.length > 2 && (
              <Badge label={`+${document.parties.length - 2} more`} />
            )}
          </div>
        </div>
      )}

      {/* key dates */}
      {document.keyDates.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
            <Calendar className="w-3 h-3" />
            <span>Key dates</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {document.keyDates.slice(0, 2).map((date, i) => (
              <Badge key={i} label={date} variant="default" />
            ))}
            {document.keyDates.length > 2 && (
              <Badge label={`+${document.keyDates.length - 2} more`} />
            )}
          </div>
        </div>
      )}

      {/* risk flags */}
      {document.riskFlags.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-xs text-red-500">
            <AlertTriangle className="w-3 h-3" />
            <span>Risk flags</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {document.riskFlags.slice(0, 2).map((flag, i) => (
              <Badge key={i} label={flag} variant="danger" />
            ))}
            {document.riskFlags.length > 2 && (
              <Badge label={`+${document.riskFlags.length - 2} more`} variant="danger" />
            )}
          </div>
        </div>
      )}

      {/* action */}
      <Button
        className="w-full mt-auto"
        onClick={() => navigate(`/chat/${document.id}`)}
      >
        <MessageSquare className="w-4 h-4" />
        Ask questions
      </Button>

    </div>
  )
}