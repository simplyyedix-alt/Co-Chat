-- Repair counters if an older client toggled a reaction more than once while
-- the feed was being refreshed. The unique reaction tables are authoritative.
update public.twitts t
set likes_count = (select count(*) from public.twitt_likes l where l.twitt_id = t.id),
    views_count = (select count(*) from public.twitt_views v where v.twitt_id = t.id),
    comments_count = (select count(*) from public.twitt_comments c where c.twitt_id = t.id);

update public.twitt_comments c
set likes_count = (select count(*) from public.twitt_comment_likes l where l.comment_id = c.id);
