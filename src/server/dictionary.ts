import { createServerFn } from '@tanstack/react-start'
import { terms, categories } from '../db/schema'
import rawTermRows from '../data/terms.json'
import rawCategoryRows from '../data/categories.json'
import type { AiTerm, AiCategory } from '../data/types'

function formatTerm(row: typeof terms.$inferSelect): AiTerm {
  return {
    id: row.id,
    categoryId: row.categoryId,
    categoryName: row.categoryName,
    name: row.name,
    expansion: row.expansion,
    turkish: row.turkish,
    definition: row.definition,
    purpose: row.purpose,
    howItWorks: row.howItWorks,
    example: row.example,
    difference: row.difference,
    relatedText: row.relatedText,
    relatedIds: typeof row.relatedIds === 'string' ? JSON.parse(row.relatedIds) : row.relatedIds,
    slug: row.slug,
  }
}

function formatCategory(row: typeof categories.$inferSelect): AiCategory {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    badge: row.badge,
    icon: row.icon,
    color: row.color,
    count: row.count,
  }
}

// -------------------------------------------------------------
// High-Performance In-Memory Cache Layer
// Eliminates redundant SQLite queries on static dictionary data
// -------------------------------------------------------------
interface DictionaryCache {
  terms: AiTerm[]
  categories: AiCategory[]
  termsById: Map<number, AiTerm>
  termsBySlug: Map<string, AiTerm>
  categoriesById: Map<number, AiCategory>
  featuredTerms: AiTerm[]
}

let cache: DictionaryCache | null = null

function getOrInitializeCache(): DictionaryCache {
  if (cache) {
    return cache
  }

  // Static dictionary data bundled at build time (Cloudflare/edge friendly)
  const termRows = (rawTermRows as Array<typeof terms.$inferSelect>)
    .slice()
    .sort((a, b) => a.id - b.id)
  const catRows = (rawCategoryRows as Array<typeof categories.$inferSelect>)
    .slice()
    .sort((a, b) => a.id - b.id)

  const formattedCategories = catRows.map(formatCategory)
  const categoriesById = new Map<number, AiCategory>()
  for (const c of formattedCategories) {
    categoriesById.set(c.id, c)
  }

  const formattedTerms = termRows.map(formatTerm)
  const termsById = new Map<number, AiTerm>()
  const termsBySlug = new Map<string, AiTerm>()

  for (const t of formattedTerms) {
    termsById.set(t.id, t)
    termsBySlug.set(t.slug.toLowerCase(), t)
  }

  const featuredIds = [1, 70, 151, 153, 196, 244, 273, 326, 363, 396, 516, 576]
  const featuredTerms = featuredIds
    .map(id => termsById.get(id))
    .filter((t): t is AiTerm => Boolean(t))

  cache = {
    terms: formattedTerms,
    categories: formattedCategories,
    termsById,
    termsBySlug,
    categoriesById,
    featuredTerms,
  }

  return cache
}

// Exported cache invalidation in case data is updated at runtime
export function invalidateDictionaryCache() {
  cache = null
}

// -------------------------------------------------------------
// Server Functions (Zero-DB overhead after single initial load)
// -------------------------------------------------------------

// Fetch all terms (served in O(1) from in-memory cache)
export const getAllTermsFn = createServerFn({ method: 'GET' }).handler(async () => {
  const { terms } = getOrInitializeCache()
  return terms
})

// Fetch all categories (served in O(1) from in-memory cache)
export const getAllCategoriesFn = createServerFn({ method: 'GET' }).handler(async () => {
  const { categories } = getOrInitializeCache()
  return categories
})

// Fetch single term by slug or ID with related items and prev/next links
export const getTermBySlugFn = createServerFn({ method: 'GET' })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    if (!slug) return null

    const { termsById, termsBySlug, categoriesById, terms } = getOrInitializeCache()
    const clean = slug.toLowerCase().trim()

    // 1. O(1) lookup by slug
    let term = termsBySlug.get(clean)

    // 2. O(1) lookup fallback by ID if numeric
    if (!term && /^\d+$/.test(clean)) {
      term = termsById.get(parseInt(clean, 10))
    }

    if (!term) return null

    // 3. O(1) lookup for related terms
    let related: AiTerm[] = []
    if (term.relatedIds && term.relatedIds.length > 0) {
      related = term.relatedIds
        .map(id => termsById.get(id))
        .filter((t): t is AiTerm => Boolean(t))
    } else {
      related = terms
        .filter(t => t.categoryId === term!.categoryId && t.id !== term!.id)
        .slice(0, 4)
    }

    // 4. O(1) category lookup
    const category = categoriesById.get(term.categoryId) || null

    // 5. O(1) prev & next term lookups
    const prevTerm = termsById.get(term.id - 1) || null
    const nextTerm = termsById.get(term.id + 1) || null

    return {
      term,
      related,
      category,
      prevTerm: prevTerm ? { id: prevTerm.id, name: prevTerm.name, slug: prevTerm.slug } : null,
      nextTerm: nextTerm ? { id: nextTerm.id, name: nextTerm.name, slug: nextTerm.slug } : null,
    }
  })

// Fetch random term (served instantly without SQL ORDER BY RANDOM())
export const getRandomTermFn = createServerFn({ method: 'GET' }).handler(async () => {
  const { terms } = getOrInitializeCache()
  if (terms.length === 0) return null
  const idx = Math.floor(Math.random() * terms.length)
  return terms[idx]
})

// Fetch featured terms (served in O(1) from in-memory cache)
export const getFeaturedTermsFn = createServerFn({ method: 'GET' }).handler(async () => {
  const { featuredTerms } = getOrInitializeCache()
  return featuredTerms
})
