import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'de.webdave.nashville',
  appName: 'nashville',
  webDir: 'dist/nashville/browser',
  server: {
    androidScheme: 'https',
  },
};

export default config;
