'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const ease = [0.25, 0.1, 0.25, 1] as const;

const cardBase: React.CSSProperties = {
  background: '#1A1814',
  border: '1px solid rgba(196,151,63,0.15)',
  borderRadius: '1.5rem',
  padding: '1.5rem',
  maxWidth: '340px',
  margin: '0 auto',
  width: '100%',
};

const sans = 'var(--font-sans, Inter, sans-serif)';

// ─── Shared text pieces ───────────────────────────────────────────────────────

function PainLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: sans, fontWeight: 600, fontSize: '10px',
      textTransform: 'uppercase', letterSpacing: '0.15em',
      color: 'rgba(250,247,242,0.3)', margin: 0,
    }}>{children}</p>
  );
}

function SolutionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: sans, fontWeight: 600, fontSize: '10px',
      textTransform: 'uppercase', letterSpacing: '0.15em',
      color: '#C4973F', margin: '2rem 0 0',
    }}>{children}</p>
  );
}

function ProofStat({ number, label }: { number: string; label: string }) {
  return (
    <div style={{ marginTop: '2.5rem' }}>
      <div className="font-display" style={{
        fontSize: '56px', fontWeight: 900, color: '#C4973F', lineHeight: 1,
      }}>{number}</div>
      <p style={{
        fontFamily: sans, fontWeight: 500, fontSize: '13px',
        color: 'rgba(250,247,242,0.4)', marginTop: '0.4rem', lineHeight: 1.5,
      }}>{label}</p>
    </div>
  );
}

function GoldDivider() {
  return (
    <div aria-hidden="true" style={{
      width: '100%', height: '1px',
      background: 'rgba(196,151,63,0.1)',
    }} />
  );
}

// ─── Pair 1 visual: conversation mock ─────────────────────────────────────────

function ConversationMock({ active }: { active: boolean }) {
  const [phase, setPhase] = useState(0); // 0=client only, 1=typing, 2=lumi response

  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    const run = () => {
      if (cancelled) return;
      setPhase(0);
      setTimeout(() => { if (!cancelled) setPhase(1); }, 800);
      setTimeout(() => { if (!cancelled) setPhase(2); }, 1800);
    };
    run();
    const id = setInterval(run, 4000);
    return () => { cancelled = true; clearInterval(id); };
  }, [active]);

  return (
    <div style={{
      ...cardBase,
      aspectRatio: '4 / 5',
      minHeight: 420,
      maxHeight: 460,
      overflow: 'hidden',
      background: 'linear-gradient(180deg,#1A1814 0%,#14120F 100%)',
      padding: '1.25rem',
      display: 'flex',
      flexDirection: 'column',
      contain: 'layout paint',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: '1rem' }}>
        <div>
          <p style={{ fontFamily: sans, fontWeight: 700, fontSize: '12px', color: '#FFFDF8', margin: 0 }}>Instagram DM</p>
          <p style={{ fontFamily: sans, fontWeight: 500, fontSize: '11px', color: 'rgba(250,247,242,0.35)', margin: '2px 0 0' }}>11:42pm · New enquiry</p>
        </div>
        <span style={{ border: '1px solid rgba(196,151,63,.2)', borderRadius: 999, padding: '5px 8px', fontSize: 9, fontWeight: 700, letterSpacing: '.12em', color: '#C4973F' }}>LIVE</span>
      </div>

      {/* Client bubble */}
      <div style={{
        background: 'rgba(255,253,248,0.06)',
        borderRadius: '16px 16px 16px 4px',
        padding: '10px 14px',
        fontFamily: sans, fontWeight: 400, fontSize: '14px',
        color: '#FFFDF8', lineHeight: 1.55, maxWidth: '85%',
      }}>
        Hi, how much is lip filler? Do you have anything this week?
      </div>

      {/* Fixed response bay keeps the mobile showcase height stable during playback */}
      <div style={{ height: 122, marginTop: '0.75rem', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', overflow: 'hidden', flexShrink: 0 }}>
        {phase === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            style={{
              background: 'rgba(196,151,63,0.08)',
              border: '1px solid rgba(196,151,63,0.18)',
              borderRadius: '16px 16px 4px 16px',
              padding: '12px 16px',
              display: 'flex', gap: '5px', alignItems: 'center',
            }}
          >
            <span className="typing-dot" style={{ animationDelay: '0ms', width: 6, height: 6, borderRadius: '50%', background: '#C4973F', display: 'block', flexShrink: 0 }} />
            <span className="typing-dot" style={{ animationDelay: '200ms', width: 6, height: 6, borderRadius: '50%', background: '#C4973F', display: 'block', flexShrink: 0 }} />
            <span className="typing-dot" style={{ animationDelay: '400ms', width: 6, height: 6, borderRadius: '50%', background: '#C4973F', display: 'block', flexShrink: 0 }} />
          </motion.div>
        )}
        {phase === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'rgba(196,151,63,0.1)',
              border: '1px solid rgba(196,151,63,0.2)',
              borderRadius: '16px 16px 4px 16px',
              padding: '10px 14px',
              fontFamily: sans, fontWeight: 400, fontSize: '14px',
              color: '#FFFDF8', lineHeight: 1.55, maxWidth: '90%',
            }}
          >
            Hey lovely. Lip filler starts from £180. Thursday 2pm or Friday 11am is free — which works for you?
          </motion.div>
        )}
      </div>

      <p style={{
        fontFamily: sans, fontWeight: 500, fontSize: '12px',
        color: 'rgba(250,247,242,0.35)', marginTop: 'auto', textAlign: 'center',
      }}>
        Sent while the owner slept.
      </p>
    </div>
  );
}

