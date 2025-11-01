// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';


import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://ma-6zt.pages.dev/',
  vite: {
    plugins: [tailwindcss()],
      ssr: {
        external: ['node:path'],
    },
  },
  integrations: [react(), sitemap({
    filter: (page) => page !== 'https://ma-6zt.pages.dev/secret-vip-lounge/',

  })],
  adapter: cloudflare({
     imageService: 'cloudflare'
  }),
});