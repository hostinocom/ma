import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse the request body
    const body = await request.json();
    const { fullName, phone, email, page } = body;

    // Validate input
    if (!fullName || !phone || !email) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Tous les champs sont requis' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Email invalide' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get environment variables
    const BREVO_API_KEY = import.meta.env.BREVO_API_KEY;
    const BREVO_SENDER_EMAIL = import.meta.env.BREVO_SENDER_EMAIL;
    const BREVO_SENDER_NAME = import.meta.env.BREVO_SENDER_NAME || 'Contact Form';
    const BREVO_RECIPIENT_EMAIL = import.meta.env.BREVO_RECIPIENT_EMAIL;

    // Check if environment variables are set
    if (!BREVO_API_KEY || !BREVO_SENDER_EMAIL || !BREVO_RECIPIENT_EMAIL) {
      console.error('Missing environment variables');
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Configuration du serveur incorrecte' 
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Prepare email payload for Brevo API
    const emailPayload = {
      sender: {
        email: BREVO_SENDER_EMAIL,
        name: BREVO_SENDER_NAME
      },
      to: [
        { email: BREVO_RECIPIENT_EMAIL }
      ],
      subject: `Hostino MA - Demande de rappel client`,
      htmlContent: `
       <div style="
      font-family: Arial, Helvetica, sans-serif;
      font-size: 14px;
      color: #333;
      background-color: #f9f9f9;
      padding: 20px;
      border-radius: 6px;
      border: 1px solid #e0e0e0;
    ">
      <h2 style="
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 10px;
        color: #222;
      ">
        Bonjour,
      </h2>
  
      <p style="margin: 0 0 15px;">
        Voici les informations de la demande de rappel client :
      </p>
  
      <div style="
        background-color: #fff;
        padding: 15px 20px;
        border-radius: 4px;
        border: 1px solid #ddd;
      ">
        <p style="margin: 8px 0;">
          <strong>Nom complet :</strong> ${fullName}
        </p>
        <p style="margin: 8px 0;">
          <strong>Numéro de téléphone :</strong> ${phone}
        </p>
        <p style="margin: 8px 0;">
          <strong>Adresse email :</strong> ${email}
        </p>
        <p style="margin: 8px 0;">
          <strong>Page :</strong> 
          <a href="${page}" target="_blank" style="color: #007BFF; text-decoration: none;">
            ${page}
          </a>
        </p>
        <p style="margin: 8px 0; font-size: 12px; color: #666;">
          <strong>Date et heure :</strong> ${new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Casablanca' })}
        </p>
      </div>
  
      <p style="margin-top: 20px; font-size: 12px; color: #777;">
        — Message automatique de votre site <strong>Hostino.ma</strong>
      </p>
    </div>
      `,
      textContent: `
          Bonjour,
  
  Voici les informations de la demande de rappel client
  
  Nom complet: ${fullName}
  Numéro de téléphone: ${phone}
  Adresse email: ${email}
  Page: ${page}
  Date et heure: ${new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Casablanca' })}
  
  — Message automatique de votre site Hostino.ma
     
      `
    };

    // Send email via Brevo API
    const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY
      },
      body: JSON.stringify(emailPayload)
    });

    // Check if request was successful
    if (!brevoResponse.ok) {
      const errorData = await brevoResponse.json();
      console.error('Brevo API Error:', errorData);
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Erreur lors de l\'envoi de l\'email' 
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const result = await brevoResponse.json();
    console.log('Email sent successfully:', result);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email envoyé avec succès!' 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Erreur lors de l\'envoi de l\'email' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};


