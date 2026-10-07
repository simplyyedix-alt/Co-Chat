-- Keep SECURITY DEFINER feed functions callable only by the trusted server path.
-- The browser must not execute these functions directly with anon/authenticated roles.

revoke execute on function public.record_twitt_view(uuid, text) from public, anon, authenticated;
revoke execute on function public.toggle_twitt_like(uuid, text) from public, anon, authenticated;
revoke execute on function public.create_twitt_comment(uuid, text, text) from public, anon, authenticated;
revoke execute on function public.refresh_twitt_trending(date) from public, anon, authenticated;
