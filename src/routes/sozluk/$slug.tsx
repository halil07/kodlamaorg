import { useState } from 'react'
import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import {
  Sparkles,
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Copy,
  Check,
  Layers,
  HelpCircle,
  Cpu,
  Lightbulb,
  GitCompare,
  Network,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { getTermBySlugFn } from '../../server/dictionary'
import MathText from '../../components/MathText'

export const Route = createFileRoute('/sozluk/$slug')({
  loader: async ({ params }) => {
    const data = await getTermBySlugFn({ data: params.slug })
    if (!data) {
      throw notFound()
    }
    return data
  },
  component: TermDetailPage,
})

function TermDetailPage() {
  const { term, related, category, prevTerm, nextTerm } = Route.useLoaderData()
  const [copied, setCopied] = useState(false)
  const [bookmarked, setBookmarked] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('kodlama_sozluk_bookmarks')
        const ids = saved ? JSON.parse(saved) : []
        return ids.includes(term.id)
      } catch (e) {
        return false
      }
    }
    return false
  })

  const toggleBookmark = () => {
    setBookmarked((prev: boolean) => {
      const next = !prev
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('kodlama_sozluk_bookmarks')
        let ids: number[] = saved ? JSON.parse(saved) : []
        if (next) {
          if (!ids.includes(term.id)) ids.push(term.id)
        } else {
          ids = ids.filter(x => x !== term.id)
        }
        localStorage.setItem('kodlama_sozluk_bookmarks', JSON.stringify(ids))
      }
      return next
    })
  }

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <main className="page-wrap py-8">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-xs text-[var(--sea-ink-soft)]">
        <div className="flex items-center gap-2">
          <Link to="/sozluk" className="hover:text-sky-500 flex items-center gap-1 font-medium">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Sözlüğe Dön</span>
          </Link>
          <span>/</span>
          <Link
            to="/sozluk"
            search={{ category: term.categoryId }}
            className="hover:text-sky-500 font-medium"
          >
            {category?.name || `Kategori ${term.categoryId}`}
          </Link>
          <span>/</span>
          <span className="text-[var(--sea-ink)] font-semibold truncate max-w-[200px]">
            {term.name}
          </span>
        </div>

        {/* Quick Prev / Next header buttons */}
        <div className="flex items-center gap-2">
          {prevTerm && (
            <Link
              to="/sozluk/$slug"
              params={{ slug: prevTerm.slug }}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--card-bg)] hover:border-sky-500/40 text-[var(--sea-ink)] transition"
              title={`Önceki: #${prevTerm.id} ${prevTerm.name}`}
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>#{prevTerm.id} {prevTerm.name}</span>
            </Link>
          )}
          {nextTerm && (
            <Link
              to="/sozluk/$slug"
              params={{ slug: nextTerm.slug }}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--card-bg)] hover:border-sky-500/40 text-[var(--sea-ink)] transition"
              title={`Sonraki: #${nextTerm.id} ${nextTerm.name}`}
            >
              <span>#{nextTerm.id} {nextTerm.name}</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>

      {/* Main Term Hero Card */}
      <section className="glass-panel relative rounded-3xl p-6 sm:p-10 mb-8 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-sky-500 text-white shadow-sm">
                Madde #{term.id}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                <Layers className="h-3 w-3" />
                {category?.badge || term.categoryName}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-500">
                /sozluk/{term.slug}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--sea-ink)] leading-tight">
              {term.name}
            </h1>

            {term.expansion && term.expansion !== term.name && (
              <p className="text-sm sm:text-base font-medium text-slate-500 dark:text-slate-400">
                {term.expansion}
              </p>
            )}

            {term.turkish && (
              <div className="inline-block px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold text-sky-700 dark:text-sky-300">
                Türkçe: {term.turkish}
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex sm:flex-col items-center gap-2">
            <button
              onClick={toggleBookmark}
              className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 transition w-full sm:w-auto justify-center ${
                bookmarked
                  ? 'bg-amber-500 text-white border-amber-600'
                  : 'bg-[var(--card-bg)] border-[var(--border-subtle)] text-[var(--sea-ink)] hover:border-amber-500/50'
              }`}
            >
              {bookmarked ? (
                <>
                  <BookmarkCheck className="h-4 w-4 fill-white" />
                  <span className="hidden sm:inline">Kaydedildi</span>
                </>
              ) : (
                <>
                  <Bookmark className="h-4 w-4 text-amber-500" />
                  <span className="hidden sm:inline">Kaydet</span>
                </>
              )}
            </button>

            <button
              onClick={handleCopyLink}
              className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--card-bg)] text-[var(--sea-ink)] hover:border-sky-500/50 text-xs font-semibold flex items-center gap-2 transition w-full sm:w-auto justify-center"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-slate-400" />}
              <span className="hidden sm:inline">{copied ? 'Kopyalandı' : 'Paylaş'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Structured Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Main Detailed Content) */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. Ayrıntılı Tanım */}
          <section className="modern-card rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-bold text-sm mb-3">
              <Sparkles className="h-4 w-4" />
              <span>Ayrıntılı Tanım</span>
            </div>
            <div className="text-base sm:text-lg text-[var(--sea-ink)] leading-relaxed font-normal">
              <MathText content={term.definition} />
            </div>
          </section>

          {/* 2. Ne İşe Yarar / Çözülen Problem */}
          {term.purpose && (
            <section className="rounded-2xl p-6 sm:p-8 border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm mb-3">
                <HelpCircle className="h-4 w-4" />
                <span>Ne İşe Yarar / Çözülen Problem</span>
              </div>
              <div className="text-base text-[var(--sea-ink)] leading-relaxed">
                <MathText content={term.purpose} />
              </div>
            </section>
          )}

          {/* 3. Nasıl Çalışır? (Teknik & Mekanizma) */}
          {term.howItWorks && (
            <section className="modern-card rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-sm mb-3">
                <Cpu className="h-4 w-4" />
                <span>Nasıl Çalışır? (Teknik & Mekanizma)</span>
              </div>
              <div className="text-sm sm:text-base text-[var(--sea-ink)] leading-relaxed">
                <MathText content={term.howItWorks} />
              </div>
            </section>
          )}

          {/* 4. Örnek Senaryo & Pratik Uygulama */}
          {term.example && (
            <section className="rounded-2xl p-6 sm:p-8 border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm mb-3">
                <Lightbulb className="h-4 w-4" />
                <span>Örnek Senaryo & Pratik Uygulama</span>
              </div>
              <div className="text-sm sm:text-base text-[var(--sea-ink)] leading-relaxed">
                <MathText content={term.example} />
              </div>
            </section>
          )}

          {/* 5. Benzer Terimlerden Farkı */}
          {term.difference && (
            <section className="modern-card rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm mb-3">
                <GitCompare className="h-4 w-4" />
                <span>Benzer Terimlerden Farkı</span>
              </div>
              <div className="text-sm sm:text-base text-[var(--sea-ink)] leading-relaxed">
                <MathText content={term.difference} />
              </div>
            </section>
          )}
        </div>

        {/* Right Column (Sidebar: Related Terms & Category context) */}
        <div className="space-y-6">
          {/* Related Terms Box */}
          <section className="modern-card rounded-2xl p-6">
            <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-bold text-sm mb-4">
              <Network className="h-4 w-4" />
              <span>İlişkili Terimler ({related.length})</span>
            </div>

            {related.length > 0 ? (
              <div className="space-y-2.5">
                {related.map(rel => (
                  <Link
                    key={rel.id}
                    to="/sozluk/$slug"
                    params={{ slug: rel.slug }}
                    className="block p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] hover:border-sky-500/50 hover:bg-sky-500/5 transition group no-underline"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-sky-600 dark:text-sky-400">
                        #{rel.id}
                      </span>
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition text-sky-500" />
                    </div>
                    <div className="font-semibold text-sm text-[var(--sea-ink)] group-hover:text-sky-600 dark:group-hover:text-sky-400 transition mt-1">
                      {rel.name}
                    </div>
                    {rel.turkish && (
                      <div className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {rel.turkish}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[var(--sea-ink-soft)]">
                {term.relatedText || 'İlişkili ek madde belirtilmemiş.'}
              </p>
            )}
          </section>

          {/* Category Info Box */}
          {category && (
            <section className="modern-card rounded-2xl p-6">
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                Ait Olduğu Kategori
              </span>
              <h3 className="font-bold text-base text-[var(--sea-ink)] mt-1">
                {category.name}
              </h3>
              <p className="text-xs text-[var(--sea-ink-soft)] mt-2 leading-relaxed">
                {category.description}
              </p>
              <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Toplam Terim:</span>
                <span className="font-bold text-sky-600 dark:text-sky-400">
                  {category.count} Madde
                </span>
              </div>
              <Link
                to="/sozluk"
                search={{ category: category.id }}
                className="mt-4 block text-center py-2 px-3 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 hover:bg-sky-500/20 text-xs font-semibold transition"
              >
                Bu Kategorideki Tüm Terimleri Gör →
              </Link>
            </section>
          )}
        </div>
      </div>

      {/* Bottom Previous / Next Navigation Banner */}
      <section className="mt-12 pt-8 border-t border-[var(--border-subtle)] grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prevTerm ? (
          <Link
            to="/sozluk/$slug"
            params={{ slug: prevTerm.slug }}
            className="p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--card-bg)] hover:border-sky-500/50 transition group flex items-center gap-4 no-underline"
          >
            <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-sky-500 group-hover:text-white transition">
              <ChevronLeft className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs text-slate-400 block">Önceki Terim (#{prevTerm.id})</span>
              <span className="font-bold text-sm text-[var(--sea-ink)] group-hover:text-sky-500 transition block truncate">
                {prevTerm.name}
              </span>
            </div>
          </Link>
        ) : <div />}

        {nextTerm && (
          <Link
            to="/sozluk/$slug"
            params={{ slug: nextTerm.slug }}
            className="p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--card-bg)] hover:border-sky-500/50 transition group flex items-center justify-between gap-4 no-underline text-right"
          >
            <div className="min-w-0 flex-1">
              <span className="text-xs text-slate-400 block">Sonraki Terim (#{nextTerm.id})</span>
              <span className="font-bold text-sm text-[var(--sea-ink)] group-hover:text-sky-500 transition block truncate">
                {nextTerm.name}
              </span>
            </div>
            <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-sky-500 group-hover:text-white transition shrink-0">
              <ChevronRight className="h-5 w-5" />
            </div>
          </Link>
        )}
      </section>
    </main>
  )
}

