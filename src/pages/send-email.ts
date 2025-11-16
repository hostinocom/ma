import type { APIRoute } from 'astro';
import * as SibApiV3Sdk from '@sendinblue/client';

export const prerender = false; // Important for Cloudflare

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

    // Initialize Brevo client
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    apiInstance.setApiKey(
      SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
      import.meta.env.BREVO_API_KEY
    );

    // Prepare email
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    
    sendSmtpEmail.sender = {
      email: import.meta.env.BREVO_SENDER_EMAIL,
      name: import.meta.env.BREVO_SENDER_NAME
    };
    
    sendSmtpEmail.to = [
      { email: import.meta.env.BREVO_RECIPIENT_EMAIL }
    ];
    
    sendSmtpEmail.subject = `Nouveau contact: ${fullName}`;
    
    sendSmtpEmail.htmlContent = `
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
  `;
  

    // Send email
    await apiInstance.sendTransacEmail(sendSmtpEmail);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email envoyé avec succès!' 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Erreur Brevo:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Erreur lors de l\'envoi de l\'email' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};