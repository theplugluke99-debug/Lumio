'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef, useCallback } from 'react'

// ─── Constants ───────────────────────────────────────────────────────────────

const GOLD = '#C4973F'
const CREAM = '#FFFDF8'
const BG = '#0A0907'
const CHARCOAL = '#1A1814'

const DURATIONS = [4000, 4000, 4000, 5000, 5000, 5000, 4000, 4000, 5000, 6000]
const TOTAL = DURATIONS.reduce((a, b) => a + b, 0)
const CUM = DURATIONS.map((_, i) => DURATIONS.slice(0, i + 1).reduce((a, b) => a + b, 0))

// ─── Types ────────────────────────────────────────────────────────────────────

interface SceneProps { isMobile: boolean }

// ─── Shared layout helpers ────────────────────────────────────────────────────

const fill: React.CSSProperties = {
  position: 'absolute',
  top: 0, right: 0, bottom: 0, left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const sceneV = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useCountUp(to: number, ms: number, active: boolean) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!active) { setN(0); return }
    const start = Date.now()
    const id = setInterval(() => {
      const t = Date.now() - start
      if (t >= ms) { setN(to); clearInterval(id); return }
      setN(Math.round(to * t / ms))
    }, 16)
    return () => clearInterval(id)
  }, [active, to, ms])
  return n
}

// ─── Micro-components ─────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div style={{
      display: 'flex', gap: 4, padding: '12px 16px',
      background: 'rgba(255,253,248,0.08)',
      borderRadius: '18px 18px 18px 4px',
      width: 'fit-content', alignItems: 'center',
    }}>
      {[0, 1, 2].map(i => (
        <span key={i} className="typing-dot" style={{
          width: 6, height: 6, borderRadius: '50%',
          background: CREAM, display: 'block',
          animationDelay: `${i * 0.2}s`,
        }} />
      ))}
    </div>
  )
}

function Arc({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 200 120" width={size} height={size * 0.6}>
      <path d="M20 95 Q100 15 180 95" stroke={GOLD} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

// ─── Scene 0 — Opening ────────────────────────────────────────────────────────

function Scene0({ isMobile }: SceneProps) {
  return (
    <motion.div variants={sceneV} initial="initial" animate="animate" exit="exit"
      style={{ ...fill, flexDirection: 'column' }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 0.3 }}>
        <Arc size={isMobile ? 140 : 200} />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.8 }}
        style={{
          fontFamily: 'var(--font-display), serif', fontWeight: 700, fontStyle: 'italic',
          fontSize: isMobile ? '42px' : '56px', color: CREAM,
          letterSpacing: '0.02em', margin: 0, lineHeight: 1,
        }}>
        Lumio
      </motion.p>
    </motion.div>
  )
}

// ─── Scene 1 — With a client ──────────────────────────────────────────────────

function Scene1({ isMobile }: SceneProps) {
  return (
    <motion.div variants={sceneV} initial="initial" animate="animate" exit="exit"
      style={{ ...fill, padding: '0 1.5rem' }}>
      <motion.p
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontFamily: 'var(--font-display), serif', fontWeight: 400, fontStyle: 'italic',
          fontSize: isMobile ? '32px' : 'clamp(32px, 5vw, 64px)',
          color: 'rgba(250,247,242,0.9)', textAlign: 'center', margin: 0, maxWidth: '90vw',
        }}>
        You&rsquo;re with a client.
      </motion.p>
    </motion.div>
  )
}

// ─── Scene 2 — Notifications ──────────────────────────────────────────────────

const PILLS = [
  { text: 'Instagram · New enquiry', gold: false },
  { text: 'Instagram · New enquiry', gold: false },
  { text: 'Missed call · Unknown', gold: false },
  { text: '3 enquiries. No response yet.', gold: true },
]

