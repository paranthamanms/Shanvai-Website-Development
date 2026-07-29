import { z } from 'zod';

export const createLeadSchema = z.object({
  fullName: z.string().min(2, 'Enter your full name').max(100),
  corporateEmail: z.string().email('Use a valid corporate email').max(150),
  industrySector: z.string().min(2, 'Select an industry sector').max(50),
  message: z.string().max(5000).optional(),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
