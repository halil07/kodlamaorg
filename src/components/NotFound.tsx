import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { Search, Home, BookOpen } from 'lucide-react'

export default function NotFound() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      navigate({ to: '/sozluk', search: { q: query.trim() } })
    } else {
      navigate({ to: '/sozluk' })
    }
  }

  return (
    <main className="page-wrap py-20 flex items-center justify-center min-h-[60vh]">
      <div className="glass-panel rounded-3xl p-8 sm:p-14 text-center max-w-lg w-full border border-[var(--border-subtle)] shadow-xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 mb-4">
          404 • Bulunamadı
        </span>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--sea-ink)] tracking-tight">
          Aradığınız Sayfa veya Terim Bulunamadı
        </h1>

        <p className="mt-3 text-sm text-[var(--sea-ink-soft)] leading-relaxed">
          Ulaşmaya çalıştığınız terim, kategori veya sayfa mevcut değil ya da bağlantısı değişmiş olabilir.
        </p>

        {/* Quick Search */}
        <form onSubmit={handleSearch} className="mt-6 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Sözlükte 605 terim ara..."
            className="w-full pl-10 pr-20 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-strong)] text-xs sm:text-sm text-[var(--sea-ink)] focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition shadow-sm"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold transition"
          >
            Ara
          </button>
        </form>

        {/* Navigation CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/sozluk"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold shadow-md transition"
          >
            <BookOpen className="h-4 w-4" />
            <span>Sözlüğü Aç (605 Terim)</span>
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-strong)] hover:border-slate-400 text-[var(--sea-ink)] text-xs font-semibold shadow-sm transition"
          >
            <Home className="h-4 w-4" />
            <span>Ana Sayfa</span>
          </Link>
        </div>
      </div>
    </main>
  )
}

