import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'

// GET /api/comments?page=home
export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get('page') ?? 'home'

  const { data, error } = await supabase
    .from('comments')
    .select('id, name, body, created_at')
    .eq('page_slug', page)
    .eq('approved', true)
    .order('created_at', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// POST /api/comments  { page, name, email, body }
export async function POST(req: NextRequest) {
  const { page, name, email, body } = await req.json()

  if (!page || !name?.trim() || !email?.trim() || !body?.trim()) {
    return NextResponse.json({ error: '请填写所有字段' }, { status: 400 })
  }

  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: '邮箱格式不正确' }, { status: 400 })
  }

  // Check if email is blocked
  const { data: blocked } = await supabaseAdmin
    .from('blocked_emails')
    .select('email')
    .eq('email', email.toLowerCase())
    .maybeSingle()

  if (blocked) {
    return NextResponse.json({ error: '无法提交留言' }, { status: 403 })
  }

  const { error } = await supabaseAdmin.from('comments').insert({
    page_slug: page,
    name: name.trim(),
    email: email.toLowerCase().trim(),
    body: body.trim(),
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
