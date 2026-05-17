'use client'

import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import LumiLens from '@/components/LumiLens'
import Logo from '@/components/ui/Logo'

const GOLD = '#C4973F'
const GOLD_BRIGHT = '#E8B44B'
const CREAM = '#FFFDF8'
const BG = '#0A0907'
const CHARCOAL = '#1A1814'
const SCENE_DURATION = 4400
const smoothEase = [0.22, 1, 0.36, 1] as const
const softEase = [0.4, 0, 0.2, 1] as const

type SceneProps = { isMobile: boolean }

const sceneMotion = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.72, ease: smoothEase } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.58, ease: softEase } },
}

function Shell({ children, label }: { children: ReactNode; label: string }) {
  return (
    <motion.div
      variants={sceneMotion}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(1.1rem, 4vw, 2.2rem)',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-inter), Inter, sans-serif',
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(232,180,75,0.7)',
          margin: '0 0 1rem',
        }}
      >
        {label}
      </p>
      {children}
    </motion.div>
  )
}

function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 330,
        margin: '0 auto',
        borderRadius: 28,
        background: 'linear-gradient(180deg, rgba(255,253,248,0.09), rgba(255,253,248,0.035))',
        border: '1px solid rgba(255,253,248,0.1)',
        boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
        padding: 12,
      }}
    >
      <div
        style={{
          minHeight: 360,
          borderRadius: 22,
          background: 'linear-gradient(180deg, #151310 0%, #0D0C0A 100%)',
          border: '1px solid rgba(196,151,63,0.16)',
          padding: 14,
        }}
      >
        {children}
      </div>
    </div>
  )
}

function Bubble({ children, mine = false, delay = 0 }: { children: ReactNode; mine?: boolean; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.42, ease: smoothEase }}
      style={{
        alignSelf: mine ? 'flex-end' : 'flex-start',
        maxWidth: '84%',
        borderRadius: mine ? '18px 18px 5px 18px' : '18px 18px 18px 5px',
        background: mine ? 'rgba(196,151,63,0.18)' : 'rgba(255,253,248,0.08)',
        border: `1px solid ${mine ? 'rgba(196,151,63,0.24)' : 'rgba(255,253,248,0.09)'}`,
        color: CREAM,
        fontFamily: 'var(--font-inter), Inter, sans-serif',
        fontSize: 13,
        lineHeight: 1.48,
        padding: '10px 13px',
      }}
    >
      {children}
    </motion.div>
  )
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div
      style={{
        borderRadius: 18,
        border: '1px solid rgba(196,151,63,0.14)',
        background: 'rgba(255,253,248,0.055)',
        padding: '14px 15px',
      }}
    >
      <p className="font-display" style={{ margin: 0, color: GOLD_BRIGHT, fontSize: 30, lineHeight: 1, fontWeight: 800 }}>
        {value}
      </p>
      <p style={{ margin: '6px 0 0', color: 'rgba(250,247,242,0.48)', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 11, lineHeight: 1.4 }}>
        {label}
      </p>
    </div>
  )
}

function SceneReply({ isMobile }: SceneProps) {
  return (
    <Shell label="11:07pm · Instagram enquiry">
      <PhoneFrame>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <p style={{ margin: 0, color: CREAM, fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 13, fontWeight: 700 }}>skinroom.london</p>
            <p style={{ margin: '2px 0 0', color: 'rgba(250,247,242,0.34)', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 11 }}>Direct message</p>
          </div>
          <span style={{ color: GOLD, border: '1px solid rgba(196,151,63,0.28)', borderRadius: 99, padding: '4px 8px', fontSize: 9, letterSpacing: '0.12em' }}>LUMI</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Bubble delay={0.15}>Hi, how much is lip filler? Do you have anything this week?</Bubble>
          <Bubble mine delay={0.95}>Hey lovely. Lip filler starts from £180. I can see Friday 11am free. Would you like me to hold it?</Bubble>
          <Bubble delay={1.9}>Yes please, Friday works.</Bubble>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6, duration: 0.5 }}
          style={{ margin: '18px 0 0', color: 'rgba(250,247,242,0.45)', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: isMobile ? 12 : 13, lineHeight: 1.5 }}
        >
          Lumi replies in the clinic owner&apos;s tone while the owner sleeps.
        </motion.p>
      </PhoneFrame>
    </Shell>
  )
}

