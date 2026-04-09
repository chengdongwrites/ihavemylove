import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Link from 'next/link'

export const metadata = {
  title: '跋 · 我有所爱，且为所爱',
}

export default function BaPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 py-10 w-full">

        {/* Top nav */}
        <nav className="flex items-center justify-between py-4 border-t border-amber-200/40 dark:border-gray-800/60">
          <Link href="/novel/dongzhi-xia" className="font-sans text-sm nav-link flex items-center gap-2">
            <span>←</span>
            <span className="hidden sm:inline">冬之沉静（下）</span>
            <span className="sm:hidden">上一章</span>
          </Link>
          <Link href="/novel" className="font-sans text-xs text-gray-400 dark:text-gray-500 hover:text-accent dark:hover:text-amber-400 transition-colors tracking-wide">
            目录
          </Link>
          <div className="flex-1 text-right">
            <Link href="/voices" className="font-sans text-sm nav-link flex items-center gap-2 justify-end">
              <span className="hidden sm:inline">文友之声</span>
              <span className="sm:hidden">文友</span>
              <span>→</span>
            </Link>
          </div>
        </nav>

        {/* Header */}
        <div className="text-center my-10">
          <h1 className="chapter-title text-2xl sm:text-3xl text-ink dark:text-gray-100 tracking-widest mb-3">
            跋
          </h1>
          <div className="w-12 h-px bg-accent/40 dark:bg-amber-600/40 mx-auto" />
        </div>

        {/* Content */}
        <article className="prose-chinese text-[1.083rem]">
          <p>我很久没有读小说了，题跋更是头一次。既感荣幸，又有些忐忑。</p>
          <p>我与作者洛城东，是八十年代中国科大的同寝室同学。因李政道先生主持的CUSPEA项目，我班赴美留学者有十几位，城东兄是其中之一。那时我便羡慕他的物理、英语和书法，三样都好。</p>
          <p>此后相聚，屈指可数。毕业后某年冬天，他从德州回国省亲，我在中山大学读研，于是在广州小聚了一次。再就是二十年后，他带着大女儿小丹再次回来，小丹与我女儿玩得投契，她俩在华侨城的合影，至今还珍藏在我女儿的相册里。</p>
          <p>前几年，在"人文科大"公众号陆续读到他的散文，惊叹于那细腻的笔触和深邃的思想，常常掩卷遐思，爱不释手。这几个月，又在"半杯清茶社"第一次读到这部小说的连载，真是有福。</p>
          <p>初见书名，耳畔忽然响起苏芮的《牵手》——"因为爱着你的爱，因为梦着你的梦"。那是上世纪卡拉OK盛行年代里传唱一时的歌，没想到竟在这里，与一部小说的精神悄悄相遇。</p>
          <p>三毛和《橄榄树》，是六七十年代留学欧美的文科生写下的乡愁。城东兄这一代，是八十年代留美的理科生。雨峤、城东他们，有对宇宙认知的高度，有在华尔街扎根的深度，有因求学、工作、子女而迁徙的广度——在这三度空间里，他们不是漂泊者，而是自在的遨游者。</p>
          <p>书中令我印象最深的，反而是着墨不多的玉华。她的早逝，是全书最响亮的警示。书中人物因此驻足，我们读者也会不自觉地问自己：生命中最重要的是什么？</p>
          <p>城东借夫人丹缃说出的八个字——"我有所爱，且为所爱"——是这部书的结尾，也是它的升华。这八个字，既蕴含了移民一代之间的巧遇、结合与迁徙，又将一种更宽阔的爱，传递给了下一代。</p>
          <p>书中有一处令我叹服：从琴弦振动、声波叩击耳膜，到脑海中浮现孔雀的舞姿和秋叶的斑斓——听觉丝滑地幻化成视觉的画面，从颞叶到枕叶，那是文字能抵达的奇境。</p>
          <p>上一代物理学家，从李政道到杨振宁，从高能粒子走向更广阔的人生思考。这一代物理学子，从雨峤到城东，从非平衡态到跨界寻求爱与生命的意义。这条线索，读来令人动容。</p>
          <p>如果你和我一样，喜欢先读序跋再看正文，那我郑重向你推荐这部《我有所爱，且为所爱》。愿你在观照书中人物的同时，也能察觉到自己。</p>
          <p>还有一件小事，想附记于此。城东兄转赴伯克利攻读金融那年，我第一次赴美，雅虎刚上市。我在雅虎黄页上搜到好几个拼写相似的名字，逐一打电话过去，都不是他。没能找到。</p>
          <p>然而今天，他用这部小说让我找到了他——不只让我看见了他的外在，更让我发现了他深层的内在，和浑然天成的自在。</p>
          <p>期待有朝一日，能在红砖壁炉旁、窗外飘雪时，与城东兄青梅煮酒，请教一二。</p>
          <p style={{textIndent: 0}}>是为跋。</p>
        </article>

        <div className="mt-10 text-right prose-chinese">
          <p style={{textIndent: 0}}>郭东日</p>
          <p style={{textIndent: 0}}>2026年4月8日</p>
        </div>

        <div className="ornament mt-10">· · ·</div>

        {/* Bottom nav */}
        <nav className="flex items-center justify-between py-4 border-t border-amber-200/40 dark:border-gray-800/60">
          <Link href="/novel/dongzhi-xia" className="font-sans text-sm nav-link flex items-center gap-2">
            <span>←</span>
            <span className="hidden sm:inline">冬之沉静（下）</span>
            <span className="sm:hidden">上一章</span>
          </Link>
          <Link href="/novel" className="font-sans text-xs text-gray-400 dark:text-gray-500 hover:text-accent dark:hover:text-amber-400 transition-colors tracking-wide">
            目录
          </Link>
          <div className="flex-1 text-right">
            <Link href="/voices" className="font-sans text-sm nav-link flex items-center gap-2 justify-end">
              <span className="hidden sm:inline">文友之声</span>
              <span className="sm:hidden">文友</span>
              <span>→</span>
            </Link>
          </div>
        </nav>

      </main>

      <SiteFooter />
    </div>
  )
}
