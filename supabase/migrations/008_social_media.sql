-- Optional photo/PDF attachments for public Twitts and comments.
-- The media API enforces the 5 MB and file-type limits before metadata is stored.

alter table public.twitts add column if not exists attachment jsonb;
alter table public.twitt_comments add column if not exists attachment jsonb;