function Scene2({ isMobile }: SceneProps) {
  return (
    <motion.div variants={sceneV} initial="initial" animate="animate" exit="exit"
      style={{ ...fill, flexDirection: 'column', padding: '0 1.5rem' }}>
      {PILLS.map((p, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.6 + 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: p.gold ? 'rgba(196,151,63,0.08)' : 'rgba(255,253,248,0.05)',
            border: `1px solid ${p.gold ? 'rgba(196,151,63,0.3)' : 'rgba(255,253,248,0.1)'}`,
            borderRadius: 12,
            padding: isMobile ? '12px 16px' : '12px 20px',
            fontSize: isMobile ? 14 : 15,
            color: p.gold ? GOLD : 'rgba(250,247,242,0.6)',
            fontFamily: 'var(--font-inter), Inter, sans-serif',
            width: isMobile ? '90vw' : 'auto',
            maxWidth: isMobile ? '90vw' : 320,
            margin: isMobile ? '6px 0' : '8px auto',
            textAlign: 'center' as const,
          }}>
          {p.text}
        </motion.div>
      ))}
    </motion.div>
  )
}

// ─── Scene 3 — Dashboard ──────────────────────────────────────────────────────

const ROWS = [
  { time: '09:32', title: 'Instagram DM answered' },
  { time: '09:28', title: 'Booking confirmed by AI' },
  { time: '09:15', title: 'Appointment reminder sent' },
  { time: '09:02', title: 'Review requested' },
]

function Scene3({ isMobile }: SceneProps) {
  return (
    <motion.div variants={sceneV} initial="initial" animate="animate" exit="exit"
      style={{ ...fill, flexDirection: 'column', padding: '0 1.5rem' }}>
      <motion.p
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        style={{
          fontFamily: 'var(--font-display), serif', fontWeight: 400,
          fontSize: isMobile ? '18px' : 'clamp(20px, 3vw, 36px)',
          color: 'rgba(250,247,242,0.4)', textAlign: 'center', margin: '0 0 0.5rem', maxWidth: '90vw',
        }}>
        While you were with your client...
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.7 }}
        style={{
          fontFamily: 'var(--font-display), serif', fontWeight: 400,
          fontSize: isMobile ? '22px' : 'clamp(24px, 3.5vw, 44px)',
          color: CREAM, textAlign: 'center', margin: '0 0 1.5rem', maxWidth: '90vw',
        }}>
        Lumio was working.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: CREAM, borderRadius: '1.5rem',
          padding: isMobile ? '1rem' : '1.25rem',
          maxWidth: isMobile ? '90vw' : 420, width: '100%',
        }}>
        {ROWS.map((row, i) => (
          <motion.div key={i}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 2.4 + i * 0.3, duration: 0.4 }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: isMobile ? '0.5rem 0' : '0.6rem 0',
              borderBottom: i < ROWS.length - 1 ? '1px solid rgba(26,24,20,0.06)' : 'none',
            }}>
            <span style={{
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              fontSize: isMobile ? 11 : 12, color: GOLD, fontWeight: 400, minWidth: isMobile ? 36 : 40,
            }}>{row.time}</span>
            <span style={{
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              fontSize: isMobile ? 12 : 13, color: CHARCOAL, fontWeight: 500, flex: 1, padding: '0 0.75rem',
            }}>{row.title}</span>
            <span style={{
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              fontSize: isMobile ? 11 : 12, color: '#5B8A68', fontWeight: 500,
            }}>Done</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

// ─── Scene 4 — Conversation ───────────────────────────────────────────────────

