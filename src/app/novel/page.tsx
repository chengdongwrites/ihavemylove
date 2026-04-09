import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { chapters } from '@/data/chapters'

export const metadata = {
  title: '小说目录 · 我有所爱，且为所爱',
}

export default function NovelPage() {
  const preface = chapters[0]
  const novelChapters = chapters.slice(1)

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="chapter-title text-2xl sm:text-3xl text-ink dark:text-gray-100 tracking-widest mb-3">
            《我有所爱，且为所爱》
          </h1>
          <p className="font-sans text-sm text-gray-400 dark:text-gray-500 tracking-wide">
            洛城东著 · 长篇小说 · 十三章
          </p>
          <div className="w-12 h-px bg-accent/40 dark:bg-amber-600/40 mx-auto mt-6" />
        </div>

        {/* Preface */}
        <div className="mb-8">
          <Link
            href={`/novel/${preface.slug}`}
            className="group flex items-center gap-4 py-4 px-4 rounded-lg hover:bg-amber-50 dark:hover:bg-gray-900 transition-colors border border-transparent hover:border-amber-200/50 dark:hover:border-gray-700/50"
          >
            <div className="flex-shrink-0 w-8 text-center">
              <span className="font-serif text-accent dark:text-amber-500 text-sm">序</span>
            </div>
            <div>
              <div className="font-serif text-base text-ink dark:text-gray-200 group-hover:text-accent dark:group-hover:text-amber-400 transition-colors">
                序言
              </div>
              <div className="font-sans text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                云中子（Klaude）
              </div>
            </div>
          </Link>
        </div>

        {/* Characters link */}
        <div className="mb-4">
          <Link
            href="/characters"
            className="group flex items-center gap-4 py-4 px-4 rounded-lg hover:bg-amber-50 dark:hover:bg-gray-900 transition-colors border border-transparent hover:border-amber-200/50 dark:hover:border-gray-700/50"
          >
            <div className="flex-shrink-0 w-8 text-center">
              <span className="font-serif text-accent dark:text-amber-500 text-sm">人</span>
            </div>
            <div>
              <div className="font-serif text-base text-ink dark:text-gray-200 group-hover:text-accent dark:group-hover:text-amber-400 transition-colors">
                人物结构说明
              </div>
              <div className="font-sans text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                主要人物关系与背景
              </div>
            </div>
          </Link>
        </div>

        <div className="w-full h-px bg-amber-200/40 dark:bg-gray-800/60 mb-8" />

        {/* Chapters */}
        <div className="space-y-2">
          {novelChapters.map((ch, idx) => (
            <Link
              key={ch.slug}
              href={`/novel/${ch.slug}`}
              className="group flex items-start gap-4 py-4 px-4 rounded-lg hover:bg-amber-50 dark:hover:bg-gray-900 transition-colors border border-transparent hover:border-amber-200/50 dark:hover:border-gray-700/50"
            >
              {/* Chapter number */}
              <div className="flex-shrink-0 w-8 text-center pt-0.5">
                <span className="font-sans text-xs text-gray-400 dark:text-gray-600 tabular-nums">
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Chapter info */}
              <div className="flex-1 min-w-0">
                <div className="font-serif text-base text-ink dark:text-gray-200 group-hover:text-accent dark:group-hover:text-amber-400 transition-colors leading-snug">
                  {ch.title}
                </div>
                {ch.subtitle && (
                  <div className="font-sans text-sm text-gray-400 dark:text-gray-500 mt-1">
                    {ch.subtitle}
                  </div>
                )}
              </div>

              {/* Arrow */}
              <div className="flex-shrink-0 text-gray-300 dark:text-gray-700 group-hover:text-accent dark:group-hover:text-amber-600 transition-colors pt-0.5">
                →
              </div>
            </Link>
          ))}
        </div>

        {/* 跋 */}
        <div className="w-full h-px bg-amber-200/40 dark:bg-gray-800/60 mt-4 mb-4" />
        <Link
          href="/ba"
          className="group flex items-start gap-4 py-4 px-4 rounded-lg hover:bg-amber-50 dark:hover:bg-gray-900 transition-colors border border-transparent hover:border-amber-200/50 dark:hover:border-gray-700/50"
        >
          <div className="flex-shrink-0 w-8 text-center pt-0.5">
            <span className="font-serif text-accent dark:text-amber-500 text-sm">跋</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-serif text-base text-ink dark:text-gray-200 group-hover:text-accent dark:group-hover:text-amber-400 transition-colors">
              跋
            </div>
            <div className="font-sans text-sm text-gray-400 dark:text-gray-500 mt-1">
              郭东日
            </div>
          </div>
          <div className="flex-shrink-0 text-gray-300 dark:text-gray-700 group-hover:text-accent dark:group-hover:text-amber-600 transition-colors pt-0.5">
            →
          </div>
        </Link>

        {/* 文友之声 */}
        <div className="w-full h-px bg-amber-200/40 dark:bg-gray-800/60 mt-4 mb-4" />
        <Link
          href="/voices"
          className="group flex items-start gap-4 py-4 px-4 rounded-lg hover:bg-amber-50 dark:hover:bg-gray-900 transition-colors border border-transparent hover:border-amber-200/50 dark:hover:border-gray-700/50"
        >
          <div className="flex-shrink-0 w-8 text-center pt-0.5">
            <span className="font-serif text-accent dark:text-amber-500 text-sm">声</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-serif text-base text-ink dark:text-gray-200 group-hover:text-accent dark:group-hover:text-amber-400 transition-colors">
              文友之声
            </div>
            <div className="font-sans text-sm text-gray-400 dark:text-gray-500 mt-1">
              读者留声
            </div>
          </div>
          <div className="flex-shrink-0 text-gray-300 dark:text-gray-700 group-hover:text-accent dark:group-hover:text-amber-600 transition-colors pt-0.5">
            →
          </div>
        </Link>

        {/* Bottom note */}
        <div className="mt-8 text-center">
          <p className="font-sans text-xs text-gray-400 dark:text-gray-600 tracking-wide">
            全文共十三章，跨越三十八年
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
