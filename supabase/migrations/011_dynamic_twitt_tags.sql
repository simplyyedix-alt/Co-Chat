-- Replace the original fixed JEE/NEET/study/public categories with user-created tags.
alter table public.twitts drop constraint if exists twitts_community_check;

alter table public.twitts
  add constraint twitts_community_check
  check (community ~ '^[a-z0-9][a-z0-9-]{1,31}$');

create index if not exists twitts_tag_recent_idx
  on public.twitts (community, created_at desc);
