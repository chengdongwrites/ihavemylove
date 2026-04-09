import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Link from 'next/link'

export const metadata = {
  title: '人物结构说明 · 我有所爱，且为所爱',
}

const SECTION_NUM_RE = /^[一二三四五六七八九十]+[、．。\s]*$/
const PERSON_HEADER_RE = /^[\u4e00-\u9fa5A-Za-z]+[\u3000　\s]+[男女]/

function renderCharacters(text: string) {
  const lines = text.split('\n\n').filter(l => l.trim())
  const elements: React.ReactNode[] = []
  let key = 0

  for (const block of lines) {
    const trimmed = block.trim()
    if (!trimmed || trimmed === '人物结构说明') continue

    if (SECTION_NUM_RE.test(trimmed)) {
      elements.push(
        <h2 key={key++} className="chapter-title text-lg text-accent dark:text-amber-400 text-center mt-10 mb-4 tracking-widest border-b border-amber-200/40 dark:border-gray-800 pb-2">
          {trimmed}
        </h2>
      )
      continue
    }

    if (PERSON_HEADER_RE.test(trimmed)) {
      elements.push(
        <h3 key={key++} className="font-serif text-base font-medium text-ink dark:text-gray-100 mt-6 mb-1 tracking-wide">
          {trimmed}
        </h3>
      )
      continue
    }

    if (trimmed.startsWith('▪')) {
      elements.push(
        <p key={key++} className="font-sans text-sm text-gray-600 dark:text-gray-400 pl-4 mb-1 leading-relaxed">
          {trimmed}
        </p>
      )
      continue
    }

    if (trimmed.startsWith('关系：')) {
      elements.push(
        <p key={key++} className="font-sans text-xs text-gray-400 dark:text-gray-500 pl-4 mb-4 tracking-wide">
          {trimmed}
        </p>
      )
      continue
    }

    elements.push(
      <p key={key++} className="prose-chinese text-sm text-gray-700 dark:text-gray-300 mb-2 leading-relaxed" style={{textIndent: 0}}>
        {trimmed}
      </p>
    )
  }

  return elements
}

