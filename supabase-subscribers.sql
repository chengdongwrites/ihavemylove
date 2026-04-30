-- 在 Supabase SQL Editor 里运行这段代码

create table if not exists subscribers (
  id        uuid primary key default gen_random_uuid(),
  email     text not null unique,
  token     uuid not null default gen_random_uuid(),
  created_at timestamptz default now()
);

-- 只允许 service-role 读写，不允许公开访问
alter table subscribers enable row level security;
