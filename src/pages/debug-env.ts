import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async () => {
  const envCheck = {
    hasApiKey: !!process.env.BREVO_API_KEY,
    hasSender: !!process.env.BREVO_SENDER_EMAIL,
    hasRecipient: !!process.env.BREVO_RECIPIENT_EMAIL,
    hasSenderName: !!process.env.BREVO_SENDER_NAME,
    apiKeyLength: process.env.BREVO_API_KEY?.length || 0,
    apiKeyPrefix: process.env.BREVO_API_KEY?.substring(0, 10) || 'none',
  };
  
  return new Response(
    JSON.stringify(envCheck, null, 2),
    { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    }
  );
};