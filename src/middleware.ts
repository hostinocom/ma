// import { defineMiddleware } from 'astro:middleware';

// export const onRequest = defineMiddleware(async (context, next) => {
//   const url = new URL(context.request.url);
  
//   // Skip redirect for API routes and static assets

  
//   if (
//     url.pathname.startsWith('/api/') ||
//     url.pathname.match(/\.(jpg|jpeg|png|gif|svg|ico|css|js|woff|woff2|ttf|eot|webp|pdf|json|xml)$/i)
//   ) {
//     return next();
//   }
  
//   // Check if pathname contains uppercase letters
//   const lowercasePath = url.pathname.toLowerCase();
//   const hasUppercase = url.pathname !== lowercasePath;
  
//   // Redirect all requests to hostino.nl
//   if (url.hostname !== 'www.hostino.nl') {
//     return Response.redirect(
//       `https://www.hostino.nl${lowercasePath}${url.search}`, 
//       301
//     );
//   }
  
//   // If already on correct domain but path has uppercase, redirect to lowercase
//   if (hasUppercase) {
//     return Response.redirect(
//       `${url.origin}${lowercasePath}${url.search}`,
//       301
//     );
//   }
  
//   return next();
// });