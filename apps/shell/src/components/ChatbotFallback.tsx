'use client';

/**
 * Local fallback mirroring the Chatbot remote MFE when federation is offline.
 * Keep UX aligned with apps/chatbot/src/ChatbotRemote.tsx
 */
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BrandLogo } from './BrandLogo';

interface ChatbotFallbackProps {
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
  'What is Shanvai AIOps?',
  'How can BFSI institutions partner?',
];

const SESSION_KEY = 'shanvai_chat_session';

export function ChatbotFallback({
  apiBaseUrl = 'http://localhost:4000',
}: ChatbotFallbackProps) {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
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
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, open]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;
      setInput('');
      const optimisticId = `local-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        { id: optimisticId, senderType: 'user', messageText: trimmed },
      ]);
      setLoading(true);
      try {
        const sessionToken = localStorage.getItem(SESSION_KEY);
        const res = await fetch(`${apiBaseUrl}/api/v1/chat/message`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: trimmed, sessionToken: sessionToken || undefined }),
        });
        if (!res.ok) throw new Error('Chat request failed');
        const result = await res.json();
        localStorage.setItem(SESSION_KEY, result.sessionToken);
        setMessages((prev) => [
          ...prev.filter((m) => m.id !== optimisticId),
          ...result.messages.map(
            (m: { id: string; senderType: 'user' | 'assistant'; messageText: string }) => ({
              id: m.id,
              senderType: m.senderType,
              messageText: m.messageText,
            })
          ),
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            senderType: 'assistant',
            messageText: 'I could not reach the Shanvai API right now. Please try again shortly.',
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [apiBaseUrl, loading]
  );

  return (
    <div className="fixed bottom-5 right-5 z-[100] font-body text-sm">
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
            className="mb-3 flex h-[min(560px,70vh)] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-soft"
          >
            <header className="flex items-center justify-between border-b border-line bg-brandSoft px-4 py-3">
              <div className="flex items-center gap-2.5">
                <BrandLogo size={28} decorative className="shrink-0" />
                <div>
                  <p id={titleId} className="font-display text-base font-semibold text-inkStrong">
                    Shanvai Assistant
                  </p>
                  <p className="text-xs text-mist">Decision intelligence · BFSI</p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-1 text-mist transition hover:bg-brandWash hover:text-inkStrong"
              >
                Esc
              </button>
            </header>
            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-paper px-4 py-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.senderType === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 leading-relaxed ${
                      m.senderType === 'user'
                        ? 'bg-brand text-white'
                        : 'bg-surface text-inkStrong ring-1 ring-line'
                    }`}
                  >
                    {m.messageText}
                  </div>
                </div>
              ))}
              {loading && <p className="text-xs text-mist">Thinking…</p>}
            </div>
            <div className="space-y-2 border-t border-line bg-surface px-3 py-3">
              <div className="flex flex-wrap gap-1.5">
                {PRESET_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => void send(chip)}
                    className="rounded-full border border-brand/30 bg-brandSoft px-2.5 py-1 text-[11px] text-brand transition hover:bg-brandWash"
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
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Shanvai…"
                  disabled={loading}
                  aria-label="Message"
                  className="min-w-0 flex-1 rounded-xl border border-line bg-paper px-3 py-2 text-inkStrong outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="rounded-xl bg-brand px-3 py-2 font-medium text-white disabled:opacity-40"
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
        aria-label={open ? 'Close Shanvai assistant' : 'Open Shanvai assistant'}
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#FF9933]/50 bg-navy shadow-soft ring-2 ring-brand/25"
      >
        {open ? (
          <span className="font-display text-xl font-bold text-white">×</span>
        ) : (
          <BrandLogo size={34} decorative />
        )}
      </motion.button>
    </div>
  );
}
