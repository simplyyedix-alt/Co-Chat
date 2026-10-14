-- Allow members to publish Twitts without exposing their profile identity.
alter table if exists public.profiles
  add column if not exists hide_twitt_identity boolean not null default false;

