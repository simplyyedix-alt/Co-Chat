import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.cochat.app',
  appName: 'Co-Chat',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
}

export default config
