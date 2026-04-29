import Link from 'next/link'
import Image from 'next/image'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Comments from '@/components/Comments'
import ViewCounter from '@/components/ViewCounter'
import { cunzaiEssays, bianqianEssays, jiayuanEssays } from '@/data/essays'

const cunzaiLive = new Map(cunzaiEssays.map((e) => [e.title, `/luzexi/cunzai/${e.slug}`]))
const longArticleTitles = new Set(['那时红叶', '人间有美赛珍珠', '亲近广玉兰', '迂回路口'])
const bianqianLive = new Map(bianqianEssays.map((e) => [e.title, `/luzexi/bianqian/${e.slug}`]))
const jiayuanLive = new Map(jiayuanEssays.map((e) => [e.title, `/luzexi/jiayuan/${e.slug}`]))

export const metadata = {
  title: '芦泽溪散文集',
  description: '芦苇听风，溪水听石，洛城东听时间——把听见的写下来，留给愿意一起聆听的人。',
  openGraph: {
    title: '芦泽溪散文集',
    description: '芦苇听风，溪水听石，洛城东听时间——把听见的写下来，留给愿意一起聆听的人。',
    siteName: '我有所爱',
  },
}

const sections = [
  {
    name: '家园篇',
    description: '溪径与花木，海谷的四季，家的重量与根的延伸。',
    href: '/luzexi/jiayuan',
    articles: [
      '芦泽溪径春之初', '常青树礼赞', '朔方的雪', '漫道平常',
      '亲近广玉兰', '木秀于林未可摧', '雨后却斜阳', '两棵番茄苗和两棵向日葵',
      '离散第一课', '迂回路口', '申学散记一筑梦之冬', '申学散记二守望之春',
      '申学散记三杏花春雨', '申学散记四硅谷之归', '青杏小小', '秋花金缕梅',
      '银杏飘飘', '你如盛放我且安眠', '新雪', '岁寒五梅友',
      '雪化的声音', '朔方的雪五年后', '当片云不落芦花荡', '浅释字辈歌',
    ],
  },
  {
    name: '变迁篇',
    description: '时代的漂移，记忆的沉淀，个人与历史的交汇处。',
    href: '/luzexi/bianqian',
    articles: [
      '雨山前', '告别童年', '以女儿的名义', '闲话变异与变迁',
      '那时红叶', '人间有美赛珍珠', '千屈菜', '又见南山绿',
      '时闻折竹声', '无依之地忍冬花', '磨难中的天才——苏东坡',
      '孤山独秀', '棠梨——遥远的记忆', '棠梨牵出12800公里连线', '严寒的逻辑',
      '静默生死哀思——哈姆奈特观感',
    ],
  },
  {
    name: '美学篇',
    description: '音乐、文学、自然之美，以及感知世界的方式。',
    href: '/luzexi/meixue',
    articles: [
      '相见牡丹时', '银杏叶画的窥视美感', '生活美学——林语堂',
      '听雨的境界', '与万物同席', '从农夫与诗人困境到生活美定理',
      '时间——隐匿与显现的无形艺术师', '听一首老歌的回味之美',
      '求偶舞与花朵——艺术的存在论起源', '无花果里外的共生剧场',
      '诗意栖居之野蔷薇', '渐行渐远渐无人', '红隼：注意力与协作的艺术',
      '诗经里的生态美', '十月樱与广玉兰', '温庭筠清疏澹远诗境',
      '当片云落入芦苇荡', '艺术的君王蝶',
    ],
  },
  {
    name: '存在篇',
    description: '生命与存在的叩问，信天翁的悲欢，以及时间的重量。',
    href: '/luzexi/cunzai',
    articles: [
      '偶然人生之赌', '大雪后的费纳戈时刻', '信天翁的悲欢离合',
      '冬雾中的溪径行', '秋之盟约', '山凤凰', '技术与救赎',
      'AI时代的全民焦虑', '说静', '物物者非物', '静默之言说',
    ],
  },
  {
    name: '寓言篇',
    description: '以寓言之镜照见世道，虚中见实，曲中见直。',
    href: '/luzexi/yuyan',
    articles: [
      { title: '骏马与公鸡', slug: 'junma-gongji' },
      { title: '新田园诗者', slug: 'xin-tianyuan' },
      { title: '长木刺与大地懒', slug: 'changmuci-didilan' },
    ],
  },
]

