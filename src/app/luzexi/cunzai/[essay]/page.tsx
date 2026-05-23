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
      /[一-鿿]/.test(l) &&
      !l.startsWith('《') &&
      !l.startsWith('【') &&
      !l.startsWith('（') &&
      !l.startsWith('## ') &&
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

// ## primary heading (left-aligned, larger, ink color)
const PRIMARY_HEADING_RE = /^## (.+)$/
// 【Section Title】 — centered gold
const SECTION_TITLE_RE = /^【(.+)】$/
// 「Sub-heading」 — bold left-aligned
const SUBHEADING_RE = /^「(.+)」$/
// 『Quoted verse』 — centered italic; use ／ as line separator
const VERSE_BLOCK_RE = /^『(.+)』$/
// 【图:filename:caption】 — inline image
const INLINE_IMG_RE = /^【图:([^:]+):([^:】]*)(?::(\d+)x(\d+))?】$/
// 【表:caption】 — opens a table block; closed by 【/表】
const TABLE_OPEN_RE = /^【表:(.*)】$/
const TABLE_CLOSE = '【/表】'

// Inline markup: ^1^ → <sup>1</sup>;  <br> → line break;  【链:url|text】 → <a>
function renderInline(text: string, keyBase = 0): React.ReactNode {
  // Split on tokens we care about, preserving them
  const parts = text.split(/(【链:[^|】]+\|[^】]+】|\^\d+\^|<br\s*\/?>|\*[^*\n]+\*)/g)
  if (parts.length === 1) return text
  return (
    <>
      {parts.map((p, i) => {
        if (/^<br\s*\/?>$/.test(p)) return <br key={`${keyBase}-${i}`} />
        const sup = p.match(/^\^(\d+)\^$/)
        if (sup) return <sup key={`${keyBase}-${i}`} className="text-[10px] font-sans text-gray-400 dark:text-gray-500 align-super">{sup[1]}</sup>
        const link = p.match(/^【链:([^|】]+)\|([^】]+)】$/)
        if (link) return <a key={`${keyBase}-${i}`} href={link[1]} target="_blank" rel="noopener noreferrer" className="nav-link underline underline-offset-2">{link[2]}</a>
        const italic = p.match(/^\*([^*\n]+)\*$/)
        if (italic) return <em key={`${keyBase}-${i}`} className="italic font-normal">{italic[1]}</em>
        return <span key={`${keyBase}-${i}`}>{p}</span>
      })}
    </>
  )
}

