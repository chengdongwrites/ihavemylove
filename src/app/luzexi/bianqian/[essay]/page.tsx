import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import ViewCounter from '@/components/ViewCounter'
import Comments from '@/components/Comments'
import { bianqianEssays } from '@/data/essays'

export async function generateStaticParams() {
  return bianqianEssays.map((e) => ({ essay: e.slug }))
}

export async function generateMetadata({ params }: { params: { essay: string } }) {
  const essay = bianqianEssays.find((e) => e.slug === params.essay)
  if (!essay) return {}

  const firstPara = essay.content
    .split('\n')
    .map((l: string) => l.trim())
    .find((l: string) =>
      l.length > 20 &&
      /[\u4e00-\u9fff]/.test(l) &&
      !l.startsWith('【') &&
      !l.startsWith('《') &&
      !l.startsWith('（') &&
      !l.startsWith('---') &&
      !l.match(/^[一二三四五六七八九十]+[、．。\s]*$/)
    )
  const description = firstPara
    ? firstPara.slice(0, 80) + (firstPara.length > 80 ? '……' : '')
    : '变迁篇 · 芦泽溪散文集'

  return {
    title: `${essay.title} · 变迁篇`,
    description,
    openGraph: {
      title: `${essay.title} · 变迁篇`,
      description,
      siteName: '我有所爱',
      ...(essay.image && {
        images: [{
          url: `/images/${essay.image}`,
          width: essay.imageWidth ?? 800,
          height: essay.imageHeight ?? 600,
          alt: essay.title,
        }],
      }),
    },
  }
}

// Matches 【section title】 markers
const SECTION_TITLE_RE = /^【(.+)】$/
// 【图:filename:caption】 or 【图:filename:caption:sm】 — inline image with optional size
const INLINE_IMG_RE = /^【图:([^:]+):([^:】]*)(?::([^】]*))?】$/
// 【发表|url|text】 — centered linked publication note
const PUBLISH_RE = /^【发表\|([^|]+)\|(.+)】$/
// 「poem block」 — use ／ as separator; multi-line renders centered, single renders no-indent
const POEM_LINE_RE = /^「(.+)」$/
// 『quoted verse』 — centered, italic (for epigraph ci/poems)
const VERSE_BLOCK_RE = /^『(.+)』$/

// Render inline markup: ^1^ → <sup>1</sup>  and  【链:url|text】 → <a>
function renderWithSup(text: string): React.ReactNode {
  const parts = text.split(/(【链:[^|】]+\|[^】]+】|\^\d+\^)/)
  if (parts.length === 1) return text
  return (
    <>
      {parts.map((p, i) => {
        const sup = p.match(/^\^(\d+)\^$/)
        if (sup) return <sup key={i} className="text-[10px] font-sans text-gray-400 dark:text-gray-500 align-super">{sup[1]}</sup>
        const link = p.match(/^【链:([^|】]+)\|([^】]+)】$/)
        if (link) return <a key={i} href={link[1]} target="_blank" rel="noopener noreferrer" className="nav-link underline underline-offset-2">{link[2]}</a>
        return <span key={i}>{p}</span>
      })}
    </>
  )
}