function SceneBooking() {
  return (
    <Shell label="Booking confirmed">
      <div style={{ maxWidth: 430, width: '100%', margin: '0 auto' }}>
        <div style={{ borderRadius: 28, background: CREAM, color: CHARCOAL, padding: 22, boxShadow: '0 24px 80px rgba(0,0,0,0.38)' }}>
          <Logo width={94} />
          <div style={{ marginTop: 22, display: 'grid', gap: 12 }}>
            {[
              ['Treatment', 'Lip filler consultation'],
              ['Client', 'Emma Wilson'],
              ['Time', 'Friday · 11:00am'],
              ['Deposit', 'Paid via Stripe'],
            ].map(([a, b], i) => (
              <motion.div
                key={a}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.24, duration: 0.36 }}
                style={{ display: 'flex', justifyContent: 'space-between', gap: 16, borderBottom: i < 3 ? '1px solid rgba(26,24,20,0.08)' : 'none', paddingBottom: 11 }}
              >
                <span style={{ color: '#8A8278', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 12 }}>{a}</span>
                <span style={{ color: CHARCOAL, fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 13, fontWeight: 700, textAlign: 'right' }}>{b}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.45 }}
          style={{ margin: '1rem 0 0', textAlign: 'center', color: 'rgba(250,247,242,0.45)', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 13 }}
        >
          Confirmation sent. Deposit handled. Calendar updated.
        </motion.p>
      </div>
    </Shell>
  )
}

function ScenePrevention() {
  return (
    <Shell label="No-show prevention">
      <div style={{ maxWidth: 430, width: '100%', margin: '0 auto', display: 'grid', gap: 12 }}>
        {[
          ['48 hours before', 'Your appointment is Friday at 11am. Reply YES to confirm or RESCHEDULE to move it.', 'Delivered'],
          ['24 hours before', 'Thanks Emma. You are confirmed for tomorrow at 11am.', 'Confirmed'],
          ['Morning of', 'See you today at 11am. Parking details are below.', 'Scheduled'],
        ].map(([time, text, status], i) => (
          <motion.div
            key={time}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.45, duration: 0.45 }}
            style={{ borderRadius: 20, border: '1px solid rgba(196,151,63,0.14)', background: 'rgba(255,253,248,0.055)', padding: 15 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
              <span style={{ color: GOLD_BRIGHT, fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 11, fontWeight: 700 }}>{time}</span>
              <span style={{ color: status === 'Confirmed' ? '#78A476' : 'rgba(250,247,242,0.36)', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 11 }}>{status}</span>
            </div>
            <p style={{ margin: 0, color: 'rgba(250,247,242,0.76)', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 13, lineHeight: 1.48 }}>{text}</p>
          </motion.div>
        ))}
      </div>
    </Shell>
  )
}

function SceneVoice() {
  return (
    <Shell label="Voice profile">
      <div style={{ maxWidth: 470, width: '100%', margin: '0 auto', textAlign: 'center' }}>
        <LumiLens size={58} variant="light" animated />
        <h2 className="font-display" style={{ color: CREAM, fontSize: 'clamp(30px, 5vw, 52px)', lineHeight: 1.05, margin: '1rem 0 0', fontWeight: 700 }}>
          Trained on your tone.
        </h2>
        <p style={{ color: 'rgba(250,247,242,0.52)', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 14, lineHeight: 1.7, margin: '0.9rem auto 1.2rem', maxWidth: 360 }}>
          Lumi learns how you greet clients, explain treatments, follow up, and reassure nervous first-timers.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10 }}>
          {['Warm', 'Clear', 'Clinic-safe'].map((word, i) => (
            <motion.div key={word} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 + i * 0.18, duration: 0.35 }}
              style={{ borderRadius: 99, border: '1px solid rgba(196,151,63,0.18)', padding: '10px 8px', color: GOLD_BRIGHT, fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 12, fontWeight: 700 }}>
              {word}
            </motion.div>
          ))}
        </div>
      </div>
    </Shell>
  )
}

