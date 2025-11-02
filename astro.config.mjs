// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';


import tailwindcss from '@tailwindcss/vite';
import compress from "astro-compress"
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://ma-6zt.pages.dev/',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
      ssr: {
        external: ['node:path'],
    },
    build :{
      cssCodeSplit: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // Remove console.logs in production
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Split vendor chunks for better caching
            if (id.includes('node_modules')) {
              if (id.includes('react')) {
                return 'react-vendor';
              }
              return 'vendor';
            }
          },
        },
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom'],
    },
  },
  
  integrations: [react(), compress(), sitemap({})],
  adapter: cloudflare({
     imageService: 'cloudflare',
  }),
  compressHTML: true,
});