-- Co-Chat moderator account: can remove Twitts while authors retain normal control.
create or replace function public.delete_twitt(p_twitt_id uuid, p_user_id text)
returns boolean language plpgsql security definer set search_path = public as $$
begin
  delete from public.twitts
  where id = p_twitt_id
    and (author_id = p_user_id or p_user_id = 'uOP77Ck5blVeo8e9zquV5s2dFwQ2');
  if not found then raise exception 'Only the author or a moderator can delete this Twitt'; end if;
  return true;
end;
$$;
