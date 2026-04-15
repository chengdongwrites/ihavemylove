import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { essays } from '@/data/essays'

export const metadata = {
  title: '散文 · 我有所爱，且为所爱',
}

// Group essays by section
const sections = essays.reduce((acc, essay) => {
  if (!acc[essay.section]) acc[essay.section] = []
  acc[essay.section].push(essay)
  return acc
}, {} as Record<string, typeof essays>)

export default function EssaysPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="chapter-title text-2xl sm:text-3xl text-ink dark:text-gray-100 tracking-widest mb-3">
            散文
          </h1>
          <p className="font-sans text-sm text-gray-400 dark:text-gray-500 tracking-wide">
            洛城东著 · 芦泽溪散文集
          </p>
          <div className="w-12 h-px bg-accent/40 dark:bg-amber-600/40 mx-auto mt-6" />
        </div>

        {/* Sections */}
        {Object.entries(sections).map(([sectionName, sectionEssays]) => (
          <div key={sectionName} className="mb-12">
            {/* Section header */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-serif text-accent dark:text-amber-500 text-base tracking-widest">
                {sectionName}
              </span>
              <div className="flex-1 h-px bg-amber-200/40 dark:bg-gray-800/60" />
            </div>

            {/* Essays in section */}
            <div className="space-y-1">
              {sectionEssays.map((essay, idx) => (
                <Link
                  key={essay.slug}
                  href={`/essays/${essay.slug}`}
                  className="group flex items-start gap-4 py-4 px-4 rounded-lg hover:bg-amber-50 dark:hover:bg-gray-900 transition-colors border border-transparent hover:border-amber-200/50 dark:hover:border-gray-700/50"
                >
                  {/* Index number */}
                  <div className="flex-shrink-0 w-8 text-center pt-0.5">
                    <span className="font-sans text-xs text-gray-400 dark:text-gray-600 tabular-nums">
                      {essay.num === 'ex' ? '附' : String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Essay info */}
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

                  {/* Arrow */}
                  <div className="flex-shrink-0 text-gray-300 dark:text-gray-700 group-hover:text-accent dark:group-hover:text-amber-600 transition-colors pt-0.5">
                    →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Bottom note */}
        <div className="mt-4 text-center">
          <p className="font-sans text-xs text-gray-400 dark:text-gray-600 tracking-wide">
            里海谷·芦泽溪畔
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