// ─── Pair 2 visual: reminder sequence ────────────────────────────────────────

const REMINDERS = [
  { color: '#5B8A68', label: '48 hrs before', text: 'Hi Emma. Just a reminder about your appointment tomorrow at 2pm.', status: 'Delivered', statusColor: '#5B8A68' },
  { color: '#5B8A68', label: '24 hrs before', text: 'See you tomorrow. Reply YES to confirm or RESCHEDULE if you need to move it.', status: 'Confirmed', statusColor: '#5B8A68' },
  { color: '#C4973F', label: 'Day of · 9am', text: 'Morning. Your appointment is today at 2pm. We will see you soon.', status: 'Scheduled', statusColor: '#C4973F' },
];

function ReminderSequence() {
  return (
    <div style={{ ...cardBase, padding: '1.25rem' }}>
      <p style={{ fontFamily: sans, fontWeight: 500, fontSize: '12px', color: '#C4973F', marginBottom: '1.25rem' }}>
        Reminder sequence · Active
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
        {REMINDERS.map((r) => (
          <div key={r.label} style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: r.color, marginTop: 5, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontFamily: sans, fontWeight: 600, fontSize: '11px', color: 'rgba(250,247,242,0.5)', margin: '0 0 2px' }}>{r.label}</p>
              <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '13px', color: 'rgba(250,247,242,0.7)', lineHeight: 1.45, margin: '0 0 3px' }}>{r.text}</p>
              <p style={{ fontFamily: sans, fontWeight: 500, fontSize: '11px', color: r.statusColor, margin: 0 }}>{r.status}</p>
            </div>
          </div>
        ))}
      </div>
      <p style={{ fontFamily: sans, fontWeight: 500, fontSize: '13px', color: 'rgba(250,247,242,0.4)', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(196,151,63,0.1)' }}>
        Emma confirmed. No-show prevented.
      </p>
    </div>
  );
}

// ─── Pair 3 visual: client retention ─────────────────────────────────────────

const CLIENTS = [
  { initials: 'SC', name: 'Sophie Carter', ago: '7 weeks ago' },
  { initials: 'GM', name: 'Grace Mitchell', ago: '6 weeks ago' },
  { initials: 'OB', name: 'Olivia Bennett', ago: '8 weeks ago' },
  { initials: 'CH', name: 'Charlotte Hayes', ago: '6 weeks ago' },
];

