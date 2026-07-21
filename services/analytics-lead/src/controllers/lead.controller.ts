import type { Request, Response, NextFunction } from 'express';
import { createLeadSchema } from '../models/schemas';
import { createLead } from '../services/lead.service';

export async function postLead(req: Request, res: Response, next: NextFunction) {
  try {
    const input = createLeadSchema.parse(req.body);
    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      undefined;
    const lead = await createLead(input, ip);
    return res.status(201).json({
      id: lead.id,
      fullName: lead.full_name,
      corporateEmail: lead.corporate_email,
      industrySector: lead.industry_sector,
      createdAt: lead.created_at,
    });
  } catch (err) {
    return next(err);
  }
}
