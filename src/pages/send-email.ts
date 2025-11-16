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
      "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"
    );

    // Prepare email
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    
    sendSmtpEmail.sender = {
      email: "chroudiimran@gmail.com",
      name: "Imran Cheroud"
    };
    
    sendSmtpEmail.to = [
      { email: "chroudiimran1@gmail.com" }
    ];
    
    sendSmtpEmail.subject = `Nouveau contact: ${fullName}`;
    
    sendSmtpEmail.htmlContent = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #2563eb;">Nouveau message de contact</h2>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nom complet:</strong> ${fullName}</p>
            <p><strong>Téléphone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Page:</strong> <a href="${page}">${page}</a></p>
          </div>
          <p style="color: #6b7280; font-size: 12px;">
            Message reçu le ${new Date().toLocaleString('fr-FR')}
          </p>
        </body>
      </html>
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