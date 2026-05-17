'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SERVICES } from '@/lib/data';

const ease = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

export default function Services() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-100px' });

  const cardsRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: '-100px' });

  return (
    <section id="services" className="py-20 px-6 md:py-24 md:px-4" style={{ background: 'linear-gradient(180deg, #FFFDF8 0%, #F0EDF8 50%, #FFFDF8 100%)' }}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          ref={headingRef}
          variants={stagger}
          initial="hidden"
          animate={headingInView ? 'visible' : 'hidden'}
          className="text-center mb-14"
        >
          <motion.span variants={fadeUp} className="text-xs font-bold uppercase tracking-[.2em] text-[#C4973F]">What Lumio does</motion.span>
          <motion.h2 variants={fadeUp} className="mt-3 font-display font-black text-5xl md:text-7xl leading-[.9] tracking-[-0.03em] text-[#1A1814]">
            Everything <span className="italic gold-text">handled.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-[#8A8278] max-w-md mx-auto text-base">Built for your clinic. Live in 5–7 days. No tech knowledge needed.</motion.p>
        </motion.div>

        <motion.div
          ref={cardsRef}
          variants={stagger}
          initial="hidden"
          animate={cardsInView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {SERVICES.map((s) => (
            <motion.div
              key={s.n}
              variants={fadeUp}
              className="group relative rounded-[2rem] border border-[#1A1814]/8 bg-[#FFFDF8]/78 shadow-sm p-7 flex flex-col gap-4 overflow-hidden transition-all duration-300 hover:-translate-y-1"
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#C4973F'; (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 60px rgba(196,151,63,.12)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
            >
              <span className="absolute top-5 right-6 font-display italic font-black text-[4rem] leading-none text-[#1A1814]/[0.04] select-none">{s.n}</span>
              <div className="h-10 w-10 rounded-2xl bg-[#C4973F] flex items-center justify-center text-white text-lg">{s.icon}</div>
              <h3 className="font-display font-bold text-xl text-[#1A1814]">{s.name}</h3>
              <p className="text-sm text-[#8A8278] leading-relaxed flex-1">{s.body}</p>
              <div className="relative">
                <p className="text-xs font-bold text-[#C4973F] uppercase tracking-wide">{s.stat}</p>
                <span className="absolute bottom-[-2px] left-0 h-[2px] w-0 bg-[#C4973F] transition-all duration-500 group-hover:w-full" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
