import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Link from 'next/link'

export const metadata = {
  title: '人物结构说明 · 我有所爱，且为所爱',
}

const SECTION_NUM_RE = /^[一二三四五六七八九十]+[、]/
const PERSON_HEADER_RE = /^[\u4e00-\u9fa5A-Za-z]+[\u3000　\s]+[男女]/

function renderCharacters(text: string) {
  const lines = text.split('\n\n').filter(l => l.trim())
  const elements: React.ReactNode[] = []
  let key = 0
  let sectionCount = 0

  for (const block of lines) {
    const trimmed = block.trim()
    if (!trimmed || trimmed === '人物结构说明') continue

    if (SECTION_NUM_RE.test(trimmed)) {
      if (sectionCount > 0) {
        elements.push(
          <div key={key++} className="w-full h-px bg-amber-200/30 dark:bg-gray-800/50 mt-12 mb-2" />
        )
      }
      sectionCount++
      elements.push(
        <h2 key={key++} className="chapter-title text-lg text-accent dark:text-amber-400 text-center mt-6 mb-4 tracking-widest border-b border-amber-200/40 dark:border-gray-800 pb-2">
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

久居新泽西，在华尔街干过，后自创高频交易公司，以期权模型做大量短线交易。女儿亦申请茱莉亚预科。后因模型失效、损失惨重，找雨峤求援融资，被婉拒。两个月后关闭期权基金，之后在校友群愈加活跃。

▪ 颇有艺术范，私下对人友好；但喜转发阴谋论，政治观偏执，否认气候变化

▪ 过于迷信自己的数学模型，不重视长期复利——与雨峤持续学习迭代的路径形成对照

关系：老同学（洛城东）；曾结识（陆雨峤）

胡延之　男 · 第一代 · 学者

德州大学物理系学者，中国留美经济学会前任会长，将1992年年会筹备工作委托给陆雨峤。

▪ 能识人，是雨峤早期才能的伯乐式见证者

▪ 言过其实，口头禅：我没准会得诺贝尔奖

关系：前辈（陆雨峤、洛城东）

方常　男 · 第一代 · 政界学者

中国留美经济学会第七届当选会长，后回国入仕，历任外汇管理局负责人、人民银行行长。

▪ 代表回归国内政界的一类留学生，与留守海外自主经营的雨峤形成对照

关系：年长学者（陆雨峤、洛城东）

三、第二代——陆雨峤与海珘的孩子

小舟（英文名 Joe）　男 · 第二代 · 陆家长子

数学才能突出，父亲亲自辅导竞赛。后进入计算机学院，在湾区从事人工智能工作，亲历了AI对CS领域的第一道冲击波。

▪ 话不多，说到做到；宁愿在家钻研题目，也不参加社交活动

关系：儿子（陆雨峤、海珘）；兄长（Linda）

Linda（琳达）　女 · 第二代 · 陆家之女

音乐天才。幼时师从Mrs. Nielsen启蒙，在德州钢琴比赛屡获冠军，第二次面试后考入茱莉亚音乐学院预科，推动全家迁居纽约。

▪ 乐感天然，曾将小缃的九重奏改编为钢琴独奏，获全场起立鼓掌

▪ 是小缃音乐成长路上最早的记谱者与合作伙伴

关系：女儿（陆雨峤、海珘）；妹（小舟/Joe）；合作伙伴（小缃）

四、第二代——洛城东与杜丹缃的孩子

小丹　女 · 第二代 · 城东家长女

绘画天赋突出。参演过多部音乐剧，对绘画的热情远超音乐。

▪ 为人稳重，代表与Linda、小缃不同的艺术路径——视觉艺术

关系：长女（洛城东、杜丹缃）；姐（小缃）；姐（橙橙）

小缃/小缃缃/Sophie（老二）　女 · 第二代 · 城东家次女

全书天赋最突出的人物。二岁半画兔子，五岁自创曲子，在Lambert教授指导下由小品写至交响乐，九岁获全国性作曲奖，后考入茱莉亚音乐学院预科，赴纽约住在陆家。

▪ 不循规蹈矩，天马行空；与Linda合作紧密，代表下一代音乐与技术结合的探索

关系：女儿（洛城东、杜丹缃）；妹（小丹）；姐（橙橙）；学生（Lambert教授）；合作伙伴（Linda）

橙橙　男 · 第二代 · 城东家幼子

从活泼到文静，后选择哲学方向，走向自由思考与创作的路径。

▪ 是第二代中精神路径最开放的一位，象征新一代的人文追求

关系：儿子（洛城东、杜丹缃）；弟弟（小丹、小缃）

五、音乐教师

Mrs. Nielsen　女 · 配角 · 音乐启蒙老师

退休小学音乐教师，住在城东家附近，笃信基督教。Linda的钢琴启蒙老师，也为小缃打下记谱基础，善于识别天才。

▪ 满面笑容，耐心细致，是两个孩子音乐之路的第一位引路人

关系：老师（Linda、小缃）

Lambert 教授　男 · 配角 · 作曲导师

大学作曲教授，住东湾，三藩市音乐学院任职。发现小缃的粗稿已自然形成回旋曲式，此后长期指导她从小品写至交响曲规模。

▪ 热情专业，对有天赋的孩子投入极大精力与耐心

关系：导师（小缃）`

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

        <div className="flex items-center justify-between border-t border-amber-200/40 dark:border-gray-800/60 pt-4">
          <Link href="/novel/xuyan" className="font-sans text-sm nav-link tracking-wide">
            ← 序言
          </Link>
          <Link href="/novel" className="font-sans text-xs text-gray-400 dark:text-gray-500 hover:text-accent dark:hover:text-amber-400 transition-colors tracking-wide">
            目录
          </Link>
          <Link href="/novel/wei-zhi-wu-wei" className="font-sans text-sm nav-link tracking-wide">
            畏之无畏 →
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