function SceneDashboard() {
  return (
    <Shell label="Desktop and mobile dashboard">
      <div style={{ maxWidth: 520, width: '100%', margin: '0 auto', position: 'relative' }}>
        <div style={{ borderRadius: 26, border: '1px solid rgba(196,151,63,0.16)', background: 'rgba(255,253,248,0.06)', padding: 16, boxShadow: '0 24px 80px rgba(0,0,0,0.35)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10, marginBottom: 12 }}>
            <Metric value="99%" label="enquiries answered" />
            <Metric value="67%" label="fewer no-shows" />
          </div>
          {['Instagram reply sent', 'Rebooking nudge queued', 'Google review request sent'].map((item, i) => (
            <motion.div key={item} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 + i * 0.24, duration: 0.35 }}
              style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,253,248,0.08)', padding: '11px 0', color: 'rgba(250,247,242,0.72)', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 12 }}>
              <span>{item}</span>
              <span style={{ color: GOLD }}>Done</span>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.48 }}
          style={{ width: 132, borderRadius: 22, border: '1px solid rgba(196,151,63,0.2)', background: '#12100D', padding: 10, position: 'absolute', right: -4, bottom: -34 }}
        >
          <Metric value="£3.2k" label="recovered this month" />
        </motion.div>
      </div>
    </Shell>
  )
}

function SceneRecovered({ isMobile }: SceneProps) {
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / 1700, 1)
      setAmount(Math.round(3200 * (1 - Math.pow(1 - t, 3))))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <Shell label="Revenue recovered">
      <div style={{ textAlign: 'center' }}>
        <Logo light width={isMobile ? 116 : 148} />
        <p className="font-display" style={{ color: GOLD_BRIGHT, fontSize: isMobile ? '70px' : 'clamp(76px, 10vw, 124px)', lineHeight: 0.95, fontWeight: 900, margin: '2rem 0 0' }}>
          £{amount.toLocaleString('en-GB')}
        </p>
        <p style={{ color: 'rgba(250,247,242,0.55)', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 15, lineHeight: 1.7, margin: '1rem auto 0', maxWidth: 360 }}>
          revealed and recovered from missed enquiries, no-shows, and clients due to rebook.
        </p>
      </div>
    </Shell>
  )
}

const SCENES = [SceneReply, SceneBooking, ScenePrevention, SceneVoice, SceneDashboard, SceneRecovered]

export default function VideoPlayer() {
  const [scene, setScene] = useState(0)
  const [paused, setPaused] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isEmbed, setIsEmbed] = useState(false)
  const startedAt = useRef(Date.now())
  const raf = useRef<number | undefined>(undefined)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    setIsEmbed(new URLSearchParams(window.location.search).get('embed') === 'hero')
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (paused) return
    const id = setTimeout(() => {
      setScene((s) => (s + 1) % SCENES.length)
    }, SCENE_DURATION)
    return () => clearTimeout(id)
  }, [scene, paused])

  useEffect(() => {
    startedAt.current = Date.now()
    setElapsed(0)
  }, [scene])

  useEffect(() => {
    if (paused) return
    const tick = () => {
      setElapsed(Math.min(Date.now() - startedAt.current, SCENE_DURATION))
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [scene, paused])

  const CurrentScene = SCENES[scene]
  const progress = useMemo(() => ((scene * SCENE_DURATION + elapsed) / (SCENES.length * SCENE_DURATION)) * 100, [elapsed, scene])
  const toggle = useCallback(() => setPaused((p) => !p), [])

  return (
    <div
      onClick={toggle}
      style={{
        width: '100vw',
        height: '100dvh',
        background: `radial-gradient(circle at 50% 20%, rgba(196,151,63,0.16), transparent 34%), ${BG}`,
        overflow: 'hidden',
        position: 'relative',
        cursor: isEmbed ? 'default' : 'pointer',
      }}
    >
      <AnimatePresence mode="wait">
        <CurrentScene key={scene} isMobile={isMobile} />
      </AnimatePresence>

      <div style={{ position: 'absolute', left: '5%', right: '5%', bottom: isEmbed ? 18 : 26, height: 2, borderRadius: 99, background: 'rgba(255,253,248,0.12)' }}>
        <div style={{ width: `${progress}%`, height: '100%', borderRadius: 99, background: GOLD, transition: 'width 120ms linear' }} />
      </div>
      {!isEmbed && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); toggle() }}
          style={{
            position: 'absolute',
            right: 24,
            bottom: 42,
            borderRadius: 99,
            border: '1px solid rgba(255,253,248,0.16)',
            background: 'rgba(255,253,248,0.06)',
            color: 'rgba(250,247,242,0.62)',
            padding: '8px 12px',
            fontFamily: 'var(--font-inter), Inter, sans-serif',
            fontSize: 12,
          }}
        >
          {paused ? 'Play' : 'Pause'}
        </button>
      )}
    </div>
  )
}
