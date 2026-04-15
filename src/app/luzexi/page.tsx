import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { essays } from '@/data/essays'

export const metadata = {
  title: '芦泽溪散文集 · 我有所爱，且为所爱',
}

// Sections with their current status
const sections = [
  {
    name: '家园篇',
    slug: 'jiayuan',
    description: '里海谷的四季、溪径与花木，家的重量与根的延伸。',
    count: essays.filter((e) => e.section === '家园篇').length,
    available: true,
  },
  {
    name: '变迁篇',
    slug: 'bianqian',
    description: '时代的漂移，记忆的沉淀，个人与历史的交汇处。',
    count: null,
    available: false,
  },
  {
    name: '存在篇',
    slug: 'cunzai',
    description: '生命与存在的叩问，信天翁的悲欢，以及时间的重量。',
    count: null,
    available: false,
  },
  {
    name: '寓言篇',
    slug: 'yuyan',
    description: '以寓言之镜照见世道，虚中见实，曲中见直。',
    count: null,
    available: false,
  },
  {
    name: '美学篇',
    slug: 'meixue',
    description: '音乐、文学、自然之美，以及感知世界的方式。',
    count: null,
    available: false,
  },
]

// Pick a featured essay (first one)
const featured = essays[0]

export default function LuzhexiPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-20 sm:py-28 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="chapter-title text-3xl sm:text-4xl md:text-5xl text-ink dark:text-gray-100 mb-4 tracking-widest">
              芦泽溪散文集
            </h1>
            <p className="font-sans text-accent dark:text-amber-400 text-sm tracking-widest mb-5">
              洛城东著
            </p>
            <div className="w-16 h-px bg-accent/40 dark:bg-amber-600/40 mx-auto mb-8" />
            <p className="prose-chinese text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed text-center" style={{ textIndent: 0 }}>
              以文字为溪，<br />
              以岁月为岸，<br />
              一篇篇写下在异乡生根的心。
            </p>
          </div>
        </section>

        {/* Featured essay excerpt */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
          <div className="border border-amber-200/40 dark:border-gray-800/60 rounded-lg p-6 sm:p-8 bg-amber-50/30 dark:bg-gray-900/30">
            <p className="font-sans text-xs text-gray-400 dark:text-gray-500 tracking-widest mb-3 uppercase">
              家园篇 · 首篇
            </p>
            <h2 className="chapter-title text-lg sm:text-xl text-accent dark:text-amber-400 mb-4 tracking-wider">
              {featured.title}
            </h2>
            <div className="prose-chinese text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              <p style={{ textIndent: '2em' }}>
                {featured.content.split('\n').find(l => l.trim().length > 20) ?? ''}
              </p>
              <p style={{ textIndent: '2em' }}>
                {featured.content.split('\n').filter(l => l.trim().length > 20)[1] ?? ''}
              </p>
            </div>
            <Link
              href={`/essays/${featured.slug}`}
              className="font-sans text-sm nav-link tracking-wide"
            >
              继续阅读 →
            </Link>
          </div>
        </section>

        {/* Sections */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-amber-200/40 dark:bg-gray-800/60" />
            <span className="font-sans text-xs text-gray-400 dark:text-gray-500 tracking-widest uppercase">全集篇目</span>
            <div className="flex-1 h-px bg-amber-200/40 dark:bg-gray-800/60" />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {sections.map((section) => (
              <div key={section.name}>
                {section.available ? (
                  <Link
                    href="/essays"
                    className="group block p-5 rounded-lg border border-amber-200/50 dark:border-gray-700/50 hover:bg-amber-50 dark:hover:bg-gray-900 transition-colors"
                  >
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="font-serif text-base text-ink dark:text-gray-200 group-hover:text-accent dark:group-hover:text-amber-400 transition-colors tracking-wider">
                        {section.name}
                      </span>
                      {section.count !== null && (
                        <span className="font-sans text-xs text-gray-400 dark:text-gray-600">
                          {section.count} 篇
                        </span>
                      )}
                    </div>
                    <p className="font-sans text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      {section.description}
                    </p>
                    <p className="font-sans text-xs text-accent dark:text-amber-500 mt-3 tracking-wide">
                      阅读全篇 →
                    </p>
                  </Link>
                ) : (
                  <div className="p-5 rounded-lg border border-amber-200/20 dark:border-gray-800/40 opacity-50">
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="font-serif text-base text-ink dark:text-gray-200 tracking-wider">
                        {section.name}
                      </span>
                      <span className="font-sans text-xs text-gray-400 dark:text-gray-600">
                        待续
                      </span>
                    </div>
                    <p className="font-sans text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
