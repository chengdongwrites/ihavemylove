import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import ViewCounter from '@/components/ViewCounter'
import Comments from '@/components/Comments'
import { jiayuanEssays } from '@/data/essays'

export async function generateStaticParams() {
  return jiayuanEssays.map((e) => ({ essay: e.slug }))
}

export async function generateMetadata({ params }: { params: { essay: string } }) {
  const essay = jiayuanEssays.find((e) => e.slug === params.essay)
  if (!essay) return {}

  const firstPara = essay.content
    .split('\n')
    .map((l: string) => l.trim())
    .find((l: string) =>
      l.length > 20 &&
      /[\u4e00-\u9fff]/.test(l) &&
      !l.startsWith('【') &&
      !l.startsWith('《') &&
      !l.startsWith('「') &&
      !l.startsWith('『') &&
      !l.startsWith('（') &&
      !l.match(/^[一二三四五六七八九十]+[、．。\s]*$/)
    )
  const description = firstPara
    ? firstPara.slice(0, 80) + (firstPara.length > 80 ? '……' : '')
    : '家园篇 · 芦泽溪散文集'

  return {
    title: `${essay.title} · 家园篇`,
    description,
    openGraph: {
      title: `${essay.title} · 家园篇`,
      description,
      siteName: '我有所爱',
      ...(essay.image && { images: [`/images/${essay.image}`] }),
    },
  }
}

// 【前言】preface line
const PREFACE_RE = /^【前言】(.+)$/
// 《poem title》 on its own line
const POEM_TITLE_RE = /^《.+》$/
// 「ci stanza」 — block-centered, left-aligned, italic (词)
const CI_STANZA_RE = /^「(.+)」$/
// 『verse lines』 — each line centered, italic (诗)
const VERSE_RE = /^『(.+)』$/
// 【Section Title】
const SECTION_TITLE_RE = /^【(.+)】$/
// 【图:filename:caption】
const INLINE_IMG_RE = /^【图:([^:]+):(.*)】$/

