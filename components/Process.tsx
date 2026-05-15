'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { STEPS } from '@/lib/data';

const ease = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

export default function Process() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-100px' });

  const stepsRef = useRef(null);
  const stepsInView = useInView(stepsRef, { once: true, margin: '-100px' });

  return (
    <section id="process" className="relative bg-[#1A1814] py-24 px-4 overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-10" style={{ background: '#C4973F' }} />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          ref={headingRef}
          variants={stagger}
          initial="hidden"
          animate={headingInView ? 'visible' : 'hidden'}
          className="text-center mb-14"
        >
          <motion.span variants={fadeUp} className="text-xs font-bold uppercase tracking-[.2em] text-[#C4973F]">How it works</motion.span>
          <motion.h2 variants={fadeUp} className="mt-3 font-display font-black text-5xl md:text-7xl leading-[.9] tracking-[-0.03em] text-[#FFFDF8]">
            Live in <span className="italic gold-text">5–7 days.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-[#8A8278] max-w-md mx-auto text-base">You don&apos;t have to do anything technical.</motion.p>
        </motion.div>

        <motion.div
          ref={stepsRef}
          variants={stagger}
          initial="hidden"
          animate={stepsInView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {STEPS.map((s) => (
            <motion.div
              key={s.n}
              variants={fadeUp}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-7 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1"
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(196,151,63,0.5)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = ''; }}
            >
              <div className="flex items-center justify-between">
                <span className="font-display italic font-black text-5xl gold-text leading-none">{s.n}</span>
                <span className="rounded-full border border-[#C4973F]/30 text-[#E8B44B] text-xs font-semibold px-3 py-1">{s.time}</span>
              </div>
              <h3 className="font-display font-bold text-lg text-white">{s.title}</h3>
              <p className="text-sm text-[#8A8278] leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