export default function LuzexiPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero with cover */}
        <section className="relative py-16 sm:py-24 px-4">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center sm:items-start gap-10">
            <div className="flex-shrink-0">
              <div className="relative w-44 sm:w-52 shadow-lg rounded overflow-hidden">
                <Image
                  src="/images/sanwen-cover.jpg"
                  alt="《芦泽溪散文集》封面"
                  width={208}
                  height={294}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left pt-2">
              <h1 className="chapter-title text-3xl sm:text-4xl md:text-5xl text-ink dark:text-gray-100 mb-4 tracking-widest">
                芦泽溪散文集
              </h1>
              <p className="font-sans text-accent dark:text-amber-400 text-sm tracking-widest mb-5">
                洛城东著
              </p>
              <div className="w-16 h-px bg-accent/40 dark:bg-amber-600/40 mb-6 mx-auto sm:mx-0" />
              <p className="prose-chinese text-base text-gray-600 dark:text-gray-400 leading-relaxed" style={{ textIndent: 0 }}>
                这部散文集，是用心思听来的。<br />
                七十二篇，五个篇章，<br />
                留给愿意一起聆听的人。
              </p>
              <div className="mt-6">
                <Link
                  href="/luzexi/xuyan"
                  className="font-sans text-sm nav-link tracking-wide"
                >
                  阅读序言 →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Sections */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
          {/* Dedication */}
          <div className="text-center mb-12">
            <p className="font-serif italic text-gray-500 dark:text-gray-400 tracking-wide text-sm">
              谨以此书献给父母、亲人好友。
            </p>
          </div>

          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-amber-200/40 dark:bg-gray-800/60" />
            <span className="font-sans text-xs text-gray-400 dark:text-gray-500 tracking-widest uppercase">全集篇目</span>
            <div className="flex-1 h-px bg-amber-200/40 dark:bg-gray-800/60" />
          </div>

          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.name}>
                {/* Section header */}
                <div className="flex items-baseline justify-between mb-3">
                  <Link
                    href={section.href}
                    className="font-serif text-lg text-ink dark:text-gray-200 hover:text-accent dark:hover:text-amber-400 transition-colors tracking-wider"
                  >
                    {section.name}
                  </Link>
                  <span className="font-sans text-xs text-gray-400 dark:text-gray-600 ml-4">
                    {section.articles.length} 篇
                  </span>
                </div>
                <p className="font-sans text-xs italic text-gray-400 dark:text-gray-500 mb-4 leading-relaxed">
                  {section.description}
                </p>

                {/* Article list */}
                <div className="flex flex-wrap gap-x-1 gap-y-1 items-baseline">
                  {section.articles.map((article, idx) => {
                    const isObj = typeof article === 'object'
                    const title = isObj ? article.title : article
                    const slug = isObj ? article.slug : null
                    const isLast = idx === section.articles.length - 1

                    // Check section-specific live links
                    const cunzaiHref = section.name === '存在篇' ? cunzaiLive.get(title) : null
                    const bianqianHref = section.name === '变迁篇' ? bianqianLive.get(title) : null
                    const jiayuanHref = section.name === '家园篇' ? jiayuanLive.get(title) : null
                    const href = slug ? `/luzexi/yuyan/${slug}` : cunzaiHref ?? bianqianHref ?? jiayuanHref ?? null

                    return (
                      <span key={idx} className="font-sans text-xs text-gray-500 dark:text-gray-400">
                        {href ? (
                          <Link
                            href={href}
                            className="text-amber-700 dark:text-amber-300 font-medium hover:underline"
                          >
                            {title}
                          </Link>
                        ) : (
                          <span>{title}</span>
                        )}
                        {longArticleTitles.has(title) && (
                          <span className="ml-1 font-sans text-[10px] text-gray-400 dark:text-gray-500 tracking-wide align-middle">长篇</span>
                        )}
                        {!isLast && <span className="mx-1 text-gray-400 dark:text-gray-500 text-base">·</span>}
                      </span>
                    )
                  })}
                </div>

                <div className="mt-4">
                  <Link
                    href={section.href}
                    className="font-sans text-xs text-accent dark:text-amber-500 tracking-wide hover:underline"
                  >
                    阅读本篇 →
                  </Link>
                </div>

                <div className="mt-8 h-px bg-amber-100/60 dark:bg-gray-800/40" />
              </div>
            ))}
          </div>
        </section>

        {/* View counter + Comments */}
        <section className="max-w-2xl mx-auto px-4 sm:px-6 pb-16">
          <div className="text-center mb-4">
            <ViewCounter page="luzexi" />
          </div>
          <Comments page="luzexi" />
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
