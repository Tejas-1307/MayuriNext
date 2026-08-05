import nodemailer from 'nodemailer';
import { LeadSubmissionPayload } from './leadsStore';

/**
 * Generate Admin Notification HTML Email Template (Customer Info)
 */
export function generateAdminEmailHtml(payload: LeadSubmissionPayload): string {
  const isVisit = payload.form_type === 'site-visit';
  const cleanPhone = payload.phone.replace(/[^0-9+]/g, '');

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>New Site Visit Request</title>
    <style>
      body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f5f5f0; margin: 0; padding: 20px; color: #111111; }
      .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #e0e0e0; }
      .header { background: #0A0A0A; padding: 30px 25px; text-align: center; border-bottom: 3px solid #6CAFBF; }
      .header h1 { color: #8BC7D8; margin: 0; font-size: 22px; text-transform: uppercase; letter-spacing: 2px; }
      .header p { color: #aaaaaa; margin: 5px 0 0 0; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; }
      .content { padding: 30px 25px; }
      .badge { display: inline-block; background: #6CAFBF; color: #000000; padding: 6px 14px; border-radius: 20px; font-weight: bold; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px; }
      .field-grid { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
      .field-grid td { padding: 12px 10px; border-bottom: 1px solid #f0f0f0; font-size: 14px; }
      .field-grid tr:last-child td { border-bottom: none; }
      .label { font-weight: bold; color: #666666; width: 35%; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px; }
      .value { font-weight: 600; color: #111111; }
      .highlight { color: #6CAFBF; font-weight: bold; }
      .cta-bar { background: #fafafa; padding: 20px; text-align: center; border-top: 1px solid #eeeeee; }
      .button { display: inline-block; padding: 12px 24px; border-radius: 25px; font-weight: bold; font-size: 12px; text-decoration: none; text-transform: uppercase; letter-spacing: 1px; margin: 5px; }
      .btn-primary { background: #6CAFBF; color: #000000; }
      .btn-whatsapp { background: #25D366; color: #ffffff; }
      .footer { background: #0A0A0A; padding: 20px; text-align: center; color: #777777; font-size: 11px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>MAYURI LANDMARKS</h1>
        <p>Sales Operating System Alert</p>
      </div>
      <div class="content">
        <div class="badge">${isVisit ? '📅 NEW SITE VISIT REQUEST' : '📩 NEW PROPERTY ENQUIRY'}</div>
        <h2 style="margin-top:0; font-size: 20px;">Customer Details:</h2>
        
        <table class="field-grid">
          <tr>
            <td class="label">Full Name</td>
            <td class="value">${payload.full_name}</td>
          </tr>
          <tr>
            <td class="label">Phone Number</td>
            <td class="value"><a href="tel:${cleanPhone}" style="color: #6CAFBF; text-decoration: none;">${payload.phone}</a></td>
          </tr>
          <tr>
            <td class="label">Email Address</td>
            <td class="value"><a href="mailto:${payload.email}" style="color: #6CAFBF; text-decoration: none;">${payload.email}</a></td>
          </tr>
          <tr>
            <td class="label">Interested Project</td>
            <td class="value highlight">${payload.project_name}</td>
          </tr>
          <tr>
            <td class="label">Unit Configuration</td>
            <td class="value">${payload.unit_type}</td>
          </tr>
          ${isVisit ? `
          <tr>
            <td class="label">Preferred Date</td>
            <td class="value highlight">${payload.visit_date}</td>
          </tr>
          <tr>
            <td class="label">Preferred Time</td>
            <td class="value">${payload.time_slot}</td>
          </tr>
          ` : ''}
          ${payload.message ? `
          <tr>
            <td class="label">Additional Notes</td>
            <td class="value">${payload.message}</td>
          </tr>
          ` : ''}
          <tr>
            <td class="label">Source Page</td>
            <td class="value">${payload.source_page} (${payload.device || 'Desktop'})</td>
          </tr>
          <tr>
            <td class="label">Timestamp</td>
            <td class="value">${new Date(payload.timestamp).toLocaleString()}</td>
          </tr>
        </table>
      </div>

      <div class="cta-bar">
        <a href="tel:${cleanPhone}" class="button btn-primary">Call Lead Now</a>
        <a href="https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent(`Hi ${payload.full_name}, thank you for requesting a site visit for ${payload.project_name} with Mayuri Landmarks.`)}" class="button btn-whatsapp">WhatsApp Lead</a>
      </div>

      <div class="footer">
        Mayuri Landmarks LLP • Undri, Pune, Maharashtra • Automated CRM Notification
      </div>
    </div>
  </body>
  </html>
  `;
}

/**
 * Helper to create Nodemailer transport reading strictly from environment variables
 */
function createSmtpTransporter() {
  const host = process.env.EMAIL_HOST || process.env.SMTP_HOST || 'smtp-relay.brevo.com';
  const port = Number(process.env.EMAIL_PORT || process.env.SMTP_PORT) || 587;
  const user = process.env.EMAIL_HOST_USER || process.env.SMTP_USER;
  const pass = process.env.EMAIL_HOST_PASSWORD || process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error('SMTP user or password environment variable is missing.');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
    connectionTimeout: 10000, // 10s timeout
    greetingTimeout: 10000,   // 10s timeout
    socketTimeout: 15000,     // 15s timeout
  });
}

/**
 * Server-side email delivery handler (Sends Admin Customer-Info Notification Email ONLY)
 */
export async function sendDualEmails(payload: LeadSubmissionPayload): Promise<{ success: boolean; adminSent: boolean; customerSent: boolean; logOnly?: boolean }> {
  const adminEmailHtml = generateAdminEmailHtml(payload);

  const fromEmail = process.env.DEFAULT_FROM_EMAIL || process.env.SMTP_FROM || 'tsalunkhe204@gmail.com';
  const adminEmail = process.env.ADMIN_EMAIL || 'crohitpote17@gmail.com';

  const isVisit = payload.form_type === 'site-visit';
  const adminSubject = isVisit ? 'New Site Visit Request' : 'New Property Enquiry';

  const user = process.env.EMAIL_HOST_USER || process.env.SMTP_USER;
  const pass = process.env.EMAIL_HOST_PASSWORD || process.env.SMTP_PASS;

  if (!user || !pass) {
    console.warn('[EMAIL SERVICE - FALLBACK LOGGER MODE] Missing SMTP environment variables.');
    return { success: true, adminSent: false, customerSent: false, logOnly: true };
  }

  let attempt = 0;
  const maxAttempts = 2; // Initial attempt + 1 retry on failure

  while (attempt < maxAttempts) {
    attempt++;
    try {
      const transporter = createSmtpTransporter();

      // Send Admin Customer-Info Email ONLY
      const adminResult = await transporter.sendMail({
        from: `"Mayuri Landmarks System" <${fromEmail}>`,
        to: adminEmail,
        replyTo: payload.email,
        subject: `${adminSubject} - ${payload.full_name} (${payload.project_name})`,
        html: adminEmailHtml,
      });

      console.log(`[SMTP EMAIL SUCCESS] Admin Customer Info Mail ID: ${adminResult.messageId}`);

      return {
        success: true,
        adminSent: !!adminResult.messageId,
        customerSent: false,
      };
    } catch (error: any) {
      console.error(`[SMTP EMAIL ERROR] Attempt ${attempt}/${maxAttempts} failed:`, error?.message || error);
      
      if (attempt < maxAttempts) {
        console.log('[SMTP RETRY] Retrying email dispatch in 1.5 seconds...');
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
    }
  }

  // If retries fail, return success: true so lead storage is preserved and user workflow isn't broken
  return { success: true, adminSent: false, customerSent: false, logOnly: true };
}
