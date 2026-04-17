import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Comments from '@/components/Comments'
import { yuyanEssays } from '@/data/essays'

export const metadata = {
  title: '寓言篇 · 芦泽溪散文集 · 我有所爱，且为所爱',
}

export default function YuyanPage() {
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
            寓言篇
          </h1>
          <p className="font-sans text-sm text-gray-400 dark:text-gray-500 tracking-wide">
            洛城东著 · 共三篇
          </p>
        </div>

        {/* 导言 */}
        <div className="prose-chinese text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-loose mb-12">
          <p>寓言篇，是《芦泽溪散文集》轻盈的收尾，却轻而不浮。</p>

          <p>寓言的妙处，在于用旁观者的眼睛看人间的正事。那些故事短，但余味长。洛城东选择以寓言作结，并非偷懒，而是一种智慧的选择——当直说已经说尽，绕道说，往往能说进更深的地方。</p>

          <p>《骏马与公鸡》，写两种截然不同的性情如何在同一个世界共处。骏马心怀壮志，公鸡自得其乐，看似风马牛不相及，却在某个节点产生了出人意料的交集。这个寓言在问：我们以为的高下之别，是否只是视角的差异？</p>

          <p>《新田园诗者》，写一位在城市边缘开辟菜园的人，被邻居视为异类，却在泥土里找到了别人找不到的东西。这是一则关于"逆流而行"的寓言——在一个追求效率与速度的时代，选择慢下来、选择与土地相处，需要一种特别的勇气，也需要一种特别的清醒。</p>

          <p>《长木刺与大地懒》，是寓言篇中最奇特的一篇。大地懒（giant sloth）是远古的庞然大物，行动迟缓却自有其道；长木刺是某些植物防御动物啃食的利器——这两者之间，隐藏着一段跨越千万年的协同演化故事。洛城东借这段自然史，写人与环境、速度与耐心、强力与智慧之间的微妙平衡。读完之后你会发现，那株长木刺，也许正在你窗外的某处默默生长。</p>

          <p>三篇读罢，合上书，世界还是那个世界，但你看它的眼睛，或许已经不同。</p>
        </div>

        {/* Essays */}
        <div className="space-y-1 mb-12">
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

        <div className="mb-10 text-center">
          <p className="font-sans text-xs text-gray-400 dark:text-gray-600 tracking-wide">
            共三篇
          </p>
        </div>

        {/* Comments */}
        <div className="border-t border-amber-200/40 dark:border-gray-800/60 pt-10">
          <Comments page="luzexi-yuyan" />
        </div>

      </main>

      <SiteFooter />
    </div>
  )
}
