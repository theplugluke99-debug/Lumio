'use client';

import { useState } from 'react';
import LumiLens from '@/components/LumiLens';

interface Props {
  onChoose: (mode: 'simple' | 'full') => void;
  dm: boolean;
}

export default function SimpleModeOverlay({ onChoose, dm }: Props) {
  const [hovered, setHovered] = useState<'simple' | 'full' | null>(null);
  const [fading, setFading] = useState(false);

  const choose = (mode: 'simple' | 'full') => {
    setFading(true);
    setTimeout(() => onChoose(mode), 220);
  };

  const cardBase = (which: 'simple' | 'full') => ({
    flex: '1 1 260px' as const,
    maxWidth: 280,
    borderRadius: '1.5rem',
    padding: '2rem',
    cursor: 'pointer' as const,
    transition: 'all 200ms',
    background: hovered === which ? 'rgba(196,151,63,0.08)' : 'rgba(255,253,248,0.03)',
    border: `1px solid ${hovered === which ? 'rgba(196,151,63,0.5)' : 'rgba(255,253,248,0.1)'}`,
    textAlign: 'left' as const,
  });

  return (
    <>
      <style>{`
        @keyframes simpleSpinArc { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes simpleBreath { 0%,100% { opacity: 0.75; } 50% { opacity: 1; } }
      `}</style>
      <div style={{
        position: 'fixed', inset: 0, background: '#0F0E0B', zIndex: 100,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '2rem', opacity: fading ? 0 : 1, transition: 'opacity 220ms ease',
      }}>
        {/* Orb + spinning arc */}
        <div style={{ position: 'relative', width: 88, height: 88, marginBottom: '2rem' }}>
          <div style={{ position: 'absolute', inset: 0, animation: 'simpleSpinArc 3s linear infinite', pointerEvents: 'none' }}>
            <svg viewBox="0 0 88 88" fill="none" width={88} height={88}>
              <path d="M44 5 A39 39 0 0 1 83 44" stroke="#C4973F" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
              <path d="M44 83 A39 39 0 0 1 5 44" stroke="rgba(196,151,63,0.2)" strokeWidth="1" strokeLinecap="round"/>
            </svg>
          </div>
          <div style={{ position: 'absolute', inset: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LumiLens size={52} variant="light" animated />
          </div>
        </div>

        {/* Heading */}
        <h2 style={{
          fontFamily: 'var(--font-display, "Playfair Display", serif)',
          fontStyle: 'italic', fontWeight: 700,
          fontSize: 'clamp(24px, 4vw, 40px)', color: '#FFFDF8',
          textAlign: 'center', margin: 0,
        }}>
          How do you like to run things?
        </h2>

        {/* Sub */}
        <p style={{
          fontFamily: 'var(--font-inter, Inter, sans-serif)', fontWeight: 400,
          fontSize: 16, color: 'rgba(250,247,242,0.45)', lineHeight: 1.8,
          maxWidth: 440, textAlign: 'center', margin: '1rem auto 2.5rem',
        }}>
          You can always switch later — this just sets you up the right way from the start.
        </p>

        {/* Choice cards */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', width: '100%', maxWidth: 600 }}>

          {/* Card 1 — Simple */}
          <div
            onClick={() => choose('simple')}
            onMouseEnter={() => setHovered('simple')}
            onMouseLeave={() => setHovered(null)}
            style={cardBase('simple')}
          >
            <div style={{ marginBottom: 14 }}>
              <svg viewBox="0 0 32 32" fill="none" width={32} height={32}>
                <circle cx="16" cy="16" r="14.5" stroke="#C4973F" strokeWidth="1"/>
                <circle cx="10" cy="16" r="2" fill="#C4973F"/>
                <circle cx="16" cy="16" r="2" fill="#C4973F"/>
                <circle cx="22" cy="16" r="2" fill="#C4973F"/>
              </svg>
            </div>
            <div style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)', fontWeight: 700, fontSize: 17, color: '#FFFDF8', lineHeight: 1.25 }}>
              Just tell me what matters
            </div>
            <p style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)', fontWeight: 400, fontSize: 13, color: 'rgba(250,247,242,0.5)', lineHeight: 1.6, marginTop: 8, marginBottom: 0 }}>
              Green light means everything is running. See your money. See if anything needs you. That&apos;s it.
            </p>
            <div style={{ marginTop: 16, fontFamily: 'var(--font-inter, Inter, sans-serif)', fontWeight: 600, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#5B8A68' }}>
              Recommended for most
            </div>
          </div>

          {/* Card 2 — Full */}
          <div
            onClick={() => choose('full')}
            onMouseEnter={() => setHovered('full')}
            onMouseLeave={() => setHovered(null)}
            style={cardBase('full')}
          >
            <div style={{ marginBottom: 14 }}>
              <svg viewBox="0 0 32 32" fill="none" width={32} height={32}>
                <rect x="3" y="3" width="11" height="11" rx="2" stroke="#C4973F" strokeWidth="1"/>
                <rect x="18" y="3" width="11" height="11" rx="2" stroke="#C4973F" strokeWidth="1"/>
                <rect x="3" y="18" width="11" height="11" rx="2" stroke="#C4973F" strokeWidth="1"/>
                <rect x="18" y="18" width="11" height="11" rx="2" stroke="#C4973F" strokeWidth="1"/>
              </svg>
            </div>
            <div style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)', fontWeight: 700, fontSize: 17, color: '#FFFDF8', lineHeight: 1.25 }}>
              Show me everything
            </div>
            <p style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)', fontWeight: 400, fontSize: 13, color: 'rgba(250,247,242,0.5)', lineHeight: 1.6, marginTop: 8, marginBottom: 0 }}>
              Full dashboard with all metrics, conversations, client profiles and automation data.
            </p>
            <div style={{ marginTop: 16, fontFamily: 'var(--font-inter, Inter, sans-serif)', fontWeight: 600, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(250,247,242,0.3)' }}>
              For the detail-oriented
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
