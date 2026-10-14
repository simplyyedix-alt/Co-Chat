# Co‑Chat premium product and UI build brief

## 1. Product identity

Co‑Chat is a dark, study-first social messenger. It combines private messaging, study focus tools, friend/community discovery, lightweight social posts, voice/video features, and privacy controls in one calm workspace.

Design direction: premium dark glass surfaces, restrained violet/indigo accent light, readable typography, compact information density, subtle motion, and clear hierarchy. It should feel more intentional than a generic social feed: conversations and learning are the primary actions.

Do not invent user data. Show a real value when it exists; otherwise show a compact empty state such as “No study sessions yet” or “No bio added yet.”

## 2. Existing product areas

### Chats

- People search and friend discovery.
- Online-friends section.
- Recent conversations, ordered by latest activity.
- One-to-one conversations and group conversations.
- Message bubbles with timestamps, replies, attachments, images/video, Sneak messages, delete/expiry behavior, unread counters, and conversation actions.
- Immediate local insertion of a sent message and immediate conversation-list promotion.
- Profile opened from the conversation header/avatar.
- Voice call and camera actions where supported.
- Block/unblock behavior, including removing the blocked person from discovery and conversation navigation.

### Study

- Focus timer with presets and custom hours/minutes.
- Timer start, pause, completion, daily tasks, personal tasks, and saved study totals.
- Study presence while a timer is active.
- Streak, total study time, weekly league, journey/progression sheet, and friends/public leaderboard.
- Discover action for study tasks that require helping another student.

### Communities

- Community/group discovery and membership surfaces.
- Group conversations and group voice call support where available.

### Discover

- Social feed/twitts with tabs, likes, comments, media preview, and load-more behavior.
- Discovery cards should remain secondary to chats and study.

### Settings

- Profile editing: display name, username, avatar, bio and preferences.
- Appearance/dark theme.
- Notifications preference.
- Discoverability preference.
- Active-status preference.
- Blocklist with animated reveal and one-row unblock actions.
- Sign out.

### Account/authentication

- Existing account sign-in and onboarding for new accounts.
- Existing users must never be forced through new-user setup again.
- Preserve the current authenticated session on web and Android WebView.

## 3. Premium profile dashboard to build

Use the attached “Neon Co‑Chat Profile Dashboard” as visual inspiration, but adapt it to Co‑Chat’s real data and mobile layout.

### Desktop layout

Use a centered modal/drawer, max width about 980–1100px and max height `calc(100dvh - 48px)`. The page behind it is dimmed and blurred; the body cannot scroll while it is open. The profile itself is the only scrollable region.

Left rail (220–250px):

- Mini avatar, display name, handle, presence dot.
- Profile (default selected).
- Achievements.
- Activity.
- Settings.
- A small “Good vibes only” brand note at the bottom.

Main panel:

- Optional cover/banner area. Use a gradient placeholder when no banner exists; never fabricate a photo.
- Avatar overlapping the cover edge, display name, handle, verified badge when the real profile is verified, and online/offline status.
- Overflow menu for safe actions such as copy profile link and report.
- Three stat cards: study logged, day streak, membership/status. Use real values and compact “—”/“New member” fallbacks.
- About Me card with bio and edit icon only for the current user.
- Achievements card with real badges and “View all.”
- Friends on Co‑Chat row with count and drill-in action.
- Study identity row only when the account actually has that field (for example, “PW student”); do not infer it from a name.
- Primary action row: Message, Share, Unfriend, Block. Hide or disable actions that do not apply to the viewer.
- Recent Conversations row opens the current user’s conversation list, not a fake profile statistic.

### Mobile layout

- Replace the left rail with a compact horizontal tab strip or a menu button.
- Profile sheet is centered with safe-area padding and never clipped by `.app`, topbar, online users, or recent conversations.
- `body` scroll is locked while open; the sheet scrolls internally if needed.
- Close by X, backdrop tap, Escape, Android back, or swipe down where supported.
- Keep the action row visible at the bottom of the sheet using safe-area padding.

### Visual system

