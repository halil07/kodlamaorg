import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { BookOpen, Star, Clock, Users, ArrowUpRight, Sparkles, Filter } from 'lucide-react'
import { COURSES } from '../data/courses'

export const Route = createFileRoute('/kurslar')({
  component: KurslarPage,
})

function KurslarPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü')
  const [selectedLevel, setSelectedLevel] = useState<string>('Tümü')

  const categories = ['Tümü', 'Yapay Zekâ', 'Web Geliştirme', 'Backend', 'Temel Bilgisayar Bilimi', 'DevOps & Bulut']
  const levels = ['Tümü', 'Başlangıç', 'Orta', 'İleri']

  const filteredCourses = COURSES.filter(course => {
    if (selectedCategory !== 'Tümü' && course.category !== selectedCategory) return false
    if (selectedLevel !== 'Tümü' && course.level !== selectedLevel) return false
    return true
  })

  return (
    <main className="page-wrap py-10">
      {/* Header */}
      <section className="glass-panel relative rounded-3xl p-8 sm:p-12 mb-10 overflow-hidden">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-3">
            <BookOpen className="h-3.5 w-3.5" />
            <span>kodlama.org Akademi</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--sea-ink)] tracking-tight">
            Geleceğin Teknolojileriyle Kariyerini Şekillendir
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[var(--sea-ink-soft)] leading-relaxed">
            Sıfırdan ileri seviyeye, sektör standartlarında gerçek projelerle yazılım ve yapay zekâ mühendisliği kampları.
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-semibold text-slate-400 mr-2 flex items-center gap-1">
            <Filter className="h-3.5 w-3.5" />
            Kategori:
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-sky-500 text-white font-semibold shadow-sm'
                  : 'bg-[var(--chip-bg)] text-[var(--sea-ink-soft)] hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-slate-400 mr-1">Seviye:</span>
          {levels.map(lvl => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                selectedLevel === lvl
                  ? 'bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold'
                  : 'bg-[var(--chip-bg)] text-[var(--sea-ink-soft)] hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <article
            key={course.id}
            className="modern-card group flex flex-col justify-between rounded-2xl overflow-hidden border border-[var(--border-subtle)] hover:shadow-xl transition-all duration-200"
          >
            {/* Image & Badges */}
            <div className="relative h-44 overflow-hidden bg-slate-900">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md border border-white/10">
                  {course.category}
                </span>
                {course.isNew && (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500 text-white shadow-sm flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    Yeni
                  </span>
                )}
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

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold text-sky-600 dark:text-sky-400 block mb-1">
                  Seviye: {course.level}
                </span>
                <h3 className="font-bold text-base text-[var(--sea-ink)] leading-snug group-hover:text-sky-500 transition">
                  {course.title}
                </h3>
                <p className="mt-2 text-xs text-[var(--sea-ink-soft)] leading-relaxed line-clamp-3">
                  {course.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {course.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-5 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-[var(--sea-ink-soft)] font-medium">
                  <Users className="h-3.5 w-3.5" />
                  {course.studentsCount.toLocaleString('tr-TR')} Kayıtlı
                </span>
                <button className="inline-flex items-center gap-1 font-bold text-sky-600 dark:text-sky-400 hover:underline">
                  <span>İncele</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}

