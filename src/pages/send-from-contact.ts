import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse the request body
    const body = await request.json();
    const { fullName, company, phone, email, message } = body;

    // Validate required fields
    if (!fullName || !email || !message) {
      return new Response(
        JSON.stringify({ 
          error: 'Le nom, l\'email et le message sont requis' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate name
    const trimmedName = fullName.trim();
    if (trimmedName.length < 2 || trimmedName.length > 100) {
      return new Response(
        JSON.stringify({ 
          error: 'Le nom doit contenir entre 2 et 100 caractères' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return new Response(
        JSON.stringify({ 
          error: 'Veuillez entrer une adresse email valide' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate phone if provided
    if (phone && phone.trim()) {
      const cleanPhone = phone.replace(/[\s\-().]/g, '');
      const digitsOnly = cleanPhone.replace(/\+/g, '');
      if (digitsOnly.length < 7 || digitsOnly.length > 15) {
        return new Response(
          JSON.stringify({ 
            error: 'Le numéro de téléphone doit contenir entre 7 et 15 chiffres' 
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Validate message
    const trimmedMessage = message.trim();
    if (trimmedMessage.length < 10 || trimmedMessage.length > 2000) {
      return new Response(
        JSON.stringify({ 
          error: 'Le message doit contenir entre 10 et 2000 caractères' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get environment variables
    const BREVO_API_KEY = import.meta.env.BREVO_API_KEY;
    const BREVO_SENDER_EMAIL = import.meta.env.BREVO_SENDER_EMAIL;
    const BREVO_SENDER_NAME = import.meta.env.BREVO_SENDER_NAME || 'Formulaire de Contact';
    const BREVO_RECIPIENT_EMAIL = import.meta.env.BREVO_RECIPIENT_EMAIL;

    // Check if environment variables are set
    if (!BREVO_API_KEY || !BREVO_SENDER_EMAIL || !BREVO_RECIPIENT_EMAIL) {
      console.error('Missing environment variables');
      return new Response(
        JSON.stringify({ 
          error: 'Configuration du serveur incorrecte' 
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
      replyTo: {
        email: email.trim(),
        name: trimmedName
      },
      subject: `Nouveau message de contact - ${trimmedName}`,
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
            Nouveau message de contact
          </h2>
      
          <p style="margin: 0 0 15px;">
            Vous avez reçu un nouveau message via le formulaire de contact :
          </p>
      
          <div style="
            background-color: #fff;
            padding: 15px 20px;
            border-radius: 4px;
            border: 1px solid #ddd;
            margin-bottom: 20px;
          ">
            <p style="margin: 8px 0;">
              <strong>Nom et prénom :</strong> ${trimmedName}
            </p>
            ${company && company.trim() ? `
            <p style="margin: 8px 0;">
              <strong>Entreprise :</strong> ${company.trim()}
            </p>
            ` : ''}
            ${phone && phone.trim() ? `
            <p style="margin: 8px 0;">
              <strong>Téléphone :</strong> ${phone.trim()}
            </p>
            ` : ''}
            <p style="margin: 8px 0;">
              <strong>Email :</strong> 
              <a href="mailto:${email.trim()}" style="color: #007BFF; text-decoration: none;">
                ${email.trim()}
              </a>
            </p>
            <p style="margin: 8px 0; font-size: 12px; color: #666;">
              <strong>Date et heure :</strong> ${new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Casablanca' })}
            </p>
          </div>

          <div style="
            background-color: #fff;
            padding: 15px 20px;
            border-radius: 4px;
            border: 1px solid #ddd;
          ">
            <p style="margin: 0 0 10px;">
              <strong>Message :</strong>
            </p>
            <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">
              ${trimmedMessage}
            </p>
          </div>
      
          <p style="margin-top: 20px; font-size: 12px; color: #777;">
            — Message automatique de votre site <strong>Hostino.ma</strong>
          </p>
        </div>
      `,
      textContent: `
Nouveau message de contact

Vous avez reçu un nouveau message via le formulaire de contact :

Nom et prénom: ${trimmedName}
${company && company.trim() ? `Entreprise: ${company.trim()}\n` : ''}${phone && phone.trim() ? `Téléphone: ${phone.trim()}\n` : ''}Email: ${email.trim()}
Date et heure: ${new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Casablanca' })}

Message:
${trimmedMessage}

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
          error: 'Erreur lors de l\'envoi de l\'email' 
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const result = await brevoResponse.json();
    console.log('Email sent successfully:', result);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Message envoyé avec succès!' 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Erreur lors de l\'envoi de l\'email' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};