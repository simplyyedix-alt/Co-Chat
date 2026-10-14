-- Temporary platform-wide Twitt restrictions. A restriction lasts 72 hours,
-- removes the author's existing Twitts, and is enforced on future inserts.
create table if not exists public.twitt_moderator_restrictions (
  user_id text primary key,
  moderator_id text not null,
  restricted_until timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists twitt_moderator_restrictions_until_idx
  on public.twitt_moderator_restrictions (restricted_until);

alter table public.twitt_moderator_restrictions enable row level security;

create or replace function public.is_twitt_user_restricted(p_user_id text)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1
    from public.twitt_moderator_restrictions
    where user_id = p_user_id
      and restricted_until > now()
  );
$$;

create or replace function public.moderator_restrict_twitt_user(
  p_target_user_id text,
  p_moderator_id text,
  p_duration_hours integer default 72
)
returns jsonb language plpgsql security definer set search_path = public as $$
declare
  deleted_count integer := 0;
  until_at timestamptz := now() + make_interval(hours => greatest(1, least(coalesce(p_duration_hours, 72), 72)));
begin
  if p_moderator_id <> 'uOP77Ck5blVeo8e9zquV5s2dFwQ2' then
    raise exception 'Only the moderator can restrict Twitt access';
  end if;
  if coalesce(trim(p_target_user_id), '') = '' or p_target_user_id = p_moderator_id then
    raise exception 'A different user is required';
  end if;
  if not exists (select 1 from public.profiles where uid = p_target_user_id) then
    raise exception 'User profile not found';
  end if;

  insert into public.twitt_moderator_restrictions (user_id, moderator_id, restricted_until)
  values (p_target_user_id, p_moderator_id, until_at)
  on conflict (user_id) do update
    set moderator_id = excluded.moderator_id,
        restricted_until = greatest(public.twitt_moderator_restrictions.restricted_until, excluded.restricted_until);

  delete from public.twitts where author_id = p_target_user_id;
  get diagnostics deleted_count = row_count;
  return jsonb_build_object('restricted_until', until_at, 'deleted_count', deleted_count);
end;
$$;

create or replace function public.reject_restricted_twitt()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if public.is_twitt_user_restricted(new.author_id) then
    raise exception 'Twitt posting is temporarily restricted for this account';
  end if;
  return new;
end;
$$;

drop trigger if exists twitts_reject_restricted_author on public.twitts;
create trigger twitts_reject_restricted_author
  before insert on public.twitts
  for each row execute function public.reject_restricted_twitt();

revoke all on function public.is_twitt_user_restricted(text) from public, anon, authenticated;
revoke all on function public.moderator_restrict_twitt_user(text, text, integer) from public, anon, authenticated;