function Scene4({ isMobile }: SceneProps) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const ts = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 800),
      setTimeout(() => setStep(3), 1500),
      setTimeout(() => setStep(4), 2100),
      setTimeout(() => setStep(5), 2700),
      setTimeout(() => setStep(6), 3400),
      setTimeout(() => setStep(7), 4000),
    ]
    return () => ts.forEach(clearTimeout)
  }, [])

  const bMax = isMobile ? '75vw' : '280px'
  const rStyle: React.CSSProperties = {
    background: 'rgba(196,151,63,0.15)', borderRadius: '18px 18px 4px 18px',
    padding: '12px 16px', fontFamily: 'var(--font-inter), Inter, sans-serif',
    fontSize: 14, color: CREAM, maxWidth: bMax, marginLeft: 'auto',
    textAlign: 'right' as const, lineHeight: 1.5,
  }
  const lStyle: React.CSSProperties = {
    background: 'rgba(255,253,248,0.08)', borderRadius: '18px 18px 18px 4px',
    padding: '12px 16px', fontFamily: 'var(--font-inter), Inter, sans-serif',
    fontSize: 14, color: CREAM, maxWidth: bMax, lineHeight: 1.5,
  }

  const msg = (s: React.CSSProperties, text: string, minStep: number) =>
    step >= minStep ? (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
        <div style={s}>{text}</div>
      </motion.div>
    ) : null

  return (
    <motion.div variants={sceneV} initial="initial" animate="animate" exit="exit"
      style={{ ...fill, flexDirection: 'column', padding: '0 1.5rem' }}>
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 12,
        width: '100%', maxWidth: isMobile ? '90vw' : 340,
      }}>
        {msg(rStyle, 'Hi, how much is lip filler? Do you have anything this week?', 1)}
        <AnimatePresence>
          {step === 2 && (
            <motion.div key="t1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <TypingDots />
            </motion.div>
          )}
        </AnimatePresence>
        {msg(lStyle, 'Hi! Lip filler starts from £180. We have Thursday 2pm and Friday 11am available. Which works for you? ✦', 3)}
        {msg(rStyle, 'Friday 11am perfect!', 4)}
        <AnimatePresence>
          {step === 5 && (
            <motion.div key="t2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <TypingDots />
            </motion.div>
          )}
        </AnimatePresence>
        {msg(lStyle, 'Booked! Confirmation sent. See you Friday ✦', 6)}
        {step >= 7 && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            style={{
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              fontSize: isMobile ? 13 : 12, color: 'rgba(250,247,242,0.3)',
              fontStyle: 'italic', textAlign: 'center', margin: '0.5rem 0 0', lineHeight: 1.6,
            }}>
            This conversation happened while the owner was asleep.
          </motion.p>
        )}
      </div>
    </motion.div>
  )
}

// ─── Scene 5 — Numbers ────────────────────────────────────────────────────────

function Scene5({ isMobile }: SceneProps) {
  const [a1, setA1] = useState(false)
  const [a2, setA2] = useState(false)
  const [a3, setA3] = useState(false)

  useEffect(() => {
    const ts = [
      setTimeout(() => setA1(true), 400),
      setTimeout(() => setA2(true), 700),
      setTimeout(() => setA3(true), 1000),
    ]
    return () => ts.forEach(clearTimeout)
  }, [])

  const dur = isMobile ? 600 : 800
  const n1 = useCountUp(99, dur, a1)
  const n2 = useCountUp(67, dur, a2)

  const numS: React.CSSProperties = {
    fontFamily: 'var(--font-display), serif', fontWeight: 900,
    fontSize: isMobile ? 'clamp(80px, 16vw, 100px)' : 'clamp(72px, 12vw, 140px)',
    color: GOLD, lineHeight: 1, margin: 0,
  }
  const subS: React.CSSProperties = {
    fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 400,
    fontSize: isMobile ? 13 : 14, color: 'rgba(250,247,242,0.4)',
    marginTop: '0.4rem', margin: 0,
  }

  const stat = (active: boolean, value: string | number, label: string) => (
    <motion.div
      initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ textAlign: 'center' as const, ...(isMobile ? { marginBottom: '1.5rem' } : {}) }}>
      <p style={numS}>{typeof value === 'number' ? `${value}%` : value}</p>
      <p style={subS}>{label}</p>
    </motion.div>
  )

  return (
    <motion.div variants={sceneV} initial="initial" animate="animate" exit="exit"
      style={{ ...fill, padding: '0 1.5rem' }}>
      <div style={{
        display: 'flex', flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center', justifyContent: 'center',
        gap: isMobile ? 0 : '3rem', width: '100%', maxWidth: 900,
      }}>
        {stat(a1, n1, 'enquiries answered')}
        {stat(a2, n2, 'fewer no-shows')}
        {stat(a3, '< 30s', 'response time')}
      </div>
    </motion.div>
  )
}

