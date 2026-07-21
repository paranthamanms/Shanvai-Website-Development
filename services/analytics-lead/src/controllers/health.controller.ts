import type { Request, Response, NextFunction } from 'express';
import { checkDbHealth } from '../config/db';
import { env } from '../config/env';

export async function getHealth(_req: Request, res: Response, next: NextFunction) {
  try {
    const db = await checkDbHealth();
    const status = db.ok ? 'ok' : 'degraded';
    const code = db.ok ? 200 : 503;
    return res.status(code).json({
      status,
      service: 'analytics-lead',
      environment: env.nodeEnv,
      timestamp: new Date().toISOString(),
      checks: {
        api: { ok: true },
        database: db,
      },
    });
  } catch (err) {
    return next(err);
  }
}
