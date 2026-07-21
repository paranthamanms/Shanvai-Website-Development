import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export interface ChatbotRemoteProps {
  apiBaseUrl?: string;
}

interface UiMessage {
  id: string;
  senderType: 'user' | 'assistant';
  messageText: string;
}

const PRESET_CHIPS = [
  'What is Shanvai Decision Core?',
  'Tell me about Shanvai Credit Bureau',
  'How can BFSI institutions partner?',
];

const SESSION_KEY = 'shanvai_chat_session';

async function postChatMessage(
  apiBaseUrl: string,
  message: string,
  sessionToken?: string | null
) {
  const res = await fetch(`${apiBaseUrl}/api/v1/chat/message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, sessionToken: sessionToken || undefined }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Chat request failed (${res.status})`);
  }
  return res.json() as Promise<{
    sessionToken: string;
    reply: string;
    messages: Array<{
      id: string;
      senderType: 'user' | 'assistant';
      messageText: string;
    }>;
  }>;
}

export default function ChatbotRemote({
  apiBaseUrl = 'http://localhost:4000',
}: ChatbotRemoteProps) {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<UiMessage[]>([
    {
      id: 'welcome',
      senderType: 'assistant',
      messageText:
        'Hello — I am the Shanvai assistant. Ask about Decision Core, Credit Bureau, or BFSI partnerships.',
    },
  ]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, open]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      setError(null);
      setInput('');
      const optimisticId = `local-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        { id: optimisticId, senderType: 'user', messageText: trimmed },
      ]);
      setLoading(true);

      try {
        const sessionToken = localStorage.getItem(SESSION_KEY);
        const result = await postChatMessage(apiBaseUrl, trimmed, sessionToken);
        localStorage.setItem(SESSION_KEY, result.sessionToken);
        setMessages((prev) => [
          ...prev.filter((m) => m.id !== optimisticId),
          ...result.messages.map((m) => ({
            id: m.id,
            senderType: m.senderType,
            messageText: m.messageText,
          })),
        ]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to reach assistant');
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            senderType: 'assistant',
            messageText:
              'I could not reach the Shanvai API right now. Please try again in a moment.',
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [apiBaseUrl, loading]
  );

  return (
    <div className="shanvai-chatbot fixed bottom-5 right-5 z-[100] font-body text-sm">
      <AnimatePresence>
        {open && (
          <motion.section
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="mb-3 flex h-[min(560px,70vh)] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0E1628] shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
          >
            <header className="flex items-center justify-between border-b border-white/10 bg-[#0A1220] px-4 py-3">
              <div>
                <p id={titleId} className="font-display text-base font-semibold text-white">
                  Shanvai Assistant
                </p>
                <p className="text-xs text-[#9BB0C9]">Decision intelligence · BFSI</p>
              </div>
              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-1 text-[#9BB0C9] transition hover:bg-white/5 hover:text-white"
              >
                Esc
              </button>
            </header>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.senderType === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 leading-relaxed ${
                      m.senderType === 'user'
                        ? 'bg-[#1AE0FF] text-[#041018]'
                        : 'bg-white/5 text-[#E8EEF7] ring-1 ring-white/10'
                    }`}
                  >
                    {m.messageText}
                  </div>
                </div>
              ))}
              {loading && (
                <p className="text-xs text-[#9BB0C9]" aria-live="polite">
                  Thinking…
                </p>
              )}
              {error && (
                <p className="text-xs text-red-300" role="alert">
                  {error}
                </p>
              )}
            </div>

            <div className="space-y-2 border-t border-white/10 px-3 py-3">
              <div className="flex flex-wrap gap-1.5">
                {PRESET_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => send(chip)}
                    className="rounded-full border border-[#1AE0FF]/35 bg-[#1AE0FF]/5 px-2.5 py-1 text-[11px] text-[#B8F7FF] transition hover:border-[#1AE0FF]/70 hover:bg-[#1AE0FF]/15"
                  >
                    {chip}
                  </button>
                ))}
              </div>
              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  void send(input);
                }}
              >
                <label className="sr-only" htmlFor="shanvai-chat-input">
                  Message
                </label>
                <input
                  id="shanvai-chat-input"
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Shanvai…"
                  disabled={loading}
                  className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#070B14] px-3 py-2 text-[#E8EEF7] outline-none ring-[#1AE0FF]/0 transition placeholder:text-[#6B7F99] focus:border-[#1AE0FF]/50 focus:ring-2 focus:ring-[#1AE0FF]/25"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="rounded-xl bg-[#1AE0FF] px-3 py-2 font-medium text-[#041018] transition enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Send
                </button>
              </form>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-expanded={open}
        aria-controls={open ? undefined : undefined}
        aria-label={open ? 'Close Shanvai assistant' : 'Open Shanvai assistant'}
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#1AE0FF] text-[#041018] shadow-[0_12px_40px_rgba(26,224,255,0.35)]"
      >
        <span className="font-display text-lg font-bold">{open ? '×' : 'AI'}</span>
      </motion.button>
    </div>
  );
}
