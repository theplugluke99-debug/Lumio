'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ease = [0.25, 0.1, 0.25, 1] as const;

const wordFade = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

function WordByWord({
  text,
  goldWords = [],
}: {
  text: string;
  goldWords?: string[];
}) {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, i) => {
        const isGold = goldWords.includes(word);
        return (
          <motion.span
            key={i}
            variants={wordFade}
            style={{
              display: 'inline-block',
              marginRight: '0.3em',
              color: isGold ? '#C4973F' : undefined,
            }}
          >
            {word}
          </motion.span>
        );
      })}
    </>
  );
}

export default function PivotSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const subRef = useRef(null);
  const subInView = useInView(subRef, { once: true, margin: '-100px' });

  return (
    <section
      style={{
        backgroundColor: '#1A1814',
        padding: '8rem 2rem',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="font-display"
          style={{
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: 700,
            fontStyle: 'italic',
            color: '#FFFDF8',
            lineHeight: 1.3,
          }}
        >
          <WordByWord text="You built something people love." />
          <br />
          <WordByWord
            text="You shouldn't have to choose between doing it well and running it well."
            goldWords={['doing', 'it', 'well', 'running']}
          />
        </motion.div>

        <motion.div
          ref={subRef}
          variants={stagger}
          initial="hidden"
          animate={subInView ? 'visible' : 'hidden'}
        >
          <motion.div
            variants={fadeUp}
            style={{ transitionDelay: '0.8s' }}
            transition={{ delay: 0.8 }}
          >
            <div
              style={{
                width: '40px',
                height: '1px',
                background: '#C4973F',
                margin: '2rem auto',
              }}
            />
          </motion.div>
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
              fontWeight: 400,
              fontSize: '16px',
              color: 'rgba(250,247,242,0.4)',
              margin: 0,
            }}
          >
            That&apos;s what Lumio is for.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
