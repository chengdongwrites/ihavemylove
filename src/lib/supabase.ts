import { createClient } from '@supabase/supabase-js'

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const svc  = process.env.SUPABASE_SERVICE_ROLE_KEY

// Public client — used in browser and read-only server calls
export const supabase = createClient(url, anon)

// Service-role client — used only in API routes that need admin access
// (delete comments, block emails). Falls back to anon in local dev.
export const supabaseAdmin = createClient(url, svc ?? anon)
