// functions/api/send-email.js
// Place this file in: functions/api/send-email.js

export async function onRequestPost(context : any) {
  try {
    const body = await context.request.json();
    const { fullName, phone, email, page } = body;

    // Validate required fields
    if (!fullName || !phone || !email) {
      return new Response(
        JSON.stringify({ error: 'Tous les champs sont requis' }),
        { 
          status: 400, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          } 
        }
      );
    }

    // Strong name validation
    const nameValidation = validateName(fullName);
    if (!nameValidation.valid) {
      return new Response(
        JSON.stringify({ error: nameValidation.error }),
        { 
          status: 400, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          } 
        }
      );
    }

    // Strong phone validation
    const phoneValidation = validatePhone(phone);
    if (!phoneValidation.valid) {
      return new Response(
        JSON.stringify({ error: phoneValidation.error }),
        { 
          status: 400, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          } 
        }
      );
    }

    // Strong email validation
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      return new Response(
        JSON.stringify({ error: emailValidation.error }),
        { 
          status: 400, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          } 
        }
      );
    }

    // Sanitize inputs to prevent XSS
    const sanitizedFullName = sanitizeInput(fullName);
    const sanitizedPhone = sanitizeInput(phone);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPage = page ? sanitizeInput(page) : 'Non spécifiée';

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
        <strong>Nom complet :</strong> ${sanitizedFullName}
      </p>
      <p style="margin: 8px 0;">
        <strong>Numéro de téléphone :</strong> ${sanitizedPhone}
      </p>
      <p style="margin: 8px 0;">
        <strong>Adresse email :</strong> ${sanitizedEmail}
      </p>
      <p style="margin: 8px 0;">
        <strong>Page :</strong> 
        <a href="${sanitizedPage}" target="_blank" style="color: #007BFF; text-decoration: none;">
          ${sanitizedPage}
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

    const textContent = `
Bonjour,

Voici les informations de la demande de rappel client

Nom complet: ${sanitizedFullName}
Numéro de téléphone: ${sanitizedPhone}
Adresse email: ${sanitizedEmail}
Page: ${sanitizedPage}
Date et heure: ${new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Casablanca' })}

— Message automatique de votre site Hostino.ma
    `;

    // Send email via Brevo API
    const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
        'api-key': context.env.BREVO_API_KEY
      },
      body: JSON.stringify({
        sender: {
          name: context.env.BREVO_SENDER_NAME,
          email: context.env.BREVO_SENDER_EMAIL
        },
        to: [
          {
            email: context.env.BREVO_RECIPIENT_EMAIL,
            name: 'Hostino Team'
          }
        ],
        subject: `Hostino MA - Demande de rappel client - ${sanitizedFullName}`,
        htmlContent: htmlContent,
        textContent: textContent
      })
    });

    if (brevoResponse.ok) {
      return new Response(
        JSON.stringify({ message: 'Email envoyé avec succès' }),
        { 
          status: 200, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          } 
        }
      );
    } else {
      const errorData = await brevoResponse.json();
      console.error('Brevo API Error:', errorData);
      return new Response(
        JSON.stringify({ error: 'Échec de l\'envoi de l\'email' }),
        { 
          status: 500, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          } 
        }
      );
    }
  } catch (error) {
    console.error('Error in send-email API:', error);
    return new Response(
      JSON.stringify({ error: 'Erreur serveur' }),
      { 
        status: 500, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        } 
      }
    );
  }
}

// Handle CORS preflight requests
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    }
  });
}

