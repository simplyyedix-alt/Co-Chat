create or replace function public.set_twitt_like(p_twitt_id uuid, p_user_id text, p_liked boolean)
returns boolean language plpgsql security definer set search_path = public as $$
begin
  if p_liked then
    insert into public.twitt_likes (twitt_id, user_id) values (p_twitt_id, p_user_id) on conflict (twitt_id, user_id) do nothing;
  else
    delete from public.twitt_likes where twitt_id = p_twitt_id and user_id = p_user_id;
  end if;
  update public.twitts set likes_count = (select count(*) from public.twitt_likes where twitt_id = p_twitt_id) where id = p_twitt_id;
  return p_liked;
end;
$$;

create or replace function public.set_twitt_comment_like(p_comment_id uuid, p_user_id text, p_liked boolean)
returns boolean language plpgsql security definer set search_path = public as $$
begin
  if p_liked then
    insert into public.twitt_comment_likes (comment_id, user_id) values (p_comment_id, p_user_id) on conflict (comment_id, user_id) do nothing;
  else
    delete from public.twitt_comment_likes where comment_id = p_comment_id and user_id = p_user_id;
  end if;
  update public.twitt_comments set likes_count = (select count(*) from public.twitt_comment_likes where comment_id = p_comment_id) where id = p_comment_id;
  return p_liked;
end;
$$;

revoke all on function public.set_twitt_like(uuid, text, boolean) from public, anon, authenticated;
revoke all on function public.set_twitt_comment_like(uuid, text, boolean) from public, anon, authenticated;
