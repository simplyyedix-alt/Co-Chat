# Co Chat - Modern Communication Platform

🚀 A privacy-minded communication app, being rebuilt in public with a free-first stack.

## Current status

The client is a Firebase-backed messaging prototype with email/password and Google authentication, persistent user profiles, membership-aware conversations, realtime Firestore messages, story publishing with 24-hour expiry, and a branded preview mode. Calls, media attachments, notifications, and native packaging are the next delivery tracks. AI features are intentionally out of scope.

## Free-first roadmap

1. **Prototype (complete):** React/Vite client with no services or costs.
2. **Messaging hardening:** finish contact discovery, conversation management, media attachments, and moderation rules.
3. **Deploy:** publish the frontend through the included GitHub Pages workflow.
4. **Calls and native app:** connect a WebRTC/media service, then package the web client as an Android APK.

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

AI features are intentionally not part of the current product scope.

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

### Firebase setup

Copy `client/.env.example` to `client/.env` and fill in the Firebase web-app values. Enable Email/Password and Google providers in Firebase Authentication, create Firestore and Storage, and deploy both rules files (`firebase deploy --only firestore:rules,storage`). GitHub Pages uses the matching `VITE_FIREBASE_*` repository secrets during its build.

### Android APK

The Capacitor Android project lives in `client/android`. Install Android Studio (including an Android SDK and JDK 17), then run `npm run android:build` from `client`. The signed release APK can be generated from Android Studio's **Build → Generate Signed Bundle / APK** and then copied to `website/downloads/` for a public download link.

## Tech Stack

**Frontend:** React 18, TypeScript, Vite, CSS
**Backend:** Firebase Authentication and Cloud Firestore

## License

MIT License
