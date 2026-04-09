import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Link from 'next/link'

export const metadata = {
  title: '关于作者 · 我有所爱，且为所爱',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 py-12 w-full">
        <div className="text-center mb-10">
          <h1 className="chapter-title text-2xl text-ink dark:text-gray-100 tracking-widest mb-3">
            关于作者
          </h1>
          <div className="w-10 h-px bg-accent/40 dark:bg-amber-600/40 mx-auto" />
        </div>

        <article className="prose-chinese text-base sm:text-[1.0625rem]">
          <p>笔名洛城东。喜爱文学的理科生。1987年毕业于中国科学技术大学近代物理系，同年通过李政道教授的CUSPEA项目赴美留学。德州大学奥斯汀分校物理博士，加州大学伯克利分校金融博士。2009年迁居宾州里海谷，从事独立投资和写作至今。</p>

          <p>写作于他，并非使命，而是一种回应——回应那些他亲历或目睹的，不足为外人道的、真实的小人物生命。不是宏大叙事，不是苦难史诗，而是普通人在日常中如何与存在相遇，如何在异乡扎根，如何找到属于自己的答案。</p>

          <p>写作理念：</p>

          <blockquote className="border-l-2 border-accent/50 dark:border-amber-600/50 pl-5 my-6 italic text-gray-600 dark:text-gray-400 not-italic" style={{textIndent: 0}}>
            写，不是为了宏大叙事，<br />
            而是为了真实的小人物，<br />
            写小人物的大人生。
          </blockquote>

          <p>《我有所爱，且为所爱》是他的长篇处女作。小说跨越三十八年，写一群从大陆出发的留学生在美国的精神史——从无根到有根，从寂寞到沉静，从"我属于哪里"到"我如何在任何地方栖居"。</p>

          <p>书名来自小说中的一句话，由人物杜丹缃在一张饭桌上说出，是全书三十八年最终的精神落点。"我有所爱，且为所爱"——那个"为"，至少有三重含义：为了所爱，被所爱，是所爱。</p>
        </article>

        <div className="ornament my-10">· · ·</div>

        <div className="text-center">
          <Link
            href="/novel"
            className="inline-block font-sans text-sm text-accent dark:text-amber-400 border border-accent/50 dark:border-amber-600/50 px-6 py-2.5 rounded hover:bg-accent hover:text-white dark:hover:bg-amber-700 transition-colors tracking-wide"
          >
            阅读小说 →
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
