import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Bookmark, BookmarkCheck, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react'
import type { AiTerm } from '../data/types'
import MathText from './MathText'

interface TermCardProps {
  term: AiTerm
  isBookmarked?: boolean
  onToggleBookmark?: (id: number) => void
}

export default function TermCard({ term, isBookmarked = false, onToggleBookmark }: TermCardProps) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const text = `# ${term.name} (${term.turkish})\n${term.definition}\n\nNe İşe Yarar:\n${term.purpose}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onToggleBookmark) {
      onToggleBookmark(term.id)
    }
  }

  return (
    <article className="modern-card group relative flex flex-col justify-between rounded-2xl p-5 hover:border-sky-500/50 hover:shadow-lg transition-all duration-200">
      <div>
        {/* Top header row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              #{term.id}
            </span>
            <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 truncate max-w-[200px]">
              {term.categoryName.replace(/^Kategori\s*\d+:\s*/, '')}
            </span>
          </div>

          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition">
            <button
              onClick={handleCopy}
              title="Tanımı Kopyala"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
            <button
              onClick={handleBookmark}
              title={isBookmarked ? "Kaydedilenlerden Çıkar" : "Kaydet"}
              className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              {isBookmarked ? (
                <BookmarkCheck className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
              ) : (
                <Bookmark className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Title */}
        <Link
          to="/sozluk/$slug"
          params={{ slug: term.slug }}
          className="block no-underline group-hover:text-sky-500 transition"
        >
          <h3 className="text-lg font-bold text-[var(--sea-ink)] group-hover:text-sky-600 dark:group-hover:text-sky-400 transition flex items-center justify-between gap-1">
            <span>{term.name}</span>
            <ArrowUpRight className="h-4 w-4 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-sky-500" />
          </h3>
          {term.turkish && (
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
              {term.turkish}
            </p>
          )}
        </Link>

        {/* Definition */}
        <div className="mt-3 text-sm text-[var(--sea-ink-soft)] leading-relaxed line-clamp-3">
          <MathText content={term.definition} />
        </div>

        {/* Collapsible extra info preview */}
        {expanded && (
          <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] space-y-3 text-xs animate-fadeIn">
            {term.purpose && (
              <div>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 block mb-0.5">
                  Ne İşe Yarar / Çözülen Problem:
                </span>
                <div className="text-[var(--sea-ink-soft)] leading-normal">
                  <MathText content={term.purpose} />
                </div>
              </div>
            )}
            {term.example && (
              <div>
                <span className="font-semibold text-amber-600 dark:text-amber-400 block mb-0.5">
                  Örnek / Görsel Senaryo:
                </span>
                <div className="text-[var(--sea-ink-soft)] leading-normal">
                  <MathText content={term.example} />
                </div>
              </div>
            )}
            {term.relatedText && (
              <div>
                <span className="font-semibold text-sky-600 dark:text-sky-400 block mb-0.5">
                  İlişkili Terimler:
                </span>
                <p className="text-slate-500 dark:text-slate-400 leading-normal">{term.relatedText}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Card footer */}
      <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between gap-2 text-xs">
        <button
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-1 font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition"
        >
          {expanded ? (
            <>
              <span>Daha Az Göster</span>
              <ChevronUp className="h-3.5 w-3.5" />
            </>
          ) : (
            <>
              <span>Hızlı Önizleme</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </>
          )}
        </button>

        <Link
          to="/sozluk/$slug"
          params={{ slug: term.slug }}
          className="inline-flex items-center gap-1 font-semibold text-sky-600 dark:text-sky-400 hover:underline"
        >
          <span>Ayrıntılı Rehber</span>
          <span>→</span>
        </Link>
      </div>
    </article>
  )
}
