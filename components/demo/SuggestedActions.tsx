'use client'

import { useState } from 'react'

interface Props { darkMode: boolean }

const CARDS = [
  {
    dot: '#C4973F',
    title: 'Sophie Carter needs a rebooking nudge',
    body: "Last visit was 7 weeks ago. Her usual treatment window is 6 weeks. She's overdue and at risk of booking elsewhere.",
    btn: 'Send message →',
    fire: true,
  },
  {
    dot: '#5B8A68',
    title: "3 clients haven't left a Google review",
    body: 'Emma Wilson, Charlotte Reed and Olivia Bennett all had treatments in the last 10 days with no review request sent yet.',
    btn: 'Request reviews →',
    fire: false,
  },
  {
    dot: '#8A8278',
    title: 'Tuesday 2pm has been empty for 3 weeks',
    body: "This slot consistently goes unfilled. Want Lumi to promote it to clients who've enquired about availability?",
    btn: 'Promote slot →',
    fire: false,
  },
]

export default function SuggestedActions({ darkMode: dm }: Props) {
  const [toast, setToast] = useState(false)

  const cardBg = dm ? 'rgba(255,253,248,0.04)' : 'rgba(255,255,255,0.72)'
  const border = dm ? 'rgba(255,253,248,0.08)' : 'rgba(26,24,20,0.08)'
  const borderHov = dm ? 'rgba(255,253,248,0.2)' : 'rgba(26,24,20,0.2)'
  const textPri = dm ? '#FFFDF8' : '#1A1814'
  const textSec = dm ? 'rgba(255,253,248,0.5)' : '#8A8278'

  const fire = () => { setToast(true); setTimeout(() => setToast(false), 3000) }

  return (
    <div>
      <p style={{
        fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 11, fontWeight: 600,
        letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C4973F', marginBottom: '0.5rem',
      }}>
        LUMI SUGGESTS
      </p>
      <p style={{
        fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 13,
        color: textSec, marginBottom: '1rem', lineHeight: 1.6,
      }}>
        Based on your clinic data this week — here&apos;s what I&apos;d do next.
      </p>

      {CARDS.map((c, i) => (
        <div
          key={i}
          style={{
            background: cardBg, border: `1px solid ${border}`, borderRadius: '1rem',
            padding: '1.25rem 1.5rem', marginBottom: '0.75rem',
            display: 'flex', alignItems: 'flex-start', gap: '1rem',
            transition: 'border-color 200ms',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = borderHov }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = border }}
        >
          <div style={{
            width: 10, height: 10, borderRadius: '50%', background: c.dot,
            marginTop: 4, flexShrink: 0,
          }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              fontWeight: 600, fontSize: 14, color: textPri, lineHeight: 1.4,
            }}>
              {c.title}
            </div>
            <div style={{
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              fontSize: 13, color: textSec, lineHeight: 1.6, marginTop: 4,
            }}>
              {c.body}
            </div>
          </div>
          <button
            onClick={c.fire ? fire : undefined}
            style={{
              fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 600, fontSize: 12,
              background: 'transparent', border: '1px solid rgba(196,151,63,0.3)',
              borderRadius: 99, padding: '6px 14px', color: '#C4973F',
              cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, transition: 'all 200ms',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'rgba(196,151,63,0.1)'
              el.style.borderColor = '#C4973F'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'transparent'
              el.style.borderColor = 'rgba(196,151,63,0.3)'
            }}
          >
            {c.btn}
          </button>
        </div>
      ))}

      {toast && (
        <div style={{
          position: 'fixed', bottom: 100, left: '50%', transform: 'translateX(-50%)',
          background: '#1A1814', border: '1px solid rgba(196,151,63,0.3)',
          borderRadius: '0.75rem', padding: '12px 20px',
          fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 500, fontSize: 13,
          color: '#FFFDF8', zIndex: 100, whiteSpace: 'nowrap',
        }}>
          Lumi sent Sophie a rebooking message ✦
        </div>
      )}
    </div>
  )
}
