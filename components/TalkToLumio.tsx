'use client';

import { useEffect, useRef } from 'react';
import { useChat } from '@/hooks/useChat';
import { OPENING_MESSAGE } from '@/lib/chat';
import { CHAT_TRUST } from '@/lib/data';
import ChatMessages from '@/components/ui/ChatMessages';
import ChatInput from '@/components/ui/ChatInput';

export default function TalkToLumio() {
  const sectionRef = useRef<HTMLElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, setMessages, input, setInput, isTyping, loading, sendMessage, retryLast } = useChat();

  // Scroll chat container only — never scrolls the page
  useEffect(() => {
    const end = messagesEndRef.current;
    if (!end) return;
    const container = end.closest('.chat-messages') as HTMLElement | null;
    if (container) container.scrollTop = container.scrollHeight;
  }, [messages, isTyping]);

  // Trigger opening message once when section scrolls into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        setTimeout(() => {
          setMessages(prev =>
            prev.length === 0
              ? [{ role: 'assistant', content: OPENING_MESSAGE, timestamp: new Date(), isOpening: true }]
              : prev
          );
        }, 600);
      }
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [setMessages]);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); sendMessage(input); };

  return (
    <section id="talk-to-lumio" ref={sectionRef} className="relative bg-[#1A1814] py-24 px-4 overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-[180px] opacity-[0.07]" style={{ background: '#C4973F' }} />

      <div className="relative mx-auto max-w-3xl text-center mb-12">
        <span className="text-xs font-bold uppercase tracking-[.2em] text-[#C4973F]">AI ASSISTANT</span>
        <h2 className="mt-3 font-display font-black text-5xl md:text-7xl leading-[.9] tracking-[-0.03em] text-[#FFFDF8]">Talk to Lumio</h2>
        <p className="mt-4 text-[#8A8278] max-w-lg mx-auto text-base leading-relaxed">
          Ask anything. Get your personalised automation blueprint. See your numbers. No forms, no calls, no waiting.
        </p>
      </div>

      <div className="relative mx-auto max-w-[800px]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden flex flex-col h-[360px] md:h-[520px]">
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

        <div className="mt-5 flex flex-wrap justify-center gap-5 md:gap-8">
          {CHAT_TRUST.map(s => (
            <span key={s.text} className="flex items-center gap-2 text-xs text-white/30">
              <span>{s.icon}</span>{s.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
