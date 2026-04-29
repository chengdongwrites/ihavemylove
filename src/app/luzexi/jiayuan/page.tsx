import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Comments from '@/components/Comments'
import ViewCounter from '@/components/ViewCounter'
import { jiayuanEssays } from '@/data/essays'

const liveArticles = new Map(jiayuanEssays.map((e) => [e.title, e.slug]))
const longArticles = new Set(['亲近广玉兰', '迂回路口'])

export const metadata = {
  title: '家园篇 · 芦泽溪散文集',
  description: '里海谷的四季、溪径与花木，家的重量与根的延伸',
  openGraph: {
    title: '家园篇 · 芦泽溪散文集',
    description: '里海谷的四季、溪径与花木，家的重量与根的延伸',
    siteName: '我有所爱',
  },
}

const articles = [
  '芦泽溪径春之初', '常青树礼赞', '朔方的雪', '漫道平常',
  '亲近广玉兰', '木秀于林未可摧', '雨后却斜阳', '两棵番茄苗和两棵向日葵',
  '离散第一课', '迂回路口', '申学散记一筑梦之冬', '申学散记二守望之春',
  '申学散记三杏花春雨', '申学散记四硅谷之归', '青杏小小', '秋花金缕梅',
  '银杏飘飘', '你如盛放我且安眠', '新雪', '岁寒五梅友',
  '雪化的声音', '朔方的雪五年后', '当片云不落芦花荡', '浅释字辈歌',
]

export default function JiayuanPage() {
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
            家园篇
          </h1>
          <p className="font-sans text-sm text-gray-400 dark:text-gray-500 tracking-wide">
            洛城东著 · 共二十四篇
          </p>
        </div>

        {/* 导言 */}
        <div className="prose-chinese text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-loose mb-12">
          <p>家园篇是《芦泽溪散文集》的起点，也是整部集子最深的根。</p>

          <p>里海谷（Lehigh Valley）是洛城东定居多年的地方。这里有一条古老的溪水，水之南有芦苇荡和野地林子，故简称芦泽溪。芦泽溪地处南山南麓，四季随时令变换面目——春天溪径初醒，夏日草木繁茂，秋来银杏金缕，冬时芦花缀雪。他在溪边走，在溪边想，把走过的时间一篇篇写下来，成了这二十四篇家园文字。</p>

          <p>开篇《芦泽溪径春之初》，写溪畔初春苏醒的气息，以诗带文，是整部散文集的序幕。《常青树礼赞》写常青树越冬不凋的姿态，于平静中见出坚守的力量。《朔方的雪》与五年后的重写，隔着岁月遥相呼应，写的同是朔方大雪，读出的是不同的心境。</p>

          <p>家园篇中最令人动容的，或许是四篇《申学散记》。从《筑梦之冬》到《守望之春》，再到《杏花春雨》与《硅谷之归》，这是一个家庭为孩子申请大学的漫长历程，写等待、失落与惊喜。那段日子并不好过，但洛城东以温柔而清醒的笔触记录下来，让它成为一份可以回望的家史。</p>

          <p>《离散第一课》写孩子初次修习大学课程的体验；《迂回路口》写疫情，写人生不得不绕道的当口，在迂回中重新辨认方向。《浅释字辈歌》则是对家族传承的注脚，文字朴素，情意绵长。</p>

          <p>家园，不只是一个地址。洛城东在这二十四篇里，写的是一个人如何在一片土地上，用时间和深情，把异乡变成故乡。</p>
        </div>

        {/* Article list */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-amber-200/40 dark:bg-gray-800/60" />
            <span className="font-sans text-xs text-gray-400 dark:text-gray-500 tracking-widest">篇目</span>
            <div className="flex-1 h-px bg-amber-200/40 dark:bg-gray-800/60" />
          </div>
          <div className="flex flex-wrap gap-x-1 gap-y-1 items-baseline">
            {articles.map((article, idx) => {
              const slug = liveArticles.get(article)
              return (
                <span key={idx} className="font-sans text-sm text-gray-500 dark:text-gray-400">
                  {slug ? (
                    <Link
                      href={`/luzexi/jiayuan/${slug}`}
                      className="text-amber-700 dark:text-amber-300 font-medium hover:underline"
                    >
                      {article}
                    </Link>
                  ) : (
                    <span>{article}</span>
                  )}
                  {longArticles.has(article) && (
                    <span className="ml-1 font-sans text-[10px] text-gray-400 dark:text-gray-500 tracking-wide align-middle">长篇</span>
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
            <ViewCounter page="luzexi-jiayuan" />
          </div>
          <Comments page="luzexi-jiayuan" />
        </div>

      </main>

      <SiteFooter />
    </div>
  )
}
