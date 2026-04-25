import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Comments from '@/components/Comments'
import ViewCounter from '@/components/ViewCounter'
import { yuyanEssays } from '@/data/essays'

export const metadata = {
  title: '寓言篇 · 芦泽溪散文集',
  description: '以寓言之镜照见世道，虚中见实，曲中见直',
  openGraph: {
    title: '寓言篇 · 芦泽溪散文集',
    description: '以寓言之镜照见世道，虚中见实，曲中见直',
    siteName: '我有所爱',
  },
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
          <p>寓言篇，是《芦泽溪散文集》别具一格的收尾。</p>

          <p>这三篇文字，用的是寓言的壳，装的却是当代的心事。寓言的好处是可以说远一点，说远了，反而说得更准。</p>

          <p>《骏马与公鸡》，故事发生在帕萨迪纳新年玫瑰花车游行的队伍里。一匹仪容华贵的骑兵马，脚踝上饰有一圈羽毛；一只好勇斗狠的公鸡，把那圈羽毛认作了同类的尾翼，奋勇扑上。骚乱随之而来，公鸡最终叼走了那簇羽毛——直到被另一匹马的蹄子踩断了颈骨，犹死不松口。这是一则关于执念的寓言：对手已不在，胜利已无意义，手里攥着的那样东西，却一刻也不肯放。</p>

          <p>《新田园诗者》，写一个坐落于宾夕法尼亚的未来农庄社区。这里的居民是医生、剧作家、工程师，他们用自动机器人耕种，用太阳能"电马"代步，同时必须掌握一门外语、修习一门艺术。他们的创作——诗歌、绘画、音乐——被卖给AI公司作为大语言模型的训练素材，而且价格不菲。这是一则关于AI时代的田园寓言：当机器可以耕种，人的价值，也许正在回归那些机器最难以复制的东西。</p>

          <p>《长木刺与大地懒》，是三篇中最古典的一篇，也是最有锋芒的一篇。皂荚树长出尖刺，本为惩罚贪食的大地懒；大地懒欲罢不能，两者相持，愈战愈烈，最终惊动河神——大地懒一族因此湮灭，皂荚树的尖刺也被悉数抹去。故事至此，藏着一个出人意料的转折：树在事后才恍然明白，它所谓的"正义"，其实不过是施痛的快感。惩罚者以正义为名，却在伤害中得到满足——这才是这个寓言真正要讽刺的东西。失去尖刺之后，树以荫凉待人，得名"皂荚"；大地懒则只剩树上的远亲，带着那句告诫存活至今。</p>

          <p>三篇读罢，合上书，世界还是那个世界，但你看它的眼睛，或许已经不同。</p>
        </div>

        {/* Article list */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-amber-200/40 dark:bg-gray-800/60" />
            <span className="font-sans text-xs text-gray-400 dark:text-gray-500 tracking-widest">篇目</span>
            <div className="flex-1 h-px bg-amber-200/40 dark:bg-gray-800/60" />
          </div>
          <div className="flex flex-wrap gap-x-1 gap-y-1">
            {yuyanEssays.map((essay, idx) => {
              const isLast = idx === yuyanEssays.length - 1
              return (
                <span key={essay.slug} className="font-sans text-sm text-gray-500 dark:text-gray-400">
                  <Link
                    href={`/luzexi/yuyan/${essay.slug}`}
                    className="text-amber-700 dark:text-amber-300 font-medium hover:underline"
                  >
                    {essay.title}
                  </Link>
                  {!isLast && (
                    <span className="mx-1 text-gray-400 dark:text-gray-500 text-base">·</span>
                  )}
                </span>
              )
            })}
          </div>
          <p className="font-sans text-xs text-gray-400 dark:text-gray-600 tracking-wide mt-4">
            共 {yuyanEssays.length} 篇
          </p>
        </div>

        {/* View counter + Comments */}
        <div className="border-t border-amber-200/40 dark:border-gray-800/60 pt-10">
          <div className="text-center mb-4">
            <ViewCounter page="luzexi-yuyan" />
          </div>
          <Comments page="luzexi-yuyan" />
        </div>

      </main>

      <SiteFooter />
    </div>
  )
}
