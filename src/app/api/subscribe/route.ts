import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabaseAdmin } from '@/lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = 'ihavemylove.life <noreply@ihavemylove.life>'
const SITE = 'https://ihavemylove.life'

// POST /api/subscribe  { email }
export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email?.trim()) {
    return NextResponse.json({ error: '请填写邮箱' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: '邮箱格式不正确' }, { status: 400 })
  }

  const normalised = email.toLowerCase().trim()

  // Check if already subscribed
  const { data: existing } = await supabaseAdmin
    .from('subscribers')
    .select('id')
    .eq('email', normalised)
    .maybeSingle()

  if (existing) {
    return NextResponse.json({ ok: true, already: true })
  }

  // Insert subscriber
  const { data: row, error } = await supabaseAdmin
    .from('subscribers')
    .insert({ email: normalised })
    .select('token')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Send welcome email
  const emailResult = await resend.emails.send({
    from: FROM,
    to: normalised,
    subject: '欢迎订阅 · 芦泽溪散文集',
    html: welcomeHtml(row.token),
  })

  if (emailResult.error) {
    console.error('Resend error:', emailResult.error)
    return NextResponse.json({ ok: true, emailError: emailResult.error.message })
  }

  return NextResponse.json({ ok: true })
}

// GET /api/subscribe?token=xxx  — unsubscribe
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  if (!token) return NextResponse.redirect(`${SITE}/?unsub=error`)

  const { error } = await supabaseAdmin
    .from('subscribers')
    .delete()
    .eq('token', token)

  if (error) return NextResponse.redirect(`${SITE}/?unsub=error`)
  return NextResponse.redirect(`${SITE}/?unsub=ok`)
}

function welcomeHtml(token: string) {
  return `
<!DOCTYPE html>
<html lang="zh">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:40px 20px;background:#faf9f6;font-family:Georgia,serif;color:#3a3530;">
  <div style="max-width:480px;margin:0 auto;">
    <p style="font-size:1.1rem;color:#a0714f;letter-spacing:0.1em;margin-bottom:24px;">我有所爱，且为所爱</p>
    <p style="font-size:1rem;line-height:1.9;">您好，感谢订阅芦泽溪散文集。每当有新文章上线，您会收到一封通知邮件。</p>
    <p style="font-size:1rem;line-height:1.9;">文集在此：<a href="${SITE}/luzexi" style="color:#a0714f;">${SITE}/luzexi</a></p>
    <p style="margin-top:32px;font-size:0.8rem;color:#aaa;">
      如需退订，<a href="${SITE}/api/subscribe?token=${token}" style="color:#aaa;">点此取消订阅</a>。
    </p>
  </div>
</body>
</html>`
}
