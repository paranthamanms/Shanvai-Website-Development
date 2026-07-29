import { NextResponse } from 'next/server';
import { sendLeadNotification } from '@/lib/email/send-lead-notification';
import { createLeadSchema } from '@/lib/lead-schema';

export const runtime = 'nodejs';

async function persistLead(
  lead: ReturnType<typeof createLeadSchema.parse>,
  ip?: string
): Promise<void> {
  const apiUrl = process.env.ANALYTICS_LEAD_API_URL?.replace(/\/$/, '');
  if (!apiUrl) return;

  const res = await fetch(`${apiUrl}/api/v1/leads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(ip ? { 'x-forwarded-for': ip } : {}),
    },
    body: JSON.stringify(lead),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const message = typeof body.error === 'string' ? body.error : `Lead API failed (${res.status})`;
    throw new Error(message);
  }
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = createLeadSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { error: first?.message ?? 'Validation failed' },
      { status: 400 }
    );
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    undefined;

  try {
    await sendLeadNotification(parsed.data, { ip });
  } catch (err) {
    console.error('[api/leads] email failed', err);
    return NextResponse.json(
      { error: 'Unable to send your request right now. Please email admin@shanvai.com directly.' },
      { status: 503 }
    );
  }

  try {
    await persistLead(parsed.data, ip);
  } catch (err) {
    // Email already sent — log persistence issues without failing the visitor.
    console.error('[api/leads] persistence failed', err);
  }

  return NextResponse.json(
    {
      ok: true,
      fullName: parsed.data.fullName,
      corporateEmail: parsed.data.corporateEmail,
      industrySector: parsed.data.industrySector,
    },
    { status: 201 }
  );
}
