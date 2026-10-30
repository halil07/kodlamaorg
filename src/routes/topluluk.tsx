import { createFileRoute } from '@tanstack/react-router'
import { Users, MessageSquare, Award, Calendar } from 'lucide-react'

export const Route = createFileRoute('/topluluk')({
  component: ToplulukPage,
})

function ToplulukPage() {
  return (
    <main className="page-wrap py-10 space-y-12">
      {/* Top Banner */}
      <section className="glass-panel relative rounded-3xl p-8 sm:p-12 overflow-hidden text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 mb-4">
          <Users className="h-3.5 w-3.5" />
          <span>45.000+ Aktif Geliştirici</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--sea-ink)] tracking-tight">
          Birlikte Öğrenen, Paylaşan ve Üreten Yazılımcı Topluluğu
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[var(--sea-ink-soft)] max-w-2xl mx-auto leading-relaxed">
          kodlama.org topluluğunda sorularınıza anında yanıt bulun, çalışma gruplarına katılın, hackathon'larda yarışın ve açık kaynak projelere katkı verin.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://discord.com"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white font-semibold text-sm shadow-md transition flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Discord Topluluğumuza Katıl</span>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-strong)] hover:border-slate-400 text-[var(--sea-ink)] font-semibold text-sm transition flex items-center gap-2 shadow-sm"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <span>GitHub Organizasyonu</span>
          </a>
        </div>
      </section>

      {/* Community Channels & Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="modern-card rounded-2xl p-6">
          <div className="h-12 w-12 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center mb-4">
            <MessageSquare className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-lg text-[var(--sea-ink)]">Teknik Soru-Cevap & Destek</h3>
          <p className="text-xs sm:text-sm text-[var(--sea-ink-soft)] mt-2 leading-relaxed">
            Takıldığınız kod parçalarını, mimari kararları ve yapay zekâ modellerini kıdemli geliştiriciler ve mentörlerle tartışın.
          </p>
        </div>

        <div className="modern-card rounded-2xl p-6">
          <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
            <Calendar className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-lg text-[var(--sea-ink)]">Haftalık Çalışma Grupları</h3>
          <p className="text-xs sm:text-sm text-[var(--sea-ink-soft)] mt-2 leading-relaxed">
            Her Salı ve Perşembe akşamı ses kanallarında canlı kod incelemeleri, makale okumaları ve sözlük terim tartışmaları.
          </p>
        </div>

        <div className="modern-card rounded-2xl p-6">
          <div className="h-12 w-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-4">
            <Award className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-lg text-[var(--sea-ink)]">Hackathon & Proje Meydan Okumaları</h3>
          <p className="text-xs sm:text-sm text-[var(--sea-ink-soft)] mt-2 leading-relaxed">
            Aylık AI Agent hackathon'ları, açık kaynak ödüllü görevler ve takım kurma fırsatları.
          </p>
        </div>
      </section>
    </main>
  )
}
