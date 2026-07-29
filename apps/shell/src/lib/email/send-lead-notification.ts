import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import type { CreateLeadInput } from '../lead-schema';

const DEFAULT_NOTIFY = 'admin@shanvai.com';
const DEFAULT_FROM = 'admin@shanvai.com';

function emailProvider(): 'ses' | 'console' {
  const configured = process.env.EMAIL_PROVIDER?.toLowerCase();
  if (configured === 'ses' || configured === 'console') return configured;
  return process.env.NODE_ENV === 'production' ? 'ses' : 'console';
}

function buildContent(lead: CreateLeadInput, meta?: { submittedAt?: string; ip?: string }) {
  const submittedAt = meta?.submittedAt ?? new Date().toISOString();
  const lines = [
    'A new enterprise demo request was submitted on www.shanvai.com.',
    '',
    `Name: ${lead.fullName}`,
    `Corporate email: ${lead.corporateEmail}`,
    `Industry sector: ${lead.industrySector}`,
    `Message: ${lead.message?.trim() || '(none)'}`,
    '',
    `Submitted at: ${submittedAt}`,
  ];
  if (meta?.ip) lines.push(`IP address: ${meta.ip}`);

  const text = lines.join('\n');
  const html = `
    <h2>New enterprise demo request</h2>
    <p>A visitor submitted the <strong>Request an enterprise demo</strong> form on shanvai.com.</p>
    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse">
      <tr><td><strong>Name</strong></td><td>${escapeHtml(lead.fullName)}</td></tr>
      <tr><td><strong>Corporate email</strong></td><td><a href="mailto:${escapeHtml(lead.corporateEmail)}">${escapeHtml(lead.corporateEmail)}</a></td></tr>
      <tr><td><strong>Industry sector</strong></td><td>${escapeHtml(lead.industrySector)}</td></tr>
      <tr><td><strong>Message</strong></td><td>${escapeHtml(lead.message?.trim() || '(none)')}</td></tr>
      <tr><td><strong>Submitted at</strong></td><td>${escapeHtml(submittedAt)}</td></tr>
      ${meta?.ip ? `<tr><td><strong>IP</strong></td><td>${escapeHtml(meta.ip)}</td></tr>` : ''}
    </table>
  `.trim();

  return { text, html };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function sendLeadNotification(
  lead: CreateLeadInput,
  meta?: { ip?: string }
): Promise<void> {
  const to = process.env.LEAD_NOTIFY_EMAIL?.trim() || DEFAULT_NOTIFY;
  const from = process.env.SES_FROM_EMAIL?.trim() || DEFAULT_FROM;
  const subject = `New enterprise demo request — ${lead.fullName}`;
  const { text, html } = buildContent(lead, meta);

  if (emailProvider() === 'console') {
    console.log('[lead-email:console]', { to, from, subject, text });
    return;
  }

  const region = process.env.AWS_REGION ?? process.env.AWS_DEFAULT_REGION ?? 'ap-south-1';
  const ses = new SESClient({ region });

  await ses.send(
    new SendEmailCommand({
      Source: from,
      Destination: { ToAddresses: [to] },
      ReplyToAddresses: [lead.corporateEmail],
      Message: {
        Subject: { Data: subject, Charset: 'UTF-8' },
        Body: {
          Text: { Data: text, Charset: 'UTF-8' },
          Html: { Data: html, Charset: 'UTF-8' },
        },
      },
    })
  );
}
