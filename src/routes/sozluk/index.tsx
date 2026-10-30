import { useState, useMemo } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {
  Search,
  Sparkles,
  Shuffle,
  Bookmark,
  Layers,
  BookOpen,
  X
} from 'lucide-react'
import { getAllTermsFn, getAllCategoriesFn, getRandomTermFn } from '../../server/dictionary'
import TermCard from '../../components/TermCard'

export interface SozlukSearch {
  q?: string
  category?: number
}

export const Route = createFileRoute('/sozluk/')({
  validateSearch: (search: Record<string, unknown>): SozlukSearch => {
    return {
      q: typeof search.q === 'string' && search.q ? search.q : undefined,
      category: typeof search.category === 'number' ? search.category : undefined,
    }
  },
  loader: async () => {
    const [terms, categories] = await Promise.all([
      getAllTermsFn(),
      getAllCategoriesFn(),
    ])
    return { terms, categories }
  },
  component: SozlukPage,
})

const ALPHABET = ['Tümü', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

function SozlukPage() {
  const { terms: TERMS, categories: CATEGORIES } = Route.useLoaderData()
  const searchParams = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })

  const [searchQuery, setSearchQuery] = useState(searchParams.q || '')
  const [selectedCategory, setSelectedCategory] = useState<number | null>(searchParams.category ?? null)
  const [selectedLetter, setSelectedLetter] = useState<string>('Tümü')
  const [sortBy, setSortBy] = useState<'id' | 'name' | 'category'>('id')
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false)
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('kodlama_sozluk_bookmarks')
        return saved ? JSON.parse(saved) : []
      } catch (e) {
        return []
      }
    }
    return []
  })
  const [pageSize, setPageSize] = useState(24)

  const toggleBookmark = (id: number) => {
    setBookmarkedIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      if (typeof window !== 'undefined') {
        localStorage.setItem('kodlama_sozluk_bookmarks', JSON.stringify(next))
      }
      return next
    })
  }

  const handleRandom = async () => {
    const random = await getRandomTermFn()
    if (random) {
      navigate({ to: '/sozluk/$slug', params: { slug: random.slug } })
    }
  }

  // Filtered terms
  const filteredTerms = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()

    return TERMS.filter(term => {
      // Bookmark filter
      if (showBookmarksOnly && !bookmarkedIds.includes(term.id)) {
        return false
      }

      // Category filter
      if (selectedCategory !== null && term.categoryId !== selectedCategory) {
        return false
      }

      // Letter filter
      if (selectedLetter !== 'Tümü') {
        const firstChar = term.name.charAt(0).toUpperCase()
        if (firstChar !== selectedLetter) {
          return false
        }
      }

      // Query filter
      if (q) {
        const matchesName = term.name.toLowerCase().includes(q)
        const matchesTurkish = term.turkish?.toLowerCase().includes(q)
        const matchesExpansion = term.expansion?.toLowerCase().includes(q)
        const matchesDef = term.definition?.toLowerCase().includes(q)
        const matchesId = term.id.toString() === q
        return matchesName || matchesTurkish || matchesExpansion || matchesDef || matchesId
      }

      return true
    }).sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'category') return a.categoryId - b.categoryId || a.id - b.id
      return a.id - b.id
    })
  }, [searchQuery, selectedCategory, selectedLetter, sortBy, showBookmarksOnly, bookmarkedIds])

  const visibleTerms = filteredTerms.slice(0, pageSize)

  return (
    <main className="page-wrap py-8">
      {/* Header Banner */}
      <section className="glass-panel relative rounded-3xl p-6 sm:p-10 mb-8 overflow-hidden">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gradient-to-br from-sky-400/20 to-emerald-400/20 blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-sky-500" />
            <span>kodlama.org Açık Bilgi Bankası</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--sea-ink)] leading-tight">
            Yapay Zekâ Sözlüğü
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[var(--sea-ink-soft)] leading-relaxed">
            Klasik Makine Öğrenmesinden AGI ve Süperzekâ vizyonuna kadar <strong>16 kategoride 605 terim</strong>. Her kavram için teknik mekanizma, sezgisel açıklama, formüller ve pratik kullanım senaryoları.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
            <span className="px-3 py-1.5 rounded-lg bg-sky-500/10 text-sky-700 dark:text-sky-300 font-semibold border border-sky-500/20">
              ⚡ 605 Özgün Terim
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-500/20">
              📂 16 Kategori
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-700 dark:text-purple-300 font-semibold border border-purple-500/20">
              📐 Matematiksel Formüller
            </span>
            <button
              onClick={handleRandom}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--surface-strong)] border border-[var(--border-subtle)] text-[var(--sea-ink)] hover:border-sky-500/40 transition font-medium cursor-pointer shadow-sm ml-auto"
            >
              <Shuffle className="h-3.5 w-3.5 text-sky-500" />
              <span>Rastgele Terim Keşfet</span>
            </button>
          </div>
        </div>
      </section>

      {/* Search and Filters Bar */}
      <section className="space-y-4 mb-8">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Main Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setPageSize(24)
              }}
              placeholder="Terim adı, Türkçe karşılık veya kavram ara (Örn: Transformers, RAG, LoRA, GOFAI)..."
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--card-bg)] text-sm text-[var(--sea-ink)] placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Sort & Bookmarks Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--card-bg)] text-xs font-medium text-[var(--sea-ink)] focus:outline-none focus:border-sky-500 cursor-pointer shadow-sm"
            >
              <option value="id">Sırala: Madde No (#1-605)</option>
              <option value="name">Sırala: İsim (A-Z)</option>
              <option value="category">Sırala: Kategoriye Göre</option>
            </select>

            <button
              onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
              className={`inline-flex items-center gap-1.5 px-3 py-3 rounded-xl border text-xs font-semibold transition cursor-pointer shadow-sm ${
                showBookmarksOnly
                  ? 'bg-amber-500 text-white border-amber-600'
                  : 'bg-[var(--card-bg)] border-[var(--border-subtle)] text-[var(--sea-ink)] hover:border-amber-500/50'
              }`}
            >
              <Bookmark className={`h-3.5 w-3.5 ${showBookmarksOnly ? 'fill-white' : 'text-amber-500'}`} />
              <span>Kaydedilenler ({bookmarkedIds.length})</span>
            </button>
          </div>
        </div>

        {/* Alphabet quick jump */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs scrollbar-none">
          <span className="text-[11px] font-semibold text-slate-400 mr-1 flex items-center">
            Harf:
          </span>
          {ALPHABET.map(letter => (
            <button
              key={letter}
              onClick={() => {
                setSelectedLetter(letter)
                setPageSize(24)
              }}
              className={`px-2 py-1 rounded-md text-[11px] font-medium transition shrink-0 ${
                selectedLetter === letter
                  ? 'bg-sky-500 text-white font-bold'
                  : 'bg-[var(--chip-bg)] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Category Pills Slider / Grid */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-sky-500" />
              Kategoriler ({CATEGORIES.length})
            </span>
            {selectedCategory !== null && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-sky-500 hover:underline font-medium"
              >
                Filtreyi Temizle
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setSelectedCategory(null)
                setPageSize(24)
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                selectedCategory === null
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-[var(--chip-bg)] text-[var(--sea-ink-soft)] hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              Tüm Kategoriler ({TERMS.length})
            </button>

            {CATEGORIES.map(cat => {
              const isSelected = selectedCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(isSelected ? null : cat.id)
                    setPageSize(24)
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'bg-[var(--chip-bg)] text-[var(--sea-ink-soft)] hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{cat.badge || cat.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-sky-800 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-4 text-sm text-[var(--sea-ink-soft)]">
        <span>
          Toplam <strong>{filteredTerms.length}</strong> terim bulundu
          {selectedCategory && (
            <span className="ml-1 text-sky-600 dark:text-sky-400">
              ({CATEGORIES.find(c => c.id === selectedCategory)?.name})
            </span>
          )}
        </span>
        {filteredTerms.length > visibleTerms.length && (
          <span className="text-xs">
            Gösterilen: 1 - {visibleTerms.length}
          </span>
        )}
      </div>

      {/* Term Cards Grid */}
      {visibleTerms.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleTerms.map(term => (
            <TermCard
              key={term.id}
              term={term}
              isBookmarked={bookmarkedIds.includes(term.id)}
              onToggleBookmark={toggleBookmark}
            />
          ))}
        </section>
      ) : (
        <div className="text-center py-16 bg-[var(--surface)] rounded-2xl border border-[var(--border-subtle)]">
          <BookOpen className="h-12 w-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[var(--sea-ink)]">Aramanızla eşleşen terim bulunamadı</h3>
          <p className="text-sm text-[var(--sea-ink-soft)] mt-1 max-w-md mx-auto">
            "{searchQuery}" için sonuç çıkmadı. Farklı bir terim aramayı veya filtreleri temizlemeyi deneyin.
          </p>
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory(null)
              setSelectedLetter('Tümü')
              setShowBookmarksOnly(false)
            }}
            className="mt-4 px-4 py-2 rounded-lg bg-sky-500 text-white text-xs font-semibold hover:bg-sky-600 transition"
          >
            Tüm Filtreleri Temizle
          </button>
        </div>
      )}

      {/* Load More Button */}
      {filteredTerms.length > visibleTerms.length && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setPageSize(prev => prev + 24)}
            className="px-6 py-3 rounded-xl bg-[var(--card-bg)] border border-[var(--border-subtle)] hover:border-sky-500/50 text-sm font-semibold text-[var(--sea-ink)] shadow-sm hover:shadow transition"
          >
            Daha Fazla Terim Yükle ({filteredTerms.length - visibleTerms.length} kalan)
          </button>
        </div>
      )}
    </main>
  )
}

