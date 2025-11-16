import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  
  // Redirect all requests to hostino.nl
  if (url.hostname !== 'www.hostino.nl') {
    return Response.redirect(`https://www.hostino.nl${url.pathname}${url.search}`, 301);
  }
  
  return next();
});