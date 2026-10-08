-- Shared study totals and live Study Zone presence.
alter table public.profiles
  add column if not exists total_study_seconds bigint not null default 0,
  add column if not exists weekly_study_seconds bigint not null default 0,
  add column if not exists study_week_key text not null default '',
  add column if not exists study_active_until timestamptz,
  add column if not exists study_label text not null default '',
  add column if not exists study_days text[] not null default '{}';
