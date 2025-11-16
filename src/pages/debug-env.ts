import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async () => {
  const envCheck = {
    hasApiKey: !!import.meta.env.BREVO_API_KEY,
    hasSender: !!import.meta.env.BREVO_SENDER_EMAIL,
    hasRecipient: !!import.meta.env.BREVO_RECIPIENT_EMAIL,
    hasSenderName: !!import.meta.env.BREVO_SENDER_NAME,
    apiKeyLength: import.meta.env.BREVO_API_KEY?.length || 0,
    apiKeyPrefix: import.meta.env.BREVO_API_KEY?.substring(0, 10) || 'none',
  };
  
  return new Response(
    JSON.stringify(envCheck, null, 2),
    { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    }
  );
};