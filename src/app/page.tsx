import Link from 'next/link'
import Image from 'next/image'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import ViewCounter from '@/components/ViewCounter'
import Comments from '@/components/Comments'

export const metadata = {
  title: '我有所爱，且为所爱',
  description: '洛城东长篇小说——写小人物的大人生',
  openGraph: {
    title: '我有所爱，且为所爱',
    description: '洛城东长篇小说——写小人物的大人生',
    siteName: '我有所爱',
  },
}

export default function HomePage() {
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
            <p className="font-sans text-accent dark:text-amber-400 text-sm tracking-widest mb-5">
              洛城东著
            </p>
            <div className="w-16 h-px bg-accent/40 dark:bg-amber-600/40 mx-auto mb-8" />
            <p className="prose-chinese text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed text-center" style={{textIndent: 0}}>
              写小人物的大人生，<br />
              写在任何地方扎根，<br />
              活出自己的答案。
            </p>
          </div>
        </section>

        {/* 小说 */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-amber-200/40 dark:bg-gray-800/60" />
            <span className="font-sans text-xs text-gray-400 dark:text-gray-500 tracking-widest uppercase">小说</span>
            <div className="flex-1 h-px bg-amber-200/40 dark:bg-gray-800/60" />
          </div>

          <div className="flex flex-col sm:flex-row gap-10 items-start">
            {/* Cover */}
            <div className="flex-shrink-0 mx-auto sm:mx-0">
              <div className="relative w-52 sm:w-56 shadow-lg rounded overflow-hidden">
                <Image
                  src="/images/cover.jpg"
                  alt="《我有所爱，且为所爱》封面"
                  width={224}
                  height={316}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>

            {/* Preface excerpt */}
            <div className="flex-1">
              <h2 className="chapter-title text-lg text-accent dark:text-amber-400 mb-1 tracking-wider">
                我有所爱，且为所爱
              </h2>
              <p className="font-sans text-xs text-gray-400 dark:text-gray-500 tracking-wide mb-4">长篇小说</p>
              <div className="prose-chinese text-sm sm:text-base text-gray-700 dark:text-gray-300">
                <p>这是一部不寻常的小说，出自一位理工人之手，写他所熟悉的一群留学生。他们从大陆出发，经由奥斯汀、三藩市湾区、达拉斯，最终在东西岸扎下根来。</p>
                <p>这部小说跨越三十八年，共十三章。它不是线性的叙事。整个结构犹如一次深呼吸：深吸气，然后慢慢呼出。</p>
                <p>在故事接近终点，在一张饭桌上，她对几个孩子说出了全书的精神落点："我有所爱，且为所爱。"</p>
              </div>
              <div className="mt-6 flex gap-4 flex-wrap">
                <Link
                  href="/novel/xuyan"
                  className="inline-block font-sans text-sm text-accent dark:text-amber-400 border border-accent/50 dark:border-amber-600/50 px-5 py-2 rounded hover:bg-accent hover:text-white dark:hover:bg-amber-700 transition-colors tracking-wide"
                >
                  阅读序言 →
                </Link>
                <Link
                  href="/novel"
                  className="inline-block font-sans text-sm text-gray-500 dark:text-gray-400 border border-gray-300/50 dark:border-gray-700/50 px-5 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors tracking-wide"
                >
                  小说目录 →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 散文 */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-amber-200/40 dark:bg-gray-800/60" />
            <span className="font-sans text-xs text-gray-400 dark:text-gray-500 tracking-widest uppercase">散文</span>
            <div className="flex-1 h-px bg-amber-200/40 dark:bg-gray-800/60" />
          </div>

          <div className="flex flex-col sm:flex-row gap-10 items-start">
            {/* Cover */}
            <div className="flex-shrink-0 mx-auto sm:mx-0">
              <div className="relative w-52 sm:w-56 shadow-lg rounded overflow-hidden">
                <Image
                  src="/images/sanwen-cover.jpg"
                  alt="《芦泽溪散文集》封面"
                  width={224}
                  height={316}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Preface excerpt */}
            <div className="flex-1">
              <h2 className="chapter-title text-lg text-accent dark:text-amber-400 mb-1 tracking-wider">
                芦泽溪散文集
              </h2>
              <p className="font-sans text-xs text-gray-400 dark:text-gray-500 tracking-wide mb-4">散文集</p>
              <div className="prose-chinese text-sm sm:text-base text-gray-700 dark:text-gray-300">
                <p>这部散文集，是用心思听来的。七十二篇，五个篇章——家园、变迁、美学、存在、寓言。</p>
                <p>写的是里海谷的四季、走过的路、读书与观物的心得，以及关于存在的叩问。</p>
                <p>芦苇听风，溪水听石，洛城东听时间。他把听见的写下来，留给愿意一起聆听的人。</p>
              </div>
              <div className="mt-6 flex gap-4 flex-wrap">
                <Link
                  href="/luzexi/xuyan"
                  className="inline-block font-sans text-sm text-accent dark:text-amber-400 border border-accent/50 dark:border-amber-600/50 px-5 py-2 rounded hover:bg-accent hover:text-white dark:hover:bg-amber-700 transition-colors tracking-wide"
                >
                  阅读序言 →
                </Link>
                <Link
                  href="/luzexi"
                  className="inline-block font-sans text-sm text-gray-500 dark:text-gray-400 border border-gray-300/50 dark:border-gray-700/50 px-5 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors tracking-wide"
                >
                  散文目录 →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 诗词 */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-amber-200/40 dark:bg-gray-800/60" />
            <span className="font-sans text-xs text-gray-400 dark:text-gray-500 tracking-widest uppercase">诗词</span>
            <div className="flex-1 h-px bg-amber-200/40 dark:bg-gray-800/60" />
          </div>

          <div className="flex-1">
            <h2 className="chapter-title text-lg text-accent dark:text-amber-400 mb-1 tracking-wider">
              诗词集
            </h2>
            <p className="font-sans text-xs text-gray-400 dark:text-gray-500 tracking-wide mb-4">诗词创作</p>
            <div className="prose-chinese text-sm sm:text-base text-gray-700 dark:text-gray-300">
              <p>诗词写作，是洛城东心底最爱。片言只语的日积月累，已过千首，是他散文和小说中处处浮现的诗心与词魂。</p>
              <p className="font-sans text-xs text-gray-400 dark:text-gray-500 mt-4 tracking-wide">即将上线</p>
            </div>
          </div>
        </section>

        {/* About section */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
          <div className="border-t border-amber-200/40 dark:border-gray-800/60 pt-12">
            <div className="bg-amber-50/60 dark:bg-gray-900/60 rounded-lg p-6 sm:p-8">
              <h2 className="chapter-title text-lg text-ink dark:text-gray-100 tracking-wider mb-4">关于作者</h2>
              <p className="prose-chinese text-sm sm:text-base text-gray-700 dark:text-gray-300">
                笔名洛城东，取于2007年，当时身居洛杉矶东部。喜爱文学的理科生，从事独立投资和写作。著有长篇小说《我有所爱，且为所爱》、《芦泽溪散文集》，并有诗词千余首。
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

        {/* Homepage view counter + comments */}
        <section className="max-w-2xl mx-auto px-4 sm:px-6 pb-12">
          <div className="text-center mb-2">
            <ViewCounter page="home" />
          </div>
          <Comments page="home" />
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
