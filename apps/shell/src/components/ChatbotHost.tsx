'use client';

import { useEffect, useState, type ComponentType } from 'react';
import { ChatbotFallback } from './ChatbotFallback';

type ChatbotProps = { apiBaseUrl?: string };

/**
 * Dynamically hydrates the Chatbot remote MFE via Module Federation.
 * Falls back to a local ChatbotFallback if the remote is unavailable.
 */
export function ChatbotHost() {
  const [Remote, setRemote] = useState<ComponentType<ChatbotProps> | null>(null);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
  const remoteUrl =
    process.env.NEXT_PUBLIC_CHATBOT_REMOTE_URL ||
    'http://localhost:5173/assets/remoteEntry.js';

  useEffect(() => {
    let cancelled = false;

    async function loadRemoteModule() {
      try {
        const { init, loadRemote } = await import('@module-federation/runtime');
        init({
          name: 'shanvaiShell',
          remotes: [
            {
              name: 'shanvaiChatbot',
              entry: remoteUrl,
              type: 'module',
            },
          ],
        });
        const mod = (await loadRemote('shanvaiChatbot/ChatbotRemote')) as {
          default: ComponentType<ChatbotProps>;
        } | null;
        if (!cancelled && mod?.default) {
          setRemote(() => mod.default);
        }
      } catch (err) {
        console.warn('[mfe] Chatbot remote unavailable — using local fallback', err);
      }
    }

    void loadRemoteModule();
    return () => {
      cancelled = true;
    };
  }, [remoteUrl]);

  if (Remote) {
    return <Remote apiBaseUrl={apiBaseUrl} />;
  }

  return <ChatbotFallback apiBaseUrl={apiBaseUrl} />;
}
