'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ease = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

export default function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      style={{
        backgroundColor: '#0F0E0B',
        padding: '8rem 2rem',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '580px', margin: '0 auto' }}>
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Lumi orb with spinning arc */}
          <motion.div
            variants={fadeUp}
            style={{
              position: 'relative',
              width: '120px',
              height: '120px',
              margin: '0 auto 3rem',
            }}
          >
            {/* Spinning arc */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                animation: 'lumioSpin 8s linear infinite',
              }}
            >
              <svg viewBox="0 0 120 120" width="120" height="120">
                <path
                  d="M15 90 Q60 10 105 90"
                  stroke="#C4973F"
                  strokeWidth="1"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.7"
                />
              </svg>
            </div>

            {/* Static orb */}
            <div
              style={{
                position: 'absolute',
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                background:
                  'radial-gradient(circle at 35% 30%, #F5E6C8, #C4973F, #8B6420)',
                animation: 'lumioBreathe 3s ease infinite',
              }}
            />
          </motion.div>

          {/* CTA Card */}
          <motion.div
            variants={fadeUp}
            style={{
              background: 'rgba(255,253,248,0.03)',
              border: '1px solid rgba(196,151,63,0.15)',
              borderRadius: '2rem',
              padding: '3.5rem 3rem',
            }}
          >
            <motion.span
              variants={fadeUp}
              style={{
                display: 'block',
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                fontWeight: 500,
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: '#C4973F',
                marginBottom: '1.5rem',
              }}
            >
              FIND OUT WHAT YOUR CLINIC IS LOSING
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="font-display"
              style={{
                fontSize: 'clamp(32px, 4vw, 52px)',
                fontWeight: 700,
                color: '#FFFDF8',
                lineHeight: 1.1,
                margin: '0 0 1.5rem',
              }}
            >
              Your revenue.
              <br />
              <em style={{ color: '#C4973F' }}>Revealed in 3 minutes.</em>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                fontWeight: 400,
                fontSize: '16px',
                color: 'rgba(250,247,242,0.4)',
                lineHeight: 1.9,
                maxWidth: '420px',
                margin: '0 auto 2.5rem',
              }}
            >
              Most clinic owners are surprised by their number. Not because
              things are going badly — but because the gaps are invisible until
              you calculate them.
            </motion.p>

            <motion.div variants={fadeUp}>
              <a
                href="/audit"
                style={{
                  display: 'block',
                  width: '100%',
                  background: '#C4973F',
                  color: '#1A1814',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  fontWeight: 600,
                  fontSize: '15px',
                  padding: '16px',
                  textDecoration: 'none',
                  textAlign: 'center',
                  transition: 'background 0.2s ease, transform 0.2s ease',
                  boxShadow: '0 20px 60px rgba(196,151,63,0.2)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = '#E8B44B';
                  (e.currentTarget as HTMLElement).style.transform =
                    'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = '#C4973F';
                  (e.currentTarget as HTMLElement).style.transform =
                    'translateY(0)';
                }}
              >
                Get my free Revenue Reveal →
              </a>
            </motion.div>

            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                fontWeight: 400,
                fontSize: '11px',
                color: 'rgba(250,247,242,0.2)',
                marginTop: '1rem',
              }}
            >
              Personalised to your clinic · Instant results · No call required
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
