-- Keep streak history on the account instead of only in browser storage.
alter table public.profiles
  add column if not exists study_days text[] not null default '{}';
