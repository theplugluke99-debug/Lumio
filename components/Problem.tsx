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

const LEAKS = [
  {
    n: '01',
    title: 'Missed response windows',
    text: 'Enquiries arrive while you are in treatment, then cool off before anyone has time to reply.',
  },
  {
    n: '02',
    title: 'Unconfirmed appointments',
    text: 'Bookings sit in limbo without the right confirmation, reminder, or next step at the right moment.',
  },
  {
    n: '03',
    title: 'Clients not rebooked',
    text: 'Happy clients leave without a clear follow-up path, so revenue depends on them remembering you first.',
  },
  {
    n: '04',
    title: 'No-shows not prevented',
    text: 'Empty slots are treated as bad luck instead of a preventable sequence of missed reminders.',
  },
];

export default function Problem() {
  const leftRef = useRef(null);
  const leftInView = useInView(leftRef, { once: true, margin: '-100px' });

  const rightRef = useRef(null);
  const rightInView = useInView(rightRef, { once: true, margin: '-100px' });

  return (
    <section className="grid md:grid-cols-2">
      <motion.div
        ref={leftRef}
        variants={stagger}
        initial="hidden"
        animate={leftInView ? 'visible' : 'hidden'}
        className="bg-[#F9EDE8] px-8 md:px-14 py-20 md:py-28 flex flex-col justify-center gap-7"
      >
        <motion.span variants={fadeUp} className="text-xs font-bold uppercase tracking-[.2em] text-[#C4973F]">The reality</motion.span>
        <motion.h2 variants={fadeUp} className="font-display font-black text-5xl md:text-7xl lg:text-8xl leading-[.9] tracking-[-0.03em] text-[#1A1814]">
          You&apos;re losing<br />
          <span className="italic gold-text">money right now.</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-[#8A8278] leading-relaxed max-w-sm text-base">
          The UK aesthetics industry is worth £3.6 billion — and the vast majority of clinics
          are still managing enquiries on WhatsApp, missing bookings while in treatment, and
          leaving revenue on the table every single day.
        </motion.p>
        <motion.p variants={fadeUp} className="text-[#8A8278] leading-relaxed max-w-sm text-base">
          The systems exist to fix this. Most clinic owners just don&apos;t have the time to
          find and set them up. That&apos;s exactly what Lumio does.
        </motion.p>
      </motion.div>

      <div className="relative bg-[#1A1814] px-8 md:px-14 py-20 md:py-28 flex flex-col justify-center gap-6 overflow-hidden">
        <div className="pointer-events-none absolute top-[-60px] right-[-60px] w-[300px] h-[300px] rounded-full blur-[80px] opacity-15" style={{ background: '#C4973F' }} />
        <motion.div
          ref={rightRef}
          variants={stagger}
          initial="hidden"
          animate={rightInView ? 'visible' : 'hidden'}
          className="flex flex-col gap-6"
        >
          <motion.span variants={fadeUp} className="text-xs font-bold uppercase tracking-[.2em] text-[#C4973F]">Where the money leaks</motion.span>
          <motion.p variants={fadeUp} className="max-w-md text-base leading-relaxed text-white/55">
            These are not isolated moments. They are quiet revenue leaks happening underneath a busy clinic.
          </motion.p>
          {LEAKS.map((p) => (
            <motion.div
              key={p.n}
              variants={fadeUp}
              className="rounded-[1.6rem] border border-white/10 bg-white/[0.045] px-5 py-5 flex gap-4 transition-all duration-300 hover:-translate-y-0.5"
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(196,151,63,0.4)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(196,151,63,.08)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
            >
              <span className="font-display italic text-[#C4973F]/40 text-lg font-black shrink-0 mt-0.5">{p.n}</span>
              <div>
                <h3 className="text-sm font-bold text-white/80">{p.title}</h3>
                <p className="mt-1 text-sm text-white/55 leading-relaxed">{p.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
