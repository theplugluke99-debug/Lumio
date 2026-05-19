'use client';

import { useEffect, useRef } from 'react';

function GoldConfetti() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: -10 - Math.random() * 100,
      w: 4 + Math.random() * 6,
      h: 4 + Math.random() * 6,
      color: Math.random() > 0.5 ? '#C4973F' : '#E8B44B',
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 4,
      speedX: (Math.random() - 0.5) * 2,
      speedY: 1.5 + Math.random() * 2.5,
      opacity: 1,
      delay: Math.random() * 80,
    }));

    let frame = 0;
    let animId: number;

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      particles.forEach(p => {
        if (frame < p.delay) return;

        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y > canvas!.height * 0.7) {
          p.opacity -= 0.02;
        }

        if (p.opacity <= 0) return;

        ctx!.save();
        ctx!.globalAlpha = p.opacity;
        ctx!.translate(p.x + p.w / 2, p.y + p.h / 2);
        ctx!.rotate((p.rotation * Math.PI) / 180);
        ctx!.fillStyle = p.color;
        ctx!.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx!.restore();
      });

      frame++;

      const alive = particles.filter(p => p.opacity > 0 && p.y < canvas!.height);

      if (alive.length > 0) {
        animId = requestAnimationFrame(draw);
      }
    }

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 100,
      }}
    />
  );
}

