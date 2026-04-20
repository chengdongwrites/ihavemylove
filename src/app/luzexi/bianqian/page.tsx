import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Comments from '@/components/Comments'
import ViewCounter from '@/components/ViewCounter'
import { bianqianEssays } from '@/data/essays'

const liveArticles = new Map(bianqianEssays.map((e) => [e.title, e.slug]))

export const metadata = {
  title: '变迁篇 · 芦泽溪散文集',
  description: '时代的漂移，记忆的沉淀，个人与历史的交汇处',
  openGraph: {
    title: '变迁篇 · 芦泽溪散文集',
    description: '时代的漂移，记忆的沉淀，个人与历史的交汇处',
    siteName: '我有所爱',
  },
}

const articles = [
  '雨山前', '告别童年', '以女儿的名义', '闲话变异与变迁',
  '那时红叶', '四月天，人间有美赛珍珠', '千屈菜', '又见南山绿',
  '时闻折竹声', '无依之地忍冬花', '磨难中的天才——苏东坡',
  '孤山独秀', '棠梨——遥远的记忆', '棠梨牵出12800公里连线', '严寒的逻辑',
  '静默生死哀思——哈姆奈特观感',
]

export default function BianqianPage() {
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
            变迁篇
          </h1>
          <p className="font-sans text-sm text-gray-400 dark:text-gray-500 tracking-wide">
            洛城东著 · 共十六篇
          </p>
        </div>

        {/* 导言 */}
        <div className="prose-chinese text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-loose mb-12">
          <p>变迁篇，是洛城东的生命地图，也是中国人在时代洪流中寻找自身位置的缩影。</p>

          <p>《雨山前》与《告别童年》，是这张地图的起点。雨山是童年的地标，溪边的少年尚不知道，他将走得多远，离得多久。告别童年不只是年岁的增长，也是一种世界观的更迭——从无忧无虑到专心求学，从单纯到复杂。这两篇放在篇首，像是变迁的序曲。</p>

          <p>《以女儿的名义》，是父亲视角的深情之作，透过女儿的成长映照出岁月的流动。《四月天，人间有美赛珍珠》，写赛珍珠（Pearl Buck）的一生，写文化跨越与桥梁——一个美国女子在中国活出了中国心，而洛城东则在美国活成了自己的模样。</p>

          <p>《千屈菜》，写的是一种湿地植物，在北美随处可见，却是入侵物种，四面受敌，仍年年盛放。这是变迁篇里最有深意的比喻之一——漂流者的处境，有时就是这样，在不属于自己的土地上，顽强而孤独地生长。《无依之地忍冬花》，同样以植物为镜，写在漂泊中自由绽放的生命力。</p>

          <p>《磨难中的天才——苏东坡》，是这一篇章的重心。苏东坡一生跌宕，屡遭贬谪，却以超然之心活出旷达之境。洛城东写苏东坡，也是在写自己所信仰的人生态度：磨难不能消除，但可以转化。《孤山独秀》，亦是此意的延伸——在险峻之地，那种傲然挺立的精神。</p>

          <p>最后，两篇《棠梨》尤为动人。《棠梨——遥远的记忆》写童年故乡的棠梨，《棠梨牵出12800公里连线》则写它如何牵出一条跨越大洋的情感线索。相距一万两千八百公里，写的似乎是乡愁，读出来的是安居。变迁，终究带来的不是失去，而是以另一种方式的拥有。</p>
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
                      href={`/luzexi/bianqian/${slug}`}
                      className="text-accent dark:text-amber-400 hover:underline"
                    >
                      {article}
                    </Link>
                  ) : (
                    <span>{article}</span>
                  )}
                  {idx < articles.length - 1 && (
                    <span className="mx-1 text-gray-300 dark:text-gray-700">·</span>
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
            <ViewCounter page="luzexi-bianqian" />
          </div>
          <Comments page="luzexi-bianqian" />
        </div>

      </main>

      <SiteFooter />
    </div>
  )
}
