import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import ViewCounter from '@/components/ViewCounter'
import Comments from '@/components/Comments'
import Link from 'next/link'

export const metadata = {
  title: '文友之声 · 我有所爱，且为所爱',
}

export default function VoicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 py-10 w-full">
        {/* Top nav */}
        <nav className="flex items-center justify-between py-4 border-t border-amber-200/40 dark:border-gray-800/60 mb-8">
          <div className="flex-1">
            <Link
              href="/ba"
              className="group flex items-center gap-2 text-sm font-sans nav-link"
            >
              <span className="text-base">←</span>
              <span className="hidden sm:inline">跋</span>
              <span className="sm:hidden">跋</span>
            </Link>
          </div>
          <Link
            href="/novel"
            className="font-sans text-xs text-gray-400 dark:text-gray-500 hover:text-accent dark:hover:text-amber-400 transition-colors px-4 tracking-wide"
          >
            目录
          </Link>
          <div className="flex-1" />
        </nav>

        {/* Page header */}
        <div className="text-center my-10">
          <h1 className="chapter-title text-2xl sm:text-3xl text-ink dark:text-gray-100 tracking-widest mb-3">
            文友之声
          </h1>
          <div className="w-12 h-px bg-accent/40 dark:bg-amber-600/40 mx-auto mt-6" />
        </div>

        {/* Entry: 陈颍 */}
        <article className="prose-chinese mt-8 text-[1.083rem]">
          <p>"我如何在任何地方栖居"——这句话击中了我。书中每一个人物，无论身处何地、人生处于何种状态，都在寻找能够"栖居"、能够将生命继续下去的方式和力量。这或许正是这部小说最打动人的地方。</p>

          <p>小说太真实了，真实到所有角色几乎都能一眼找到原型。这是一把双刃剑——真实给了它独特的质感和重量，却也让人物少了一些被虚构"加戏减戏"的空间。但读完之后，我觉得这种真实是值得的。</p>

          <p>整部书给我一种"温情脉脉"的感觉，让我想起《小妇人》。那也是一部以家庭为容器、写每个人如何找到自己的路的书。能将这些岁月如此细腻地记录下来，作者花了真功夫。</p>
        </article>

        <div className="text-right mt-6 mb-12">
          <span className="font-serif text-sm text-gray-500 dark:text-gray-400 tracking-wide">陈颍</span>
        </div>

        <div className="w-full h-px bg-amber-200/30 dark:bg-gray-800/50 my-12" />

        {/* Entry: Desheng Wang */}
        <article className="prose-chinese text-[1.083rem]">
          <p>序言就挺有吸引力的。主要是与自己人生轨迹类似。也是心安之处即是家的信奉者。不断突破又达实耕耘。因为是一代最幸运的人们，生活之美就是如作者所言，我有所爱，且当所爱。不只是今生如此，永恒亦如是！</p>
        </article>

        <div className="text-right mt-6 mb-12">
          <span className="font-serif text-sm text-gray-500 dark:text-gray-400 tracking-wide">Desheng Wang</span>
        </div>

        <div className="w-full h-px bg-amber-200/30 dark:bg-gray-800/50 my-12" />

        {/* Entry: Nina */}
        <article className="prose-chinese text-[1.083rem]">
          <p>昨晚读了这部小说，读了序和东日写的跋，便忍不住一口气读完。两位的写作风格都是朴实无华，文笔优美，逻辑清晰。小说里的陆雨峤、谢玉华、海珘这些年轻人，充满理想，在美国加州、达拉斯、纽约、奥斯汀一路奋斗成长，真正印证了"我如何在任何地方栖居"。读常青藤名校，闯荡异乡，这一代人着实不容易，令人佩服。</p>

          <p>读着读着，也想到了我们辉瑞那一代朋友——不也是这样，在人生的旅途中不断 Move、Relocate，让理想落地生根吗？</p>

          <p>期待东日安排好一切之后，更多地分享美文。</p>
        </article>

        <div className="text-right mt-6 mb-12">
          <span className="font-serif text-sm text-gray-500 dark:text-gray-400 tracking-wide">Nina</span>
          <span className="font-sans text-xs text-gray-400 dark:text-gray-500 block mt-1">（跋作者郭东日三十多年前在辉瑞的上司）</span>
        </div>

        <div className="w-full h-px bg-amber-200/30 dark:bg-gray-800/50 my-12" />

        {/* Entry: 洪宋贞 */}
        <article className="prose-chinese text-[1.083rem]">
          <p>这篇小说，使我们能够更加近距离地了解远赴异乡的学子的人生理念、工作情况和家庭生活。他们凭着聪明才智，凭着不懈努力，凭着吃苦耐劳的精神，终于奋斗出不一样的人生。为他们的勇气点赞。</p>
        </article>

        <div className="text-right mt-6 mb-12">
          <span className="font-serif text-sm text-gray-500 dark:text-gray-400 tracking-wide">洪宋贞</span>
          <span className="font-sans text-xs text-gray-400 dark:text-gray-500 block mt-1">（作者高中同学）</span>
        </div>

        <div className="w-full h-px bg-amber-200/30 dark:bg-gray-800/50 my-12" />

        {/* Entry: 樱桃木 */}
        <article className="prose-chinese text-[1.083rem]">
          <p>二、三十年前来美留学的中国留学生绝大多数以学理工科出身，他们很多当年也是国内大学高考的佼佼者，这部记实小说通过描写几个家庭一代移民在美国的学业和事业，以及他们对第二代的培养，成功地刻画了这批人在美国的生活——生根和发芽。</p>
        </article>

        <div className="text-right mt-6 mb-12">
          <span className="font-serif text-sm text-gray-500 dark:text-gray-400 tracking-wide">樱桃木</span>
        </div>

        <div className="w-full h-px bg-amber-200/30 dark:bg-gray-800/50 my-12" />

        {/* Entry: 刘芸 */}
        <article className="prose-chinese text-[1.083rem]">
          <p>在出差飞行途中读完全篇，二十余分钟后写就：</p>

          <div className="my-6 pl-4 border-l-2 border-amber-200/50 dark:border-amber-900/40">
            <p className="font-serif text-sm text-ink dark:text-gray-200 tracking-wide mb-3" style={{textIndent: 0}}>
              【七律】读校友城东长篇小说《我有所爱，且为所爱》
            </p>
            <p className="font-serif leading-8 text-gray-700 dark:text-gray-300" style={{textIndent: 0}}>
              海外扬帆数叶舟，风中学子立潮头。<br />
              小人物向来追梦，大眼界何曾逐流。<br />
              半世友情传子女，万言曲笔谱春秋。<br />
              樱开二度从时令，希冀长存爱永留。
            </p>
          </div>
        </article>

        <div className="text-right mt-6 mb-12">
          <span className="font-serif text-sm text-gray-500 dark:text-gray-400 tracking-wide">刘芸</span>
          <span className="font-sans text-xs text-gray-400 dark:text-gray-500 block mt-1">（作者诗友，作于2026年4月13日南飞途中）</span>
        </div>

        <div className="w-full h-px bg-amber-200/30 dark:bg-gray-800/50 my-12" />

        {/* Entry: Frank */}
        <article className="prose-chinese text-[1.083rem]">
          <p>末章，城东说：</p>

          <blockquote className="border-l-2 border-accent/50 dark:border-amber-600/50 pl-5 my-5 text-gray-600 dark:text-gray-400" style={{textIndent: 0}}>
            "我觉得，'为'至少有三重含义，由浅而深：为（wèi）了，帮助；被（wéi）；是（wéi）。"
          </blockquote>

          <p>读者 Frank 读到这里，留言道：</p>

          <blockquote className="border-l-2 border-accent/50 dark:border-amber-600/50 pl-5 my-5 text-gray-600 dark:text-gray-400" style={{textIndent: 0}}>
            "生而为何，也是这样的三个读音。"
          </blockquote>

          <p>海德格尔的问题在第一章提出，答案在最后一章给出，而这个"为"字，贯穿始终。</p>
        </article>

        <div className="text-right mt-6 mb-12">
          <span className="font-serif text-sm text-gray-500 dark:text-gray-400 tracking-wide">Frank</span>
          <span className="font-sans text-xs text-gray-400 dark:text-gray-500 block mt-1">（读者留言，《冬之沉静》章）</span>
        </div>

        {/* Entry: 愚叟 */}
        <article className="prose-chinese text-[1.083rem]">
          <p>小说以这两家人及其子女相互关爱的故事展开，对读博撰写论文的苦恼、寻找工作的艰辛、兴趣与事业的纠结、养儿育女的甘苦、爱情友情亲情的分量、生命意义的困惑……做了非常真实的描述，真实得几近新闻报道。</p>

          <p>……正是这种"畏之无畏"的定力，使他在投资回报的巨大诱惑面前适可而止。对他而言，基金规模从来不是目的，而是淬炼心性的道场；守住生活的平衡，不使心为形役，才是他真正的选择。</p>

          <p>其实，"畏"并非只属于哲学家或精英。我们几乎每个人都曾遭遇过它。记得下乡插队的前半年，手握锄把，面对那一眼望不到头的地垄，还有知青点表面平和、暗里鸡争鹅斗的日子，曾感茫然无助、了无生趣——那是我第一次遭遇的"畏"。人的生命和认知都是有限的，但一生中却会多次与它相遇。能做到"畏之无畏"，是一种难得的境界。</p>
        </article>

        <div className="text-right mt-6 mb-12">
          <span className="font-serif text-sm text-gray-500 dark:text-gray-400 tracking-wide">愚叟</span>
          <span className="font-sans text-xs text-gray-400 dark:text-gray-500 block mt-1">（摘自书评《一个特殊群体的特殊视角》）</span>
        </div>

        <div className="w-full h-px bg-amber-200/30 dark:bg-gray-800/50 my-12" />

        {/* Entry: 张晓榕 */}
        <article className="prose-chinese text-[1.083rem]">
          <p>第一次读城东的《畏之无畏：一个成功后而不安的故事》，还是他今年二月在半杯公众号上分享的时候。不到两个月，小说《我有所爱且为所爱》就诞生了。他从驾轻就熟的散文扩展到长篇小说的创作，这种"畏之无畏"、敢于尝试、敢于表达的勇气，令我敬佩。</p>

          <p>"畏"，于我而言，是危机感，它无时无刻不在。无论承认还是回避，它都躲在"岁月静好"的面纱后面。城东敏感地抓住了"畏"，让它流淌于小说叙事的各个章节里，任读者感同身受、共鸣共情、引发思考。</p>

          <p>小说最后借杜丹湘之口，以"我有所爱，且为所爱"回应了主人公陆雨峤最初的"生而为何"的自我诘问，这是个非常有心的安排！令我感动的是：这个"安排"，是用他三十八年的经历换来的。</p>
        </article>

        <div className="text-right mt-6 mb-12">
          <span className="font-serif text-sm text-gray-500 dark:text-gray-400 tracking-wide">张晓榕</span>
          <span className="font-sans text-xs text-gray-400 dark:text-gray-500 block mt-1">二〇二六年四月十六日</span>
        </div>

        <div className="w-full h-px bg-amber-200/30 dark:bg-gray-800/50 my-12" />

        <div className="ornament mt-4">· · ·</div>

        <div className="text-center mt-4 mb-2">
          <ViewCounter page="voices" />
        </div>

        <Comments page="voices" />

        {/* Bottom nav */}
        <nav className="flex items-center justify-between py-4 border-t border-amber-200/40 dark:border-gray-800/60 mt-4">
          <div className="flex-1">
            <Link
              href="/ba"
              className="group flex items-center gap-2 text-sm font-sans nav-link"
            >
              <span className="text-base">←</span>
              <span className="hidden sm:inline">跋</span>
              <span className="sm:hidden">跋</span>
            </Link>
          </div>
          <Link
            href="/novel"
            className="font-sans text-xs text-gray-400 dark:text-gray-500 hover:text-accent dark:hover:text-amber-400 transition-colors px-4 tracking-wide"
          >
            目录
          </Link>
          <div className="flex-1" />
        </nav>
      </main>

      <SiteFooter />
    </div>
  )
}
