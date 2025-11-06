// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
// import cloudflare from "@astrojs/cloudflare";

import tailwindcss from "@tailwindcss/vite";
import compress from "astro-compress";
import { EnumChangefreq } from "sitemap/dist/lib/types";
import sitemap  from "@astrojs/sitemap";



// https://astro.build/config
export default defineConfig({
  site: "https://ma-6zt.pages.dev/",
  integrations: [react(), compress() ,

    sitemap({
      // هنا كتحدد priority لكل صفحة
      serialize(item) {
        // الصفحات المهمة - Priority عالي
        const highPriorityPages = [
          '/',
          '/agence-seo-maroc',
          '/nom-de-domaine-ma',
          '/email-professionnel',
          '/google-my-business-maroc',
          '/google-ads-maroc',
          '/creation-site-web-maroc'
        ];

        // الصفحات القانونية - Priority منخفض
        const lowPriorityPages = [
          '/contact',
          '/mentions-legales',
          '/politique-de-confidentialite',
          '/conditions-generales',
          '/politique-cookies',
          '/abus',
          '/paiments',
        ];

        // حدد changefreq
        const dailyPages = ['/'];
        const weeklyPages = [
          '/agence-seo-maroc',
          '/nom-de-domaine-ma',
          '/email-professionnel',
          '/google-my-business-maroc',
          '/google-ads-maroc',
          '/creation-site-web-maroc'
        ];

        // استخرج الـ path من الـ URL
        const url = new URL(item.url);
        const path = url.pathname;

        // حدد Priority
        if (highPriorityPages.includes(path)) {
          item.priority = 1.0;
        } else if (lowPriorityPages.includes(path)) {
          item.priority = 0.1;
        } else {
          item.priority = 0.8; // default
        }

        // حدد changefreq
        if (dailyPages.includes(path)) {
          item.changefreq = 'daily' as EnumChangefreq;
        } else if (weeklyPages.includes(path)) {
          item.changefreq = 'weekly' as EnumChangefreq;
        } else {
          item.changefreq = 'monthly' as EnumChangefreq;
        }

        return item;
      },
      
      // زيد الصفحات يدوياً (مهم لـ SSR)
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
    // adapter: cloudflare({ 
    //   imageService: "cloudflare"
    // }),
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