function renderTable(caption: string, rows: string[][], key: number, cols?: number[]): React.ReactNode {
  const [header, ...body] = rows
  return (
    <div key={key} className="my-10" style={{ textIndent: 0 }}>
      {caption && (
        <p className="text-center font-serif text-ink dark:text-gray-200 text-sm sm:text-base mb-3 tracking-wide">
          {caption}
        </p>
      )}
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <table className="w-full text-sm border-collapse min-w-[40rem] sm:min-w-0" style={{ tableLayout: cols ? 'fixed' : 'auto' }}>
          {cols && (
            <colgroup>
              {cols.map((w, i) => <col key={i} style={{ width: `${w}%` }} />)}
            </colgroup>
          )}
          <thead>
            <tr className="border-b-2 border-amber-200/60 dark:border-amber-700/40">
              {header?.map((cell, i) => (
                <th key={i} className="px-3 py-2 text-left font-serif font-semibold text-ink dark:text-gray-200 align-top">
                  {renderInline(cell, i)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((row, ri) => (
              <tr key={ri} className="border-b border-amber-100/60 dark:border-gray-800/60">
                {row.map((cell, ci) => (
                  <td key={ci} className="px-3 py-3 align-top text-gray-700 dark:text-gray-300 leading-relaxed">
                    {renderInline(cell, ri * 10 + ci)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function renderContent(text: string) {
  const lines = text.split('\n')
  const elements: React.ReactNode[] = []
  let key = 0
  let inNote = false
  let i = 0

  while (i < lines.length) {
    const trimmed = lines[i].trim()

    if (!trimmed) {
      elements.push(<div key={key++} className="h-2" />)
      i++
      continue
    }

    if (trimmed === '---' || trimmed === '***') {
      inNote = false
      elements.push(<div key={key++} className="ornament my-8">· · ·</div>)
      i++
      continue
    }

    if (trimmed === '★') {
      elements.push(
        <div key={key++} className="text-center text-gray-300 dark:text-gray-600 my-4 text-sm tracking-widest">★</div>
      )
      i++
      continue
    }

    // 【表:caption】 or 【表:caption|cols=W1,W2,W3】 ... 【/表】 — multi-line table block
    const tableOpen = trimmed.match(TABLE_OPEN_RE)
    if (tableOpen && tableOpen[0].startsWith('【表:')) {
      let captionRaw = tableOpen[1]
      let cols: number[] | undefined
      const colsMatch = captionRaw.match(/^(.*)\|cols=([\d,]+)$/)
      if (colsMatch) {
        captionRaw = colsMatch[1]
        cols = colsMatch[2].split(',').map((s) => parseInt(s, 10))
      }
      const caption = captionRaw
      const rows: string[][] = []
      i++
      while (i < lines.length && lines[i].trim() !== TABLE_CLOSE) {
        const rowLine = lines[i].trim()
        if (rowLine) {
          rows.push(rowLine.split('|').map((c) => c.trim()))
        }
        i++
      }
      i++ // skip closing tag
      elements.push(renderTable(caption, rows, key++, cols))
      inNote = false
      continue
    }

    // 【图:filename:caption】 or 【图:filename:caption:WxH】 — inline image
    const imgMatch = trimmed.match(INLINE_IMG_RE)
    if (imgMatch) {
      const [, filename, caption] = imgMatch
      elements.push(
        <figure key={key++} className="my-10 text-center">
          <div className="max-w-2xl mx-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/images/${filename}`}
              alt={caption || ''}
              className="block w-full h-auto rounded shadow-md"
              style={{ display: 'block' }}
            />
          </div>
          {caption && (
            <figcaption className="font-sans text-xs text-gray-400 dark:text-gray-500 mt-3 leading-relaxed max-w-md mx-auto">
              {caption}
            </figcaption>
          )}
        </figure>
      )
      i++
      continue
    }

    // 【注】or 【注释】 — left-aligned note/reference header
    if (trimmed === '【注】' || trimmed === '【注释】' || trimmed === '【参考文献】') {
      inNote = true
      const label = trimmed === '【注释】' ? '注释' : trimmed === '【参考文献】' ? '参考文献' : '注'
      elements.push(
        <p key={key++} className="font-serif font-bold text-ink dark:text-gray-300 mt-10 mb-3" style={{ textIndent: 0 }}>
          {label}
        </p>
      )
      i++
      continue
    }

    // 【后记】 — afterword header
    if (trimmed === '【后记】') {
      inNote = false
      elements.push(
        <p key={key++} className="font-serif font-bold text-ink dark:text-gray-300 mt-10 mb-3" style={{ textIndent: 0 }}>
          后记
        </p>
      )
      i++
      continue
    }

    // ## Primary heading — left-aligned, larger, ink color
    const primaryMatch = trimmed.match(PRIMARY_HEADING_RE)
    if (primaryMatch) {
      inNote = false
      elements.push(
        <h2 key={key++} className="font-serif font-semibold text-ink dark:text-gray-100 text-xl sm:text-2xl tracking-wide mt-12 mb-4" style={{ textIndent: 0 }}>
          {primaryMatch[1]}
        </h2>
      )
      i++
      continue
    }

    // 【Section Title】 — centered gold
    const secMatch = trimmed.match(SECTION_TITLE_RE)
    if (secMatch) {
      inNote = false
      elements.push(
        <div key={key++} className="text-center my-10" style={{ textIndent: 0 }}>
          <p className="font-serif text-xl text-accent dark:text-amber-400 tracking-widest mb-3">
            {secMatch[1]}
          </p>
          <div className="w-10 h-px bg-accent/50 dark:bg-amber-600/50 mx-auto" />
        </div>
      )
      i++
      continue
    }

    // 『Quoted text』 — left-aligned italic block quote, supports ／ line separator
    const verseMatch = trimmed.match(VERSE_BLOCK_RE)
    if (verseMatch) {
      const verseLines = verseMatch[1].split('／')
      elements.push(
        <div key={key++} className="font-serif italic text-gray-600 dark:text-gray-300 my-6 pl-5 border-l-2 border-amber-300/60 dark:border-amber-700/50 leading-relaxed" style={{ textIndent: 0 }}>
          {verseLines.map((l, idx) => <div key={idx} className="mb-2 last:mb-0">{renderInline(l, idx)}</div>)}
        </div>
      )
      i++
      continue
    }

    // 「Sub-heading」 — bold left-aligned
    const subMatch = trimmed.match(SUBHEADING_RE)
    if (subMatch) {
      elements.push(
        <p key={key++} className="font-serif font-bold text-ink dark:text-gray-200 tracking-wide mt-8 mb-3 text-base" style={{ textIndent: 0 }}>
          {renderInline(subMatch[1])}
        </p>
      )
      i++
      continue
    }

    // (date / postscript) right-aligned
    if ((trimmed.startsWith('（') || trimmed.startsWith('(')) && (trimmed.endsWith('）') || trimmed.endsWith(')'))) {
      elements.push(
        <p key={key++} className="text-right font-sans text-xs text-gray-400 dark:text-gray-500 mt-8 mb-2" style={{ textIndent: 0 }}>
          {trimmed}
        </p>
      )
      i++
      continue
    }

    // Note body — small text, no indent
    if (inNote) {
      elements.push(
        <p key={key++} className="text-sm text-gray-500 dark:text-gray-400 mb-3 leading-relaxed" style={{ textIndent: 0 }}>
          {renderInline(trimmed)}
        </p>
      )
      i++
      continue
    }

    elements.push(
      <p key={key++} className="mb-5" style={{ textIndent: '2em' }}>
        {renderInline(trimmed)}
      </p>
    )
    i++
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

        {/* Illustration — cover image at top */}
        {essay.image && (
          <figure className="my-8 text-center">
            <div className="max-w-2xl mx-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/${essay.image}`}
                alt={essay.imageCaption ?? essay.title}
                className="block w-full h-auto rounded shadow-md"
                style={{ display: 'block' }}
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
