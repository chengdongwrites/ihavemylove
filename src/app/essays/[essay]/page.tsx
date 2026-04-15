import { notFound } from 'next/navigation'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import ViewCounter from '@/components/ViewCounter'
import Comments from '@/components/Comments'
import { essays, getEssayBySlug, getEssayIndex } from '@/data/essays'

export async function generateStaticParams() {
  return essays.map((e) => ({ essay: e.slug }))
}

export async function generateMetadata({ params }: { params: { essay: string } }) {
  const essay = getEssayBySlug(params.essay)
  if (!essay) return {}
  return {
    title: `${essay.title}${essay.subtitle ? ' · ' + essay.subtitle : ''} · 散文 · 我有所爱，且为所爱`,
  }
}

// Matches Chinese section numbers like 一、二、三 (optionally followed by punctuation)
const SECTION_NUM_RE = /^[一二三四五六七八九十百]+[、．。\s]*$/

// Matches poem/verse lines: short lines within a poem block
// We detect poem blocks by indentation or 《》 title markers

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

    // Section break markers
    if (trimmed === '---' || trimmed === '***' || trimmed === '* * *') {
      elements.push(
        <div key={key++} className="ornament my-8">· · ·</div>
      )
      continue
    }

    // Section numbers: 一、二、三 etc.
    if (SECTION_NUM_RE.test(trimmed)) {
      elements.push(
        <p key={key++} className="text-center font-serif text-ink dark:text-gray-200 my-6 tracking-widest" style={{ textIndent: 0 }}>
          {trimmed}
        </p>
      )
      continue
    }

    // Poem title: lines starting with 《 and ending with 》
    if (trimmed.startsWith('《') && trimmed.endsWith('》')) {
      elements.push(
        <p key={key++} className="text-center font-serif text-accent dark:text-amber-400 mt-6 mb-2 tracking-widest text-sm" style={{ textIndent: 0 }}>
          {trimmed}
        </p>
      )
      continue
    }

    // Poem lines: short lines with Chinese chars, typical of classical verse
    // Heuristic: line length <= 12 chars and contains Chinese, not starting with common prose markers
    const isShortChineseLine = trimmed.length <= 14 &&
      /[\u4e00-\u9fff]/.test(trimmed) &&
      !trimmed.includes('，') &&
      !trimmed.includes('。') &&
      !trimmed.startsWith('（') &&
      !trimmed.startsWith('【') &&
      !trimmed.startsWith('注') &&
      !trimmed.match(/^\d/)

    if (isShortChineseLine) {
      elements.push(
        <p key={key++} className="text-center font-serif text-ink dark:text-gray-200 leading-loose" style={{ textIndent: 0 }}>
          {trimmed}
        </p>
      )
      continue
    }

    // Footnote / annotation: starts with 【注】 or numbered note like "1." followed by URL/text
    if (trimmed.startsWith('【注】') || trimmed.match(/^\d+\.\s+参见/) || trimmed.match(/^\d+\.\s+另/) ) {
      elements.push(
        <p key={key++} className="font-sans text-xs text-gray-400 dark:text-gray-500 mt-2 mb-1 leading-relaxed" style={{ textIndent: 0 }}>
          {trimmed}
        </p>
      )
      continue
    }

    // Subtitle/caption lines: in parentheses or brackets, short
    if ((trimmed.startsWith('（') && trimmed.endsWith('）') && trimmed.length < 40) ||
        (trimmed.startsWith('——') && trimmed.length < 30)) {
      elements.push(
        <p key={key++} className="text-center font-serif text-sm text-gray-500 dark:text-gray-400 my-3" style={{ textIndent: 0 }}>
          {trimmed}
        </p>
      )
      continue
    }

    // Date line at end: like （2021.2.15 于里海谷）
    if (trimmed.match(/^（20\d\d\.\d+/) && trimmed.endsWith('）')) {
      elements.push(
        <p key={key++} className="text-right font-sans text-xs text-gray-400 dark:text-gray-500 mt-8 mb-2" style={{ textIndent: 0 }}>
          {trimmed}
        </p>
      )
      continue
    }

    // Regular paragraph
    elements.push(
      <p key={key++} className="mb-5" style={{ textIndent: '2em' }}>
        {trimmed}
      </p>
    )
  }

  return elements
}

export default function EssayPage({ params }: { params: { essay: string } }) {
  const essay = getEssayBySlug(params.essay)
  if (!essay) notFound()

  const idx = getEssayIndex(params.essay)
  const prev = idx > 0 ? essays[idx - 1] : null
  const next = idx < essays.length - 1 ? essays[idx + 1] : null

  const EssayNav = () => (
    <nav className="flex items-center justify-between py-4 border-t border-amber-200/40 dark:border-gray-800/60">
      <div className="flex-1">
        {prev && (
          <Link
            href={`/essays/${prev.slug}`}
            className="group flex items-center gap-2 text-sm font-sans nav-link"
          >
            <span className="text-base">←</span>
            <span className="hidden sm:inline truncate max-w-[12rem]">{prev.title}</span>
            <span className="sm:hidden">上一篇</span>
          </Link>
        )}
      </div>

      <Link
        href="/essays"
        className="font-sans text-xs text-gray-400 dark:text-gray-500 hover:text-accent dark:hover:text-amber-400 transition-colors px-4 tracking-wide"
      >
        散文目录
      </Link>

      <div className="flex-1 text-right">
        {next && (
          <Link
            href={`/essays/${next.slug}`}
            className="group inline-flex items-center gap-2 text-sm font-sans nav-link"
          >
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
        {/* Top nav */}
        <EssayNav />

        {/* Essay header */}
        <div className="text-center my-10">
          <p className="font-sans text-xs text-gray-400 dark:text-gray-500 tracking-widest mb-4 uppercase">
            {essay.section}
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

        {/* Essay content */}
        <article className="prose-chinese mt-8 text-[1.083rem]">
          {renderContent(essay.content)}
        </article>

        <div className="ornament mt-12">· · ·</div>

        {/* Author attribution */}
        <div className="text-center mt-4 mb-2">
          <p className="font-sans text-xs text-gray-400 dark:text-gray-500 tracking-wide">
            洛城东 · 里海谷
          </p>
        </div>

        {/* View counter */}
        <div className="text-center mt-2 mb-2">
          <ViewCounter page={`essay-${essay.slug}`} />
        </div>

        {/* Bottom nav */}
        <div className="mt-4">
          <EssayNav />
        </div>

        {/* Comments */}
        <Comments page={`essay-${essay.slug}`} />
      </main>

      <SiteFooter />
    </div>
  )
}
