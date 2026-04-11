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
