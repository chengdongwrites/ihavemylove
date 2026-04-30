/**
 * 发送新文章通知邮件
 * 用法：node scripts/send-newsletter.mjs "文章标题" "https://ihavemylove.life/luzexi/bianqian/youjian-nanshanlu" "简短描述（可选）"
 *
 * 需要在本地 .env.local 里有：
 *   RESEND_API_KEY=re_...
 *   NEXT_PUBLIC_SUPABASE_URL=...
 *   SUPABASE_SERVICE_ROLE_KEY=...
 */

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Load .env.local
try {
  const env = readFileSync(resolve(__dirname, '../.env.local'), 'utf-8')
  for (const line of env.split('\n')) {
    const m = line.match(/^([^#=]+)=(.*)$/)
    if (m) process.env[m[1].trim()] = m[2].trim()
  }
} catch {
  console.error('找不到 .env.local，请确认环境变量已设置')
}

const RESEND_API_KEY = process.env.RESEND_API_KEY
const SUPABASE_URL   = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY   = process.env.SUPABASE_SERVICE_ROLE_KEY
const FROM           = 'ihavemylove.life <noreply@ihavemylove.life>'
const SITE           = 'https://ihavemylove.life'

const [, , title, url, desc] = process.argv

if (!title || !url) {
  console.error('用法：node scripts/send-newsletter.mjs "标题" "链接" "描述（可选）"')
  process.exit(1)
}

// Fetch all subscribers
const sbRes = await fetch(`${SUPABASE_URL}/rest/v1/subscribers?select=email,token`, {
  headers: {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
  },
})
const subscribers = await sbRes.json()

if (!Array.isArray(subscribers) || subscribers.length === 0) {
  console.log('暂无订阅者。')
  process.exit(0)
}

console.log(`共 ${subscribers.length} 位订阅者，开始发送…`)

let ok = 0, fail = 0

for (const { email, token } of subscribers) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM,
      to: email,
      subject: `新文章：${title} · 芦泽溪散文集`,
      html: emailHtml(title, url, desc, token),
    }),
  })

  if (res.ok) {
    ok++
    console.log(`✓ ${email}`)
  } else {
    fail++
    console.error(`✗ ${email}`)
  }

  // 避免触发发送频率限制
  await new Promise(r => setTimeout(r, 100))
}

console.log(`\n完成：${ok} 封成功，${fail} 封失败。`)

function emailHtml(title, url, desc, token) {
  return `
<!DOCTYPE html>
<html lang="zh">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:40px 20px;background:#faf9f6;font-family:Georgia,serif;color:#3a3530;">
  <div style="max-width:480px;margin:0 auto;">
    <p style="font-size:0.85rem;color:#a0714f;letter-spacing:0.1em;margin-bottom:20px;">芦泽溪散文集 · 新文章</p>
    <h2 style="font-size:1.3rem;font-weight:normal;margin:0 0 16px;letter-spacing:0.05em;">${title}</h2>
    ${desc ? `<p style="font-size:1rem;line-height:1.9;color:#5a5048;margin-bottom:24px;">${desc}</p>` : ''}
    <a href="${url}" style="display:inline-block;padding:10px 24px;background:#a0714f;color:#fff;text-decoration:none;font-family:sans-serif;font-size:0.85rem;letter-spacing:0.08em;border-radius:2px;">
      阅读全文
    </a>
    <p style="margin-top:40px;font-size:0.75rem;color:#bbb;line-height:1.8;">
      您收到此邮件因为您订阅了 <a href="${SITE}/luzexi" style="color:#bbb;">ihavemylove.life</a> 的新文章通知。<br>
      <a href="${SITE}/api/subscribe?token=${token}" style="color:#bbb;">退订</a>
    </p>
  </div>
</body>
</html>`
}
