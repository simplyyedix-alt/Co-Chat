-- Server-side operations for counters and daily trending.
-- Call these from a trusted Edge Function after verifying the Firebase ID token.

create or replace function public.record_twitt_view(p_twitt_id uuid, p_user_id text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.twitt_views (twitt_id, user_id)
  values (p_twitt_id, p_user_id)
  on conflict (twitt_id, user_id) do nothing;
  if not found then return false; end if;
  update public.twitts set views_count = views_count + 1 where id = p_twitt_id;
  return true;
end;
$$;

create or replace function public.toggle_twitt_like(p_twitt_id uuid, p_user_id text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  delete from public.twitt_likes where twitt_id = p_twitt_id and user_id = p_user_id;
  if found then
    update public.twitts set likes_count = greatest(0, likes_count - 1) where id = p_twitt_id;
    return false;
  end if;
  insert into public.twitt_likes (twitt_id, user_id) values (p_twitt_id, p_user_id);
  update public.twitts set likes_count = likes_count + 1 where id = p_twitt_id;
  return true;
end;
$$;

create or replace function public.create_twitt_comment(p_twitt_id uuid, p_user_id text, p_body text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  new_id uuid;
begin
  if char_length(trim(p_body)) not between 1 and 240 then
    raise exception 'Comment must be between 1 and 240 characters';
  end if;
  insert into public.twitt_comments (twitt_id, author_id, body)
  values (p_twitt_id, p_user_id, trim(p_body))
  returning id into new_id;
  update public.twitts set comments_count = comments_count + 1 where id = p_twitt_id;
  return new_id;
end;
$$;

create or replace function public.refresh_twitt_trending(p_ranking_date date default current_date)
returns void
language sql
security definer
set search_path = public
as $$
  delete from public.twitt_trending_daily where ranking_date = p_ranking_date;
  insert into public.twitt_trending_daily (ranking_date, twitt_id, rank, score)
  select p_ranking_date, id,
    row_number() over (order by (likes_count * 3 + comments_count * 5 + views_count * 0.1) desc, created_at desc)::integer,
    (likes_count * 3 + comments_count * 5 + views_count * 0.1)
  from public.twitts
  where created_at >= p_ranking_date - interval '7 days'
    and created_at < p_ranking_date + interval '1 day'
  order by score desc, created_at desc
  limit 10;
$$;

revoke all on function public.record_twitt_view(uuid, text) from public;
revoke all on function public.toggle_twitt_like(uuid, text) from public;
revoke all on function public.create_twitt_comment(uuid, text, text) from public;
revoke all on function public.refresh_twitt_trending(date) from public;
