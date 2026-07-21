import type { Request, Response, NextFunction } from 'express';
import { chatMessageSchema } from '../models/schemas';
import { handleChatMessage } from '../services/chat.service';

export async function postChatMessage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const input = chatMessageSchema.parse(req.body);
    const result = await handleChatMessage({
      message: input.message,
      sessionToken: input.sessionToken,
    });
    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
}
