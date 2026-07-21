import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';
import { pool } from './config/db';
import v1Routes from './routes/v1';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || env.corsOrigins.includes(origin) || env.nodeEnv === 'development') {
        callback(null, true);
        return;
      }
      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

app.get('/', (_req, res) => {
  res.json({
    name: 'Shanvai Analytics & Lead Service',
    version: '1.0.0',
    docs: '/api/v1/health',
  });
});

app.use('/api/v1', v1Routes);
app.use(errorHandler);

async function start() {
  try {
    await pool.query('SELECT 1');
    console.log('[db] Connected');
  } catch (err) {
    console.warn('[db] Initial connection failed — service will retry on requests', err);
  }

  app.listen(env.port, () => {
    console.log(`[api] Shanvai analytics-lead listening on :${env.port}`);
  });
}

start();

export default app;
