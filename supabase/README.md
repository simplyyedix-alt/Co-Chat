# Supabase backend

Run the SQL migrations in order from the Supabase SQL Editor. `001_social_feed.sql` creates the bounded social-feed tables and indexes; `002_social_feed_functions.sql` adds atomic counters and the daily trending calculation.

Schedule `refresh_twitt_trending()` once per day with a Supabase scheduled function. Feed reads should query `twitt_trending_daily` instead of recalculating scores for every visitor.

Row-level security is intentionally enabled with no public policies yet. The app currently authenticates with Firebase, so a small server/Edge Function auth bridge must verify the Firebase ID token before allowing writes. Never solve that by exposing the Supabase `service_role` key in the browser or GitHub Pages.
