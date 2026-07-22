import { v4 as uuidv4 } from 'uuid';
import { query } from '../config/db';
import { env } from '../config/env';
import type { ChatMessage, ChatSession } from '../models/types';

const RULE_RESPONSES: Array<{ match: RegExp; reply: string }> = [
  {
    match: /decision\s*core/i,
    reply:
      'Shanvai Decision Core is our real-time decisioning engine for BFSI — policy orchestration, risk scoring, and explainable outcomes across lending, onboarding, and fraud workflows.',
  },
  {
    match: /credit\s*bureau/i,
    reply:
      'Shanvai Credit Bureau delivers multi-source credit intelligence with ingestion pipelines, bureau analytics, and partner-ready APIs so institutions can underwrite with higher confidence.',
  },
  {
    match: /aiops|ai\s*ops|operations/i,
    reply:
      'Shanvai AIOps brings intelligent operations to BFSI platforms — anomaly detection, runbook automation, service-health insights, and AI-assisted incident response so Decision Core and Credit Bureau stay reliable at scale.',
  },
  {
    match: /partner|bfsi|institut/i,
    reply:
      'BFSI institutions partner with Shanvai through API integration, pilot programs, and co-built decision journeys. Share your corporate email via the contact form and our solutions team will follow up.',
  },
];

const DEFAULT_REPLY =
  'Thanks for reaching out to Shanvai Technologies. Ask about Decision Core, Credit Bureau, AIOps, or BFSI partnerships — or leave your details on the contact form for a tailored demo.';

async function getOrCreateSession(sessionToken?: string): Promise<ChatSession> {
  if (sessionToken) {
    const existing = await query<ChatSession>(
      'SELECT * FROM chat_sessions WHERE session_token = $1',
      [sessionToken]
    );
    if (existing.rows[0]) return existing.rows[0];
  }

  const token = sessionToken ?? uuidv4();
  const created = await query<ChatSession>(
    `INSERT INTO chat_sessions (session_token) VALUES ($1) RETURNING *`,
    [token]
  );
  return created.rows[0];
}

async function saveMessage(
  sessionId: string,
  senderType: 'user' | 'assistant',
  messageText: string
): Promise<ChatMessage> {
  const result = await query<ChatMessage>(
    `INSERT INTO chat_messages (session_id, sender_type, message_text)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [sessionId, senderType, messageText]
  );
  return result.rows[0];
}

function stubReply(userMessage: string): string {
  for (const rule of RULE_RESPONSES) {
    if (rule.match.test(userMessage)) return rule.reply;
  }
  return DEFAULT_REPLY;
}

async function generateAiReply(userMessage: string): Promise<string> {
  if (env.aiProvider === 'openai' && env.openaiApiKey) {
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content:
                'You are Shanvai Technologies\' assistant. Be concise, enterprise-ready, and focus on Decision Core, Credit Bureau, and BFSI partnerships.',
            },
            { role: 'user', content: userMessage },
          ],
          max_tokens: 300,
        }),
      });
      if (res.ok) {
        const data = (await res.json()) as {
          choices?: Array<{ message?: { content?: string } }>;
        };
        const content = data.choices?.[0]?.message?.content?.trim();
        if (content) return content;
      }
    } catch (err) {
      console.error('[chat] OpenAI fallback to stub', err);
    }
  }

  if (env.aiProvider === 'gemini' && env.geminiApiKey) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${env.geminiApiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userMessage }] }],
        }),
      });
      if (res.ok) {
        const data = (await res.json()) as {
          candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
        };
        const content = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (content) return content;
      }
    } catch (err) {
      console.error('[chat] Gemini fallback to stub', err);
    }
  }

  return stubReply(userMessage);
}

export async function handleChatMessage(input: {
  message: string;
  sessionToken?: string;
}) {
  const session = await getOrCreateSession(input.sessionToken);
  const userMsg = await saveMessage(session.id, 'user', input.message);
  const replyText = await generateAiReply(input.message);
  const assistantMsg = await saveMessage(session.id, 'assistant', replyText);

  return {
    sessionToken: session.session_token,
    messages: [
      {
        id: userMsg.id,
        senderType: userMsg.sender_type,
        messageText: userMsg.message_text,
        timestamp: userMsg.timestamp,
      },
      {
        id: assistantMsg.id,
        senderType: assistantMsg.sender_type,
        messageText: assistantMsg.message_text,
        timestamp: assistantMsg.timestamp,
      },
    ],
    reply: replyText,
  };
}