// ─── Scene 5a — Voice Moment ─────────────────────────────────────────────────

function Scene5a({ isMobile }: SceneProps) {
  const [line2, setLine2] = useState(false)
  const [cards, setCards] = useState(false)
  const [caption, setCaption] = useState(false)

  useEffect(() => {
    const ts = [
      setTimeout(() => setLine2(true), 1500),
      setTimeout(() => setCards(true), 2800),
      setTimeout(() => setCaption(true), 4200),
    ]
    return () => ts.forEach(clearTimeout)
  }, [])

  const cardS = (lumi: boolean): React.CSSProperties => ({
    background: lumi ? 'rgba(196,151,63,0.06)' : 'rgba(255,253,248,0.03)',
    border: `1px solid ${lumi ? 'rgba(196,151,63,0.2)' : 'rgba(255,253,248,0.08)'}`,
    borderRadius: '1rem', padding: '1.25rem',
    maxWidth: isMobile ? '90%' : 260, width: '100%', textAlign: 'left' as const,
  })

  return (
    <motion.div variants={sceneV} initial="initial" animate="animate" exit="exit"
      style={{ ...fill, flexDirection: 'column', padding: '0 1.5rem', textAlign: 'center' as const }}>

      <motion.p
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        style={{
          fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 300, fontSize: 18,
          color: 'rgba(250,247,242,0.35)', margin: '0 0 0.6rem',
        }}>
        Most AI sounds like AI.
      </motion.p>

      {line2 && (
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--font-display), serif', fontWeight: 700, fontStyle: 'italic',
            fontSize: isMobile ? 'clamp(26px,5vw,36px)' : 'clamp(28px,4vw,52px)',
            color: CREAM, margin: '0 0 1.5rem', lineHeight: 1.2,
          }}>
          Lumi sounds like you.
        </motion.p>
      )}

      {cards && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
          style={{
            display: 'flex', flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 12 : 16, justifyContent: 'center', alignItems: 'flex-start',
            marginBottom: '1.5rem', width: '100%', maxWidth: isMobile ? '90vw' : 580,
          }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={cardS(false)}>
            <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 9, fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: 'rgba(250,247,242,0.2)', margin: '0 0 10px' }}>
              OTHER AGENCIES
            </p>
            <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 13, fontStyle: 'italic', color: 'rgba(250,247,242,0.35)', lineHeight: 1.6, margin: 0 }}>
              &ldquo;Thank you for your enquiry. We will respond within 24 hours.&rdquo;
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={cardS(true)}>
            <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 9, fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: GOLD, margin: '0 0 10px' }}>
              LUMI · YOUR VOICE
            </p>
            <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 13, color: CREAM, lineHeight: 1.6, margin: 0 }}>
              &ldquo;Hey lovely! 💛 So excited you&apos;re thinking about lip filler — I&apos;d love to chat through what you&apos;re after. Thursday 2pm or Friday 11am free. Which works? x&rdquo;
            </p>
          </motion.div>
        </motion.div>
      )}

      {caption && (
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
          style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 13, fontStyle: 'italic', color: 'rgba(250,247,242,0.3)', margin: 0 }}>
          Because warm converts. Cold doesn&apos;t.
        </motion.p>
      )}
    </motion.div>
  )
}

// ─── Scene 6 — Pivot ──────────────────────────────────────────────────────────

