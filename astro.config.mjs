// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";
import purgecss from 'astro-purgecss';



import tailwindcss from "@tailwindcss/vite";
import compress from "astro-compress";
import sitemap from "@astrojs/sitemap";



// https://astro.build/config
export default defineConfig({
  site: "https://ma-6zt.pages.dev/",
  integrations: [react(), compress(), sitemap() , purgecss()],
  adapter: cloudflare({ 
    imageService: "cloudflare"
  }),
  compressHTML: true,
  output: "server",
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ["node:path"],
    },
    build: {
      cssCodeSplit: true,
      minify: "esbuild",
      terserOptions: {
        compress: {
          drop_console: true, // Remove console.logs in production
          drop_debugger: true,
        },
      },
      
        } ,

        esbuild: {
          target: 'es2022',
          // Fast minification settings
          minifyIdentifiers: false, // Skip for speed
          minifySyntax: true,
          minifyWhitespace: true,
        },
        optimizeDeps: {
          include: ["react", "react-dom"],
        },
      }
      
     
});
