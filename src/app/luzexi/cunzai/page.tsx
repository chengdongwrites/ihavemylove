import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Comments from '@/components/Comments'
import ViewCounter from '@/components/ViewCounter'
import { cunzaiEssays } from '@/data/essays'

// Articles that are live (have individual pages)
const liveArticles = new Map(cunzaiEssays.map((e) => [e.title, e.slug]))

export const metadata = {
  title: '存在篇 · 芦泽溪散文集',
  description: '生命与存在的叩问——人在世间，究竟如何栖居',
  openGraph: {
    title: '存在篇 · 芦泽溪散文集',
    description: '生命与存在的叩问——人在世间，究竟如何栖居',
    siteName: '我有所爱',
  },
}

const articles = [
  '偶然人生之赌', '大雪后的费纳戈时刻', '信天翁的悲欢离合',
  '冬雾中的溪径行', '秋之盟约', '山凤凰', '技术与救赎',
  'AI时代的全民焦虑', '说静', '物物者非物', '静默之言说',
]

export default function CunzaiPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-12">

        {/* Breadcrumb */}
        <div className="mb-10">
          <Link href="/luzexi" className="font-sans text-xs text-gray-400 dark:text-gray-500 hover:text-accent dark:hover:text-amber-400 transition-colors tracking-widest">
            ← 芦泽溪散文集
          </Link>
        </div>

        {/* Title */}
        <div className="mb-10 border-b border-amber-200/40 dark:border-gray-800/60 pb-10">
          <h1 className="chapter-title text-2xl sm:text-3xl text-ink dark:text-gray-100 tracking-widest mb-3">
            存在篇
          </h1>
          <p className="font-sans text-sm text-gray-400 dark:text-gray-500 tracking-wide">
            洛城东著 · 共十一篇
          </p>
        </div>

        {/* 导言 */}
        <div className="prose-chinese text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-loose mb-12">
          <p>存在篇，是《芦泽溪散文集》的重心所在。</p>

          <p>说重心，不是说它最厚，而是说它最沉。这十一篇文字，不在讲道理，而在叩问。洛城东走到溪边，走到冬雾里，走到大雪后的空旷之地，是为了问一些他在书斋里不曾遇见的问题：人在世间，究竟如何栖居？时间流逝，而我们如何说静？技术日新，而救赎是否仍有可能？</p>

          <p>《偶然人生之赌》，是存在篇的序曲。人的一生，从出生的那一刻起，就是一场赌局——不是主动选择的赌，而是被抛入的赌。洛城东直视这个问题，并不退缩，而是追问：既然是赌，我们如何赌得有尊严，赌得有意义？</p>

          <p>《大雪后的费纳戈时刻》，是全集中最具诗意与哲学张力的篇章之一。"费纳戈时刻"（Finagle moment）描述那种在大雪之后，生活被悬置的体验。</p>

          <p>《信天翁的悲欢离合》，以信天翁一生的飞翔与归宿，书写孤独与爱的辩证。信天翁可以在海上飞行数年，却终究会回到出生的岛屿寻找伴侣——那种漫长的漂泊与必然的归来，是对真实生态的寻问。《山凤凰》，则以诗剧的形式，写诗人对人间生命的跨越物种的共情。</p>

          <p>《技术与救赎》与《AI时代的全民焦虑》，是存在篇中最切近当代的两篇。洛城东身为理工人，不回避技术的现实，但他也不迷信技术。他追问的是：当算法可以替代越来越多的人类能力，救赎这件事，仍然属于人吗？这个焦虑，不只属于某一代人，而属于所有正在经历这场变局的人。</p>

          <p>《说静》《物物者非物》《静默之言说》，三篇相互呼应，是存在篇最深处的声音。洛城东在这里不再叙事，而是沉思。他谈静，不是消极的沉默，而是一种主动的聆听；他谈"物物者非物"，是庄子的回响，也是他自己对主体与客体关系的深层体悟；《静默之言说》，则以静默本身为题，追寻两位相隔千年的哲人的深度共鸣，以探问那些语言无法捕捉、本真存在的意义。</p>

          <p>这些问题也许都没有答案，散文是陪着读者坐在问题旁边，一起思索。</p>
        </div>

        {/* Article list */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-amber-200/40 dark:bg-gray-800/60" />
            <span className="font-sans text-xs text-gray-400 dark:text-gray-500 tracking-widest">篇目</span>
            <div className="flex-1 h-px bg-amber-200/40 dark:bg-gray-800/60" />
          </div>
          <div className="flex flex-wrap gap-x-1 gap-y-1">
            {articles.map((article, idx) => {
              const slug = liveArticles.get(article)
              return (
                <span key={idx} className="font-sans text-sm text-gray-500 dark:text-gray-400">
                  {slug ? (
                    <Link
                      href={`/luzexi/cunzai/${slug}`}
                      className="text-amber-700 dark:text-amber-300 font-medium hover:underline"
                    >
                      {article}
                    </Link>
                  ) : (
                    <span>{article}</span>
                  )}
                  {idx < articles.length - 1 && (
                    <span className="mx-1 text-gray-400 dark:text-gray-500 text-base">·</span>
                  )}
                </span>
              )
            })}
          </div>
          <p className="font-sans text-xs text-gray-400 dark:text-gray-600 tracking-wide mt-4">
            共 {articles.length} 篇
          </p>
        </div>

        {/* View counter + Comments */}
        <div className="border-t border-amber-200/40 dark:border-gray-800/60 pt-10">
          <div className="text-center mb-4">
            <ViewCounter page="luzexi-cunzai" />
          </div>
          <Comments page="luzexi-cunzai" />
        </div>

      </main>

      <SiteFooter />
    </div>
  )
}
