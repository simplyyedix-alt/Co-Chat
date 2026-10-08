-- Discovery v2: durable study/social modes, 24-hour social expiry, and safe cleanup.
alter table public.twitts
  add column if not exists feed_type text not null default 'study';

alter table public.twitts
  drop constraint if exists twitts_feed_type_check;

alter table public.twitts
  add constraint twitts_feed_type_check check (feed_type in ('study', 'social'));

alter table public.twitts
  add column if not exists expires_at timestamptz;

create index if not exists twitts_feed_type_created_at_idx
  on public.twitts (feed_type, created_at desc);

create index if not exists twitts_social_expiry_idx
  on public.twitts (expires_at)
  where feed_type = 'social';

create or replace function public.purge_expired_social_twitts()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  removed integer;
begin
  delete from public.twitts
  where feed_type = 'social'
    and expires_at is not null
    and expires_at <= now();
  get diagnostics removed = row_count;
  return removed;
end;
$$;

revoke all on function public.purge_expired_social_twitts() from public;
grant execute on function public.purge_expired_social_twitts() to service_role;
