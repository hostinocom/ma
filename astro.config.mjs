// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import compress from 'astro-compress';


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
  integrations: [react(), compress(), sitemap()],
  adapter: cloudflare({
     imageService: 'cloudflare'
  }),
});