// Strong name validation
function validateName(name: string) {
  // Trim whitespace
  const trimmedName = name.trim();

  // Check if empty
  if (trimmedName.length === 0) {
    return { valid: false, error: 'Le nom complet est requis' };
  }

  // Check minimum length
  if (trimmedName.length < 2) {
    return { valid: false, error: 'Le nom complet doit contenir au moins 2 caractères' };
  }

  // Check maximum length
  if (trimmedName.length > 100) {
    return { valid: false, error: 'Le nom complet ne peut pas dépasser 100 caractères' };
  }

  // Check for valid characters (letters, spaces, hyphens, apostrophes, accents, unicode letters)
  const nameRegex = /^[\p{L}\s'-]+$/u;
  if (!nameRegex.test(trimmedName)) {
    return { valid: false, error: 'Le nom complet contient des caractères invalides' };
  }

  // Check for at least one space (first name and last name)
  if (!trimmedName.includes(' ')) {
    return { valid: false, error: 'Veuillez entrer votre nom complet (prénom et nom)' };
  }

  // Check for suspicious patterns (repeated characters)
  const repeatedCharsRegex = /(.)\1{4,}/;
  if (repeatedCharsRegex.test(trimmedName)) {
    return { valid: false, error: 'Le nom complet contient des caractères répétés suspects' };
  }

  return { valid: true };
}

// Universal phone validation (accepts national and international formats)
function validatePhone(phone: string) {
  // Remove all spaces, dashes, parentheses, and dots
  const cleanPhone = phone.replace(/[\s\-().\u00A0]/g, '');

  // Check if empty
  if (cleanPhone.length === 0) {
    return { valid: false, error: 'Le numéro de téléphone est requis' };
  }

  // Check for valid characters (only digits, +, and parentheses)
  const validCharsRegex = /^[\d+()]+$/;
  if (!validCharsRegex.test(cleanPhone)) {
    return { valid: false, error: 'Le numéro de téléphone contient des caractères invalides' };
  }

  // Remove parentheses for further validation
  const phoneDigits = cleanPhone.replace(/[()]/g, '');

  // Check minimum length (at least 7 digits for shortest valid numbers)
  const digitsOnly = phoneDigits.replace(/\+/g, '');
  if (digitsOnly.length < 7) {
    return { valid: false, error: 'Le numéro de téléphone est trop court (minimum 7 chiffres)' };
  }

  // Check maximum length (15 digits is the international standard per E.164)
  if (digitsOnly.length > 15) {
    return { valid: false, error: 'Le numéro de téléphone est trop long (maximum 15 chiffres)' };
  }

  // If starts with +, validate international format
  if (phoneDigits.startsWith('+')) {
    const internationalRegex = /^\+\d{1,3}\d{4,14}$/;
    if (!internationalRegex.test(phoneDigits)) {
      return { 
        valid: false, 
        error: 'Format international invalide (ex: +33 6 12 34 56 78, +1 555 123 4567)' 
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

  // Check that + only appears at the start
  if (phoneDigits.indexOf('+') > 0) {
    return { valid: false, error: 'Le symbole + doit être au début du numéro' };
  }

  // Additional check: ensure it's not all the same digit
  const allSameDigit = /^(\+)?(\d)\2+$/;
  if (allSameDigit.test(phoneDigits)) {
    return { valid: false, error: 'Le numéro de téléphone semble invalide' };
  }

  // Check for suspicious patterns (too many zeros at the end)
  if (/0{6,}$/.test(digitsOnly)) {
    return { valid: false, error: 'Le numéro de téléphone semble invalide' };
  }

  return { valid: true };
}

// Strong email validation
function validateEmail(email: string) {
  // Trim whitespace
  const trimmedEmail = email.trim().toLowerCase();

  // Check if empty
  if (trimmedEmail.length === 0) {
    return { valid: false, error: 'L\'adresse email est requise' };
  }

  // Check maximum length (RFC 5321)
  if (trimmedEmail.length > 254) {
    return { valid: false, error: 'L\'adresse email est trop longue' };
  }

  // Basic format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return { valid: false, error: 'Veuillez entrer une adresse email valide' };
  }

  // More strict email validation
  const strictEmailRegex = /^[a-zA-Z0-9]([a-zA-Z0-9._-]*[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
  if (!strictEmailRegex.test(trimmedEmail)) {
    return { valid: false, error: 'L\'adresse email contient des caractères invalides' };
  }

  // Split email into local and domain parts
  const [localPart, domainPart] = trimmedEmail.split('@');

  // Validate local part (before @)
  if (localPart.length > 64) {
    return { valid: false, error: 'La partie locale de l\'email est trop longue' };
  }

  // Check for consecutive dots
  if (localPart.includes('..') || domainPart.includes('..')) {
    return { valid: false, error: 'L\'adresse email ne peut pas contenir des points consécutifs' };
  }

  // Check for dots at start or end
  if (localPart.startsWith('.') || localPart.endsWith('.')) {
    return { valid: false, error: 'L\'adresse email ne peut pas commencer ou finir par un point' };
  }

  // Validate domain part (after @)
  const domainParts = domainPart.split('.');
  
  // Check if domain has at least 2 parts
  if (domainParts.length < 2) {
    return { valid: false, error: 'Le domaine de l\'email est invalide' };
  }

  // Check TLD (top-level domain) length
  const tld = domainParts[domainParts.length - 1];
  if (tld.length < 2) {
    return { valid: false, error: 'L\'extension du domaine est invalide' };
  }

  // Block common disposable/temporary email domains
  const disposableDomains = [
    'tempmail.com', 'throwaway.email', '10minutemail.com', 'guerrillamail.com',
    'mailinator.com', 'trashmail.com', 'temp-mail.org', 'fakeinbox.com'
  ];
  
  if (disposableDomains.includes(domainPart)) {
    return { valid: false, error: 'Les adresses email temporaires ne sont pas acceptées' };
  }

  // Check for suspicious patterns
  const suspiciousPatterns = [
    /^test@/i,
    /^admin@/i,
    /^noreply@/i,
    /^no-reply@/i,
    /@example\./i,
    /@test\./i
  ];

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(trimmedEmail)) {
      return { valid: false, error: 'Cette adresse email semble être un exemple ou une adresse de test' };
    }
  }

  return { valid: true };
}

// Sanitize input to prevent XSS attacks
function sanitizeInput(input: string) {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}