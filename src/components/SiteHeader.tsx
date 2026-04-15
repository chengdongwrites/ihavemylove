import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-paper/90 dark:bg-gray-950/90 backdrop-blur border-b border-amber-200/40 dark:border-gray-800/60">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-serif text-base sm:text-lg text-ink dark:text-gray-100 hover:text-accent dark:hover:text-amber-400 transition-colors tracking-wider">
          我有所爱
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6 text-sm font-sans">
          <Link href="/novel" className="nav-link tracking-wide">小说</Link>
          <Link href="/luzexi" className="nav-link tracking-wide">散文</Link>
          <Link href="/about" className="nav-link tracking-wide">作者</Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
