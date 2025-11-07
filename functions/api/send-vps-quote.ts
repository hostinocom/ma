import type { APIRoute } from 'astro';
import { sendEmail } from '../../src/lib/email';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const {
      name,
      company,
      phone,
      email,
      vcpu,
      ram,
      storage,
      useCase,
      os,
      controlPanel,
      managedServices,
      backup,
    } = body;

    console.log(body);

    // Validate required fields
    if (!company || !phone || !email || !vcpu || !ram || !storage || !os || !controlPanel) {
      return new Response(
        JSON.stringify({ error: 'Tous les champs obligatoires doivent être remplis' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Adresse email invalide' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Phone validation
    const phoneRegex = /^(\+212|0)[5-7][0-9]{8}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      return new Response(
        JSON.stringify({ error: 'Numéro de téléphone invalide' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Format OS display
    const osDisplay: string = os === 'linux' 
      ? 'Linux (Ubuntu, Debian, CentOS, Almalinux...)' 
      : 'Windows Server (2016, 2019, 2022)';

    // Format Control Panel display
    const controlPanelDisplay: { [key: string]: string } = {
      'none': 'Aucun',
      'cpanel': 'cPanel',
      'plesk': 'Plesk',
      'other': 'Autre'
    }[controlPanel as keyof typeof controlPanelDisplay] || controlPanel;

    // Create HTML email content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">Nouvelle Demande de Devis VPS</h1>
            <p style="margin: 10px 0 0 0;">Cloud VPS Maroc - Hostino®</p>
          </div>
          
          <div class="content">
            <div class="section">
              <div class="section-title">📋 Informations Client</div>
              <div class="field">
                <span class="label">Nom et prénom:</span>
                <span class="value">${name || 'Non renseigné'}</span>
              </div>
              <div class="field">
                <span class="label">Entreprise:</span>
                <span class="value">${company}</span>
              </div>
              <div class="field">
                <span class="label">Téléphone:</span>
                <span class="value">${phone}</span>
              </div>
              <div class="field">
                <span class="label">Email:</span>
                <span class="value">${email}</span>
              </div>
            </div>

            <div class="section">
              <div class="section-title">💻 Besoins Techniques</div>
              <div class="field">
                <span class="label">vCPU:</span>
                <span class="value">${vcpu}</span>
              </div>
              <div class="field">
                <span class="label">RAM:</span>
                <span class="value">${ram}</span>
              </div>
              <div class="field">
                <span class="label">Stockage:</span>
                <span class="value">${storage}</span>
              </div>
              <div class="field">
                <span class="label">Cas d'utilisation:</span>
                <span class="value">${useCase || 'Non renseigné'}</span>
              </div>
            </div>

            <div class="section">
              <div class="section-title">⚙️ Configuration</div>
              <div class="field">
                <span class="label">Système d'exploitation:</span>
                <span class="value">${osDisplay}</span>
              </div>
              <div class="field">
                <span class="label">Panneau de contrôle:</span>
                <span class="value">${controlPanelDisplay}</span>
              </div>
              <div class="field">
                <span class="label">Infogérance:</span>
                <span class="value">${managedServices === 'yes' ? 'Oui' : managedServices === 'non' ? 'Non' : 'Non renseigné'}</span>
              </div>
              <div class="field">
                <span class="label">Sauvegarde distante:</span>
                <span class="value">${backup === 'yes' ? 'Oui' : backup === 'non' ? 'Non' : 'Non renseigné'}</span>
              </div>
            </div>

            <div class="footer">
              <p>Reçu le ${new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Casablanca' })}</p>
              <p>⏰ <strong>Délai de réponse:</strong> 24 heures</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Create plain text version
    const textContent = `
NOUVELLE DEMANDE DE DEVIS VPS - HOSTINO®
========================================

INFORMATIONS CLIENT
-------------------
Nom et prénom: ${name || 'Non renseigné'}
Entreprise: ${company}
Téléphone: ${phone}
Email: ${email}

BESOINS TECHNIQUES
------------------
vCPU: ${vcpu}
RAM: ${ram}
Stockage: ${storage}
Cas d'utilisation: ${useCase || 'Non renseigné'}

CONFIGURATION
-------------
Système d'exploitation: ${osDisplay}
Panneau de contrôle: ${controlPanelDisplay}
Infogérance: ${managedServices === 'yes' ? 'Oui' : managedServices === 'non' ? 'Non' : 'Non renseigné'}
Sauvegarde distante: ${backup === 'yes' ? 'Oui' : backup === 'non' ? 'Non' : 'Non renseigné'}

---
Reçu le ${new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Casablanca' })}
Délai de réponse: 24 heures
    `;

    const result = await sendEmail({
      to: email, // Replace with your actual email
      subject: `📩 Nouvelle demande de devis VPS - ${company}`,
      htmlContent,
      textContent,
      senderName: import.meta.env.BREVO_SENDER_NAME,
      senderEmail: import.meta.env.BREVO_SENDER_EMAIL, // Must be verified in Brevo
    });

    if (result.success) {
      return new Response(
        JSON.stringify({ 
          message: 'Demande de devis envoyée avec succès',
          success: true 
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      console.error('Brevo error:', result.error);
      return new Response(
        JSON.stringify({ error: 'Échec de l\'envoi de la demande' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Error in send-vps-quote API:', error);
    return new Response(
      JSON.stringify({ error: 'Erreur serveur' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};