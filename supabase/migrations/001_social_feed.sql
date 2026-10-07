-- Co-Chat social feed foundation.
-- Firebase user IDs are stored as text until the auth bridge is moved to Supabase Auth.

create extension if not exists pgcrypto;

create table if not exists public.twitts (
  id uuid primary key default gen_random_uuid(),
  author_id text not null,
  community text not null check (community in ('jee', 'neet', 'study', 'public')),
  body text not null check (char_length(body) between 1 and 280),
  likes_count integer not null default 0 check (likes_count >= 0),
  comments_count integer not null default 0 check (comments_count >= 0),
  views_count integer not null default 0 check (views_count >= 0),
  created_at timestamptz not null default now()
);

create index if not exists twitts_recent_idx on public.twitts (created_at desc);
create index if not exists twitts_community_recent_idx on public.twitts (community, created_at desc);

create table if not exists public.twitt_likes (
  twitt_id uuid not null references public.twitts(id) on delete cascade,
  user_id text not null,
  created_at timestamptz not null default now(),
  primary key (twitt_id, user_id)
);

create table if not exists public.twitt_views (
  twitt_id uuid not null references public.twitts(id) on delete cascade,
  user_id text not null,
  created_at timestamptz not null default now(),
  primary key (twitt_id, user_id)
);

create table if not exists public.twitt_comments (
  id uuid primary key default gen_random_uuid(),
  twitt_id uuid not null references public.twitts(id) on delete cascade,
  author_id text not null,
  body text not null check (char_length(body) between 1 and 240),
  created_at timestamptz not null default now()
);

create index if not exists twitt_comments_page_idx on public.twitt_comments (twitt_id, created_at desc);

-- Trending is recalculated by a scheduled backend job, not on every feed request.
create table if not exists public.twitt_trending_daily (
  ranking_date date not null,
  twitt_id uuid not null references public.twitts(id) on delete cascade,
  rank integer not null check (rank between 1 and 10),
  score numeric not null default 0,
  primary key (ranking_date, twitt_id),
  unique (ranking_date, rank)
);

create index if not exists twitt_trending_lookup_idx on public.twitt_trending_daily (ranking_date, rank);

-- RLS stays enabled until the Firebase-to-Supabase auth bridge is added.
-- Do not expose these tables through the anon key without policies tied to a verified identity.
alter table public.twitts enable row level security;
alter table public.twitt_likes enable row level security;
alter table public.twitt_views enable row level security;
alter table public.twitt_comments enable row level security;
alter table public.twitt_trending_daily enable row level security;
