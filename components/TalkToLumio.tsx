'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isOpening?: boolean;
  isError?: boolean;
}

type ApiMessage = { role: 'user' | 'assistant'; content: string };

interface ContentBlock {
  type: 'markdown' | 'options';
  text?: string;
  items?: string[];
}

// ─── Markdown component map (module-level constant — no state deps) ───────────

const MD: Record<string, React.ComponentType<{ children?: React.ReactNode }>> = {
  p: ({ children }) => (
    <p className="mb-3 last:mb-0 text-sm leading-7 text-[#FFFDF8]/85">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-bold text-[#E8B44B]">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-[#FFFDF8]/70">{children}</em>
  ),
  ul: ({ children }) => (
    <ul className="mt-2 mb-3 space-y-1.5 list-none">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-2 mb-3 space-y-2 list-none">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="flex items-start gap-2 text-sm leading-6 text-[#FFFDF8]/75">
      <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#C4973F] flex-shrink-0" />
      <span>{children}</span>
    </li>
  ),
  h3: ({ children }) => (
    <h3 className="font-display font-bold text-lg text-[#FFFDF8] mb-2 mt-4 first:mt-0">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="font-semibold text-[#C4973F] text-xs uppercase tracking-widest mb-2 mt-3 first:mt-0">{children}</h4>
  ),
  hr: () => <hr className="border-white/10 my-4" />,
  code: ({ children }) => (
    <code className="bg-white/10 rounded px-1.5 py-0.5 text-xs text-[#E8B44B]">{children}</code>
  ),
};

// ─── Content parser: splits markdown into text blocks + option button groups ──

function parseContent(content: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  const lines = content.split('\n');
  const mdBuf: string[] = [];
  const listBuf: string[] = [];
  let prevHadQuestion = false;

  const flush = () => {
    if (!listBuf.length) return;
    const items = listBuf.map(s => s.replace(/\*\*/g, '').replace(/\*/g, '').trim()).filter(Boolean);
    const allShort = items.every(s => s.split(/\s+/).length <= 8);
    const isOptions = items.length >= 3 && items.length <= 6 && allShort && prevHadQuestion;

    if (isOptions) {
      const text = mdBuf.join('\n').trimEnd();
      if (text) blocks.push({ type: 'markdown', text });
      mdBuf.length = 0;
      blocks.push({ type: 'options', items });
    } else {
      listBuf.forEach(item => mdBuf.push(`- ${item}`));
    }
    listBuf.length = 0;
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (/^[-*]\s+/.test(trimmed)) {
      listBuf.push(trimmed.replace(/^[-*]\s+/, ''));
    } else {
      flush();
      mdBuf.push(line);
      if (trimmed) prevHadQuestion = trimmed.includes('?');
    }
  }
  flush();

  const remaining = mdBuf.join('\n').trim();
  if (remaining) blocks.push({ type: 'markdown', text: remaining });
  return blocks;
}

// ─── Constants ────────────────────────────────────────────────────────────────

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

// ─── Component ────────────────────────────────────────────────────────────────

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

  // Auto-scroll on new content
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, isTyping]);

  // Trigger once when section scrolls into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); observer.disconnect(); } },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Show opening message 600ms after visibility trigger
  useEffect(() => {
    if (!triggered || messages.length > 0) return;
    const t = setTimeout(() => {
      setMessages([{ role: 'assistant', content: OPENING_MESSAGE, timestamp: new Date(), isOpening: true }]);
    }, 600);
    return () => clearTimeout(t);
  }, [triggered, messages.length]);

  // Core streaming API caller
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
          setMessages(prev => [...prev, { role: 'assistant', content: snapshot, timestamp: new Date() }]);
        } else {
          setMessages(prev => {
            const u = [...prev];
            u[u.length - 1] = { ...u[u.length - 1], content: snapshot };
            return u;
          });
        }
      }

      const tail = decoder.decode();
      if (tail) {
        streamAccRef.current += tail;
        const snapshot = streamAccRef.current;
        setMessages(prev => {
          const u = [...prev];
          u[u.length - 1] = { ...u[u.length - 1], content: snapshot };
          return u;
        });
      }
    } catch {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: "Something went quiet on my end — try again in a moment.", timestamp: new Date(), isError: true },
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
      ...messages.filter(m => !m.isOpening && !m.isError).map(m => ({ role: m.role, content: m.content })),
      { role: 'user' as const, content: trimmed },
    ].slice(-20);

    await callAPI(history);
  }, [messages, loading, callAPI]);

  // Retry last failed request
  const retryLast = useCallback(() => {
    setMessages(prev => prev.filter(m => !m.isError));
    const history: ApiMessage[] = messages
      .filter(m => !m.isOpening && !m.isError)
      .slice(-20)
      .map(m => ({ role: m.role, content: m.content }));
    if (history.length > 0) callAPI(history);
  }, [messages, callAPI]);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); sendMessage(input); };
  const fmt = (d: Date) => d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  return (
    <section
      id="talk-to-lumio"
      ref={sectionRef}
      className="relative bg-[#1A1814] py-24 px-4 overflow-hidden"
    >
      {/* Ambient glow */}
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
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden flex flex-col h-[360px] md:h-[520px]">

          {/* Messages */}
          <div className="chat-messages flex-1 overflow-y-auto min-h-0 p-4 md:p-6 flex flex-col gap-4">
            {messages.map((msg, i) => {
              const isLast = i === messages.length - 1;
              const isStreaming = loading && isLast && msg.role === 'assistant';
              // Parse for option buttons only on the final settled AI message
              const blocks = (!loading && isLast && msg.role === 'assistant' && !msg.isError)
                ? parseContent(msg.content)
                : null;

              return (
                <div
                  key={i}
                  className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  {msg.role === 'user' ? (
                    /* ── User bubble ── */
                    <div
                      className="bg-[#C4973F] text-[#1A1814] text-sm font-semibold rounded-[1.2rem] rounded-tr-sm px-4 py-3 max-w-[80%]"
                      style={{ boxShadow: '0 4px 20px rgba(196,151,63,.2)' }}
                    >
                      {msg.content}
                    </div>
                  ) : (
                    /* ── AI bubble ── */
                    <div className="flex items-start gap-2.5 max-w-[92%]">
                      {/* Avatar */}
                      <div className="mt-0.5 w-[22px] h-[22px] rounded-full bg-[#C4973F]/15 border border-[#C4973F]/30 flex items-center justify-center shrink-0">
                        <span className="font-display font-black text-[9px] text-[#C4973F] leading-none">L</span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div
                          className={`rounded-[1.2rem] rounded-tl-sm border-l-2 px-5 py-4 ${
                            msg.isError
                              ? 'bg-white/[0.04] border-red-700/40'
                              : 'bg-white/[0.06] border-[#C4973F]/35'
                          }`}
                        >
                          {msg.isError ? (
                            <>
                              <p className="text-sm text-[#FFFDF8]/70 leading-7">{msg.content}</p>
                              <button
                                type="button"
                                onClick={retryLast}
                                className="mt-2 text-xs text-[#C4973F] hover:text-[#E8B44B] underline underline-offset-2 transition-colors"
                                style={{ touchAction: 'manipulation' }}
                              >
                                Retry →
                              </button>
                            </>
                          ) : blocks ? (
                            /* Settled message — render blocks with option buttons */
                            blocks.map((block, bi) =>
                              block.type === 'markdown' ? (
                                <ReactMarkdown key={bi} components={MD as never}>
                                  {block.text!}
                                </ReactMarkdown>
                              ) : (
                                <div key={bi} className="flex flex-wrap gap-2 mt-3 mb-1">
                                  {block.items!.map(opt => (
                                    <button
                                      key={opt}
                                      type="button"
                                      onClick={() => sendMessage(opt)}
                                      disabled={loading}
                                      className="rounded-full border border-white/20 bg-white/[0.04] px-4 py-2 text-sm text-[#FFFDF8]/75 transition-all duration-200 hover:border-[#C4973F]/60 hover:bg-[#C4973F]/10 hover:text-[#E8B44B] active:scale-95 disabled:opacity-40"
                                      style={{ minHeight: '40px', touchAction: 'manipulation' }}
                                    >
                                      {opt}
                                    </button>
                                  ))}
                                </div>
                              )
                            )
                          ) : (
                            /* Streaming or older message — plain ReactMarkdown */
                            <ReactMarkdown components={MD as never}>
                              {msg.content}
                            </ReactMarkdown>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <span className={`text-[10px] text-white/20 ${msg.role === 'user' ? 'pr-1' : 'pl-8'}`}>
                    {fmt(msg.timestamp)}
                  </span>
                </div>
              );
            })}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 w-[22px] h-[22px] rounded-full bg-[#C4973F]/15 border border-[#C4973F]/30 flex items-center justify-center shrink-0">
                  <span className="font-display font-black text-[9px] text-[#C4973F] leading-none">L</span>
                </div>
                <div className="bg-white/[0.06] border-l-2 border-[#C4973F]/35 rounded-[1.2rem] rounded-tl-sm px-5 py-3.5 flex items-center gap-1.5">
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

          {/* Input */}
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
