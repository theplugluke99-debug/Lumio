'use client';

import { useState, useEffect } from 'react';
import LumiLens from '@/components/LumiLens';

interface Props {
  dm: boolean;
  onSwitchToFull: () => void;
  onOpenLumi: () => void;
  isMobile?: boolean;
}

export default function SimpleModeView({ dm, onSwitchToFull, onOpenLumi, isMobile }: Props) {
  const [cardState, setCardState] = useState<'good' | 'action'>('good');
  const [toast, setToast] = useState('');

  const dCardBg = dm ? 'rgba(255,253,248,0.04)' : '#FFFFFF';
  const dCardBorder = dm ? 'rgba(255,253,248,0.08)' : 'rgba(26,24,20,0.07)';
  const dText = dm ? '#FFFDF8' : '#1A1814';
  const dMuted = dm ? 'rgba(255,253,248,0.45)' : 'rgba(26,24,20,0.45)';

  useEffect(() => {
    const t = setInterval(() => setCardState(c => c === 'good' ? 'action' : 'good'), 8000);
    return () => clearInterval(t);
  }, []);

  const sendMessage = () => {
    setCardState('good');
    setToast('Lumi sent Sophie a rebooking message ✦');
    setTimeout(() => setToast(''), 3000);
  };

  const circleSize = isMobile ? 64 : 80;
  const moneyFontSize = isMobile ? '28px' : '32px';

  return (
    <>
      <style>{`
        @keyframes statusPulseGreen {
          0%,100% { box-shadow: 0 0 20px rgba(91,138,104,0.2); }
          50% { box-shadow: 0 0 40px rgba(91,138,104,0.4); }
        }
        @keyframes lumiOrb {
          0%,100% { box-shadow: 0 0 10px rgba(196,151,63,0.25); }
          50% { box-shadow: 0 0 22px rgba(196,151,63,0.55); }
        }
      `}</style>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: isMobile ? 84 : 36, left: '50%',
          transform: 'translateX(-50%)', zIndex: 60,
          background: '#1A1814', color: '#FFFDF8',
          borderRadius: 99, padding: '10px 20px',
          fontFamily: 'var(--font-inter, Inter, sans-serif)', fontWeight: 600, fontSize: 13,
          border: '1px solid rgba(196,151,63,0.3)', whiteSpace: 'nowrap',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}>
          {toast}
        </div>
      )}

      <div style={{ maxWidth: 560, margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* ── Status indicator ─────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            width: circleSize, height: circleSize, borderRadius: '50%',
            margin: '0 auto 1.25rem',
            background: 'radial-gradient(circle at 35% 30%, rgba(91,138,104,0.3), rgba(91,138,104,0.1))',
            border: '1px solid rgba(91,138,104,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'statusPulseGreen 3s ease infinite',
          }}>
            <svg viewBox="0 0 24 24" width={Math.round(circleSize * 0.38)} height={Math.round(circleSize * 0.38)} fill="none" stroke="#5B8A68" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <div style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)', fontWeight: 700, fontSize: 18, color: '#5B8A68' }}>
            Everything is handled ✓
          </div>
          <div style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)', fontWeight: 400, fontSize: 14, color: dMuted, marginTop: 4 }}>
            Lumi is running. Nothing needs you right now.
          </div>
        </div>

        {/* ── Three cards ───────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

          {/* Card 1: Money */}
          <div style={{
            background: dCardBg, border: `1px solid ${dCardBorder}`,
            borderRadius: '1.25rem', padding: '1.5rem 1.75rem',
            display: 'flex', alignItems: 'center', gap: '1.25rem',
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg, rgba(196,151,63,0.2), rgba(196,151,63,0.06))',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C4973F',
            }}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-display, "Playfair Display", serif)', fontWeight: 800, fontSize: moneyFontSize, color: '#C4973F', letterSpacing: '-0.03em', lineHeight: 1 }}>
                £4,800
              </div>
              <div style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)', fontWeight: 600, fontSize: 13, color: dText, marginTop: 4 }}>
                captured this week
              </div>
              <div style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)', fontWeight: 400, fontSize: 12, color: dMuted, marginTop: 2 }}>
                19 bookings · 31 leads · 2 no-shows prevented
              </div>
            </div>
          </div>

          {/* Card 2: Lumi working */}
          <div style={{
            background: dCardBg, border: `1px solid ${dCardBorder}`,
            borderRadius: '1.25rem', padding: '1.5rem 1.75rem',
            display: 'flex', alignItems: 'center', gap: '1.25rem',
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: 'lumiOrb 3s ease infinite',
            }}>
              <LumiLens size={36} variant={dm ? 'light' : 'dark'} animated />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)', fontWeight: 700, fontSize: 17, color: dText }}>
                Lumi handled 47 things
              </div>
              <div style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)', fontWeight: 400, fontSize: 13, color: dMuted, marginTop: 2 }}>
                while you were with clients
              </div>
              <div style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)', fontWeight: 400, fontSize: 12, color: dMuted, marginTop: 2 }}>
                Enquiries answered · Reminders sent · Reviews requested
              </div>
            </div>
          </div>

          {/* Card 3: Action needed — two states */}
          <div style={{
            background: dCardBg, border: `1px solid ${dCardBorder}`,
            borderRadius: '1.25rem', padding: '1.5rem 1.75rem',
            display: 'flex', alignItems: cardState === 'action' ? 'flex-start' : 'center', gap: '1.25rem',
            transition: 'all 300ms',
          }}>
            {cardState === 'good' ? (
              <>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                  background: 'rgba(91,138,104,0.12)', border: '1px solid rgba(91,138,104,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#5B8A68" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)', fontWeight: 700, fontSize: 16, color: dText }}>
                    Nothing needs you right now
                  </div>
                  <div style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)', fontWeight: 400, fontSize: 13, color: dMuted, marginTop: 2 }}>
                    Lumi has everything covered. Enjoy your day.
                  </div>
                </div>
              </>
            ) : (
              <>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%', flexShrink: 0, marginTop: 2,
                  background: 'rgba(196,151,63,0.12)', border: '1px solid rgba(196,151,63,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#C4973F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z"/>
                  </svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)', fontWeight: 700, fontSize: 14, color: dText }}>
                    Sophie Carter needs a rebooking nudge
                  </div>
                  <div style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)', fontWeight: 400, fontSize: 12, color: dMuted, marginTop: 2 }}>
                    7 weeks since last visit
                  </div>
                  <button
                    type="button"
                    onClick={sendMessage}
                    style={{
                      marginTop: 10, background: '#C4973F', color: '#0F0E0B',
                      border: 'none', borderRadius: 99, padding: '8px 18px',
                      fontFamily: 'var(--font-inter, Inter, sans-serif)', fontWeight: 700, fontSize: 12,
                      cursor: 'pointer',
                    }}
                  >
                    Send message →
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── Footer links ─────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <p style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)', fontWeight: 400, fontSize: 13, color: dMuted, margin: '0 0 0.75rem' }}>
            Want to see more detail?
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <button
              type="button"
              onClick={onSwitchToFull}
              style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)', fontWeight: 600, fontSize: 13, color: '#C4973F', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              View full dashboard →
            </button>
            <span style={{ color: dMuted }}>·</span>
            <button
              type="button"
              onClick={onOpenLumi}
              style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)', fontWeight: 600, fontSize: 13, color: '#C4973F', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Ask Lumi →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