function Words({ text, startDelay }: { text: string; startDelay: number }) {
  return (
    <>
      {text.split(' ').map((w, i) => (
        <motion.span key={i}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: startDelay + i * 0.08, duration: 0.3 }}
          style={{ display: 'inline-block', marginRight: '0.25em' }}>
          {w}
        </motion.span>
      ))}
    </>
  )
}

function Scene6({ isMobile }: SceneProps) {
  const [divider, setDivider] = useState(false)
  const [tagline, setTagline] = useState(false)

  useEffect(() => {
    const ts = [
      setTimeout(() => setDivider(true), 2800),
      setTimeout(() => setTagline(true), 3200),
    ]
    return () => ts.forEach(clearTimeout)
  }, [])

  const headS: React.CSSProperties = {
    fontFamily: 'var(--font-display), serif', fontWeight: 700,
    fontSize: isMobile ? '26px' : 'clamp(28px, 4vw, 52px)',
    color: CREAM, margin: '0 0 0.5rem', lineHeight: 1.3,
  }

  return (
    <motion.div variants={sceneV} initial="initial" animate="animate" exit="exit"
      style={{ ...fill, flexDirection: 'column', padding: '0 1.5rem' }}>
      <div style={{ textAlign: 'center', maxWidth: isMobile ? '85vw' : 600 }}>
        <p style={headS}><Words text="You built something people love." startDelay={0.3} /></p>
        <p style={headS}><Words text="You shouldn't have to choose." startDelay={1.5} /></p>
        {divider && (
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.4 }}
            style={{ width: 40, height: 1, background: GOLD, margin: '1.5rem auto' }} />
        )}
        {tagline && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-display), serif', fontStyle: 'italic', fontWeight: 400,
              fontSize: isMobile ? '18px' : '22px', color: 'rgba(250,247,242,0.5)', margin: 0,
            }}>
            That&rsquo;s what Lumio is for.
          </motion.p>
        )}
      </div>
    </motion.div>
  )
}

// ─── Scene 7 — Revenue ────────────────────────────────────────────────────────

function Scene7({ isMobile }: SceneProps) {
  const [cActive, setCActive] = useState(false)
  const [sub, setSub] = useState(false)
  const [btn, setBtn] = useState(false)
  const count = useCountUp(3200, isMobile ? 1200 : 1500, cActive)

  useEffect(() => {
    const ts = [
      setTimeout(() => setCActive(true), 1000),
      setTimeout(() => setSub(true), 2800),
      setTimeout(() => setBtn(true), 3800),
    ]
    return () => ts.forEach(clearTimeout)
  }, [])

  return (
    <motion.div variants={sceneV} initial="initial" animate="animate" exit="exit"
      style={{ ...fill, flexDirection: 'column', padding: '0 1.5rem', textAlign: 'center' as const }}>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
        style={{
          fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 400,
          fontSize: isMobile ? '15px' : '16px', color: 'rgba(250,247,242,0.4)',
          margin: '0 0 1.5rem', lineHeight: 1.6,
        }}>
        We calculated what your clinic is losing.
      </motion.p>
      <motion.p
        animate={cActive ? { opacity: 1 } : { opacity: 0 }} initial={{ opacity: 0 }} transition={{ duration: 0.4 }}
        style={{
          fontFamily: 'var(--font-display), serif', fontWeight: 900,
          fontSize: isMobile ? 'clamp(72px, 14vw, 100px)' : 'clamp(64px, 10vw, 120px)',
          color: GOLD, margin: 0, lineHeight: 1,
        }}>
        £{count.toLocaleString()}
      </motion.p>
      {sub && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
          style={{
            fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 400,
            fontSize: isMobile ? '15px' : '16px', color: 'rgba(250,247,242,0.5)',
            margin: '1rem 0 0', lineHeight: 1.6,
          }}>
          per month. From missed enquiries alone.
        </motion.p>
      )}
      {btn && (
        <motion.a href="/audit" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          style={{
            display: 'inline-block', background: GOLD, color: CHARCOAL, borderRadius: 99,
            padding: '14px 28px', fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 600,
            fontSize: isMobile ? '15px' : '14px', textDecoration: 'none', marginTop: '2rem',
            width: isMobile ? '90vw' : 'auto', cursor: 'pointer', textAlign: 'center' as const,
          }}>
          See your number →
        </motion.a>
      )}
    </motion.div>
  )
}

