import { useNavigate } from 'react-router-dom'
import {
  FileText, Shield, Zap, Search, AlertTriangle,
  MessageSquare, ChevronRight, Check, ArrowRight,
  Globe
} from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Button from '../components/ui/Button'

const features = [
  {
    icon: Search,
    title: 'Semantic search',
    description: 'Ask questions in plain English. Our AI finds the exact clause you need across any document instantly.'
  },
  {
    icon: AlertTriangle,
    title: 'Risk detection',
    description: 'Automatically flags unlimited liability clauses, aggressive non-competes, and unfavorable terms before you sign.'
  },
  {
    icon: MessageSquare,
    title: 'Document chat',
    description: 'Have a full conversation with your contract. Ask follow-up questions and get precise answers with source citations.'
  },
  {
    icon: Zap,
    title: 'Instant summary',
    description: 'Every uploaded document is analyzed immediately — parties, key dates, clauses, and risk flags extracted automatically.'
  },
  {
    icon: Shield,
    title: 'Secure by design',
    description: 'Your documents never leave your workspace. JWT auth, httpOnly cookies, and encrypted storage protect every file.'
  },
  {
    icon: Globe,
    title: 'Multilingual support',
    description: 'Upload contracts in English, Spanish, or Urdu. Ask questions in any language and get answers in the same language.'
  },
  {
    icon: FileText,
    title: 'Multi-document',
    description: 'Maintain separate workspaces per document with full conversation history across all your contracts.'
  }
]

const steps = [
  { step: '01', title: 'Upload your document', description: 'Drag and drop any PDF contract or legal document in English, Spanish, or Urdu.' },
  { step: '02', title: 'AI analyzes instantly', description: 'Our pipeline extracts parties, dates, key clauses, and risk flags automatically.' },
  { step: '03', title: 'Ask anything', description: 'Chat with your document in plain English and get answers with exact source citations.' }
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Legal Counsel',
    company: 'TechVentures',
    text: 'Reviewing vendor contracts used to take hours. Now I upload and ask questions directly. The risk flag detection caught an unlimited liability clause I almost missed.'
  },
  {
    name: 'Ahmed Raza',
    role: 'Operations Director',
    company: 'NovaTrade',
    text: 'The auto-summary alone saves me 30 minutes per contract. Parties, dates, key terms — all extracted before I even open the document.'
  },
  {
    name: 'Priya Mehta',
    role: 'Startup Founder',
    company: 'LaunchPad',
    text: 'As a founder without in-house legal, this is essential. I can understand any contract clause in plain English within seconds.'
  }
]

