import { Link } from '@tanstack/react-router'
import { Code2, Heart, MessageSquare, Sparkles } from 'lucide-react'
import { CATEGORIES_META } from '../data/categories-meta'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--border-subtle)] bg-[var(--surface)] backdrop-blur-md">
      <div className="page-wrap py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 text-lg font-bold text-[var(--sea-ink)] no-underline">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-sky-500 to-emerald-400 text-white shadow-sm">
                <Code2 className="h-4 w-4" />
              </div>
              <span className="text-xl font-extrabold tracking-tight">
                kodlama<span className="text-sky-500">.org</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-[var(--sea-ink-soft)] max-w-sm leading-relaxed">
              Türkiye'nin modern yazılım ve yapay zekâ geliştirici ekosistemi. Türkçe açık kaynak kaynaklar, derinlemesine kurslar ve 605 terimlik kapsamlı Yapay Zekâ Sözlüğü.
            </p>
            <div className="mt-4 flex items-center gap-3 text-[var(--sea-ink-soft)]">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-[var(--chip-bg)] hover:text-sky-500 transition">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-[var(--chip-bg)] hover:text-sky-500 transition">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a href="https://discord.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-[var(--chip-bg)] hover:text-sky-500 transition">
                <MessageSquare className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Dictionary categories links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--sea-ink)] flex items-center gap-1.5 mb-3">
              <Sparkles className="h-3.5 w-3.5 text-sky-500" />
              YZ Sözlüğü
            </h3>
            <ul className="space-y-2 text-xs text-[var(--sea-ink-soft)]">
              {CATEGORIES_META.slice(0, 6).map(c => (
                <li key={c.id}>
                  <Link
                    to="/sozluk"
                    search={{ category: c.id }}
                    className="hover:text-sky-500 transition block truncate"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/sozluk" className="text-sky-500 font-semibold hover:underline">
                  Tüm 16 Kategoriyi Gör →
                </Link>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--sea-ink)] mb-3">
              Kurslar & Eğitimler
            </h3>
            <ul className="space-y-2 text-xs text-[var(--sea-ink-soft)]">
              <li>
                <Link to="/kurslar" className="hover:text-sky-500 transition">
                  LLM & Ajan Mimarileri
                </Link>
              </li>
              <li>
                <Link to="/kurslar" className="hover:text-sky-500 transition">
                  Modern Full-Stack React & Node
                </Link>
              </li>
              <li>
                <Link to="/kurslar" className="hover:text-sky-500 transition">
                  Python & Derin Öğrenme
                </Link>
              </li>
              <li>
                <Link to="/kurslar" className="hover:text-sky-500 transition">
                  İleri Seviye .NET 9 & Mikroservis
                </Link>
              </li>
              <li>
                <Link to="/kurslar" className="hover:text-sky-500 transition">
                  Veri Yapıları & Algoritmalar
                </Link>
              </li>
            </ul>
          </div>

          {/* Community & Legal */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--sea-ink)] mb-3">
              Platform
            </h3>
            <ul className="space-y-2 text-xs text-[var(--sea-ink-soft)]">
              <li>
                <Link to="/about" className="hover:text-sky-500 transition">
                  kodlama.org Hakkında
                </Link>
              </li>
              <li>
                <Link to="/topluluk" className="hover:text-sky-500 transition">
                  Geliştirici Topluluğu
                </Link>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-sky-500 transition">
                  Katkıda Bulun (Açık Kaynak)
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-sky-500 transition">
                  Kullanım Koşulları & Gizlilik
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--sea-ink-soft)]">
          <p>© 2026 kodlama.org. Tüm hakları saklıdır. Açık kaynak eğitim projesi.</p>
          <p className="flex items-center gap-1">
            Geliştiriciler tarafından geliştiriciler için <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" /> ile tasarlandı.
          </p>
        </div>
      </div>
    </footer>
  )
}