// ─── Scene 8 — Closing ────────────────────────────────────────────────────────

function Scene8({ isMobile }: SceneProps) {
  const [orb, setOrb] = useState(false)
  const [txt, setTxt] = useState(false)
  const [gold, setGold] = useState(false)
  const [url, setUrl] = useState(false)

  useEffect(() => {
    const ts = [
      setTimeout(() => setOrb(true), 400),
      setTimeout(() => setTxt(true), 1200),
      setTimeout(() => setGold(true), 1700),
      setTimeout(() => setUrl(true), 3200),
    ]
    return () => ts.forEach(clearTimeout)
  }, [])

  const orbSize = isMobile ? 64 : 80
  const arcSize = orbSize + 40

  return (
    <motion.div variants={sceneV} initial="initial" animate="animate" exit="exit"
      style={{ ...fill, flexDirection: 'column', padding: '0 1.5rem', textAlign: 'center' as const }}>
      {orb && (
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
          style={{ position: 'relative', width: arcSize, height: arcSize, marginBottom: '2rem', flexShrink: 0 }}>
          <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, animation: 'lumioSpin 8s linear infinite' }}>
            <svg viewBox={`0 0 ${arcSize} ${arcSize}`} width={arcSize} height={arcSize}>
              <path
                d={`M${arcSize * 0.1} ${arcSize * 0.75} Q${arcSize * 0.5} ${arcSize * 0.12} ${arcSize * 0.9} ${arcSize * 0.75}`}
                stroke={GOLD} strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.7"
              />
            </svg>
          </div>
          <div style={{
            position: 'absolute', width: orbSize, height: orbSize, borderRadius: '50%',
            bottom: 0, left: '50%', transform: 'translateX(-50%)',
            background: 'radial-gradient(circle at 35% 30%, #F5E6C8, #C4973F, #8B6420)',
            animation: 'lumioBreathe 3s ease infinite',
          }} />
        </motion.div>
      )}
      {txt && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p style={{
            fontFamily: 'var(--font-display), serif', fontWeight: 900, fontStyle: 'italic',
            fontSize: isMobile ? '42px' : 'clamp(40px, 7vw, 88px)',
            color: CREAM, lineHeight: 1.0, margin: 0,
          }}>
            Your clinic.
          </p>
          {gold && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
              style={{
                fontFamily: 'var(--font-display), serif', fontWeight: 900, fontStyle: 'italic',
                fontSize: isMobile ? '42px' : 'clamp(40px, 7vw, 88px)',
                color: GOLD, lineHeight: 1.0, margin: 0,
              }}>
              Running itself.
            </motion.p>
          )}
        </motion.div>
      )}
      {url && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 400,
            fontSize: isMobile ? '14px' : '16px', color: 'rgba(250,247,242,0.4)',
            letterSpacing: '0.15em', marginTop: '2rem',
          }}>
          lumio.london
        </motion.p>
      )}
    </motion.div>
  )
}

// ─── Replay screen ────────────────────────────────────────────────────────────

