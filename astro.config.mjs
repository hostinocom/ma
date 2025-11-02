// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";

import tailwindcss from "@tailwindcss/vite";
import compress from "astro-compress";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://ma-6zt.pages.dev/",
  output: "server",
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ["node:path"],
    },
    build: {
      cssCodeSplit: true,
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true, // Remove console.logs in production
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          entryFileNames: "_astro/[name].[hash].js",
          chunkFileNames: "_astro/[name].[hash].js",
          assetFileNames: "_astro/[name].[hash][extname]",
        },
      },
    },
    optimizeDeps: {
      include: ["react", "react-dom"],
    },
  },

  integrations: [react(), compress(), sitemap({})],
  adapter: cloudflare({
    imageService: "cloudflare",
  }),
  compressHTML: true,
});
