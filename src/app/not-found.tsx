import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="font-serif text-4xl text-accent/30 dark:text-amber-800/30 mb-6">404</p>
          <h1 className="font-serif text-xl text-ink dark:text-gray-200 mb-4 tracking-wide">此页不存在</h1>
          <Link href="/" className="font-sans text-sm nav-link">
            ← 回到主页
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