function ReplayScreen({ onReplay }: { onReplay: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{ ...fill, flexDirection: 'column', gap: 16 }}
      onClick={onReplay}>
      <button onClick={onReplay} style={{
        background: 'rgba(196,151,63,0.12)', border: `1px solid rgba(196,151,63,0.35)`,
        borderRadius: 99, color: GOLD, fontFamily: 'var(--font-inter), Inter, sans-serif',
        fontWeight: 600, fontSize: 16, padding: '16px 32px', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M13.5 8A5.5 5.5 0 1 1 8 2.5c1.47 0 2.81.58 3.79 1.51L10 6h4V2l-1.52 1.52A7 7 0 1 0 15 8h-1.5z" fill={GOLD} />
        </svg>
        Watch again
      </button>
      <p style={{
        fontFamily: 'var(--font-inter), Inter, sans-serif',
        fontSize: 13, color: 'rgba(250,247,242,0.25)', margin: 0,
      }}>
        Tap anywhere to replay
      </p>
    </motion.div>
  )
}

// ─── Controls bar ─────────────────────────────────────────────────────────────

interface CtrlProps {
  scene: number; progress: number; playing: boolean; isMobile: boolean
  visible: boolean; onToggle: () => void; onSeek: (s: number) => void; onShare: () => void
}

function Controls({ scene, progress, playing, isMobile, visible, onToggle, onSeek, onShare }: CtrlProps) {
  return (
    <motion.div
      animate={{ opacity: isMobile || visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      onClick={e => e.stopPropagation()}
      style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '0 5%',
        paddingBottom: 'calc(40px + env(safe-area-inset-bottom, 0px))',
        pointerEvents: isMobile || visible ? 'auto' : 'none',
      }}>
      {/* Progress bar */}
      <div style={{
        width: '100%', height: 2, background: 'rgba(255,255,255,0.1)',
        borderRadius: 99, marginBottom: 16,
      }}>
        <div style={{
          width: `${Math.min(progress * 100, 100)}%`, height: '100%',
          background: GOLD, borderRadius: 99, transition: 'width 0.05s linear',
        }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Pause / Play */}
        <button onClick={onToggle} style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          width: isMobile ? 44 : 32, height: isMobile ? 44 : 32,
          display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.7,
        }}>
          {playing
            ? <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="4" y="3" width="4" height="14" rx="1.5" fill={CREAM} />
                <rect x="12" y="3" width="4" height="14" rx="1.5" fill={CREAM} />
              </svg>
            : <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 3.5L16 10L5 16.5V3.5Z" fill={CREAM} />
              </svg>
          }
        </button>

        {/* Scene dots — desktop only */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {DURATIONS.map((_, i) => (
              <button key={i} onClick={() => onSeek(i)} style={{
                width: 6, height: 6, borderRadius: '50%',
                background: i === scene ? GOLD : 'rgba(255,255,255,0.2)',
                border: 'none', cursor: 'pointer', padding: 0, transition: 'background 0.3s',
              }} />
            ))}
          </div>
        )}

        {/* Share */}
        <button onClick={onShare} style={{
          background: 'none', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 99,
          color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-inter), Inter, sans-serif',
          fontSize: 12, padding: '6px 12px', cursor: 'pointer',
        }}>
          Share
        </button>
      </div>
    </motion.div>
  )
}

// ─── Root component ───────────────────────────────────────────────────────────

