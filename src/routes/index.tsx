import { useState } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import {
  Search,
  Sparkles,
  BookOpen,
  ArrowRight,
  Layers,
  Users,
  Star,
  Clock,
  Shuffle
} from 'lucide-react'
import { getFeaturedTermsFn, getAllCategoriesFn, getRandomTermFn } from '../server/dictionary'
import { COURSES } from '../data/courses'
import MathText from '../components/MathText'

export const Route = createFileRoute('/')({
  loader: async () => {
    const [featuredTerms, categories] = await Promise.all([
      getFeaturedTermsFn(),
      getAllCategoriesFn(),
    ])
    return { featuredTerms, categories }
  },
  component: HomePage,
})

const TRENDING_TAGS = [
  { name: 'Transformers', slug: 'transformer-architecture' },
  { name: 'RAG Pipeline', slug: 'information-retrieval-ir' },
  { name: 'Distributed Training', slug: 'distributed-training' },
  { name: 'MoE Mimarisi', slug: 'dense-models' },
  { name: 'Reasoning (Akıl Yürütme)', slug: 'reasoning' },
  { name: 'Model Compression', slug: 'model-compression' },
  { name: 'Computer Vision', slug: 'computer-vision' },
  { name: 'AGI', slug: 'artificial-general-intelligence-agi' },
]

