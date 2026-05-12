/**
 * LUMIO AI — Three contexts, one system
 *
 * Context 1 PROSPECT (active)
 * lib/prompts/lumio-prospect.ts
 * Sales, qualification, audit nudges
 *
 * Context 2 AUDIT (coming soon)
 * lib/prompts/lumio-audit.ts
 * Encouragement, completion nudges
 *
 * Context 3 CLIENT DASHBOARD (coming soon — needs auth)
 * lib/prompts/lumio-client.ts
 * Operational support, automation management
 *
 * Same Claude API. Same intelligence.
 * Different context per use case.
 */
'use client';

import { useEffect, useRef } from 'react';
import Logo from '@/components/ui/Logo';
import { LumioOrb } from '@/components/ui/LumioOrb';
import { CHAT_TRUST } from '@/lib/data';
import { useChat } from '@/hooks/useChat';
import { OPENING_MESSAGE } from '@/lib/chat';
import ChatMessages from '@/components/ui/ChatMessages';
import ChatInput from '@/components/ui/ChatInput';

export default function AiPage() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, setMessages, input, setInput, isTyping, loading, sendMessage, retryLast } = useChat();

  useEffect(() => {
    const end = messagesEndRef.current;
    if (!end) return;
    const container = end.closest('.chat-messages') as HTMLElement | null;
    if (container) container.scrollTop = container.scrollHeight;
  }, [messages, isTyping]);

  useEffect(() => {
    const t = setTimeout(() => {
      setMessages(prev => prev.length === 0
        ? [{ role: 'assistant' as const, content: OPENING_MESSAGE, timestamp: new Date(), isOpening: true }]
        : prev);
    }, 600);
    return () => clearTimeout(t);
  }, [setMessages]);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); sendMessage(input); };

  return (
    <main className="bg-[#1A1814] flex flex-col overflow-hidden" style={{ height: '100dvh' }}>
      {/* Top bar */}
      <div className="relative z-10 px-6 pt-6 pb-3 flex items-center justify-between shrink-0">
        <a href="/"><Logo light /></a>
        <a href="/" className="text-sm text-white/40 hover:text-white/70 transition-colors">← Back to site</a>
      </div>

      {/* Header */}
      <div className="relative z-10 flex flex-col items-center text-center pb-5 px-4 shrink-0">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[140px] opacity-10"
          style={{ background: '#C4973F' }} />
        <LumioOrb size="lg" />
        <h1 className="font-display font-black text-4xl text-[#FFFDF8] mt-4 relative z-10">Lumio AI</h1>
        <p className="text-sm text-white/40 mt-1 relative z-10">Your clinic automation advisor</p>
      </div>

      {/* Chat panel */}
      <div className="relative z-10 flex-1 flex flex-col mx-auto w-full max-w-[800px] px-4 pb-4 min-h-0">
        <div className="flex-1 rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden flex flex-col min-h-0">
          <ChatMessages
            messages={messages}
            isTyping={isTyping}
            loading={loading}
            onOptionSelect={sendMessage}
            onRetry={retryLast}
            messagesEndRef={messagesEndRef}
          />
          <ChatInput
            input={input}
            onChange={setInput}
            onSubmit={handleSubmit}
            onPill={sendMessage}
            loading={loading}
          />
        </div>
        <div className="mt-3 flex flex-wrap justify-center gap-4 md:gap-8 shrink-0">
          {CHAT_TRUST.map(s => (
            <span key={s.text} className="flex items-center gap-2 text-xs text-white/30">
              <span>{s.icon}</span>{s.text}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
