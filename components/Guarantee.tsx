'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ease = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

export default function Guarantee() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative bg-[#0F0D0B] py-20 px-4 text-center overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[120px] opacity-[0.08]"
        style={{ background: '#C4973F' }} />
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="relative mx-auto max-w-2xl flex flex-col items-center gap-6"
      >
        <motion.span variants={fadeUp} className="text-xs font-bold uppercase tracking-[.2em] text-[#C4973F]">Our Guarantee</motion.span>
        <motion.div variants={fadeUp}>
          <svg width="48" height="56" viewBox="0 0 48 56" fill="none">
            <path d="M24 2L4 10v18c0 12 8.5 23.2 20 26 11.5-2.8 20-14 20-26V10L24 2z"
              stroke="#C4973F" strokeWidth="2" fill="rgba(196,151,63,0.08)" />
            <path d="M16 28l5 5 11-11" stroke="#C4973F" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
        <motion.h2 variants={fadeUp} className="font-display font-black text-4xl md:text-6xl leading-[.9] tracking-[-0.03em] text-[#FFFDF8]">
          30-day money back.<br />No questions.
        </motion.h2>
        <motion.p variants={fadeUp} className="text-[#8A8278] max-w-md text-base leading-relaxed">
          If Lumio doesn&apos;t capture at least 5 additional leads in your first 30 days,
          we&apos;ll refund your full setup fee. No questions. No arguments.
          We&apos;re that confident it works.
        </motion.p>
        <motion.p variants={fadeUp} className="text-xs text-white/30 font-semibold tracking-wide">Because we know what it does.</motion.p>
      </motion.div>
    </section>
  );
}