function HomePage() {
  const { featuredTerms, categories: CATEGORIES } = Route.useLoaderData()
  const navigate = useNavigate()
  const [heroSearch, setHeroSearch] = useState('')

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (heroSearch.trim()) {
      navigate({ to: '/sozluk', search: { q: heroSearch.trim() } })
    } else {
      navigate({ to: '/sozluk' })
    }
  }

  const handleRandom = async () => {
    const random = await getRandomTermFn()
    if (random) {
      navigate({ to: `/sozluk/${random.slug}` })
    }
  }

  return (
    <main className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-16 overflow-hidden">
        <div className="page-wrap text-center max-w-4xl mx-auto">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 mb-6 shadow-sm">
            <Sparkles className="h-4 w-4 text-sky-500 animate-pulse" />
            <span>Türkiye'nin Yeni Nesil Yapay Zekâ & Yazılım Ekosistemi</span>
          </div>

          {/* Main title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[var(--sea-ink)] leading-[1.08]">
            Yazılımı ve <span className="bg-gradient-to-r from-sky-500 via-teal-500 to-emerald-400 bg-clip-text text-transparent">Yapay Zekâyı</span> Derinlemesine Öğrenin
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-[var(--sea-ink-soft)] max-w-2xl mx-auto leading-relaxed font-normal">
            kodlama.org ile klasik algoritmalardan modern LLM mimarilerine kadar <strong>605 terimlik kapsamlı sözlük</strong>, pratik sektör projeleri ve açık kaynak eğitimler parmaklarınızın ucunda.
          </p>

          {/* Instant Hero Search Box */}
          <div className="mt-10 max-w-2xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder="Yapay Zekâ Sözlüğünde 605 terim ara (örn. Attention, RAG, PyTorch, MoE)..."
                className="w-full pl-12 pr-32 py-4 rounded-2xl border-2 border-[var(--border-subtle)] bg-[var(--surface-strong)] text-sm sm:text-base text-[var(--sea-ink)] placeholder-slate-400 shadow-lg shadow-sky-500/5 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/15 transition"
              />
              <button
                type="submit"
                className="absolute right-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white text-xs sm:text-sm font-semibold shadow transition"
              >
                Ara
              </button>
            </form>

            {/* Trending Quick Tags */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-500">
              <span className="font-semibold text-slate-400 mr-1">Trend Kavramlar:</span>
              {TRENDING_TAGS.map(tag => (
                <Link
                  key={tag.name}
                  to="/sozluk/$slug"
                  params={{ slug: tag.slug }}
                  className="px-2.5 py-1 rounded-lg bg-[var(--chip-bg)] hover:bg-sky-500/10 hover:text-sky-600 dark:hover:text-sky-400 transition font-medium border border-transparent hover:border-sky-500/20"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/sozluk"
              className="px-6 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-lg shadow-sky-500/25 transition flex items-center gap-2 group"
            >
              <span>Yapay Zekâ Sözlüğü'nü Keşfet (605 Terim)</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <button
              onClick={handleRandom}
              className="px-5 py-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-strong)] hover:border-sky-500/40 text-[var(--sea-ink)] font-semibold text-sm transition flex items-center gap-2 shadow-sm"
            >
              <Shuffle className="h-4 w-4 text-sky-500" />
              <span>Rastgele Terim Getir</span>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Feature Highlight Banner: AI Dictionary */}
      <section className="page-wrap">
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden border border-sky-500/30 bg-gradient-to-br from-sky-500/10 via-emerald-500/5 to-transparent shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-300 border border-sky-500/20 mb-3">
                <Sparkles className="h-3.5 w-3.5 text-sky-500" />
                <span>Öne Çıkan Özellik</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--sea-ink)] tracking-tight">
                Kapsamlı & Modern: Tam Yapay Zekâ Sözlüğü
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[var(--sea-ink-soft)] leading-relaxed">
                Platformumuz bünyesindeki <strong>Yapay Zekâ Sözlüğü</strong>; 16 uzmanlık kategorisine ayrılmış 605 madde ile teknik tanımları, formülleri, problem çözümlerini ve pratik kullanım senaryolarını tek bir çatı altında sunar.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded-xl bg-[var(--surface-strong)] border border-[var(--border-subtle)]">
                  <div className="text-2xl font-extrabold text-sky-500">605</div>
                  <div className="text-[11px] font-semibold text-slate-500">Özgün Terim</div>
                </div>
                <div className="p-3 rounded-xl bg-[var(--surface-strong)] border border-[var(--border-subtle)]">
                  <div className="text-2xl font-extrabold text-emerald-500">16</div>
                  <div className="text-[11px] font-semibold text-slate-500">Kategori</div>
                </div>
                <div className="p-3 rounded-xl bg-[var(--surface-strong)] border border-[var(--border-subtle)]">
                  <div className="text-2xl font-extrabold text-purple-500">%100</div>
                  <div className="text-[11px] font-semibold text-slate-500">Teknik Kapsam</div>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  to="/sozluk"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-sm transition shadow-sm"
                >
                  <span>Sözlüğe Giriş Yap</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Interactive Preview Cards */}
            <div className="space-y-3">
              {featuredTerms.slice(0, 3).map(term => (
                <Link
                  key={term.id}
                  to="/sozluk/$slug"
                  params={{ slug: term.slug }}
                  className="block p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-strong)] hover:border-sky-500/50 hover:shadow-md transition group no-underline"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-sky-600 dark:text-sky-400">
                      Madde #{term.id}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400">
                      {term.categoryName.replace(/^Kategori\s*\d+:\s*/, '')}
                    </span>
                  </div>
                  <h4 className="font-bold text-base text-[var(--sea-ink)] group-hover:text-sky-600 dark:group-hover:text-sky-400 transition mt-1">
                    {term.name}
                  </h4>
                  <div className="text-xs text-[var(--sea-ink-soft)] mt-1 line-clamp-2">
                    <MathText content={term.definition} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 16 Categories Grid */}
      <section className="page-wrap">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Layers className="h-4 w-4" />
              <span>Sözlük Kapsamı</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--sea-ink)] tracking-tight">
              16 Uzmanlık Alanında Yapay Zekâ Ağacı
            </h2>
          </div>
          <Link
            to="/sozluk"
            className="text-xs sm:text-sm font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
          >
            <span>Tüm Sözlüğü Gör</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.id}
              to="/sozluk"
              search={{ category: cat.id }}
              className="modern-card p-5 rounded-2xl border border-[var(--border-subtle)] hover:border-sky-500/50 hover:shadow-md transition group no-underline flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    Kategori #{cat.id}
                  </span>
                  <span className="text-xs font-bold text-sky-600 dark:text-sky-400">
                    {cat.count} Madde
                  </span>
                </div>
                <h3 className="font-bold text-sm text-[var(--sea-ink)] group-hover:text-sky-500 transition leading-snug">
                  {cat.name}
                </h3>
                <p className="mt-2 text-xs text-[var(--sea-ink-soft)] line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-semibold text-sky-600 dark:text-sky-400">
                <span>Maddeleri İncele</span>
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Courses from kodlama.org */}
      <section className="page-wrap">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
              <BookOpen className="h-4 w-4" />
              <span>kodlama.org Akademi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--sea-ink)] tracking-tight">
              Öne Çıkan Eğitimler & Kamplar
            </h2>
          </div>
          <Link
            to="/kurslar"
            className="text-xs sm:text-sm font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
          >
            <span>Tüm Kursları İncele</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COURSES.slice(0, 3).map(course => (
            <article
              key={course.id}
              className="modern-card group flex flex-col justify-between rounded-2xl overflow-hidden border border-[var(--border-subtle)] hover:shadow-xl transition-all duration-200"
            >
              <div className="relative h-44 overflow-hidden bg-slate-900">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md border border-white/10">
                    {course.category}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="h-3.5 w-3.5 opacity-80" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-amber-400">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    {course.rating}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-[var(--sea-ink)] leading-snug group-hover:text-sky-500 transition">
                    {course.title}
                  </h3>
                  <p className="mt-2 text-xs text-[var(--sea-ink-soft)] leading-relaxed line-clamp-3">
                    {course.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 text-[var(--sea-ink-soft)] font-medium">
                    <Users className="h-3.5 w-3.5" />
                    {course.studentsCount.toLocaleString('tr-TR')} Geliştirici
                  </span>
                  <Link to="/kurslar" className="font-bold text-sky-600 dark:text-sky-400 hover:underline">
                    Detaylar →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Community CTA */}
      <section className="page-wrap">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto border border-[var(--border-subtle)]">
          <div className="h-12 w-12 rounded-2xl bg-sky-500/10 text-sky-500 flex items-center justify-center mx-auto mb-4">
            <Users className="h-6 w-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--sea-ink)] tracking-tight">
            kodlama.org Topluluğuna Katılın
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[var(--sea-ink-soft)] leading-relaxed max-w-xl mx-auto">
            Binlerce Türk yazılımcı ve araştırmacıyla aynı ortamda yapay zekâ, modern web teknolojileri ve kariyer üzerine fikir alışverişi yapın.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/topluluk"
              className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-xs sm:text-sm shadow-md transition"
            >
              Topluluk Sayfasını İncele
            </Link>
            <Link
              to="/sozluk"
              className="px-5 py-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-strong)] text-[var(--sea-ink)] hover:border-sky-500/40 text-xs sm:text-sm font-semibold transition"
            >
              Sözlüğü Tara
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
