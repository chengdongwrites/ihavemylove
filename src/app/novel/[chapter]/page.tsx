import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import ViewCounter from '@/components/ViewCounter'
import Comments from '@/components/Comments'
import { chapters, getChapterBySlug, getChapterIndex } from '@/data/chapters'

export async function generateStaticParams() {
  return chapters.map((ch) => ({ chapter: ch.slug }))
}

export async function generateMetadata({ params }: { params: { chapter: string } }) {
  const ch = getChapterBySlug(params.chapter)
  if (!ch) return {}
  return {
    title: `${ch.title}${ch.subtitle ? ' · ' + ch.subtitle : ''} · 我有所爱，且为所爱`,
  }
}

// Section number pattern: single Chinese number followed by 、or ．or just a number like 一 二 三
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

    // Image placeholder marker
    if (trimmed === '[]' || trimmed === '[ ]') {
      continue
    }

    // Section break markers
    if (trimmed === '---' || trimmed === '***' || trimmed === '* * *') {
      elements.push(
        <div key={key++} className="ornament my-8">· · ·</div>
      )
      continue
    }

    // Section numbers: 一、二、三 etc. — centered, no indent
    if (SECTION_NUM_RE.test(trimmed)) {
      elements.push(
        <p key={key++} className="text-center font-serif text-ink dark:text-gray-200 my-6 tracking-widest" style={{textIndent: 0}}>
          {trimmed}
        </p>
      )
      continue
    }

    // Finale line: [finale]text — centered, larger, distinct
    if (trimmed.startsWith('[finale]')) {
      const text = trimmed.slice(8)
      elements.push(
        <p key={key++} className="text-center font-serif text-ink dark:text-gray-100 text-xl tracking-widest my-10" style={{textIndent: 0}}>
          {text}
        </p>
      )
      continue
    }

    // Footnote: [fn]text — small annotation, no indent
    if (trimmed.startsWith('[fn]')) {
      const note = trimmed.slice(4)
      elements.push(
        <p key={key++} className="font-sans text-xs text-gray-400 dark:text-gray-500 mt-[-12px] mb-5 pl-1 leading-relaxed" style={{textIndent: 0}}>
          ﹡{note}
        </p>
      )
      continue
    }

    // Regular paragraph
    elements.push(
      <p key={key++} className="mb-5" style={{textIndent: '2em'}}>
        {trimmed}
      </p>
    )
  }

  return elements
}

export default function ChapterPage({ params }: { params: { chapter: string } }) {
  const ch = getChapterBySlug(params.chapter)
  if (!ch) notFound()

  const idx = getChapterIndex(params.chapter)
  const prev = idx > 0 ? chapters[idx - 1] : null
  const next = idx < chapters.length - 1 ? chapters[idx + 1] : null

  // 序言的下一步是人物结构说明；冬之沉静（下）的下一步是跋
  const isXuyan = ch!.slug === 'xuyan'
  const isLastChapter = ch!.slug === 'dongzhi-xia'

  const ChapterNav = () => (
    <nav className="flex items-center justify-between py-4 border-t border-amber-200/40 dark:border-gray-800/60">
      <div className="flex-1">
        {isXuyan ? null : prev && (
          <Link
            href={`/novel/${prev.slug}`}
            className="group flex items-center gap-2 text-sm font-sans nav-link"
          >
            <span className="text-base">←</span>
            <span className="hidden sm:inline">{prev.title}</span>
            <span className="sm:hidden">上一章</span>
          </Link>
        )}
      </div>

      <Link
        href="/novel"
        className="font-sans text-xs text-gray-400 dark:text-gray-500 hover:text-accent dark:hover:text-amber-400 transition-colors px-4 tracking-wide"
      >
        目录
      </Link>

      <div className="flex-1 text-right">
        {isXuyan ? (
          <Link
            href="/characters"
            className="group inline-flex items-center gap-2 text-sm font-sans nav-link"
          >
            <span className="hidden sm:inline">人物结构说明</span>
            <span className="sm:hidden">人物</span>
            <span className="text-base">→</span>
          </Link>
        ) : isLastChapter ? (
          <Link
            href="/ba"
            className="group inline-flex items-center gap-2 text-sm font-sans nav-link"
          >
            <span className="hidden sm:inline">跋</span>
            <span className="sm:hidden">跋</span>
            <span className="text-base">→</span>
          </Link>
        ) : next && (
          <Link
            href={`/novel/${next.slug}`}
            className="group inline-flex items-center gap-2 text-sm font-sans nav-link"
          >
            <span className="hidden sm:inline">{next.title}</span>
            <span className="sm:hidden">下一章</span>
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
        <ChapterNav />

        {/* Chapter header */}
        <div className="text-center my-10">
          <h1 className="chapter-title text-2xl sm:text-3xl text-ink dark:text-gray-100 tracking-widest mb-3">
            {ch.title}
          </h1>
          {ch.subtitle && (
            <p className="font-serif text-base text-accent dark:text-amber-400 tracking-wide">
              {ch.subtitle}
            </p>
          )}
          <div className="w-12 h-px bg-accent/40 dark:bg-amber-600/40 mx-auto mt-6" />
        </div>

        {/* Dedication — shown only on 序言 */}
        {isXuyan && (
          <div className="text-center mb-10 mt-2">
            <p className="font-serif text-sm text-gray-400 dark:text-gray-500 tracking-widest italic">
              献给生命中最温柔的底色
            </p>
          </div>
        )}

        {/* Chapter illustration */}
        {ch.image && (
          <figure className="my-10 text-center">
            <div className="inline-block max-w-sm w-full mx-auto">
              <Image
                src={`/images/${ch.image}`}
                alt={`${ch.title}插图`}
                width={480}
                height={360}
                className="w-full h-auto rounded shadow-md object-cover"
                priority={idx <= 2}
              />
            </div>
          </figure>
        )}

        {/* Chapter content */}
        <article className="prose-chinese mt-8 text-[1.083rem]">
          {renderContent(ch.content)}
        </article>

        <div className="ornament mt-12">· · ·</div>

        {/* View counter */}
        <div className="text-center mt-4 mb-2">
          <ViewCounter page={ch.slug} />
        </div>

        {/* Bottom nav */}
        <div className="mt-4">
          <ChapterNav />
        </div>

        {/* Comments */}
        <Comments page={ch.slug} />
      </main>

      <SiteFooter />
    </div>
  )
}
