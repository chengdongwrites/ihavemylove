import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import ViewCounter from '@/components/ViewCounter'
import Comments from '@/components/Comments'
import { cunzaiEssays } from '@/data/essays'

export async function generateStaticParams() {
  return cunzaiEssays.map((e) => ({ essay: e.slug }))
}

export async function generateMetadata({ params }: { params: { essay: string } }) {
  const essay = cunzaiEssays.find((e) => e.slug === params.essay)
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
    : '存在篇 · 芦泽溪散文集'

  return {
    title: `${essay.title} · 存在篇`,
    description,
    openGraph: {
      title: `${essay.title} · 存在篇`,
      description,
      siteName: '我有所爱',
      ...(essay.image && { images: [`/images/${essay.image}`] }),
    },
  }
}

// 【Section Title】 marker
const SECTION_TITLE_RE = /^【(.+)】$/
// 「Sub-heading」
const SUBHEADING_RE = /^「(.+)」$/
// 『Quoted verse』 — centered italic; use ／ as line separator
const VERSE_BLOCK_RE = /^『(.+)』$/
// 【图:filename:caption】 — inline image
const INLINE_IMG_RE = /^【图:([^:]+):(.*)】$/

function renderContent(text: string) {
  const lines = text.split('\n')
  const elements: React.ReactNode[] = []
  let key = 0
  let inNote = false

  for (const line of lines) {
    const trimmed = line.trim()

    if (!trimmed) {
      elements.push(<div key={key++} className="h-2" />)
      continue
    }

    if (trimmed === '---' || trimmed === '***') {
      inNote = false
      elements.push(<div key={key++} className="ornament my-8">· · ·</div>)
      continue
    }

    // ★ — poem stanza divider
    if (trimmed === '★') {
      elements.push(
        <div key={key++} className="text-center text-gray-300 dark:text-gray-600 my-4 text-sm tracking-widest">★</div>
      )
      continue
    }

    // 【图:filename:caption】 — inline image
    const imgMatch = trimmed.match(INLINE_IMG_RE)
    if (imgMatch) {
      const [, filename, caption] = imgMatch
      elements.push(
        <figure key={key++} className="my-10 text-center">
          <div className="inline-block max-w-lg w-full mx-auto">
            <Image
              src={`/images/${filename}`}
              alt={caption || ''}
              width={745}
              height={428}
              className="w-full h-auto rounded shadow-md"
            />
          </div>
          {caption && (
            <figcaption className="font-sans text-xs text-gray-400 dark:text-gray-500 mt-3 leading-relaxed max-w-md mx-auto">
              {caption}
            </figcaption>
          )}
        </figure>
      )
      continue
    }

    // 【注】or 【注释】 — left-aligned note/reference header
    if (trimmed === '【注】' || trimmed === '【注释】') {
      inNote = true
      const label = trimmed === '【注释】' ? '注释' : '注'
      elements.push(
        <p key={key++} className="font-serif font-bold text-ink dark:text-gray-300 mt-10 mb-3" style={{ textIndent: 0 }}>
          {label}
        </p>
      )
      continue
    }

    // 【Section Title】
    const secMatch = trimmed.match(SECTION_TITLE_RE)
    if (secMatch) {
      inNote = false
      elements.push(
        <p key={key++} className="text-center font-serif text-accent dark:text-amber-400 tracking-widest my-8 text-base" style={{ textIndent: 0 }}>
          {secMatch[1]}
        </p>
      )
      continue
    }

    // 『Quoted verse』 — centered italic, supports ／ line separator
    const verseMatch = trimmed.match(VERSE_BLOCK_RE)
    if (verseMatch) {
      const verseLines = verseMatch[1].split('／')
      elements.push(
        <div key={key++} className="text-center font-serif italic text-gray-600 dark:text-gray-400 tracking-wide my-6" style={{ textIndent: 0 }}>
          {verseLines.map((l, i) => <div key={i}>{l}</div>)}
        </div>
      )
      continue
    }

    // 「Sub-heading」 — bold left-aligned
    const subMatch = trimmed.match(SUBHEADING_RE)
    if (subMatch) {
      elements.push(
        <p key={key++} className="font-serif font-bold text-ink dark:text-gray-200 tracking-wide mt-8 mb-3 text-base" style={{ textIndent: 0 }}>
          {subMatch[1]}
        </p>
      )
      continue
    }

    if ((trimmed.startsWith('（') || trimmed.startsWith('(')) && (trimmed.endsWith('）') || trimmed.endsWith(')'))) {
      elements.push(
        <p key={key++} className="text-right font-sans text-xs text-gray-400 dark:text-gray-500 mt-8 mb-2" style={{ textIndent: 0 }}>
          {trimmed}
        </p>
      )
      continue
    }

    // Note body — small text, no indent
    if (inNote) {
      elements.push(
        <p key={key++} className="text-sm text-gray-500 dark:text-gray-400 mb-3 leading-relaxed" style={{ textIndent: 0 }}>
          {trimmed}
        </p>
      )
      continue
    }

    elements.push(
      <p key={key++} className="mb-5" style={{ textIndent: '2em' }}>
        {trimmed}
      </p>
    )
  }

  return elements
}

export default function CunzaiEssayPage({ params }: { params: { essay: string } }) {
  const essay = cunzaiEssays.find((e) => e.slug === params.essay)
  if (!essay) notFound()

  const idx = cunzaiEssays.findIndex((e) => e.slug === params.essay)
  const prev = idx > 0 ? cunzaiEssays[idx - 1] : null
  const next = idx < cunzaiEssays.length - 1 ? cunzaiEssays[idx + 1] : null
  const hasInlineImages = essay.content.includes('【图:')

  const EssayNav = () => (
    <nav className="flex items-center justify-between py-4 border-t border-amber-200/40 dark:border-gray-800/60">
      <div className="flex-1">
        {prev && (
          <Link href={`/luzexi/cunzai/${prev.slug}`} className="group flex items-center gap-2 text-sm font-sans nav-link">
            <span className="text-base">←</span>
            <span className="hidden sm:inline truncate max-w-[12rem]">{prev.title}</span>
            <span className="sm:hidden">上一篇</span>
          </Link>
        )}
      </div>
      <Link href="/luzexi/cunzai" className="font-sans text-xs text-gray-400 dark:text-gray-500 hover:text-accent dark:hover:text-amber-400 transition-colors px-4 tracking-wide">
        存在篇目录
      </Link>
      <div className="flex-1 text-right">
        {next && (
          <Link href={`/luzexi/cunzai/${next.slug}`} className="group inline-flex items-center gap-2 text-sm font-sans nav-link">
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
            存在篇
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

        {/* Illustration — skipped when images are placed inline via 【图:...】 */}
        {essay.image && !hasInlineImages && (
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
          <ViewCounter page={`cunzai-${essay.slug}`} />
        </div>

        <div className="mt-4">
          <EssayNav />
        </div>

        <Comments page={`cunzai-${essay.slug}`} />
      </main>

      <SiteFooter />
    </div>
  )
}
