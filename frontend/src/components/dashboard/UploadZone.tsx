import {  useState } from 'react'
import { Upload, FileText, X, CheckCircle } from 'lucide-react'
import { uploadDocumentApi } from '../../api/document.api'
import Button from '../ui/Button'

interface UploadZoneProps {
  onUploadSuccess: () => void
}

export default function UploadZone({ onUploadSuccess }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleDrop =(e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file?.type === 'application/pdf') {
      setSelectedFile(file)
      setError('')
    } else {
      setError('Only PDF files are supported')
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setError('')
      setSuccess(false)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return
    setUploading(true)
    setError('')

    try {
      await uploadDocumentApi(selectedFile)
      setSuccess(true)
      setSelectedFile(null)
      setTimeout(() => {
        setSuccess(false)
        onUploadSuccess()
      }, 1500)
    } catch {
      setError('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="w-full">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        className={`
          relative border-2 border-dashed rounded-2xl p-8 text-center
          transition-all duration-200 cursor-pointer
          ${isDragging
            ? 'border-blue-500 bg-blue-500/5'
            : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50'
          }
          ${success ? 'border-green-500 bg-green-500/5' : ''}
        `}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <input
          id="file-input"
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleFileChange}
        />

        {success ? (
          <div className="flex flex-col items-center gap-3">
            <CheckCircle className="w-10 h-10 text-green-500" />
            <p className="text-sm font-medium text-green-600 dark:text-green-400">
              Document uploaded successfully
            </p>
          </div>
        ) : selectedFile ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {selectedFile.name}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedFile(null) }}
              className="absolute top-3 right-3 p-1 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-400"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center">
              <Upload className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Drop your PDF here
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                or click to browse — max 10MB
              </p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-500 mt-2">{error}</p>
      )}

      {selectedFile && !success && (
        <Button
          className="w-full mt-3"
          loading={uploading}
          onClick={(e) => { e.stopPropagation(); handleUpload() }}
        >
          <Upload className="w-4 h-4" />
          {uploading ? 'Analyzing document...' : 'Upload & Analyze'}
        </Button>
      )}
    </div>
  )
}