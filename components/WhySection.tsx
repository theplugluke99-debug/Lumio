'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const ease = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

/* Arc that mirrors the Lumio logo language */
const LumioArc = () => (
  <svg
    viewBox="0 0 120 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '60px', display: 'block', margin: '0 auto', opacity: 0.6 }}
  >
    <path
      d="M20 60 Q60 10 100 60"
      stroke="#C4973F"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <circle cx="60" cy="55" r="10" stroke="#C4973F" strokeWidth="1" opacity="0.7" />
    <circle cx="60" cy="50" r="4" fill="#C4973F" opacity="0.5" />
  </svg>
);

export default function WhySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section style={{ background: '#0A0907', padding: '5rem 2rem' }}>
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}
      >
        <motion.div variants={fadeUp}>
          <LumioArc />
        </motion.div>

        <motion.span
          variants={fadeUp}
          style={{
            display: 'block',
            fontFamily: 'var(--font-inter, Inter, sans-serif)',
            fontWeight: 600,
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: '#C4973F',
            margin: '1rem 0 1.5rem',
          }}
        >
          Bigger picture
        </motion.span>

        <motion.h2
          variants={fadeUp}
          style={{
            fontFamily: 'var(--font-display, "Playfair Display", serif)',
            fontWeight: 700,
            fontSize: 'clamp(26px, 4vw, 42px)',
            color: '#FFFDF8',
            lineHeight: 1.15,
            margin: 0,
          }}
        >
          Built with purpose.
          <br />
          Beyond the product.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          style={{
            fontFamily: 'var(--font-inter, Inter, sans-serif)',
            fontWeight: 400,
            fontSize: '17px',
            color: 'rgba(250,247,242,0.45)',
            lineHeight: 1.9,
            maxWidth: '480px',
            margin: '1.5rem auto 0',
          }}
        >
          Every subscription contributes to something larger — technology infrastructure
          built around people, not profit. Independent. Intentional. For the long term.
        </motion.p>

        <motion.div variants={fadeUp} style={{ marginTop: '2.5rem' }}>
          <Link
            href="/why"
            style={{
              display: 'inline-block',
              border: '1px solid rgba(196,151,63,0.3)',
              background: 'transparent',
              color: '#C4973F',
              borderRadius: '99px',
              padding: '12px 28px',
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              fontWeight: 600,
              fontSize: '14px',
              textDecoration: 'none',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(196,151,63,0.6)';
              e.currentTarget.style.color = '#E8B44B';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(196,151,63,0.3)';
              e.currentTarget.style.color = '#C4973F';
            }}
          >
            Read why →
          </Link>

          <p
            style={{
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              fontWeight: 400,
              fontSize: '12px',
              color: 'rgba(250,247,242,0.35)',
              fontStyle: 'italic',
              marginTop: '1rem',
            }}
          >
            Where your money actually goes.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
