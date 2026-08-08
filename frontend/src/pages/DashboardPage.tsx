import { useEffect, useState } from 'react'
import { Plus, X, FileText } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import DocumentGrid from '../components/dashboard/DocumentGrid'
import UploadZone from '../components/dashboard/UploadZone'
import Spinner from '../components/ui/Spinner'
import Button from '../components/ui/Button'
import { getDocumentsApi } from '../api/document.api'
import { useAuth } from '../context/AuthContext'

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

export default function DashboardPage() {
  const { user } = useAuth()
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [showUpload, setShowUpload] = useState(false)

  const fetchDocuments = async () => {
    try {
      const data = await getDocumentsApi()
      setDocuments(data)
    } catch {
      console.error('Failed to fetch documents')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDocuments()
  }, [])

  const handleUploadSuccess = () => {
    setShowUpload(false)
    fetchDocuments()
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 transition-colors duration-300">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Total documents</p>
            <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-1">
              {documents.length}
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 transition-colors duration-300">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Risk flags found</p>
            <p className="text-2xl font-semibold text-red-500 mt-1">
              {documents.reduce((acc, doc) => acc + doc.riskFlags.length, 0)}
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 hidden sm:block transition-colors duration-300">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Workspace</p>
            <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-1 truncate">
              {user?.name.split(' ')[0]}
            </p>
          </div>
        </div>

        {/* header row */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Your documents
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
              Upload contracts and legal documents to analyze
            </p>
          </div>
          <Button onClick={() => setShowUpload((prev) => !prev)}>
            {showUpload ? (
              <><X className="w-4 h-4" />Cancel</>
            ) : (
              <><Plus className="w-4 h-4" />Upload document</>
            )}
          </Button>
        </div>

        {/* upload zone */}
        {showUpload && (
          <div className="mb-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 transition-all duration-300">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Upload a document
              </h2>
            </div>
            <UploadZone onUploadSuccess={handleUploadSuccess} />
          </div>
        )}

        {/* content */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Spinner text="Loading your documents..." />
          </div>
        ) : (
          <DocumentGrid
            documents={documents}
            onDelete={fetchDocuments}
          />
        )}

      </main>
    </div>
  )
}