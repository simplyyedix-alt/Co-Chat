# Supabase backend

Run the SQL in `migrations/001_social_feed.sql` once from the Supabase SQL Editor. It creates the bounded social-feed tables and indexes for Twitts, comments, likes, unique views, and daily trending results.

Row-level security is intentionally enabled with no public policies yet. The app currently authenticates with Firebase, so a small server/Edge Function auth bridge must verify the Firebase ID token before allowing writes. Never solve that by exposing the Supabase `service_role` key in the browser or GitHub Pages.
