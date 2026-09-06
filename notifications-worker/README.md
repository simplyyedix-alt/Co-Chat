# Co-Chat notification worker

This Cloudflare Worker sends FCM HTTP v1 notifications without enabling Firebase Blaze.

Deploy from this directory with Wrangler, then add these Cloudflare secrets:

```text
FIREBASE_PROJECT_ID=co-chatt
FIREBASE_WEB_API_KEY=<Firebase web API key>
FIREBASE_CLIENT_EMAIL=<Firebase service-account email>
FIREBASE_PRIVATE_KEY=<Firebase service-account private key, including BEGIN/END lines>
```

Set `VITE_PUSH_WORKER_URL` to the deployed Worker URL when building the Android app. Never put the service-account JSON or private key in the client or GitHub.