const languages = [
  {
    flag: '🇬🇧',
    language: 'English',
    question: 'What are the risk flags?',
    answer: '🔴 HIGH — Unlimited liability in Section 6'
  },
  {
    flag: '🇪🇸',
    language: 'Spanish',
    question: '¿Cuáles son los términos de pago?',
    answer: 'Renta mensual de €8,500 pagaderos en 5 días'
  },
  {
    flag: '🇵🇰',
    language: 'Urdu',
    question: 'منافع کی تقسیم کیا ہے؟',
    answer: 'الفلاح: 60٪ — سنرائز: 40٪'
  }
]

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
      <Navbar />

      {/* hero */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center overflow-hidden">

        {/* blue glow background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/20 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-[300px] h-[300px] bg-blue-400/10 dark:bg-blue-400/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-[300px] h-[300px] bg-indigo-600/10 dark:bg-indigo-600/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-full px-4 py-1.5 mb-8">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-blue-700 dark:text-blue-400">
              Powered by Gemini embeddings + Llama 3.1
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight max-w-4xl mx-auto">
            Understand any legal document
            <span className="text-blue-600"> in seconds</span>
          </h1>

          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Upload contracts in English, Spanish, or Urdu. Ask questions in plain English.
            Get instant answers with source citations and automatic risk detection.
          </p>

          <div className="flex items-center justify-center gap-3 mt-10 flex-wrap">
            <Button size="lg" onClick={() => navigate('/register')}>
              Start for free
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="secondary" onClick={() => navigate('/login')}>
              Sign in
            </Button>
          </div>

          <p className="mt-4 text-xs text-zinc-400 dark:text-zinc-600">
            No credit card required · Upload your first document in 60 seconds
          </p>

          {/* language badges */}
          <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
            {['🇬🇧 English', '🇪🇸 Spanish', '🇵🇰 Urdu'].map((lang) => (
              <span
                key={lang}
                className="text-xs px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
              >
                {lang}
              </span>
            ))}
          </div>

          {/* hero card */}
          <div className="mt-14 max-w-3xl mx-auto bg-zinc-950 dark:bg-zinc-900 rounded-2xl border border-zinc-800 p-6 text-left shadow-2xl shadow-blue-500/10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-xs text-zinc-500">Service Agreement · Risk Analysis</span>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs text-zinc-300">U</span>
                </div>
                <div className="bg-blue-600 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-white max-w-xs">
                  What are the risk flags in this contract?
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0 mt-0.5">
                  <FileText className="w-3 h-3 text-zinc-400" />
                </div>
                <div className="bg-zinc-800 border border-zinc-700 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-zinc-200 max-w-sm">
                  <p className="mb-2">I found <span className="text-red-400 font-medium">3 risk flags</span> in this contract:</p>
                  <ul className="flex flex-col gap-1.5 text-zinc-300">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                      🔴 HIGH — Unlimited liability clause in Section 6
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                      🔴 HIGH — 3-year non-compete across 4 countries
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                      🟡 MEDIUM — 3% monthly compounded late penalty
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* multilingual section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-600/5 to-transparent pointer-events-none rounded-3xl" />

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-full px-4 py-1.5 mb-4">
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-xs font-medium text-blue-700 dark:text-blue-400">
              Multilingual support
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Works in any language
          </h2>
          <p className="mt-3 text-zinc-500 dark:text-zinc-400 text-sm max-w-xl mx-auto">
            Upload documents in English, Spanish, or Urdu. Ask questions in any language.
            Our vector embeddings understand semantic meaning across all three.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {languages.map((lang, i) => (
            <div
              key={i}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{lang.flag}</span>
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {lang.language}
                </span>
              </div>

              {/* mock chat */}
              <div className="flex flex-col gap-2">
                <div className="bg-blue-600 text-white text-xs px-3 py-2 rounded-xl rounded-tl-sm self-start max-w-full">
                  {lang.question}
                </div>
                <div className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs px-3 py-2 rounded-xl rounded-tl-sm self-start max-w-full">
                  {lang.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* how it works */}
      <section className="bg-zinc-50 dark:bg-zinc-900/50 border-y border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              From upload to insight in 60 seconds
            </h2>
            <p className="mt-3 text-zinc-500 dark:text-zinc-400 text-sm">
              No training required. No complex setup. Just upload and ask.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center relative">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
                  <span className="text-white font-bold text-sm">{step.step}</span>
                </div>
                {i < steps.length - 1 && (
                  <ChevronRight className="hidden sm:block absolute top-3 -right-4 w-5 h-5 text-zinc-300 dark:text-zinc-700" />
                )}
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* features */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-600/10 dark:bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Everything you need to understand any contract
          </h2>
          <p className="mt-3 text-zinc-500 dark:text-zinc-400 text-sm max-w-xl mx-auto">
            Built on RAG architecture with vector embeddings for semantic understanding
            — not just keyword matching.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-200"
            >
              <div className="w-9 h-9 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* testimonials */}
      <section className="bg-zinc-50 dark:bg-zinc-900/50 border-y border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              Trusted by legal and operations teams
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 hover:shadow-md transition-all duration-200"
              >
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-semibold">
                      {t.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                      {t.name}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* cta */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="absolute inset-x-4 inset-y-10 bg-blue-600/20 blur-3xl rounded-full pointer-events-none" />
        <div className="relative bg-blue-600 rounded-3xl px-8 py-16 overflow-hidden shadow-2xl shadow-blue-500/30">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Start analyzing your contracts today
            </h2>
            <p className="text-blue-100 text-sm mb-8 max-w-md mx-auto">
              Upload your first document for free in English, Spanish, or Urdu.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <button
                onClick={() => navigate('/register')}
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold text-sm px-6 py-3 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg"
              >
                Get started free
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
              {['No credit card', 'Upload in 60 seconds', 'English · Spanish · Urdu'].map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-blue-100 text-xs">
                  <Check className="w-3.5 h-3.5" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              LegalDocs AI
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-zinc-400 dark:text-zinc-600">
              🇬🇧 🇪🇸 🇵🇰 Multilingual support
            </span>
            <p className="text-xs text-zinc-400 dark:text-zinc-600">
              Built with React, TypeScript, Express, pgvector, and LangChain
            </p>
          </div>
        </div>
      </footer>

    </div>
  )
}