function ClientRetention() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div style={{ ...cardBase, padding: '1.25rem' }}>
      <p style={{ fontFamily: sans, fontWeight: 500, fontSize: '12px', color: '#C4973F', marginBottom: '1.25rem' }}>
        Client retention · Live
      </p>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1rem' }}>
        <span className="font-display" style={{ fontSize: '22px', fontWeight: 700, color: '#FFFDF8' }}>4 clients</span>
        <span style={{ fontFamily: sans, fontWeight: 500, fontSize: '12px', color: 'rgba(250,247,242,0.4)' }}>need rebooking</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {CLIENTS.map((c, i) => (
          <div
            key={c.name}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
          >
            <div style={{
              width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
              background: 'rgba(196,151,63,0.12)', border: '1px solid rgba(196,151,63,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: sans, fontWeight: 600, fontSize: '10px', color: '#C4973F',
            }}>{c.initials}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontFamily: sans, fontWeight: 600, fontSize: '13px', color: '#FFFDF8', margin: 0 }}>{c.name}</p>
              <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '11px', color: 'rgba(250,247,242,0.35)', margin: 0 }}>{c.ago}</p>
            </div>
            <button
              type="button"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                background: hoveredIdx === i ? '#C4973F' : 'rgba(196,151,63,0.1)',
                border: '1px solid rgba(196,151,63,0.3)',
                borderRadius: '99px',
                padding: '4px 12px',
                fontFamily: sans, fontWeight: 600, fontSize: '11px',
                color: hoveredIdx === i ? '#1A1814' : '#C4973F',
                cursor: 'pointer',
                transition: 'all 200ms ease',
                whiteSpace: 'nowrap',
              }}
            >Send →</button>
          </div>
        ))}
      </div>
      <p style={{
        fontFamily: sans, fontWeight: 500, fontSize: '12px',
        color: 'rgba(250,247,242,0.35)', marginTop: '1.25rem', textAlign: 'center',
        paddingTop: '1rem', borderTop: '1px solid rgba(196,151,63,0.1)',
      }}>
        Lumi predicts 68% chance of recovering 2+ clients with a message tonight.
      </p>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function PainSolution() {
  const pair1Ref = useRef(null);
  const pair1InView = useInView(pair1Ref, { once: true, margin: '-80px' });

  const pair2Ref = useRef(null);
  const pair2InView = useInView(pair2Ref, { once: true, margin: '-80px' });

  const pair3Ref = useRef(null);
  const pair3InView = useInView(pair3Ref, { once: true, margin: '-80px' });

  return (
    <section style={{ backgroundColor: '#111009' }}>

      {/* ── PAIR 1 — MISSED ENQUIRIES ─────────────────────────────────────── */}
      <div id="pain-point-video" ref={pair1Ref} className="scroll-mt-6 px-6 py-16 md:px-16 md:py-24" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Text left */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <PainLabel>Missed response window</PainLabel>
            <h2 className="font-display" style={{
              fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 600,
              color: '#FFFDF8', lineHeight: 1.12, letterSpacing: '-0.02em', margin: '1rem 0 0',
            }}>
              Someone messaged at 9pm.<br />
              By morning they&apos;d booked<br />
              <span style={{ color: '#C4973F' }}>somewhere else.</span>
            </h2>
            <SolutionLabel>What Lumio does</SolutionLabel>
            <p style={{
              fontFamily: sans, fontWeight: 400, fontSize: '17px',
              color: 'rgba(250,247,242,0.6)', lineHeight: 1.8, maxWidth: '420px',
              margin: '1rem 0 0',
            }}>
              Lumi answers every enquiry within seconds — Instagram DMs, website forms, WhatsApp — at any hour. While you sleep, while you&apos;re with clients, while you&apos;re living your life.
            </p>
            <ProofStat number="99%" label={'of enquiries answered.\nEvery single one.'} />
          </motion.div>

          {/* Visual right */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
          >
            <ConversationMock active={pair1InView} />
          </motion.div>
        </div>
      </div>

      <GoldDivider />

      {/* ── PAIR 2 — NO SHOWS ────────────────────────────────────────────── */}
      <div ref={pair2Ref} className="px-6 py-16 md:px-16 md:py-24" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Text — first on mobile (top), second (right) on desktop */}
          <motion.div
            className="md:order-2"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <PainLabel>No-show leak</PainLabel>
            <h2 className="font-display" style={{
              fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 600,
              color: '#FFFDF8', lineHeight: 1.12, letterSpacing: '-0.02em', margin: '1rem 0 0',
            }}>
              Four no-shows last week.<br />
              Nearly a thousand pounds.<br />
              <span style={{ color: '#C4973F' }}>Just gone.</span>
            </h2>
            <SolutionLabel>What Lumio does</SolutionLabel>
            <p style={{
              fontFamily: sans, fontWeight: 400, fontSize: '17px',
              color: 'rgba(250,247,242,0.6)', lineHeight: 1.8, maxWidth: '420px',
              margin: '1rem 0 0',
            }}>
              Automated reminder sequences go out at exactly the right time. 48 hours before. 24 hours before. Morning of. Clients confirm, reschedule, or you get enough notice to refill the slot.
            </p>
            <ProofStat number="67%" label={'fewer no-shows.\nFrom week one.'} />
          </motion.div>

          {/* Visual — second on mobile (below), first (left) on desktop */}
          <motion.div
            className="md:order-1"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
          >
            <ReminderSequence />
          </motion.div>
        </div>
      </div>

      <GoldDivider />

      {/* ── PAIR 3 — LOST CLIENTS ─────────────────────────────────────────── */}
      <div ref={pair3Ref} className="px-6 py-16 md:px-16 md:py-24" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Text left */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <PainLabel>Rebooking gap</PainLabel>
            <h2 className="font-display" style={{
              fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 600,
              color: '#FFFDF8', lineHeight: 1.12, letterSpacing: '-0.02em', margin: '1rem 0 0',
            }}>
              Past clients are your<br />
              best leads. You know it.<br />
              <span style={{ color: '#C4973F' }}>You just never find the time.</span>
            </h2>
            <SolutionLabel>What Lumio does</SolutionLabel>
            <p style={{
              fontFamily: sans, fontWeight: 400, fontSize: '17px',
              color: 'rgba(250,247,242,0.6)', lineHeight: 1.8, maxWidth: '420px',
              margin: '1rem 0 0',
            }}>
              Lumi tracks every completed treatment. When a client is due to rebook, she reaches out in your voice — warm, personal, perfectly timed. Before they drift to a competitor.
            </p>
            <ProofStat number="£4,800" label={'recovered this week\nfrom lapsed clients alone.'} />
          </motion.div>

          {/* Visual right */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
          >
            <ClientRetention />
          </motion.div>
        </div>
      </div>

    </section>
  );
}
