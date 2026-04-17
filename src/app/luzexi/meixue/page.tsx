import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Comments from '@/components/Comments'
import ViewCounter from '@/components/ViewCounter'

export const metadata = {
  title: '美学篇 · 芦泽溪散文集',
  description: '读书与观物的心得，音乐、文学、自然之美',
  openGraph: {
    title: '美学篇 · 芦泽溪散文集',
    description: '读书与观物的心得，音乐、文学、自然之美',
    siteName: '我有所爱',
  },
}

const articles = [
  '相见牡丹时', '银杏叶画的窥视美感', '生活美学——林语堂',
  '听雨的境界', '与万物同席', '从农夫与诗人困境到生活美定理',
  '时间——隐匿与显现的无形艺术师', '听一首老歌的回味之美',
  '求偶舞与花朵——艺术的存在论起源', '无花果里外的共生剧场',
  '诗意栖居之野蔷薇', '渐行渐远渐无人', '红隼：注意力与协作的艺术',
  '诗经里的生态美', '十月樱与广玉兰', '温庭筠清疏澹远诗境',
  '当片云落入芦苇荡', '艺术的君王蝶',
]

export default function MeixuePage() {
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
            美学篇
          </h1>
          <p className="font-sans text-sm text-gray-400 dark:text-gray-500 tracking-wide">
            洛城东著 · 共十八篇
          </p>
        </div>

        {/* 导言 */}
        <div className="prose-chinese text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-loose mb-12">
          <p>美学篇，是洛城东读书与观物的心得，也是他认识世界的方式。</p>

          <p>他写美，但从来不只是写美。美，在他笔下，是一种抵抗——抵抗消耗、抵抗平庸、抵抗那些让人忘记自己为何而活的日常。这十八篇，既有他最博学的一面，也有他最孩子气的惊喜。</p>

          <p>开篇《相见牡丹时》，写文人词之起始，读词与读人的那种豁然有悟的感受，是这一篇章的基调——美不是被讲解出来的，而是被体悟的。《银杏叶画的窥视美感》，借一枚叶脉清晰的银杏叶，谈视觉上的穿透感与边界之美。《生活美学——林语堂》，是对林语堂"生活的艺术"的当代回响，洛城东以自身经历印证那套悠然的人生哲学，并问：在当下这个节奏里，这样活着，还可能吗？《从农夫与诗人困境到生活美定理》则是一篇奇文：试图以定理论证来确立"生活美"命题的充分必要条件。</p>

          <p>《听雨的境界》，是全篇中最雅致的一篇。从听雨的心境，他层层深入，梳理出几种不同的感知境界：从感官到心灵，从热闹到清寂，从表面到内在。《与万物同席》，则是另一种视角的呈现——坐在溪边，鸟、虫、落叶与自己同处一席，没有主客之分。</p>

          <p>《求偶舞与花朵——艺术的存在论起源》，是全篇里最具思想力度的一篇。洛城东从生物界的求偶行为和花朵的进化，追问艺术为何存在，为何美感对生命而言是必要的，而非奢侈的。《无花果里外的共生剧场》，同样以自然为舞台，揭示无花果与黄蜂之间跨越千万年的共生契约，美得触目惊心。</p>

          <p>《渐行渐远渐无人》，写古典文化的消散与传承的忧虑，语调低回，令人动容。《红隼：注意力与协作的艺术》，以红隼的捕猎行为为引，谈注意力的专注与美感的生成。《艺术的君王蝶》，以帝王蝶的迁徙比拟艺术的流动，是美学篇收官之作，华丽而深沉。</p>

          <p>读完这十八篇，你或许会发现：美，不在远处，在你驻足的地方。</p>
        </div>

        {/* Article list */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-amber-200/40 dark:bg-gray-800/60" />
            <span className="font-sans text-xs text-gray-400 dark:text-gray-500 tracking-widest">篇目</span>
            <div className="flex-1 h-px bg-amber-200/40 dark:bg-gray-800/60" />
          </div>
          <div className="flex flex-wrap gap-x-1 gap-y-1">
            {articles.map((article, idx) => (
              <span key={idx} className="font-sans text-sm text-gray-500 dark:text-gray-400">
                <span>{article}</span>
                {idx < articles.length - 1 && (
                  <span className="mx-1 text-gray-300 dark:text-gray-700">·</span>
                )}
              </span>
            ))}
          </div>
          <p className="font-sans text-xs text-gray-400 dark:text-gray-600 tracking-wide mt-4">
            共 {articles.length} 篇
          </p>
        </div>

        {/* View counter + Comments */}
        <div className="border-t border-amber-200/40 dark:border-gray-800/60 pt-10">
          <div className="text-center mb-4">
            <ViewCounter page="luzexi-meixue" />
          </div>
          <Comments page="luzexi-meixue" />
        </div>

      </main>

      <SiteFooter />
    </div>
  )
}
