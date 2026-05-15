'use client';

import { useRef, useEffect, useState } from 'react';
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

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const frame = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [active, target, duration]);
  return count;
}

function CountNumber({
  target,
  suffix = '',
  label,
  sub,
  active,
}: {
  target: number;
  suffix?: string;
  label: string;
  sub: string;
  active: boolean;
}) {
  const count = useCountUp(target, 2000, active);
  return (
    <div style={{ textAlign: 'center', flex: 1 }}>
      <div
        className="font-display"
        style={{
          fontSize: 'clamp(64px, 10vw, 120px)',
          fontWeight: 900,
          color: '#C4973F',
          lineHeight: 1,
        }}
      >
        {count}{suffix}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-sans, Inter, sans-serif)',
          fontWeight: 600,
          fontSize: '14px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: '#FFFDF8',
          marginTop: '1rem',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-sans, Inter, sans-serif)',
          fontWeight: 400,
          fontSize: '13px',
          color: 'rgba(250,247,242,0.35)',
          marginTop: '0.5rem',
          lineHeight: 1.6,
        }}
      >
        {sub}
      </div>
    </div>
  );
}

function StaticNumber({ label, sub }: { label: string; sub: string }) {
  return (
    <div style={{ textAlign: 'center', flex: 1 }}>
      <div
        className="font-display"
        style={{
          fontSize: 'clamp(64px, 10vw, 120px)',
          fontWeight: 900,
          color: '#C4973F',
          lineHeight: 1,
        }}
      >
        &lt;30s
      </div>
      <div
        style={{
          fontFamily: 'var(--font-sans, Inter, sans-serif)',
          fontWeight: 600,
          fontSize: '14px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: '#FFFDF8',
          marginTop: '1rem',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-sans, Inter, sans-serif)',
          fontWeight: 400,
          fontSize: '13px',
          color: 'rgba(250,247,242,0.35)',
          marginTop: '0.5rem',
          lineHeight: 1.6,
        }}
      >
        {sub}
      </div>
    </div>
  );
}

const GOLD_LINE = (
  <div
    style={{
      width: '1px',
      backgroundColor: 'rgba(196,151,63,0.25)',
      alignSelf: 'stretch',
    }}
    className="hidden md:block"
  />
);

export default function NumbersSection() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: '-100px' });

  const numbersRef = useRef(null);
  const numbersInView = useInView(numbersRef, { once: true, margin: '-100px' });

  return (
    <section
      style={{
        backgroundColor: '#0F0E0B',
        padding: '7rem 2rem',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          ref={headRef}
          variants={stagger}
          initial="hidden"
          animate={headInView ? 'visible' : 'hidden'}
          style={{ marginBottom: '4rem' }}
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
              marginBottom: '1.25rem',
            }}
          >
            WHAT CHANGES
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display"
            style={{
              fontSize: 'clamp(28px, 4vw, 52px)',
              fontWeight: 700,
              color: '#FFFDF8',
              lineHeight: 1.2,
              margin: '0 auto 1rem',
            }}
          >
            Everything that used to
            <br />
            keep you up at night.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
              fontWeight: 400,
              fontSize: '17px',
              color: 'rgba(250,247,242,0.35)',
              margin: '0 auto',
            }}
          >
            Handled. Automatically. Before you even think of it.
          </motion.p>
        </motion.div>

        {/* Numbers */}
        <motion.div
          ref={numbersRef}
          variants={stagger}
          initial="hidden"
          animate={numbersInView ? 'visible' : 'hidden'}
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '3rem',
            alignItems: 'stretch',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <motion.div variants={fadeUp} style={{ flex: 1, minWidth: '220px' }}>
            <CountNumber
              target={99}
              suffix="%"
              label="Enquiries answered"
              sub={'Every single one.\nDay or night.'}
              active={numbersInView}
            />
          </motion.div>

          {GOLD_LINE}

          <motion.div variants={fadeUp} style={{ flex: 1, minWidth: '220px' }}>
            <CountNumber
              target={67}
              suffix="%"
              label="Fewer no-shows"
              sub={'The right reminder.\nThe right time.'}
              active={numbersInView}
            />
          </motion.div>

          {GOLD_LINE}

          <motion.div variants={fadeUp} style={{ flex: 1, minWidth: '220px' }}>
            <StaticNumber
              label="Response time"
              sub={"While you're with\na client."}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
