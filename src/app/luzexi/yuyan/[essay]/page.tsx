import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import ViewCounter from '@/components/ViewCounter'
import Comments from '@/components/Comments'
import { yuyanEssays } from '@/data/essays'

export async function generateStaticParams() {
  return yuyanEssays.map((e) => ({ essay: e.slug }))
}

export async function generateMetadata({ params }: { params: { essay: string } }) {
  const essay = yuyanEssays.find((e) => e.slug === params.essay)
  if (!essay) return {}

  const firstPara = essay.content
    .split('\n')
    .map((l: string) => l.trim())
    .find((l: string) =>
      l.length > 20 &&
      /[\u4e00-\u9fff]/.test(l) &&
      !l.startsWith('《') &&
      !l.startsWith('【') &&
      !l.startsWith('（') &&
      !l.match(/^[一二三四五六七八九十]+[、．。\s]*$/)
    )
  const description = firstPara
    ? firstPara.slice(0, 80) + (firstPara.length > 80 ? '……' : '')
    : '寓言篇 · 芦泽溪散文集'

  return {
    title: `${essay.title} · 寓言篇`,
    description,
    openGraph: {
      title: `${essay.title} · 寓言篇`,
      description,
      siteName: '我有所爱',
      ...(essay.image && { images: [`/images/${essay.image}`] }),
    },
  }
}

const SECTION_NUM_RE = /^[一二三四五六七八九十百]+[、．。\s]*$/

function renderContent(text: string) {
  const lines = text.split('\n')
  const elements: React.ReactNode[] = []
  let key = 0

  for (const line of lines) {
    const trimmed = line.trim()

    if (!trimmed) {
      elements.push(<div key={key++} className="h-2" />)
      continue
    }

    if (trimmed === '---' || trimmed === '***') {
      elements.push(<div key={key++} className="ornament my-8">· · ·</div>)
      continue
    }

    if (SECTION_NUM_RE.test(trimmed)) {
      elements.push(
        <p key={key++} className="text-center font-serif text-ink dark:text-gray-200 my-6 tracking-widest" style={{ textIndent: 0 }}>
          {trimmed}
        </p>
      )
      continue
    }

    // Date line at end
    if (trimmed.match(/^[（(]20\d\d/) && (trimmed.endsWith('）') || trimmed.endsWith(')'))) {
      elements.push(
        <p key={key++} className="text-right font-sans text-xs text-gray-400 dark:text-gray-500 mt-8 mb-2" style={{ textIndent: 0 }}>
          {trimmed}
        </p>
      )
      continue
    }

    // Dialogue lines (starting with open quote) — normal paragraph but no extra indent needed
    elements.push(
      <p key={key++} className="mb-5" style={{ textIndent: '2em' }}>
        {trimmed}
      </p>
    )
  }

  return elements
}

export default function YuyanEssayPage({ params }: { params: { essay: string } }) {
  const essay = yuyanEssays.find((e) => e.slug === params.essay)
  if (!essay) notFound()

  const idx = yuyanEssays.findIndex((e) => e.slug === params.essay)
  const prev = idx > 0 ? yuyanEssays[idx - 1] : null
  const next = idx < yuyanEssays.length - 1 ? yuyanEssays[idx + 1] : null

  const EssayNav = () => (
    <nav className="flex items-center justify-between py-4 border-t border-amber-200/40 dark:border-gray-800/60">
      <div className="flex-1">
        {prev && (
          <Link href={`/luzexi/yuyan/${prev.slug}`} className="group flex items-center gap-2 text-sm font-sans nav-link">
            <span className="text-base">←</span>
            <span className="hidden sm:inline truncate max-w-[12rem]">{prev.title}</span>
            <span className="sm:hidden">上一篇</span>
          </Link>
        )}
      </div>
      <Link href="/luzexi/yuyan" className="font-sans text-xs text-gray-400 dark:text-gray-500 hover:text-accent dark:hover:text-amber-400 transition-colors px-4 tracking-wide">
        寓言篇目录
      </Link>
      <div className="flex-1 text-right">
        {next && (
          <Link href={`/luzexi/yuyan/${next.slug}`} className="group inline-flex items-center gap-2 text-sm font-sans nav-link">
            <span className="hidden sm:inline truncate max-w-[12rem]">{next.title}</span>
            <span className="sm:hidden">下一篇</span>
            <span className="text-base">→</span>
          </Link>
        )}
      </div>
    </nav>
  )

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 py-10 w-full">
        <EssayNav />

        {/* Essay header */}
        <div className="text-center my-10">
          <p className="font-sans text-xs text-gray-400 dark:text-gray-500 tracking-widest mb-4 uppercase">
            寓言篇
          </p>
          <h1 className="chapter-title text-2xl sm:text-3xl text-ink dark:text-gray-100 tracking-widest mb-3">
            {essay.title}
          </h1>
          {essay.subtitle && (
            <p className="font-serif text-base text-accent dark:text-amber-400 tracking-wide">
              {essay.subtitle}
            </p>
          )}
          <div className="w-12 h-px bg-accent/40 dark:bg-amber-600/40 mx-auto mt-6" />
        </div>

        {/* Illustration (if any) */}
        {essay.image && (
          <figure className="my-8 text-center">
            <div className="inline-block max-w-sm w-full mx-auto">
              <Image
                src={`/images/${essay.image}`}
                alt={essay.imageCaption ?? essay.title}
                width={480}
                height={360}
                className="w-full h-auto rounded shadow-md object-cover"
              />
            </div>
            {essay.imageCaption && (
              <figcaption className="font-sans text-xs text-gray-400 dark:text-gray-500 mt-3 leading-relaxed">
                {essay.imageCaption}
              </figcaption>
            )}
          </figure>
        )}

        {/* Essay content */}
        <article className="prose-chinese mt-8 text-[1.083rem]">
          {renderContent(essay.content)}
        </article>

        <div className="ornament mt-12">· · ·</div>

        <div className="text-center mt-4 mb-2">
          <p className="font-sans text-xs text-gray-400 dark:text-gray-500 tracking-wide">
            洛城东 · 里海谷
          </p>
        </div>

        <div className="text-center mt-2 mb-2">
          <ViewCounter page={`yuyan-${essay.slug}`} />
        </div>

        <div className="mt-4">
          <EssayNav />
        </div>

        <Comments page={`yuyan-${essay.slug}`} />
      </main>

      <SiteFooter />
    </div>
  )
}
