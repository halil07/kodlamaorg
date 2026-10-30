export interface AiTerm {
  id: number
  categoryId: number
  categoryName: string
  name: string
  expansion: string
  turkish: string
  definition: string
  purpose: string
  howItWorks: string
  example: string
  difference: string
  relatedText: string
  relatedIds: number[]
  slug: string
}

export interface AiCategory {
  id: number
  name: string
  description: string
  badge: string
  icon: string
  color: string
  count: number
}

export interface Course {
  id: string
  title: string
  instructor: string
  level: 'Başlangıç' | 'Orta' | 'İleri'
  duration: string
  studentsCount: number
  rating: number
  image: string
  category: string
  description: string
  tags: string[]
  isNew?: boolean
  isPopular?: boolean
}

