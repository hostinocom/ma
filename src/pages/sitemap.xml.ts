// src/pages/sitemap.xml.ts
import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';

interface RouteInfo {
  route: string;
  filePath: string;
}

function getAstroRoutes(dir: string, baseDir: string = dir): RouteInfo[] {
  const routes: RouteInfo[] = [];
  const excludeDirs = ['api', 'components', 'layouts', 'lib', 'utils'];

  try {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      if (excludeDirs.includes(file)) continue;

      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        routes.push(...getAstroRoutes(filePath, baseDir));
      } else if (
        file.endsWith('.astro') ||
        file.endsWith('.md') ||
        file.endsWith('.mdx')
      ) {
        const relativePath = path.relative(baseDir, filePath);
        let route = '/' + relativePath
          .replace(/\\/g, '/')
          .replace(/\.(astro|md|mdx)$/, '')
          .replace(/\/index$/, '')
          .replace(/\[\.\.\..*?\]/g, '')
          .replace(/\[.*?\]/g, ':dynamic');

        if (!route.includes(':dynamic') && !file.startsWith('_')) {
          routes.push({
            route: route === '' ? '/' : route,
            filePath: filePath,
          });
        }
      }
    }
  } catch (error) {
    console.error('Error reading directory:', error);
  }

  return routes;
}

function getFileModifiedDate(filePath: string): Date {
  try {
    const stats = fs.statSync(filePath);
    return stats.mtime;
  } catch (error) {
    return new Date();
  }
}

function getPagePriority(route: string): number {
  const highPriorityRoutes = [
    '/',
    '/agence-seo-maroc',
    '/nom-de-domaine-ma',
    '/email-professionnel',
    '/google-my-business-maroc',
    '/google-ads-maroc',
    '/creation-site-web-maroc'
  ];

  const lowPriorityRoutes = [
    '/contact',
    '/mentions-legales',
    '/politique-de-confidentialite',
    '/conditions-generales',
    '/politique-cookies',
    '/abus',
    '/paiments',
  ];

  if (highPriorityRoutes.includes(route)) {
    return 1.0;
  } else if (lowPriorityRoutes.includes(route)) {
    return 0.1;
  } else {
    return 0.9;
  }
}

function getChangeFrequency(route: string): string {
  const dailyRoutes = ['/'];
  const weeklyRoutes = [
    '/agence-seo-maroc',
    '/nom-de-domaine-ma',
    '/email-professionnel',
    '/google-my-business-maroc',
    '/google-ads-maroc',
    '/creation-site-web-maroc'
  ];
  
  if (dailyRoutes.includes(route)) {
    return 'daily';
  } else if (weeklyRoutes.includes(route)) {
    return 'weekly';
  } else {
    return 'monthly';
  }
}

export const GET: APIRoute = () => {
  const baseUrl = 'https://www.hostino.ma';
  const pagesDir = path.join(process.cwd(), 'src', 'pages');

  const routeInfos = getAstroRoutes(pagesDir);
  const uniqueRoutes = Array.from(
    new Map(routeInfos.map((item) => [item.route, item])).values()
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueRoutes
  .map(({ route, filePath }) => {
    const lastMod = getFileModifiedDate(filePath).toISOString();
    const priority = getPagePriority(route);
    const changefreq = getChangeFrequency(route);
    
    return `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};