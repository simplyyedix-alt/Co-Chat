import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.cochat.app',
  appName: 'Co-Chat',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ['sound', 'alert'],
    },
    LocalNotifications: {
      smallIcon: 'ic_stat_cochat',
      iconColor: '#6D5DFB',
    },
    FirebaseAuthentication: {
      skipNativeAuth: true,
      providers: ['google.com'],
    },
  },
}

export default config