export default function WelcomeContent() {
  return (
    <>
      <GoldConfetti />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes breathe {
          0%, 100% { box-shadow: 0 0 32px rgba(196,151,63,0.28), 0 0 72px rgba(232,180,75,0.12); }
          50%       { box-shadow: 0 0 52px rgba(196,151,63,0.44), 0 0 110px rgba(232,180,75,0.22); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .wc-cta-gold:hover  { background: #D4A84B !important; }
        .wc-cta-ghost:hover { border-color: rgba(196,151,63,0.7) !important; color: #E8B44B !important; }
      `}</style>

      <div style={{
        minHeight: '100dvh',
        background: '#0F0E0B',
        color: '#FFFDF8',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(2.5rem,6vw,4rem) clamp(1.5rem,4vw,2rem)',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          width: '100%',
          maxWidth: 520,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0,
        }}>

          {/* Orb */}
          <div style={{
            width: 'clamp(72px,9vw,100px)',
            height: 'clamp(72px,9vw,100px)',
            position: 'relative',
            marginBottom: '1.65rem',
            animation: 'fadeIn 0.5s ease 0.1s both',
          }}>
            <svg
              viewBox="0 0 100 100"
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                animation: 'spin 8s linear infinite',
              }}
            >
              <circle
                cx="50" cy="50" r="46"
                fill="none"
                stroke="rgba(196,151,63,0.55)"
                strokeWidth="1.2"
                strokeDasharray="210 80"
                strokeLinecap="round"
              />
            </svg>
            <div style={{
              position: 'absolute',
              inset: '14%',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 36% 30%, #FFFDF8 0%, #F4D38A 32%, rgba(196,151,63,0.78) 62%, rgba(15,14,11,0.18) 100%)',
              animation: 'breathe 3.4s ease-in-out infinite',
            }} />
          </div>

          {/* Payment confirmed label */}
          <div style={{
            fontFamily: 'var(--font-inter, Inter, sans-serif)',
            fontWeight: 600,
            fontSize: 10,
            letterSpacing: '0.13em',
            textTransform: 'uppercase',
            color: '#5B8A68',
            marginBottom: '1rem',
            animation: 'fadeIn 0.5s ease 0.5s both',
          }}>
            Payment confirmed ✓
          </div>

          {/* Heading */}
          <h1 style={{
            fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)',
            fontWeight: 700,
            fontSize: 'clamp(30px,5vw,50px)',
            color: '#FFFDF8',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            textAlign: 'center',
            margin: '0 0 1.5rem',
            animation: 'fadeUp 0.8s ease 0.3s both',
          }}>
            You just made the best decision for your clinic.
          </h1>

          {/* Warm message */}
          <div style={{
            fontFamily: 'var(--font-inter, Inter, sans-serif)',
            fontWeight: 400,
            fontSize: 17,
            color: 'rgba(250,247,242,0.55)',
            lineHeight: 1.85,
            textAlign: 'center',
            maxWidth: 460,
            animation: 'fadeUp 0.8s ease 0.6s both',
            marginBottom: '2.25rem',
          }}>
            <p style={{ margin: '0 0 0.9rem' }}>
              Lumio is already working behind the scenes — learning your clinic, organising your clients, and getting ready to take the load off.
            </p>
            <p style={{ margin: '0 0 0.9rem' }}>
              From today, you won&apos;t be chasing follow-ups, worrying about empty slots, or wondering who needs attention. Lumi handles it.
            </p>
            <p style={{ margin: 0 }}>
              This is the start of running your clinic on your terms.
            </p>
          </div>

          {/* What happens next card */}
          <div style={{
            width: '100%',
            background: 'rgba(255,253,248,0.03)',
            border: '1px solid rgba(255,253,248,0.08)',
            borderRadius: '1.25rem',
            padding: 'clamp(1.25rem,4vw,1.75rem)',
            marginBottom: '2rem',
            animation: 'fadeUp 0.8s ease 0.9s both',
          }}>
            <div style={{
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(250,247,242,0.32)',
              marginBottom: '1.15rem',
            }}>
              What happens next
            </div>
            {[
              { n: 1, title: 'Access your dashboard', body: 'Log in, connect your booking system, and meet Lumi — your AI clinic manager.' },
              { n: 2, title: 'Lumi learns your clients', body: 'Within 24 hours, Lumi will have mapped your client history and identified who needs attention first.' },
              { n: 3, title: 'You get your time back', body: 'Sit back. Lumi handles the follow-ups, reminders, and rebooking nudges — automatically.' },
            ].map((step, i) => (
              <div
                key={step.n}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'flex-start',
                  paddingTop: i > 0 ? '1rem' : 0,
                  marginTop: i > 0 ? '1rem' : 0,
                  borderTop: i > 0 ? '1px solid rgba(255,253,248,0.06)' : 'none',
                }}
              >
                <div style={{
                  flexShrink: 0,
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: 'rgba(196,151,63,0.14)',
                  border: '1px solid rgba(196,151,63,0.32)',
                  display: 'grid',
                  placeItems: 'center',
                  fontFamily: 'var(--font-inter, Inter, sans-serif)',
                  fontWeight: 700,
                  fontSize: 12,
                  color: '#C4973F',
                }}>
                  {step.n}
                </div>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-inter, Inter, sans-serif)',
                    fontWeight: 600,
                    fontSize: 14,
                    color: '#FFFDF8',
                    lineHeight: 1.35,
                    marginBottom: 4,
                  }}>
                    {step.title}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-inter, Inter, sans-serif)',
                    fontWeight: 400,
                    fontSize: 13,
                    color: 'rgba(250,247,242,0.45)',
                    lineHeight: 1.65,
                  }}>
                    {step.body}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            animation: 'fadeUp 0.8s ease 1.1s both',
            marginBottom: '2rem',
          }}>
            <a
              href="/demo"
              className="wc-cta-gold"
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'center',
                background: '#C4973F',
                color: '#0F0E0B',
                fontFamily: 'var(--font-inter, Inter, sans-serif)',
                fontWeight: 700,
                fontSize: 15,
                padding: '14px 24px',
                borderRadius: '0.85rem',
                textDecoration: 'none',
                transition: 'background 200ms ease',
                letterSpacing: '-0.01em',
                boxSizing: 'border-box',
              }}
            >
              Explore your dashboard →
            </a>
            <a
              href="/video"
              className="wc-cta-ghost"
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'center',
                background: 'transparent',
                color: 'rgba(250,247,242,0.6)',
                fontFamily: 'var(--font-inter, Inter, sans-serif)',
                fontWeight: 600,
                fontSize: 15,
                padding: '13px 24px',
                borderRadius: '0.85rem',
                textDecoration: 'none',
                border: '1px solid rgba(196,151,63,0.28)',
                transition: 'border-color 200ms ease, color 200ms ease',
                letterSpacing: '-0.01em',
                boxSizing: 'border-box',
              }}
            >
              Watch the product video
            </a>
          </div>

          {/* Sign-off */}
          <div style={{
            width: '100%',
            textAlign: 'center',
            animation: 'fadeUp 0.8s ease 1.3s both',
          }}>
            <p style={{
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              fontWeight: 400,
              fontSize: 13,
              color: 'rgba(250,247,242,0.3)',
              lineHeight: 1.75,
              margin: '0 0 0.4rem',
            }}>
              Any questions before you get started? I&apos;m always here.
            </p>
            <a
              href="mailto:hello@lumio.london"
              style={{
                fontFamily: 'var(--font-inter, Inter, sans-serif)',
                fontWeight: 400,
                fontSize: 13,
                color: 'rgba(196,151,63,0.55)',
                textDecoration: 'none',
              }}
            >
              hello@lumio.london
            </a>
            <p style={{
              fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 14,
              color: 'rgba(250,247,242,0.28)',
              margin: '0.65rem 0 0',
            }}>
              — Luke, Lumio
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