export default function VideoPlayer() {
  const [scene, setScene] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [replay, setReplay] = useState(false)
  const [ctrlVis, setCtrlVis] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isLandscape, setIsLandscape] = useState(false)

  const startRef = useRef(Date.now())
  const ctrlTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const rafRef = useRef<number | undefined>(undefined)

  // Responsive + orientation
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth, h = window.innerHeight
      setIsMobile(w <= 768)
      setIsLandscape(w > h && Math.min(w, h) < 500)
    }
    check()
    window.addEventListener('resize', check)
    window.addEventListener('orientationchange', check)
    return () => {
      window.removeEventListener('resize', check)
      window.removeEventListener('orientationchange', check)
    }
  }, [])

  // Scene advance
  useEffect(() => {
    if (!playing || replay) return
    const t = setTimeout(() => {
      const next = scene + 1
      if (next >= DURATIONS.length) { setReplay(true); setPlaying(false) }
      else setScene(next)
    }, DURATIONS[scene])
    return () => clearTimeout(t)
  }, [scene, playing, replay])

  // Reset elapsed on scene change
  useEffect(() => {
    startRef.current = Date.now()
    setElapsed(0)
  }, [scene])

  // RAF for smooth progress bar
  useEffect(() => {
    if (!playing) return
    const tick = () => {
      setElapsed(Date.now() - startRef.current)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [scene, playing])

  const prev = scene > 0 ? CUM[scene - 1] : 0
  const progress = (prev + Math.min(elapsed, DURATIONS[scene])) / TOTAL

  const showCtrl = useCallback(() => {
    setCtrlVis(true)
    clearTimeout(ctrlTimerRef.current)
    ctrlTimerRef.current = setTimeout(() => setCtrlVis(false), 2000)
  }, [])

  const handleToggle = useCallback(() => setPlaying(p => !p), [])
  const handleSeek = useCallback((s: number) => { setScene(s); setPlaying(true); setReplay(false) }, [])
  const handleReplay = useCallback(() => { setScene(0); setElapsed(0); setPlaying(true); setReplay(false) }, [])
  const handleShare = useCallback(() => {
    navigator.clipboard.writeText('https://lumio.london/video').catch(() => {})
  }, [])

  // Landscape warning on small devices
  if (isLandscape) {
    return (
      <div style={{
        width: '100vw', height: '100vh', background: BG,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '2rem', gap: 16,
      }}>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" opacity={0.5}>
          <rect x="8" y="3" width="20" height="30" rx="3" stroke={CREAM} strokeWidth="1.5" fill="none" />
          <path d="M18 8v20M8 18h20" stroke={GOLD} strokeWidth="1" strokeDasharray="3 3" />
          <path d="M24 12l8 6-8 6" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p style={{
          fontFamily: 'var(--font-inter), Inter, sans-serif',
          fontSize: 16, color: 'rgba(250,247,242,0.5)', margin: 0,
        }}>
          Rotate to portrait for the best experience
        </p>
      </div>
    )
  }

  return (
    <div
      style={{
        width: '100vw', height: '100dvh', background: BG,
        overflow: 'hidden', position: 'relative', cursor: 'none',
        paddingTop: 'env(safe-area-inset-top, 0px)',
      }}
      onMouseMove={!isMobile ? showCtrl : undefined}
      onClick={isMobile ? (replay ? handleReplay : handleToggle) : undefined}
    >
      <AnimatePresence mode="wait">
        {!replay && scene === 0 && <Scene0 key="s0" isMobile={isMobile} />}
        {!replay && scene === 1 && <Scene1 key="s1" isMobile={isMobile} />}
        {!replay && scene === 2 && <Scene2 key="s2" isMobile={isMobile} />}
        {!replay && scene === 3 && <Scene3 key="s3" isMobile={isMobile} />}
        {!replay && scene === 4 && <Scene4 key="s4" isMobile={isMobile} />}
        {!replay && scene === 5 && <Scene5 key="s5" isMobile={isMobile} />}
        {!replay && scene === 6 && <Scene5a key="s5a" isMobile={isMobile} />}
        {!replay && scene === 7 && <Scene6 key="s6" isMobile={isMobile} />}
        {!replay && scene === 8 && <Scene7 key="s7" isMobile={isMobile} />}
        {!replay && scene === 9 && <Scene8 key="s8" isMobile={isMobile} />}
        {replay && <ReplayScreen key="replay" onReplay={handleReplay} />}
      </AnimatePresence>

      {!replay && (
        <Controls
          scene={scene} progress={progress} playing={playing}
          isMobile={isMobile} visible={ctrlVis}
          onToggle={handleToggle} onSeek={handleSeek} onShare={handleShare}
        />
      )}
    </div>
  )
}
