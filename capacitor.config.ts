import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.nashville',
  appName: 'nashville',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
