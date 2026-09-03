# Co Chat - Modern Communication Platform

🚀 A privacy-minded communication app, being rebuilt in public with a free-first stack.

## Current status

The client is now a working, browser-only product prototype: create a local profile, browse chats, send messages, explore calls and stories, and try offline assist tools. It deliberately does **not** claim real accounts, encryption, calls, or AI yet—those need a backend and security review.

## Free-first roadmap

1. **Prototype (complete):** React/Vite client with no services or costs.
2. **Real messaging:** add Supabase's free tier for sign-in, database, file storage, and realtime updates.
3. **Deploy:** host the frontend on Cloudflare Pages or Vercel's free tier.
4. **Calls and AI:** add only after messaging works; both have recurring costs at scale, so they need clear limits and privacy design.

## Features

✨ **Core Features**
- Real-time messaging (text, images, videos, files)
- End-to-end encryption for all communications
- Voice and video calls with call history
- Stories/Status with 24-hour expiry
- Google Sign-In authentication
- Unique username and display name customization
- Search for chats, contacts, and messages
- Theme customization (light, dark, colors)
- Profile management with avatar upload
- Push notifications

🤖 **AI Features**
- Chat summarization
- Message translation
- Smart reply suggestions

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/simplyyedix-alt/Co-Chat.git
cd Co-Chat
npm install
cd client
npm run dev
```

Install [Node.js 20 LTS](https://nodejs.org/) first if `npm` is not available on your computer.

## Tech Stack

**Frontend:** React 18, TypeScript, Vite, TailwindCSS, Socket.io
**Backend:** Node.js, Express, Socket.io, MongoDB

## License

MIT License
