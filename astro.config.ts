// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import Unfonts from 'unplugin-fonts/astro'
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import compress from "astro-compress";
import { EnumChangefreq } from "sitemap/dist/lib/types";
import sitemap  from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://hostino.nl/",
  integrations: [
    react(), 
    compress(),
    Unfonts({
      custom: {
        families: [{
          name: 'Poppins',
          local: 'Poppins',
          src: '/fonts/*.ttf',
          transform(font) {
            if (font.basename === 'Poppins-SemiBold') {
              font.weight = 600
            } else if (font.basename === 'Poppins-Regular') {
              font.weight = 400
            } else if (font.basename === 'Poppins-Light') {
              font.weight = 300
            } else if (font.basename === 'Poppins-Medium') {
              font.weight = 500
            } else if (font.basename === 'Poppins-Bold') {
              font.weight = 700
            } else if (font.basename === 'Poppins-ExtraBold') {
              font.weight = 800
            } else if (font.basename === 'Poppins-Black') {
              font.weight = 900
            }
            return font
          }
        }],
        display: 'auto',
        preload: true,
        prefetch: false,
        injectTo: 'head-prepend',
      },
    }),
    sitemap({
      serialize(item) {
        const highPriorityPages = [
          '/',
          '/agence-seo-maroc',
          '/nom-de-domaine-ma',
          '/email-professionnel',
          '/google-my-business-maroc',
          '/google-ads-maroc',
          '/creation-site-web-maroc'
        ];

        const lowPriorityPages = [
          '/contact',
          '/mentions-legales',
          '/politique-de-confidentialite',
          '/conditions-generales',
          '/politique-cookies',
          '/abus',
          '/paiments',
        ];

        const dailyPages = ['/'];
        const weeklyPages = [
          '/agence-seo-maroc',
          '/nom-de-domaine-ma',
          '/email-professionnel',
          '/google-my-business-maroc',
          '/google-ads-maroc',
          '/creation-site-web-maroc'
        ];

        const url = new URL(item.url);
        const path = url.pathname;

        if (highPriorityPages.includes(path)) {
          item.priority = 1.0;
        } else if (lowPriorityPages.includes(path)) {
          item.priority = 0.1;
        } else {
          item.priority = 0.8;
        }

        if (dailyPages.includes(path)) {
          item.changefreq = 'daily' as EnumChangefreq;
        } else if (weeklyPages.includes(path)) {
          item.changefreq = 'weekly' as EnumChangefreq;
        } else {
          item.changefreq = 'monthly' as EnumChangefreq;
        }

        return item;
      },
      
      customPages: [
        'https://www.hostino.ma/',
        'https://www.hostino.ma/agence-seo-maroc',
        'https://www.hostino.ma/nom-de-domaine-ma',
        'https://www.hostino.ma/email-professionnel',
        'https://www.hostino.ma/google-my-business-maroc',
        'https://www.hostino.ma/google-ads-maroc',
        'https://www.hostino.ma/creation-site-web-maroc',
        'https://www.hostino.ma/contact',
        'https://www.hostino.ma/mentions-legales',
        'https://www.hostino.ma/politique-de-confidentialite',
        'https://www.hostino.ma/conditions-generales',
        'https://www.hostino.ma/politique-cookies',
        'https://www.hostino.ma/abus',
        'https://www.hostino.ma/paiments',
      ],
    })
  ],

  output: 'server',
  
  adapter: cloudflare({
    imageService: 'cloudflare',
  }),
  
  compressHTML: true,
  
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ["node:buffer"],
    },
    build: {
      cssCodeSplit: true,
      minify: "esbuild",
    },
    esbuild: {
      target: 'es2022',
      minifyIdentifiers: false,
      minifySyntax: true,
      minifyWhitespace: true,
    },
    optimizeDeps: {
      include: ["react", "react-dom"],
    },
  }
});