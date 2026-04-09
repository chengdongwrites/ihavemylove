import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

function checkAuth(req: NextRequest) {
  const token = req.headers.get('x-admin-token')
  return token === process.env.ADMIN_SECRET
}

// DELETE /api/admin  { action: 'delete_comment', id }
//                  | { action: 'block_email', email }
//                  | { action: 'unblock_email', email }
export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { action, id, email } = await req.json()

  if (action === 'delete_comment') {
    const { error } = await supabaseAdmin
      .from('comments')
      .update({ approved: false })
      .eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true })
  }

  if (action === 'block_email') {
    // Hide all comments from this email and add to block list
    await supabaseAdmin
      .from('comments')
      .update({ approved: false })
      .eq('email', email.toLowerCase())

    const { error } = await supabaseAdmin
      .from('blocked_emails')
      .upsert({ email: email.toLowerCase() })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true })
  }

  if (action === 'unblock_email') {
    const { error } = await supabaseAdmin
      .from('blocked_emails')
      .delete()
      .eq('email', email.toLowerCase())
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}

// GET /api/admin?view=comments | blocked
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const view = req.nextUrl.searchParams.get('view') ?? 'comments'

  if (view === 'comments') {
    const { data, error } = await supabaseAdmin
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  }

  if (view === 'blocked') {
    const { data, error } = await supabaseAdmin
      .from('blocked_emails')
      .select('*')
      .order('blocked_at', { ascending: false })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  }

  return NextResponse.json({ error: 'Unknown view' }, { status: 400 })
}
