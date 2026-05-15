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

const CARDS = [
  {
    quote:
      'Someone messaged about lip filler at 9pm. By morning they’d booked somewhere else.',
    answer:
      'Every hour without a response, the chance of booking drops by half. Lumio answers in seconds — at 2pm or 2am.',
  },
  {
    quote:
      'I had four no-shows last week. That’s nearly a thousand pounds just gone.',
    answer:
      'No-shows aren’t bad luck. They’re a systems problem. The right reminder at the right time cuts them by up to 67%.',
  },
  {
    quote:
      'I know I should follow up past clients. I just never find the time.',
    answer:
      'Your best leads already trust you. Lumio reaches out in your voice before they drift to a competitor.',
  },
];

export default function PainSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-100px' });

  const cardsRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: '-100px' });

  return (
    <section
      style={{
        backgroundColor: '#111009',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '6rem 1.5rem',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        {/* Opening */}
        <motion.div
          ref={headingRef}
          variants={stagger}
          initial="hidden"
          animate={headingInView ? 'visible' : 'hidden'}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
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
            SOUND FAMILIAR?
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-display"
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 700,
              color: '#FFFDF8',
              lineHeight: 1.1,
              margin: '0 auto 1.5rem',
              maxWidth: '640px',
            }}
          >
            The clinic running fine
            <br />
            <em style={{ color: '#C4973F' }}>on the outside.</em>
          </motion.h2>

          <motion.div
            variants={stagger}
            style={{ maxWidth: '480px', margin: '0 auto' }}
          >
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                fontWeight: 400,
                fontSize: '18px',
                color: 'rgba(250,247,242,0.45)',
                lineHeight: 1.9,
                margin: 0,
              }}
            >
              While you&apos;re with a client, your phone is filling up.
              <br />
              You&apos;ll deal with it later.
            </motion.p>
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                fontWeight: 400,
                fontSize: '18px',
                fontStyle: 'italic',
                color: 'rgba(250,247,242,0.28)',
                lineHeight: 1.9,
                marginTop: '0.5rem',
              }}
            >
              Later never really comes.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Pain cards */}
        <motion.div
          ref={cardsRef}
          variants={stagger}
          initial="hidden"
          animate={cardsInView ? 'visible' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            justifyItems: 'center',
          }}
        >
          {CARDS.map((card) => (
            <motion.div
              key={card.quote}
              variants={fadeUp}
              whileHover={{
                borderColor: 'rgba(196,151,63,0.25)',
                backgroundColor: 'rgba(255,253,248,0.05)',
                y: -4,
              }}
              transition={{ duration: 0.3 }}
              style={{
                background: 'rgba(255,253,248,0.03)',
                border: '1px solid rgba(196,151,63,0.1)',
                borderRadius: '1.5rem',
                padding: '2.5rem 2rem',
                textAlign: 'left',
                maxWidth: '320px',
                width: '100%',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  fontWeight: 400,
                  fontSize: '18px',
                  color: 'rgba(250,247,242,0.86)',
                  lineHeight: 1.68,
                  paddingBottom: '1.25rem',
                  borderBottom: '1px solid rgba(196,151,63,0.1)',
                  marginBottom: '1.25rem',
                }}
              >
                &ldquo;{card.quote}&rdquo;
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  fontWeight: 400,
                  fontSize: '13px',
                  color: 'rgba(250,247,242,0.35)',
                  lineHeight: 1.75,
                }}
              >
                {card.answer}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
