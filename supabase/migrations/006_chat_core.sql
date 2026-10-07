-- Firestore replacement foundation.
-- Firebase Auth remains the identity provider for now, so all user IDs stay text.

create table if not exists public.profiles (
  uid text primary key,
  display_name text not null default 'Co-Chat member',
  email text not null default '',
  username text not null,
  photo_url text not null default '',
  bio text not null default '',
  notifications_enabled boolean not null default true,
  discoverable boolean not null default true,
  active_status boolean not null default true,
  last_seen timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists profiles_username_lower_idx on public.profiles (lower(username));

create table if not exists public.blocks (
  blocker_id text not null,
  blocked_id text not null,
  created_at timestamptz not null default now(),
  primary key (blocker_id, blocked_id),
  check (blocker_id <> blocked_id)
);

create table if not exists public.friendships (
  member_a text not null,
  member_b text not null,
  status text not null default 'accepted' check (status = 'accepted'),
  created_at timestamptz not null default now(),
  primary key (member_a, member_b),
  check (member_a < member_b)
);

create table if not exists public.friend_requests (
  from_uid text not null,
  to_uid text not null,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'declined')),
  created_at timestamptz not null default now(),
  responded_at timestamptz,
  primary key (from_uid, to_uid),
  check (from_uid <> to_uid)
);

create index if not exists friend_requests_to_status_idx on public.friend_requests (to_uid, status, created_at desc);
create index if not exists friend_requests_from_status_idx on public.friend_requests (from_uid, status, created_at desc);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  type text not null default 'direct' check (type in ('direct', 'group')),
  name text not null default '',
  admin_id text,
  created_by text not null,
  last_message text not null default '',
  last_sender_id text,
  last_message_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.conversation_members (
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  uid text not null,
  hidden_at timestamptz,
  unread_count integer not null default 0 check (unread_count >= 0),
  read_at timestamptz,
  joined_at timestamptz not null default now(),
  primary key (conversation_id, uid)
);

create index if not exists conversation_members_uid_idx on public.conversation_members (uid, joined_at desc);
create index if not exists conversations_recent_idx on public.conversations (last_message_at desc nulls last);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id text not null,
  text text not null default '' check (char_length(text) <= 2000),
  attachment jsonb,
  reply_to jsonb,
  seen_by text[] not null default '{}',
  hidden_for text[] not null default '{}',
  created_at timestamptz not null default now()
);

create index if not exists messages_conversation_recent_idx on public.messages (conversation_id, created_at desc);

create table if not exists public.stories (
  id uuid primary key default gen_random_uuid(),
  uid text not null,
  display_name text not null default 'Co-Chat member',
  text text not null check (char_length(text) between 1 and 500),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null
);

create index if not exists stories_active_idx on public.stories (expires_at desc);

create table if not exists public.calls (
  id text primary key,
  type text not null check (type in ('audio', 'video')),
  status text not null default 'ringing',
  member_ids text[] not null,
  caller_id text,
  callee_id text,
  group_id uuid references public.conversations(id) on delete set null,
  group_name text,
  joined_ids text[] not null default '{}',
  left_ids text[] not null default '{}',
  signal jsonb not null default '{}',
  created_at timestamptz not null default now(),
  ended_at timestamptz
);

create index if not exists calls_members_idx on public.calls using gin (member_ids);
create index if not exists calls_created_idx on public.calls (created_at desc);

-- These tables are intentionally not exposed directly through the browser yet.
-- The Firebase-token-verified Edge API will enforce membership and ownership.
alter table public.profiles enable row level security;
alter table public.blocks enable row level security;
alter table public.friendships enable row level security;
alter table public.friend_requests enable row level security;
alter table public.conversations enable row level security;
alter table public.conversation_members enable row level security;
alter table public.messages enable row level security;
alter table public.stories enable row level security;
alter table public.calls enable row level security;

do $$
begin
  alter publication supabase_realtime add table public.conversations, public.conversation_members, public.messages, public.friend_requests, public.stories, public.calls;
exception when duplicate_object then null;
end $$;
