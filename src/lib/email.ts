import * as brevo from '@getbrevo/brevo';

const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  import.meta.env.BREVO_API_KEY
);

export async function sendEmail({
  to,
  subject,
  htmlContent,
  textContent,
  senderName = import.meta.env.BREVO_SENDER_NAME,
  senderEmail = import.meta.env.BREVO_SENDER_EMAIL
}: {
  to: string;
  subject: string;
  htmlContent: string;
  textContent: string;
  senderName?: string;
  senderEmail?: string;
}) {
  try {
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = htmlContent;
    sendSmtpEmail.textContent = textContent;
    sendSmtpEmail.sender = { name: senderName, email: senderEmail };
    sendSmtpEmail.to = [{ email: to }];

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    return { success: true, data: response };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
}