'use client';

import { useState, useEffect } from 'react';

const GOLD = '#C4973F';

// Simulated response variants based on what matters most to clients
const RESPONSES: Record<string, string> = {
  'Price and availability':
    '{{greeting}} Lip filler starts from £180 and we have Thursday 2pm and Friday 11am free this week. Which works best for you? x',
  'Safety and qualifications':
    "{{greeting}} I'm fully qualified and insured — happy to share all my certs. Lip filler starts from £180. Want to book a free consultation first? x",
  'Results and before/afters':
    "{{greeting}} I've got loads of gorgeous natural lip filler results to share — I'll DM you some! Starts from £180. Want to book a free chat? x",
  'Feeling comfortable and safe':
    "{{greeting}} Lip filler starts from £180 — I'd love to chat through what you're after so we get it perfect for you. We have Thursday 2pm and Friday 11am free. Which would work? x",
  'Speed of response':
    '{{greeting}} Replying straight away! Lip filler starts from £180 and we have Thursday 2pm and Friday 11am free this week. Want to grab a slot? x',
};

const FEELINGS = ['Safe', 'Excited', 'Cared for', 'Informed', 'Seen', 'Comfortable', 'Confident', 'Pampered', 'Heard'];

const INFO_COLS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 6.5h14v8.5H9l-4 3v-11.5Z" /><path d="M8 10h8M8 13h5" />
      </svg>
    ),
    title: 'Every enquiry',
    body: 'Every Instagram DM, website form, and WhatsApp message gets a response in your voice. Not a template. Your actual style.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />
      </svg>
    ),
    title: 'Rebooking messages',
    body: "When Lumi reaches out to past clients, it sounds exactly like you wrote it yourself.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6-5.4-2.8-5.4 2.8 1-6-4.4-4.3 6.1-.9L12 3Z" />
      </svg>
    ),
    title: 'Review requests',
    body: 'Even review requests go out in your tone. Clients feel the warmth. Reviews follow.',
  },
];

interface Props { darkMode: boolean }

