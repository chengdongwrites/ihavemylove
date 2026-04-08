import Link from 'next/link'
import Image from 'next/image'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { chapters } from '@/data/chapters'

export default function HomePage() {
  const novelChapters = chapters.filter(ch => ch.num !== '01')

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-20 sm:py-28 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="chapter-title text-3xl sm:text-4xl md:text-5xl text-ink dark:text-gray-100 mb-4 tracking-widest">
              我有所爱，且为所爱
            </h1>
            <p className="font-sans text-accent dark:text-amber-400 text-sm tracking-widest mb-8">
              城东（洛城东）著
            </p>
            <div className="w-16 h-px bg-accent/40 dark:bg-amber-600/40 mx-auto mb-8" />
            <p className="prose-chinese text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed text-center" style={{textIndent: 0}}>
              写，不是为了宏大叙事，<br />
              而是为了真实的小人物，<br />
              写小人物的大人生。
            </p>
          </div>
        </section>

        {/* Cover + Preface */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
          <div className="flex flex-col sm:flex-row gap-10 items-start">
            {/* Cover */}
            <div className="flex-shrink-0 mx-auto sm:mx-0">
              <div className="relative w-52 sm:w-56 shadow-lg rounded overflow-hidden">
                <Image
                  src="/images/cover.png"
                  alt="《我有所爱，且为所爱》封面"
                  width={224}
                  height={320}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>

            {/* Preface excerpt */}
            <div className="flex-1">
              <h2 className="chapter-title text-lg text-accent dark:text-amber-400 mb-4 tracking-wider">序言节选</h2>
              <div className="prose-chinese text-sm sm:text-base text-gray-700 dark:text-gray-300">
                <p>这是一部不寻常的小说，出自一位理工人之手，写他所熟悉的一群留学生。他们从大陆出发，经由奥斯汀、三藩市湾区、达拉斯，最终在东西岸扎下根来。</p>
                <p>这部小说跨越三十八年，共十三章。它不是线性的叙事。整个结构犹如一次深呼吸：深吸气，然后慢慢呼出。</p>
                <p>在故事接近终点，在一张饭桌上，她对几个孩子说出了全书的精神落点："我有所爱，且为所爱。"</p>
              </div>
              <div className="mt-6">
                <Link
                  href="/novel/xuyan"
                  className="inline-block font-sans text-sm text-accent dark:text-amber-400 border border-accent/50 dark:border-amber-600/50 px-5 py-2 rounded hover:bg-accent hover:text-white dark:hover:bg-amber-700 transition-colors tracking-wide"
                >
                  阅读序言 →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Novel section */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
          <div className="border-t border-amber-200/40 dark:border-gray-800/60 pt-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="chapter-title text-xl text-ink dark:text-gray-100 tracking-widest">小说目录</h2>
              <Link href="/novel" className="font-sans text-sm nav-link tracking-wide">
                查看全部 →
              </Link>
            </div>

            <div className="space-y-3">
              {novelChapters.map((ch, idx) => (
                <Link
                  key={ch.slug}
                  href={`/novel/${ch.slug}`}
                  className="group flex items-baseline gap-3 py-2.5 px-3 rounded hover:bg-amber-50 dark:hover:bg-gray-900 transition-colors"
                >
                  <span className="font-sans text-xs text-gray-400 dark:text-gray-600 w-5 flex-shrink-0 tabular-nums">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="font-serif text-ink dark:text-gray-200 group-hover:text-accent dark:group-hover:text-amber-400 transition-colors">
                    {ch.title}
                  </span>
                  {ch.subtitle && (
                    <span className="font-sans text-xs text-gray-400 dark:text-gray-500 hidden sm:inline">
                      {ch.subtitle}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* About section */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
          <div className="border-t border-amber-200/40 dark:border-gray-800/60 pt-12">
            <div className="bg-amber-50/60 dark:bg-gray-900/60 rounded-lg p-6 sm:p-8">
              <h2 className="chapter-title text-lg text-ink dark:text-gray-100 tracking-wider mb-4">关于作者</h2>
              <p className="prose-chinese text-sm sm:text-base text-gray-700 dark:text-gray-300">
                笔名城东（洛城东）。理工人，居美多年，写他所熟悉的一群留学生，写小人物在现实世界里如何栖居，如何在任何地方扎根，活出自己的答案。
              </p>
              <div className="mt-4">
                <Link
                  href="/about"
                  className="font-sans text-sm nav-link tracking-wide"
                >
                  了解更多 →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
