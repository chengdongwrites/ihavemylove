import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { yuyanEssays } from '@/data/essays'

export const metadata = {
  title: '寓言篇 · 芦泽溪散文集 · 我有所爱，且为所爱',
}

export default function YuyanPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <Link href="/luzexi" className="font-sans text-xs text-gray-400 dark:text-gray-500 hover:text-accent dark:hover:text-amber-400 transition-colors tracking-widest block mb-4">
            ← 芦泽溪散文集
          </Link>
          <h1 className="chapter-title text-2xl sm:text-3xl text-ink dark:text-gray-100 tracking-widest mb-3">
            寓言篇
          </h1>
          <p className="font-sans text-sm text-gray-400 dark:text-gray-500 tracking-wide">
            洛城东著 · 以寓言之镜照见世道
          </p>
          <div className="w-12 h-px bg-accent/40 dark:bg-amber-600/40 mx-auto mt-6" />
        </div>

        {/* Essays */}
        <div className="space-y-1">
          {yuyanEssays.map((essay, idx) => (
            <Link
              key={essay.slug}
              href={`/luzexi/yuyan/${essay.slug}`}
              className="group flex items-start gap-4 py-4 px-4 rounded-lg hover:bg-amber-50 dark:hover:bg-gray-900 transition-colors border border-transparent hover:border-amber-200/50 dark:hover:border-gray-700/50"
            >
              <div className="flex-shrink-0 w-8 text-center pt-0.5">
                <span className="font-sans text-xs text-gray-400 dark:text-gray-600 tabular-nums">
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-serif text-base text-ink dark:text-gray-200 group-hover:text-accent dark:group-hover:text-amber-400 transition-colors leading-snug">
                  {essay.title}
                </div>
                {essay.subtitle && (
                  <div className="font-sans text-sm text-gray-400 dark:text-gray-500 mt-1">
                    {essay.subtitle}
                  </div>
                )}
              </div>
              <div className="flex-shrink-0 text-gray-300 dark:text-gray-700 group-hover:text-accent dark:group-hover:text-amber-600 transition-colors pt-0.5">
                →
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="font-sans text-xs text-gray-400 dark:text-gray-600 tracking-wide">
            共三篇
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