function renderContent(text: string) {
  const lines = text.split('\n')
  const elements: React.ReactNode[] = []
  let key = 0
  let inNote = false
  let i = 0

  while (i < lines.length) {
    const trimmed = lines[i].trim()
    i++

    if (!trimmed) {
      elements.push(<div key={key++} className="h-2" />)
      continue
    }

    if (trimmed === '---' || trimmed === '***') {
      inNote = false
      elements.push(<div key={key++} className="ornament my-8">· · ·</div>)
      continue
    }

    if (trimmed === '★') {
      elements.push(
        <div key={key++} className="text-center text-gray-300 dark:text-gray-600 my-4 text-sm tracking-widest">★</div>
      )
      continue
    }

    // 【前言】 — small italic preface, centered, before image
    const prefaceMatch = trimmed.match(PREFACE_RE)
    if (prefaceMatch) {
      elements.push(
        <p key={key++} className="font-serif italic text-gray-500 dark:text-gray-400 text-sm leading-loose text-center mb-6" style={{ textIndent: 0 }}>
          {prefaceMatch[1]}
        </p>
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

    // 【注】 — note header
    if (trimmed === '【注】') {
      inNote = true
      elements.push(
        <p key={key++} className="font-serif font-bold text-ink dark:text-gray-300 mt-10 mb-2" style={{ textIndent: 0 }}>
          注
        </p>
      )
      continue
    }

    // 【Section Title】
    const sectionMatch = trimmed.match(SECTION_TITLE_RE)
    if (sectionMatch) {
      inNote = false
      elements.push(
        <p key={key++} className="text-center font-serif text-accent dark:text-amber-400 tracking-widest my-6 text-base" style={{ textIndent: 0 }}>
          {sectionMatch[1]}
        </p>
      )
      continue
    }

    // 《poem title》 — look ahead to attach title directly to its poem/ci block
    // so the title naturally centers over the poem body
    if (POEM_TITLE_RE.test(trimmed)) {
      const title = trimmed
      // skip blank lines to find next content
      let look = i
      while (look < lines.length && !lines[look].trim()) look++
      const nextTrimmed = look < lines.length ? lines[look].trim() : ''

      if (CI_STANZA_RE.test(nextTrimmed)) {
        // Collect all ci stanzas and render title inside the flex block
        const allStanzas: string[][] = []
        let j = look
        while (j < lines.length) {
          const t = lines[j].trim()
          const m = t.match(CI_STANZA_RE)
          if (m) {
            allStanzas.push(m[1].split('／'))
            j++
          } else if (!t) {
            let k = j + 1
            while (k < lines.length && !lines[k].trim()) k++
            if (k < lines.length && CI_STANZA_RE.test(lines[k].trim())) {
              j = k
            } else { break }
          } else { break }
        }
        i = j
        elements.push(
          <div key={key++} className="flex justify-center my-3 mt-5" style={{ textIndent: 0 }}>
            <div>
              <p className="text-center font-serif text-lg text-accent dark:text-amber-400 tracking-wide mb-2" style={{ textIndent: 0 }}>
                {title}
              </p>
              <div className="font-serif italic text-gray-600 dark:text-gray-400 tracking-wide text-left leading-relaxed">
                {allStanzas.map((stanza, si) => (
                  <div key={si}>
                    {si > 0 && <div className="h-3" />}
                    {stanza.map((l, li) => <div key={li}>{l}</div>)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
        continue
      }

      if (VERSE_RE.test(nextTrimmed)) {
        // Render title inside the verse block
        const verseMatch = nextTrimmed.match(VERSE_RE)!
        const verseLines = verseMatch[1].split('／')
        i = look + 1
        elements.push(
          <div key={key++} className="text-center font-serif italic text-gray-600 dark:text-gray-400 tracking-wide my-3 mt-5" style={{ textIndent: 0 }}>
            <p className="not-italic text-lg text-accent dark:text-amber-400 mb-2" style={{ textIndent: 0 }}>
              {title}
            </p>
            {verseLines.map((l, li) => <div key={li}>{l}</div>)}
          </div>
        )
        continue
      }

      // No poem follows — render title standalone
      elements.push(
        <p key={key++} className="text-center font-serif text-lg text-accent dark:text-amber-400 tracking-wide mt-5 mb-2" style={{ textIndent: 0 }}>
          {title}
        </p>
      )
      continue
    }

    // 「ci stanza」 without preceding title — fallback grouping
    if (CI_STANZA_RE.test(trimmed)) {
      const allStanzas: string[][] = []
      let j = i - 1
      while (j < lines.length) {
        const t = lines[j].trim()
        const m = t.match(CI_STANZA_RE)
        if (m) {
          allStanzas.push(m[1].split('／'))
          j++
        } else if (!t) {
          let k = j + 1
          while (k < lines.length && !lines[k].trim()) k++
          if (k < lines.length && CI_STANZA_RE.test(lines[k].trim())) {
            j = k
          } else { break }
        } else { break }
      }
      i = j
      elements.push(
        <div key={key++} className="flex justify-center my-3" style={{ textIndent: 0 }}>
          <div className="font-serif italic text-gray-600 dark:text-gray-400 tracking-wide text-left leading-relaxed">
            {allStanzas.map((stanza, si) => (
              <div key={si}>
                {si > 0 && <div className="h-3" />}
                {stanza.map((l, li) => <div key={li}>{l}</div>)}
              </div>
            ))}
          </div>
        </div>
      )
      continue
    }

    // 『verse lines』 — each line centered, italic (诗), no preceding title
    const verseMatch = trimmed.match(VERSE_RE)
    if (verseMatch) {
      const verseLines = verseMatch[1].split('／')
      elements.push(
        <div key={key++} className="text-center font-serif italic text-gray-600 dark:text-gray-400 tracking-wide my-3" style={{ textIndent: 0 }}>
          {verseLines.map((l, vi) => <div key={vi}>{l}</div>)}
        </div>
      )
      continue
    }

    // （...） — right-aligned small text (dates, notes)
    if ((trimmed.startsWith('（') || trimmed.startsWith('(')) && (trimmed.endsWith('）') || trimmed.endsWith(')'))) {
      elements.push(
        <p key={key++} className="text-right font-sans text-xs text-gray-400 dark:text-gray-500 mt-8 mb-2" style={{ textIndent: 0 }}>
          {trimmed}
        </p>
      )
      continue
    }

    // Note body
    if (inNote) {
      elements.push(
        <p key={key++} className="text-sm text-gray-500 dark:text-gray-400 mb-2 leading-relaxed" style={{ textIndent: 0 }}>
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

export default function JiayuanEssayPage({ params }: { params: { essay: string } }) {
  const essay = jiayuanEssays.find((e) => e.slug === params.essay)
  if (!essay) notFound()

  const hasInlineImages = essay.content.includes('【图:')

  const idx = jiayuanEssays.findIndex((e) => e.slug === params.essay)
  const prev = idx > 0 ? jiayuanEssays[idx - 1] : null
  const next = idx < jiayuanEssays.length - 1 ? jiayuanEssays[idx + 1] : null

  const EssayNav = () => (
    <nav className="flex items-center justify-between py-4 border-t border-amber-200/40 dark:border-gray-800/60">
      <div className="flex-1">
        {prev && (
          <Link href={`/luzexi/jiayuan/${prev.slug}`} className="group flex items-center gap-2 text-sm font-sans nav-link">
            <span className="text-base">←</span>
            <span className="hidden sm:inline truncate max-w-[12rem]">{prev.title}</span>
            <span className="sm:hidden">上一篇</span>
          </Link>
        )}
      </div>
      <Link href="/luzexi/jiayuan" className="font-sans text-xs text-gray-400 dark:text-gray-500 hover:text-accent dark:hover:text-amber-400 transition-colors px-4 tracking-wide">
        家园篇目录
      </Link>
      <div className="flex-1 text-right">
        {next && (
          <Link href={`/luzexi/jiayuan/${next.slug}`} className="group inline-flex items-center gap-2 text-sm font-sans nav-link">
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
            家园篇
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

        {/* Top illustration — skipped when images are placed inline */}
        {essay.image && !hasInlineImages && (
          <figure className="my-8 text-center">
            <div className="inline-block max-w-sm w-full mx-auto">
              <Image
                src={`/images/${essay.image}`}
                alt={essay.imageCaption ?? essay.title}
                width={881}
                height={539}
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
          <ViewCounter page={`jiayuan-${essay.slug}`} />
        </div>

        <div className="mt-4">
          <EssayNav />
        </div>

        <Comments page={`jiayuan-${essay.slug}`} />
      </main>

      <SiteFooter />
    </div>
  )
}
