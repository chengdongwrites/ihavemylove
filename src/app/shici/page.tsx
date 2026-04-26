import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata = {
  title: '诗词集 · 我有所爱',
  description: '洛城东诗词——片言只语的日积月累，已过千首',
}

export default function ShiciPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 py-16 w-full">
        <div className="text-center mb-10">
          <h1 className="chapter-title text-2xl text-ink dark:text-gray-100 tracking-widest mb-3">
            诗词集
          </h1>
          <div className="w-10 h-px bg-accent/40 dark:bg-amber-600/40 mx-auto" />
        </div>

        <div className="text-center py-16">
          <p className="prose-chinese text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-8" style={{ textIndent: 0 }}>
            诗词写作，是洛城东心底最爱。<br />
            片言只语的日积月累，已过千首，<br />
            是他散文和小说中处处浮现的诗心与词魂。
          </p>
          <p className="font-sans text-sm text-gray-400 dark:text-gray-500 tracking-widest">
            即将上线
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