function renderContent(
  text: string,
  inlineImage?: { src: string; caption?: string }
) {
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

    // 【图】 — inline image at this position
    if (trimmed === '【图】' && inlineImage) {
      elements.push(
        <figure key={key++} className="my-8 text-center">
          <div className="inline-block max-w-lg w-full mx-auto">
            <Image
              src={`/images/${inlineImage.src}`}
              alt={inlineImage.caption ?? ''}
              width={745}
              height={233}
              className="w-full h-auto rounded shadow-md"
            />
          </div>
          {inlineImage.caption && (
            <figcaption className="font-sans text-xs text-gray-400 dark:text-gray-500 mt-3 leading-relaxed">
              {inlineImage.caption}
            </figcaption>
          )}
        </figure>
      )
      continue
    }

    // 【图:filename:caption】 or 【图:filename:caption:sm】 — inline image
    const imgMatch = trimmed.match(INLINE_IMG_RE)
    if (imgMatch) {
      const [, filename, caption, size] = imgMatch
      const containerClass = size === 'sm'
        ? 'inline-block max-w-[200px] w-full mx-auto'
        : size === 'md'
        ? 'inline-block max-w-sm w-full mx-auto'
        : 'inline-block max-w-lg w-full mx-auto'
      elements.push(
        <figure key={key++} className="my-10 text-center">
          <div className={containerClass}>
            <Image
              src={`/images/${filename}`}
              alt={caption || ''}
              width={881}
              height={539}
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

    // 【发表|url|text】 — centered linked publication note
    const publishMatch = trimmed.match(PUBLISH_RE)
    if (publishMatch) {
      const [, url, text] = publishMatch
      const parts = text.split('／')
      elements.push(
        <p key={key++} className="text-center font-sans text-xs text-gray-400 dark:text-gray-500 mt-4 mb-2" style={{ textIndent: 0 }}>
          <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-accent dark:hover:text-amber-400 transition-colors underline underline-offset-2">
            {parts.map((part, i) => (
              <span key={i}>{part}{i < parts.length - 1 && <br />}</span>
            ))}
          </a>
        </p>
      )
      continue
    }

    // 【引】 — block quote: italic, left-aligned, no text-indent
    if (trimmed.startsWith('【引】')) {
      const quoteText = trimmed.slice(3)
      elements.push(
        <p key={key++} className="italic leading-loose text-gray-700 dark:text-gray-300 my-5 pl-5 border-l-2 border-amber-300/60 dark:border-amber-700/50" style={{ textIndent: 0 }}>
          {renderWithSup(quoteText)}
        </p>
      )
      continue
    }

    // 【注】 — left-aligned note header; subsequent paragraphs render small
    if (trimmed === '【注】') {
      inNote = true
      elements.push(
        <p key={key++} className="font-serif font-bold text-ink dark:text-gray-300 mt-10 mb-2" style={{ textIndent: 0 }}>
          注
        </p>
      )
      continue
    }

    // 【Section Title】 marker
    const sectionMatch = trimmed.match(SECTION_TITLE_RE)
    if (sectionMatch) {
      elements.push(
        <p key={key++} className="text-center font-serif text-accent dark:text-amber-400 tracking-widest my-6 text-base" style={{ textIndent: 0 }}>
          {sectionMatch[1]}
        </p>
      )
      continue
    }

    // 『quoted verse』 — centered block, left-aligned text inside, italic
    // ／　／ (with ideographic space) renders as a blank spacer between stanzas
    const verseMatch = trimmed.match(VERSE_BLOCK_RE)
    if (verseMatch) {
      const verseLines = verseMatch[1].split('／')
      elements.push(
        <div key={key++} className="flex justify-center my-6" style={{ textIndent: 0 }}>
          <div className="font-serif italic text-gray-600 dark:text-gray-400 tracking-wide text-left">
            {verseLines.map((l, i) => {
              const line = l.trim()
              return line
                ? <div key={i}>{renderWithSup(line)}</div>
                : <div key={i} className="h-4" />
            })}
          </div>
        </div>
      )
      continue
    }

    // 「poem block」 — narrow centered prose block if ／ present; else no-indent single line
    const poemMatch = trimmed.match(POEM_LINE_RE)
    if (poemMatch) {
      const content = poemMatch[1]
      const poemLines = content.split('／')
      if (poemLines.length > 1) {
        elements.push(
          <div key={key++} className="my-8 px-8 sm:px-16" style={{ textIndent: 0 }}>
            <p className="font-serif text-ink dark:text-gray-200 tracking-wide leading-loose text-center">
              {poemLines.map((l, i) => (
                <span key={i}>{l}{i < poemLines.length - 1 && <br />}</span>
              ))}
            </p>
          </div>
        )
      } else if (content.length > 40) {
        // Long classical/prose passage — centered narrow italic block, text left-aligned
        elements.push(
          <div key={key++} className="my-8 px-6 sm:px-14" style={{ textIndent: 0 }}>
            <p className="font-serif italic text-ink dark:text-gray-200 tracking-wide leading-loose">
              {renderWithSup(content)}
            </p>
          </div>
        )
      } else {
        elements.push(
          <p key={key++} className="font-serif italic text-ink dark:text-gray-200 tracking-wide mb-1" style={{ textIndent: 0 }}>
            {content}
          </p>
        )
      }
      continue
    }

    // （注：...） — inline note, left-aligned small text (must come before date check)
    if (trimmed.startsWith('（注：') && trimmed.endsWith('）')) {
      elements.push(
        <p key={key++} className="text-sm text-gray-500 dark:text-gray-400 my-4 leading-relaxed" style={{ textIndent: 0 }}>
          {renderWithSup(trimmed)}
        </p>
      )
      continue
    }

    // Date / postscript line
    if (
      (trimmed.startsWith('（') || trimmed.startsWith('(')) &&
      (trimmed.endsWith('）') || trimmed.endsWith(')'))
    ) {
      elements.push(
        <p key={key++} className="text-right font-sans text-xs text-gray-400 dark:text-gray-500 mt-8 mb-2" style={{ textIndent: 0 }}>
          {trimmed}
        </p>
      )
      continue
    }

    // Note body — smaller text, no indent
    if (inNote) {
      elements.push(
        <p key={key++} className="text-sm text-gray-500 dark:text-gray-400 mb-2 leading-relaxed" style={{ textIndent: 0 }}>
          {renderWithSup(trimmed)}
        </p>
      )
      continue
    }

    elements.push(
      <p key={key++} className="mb-5" style={{ textIndent: '2em' }}>
        {renderWithSup(trimmed)}
      </p>
    )
  }

  return elements
}

export default function BianqianEssayPage({ params }: { params: { essay: string } }) {
  const essay = bianqianEssays.find((e) => e.slug === params.essay)
  if (!essay) notFound()

  const hasInlineImage = essay.image && essay.content.includes('【图】')

  const idx = bianqianEssays.findIndex((e) => e.slug === params.essay)
  const prev = idx > 0 ? bianqianEssays[idx - 1] : null
  const next = idx < bianqianEssays.length - 1 ? bianqianEssays[idx + 1] : null

  const EssayNav = () => (
    <nav className="flex items-center justify-between py-4 border-t border-amber-200/40 dark:border-gray-800/60">
      <div className="flex-1">
        {prev && (
          <Link href={`/luzexi/bianqian/${prev.slug}`} className="group flex items-center gap-2 text-sm font-sans nav-link">
            <span className="text-base">←</span>
            <span className="hidden sm:inline truncate max-w-[12rem]">{prev.title}</span>
            <span className="sm:hidden">上一篇</span>
          </Link>
        )}
      </div>
      <Link href="/luzexi/bianqian" className="font-sans text-xs text-gray-400 dark:text-gray-500 hover:text-accent dark:hover:text-amber-400 transition-colors px-4 tracking-wide">
        变迁篇目录
      </Link>
      <div className="flex-1 text-right">
        {next && (
          <Link href={`/luzexi/bianqian/${next.slug}`} className="group inline-flex items-center gap-2 text-sm font-sans nav-link">
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
            变迁篇
          </p>
          <h1 className="chapter-title text-2xl sm:text-3xl text-ink dark:text-gray-100 tracking-widest mb-3">
            {essay.title}{essay.titleSup && <sup className="text-sm font-sans text-gray-400 dark:text-gray-500 ml-0.5">{essay.titleSup}</sup>}
          </h1>
          {essay.subtitle && (
            <p className="font-serif text-base text-accent dark:text-amber-400 tracking-wide">
              {essay.subtitle}
            </p>
          )}
          <div className="w-12 h-px bg-accent/40 dark:bg-amber-600/40 mx-auto mt-6" />
        </div>

        {/* Illustration — only at top if not using inline 【图】 placement */}
        {essay.image && !hasInlineImage && (
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
          {renderContent(
            essay.content,
            hasInlineImage ? { src: essay.image!, caption: essay.imageCaption } : undefined
          )}
        </article>

        <div className="ornament mt-12">· · ·</div>

        <div className="text-center mt-4 mb-2">
          <p className="font-sans text-xs text-gray-400 dark:text-gray-500 tracking-wide">
            洛城东 · 里海谷
          </p>
        </div>

        <div className="text-center mt-2 mb-2">
          <ViewCounter page={`bianqian-${essay.slug}`} />
        </div>

        <div className="mt-4">
          <EssayNav />
        </div>

        <Comments page={`bianqian-${essay.slug}`} />
      </main>

      <SiteFooter />
    </div>
  )
}
