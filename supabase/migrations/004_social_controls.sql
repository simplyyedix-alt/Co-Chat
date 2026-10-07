-- Per-user feed controls and author-only deletion for the secure social API.

alter table public.twitt_comments add column if not exists likes_count integer not null default 0 check (likes_count >= 0);

create table if not exists public.twitt_comment_likes (
  comment_id uuid not null references public.twitt_comments(id) on delete cascade,
  user_id text not null,
  created_at timestamptz not null default now(),
  primary key (comment_id, user_id)
);

create table if not exists public.twitt_hidden (
  twitt_id uuid not null references public.twitts(id) on delete cascade,
  user_id text not null,
  created_at timestamptz not null default now(),
  primary key (twitt_id, user_id)
);

create index if not exists twitt_hidden_user_idx on public.twitt_hidden (user_id, created_at desc);
alter table public.twitt_comment_likes enable row level security;
alter table public.twitt_hidden enable row level security;

create or replace function public.delete_twitt(p_twitt_id uuid, p_user_id text)
returns boolean language plpgsql security definer set search_path = public as $$
begin
  delete from public.twitts where id = p_twitt_id and author_id = p_user_id;
  if not found then raise exception 'Only the author can delete this Twitt'; end if;
  return true;
end;
$$;

create or replace function public.hide_twitt(p_twitt_id uuid, p_user_id text)
returns boolean language plpgsql security definer set search_path = public as $$
begin
  insert into public.twitt_hidden (twitt_id, user_id) values (p_twitt_id, p_user_id)
  on conflict (twitt_id, user_id) do nothing;
  return true;
end;
$$;

create or replace function public.toggle_twitt_comment_like(p_comment_id uuid, p_user_id text)
returns boolean language plpgsql security definer set search_path = public as $$
begin
  delete from public.twitt_comment_likes where comment_id = p_comment_id and user_id = p_user_id;
  if found then
    update public.twitt_comments set likes_count = greatest(0, likes_count - 1) where id = p_comment_id;
    return false;
  end if;
  insert into public.twitt_comment_likes (comment_id, user_id) values (p_comment_id, p_user_id);
  update public.twitt_comments set likes_count = likes_count + 1 where id = p_comment_id;
  if not found then raise exception 'Comment no longer exists'; end if;
  return true;
end;
$$;

create or replace function public.delete_twitt_comment(p_comment_id uuid, p_user_id text)
returns boolean language plpgsql security definer set search_path = public as $$
declare parent_twitt_id uuid;
begin
  delete from public.twitt_comments where id = p_comment_id and author_id = p_user_id returning twitt_id into parent_twitt_id;
  if not found then raise exception 'Only the author can delete this comment'; end if;
  update public.twitts set comments_count = greatest(0, comments_count - 1) where id = parent_twitt_id;
  return true;
end;
$$;

revoke all on function public.delete_twitt(uuid, text) from public, anon, authenticated;
revoke all on function public.hide_twitt(uuid, text) from public, anon, authenticated;
revoke all on function public.toggle_twitt_comment_like(uuid, text) from public, anon, authenticated;
revoke all on function public.delete_twitt_comment(uuid, text) from public, anon, authenticated;
