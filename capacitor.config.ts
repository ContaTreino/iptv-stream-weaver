import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.9c15dffe3f594479bd3bddf40cd0623b',
  appName: 'iptv-stream-weaver',
  webDir: 'dist',
  server: {
    url: 'https://9c15dffe-3f59-4479-bd3b-ddf40cd0623b.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  bundledWebRuntime: false
};

export default config;