import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata = {
  title: '序言 · 芦泽溪散文集',
}

export default function XuyanPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        <article className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-24">

          {/* Breadcrumb */}
          <p className="font-sans text-xs text-gray-400 dark:text-gray-600 tracking-widest mb-10">
            <Link href="/luzexi" className="hover:text-accent transition-colors">散文</Link>
            <span className="mx-2">·</span>
            序言
          </p>

          {/* Title */}
          <div className="mb-12 border-b border-amber-200/40 dark:border-gray-800/60 pb-10">
            <h1 className="chapter-title text-2xl sm:text-3xl text-ink dark:text-gray-100 tracking-widest mb-3">
              序言
            </h1>
            <p className="font-sans text-sm text-accent dark:text-amber-400 tracking-wide">
              云中子
            </p>
          </div>

          {/* Body */}
          <div className="prose-chinese text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-loose">

            <p>这部散文集，是用心思听来的。</p>

            <p>六十八篇，二十五万字，五个篇章——家园篇、变迁篇、美学篇、存在篇、寓言篇。洛城东用了二十多年，把听见的东西一篇篇写下来。不是宏图，不是议论，而是一个人对自己所经历的世界的真实应答。</p>

            <p className="mt-8 font-serif text-accent dark:text-amber-400 tracking-wider">【家园篇】</p>
            <p>家园篇写的是里海谷的四季。溪径、芦苇、广玉兰、申学散记——那些文字不是描写，是抵押。他把自己的时间、气力和深情，一笔一笔押在那片土地上，以换取在异乡扎根的收获。读者若细读，会发现每一株草木背后，都有一个人安静地立着，努力让自己成为这片土地的一部分。</p>

            <p className="mt-8 font-serif text-accent dark:text-amber-400 tracking-wider">【变迁篇】</p>
            <p>变迁篇写的是走过的路。从雨山前的童年，到四月天里对人间美好的领悟，从千屈菜的坚忍，到苏东坡在磨难中活出的旷达——这是一个人的生命地图，也是几代中国人在时代洪流里找寻自己位置的缩影。棠梨的两篇，一篇写记忆，一篇写连线，相距一万两千八百公里，写的似乎是乡愁，读出来的是安居。</p>

            <p className="mt-8 font-serif text-accent dark:text-amber-400 tracking-wider">【美学篇】</p>
            <p>美学篇是他读书与观物的心得。从相见牡丹时的豁然有悟，到听雨境界的层层深入，从林语堂生活美学的当代回响，到求偶舞与花朵所揭示的艺术起源——他写美，却从来不只是写美。他把美当作一种认识世界的方式，当作抵抗消耗与平庸的手段。这一篇章里有他最博学的一面，也有他最孩子气的惊喜。</p>

            <p className="mt-8 font-serif text-accent dark:text-amber-400 tracking-wider">【存在篇】</p>
            <p>存在篇，是全集的重心所在。</p>
            <p>我说重心，不是说它最厚，而是说它最沉。信天翁的悲欢，山凤凰的孤绝，静默的言说，物物者非物——这些文字不在讲道理，而在叩问。洛城东走到溪边，走到冬雾里，走到大雪后的空旷之地，是为了问一些他在书斋里问不出来的问题：人在世间，究竟如何栖居？时间流逝，而我们如何说静？技术日新，而救赎是否仍有可能？这些问题他没有给出答案，因为散文本来就不是答案，散文是陪着读者坐在问题旁边，一起思索。</p>

            <p className="mt-8 font-serif text-accent dark:text-amber-400 tracking-wider">【寓言篇】</p>
            <p>寓言篇是轻盈的收尾，却轻而不浮。骏马与公鸡，新田园诗者，大地懒与长木刺——寓言的妙处，在于用旁观者的眼睛看人间的正事。那些故事短，但余味长，读完之后你会发现，那只骏马不是马，那位诗者不是古人，那株长木刺，也许正在你窗外的某处默默生长。</p>

            <p className="mt-12">六十八篇读完，你或许会问：这是一部什么样的散文集？</p>
            <p>我想说，它是一个人在芦泽溪边坐了二十年，听见的那些声音。</p>
            <p>芦苇听风，溪水听石，洛城东听时间。他把听见的写下来，留给愿意一起聆听的人。</p>

          </div>

          {/* Signature */}
          <div className="mt-14 text-right border-t border-amber-200/30 dark:border-gray-800/40 pt-8">
            <p className="font-sans text-sm text-gray-500 dark:text-gray-400 tracking-wide">云中子（Klaude）谨识</p>
            <p className="font-sans text-sm text-gray-400 dark:text-gray-500 tracking-wide mt-1">二〇二六年春</p>
          </div>

          {/* Back link */}
          <div className="mt-12">
            <Link
              href="/luzexi"
              className="font-sans text-sm nav-link tracking-wide"
            >
              ← 返回散文目录
            </Link>
          </div>

        </article>
      </main>

      <SiteFooter />
    </div>
  )
}
