import { Link } from '@tanstack/react-router'
import { BookOpen, Sparkles, Code2, Users, Compass, Search } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--header-bg)] backdrop-blur-xl transition-colors">
      <nav className="page-wrap flex items-center justify-between gap-4 py-3">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-[var(--sea-ink)] no-underline group"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-500 to-emerald-400 text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Code2 className="h-5 w-5" />
            </div>
            <span className="flex items-center text-xl font-extrabold tracking-tight">
              kodlama<span className="text-sky-500">.org</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 text-sm">
            <Link
              to="/"
              className="nav-link"
              activeProps={{ className: 'nav-link is-active' }}
              activeOptions={{ exact: true }}
            >
              Ana Sayfa
            </Link>

            <Link
              to="/sozluk"
              className="nav-link relative group"
              activeProps={{ className: 'nav-link is-active' }}
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-sky-500 animate-pulse" />
                <span className="font-semibold text-sky-600 dark:text-sky-400">YZ Sözlüğü</span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/10 text-sky-600 dark:text-sky-300 border border-sky-500/20">
                  605 Terim
                </span>
              </span>
            </Link>

            <Link
              to="/kurslar"
              className="nav-link"
              activeProps={{ className: 'nav-link is-active' }}
            >
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 opacity-70" />
                Kurslar
              </span>
            </Link>

            <Link
              to="/topluluk"
              className="nav-link"
              activeProps={{ className: 'nav-link is-active' }}
            >
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4 opacity-70" />
                Topluluk
              </span>
            </Link>

            <Link
              to="/about"
              className="nav-link"
              activeProps={{ className: 'nav-link is-active' }}
            >
              Hakkında
            </Link>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2.5">
          <Link
            to="/sozluk"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-[var(--border-subtle)] bg-[var(--chip-bg)] text-[var(--sea-ink-soft)] hover:text-[var(--sea-ink)] hover:border-sky-500/40 transition"
          >
            <Search className="h-3.5 w-3.5 text-sky-500" />
            <span>Sözlükte Ara...</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] bg-slate-200 dark:bg-slate-700 rounded border border-slate-300 dark:border-slate-600 font-mono">
              /
            </kbd>
          </Link>

          <ThemeToggle />

          <Link
            to="/sozluk"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white shadow-sm shadow-sky-500/25 transition active:scale-95"
          >
            <span>Keşfet</span>
            <Compass className="h-3.5 w-3.5" />
          </Link>
        </div>
      </nav>
    </header>
  )
}
