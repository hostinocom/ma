// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import compress from 'astro-compress';


import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
      ssr: {
        external: ['node:path'],
    },
  },
  integrations: [react() , compress()],
  adapter: cloudflare({
     imageService: 'cloudflare'
  }),
  devToolbar: { enabled: false },


});