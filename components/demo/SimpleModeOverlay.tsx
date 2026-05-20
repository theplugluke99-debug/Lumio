'use client';

import { useState } from 'react';

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
    width: '100%',
    maxWidth: 'min(300px, calc(100vw - 40px))',
    minHeight: 210,
    boxSizing: 'border-box' as const,
    borderRadius: '1.65rem',
    padding: '1.65rem',
    cursor: 'pointer' as const,
    transition: 'transform 180ms ease, border-color 180ms ease, background 180ms ease, box-shadow 180ms ease',
    transform: hovered === which ? 'translateY(-3px)' : 'translateY(0)',
    background: hovered === which
      ? 'linear-gradient(145deg, rgba(196,151,63,0.11), rgba(255,253,248,0.045))'
      : 'linear-gradient(145deg, rgba(255,253,248,0.055), rgba(255,253,248,0.025))',
    border: `1px solid ${hovered === which ? 'rgba(196,151,63,0.52)' : 'rgba(255,253,248,0.12)'}`,
    boxShadow: hovered === which ? '0 24px 80px rgba(0,0,0,0.34)' : '0 18px 60px rgba(0,0,0,0.24)',
    textAlign: 'left' as const,
  });

  return (
    <div style={{
      position: 'fixed', inset: 0, width: '100vw', maxWidth: '100vw', background: '#0F0E0B', zIndex: 100,
      overflowY: 'auto',
      overflowX: 'hidden',
      opacity: fading ? 0 : 1, transition: 'opacity 220ms ease',
    }}>
      <div style={{
        width: '100vw',
        maxWidth: '100vw',
        boxSizing: 'border-box',
        minHeight: '100dvh',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(1.25rem, 5vw, 2.5rem)',
        position: 'relative',
      }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(circle at 50% 20%, rgba(196,151,63,0.18), transparent 36%), radial-gradient(circle at 72% 70%, rgba(232,180,75,0.08), transparent 38%)' }} />

        <div style={{ position: 'relative', width: 72, height: 72, marginBottom: '1.65rem', borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'radial-gradient(circle at 36% 30%, #FFFDF8 0%, #F4D38A 34%, rgba(196,151,63,0.72) 64%, rgba(15,14,11,0.2) 100%)', border: '1px solid rgba(244,211,138,0.38)', boxShadow: '0 0 34px rgba(232,180,75,0.22), inset 0 1px 2px rgba(255,255,255,0.48)' }}>
          <span style={{ position: 'absolute', inset: 15, borderRadius: '50%', border: '1px solid rgba(255,253,248,0.55)', borderLeftColor: 'transparent', borderBottomColor: 'transparent', opacity: 0.78 }} />
        </div>

        <h2 style={{
          position: 'relative',
          fontFamily: 'var(--font-inter, Inter, sans-serif)',
          fontStyle: 'normal', fontWeight: 800,
          fontSize: 'clamp(28px, 5vw, 44px)', color: '#FFFDF8',
          lineHeight: 1.05,
          letterSpacing: '-0.04em',
          textAlign: 'center', margin: 0, maxWidth: 'calc(100vw - 40px)',
        }}>
          Choose your demo experience
        </h2>

        <p style={{
          position: 'relative',
          fontFamily: 'var(--font-inter, Inter, sans-serif)', fontWeight: 400,
          fontSize: 15, color: 'rgba(250,247,242,0.52)', lineHeight: 1.7,
          maxWidth: 'min(420px, calc(100vw - 40px))', textAlign: 'center', margin: '0.85rem auto 2.15rem',
        }}>
          Start simple or explore the full Lumio system.
        </p>

        <div style={{ position: 'relative', display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', width: '100%', maxWidth: 'min(640px, calc(100vw - 40px))', boxSizing: 'border-box' }}>

          <button
            type="button"
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
          </button>

          <button
            type="button"
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
          </button>
        </div>
      </div>
    </div>
  );
}
