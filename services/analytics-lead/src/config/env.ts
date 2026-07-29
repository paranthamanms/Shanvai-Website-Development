import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

function required(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 4000),
  databaseUrl: required(
    'DATABASE_URL',
    'postgresql://shanvai:shanvai@localhost:5433/shanvai'
  ),
  corsOrigins: (process.env.CORS_ORIGINS ?? 'http://localhost:3000')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean),
  aiProvider: (process.env.AI_PROVIDER ?? 'stub') as 'stub' | 'openai' | 'gemini',
  openaiApiKey: process.env.OPENAI_API_KEY ?? '',
  geminiApiKey: process.env.GEMINI_API_KEY ?? '',
  leadNotifyEmail: process.env.LEAD_NOTIFY_EMAIL ?? 'admin@shanvai.com',
  sesFromEmail: process.env.SES_FROM_EMAIL ?? 'noreply@shanvai.com',
  emailProvider: (process.env.EMAIL_PROVIDER ?? '') as '' | 'ses' | 'console',
  awsRegion: process.env.AWS_REGION ?? process.env.AWS_DEFAULT_REGION ?? 'ap-south-1',
};
