'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isOpening?: boolean;
  isError?: boolean;
}

type ApiMessage = { role: 'user' | 'assistant'; content: string };

const OPENING_MESSAGE =
  `Hi — I'm here to help you understand exactly what Lumio could do for your clinic.

You can ask me anything, get your revenue numbers calculated, or I can build you a personalised automation blueprint right now.

What's your biggest headache at the moment?`;

const PILLS = [
  { label: '📊 Get my revenue numbers', message: 'Get my revenue numbers' },
  { label: '📋 Build my automation blueprint', message: 'Build my automation blueprint' },
  { label: '💰 See my ROI projection', message: 'See my ROI projection' },
];

const TRUST = [
  { icon: '🔒', text: 'No data stored — conversations are private' },
  { icon: '⚡', text: 'Powered by Claude AI' },
  { icon: '💬', text: 'Real answers, not scripted responses' },
];

export default function TalkToLumio() {
  const sectionRef = useRef<HTMLElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const streamAccRef = useRef('');

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [triggered, setTriggered] = useState(false);

  // Scroll messages list to bottom whenever content changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, isTyping]);

  // IntersectionObserver — trigger once when section enters view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Show opening message 600ms after section becomes visible
  useEffect(() => {
    if (!triggered || messages.length > 0) return;
    const t = setTimeout(() => {
      setMessages([{
        role: 'assistant',
        content: OPENING_MESSAGE,
        timestamp: new Date(),
        isOpening: true,
      }]);
    }, 600);
    return () => clearTimeout(t);
  }, [triggered, messages.length]);

  // Core streaming API caller — does not add user message to state
  const callAPI = useCallback(async (history: ApiMessage[]) => {
    setIsTyping(true);
    setLoading(true);
    streamAccRef.current = '';

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok || !res.body) throw new Error('API error');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let firstChunk = true;

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;

        streamAccRef.current += decoder.decode(value, { stream: true });
        const snapshot = streamAccRef.current;

        if (firstChunk) {
          firstChunk = false;
          setIsTyping(false);
          setMessages(prev => [
            ...prev,
            { role: 'assistant', content: snapshot, timestamp: new Date() },
          ]);
        } else {
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = { ...updated[updated.length - 1], content: snapshot };
            return updated;
          });
        }
      }

      // Final flush
      const tail = decoder.decode();
      if (tail) {
        streamAccRef.current += tail;
        const snapshot = streamAccRef.current;
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...updated[updated.length - 1], content: snapshot };
          return updated;
        });
      }
    } catch {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "Something went quiet on my end — try again in a moment.",
          timestamp: new Date(),
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  }, []);

  // Send a new user message
  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: 'user', content: trimmed, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    const history: ApiMessage[] = [
      ...messages
        .filter(m => !m.isOpening && !m.isError)
        .map(m => ({ role: m.role, content: m.content })),
      { role: 'user' as const, content: trimmed },
    ].slice(-20);

    await callAPI(history);
  }, [messages, loading, callAPI]);

  // Retry the last failed message without re-adding the user message
  const retryLast = useCallback(() => {
    setMessages(prev => prev.filter(m => !m.isError));
    const history: ApiMessage[] = messages
      .filter(m => !m.isOpening && !m.isError)
      .slice(-20)
      .map(m => ({ role: m.role, content: m.content }));
    if (history.length > 0) callAPI(history);
  }, [messages, callAPI]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const fmt = (d: Date) => d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  return (
    <section
      id="talk-to-lumio"
      ref={sectionRef}
      className="relative bg-[#1A1814] py-24 px-4 overflow-hidden"
    >
      {/* Gold radial glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-[180px] opacity-[0.07]"
        style={{ background: '#C4973F' }}
      />

      {/* Header */}
      <div className="relative mx-auto max-w-3xl text-center mb-12">
        <span className="text-xs font-bold uppercase tracking-[.2em] text-[#C4973F]">AI ASSISTANT</span>
        <h2 className="mt-3 font-display font-black text-5xl md:text-7xl leading-[.9] tracking-[-0.03em] text-[#FFFDF8]">
          Talk to Lumio
        </h2>
        <p className="mt-4 text-[#8A8278] max-w-lg mx-auto text-base leading-relaxed">
          Ask anything. Get your personalised automation blueprint. See your numbers.
          No forms, no calls, no waiting.
        </p>
      </div>

      {/* Chat panel */}
      <div className="relative mx-auto max-w-[800px]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden flex flex-col h-[360px] md:h-[480px]">

          {/* Messages */}
          <div className="chat-messages flex-1 overflow-y-auto min-h-0 p-4 md:p-6 flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={
                    msg.role === 'user'
                      ? 'bg-[#C4973F] text-[#1A1814] text-sm font-semibold rounded-[1.2rem] rounded-tr-sm px-4 py-3 max-w-[80%]'
                      : `text-[#FFFDF8]/85 text-sm leading-7 rounded-[1.2rem] rounded-tl-sm px-4 py-3 max-w-[88%] whitespace-pre-wrap ${
                          msg.isError
                            ? 'bg-white/[0.04] border border-red-800/30'
                            : 'bg-white/[0.06]'
                        }`
                  }
                >
                  {msg.content}
                  {msg.isError && (
                    <button
                      type="button"
                      onClick={retryLast}
                      className="block mt-2 text-xs text-[#C4973F] hover:text-[#E8B44B] underline underline-offset-2 transition-colors"
                      style={{ touchAction: 'manipulation' }}
                    >
                      Retry →
                    </button>
                  )}
                </div>
                <span className="text-[10px] text-white/20 px-1">{fmt(msg.timestamp)}</span>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-start">
                <div className="bg-white/[0.06] rounded-[1.2rem] rounded-tl-sm px-4 py-3.5 flex items-center gap-1.5">
                  <span className="typing-dot w-2 h-2 rounded-full bg-[#C4973F] inline-block" />
                  <span className="typing-dot w-2 h-2 rounded-full bg-[#C4973F] inline-block" style={{ animationDelay: '0.2s' }} />
                  <span className="typing-dot w-2 h-2 rounded-full bg-[#C4973F] inline-block" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Capability pills */}
          <div className="px-4 md:px-5 pt-2 pb-2 flex flex-wrap gap-2 border-t border-white/[0.06]">
            {PILLS.map(pill => (
              <button
                key={pill.label}
                type="button"
                onClick={() => sendMessage(pill.message)}
                disabled={loading}
                className="rounded-full border border-white/10 bg-white/[0.05] text-xs text-white/55 px-3.5 hover:border-[#C4973F]/40 hover:text-[#C4973F] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
                style={{ minHeight: '34px', paddingTop: '7px', paddingBottom: '7px', touchAction: 'manipulation' }}
              >
                {pill.label}
              </button>
            ))}
          </div>

          {/* Input area */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-3 border-t border-white/10 bg-white/[0.04] px-4 md:px-5 py-4"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask me anything about your clinic..."
              disabled={loading}
              className="flex-1 min-w-0 bg-white/[0.06] border border-white/15 rounded-full px-5 text-[#FFFDF8] placeholder-white/30 outline-none transition-colors focus:border-[#C4973F]/40 disabled:opacity-50"
              style={{
                fontSize: '16px',
                WebkitTextSizeAdjust: '100%',
                minHeight: '44px',
                paddingTop: '10px',
                paddingBottom: '10px',
              }}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              aria-label="Send message"
              className="rounded-full bg-[#C4973F] hover:bg-[#E8B44B] flex items-center justify-center shrink-0 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ width: '44px', height: '44px', minWidth: '44px', touchAction: 'manipulation' }}
            >
              <span className="text-[#1A1814] font-bold text-base leading-none">→</span>
            </button>
          </form>
        </div>

        {/* Trust signals */}
        <div className="mt-5 flex flex-wrap justify-center gap-5 md:gap-8">
          {TRUST.map(s => (
            <span key={s.text} className="flex items-center gap-2 text-xs text-white/30">
              <span>{s.icon}</span>
              {s.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