const content = `人物结构说明

一、核心主要人物

陆雨峤　男 · 第一代 · 主人公

北京大学物理系，德州大学博士，后任硅谷科技公司业务主管。两度遭遇海德格尔所说的"畏"，均正面回应：第一次转向哲学与阅读，第二次辞职创立量化对冲基金。金融危机期间因对冲得力损失远小于市场，此后长期跑赢指数。举家迁达拉斯，后又迁纽约支持女儿学业。

▪ 沉静内省，把基金视为"淬炼心性的道场"而非目的

▪ 自学成才，不断改进模型；遇危机沉得住气，慎用杠杆

▪ 生活简朴，重视家庭，亲自培养子女在数学与音乐上的天赋

关系：丈夫（海珘）；密友（洛城东、李辉谨）；父亲（小舟/Joe、Linda/琳达）

海珘　女 · 第一代 · 陆雨峤之妻

复旦大学世经系，德州大学会计硕士，后攻读会计博士。论文聚焦盈余管理，发表历经长期困境。受谢玉华之死警醒，走出学术困局，转向非营利教育事业，终在纽约福德汉姆大学取得教职。

▪ 聪慧理性，一次精妙发言平息留学生争论，令人刮目相看

▪ 是两个家庭的情感纽带，细心照顾小缃赴纽约求学的日常

关系：妻子（陆雨峤）；密友（杜丹缃、谢玉华）；母亲（小舟/Joe、Linda/琳达）

洛城东（城东）　男 · 第一代 · 叙述者

中科大毕业，德州大学非线性统计物理博士，伯克利商学院毕业，长期供职湾区资产管理公司，历经公司收购后的职业动荡。是陆雨峤基金的最早投资人之一，也是三十八年故事的见证者与讲述者。

▪ 善于观察与深思，比雨峤更谨慎，却因此成为最忠实的陪伴与见证

▪ 学术理想与现实职业之间始终保持张力，是雨峤"畏"的间接回应者

关系：丈夫（杜丹缃）；密友（陆雨峤、李辉谨）；父亲（小丹、小缃、橙橙）

杜丹缃　女 · 第一代 · 洛城东之妻

德州大学会计硕士，受海珘影响从经济系转入会计。毕业后在湾区会计事务所任审计师，后转入科技公司财务部负责内部会计。

▪ 热情幽默，是人群中天然的粘合剂；说出全书精神落点："我有所爱，且为所爱"

▪ 对家人和朋友细心照顾，谢玉华去世后主导纪念活动

关系：妻子（洛城东）；密友（海珘、谢玉华）；母亲（小丹、小缃、橙橙）

李辉谨　男 · 第一代 · 量化金融专家

物理系出身，转型为三藩市投行量化交易员，专精可转换债券套利，后历经互联网泡沫与金融危机，先后任职贝尔斯登、摩根大通，升至资深董事总经理（MD）。

▪ 精通建模，言谈满是希腊字母；谨慎保守，但支持雨峤创业

▪ 安心于现成轨道，与雨峤的"主动出走"形成对照

关系：密友（陆雨峤、洛城东）；早期投资人（雨峤基金）

二、重要配角（第一代）

谢玉华　女 · 第一代 · 丹缃同学

金融学博士，顶级商学院助理教授，深具才华、拼命做事，来湾区访问后不久突然离世。身后，丹缃等朋友为她建立永久纪念网站与奖项。

▪ 全书警示性人物——她的离世成为众人重新审视生命价值的转折点

关系：好朋友（杜丹缃、海珘）；有一幼女

Kamal　男 · 陆雨峤前同事

雨峤在硅谷公司的行销同事，MBA学历，曾是创业候选伙伴。被雨峤认清后排除，此后连续跳槽，职位名义渐高实则渐边缘，最终被辞退。

▪ 说话圆滑但言行不一；与雨峤形成"华而不实 vs 默默深耕"的对照

关系：前同事（陆雨峤）

王毅爽　男 · 第一代 · 洛城东老同学

久居新泽西，在华尔街干过，后自创高频交易公司，以期权模型做大量短线交易。女儿亦申请茱莉亚预科。后因模型失效、损失惨重，找雨峤求援融资，被婉拒。两个月后关闭期权基金。

▪ 颇有艺术范，私下对人友好；但喜转发阴谋论，政治观偏执

▪ 过于迷信自己的数学模型，不重视长期复利——与雨峤持续学习迭代的路径形成对照

关系：老同学（洛城东）；曾结识（陆雨峤）

三、第二代人物

小缃（杜丹缃之女）　女 · 第二代 · 作曲家

自幼展现音乐天赋，在城东发现并鼓励下走上作曲之路。茱莉亚音乐学院预科，后进入茱莉亚本科。毕业后选择回达拉斯发展AI音乐创作，拒绝留在纽约。

▪ 城东最早注意到她的作曲才华，雨峤一家接待她在纽约求学期间的日常

▪ 她的选择代表第二代"有所爱"的方式：回到自己的土壤，而非留在中心

关系：女儿（洛城东、杜丹缃）；受关照（陆雨峤、海珘）

橙橙（洛城东之女）　女 · 第二代 · 哲学与写作

偏文科，选择哲学与自由写作，拒绝循规蹈矩的职业路径。

▪ 代表第二代中"选择思考本身"的一支

关系：女儿（洛城东、杜丹缃）；姐妹（小丹、小缃）

小舟/Joe（陆雨峤之子）　男 · 第二代 · 计算机工程

MIT计算机系，亲历AI对CS就业市场的第一波冲击。正在重新评估职业方向。

▪ 代表第二代中被AI浪潮直接冲击的一支，故事尚在继续

关系：儿子（陆雨峤、海珘）；姐妹（Linda/琳达）`

export default function CharactersPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 py-12 w-full">
        <div className="text-center mb-10">
          <h1 className="chapter-title text-2xl text-ink dark:text-gray-100 tracking-widest mb-3">
            人物结构说明
          </h1>
          <p className="font-sans text-xs text-gray-400 dark:text-gray-500 tracking-wide">
            《我有所爱，且为所爱》
          </p>
          <div className="w-10 h-px bg-accent/40 dark:bg-amber-600/40 mx-auto mt-4" />
        </div>

        <div className="space-y-1">
          {renderCharacters(content)}
        </div>

        <div className="ornament my-10">· · ·</div>

        <div className="text-center flex gap-6 justify-center">
          <Link href="/novel/xuyan" className="font-sans text-sm nav-link tracking-wide">
            ← 序言
          </Link>
          <Link href="/novel" className="font-sans text-sm nav-link tracking-wide">
            小说目录 →
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
