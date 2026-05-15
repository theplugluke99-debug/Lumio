'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

const GOLD = '#C4973F'
const CREAM = '#FFFDF8'

export default function VideoTeaser() {
  const router = useRouter()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section style={{ backgroundColor: '#0D0C09', padding: '6rem 1.5rem', textAlign: 'center' }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ maxWidth: 700, margin: '0 auto' }}
      >
        {/* Thumbnail */}
        <div
          onClick={() => router.push('/video')}
          style={{
            background: '#0A0907',
            borderRadius: '1.5rem',
            aspectRatio: '16 / 9',
            border: '1px solid rgba(196,151,63,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            transition: 'border-color 0.3s, transform 0.3s',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement
            el.style.borderColor = 'rgba(196,151,63,0.35)'
            el.style.transform = 'scale(1.01)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement
            el.style.borderColor = 'rgba(196,151,63,0.15)'
            el.style.transform = 'scale(1)'
          }}
        >
          {/* Wordmark */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.6 }}>
            <svg viewBox="0 0 200 120" width={80} height={48}>
              <path d="M20 95 Q100 15 180 95" stroke={GOLD} strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </svg>
            <p style={{
              fontFamily: 'var(--font-display), serif', fontWeight: 700, fontStyle: 'italic',
              fontSize: '28px', color: CREAM, letterSpacing: '0.02em', margin: 0, lineHeight: 1,
            }}>
              Lumio
            </p>
          </div>

          {/* Play button */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 72, height: 72, borderRadius: '50%',
            background: 'rgba(196,151,63,0.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s, transform 0.2s',
          }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'rgba(232,180,75,0.95)'
              el.style.transform = 'translate(-50%, -50%) scale(1.08)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'rgba(196,151,63,0.9)'
              el.style.transform = 'translate(-50%, -50%) scale(1)'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 4.5L19 12L6 19.5V4.5Z" fill="#1A1814" />
            </svg>
          </div>
        </div>

        <p style={{
          fontFamily: 'var(--font-inter), Inter, sans-serif',
          fontSize: '14px', color: 'rgba(250,247,242,0.4)',
          marginTop: '1.25rem', margin: '1.25rem 0 0',
        }}>
          60 seconds. The full picture.
        </p>
      </motion.div>
    </section>
  )
}
