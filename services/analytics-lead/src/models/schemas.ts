import { z } from 'zod';

export const createLeadSchema = z.object({
  fullName: z.string().min(2).max(100),
  corporateEmail: z.string().email().max(150),
  industrySector: z.string().min(2).max(50),
  message: z.string().max(5000).optional().nullable(),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;

export const chatMessageSchema = z.object({
  sessionToken: z.string().min(8).max(255).optional(),
  message: z.string().min(1).max(4000),
});

export type ChatMessageInput = z.infer<typeof chatMessageSchema>;
