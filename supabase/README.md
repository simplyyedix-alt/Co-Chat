# Supabase backend

Run the SQL migrations in order from the Supabase SQL Editor. `001_social_feed.sql` creates the bounded social-feed tables and indexes; `002_social_feed_functions.sql` adds atomic counters and the daily trending calculation; `003_harden_social_functions.sql` removes direct browser execution grants from those privileged functions.

Schedule `refresh_twitt_trending()` once per day with a Supabase scheduled function. Feed reads should query `twitt_trending_daily` instead of recalculating scores for every visitor.

Row-level security is intentionally enabled with no public policies yet. The app currently authenticates with Firebase, so a small server/Edge Function auth bridge must verify the Firebase ID token before allowing writes. Never solve that by exposing the Supabase `service_role` key in the browser or GitHub Pages.

The identity bridge is in `functions/auth-bridge/index.ts`. Deploy it as a Supabase Edge Function and add the function secret `FIREBASE_WEB_API_KEY` (the Firebase web API key) plus `APP_ORIGIN` set to the deployed website origin. The browser calls the bridge with the Firebase ID token; only the verified Firebase UID is returned.