export default function VoiceProfile({ darkMode: dm }: Props) {
  const [greeting, setGreeting] = useState('Hey lovely! 💛');
  const [sampleMsg, setSampleMsg] = useState(
    "Hey gorgeous! So excited you're thinking about lip filler — I'd love to chat through exactly what you're after first. What days work for you? ✨"
  );
  const [priority, setPriority] = useState('Feeling comfortable and safe');
  const [neverSay, setNeverSay] = useState(
    "Never sound corporate or salesy. Never use the word 'enquiry'. Don't be pushy about prices — share them warmly when asked."
  );
  const [feelings, setFeelings] = useState(['Safe', 'Cared for', 'Seen']);
  const [showTyping, setShowTyping] = useState(true);
  const [saved, setSaved] = useState(false);

  // Reset typing indicator whenever priority changes (preview updates)
  useEffect(() => {
    setShowTyping(true);
    const t = setTimeout(() => setShowTyping(false), 1500);
    return () => clearTimeout(t);
  }, [priority, greeting]);

  const liveResponse = (RESPONSES[priority] ?? RESPONSES['Feeling comfortable and safe'])
    .replace('{{greeting}}', greeting || 'Hey lovely! 💛');

  const toggleFeeling = (f: string) =>
    setFeelings(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);

  // ─── Style helpers ──────────────────────────────────────────────────────────

  const cardBg = dm ? 'rgba(255,253,248,0.04)' : '#FFFFFF';
  const cardBorder = dm ? 'rgba(255,253,248,0.08)' : 'rgba(26,24,20,0.08)';
  const text = dm ? '#FFFDF8' : '#1A1814';
  const textMuted = dm ? 'rgba(255,253,248,0.4)' : '#8A8278';
  const textSub = dm ? 'rgba(255,253,248,0.35)' : 'rgba(26,24,20,0.4)';
  const inputBg = dm ? 'rgba(255,253,248,0.06)' : '#FFFFFF';
  const inputBorder = dm ? 'rgba(255,253,248,0.12)' : 'rgba(26,24,20,0.12)';
  const secBg = dm ? 'rgba(255,253,248,0.03)' : '#F9EDE8';
  const borderSoft = dm ? 'rgba(255,253,248,0.06)' : 'rgba(26,24,20,0.06)';
  const bubbleBg = dm ? 'rgba(255,253,248,0.06)' : secBg;

  const inputStyle: React.CSSProperties = {
    width: '100%', borderRadius: 12, padding: '10px 14px', fontSize: 14,
    fontFamily: 'inherit', outline: 'none', resize: 'none' as const,
    backgroundColor: inputBg, border: `1px solid ${inputBorder}`, color: text,
    transition: 'border-color 200ms',
  };

  const questionCard = (num: string, question: string, sub: string, children: React.ReactNode) => (
    <div style={{
      background: cardBg, border: `1px solid ${cardBorder}`,
      borderRadius: '1rem', padding: '1.25rem 1.5rem', marginBottom: '1rem',
    }}>
      <div style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 700, fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.12em', color: GOLD, marginBottom: '0.4rem' }}>
        {num}
      </div>
      <div style={{ fontWeight: 600, fontSize: 14, color: text, marginBottom: '0.25rem', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
        {question}
      </div>
      <div style={{ fontWeight: 400, fontSize: 12, color: textSub, marginBottom: '0.75rem', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
        {sub}
      </div>
      {children}
    </div>
  );

  const PRIORITIES = ['Price and availability', 'Safety and qualifications', 'Results and before/afters', 'Feeling comfortable and safe', 'Speed of response'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: GOLD, marginBottom: '0.5rem' }}>
          My Style
        </p>
        <h2 style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 700, fontSize: 24, color: text, margin: '0 0 0.5rem', lineHeight: 1.2 }}>
          How Lumi sounds like you.
        </h2>
        <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 400, fontSize: 14, color: textMuted, lineHeight: 1.7, maxWidth: 520, margin: 0 }}>
          Lumi doesn&apos;t respond like a robot. She responds like you — because you told her how. Answer a few questions and Lumi learns your voice, your warmth, your style.
        </p>
      </div>

      {/* Two-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 2fr)', gap: '1.5rem', alignItems: 'start' }}>

        {/* ── Left column — Questions ─────────────────────────────────────── */}
        <div>
          {/* Q1 */}
          {questionCard('01', 'How do you greet your clients?', 'The first word matters most.', (
            <input
              type="text"
              value={greeting}
              onChange={e => setGreeting(e.target.value)}
              placeholder='e.g. "Hey lovely!" or "Hi there!"'
              style={inputStyle}
            />
          ))}

          {/* Q2 */}
          {questionCard('02', 'Paste a real message you\'ve sent to a client.', 'This teaches Lumi your exact writing style.', (
            <textarea
              rows={4}
              value={sampleMsg}
              onChange={e => setSampleMsg(e.target.value)}
              placeholder="Type or paste a message you'd normally send..."
              style={inputStyle}
            />
          ))}

          {/* Q3 */}
          {questionCard('03', "What matters most to your clients when they first get in touch?", '', (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {PRIORITIES.map(opt => {
                const selected = priority === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setPriority(opt)}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                      border: `1px solid ${selected ? 'rgba(196,151,63,0.5)' : cardBorder}`,
                      borderRadius: 99, padding: '8px 16px', fontSize: 13,
                      fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 500,
                      cursor: 'pointer', transition: 'all 200ms', textAlign: 'left' as const,
                      background: selected ? 'rgba(196,151,63,0.12)' : 'transparent',
                      color: selected ? GOLD : textMuted,
                    }}
                  >
                    <span style={{
                      width: 14, height: 14, borderRadius: '50%', border: `2px solid ${selected ? GOLD : borderSoft}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      {selected && <span style={{ width: 6, height: 6, borderRadius: '50%', background: GOLD, display: 'block' }} />}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
          ))}

          {/* Q4 */}
          {questionCard('04', "Is there anything you'd never say to a client?", "These become Lumi's rules.", (
            <textarea
              rows={3}
              value={neverSay}
              onChange={e => setNeverSay(e.target.value)}
              placeholder="e.g. Never sound corporate, never say 'enquiry', never be pushy about pricing..."
              style={inputStyle}
            />
          ))}

          {/* Q5 */}
          {questionCard('05', 'How do you want clients to feel after speaking to you?', '', (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {FEELINGS.map(f => {
                const on = feelings.includes(f);
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => toggleFeeling(f)}
                    style={{
                      border: `1px solid ${on ? 'rgba(196,151,63,0.5)' : cardBorder}`,
                      borderRadius: 99, padding: '6px 14px', fontSize: 13,
                      fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 500,
                      cursor: 'pointer', transition: 'all 200ms',
                      background: on ? 'rgba(196,151,63,0.15)' : 'transparent',
                      color: on ? GOLD : textMuted,
                    }}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          ))}

          {/* Save button */}
          <button
            type="button"
            onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
            style={{
              width: '100%', background: GOLD, color: '#1A1814', borderRadius: 99,
              padding: '12px', fontFamily: 'var(--font-inter), Inter, sans-serif',
              fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer',
              transition: 'background 200ms', marginBottom: '0.75rem',
            }}
          >
            {saved ? 'Saved ✓' : 'Save my style →'}
          </button>
          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 12, color: textSub, textAlign: 'center', margin: 0 }}>
            Lumi updates instantly. Test her response on the right.
          </p>
        </div>

        {/* ── Right column — Live preview ─────────────────────────────────── */}
        <div style={{ position: 'sticky', top: 100 }}>
          <div style={{
            background: cardBg, border: `1px solid ${cardBorder}`,
            borderRadius: '1.25rem', padding: '1.25rem',
          }}>
            {/* Header row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 600, fontSize: 14, color: text }}>
                Lumi in your voice
              </span>
              <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 500, fontSize: 11, color: '#5B8A68', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#5B8A68', display: 'inline-block' }} />
                Active
              </span>
            </div>

            {/* Enquiry label */}
            <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 12, color: textMuted, marginBottom: '0.75rem' }}>
              Incoming enquiry — Instagram · 10:47pm
            </p>

            {/* Client enquiry bubble */}
            <div style={{
              background: bubbleBg, borderRadius: '16px 16px 16px 4px',
              padding: '12px 16px', fontSize: 14, color: text,
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              maxWidth: '85%', lineHeight: 1.5, marginBottom: '0.75rem',
            }}>
              Hi! How much is lip filler and do you have anything available this week? x
            </div>

            {/* Lumi response */}
            <div>
              <p style={{
                fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 700, fontSize: 10,
                textTransform: 'uppercase', letterSpacing: '0.15em', color: GOLD, marginBottom: '0.5rem',
              }}>
                LUMI ✦
              </p>
              {showTyping ? (
                <div style={{
                  display: 'flex', gap: 4, padding: '12px 16px',
                  background: 'rgba(196,151,63,0.08)', border: '1px solid rgba(196,151,63,0.2)',
                  borderRadius: '16px 16px 4px 16px', width: 'fit-content', marginLeft: 'auto',
                  alignItems: 'center',
                }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} className="typing-dot" style={{
                      width: 6, height: 6, borderRadius: '50%', background: GOLD,
                      display: 'block', animationDelay: `${i * 0.2}s`,
                    }} />
                  ))}
                </div>
              ) : (
                <div style={{
                  background: 'rgba(196,151,63,0.08)', border: '1px solid rgba(196,151,63,0.2)',
                  borderRadius: '16px 16px 4px 16px', padding: '12px 16px', fontSize: 14,
                  color: text, fontFamily: 'var(--font-inter), Inter, sans-serif',
                  maxWidth: '85%', marginLeft: 'auto', textAlign: 'right', lineHeight: 1.5,
                }}>
                  {liveResponse}
                </div>
              )}
            </div>

            {/* "Why this works" note */}
            <div style={{
              background: secBg, borderLeft: `3px solid ${GOLD}`,
              borderRadius: '0.5rem', padding: '1rem 1.25rem', marginTop: '1rem',
            }}>
              <p style={{
                fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 600, fontSize: 11,
                textTransform: 'uppercase', letterSpacing: '0.1em', color: GOLD, marginBottom: '0.5rem',
              }}>
                Why this works
              </p>
              <ul style={{ margin: 0, paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {[
                  `Opened with "${greeting || 'your greeting'}" — her exact tone`,
                  'Warm and personal, never corporate',
                  priority === 'Price and availability'
                    ? 'Led with price and availability upfront'
                    : priority === 'Safety and qualifications'
                    ? 'Led with qualifications and trust signals'
                    : priority === 'Results and before/afters'
                    ? 'Led with results and social proof'
                    : priority === 'Speed of response'
                    ? 'Prioritised speed — instant, direct reply'
                    : 'Led with care and personalisation before price',
                  'Matched her conversational, warm sign-off',
                ].map((b, i) => (
                  <li key={i} style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 13, color: textMuted, lineHeight: 1.6 }}>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom info card ─────────────────────────────────────────────────── */}
      <div style={{
        background: secBg, border: `1px solid ${cardBorder}`,
        borderRadius: '1.25rem', padding: '2rem', marginTop: '1rem',
      }}>
        <h3 style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 700, fontSize: 16, color: text, marginBottom: '1.25rem' }}>
          How Lumi uses your style
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {INFO_COLS.map(col => (
            <div key={col.title}>
              <div style={{ color: GOLD, marginBottom: '0.5rem' }}>{col.icon}</div>
              <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 600, fontSize: 13, color: text, margin: '0 0 0.35rem' }}>
                {col.title}
              </p>
              <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 400, fontSize: 13, color: textMuted, margin: 0, lineHeight: 1.6 }}>
                {col.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
