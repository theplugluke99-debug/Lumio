'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useChat } from '@/hooks/useChat';
import { OPENING_MESSAGE } from '@/lib/chat';
import { CHAT_TRUST } from '@/lib/data';
import ChatMessages from '@/components/ui/ChatMessages';
import ChatInput from '@/components/ui/ChatInput';
import LumiLens from '@/components/LumiLens';

const ease = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

export default function TalkToLumio() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-100px' });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
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

  const handleExpand = () => {
    setExpanded(true);
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  return (
    <section id="talk-to-lumio" ref={sectionRef} className="relative bg-[#1A1814] py-24 px-4 overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-[180px] opacity-[0.07]" style={{ background: '#C4973F' }} />

      <motion.div
        ref={headingRef}
        variants={stagger}
        initial="hidden"
        animate={headingInView ? 'visible' : 'hidden'}
        className="relative mx-auto max-w-3xl text-center mb-12"
      >
        <motion.span variants={fadeUp} style={{ fontFamily: 'var(--font-sans, Inter, sans-serif)', fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#C4973F', display: 'block' }}>Still have questions?</motion.span>
        <motion.h2 variants={fadeUp} className="mt-4 font-display" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#FFFDF8', lineHeight: 1.15 }}>Ask Lumi directly.</motion.h2>
        <motion.p variants={fadeUp} className="mt-4 max-w-sm mx-auto" style={{ fontFamily: 'var(--font-sans, Inter, sans-serif)', fontWeight: 400, fontSize: '16px', color: 'rgba(250,247,242,0.4)', lineHeight: 1.7 }}>
          No forms. No calls. Just ask.
        </motion.p>
      </motion.div>

      <div className="relative mx-auto max-w-[800px]">

        {/* Mobile collapsed CTA — shown until expanded */}
        {!expanded && (
          <div className="md:hidden rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 flex flex-col items-center gap-5">
            <div className="flex items-center gap-2.5">
              <LumiLens size={32} variant="light" animated />
              <div>
                <p className="text-sm font-semibold text-[#FFFDF8]">Lumio AI</p>
                <p className="text-xs text-white/40">Ready to answer your questions</p>
              </div>
            </div>
            <p className="text-sm text-[#FFFDF8]/60 text-center leading-relaxed px-2">
              Ask about automation for your clinic, pricing, what Lumio handles, or get a personal blueprint.
            </p>
            <button
              type="button"
              onClick={handleExpand}
              className="w-full rounded-full bg-[#C4973F] hover:bg-[#E8B44B] text-[#1A1814] font-bold text-sm px-6 py-3.5 transition-colors"
              style={{ touchAction: 'manipulation' }}
            >
              Chat with Lumio →
            </button>
            <div className="grid grid-cols-3 gap-2 w-full mt-1">
              {CHAT_TRUST.map(s => (
                <span key={s.text} className="flex items-center justify-center gap-1 text-[9px] text-white/30 text-center">
                  <span className="leading-snug">{s.text}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Full chat — always shown on desktop, shown on mobile only after expand */}
        <div className={`${expanded ? 'flex' : 'hidden'} md:flex rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden flex-col h-[480px] md:h-[520px]`}>
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

        {/* Trust strip — desktop always visible, mobile only when expanded */}
        <div className={`mt-5 ${expanded ? 'flex' : 'hidden'} md:flex flex-wrap justify-center gap-4 md:gap-8`}>
          {CHAT_TRUST.map(s => (
            <span key={s.text} className="text-[10px] md:text-xs text-white/30 text-center">{s.text}</span>
          ))}
        </div>

      </div>
    </section>
  );
}
