import { sendEmail as sendViaBrevo } from './brevo';
import { sendViaGmail } from './gmail-smtp';
import { adminDb } from './firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

type SendEmailParams = {
  to: string;
  subject: string;
  html: string;
};

async function logAndAlert(context: string, error: unknown, to: string) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[email] ${context} failed for ${to}:, ${message}`);

  try {
    await adminDb.collection('emailFailures').add({
      context,
      to,
      error: message,
      createdAt: FieldValue.serverTimestamp(),
    });
  }
  catch (err) {
    console.error('[email] Failed to record email failure in Firestore', err);
  }

  const webhookUrl = process.env.ALERT_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `🚨 Email delivery failed — ${context}\nTo: ${to}\nError: ${message}`,
        }),
      });
    }
    catch (err) {
      console.error('[email] Failed to send alert webhook', err);
    }
  }
}

export async function sendTransactionalEmail({ to, subject, html }: SendEmailParams) {
  try {
    return await sendViaBrevo({ to, subject, html });
  }
  catch (brevoErr) {
    await logAndAlert('Brevo primary send', brevoErr, to);
  }

  try {
    return await sendViaGmail({ to, subject, html });
  }
  catch (gmailErr) {
    await logAndAlert('Gmail fallback send', gmailErr, to);

    throw new Error('Failed to send email through all configured providers');
  }
}