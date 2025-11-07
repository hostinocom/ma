import type { APIRoute } from 'astro';
import { sendEmail } from '../../src/lib/email';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { fullName, company, phone, email, message } = body;

    // Validate required fields
    if (!fullName || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Les champs Nom, Email et Message sont requis' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Strong name validation
    const nameValidation = validateName(fullName);
    if (!nameValidation.valid) {
      return new Response(
        JSON.stringify({ error: nameValidation.error }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Phone validation (optional but if provided, must be valid)
    if (phone) {
      const phoneValidation = validatePhone(phone);
      if (!phoneValidation.valid) {
        return new Response(
          JSON.stringify({ error: phoneValidation.error }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Strong email validation
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      return new Response(
        JSON.stringify({ error: emailValidation.error }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Message validation
    const messageValidation = validateMessage(message);
    if (!messageValidation.valid) {
      return new Response(
        JSON.stringify({ error: messageValidation.error }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Sanitize inputs to prevent XSS
    const sanitizedFullName = sanitizeInput(fullName);
    const sanitizedCompany = company ? sanitizeInput(company) : 'Non spécifiée';
    const sanitizedPhone = phone ? sanitizeInput(phone) : 'Non spécifié';
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedMessage = sanitizeInput(message);

    // Create HTML email content
    const htmlContent = `
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
      Vous avez reçu un nouveau message depuis le formulaire de contact :
    </p>

    <div style="
      background-color: #fff;
      padding: 15px 20px;
      border-radius: 4px;
      border: 1px solid #ddd;
    ">
      <p style="margin: 8px 0;">
        <strong>Nom et prénom :</strong> ${sanitizedFullName}
      </p>
      <p style="margin: 8px 0;">
        <strong>Entreprise :</strong> ${sanitizedCompany}
      </p>
      <p style="margin: 8px 0;">
        <strong>Téléphone :</strong> ${sanitizedPhone}
      </p>
      <p style="margin: 8px 0;">
        <strong>Email :</strong> ${sanitizedEmail}
      </p>
      <p style="margin: 8px 0;">
        <strong>Message :</strong>
      </p>
      <div style="
        background-color: #f5f5f5;
        padding: 10px;
        border-radius: 4px;
        margin-top: 5px;
        white-space: pre-wrap;
      ">
        ${sanitizedMessage.replace(/\n/g, '<br>')}
      </div>
      <p style="margin: 8px 0; margin-top: 15px; font-size: 12px; color: #666;">
        <strong>Date et heure :</strong> ${new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Casablanca' })}
      </p>
    </div>

    <p style="margin-top: 20px; font-size: 12px; color: #777;">
      — Message automatique de votre site <strong>Hostino.ma</strong>
    </p>
  </div>
`;

    const textContent = `
Nouveau message de contact

Nom et prénom: ${sanitizedFullName}
Entreprise: ${sanitizedCompany}
Téléphone: ${sanitizedPhone}
Email: ${sanitizedEmail}

Message:
${sanitizedMessage}

Date et heure: ${new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Casablanca' })}

— Message automatique de votre site Hostino.ma
    `;

    const result = await sendEmail({
      to: import.meta.env.BREVO_RECIPIENT_EMAIL,
      subject: `Hostino MA - Nouveau message de contact - ${sanitizedFullName}`,
      htmlContent,
      textContent,
      senderName: import.meta.env.BREVO_SENDER_NAME,
      senderEmail: import.meta.env.BREVO_SENDER_EMAIL,
    });

    if (result.success) {
      return new Response(
        JSON.stringify({ message: 'Message envoyé avec succès' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      return new Response(
        JSON.stringify({ error: 'Échec de l\'envoi du message' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Error in contact API:', error);
    return new Response(
      JSON.stringify({ error: 'Erreur serveur' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// Strong name validation
function validateName(name: string): { valid: boolean; error?: string } {
  const trimmedName = name.trim();

  if (trimmedName.length === 0) {
    return { valid: false, error: 'Le nom complet est requis' };
  }

  if (trimmedName.length < 2) {
    return { valid: false, error: 'Le nom complet doit contenir au moins 2 caractères' };
  }

  if (trimmedName.length > 100) {
    return { valid: false, error: 'Le nom complet ne peut pas dépasser 100 caractères' };
  }

  const nameRegex = /^[\p{L}\s'-]+$/u;
  if (!nameRegex.test(trimmedName)) {
    return { valid: false, error: 'Le nom complet contient des caractères invalides' };
  }

  const repeatedCharsRegex = /(.)\1{4,}/;
  if (repeatedCharsRegex.test(trimmedName)) {
    return { valid: false, error: 'Le nom complet contient des caractères répétés suspects' };
  }

  return { valid: true };
}

// Universal phone validation
function validatePhone(phone: string): { valid: boolean; error?: string } {
  const cleanPhone = phone.replace(/[\s\-().\u00A0]/g, '');

  if (cleanPhone.length === 0) {
    return { valid: false, error: 'Le numéro de téléphone est requis' };
  }

  const validCharsRegex = /^[\d+()]+$/;
  if (!validCharsRegex.test(cleanPhone)) {
    return { valid: false, error: 'Le numéro de téléphone contient des caractères invalides' };
  }

  const phoneDigits = cleanPhone.replace(/[()]/g, '');
  const digitsOnly = phoneDigits.replace(/\+/g, '');

  if (digitsOnly.length < 7) {
    return { valid: false, error: 'Le numéro de téléphone est trop court (minimum 7 chiffres)' };
  }

  if (digitsOnly.length > 15) {
    return { valid: false, error: 'Le numéro de téléphone est trop long (maximum 15 chiffres)' };
  }

  if (phoneDigits.startsWith('+')) {
    const internationalRegex = /^\+\d{1,3}\d{4,14}$/;
    if (!internationalRegex.test(phoneDigits)) {
      return { 
        valid: false, 
        error: 'Format international invalide' 
      };
    }
  } else {
    const nationalRegex = /^\d{7,15}$/;
    if (!nationalRegex.test(phoneDigits)) {
      return { 
        valid: false, 
        error: 'Format de numéro invalide' 
      };
    }
  }

  if (phoneDigits.indexOf('+') > 0) {
    return { valid: false, error: 'Le symbole + doit être au début du numéro' };
  }

  const allSameDigit = /^(\+)?(\d)\2+$/;
  if (allSameDigit.test(phoneDigits)) {
    return { valid: false, error: 'Le numéro de téléphone semble invalide' };
  }

  if (/0{6,}$/.test(digitsOnly)) {
    return { valid: false, error: 'Le numéro de téléphone semble invalide' };
  }

  return { valid: true };
}

// Strong email validation
function validateEmail(email: string): { valid: boolean; error?: string } {
  const trimmedEmail = email.trim().toLowerCase();

  if (trimmedEmail.length === 0) {
    return { valid: false, error: 'L\'adresse email est requise' };
  }

  if (trimmedEmail.length > 254) {
    return { valid: false, error: 'L\'adresse email est trop longue' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return { valid: false, error: 'Veuillez entrer une adresse email valide' };
  }

  const strictEmailRegex = /^[a-zA-Z0-9]([a-zA-Z0-9._-]*[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
  if (!strictEmailRegex.test(trimmedEmail)) {
    return { valid: false, error: 'L\'adresse email contient des caractères invalides' };
  }

  const [localPart, domainPart] = trimmedEmail.split('@');

  if (localPart.length > 64) {
    return { valid: false, error: 'La partie locale de l\'email est trop longue' };
  }

  if (localPart.includes('..') || domainPart.includes('..')) {
    return { valid: false, error: 'L\'adresse email ne peut pas contenir des points consécutifs' };
  }

  if (localPart.startsWith('.') || localPart.endsWith('.')) {
    return { valid: false, error: 'L\'adresse email ne peut pas commencer ou finir par un point' };
  }

  const domainParts = domainPart.split('.');
  
  if (domainParts.length < 2) {
    return { valid: false, error: 'Le domaine de l\'email est invalide' };
  }

  const tld = domainParts[domainParts.length - 1];
  if (tld.length < 2) {
    return { valid: false, error: 'L\'extension du domaine est invalide' };
  }

  return { valid: true };
}

// Message validation
function validateMessage(message: string): { valid: boolean; error?: string } {
  const trimmedMessage = message.trim();

  if (trimmedMessage.length === 0) {
    return { valid: false, error: 'Le message est requis' };
  }

  if (trimmedMessage.length < 10) {
    return { valid: false, error: 'Le message doit contenir au moins 10 caractères' };
  }

  if (trimmedMessage.length > 2000) {
    return { valid: false, error: 'Le message ne peut pas dépasser 2000 caractères' };
  }

  return { valid: true };
}

// Sanitize input to prevent XSS attacks
function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

