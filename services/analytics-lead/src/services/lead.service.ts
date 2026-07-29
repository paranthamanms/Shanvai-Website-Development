import { query } from '../config/db';
import type { CreateLeadInput } from '../models/schemas';
import type { Lead } from '../models/types';
import { sendLeadNotificationEmail } from './email.service';

export async function createLead(
  input: CreateLeadInput,
  ipAddress?: string
): Promise<Lead> {
  const result = await query<Lead>(
    `INSERT INTO leads (full_name, corporate_email, industry_sector, message, ip_address)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [
      input.fullName,
      input.corporateEmail.toLowerCase(),
      input.industrySector,
      input.message ?? null,
      ipAddress ?? null,
    ]
  );
  const lead = result.rows[0];
  await sendLeadNotificationEmail(input, { ip: ipAddress });
  return lead;
}
