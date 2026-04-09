-- ============================================================
-- ihavemylove.life — Supabase schema
-- Run this in your Supabase project's SQL Editor
-- ============================================================

-- Comments table
create table if not exists comments (
  id          bigserial primary key,
  page_slug   text not null,          -- 'home' | chapter slug | 'ba' | 'voices'
  name        text not null,
  email       text not null,
  body        text not null,
  approved    boolean not null default true,
  created_at  timestamptz not null default now()
);

-- Blocked emails (author removes a commenter's email → all their comments hidden)
create table if not exists blocked_emails (
  email       text primary key,
  blocked_at  timestamptz not null default now()
);

-- Page view counters
create table if not exists page_views (
  page_slug   text primary key,
  views       bigint not null default 0
);

-- ── Indexes ──────────────────────────────────────────────────
create index if not exists comments_page_slug_idx on comments(page_slug);
create index if not exists comments_email_idx     on comments(email);

-- ── Row-level security ───────────────────────────────────────
-- Public can read approved comments whose email is not blocked
alter table comments enable row level security;
create policy "read approved comments"
  on comments for select
  using (
    approved = true
    and email not in (select email from blocked_emails)
  );

-- Public can insert comments
create policy "insert comments"
  on comments for insert
  with check (true);

-- Public can read page_views
alter table page_views enable row level security;
create policy "read views"
  on page_views for select using (true);

-- Public can upsert page_views (counter increment via RPC below)
create policy "upsert views"
  on page_views for all using (true);

-- ── RPC: increment view count atomically ────────────────────
create or replace function increment_views(slug text)
returns void language plpgsql as $$
begin
  insert into page_views(page_slug, views) values (slug, 1)
  on conflict (page_slug) do update
    set views = page_views.views + 1;
end;
$$;

-- ── Allow blocked_emails to be read by API (service role only) ──
alter table blocked_emails enable row level security;
create policy "service role only"
  on blocked_emails for all using (true);