- Background: near-black navy, not pure black.
- Surfaces: layered dark cards with 1px low-contrast borders.
- Accent: violet/indigo gradient used for active states and primary actions.
- Danger: muted rose/red only for block/unfriend/destructive actions.
- Radius: 16–24px for cards, 12–16px for controls, full pill for status/badges.
- Typography: strong display name, small uppercase eyebrow labels, readable 14–16px body text.
- Motion: 180–260ms fade/translate, staggered card reveal, reduced-motion fallback.
- Accessibility: visible focus ring, keyboard close, labelled icon buttons, minimum 44px touch target, sufficient contrast.

## 4. Complete action contract

Every visible button must do one of the following: perform a real action, open a clearly labelled panel, or be disabled with an explanation. No dead buttons.

| Control | Required behavior |
|---|---|
| Profile/avatar | Open the profile dashboard for that user. |
| Close/X/backdrop | Close modal and restore page scrolling/focus. |
| Profile tab | Show profile overview. |
| Achievements | Show earned badges and locked milestones. |
| Activity | Show study totals, recent sessions, posts, and presence history available to the viewer. |
| Settings | Open the settings page or profile-edit panel. |
| Edit bio/pencil | Save bio with validation and optimistic UI; rollback on error. |
| View all achievements | Open a scrollable achievement sheet. |
| Friends count | Open mutual/friend list, respecting blocked users. |
| Message | Open existing conversation or create the friend conversation once; promote it in Recent Conversations immediately after the first message. |
| Share | Copy a deep link and show a confirmation toast. |
| Unfriend | Confirm, remove friendship, keep message history according to product policy, and refresh both lists. |
| Block | Confirm, persist a block record, remove the conversation from navigation, hide the user from search/online/friend results, and refresh blocklist. |
| Unblock | Remove the block record and refresh the list; do not silently recreate friendship. |
| Recent Conversations | Open the conversation navigation/list. |
| Copy handle/link | Copy to clipboard and confirm. |
| Report | Open a report form with reason and submit state. |
| Notifications bell | Open unread notification drawer, mark read, and deep-link to the source item. |
| Camera | Open camera studio with permission/error states. |
| Voice call | Start call, show connecting/failed/ended states. |
| Search | Search users, friends, conversations, and communities with debounced loading/empty/error states. |
| Timer | Open timer sheet, start/pause/complete, persist state, and update study totals. |
| Leaderboard | Switch Friends/Public, refresh, show loading/empty/error states. |

## 5. Data rules

- Profile fields: `uid`, `display_name`, `username`, `photo_url`, `bio`, `verified`, `presence`, `study_level`, `study_seconds`, `streak_days`, `created_at`.
- A direct conversation is visible when the signed-in user has a `conversation_members` record and the conversation is not hidden/deleted for that user.
- A message insert must update the conversation preview/last-message fields and both member rows so navigation updates for sender and receiver.
- A block is directional (`blocker_id`, `blocked_id`) and must be enforced in search, online list, friends, conversation list, message send, and profile actions.
- Notification delivery has two layers: in-app realtime while open and FCM/push delivery while background/closed. Permission denied must be surfaced to the user.
- RLS/service-role errors must be shown as actionable errors, never swallowed as an empty list.

## 6. Loading, empty, and error states

Every page and sheet needs:

- Skeleton while loading.
- Compact empty state with one useful next action.
- Inline error with retry.
- Disabled button while mutation is pending.
- Optimistic update only where rollback is implemented.

Examples: “No conversations yet — message a friend to start one,” “No blocked people,” “No saved study sessions yet,” and “Couldn’t load profile — Retry.”

## 7. Acceptance checklist

- Profile opens centered at every viewport size and never appears behind online/recent sections.
- Background is blurred and cannot scroll while a profile or sheet is open.
- Sheet content can scroll internally on short screens.
- Avatar, name, handle, bio, verification, presence, study values, and achievements come from real data.
- Message creates/promotes a conversation for both users.
- Block removes the user from search, online, friends, and conversation navigation; unblock restores discoverability.
- Every button in the dashboard has a working action, loading state, error state, and accessible label.
- Web build, Android sync, unit tests, and a manual desktop/mobile pass all succeed.

## 8. Implementation order

1. Stabilize profile data and action contracts.
2. Implement the centered profile dashboard shell and scroll lock.
3. Wire profile actions and blocklist behavior.
4. Add achievements/activity/friends drill-ins using existing data.
5. Add desktop rail and responsive mobile tabs.
6. Add skeletons, errors, focus management, and reduced-motion support.
7. Run build/tests, then produce the Android build and deploy the web `dist` output.

