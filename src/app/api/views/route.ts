import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'

// GET /api/views?page=home
export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get('page') ?? 'home'

  const { data, error } = await supabase
    .from('page_views')
    .select('views')
    .eq('page_slug', page)
    .maybeSingle()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ views: data?.views ?? 0 })
}

// POST /api/views  { page }  — increments counter
export async function POST(req: NextRequest) {
  const { page } = await req.json()
  if (!page) return NextResponse.json({ error: 'missing page' }, { status: 400 })

  const { error } = await supabaseAdmin.rpc('increment_views', { slug: page })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
