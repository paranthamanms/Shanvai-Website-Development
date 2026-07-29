import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import type { CreateLeadInput } from '../models/schemas';

const DEFAULT_NOTIFY = 'admin@shanvai.com';
const DEFAULT_FROM = 'admin@shanvai.com';

function provider(): 'ses' | 'console' {
  const configured = process.env.EMAIL_PROVIDER?.toLowerCase();
  if (configured === 'ses' || configured === 'console') return configured;
  return process.env.NODE_ENV === 'production' ? 'ses' : 'console';
}

export async function sendLeadNotificationEmail(
  lead: CreateLeadInput,
  meta?: { ip?: string }
): Promise<void> {
  const to = process.env.LEAD_NOTIFY_EMAIL?.trim() || DEFAULT_NOTIFY;
  const from = process.env.SES_FROM_EMAIL?.trim() || DEFAULT_FROM;
  const subject = `New enterprise demo request — ${lead.fullName}`;
  const lines = [
    'A new enterprise demo request was submitted.',
    '',
    `Name: ${lead.fullName}`,
    `Corporate email: ${lead.corporateEmail}`,
    `Industry sector: ${lead.industrySector}`,
    `Message: ${lead.message?.trim() || '(none)'}`,
  ];
  if (meta?.ip) lines.push(`IP address: ${meta.ip}`);
  const text = lines.join('\n');

  if (provider() === 'console') {
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
        Body: { Text: { Data: text, Charset: 'UTF-8' } },
      },
    })
  );
}
