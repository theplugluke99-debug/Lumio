'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useCountUp } from '@/hooks/useCountUp';
import { STATS } from '@/lib/data';

const ease = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

type StatDef = typeof STATS[0] & { delay: number; triggered: boolean };

function StatCard({
  value, label, insight, source,
  countTarget, countDecimals, prefix, suffix, commas,
  delay, triggered,
}: StatDef) {
  const [hovered, setHovered] = useState(false);
  const count = useCountUp(countTarget, 2000, delay, triggered);

  const display = () => {
    if (!triggered) return value;
    const raw = countDecimals > 0 ? count.toFixed(countDecimals) : String(Math.floor(count));
    const formatted = commas ? Number(raw).toLocaleString('en-GB') : raw;
    return `${prefix}${formatted}${suffix}`;
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      className="group h-full rounded-[1.35rem] md:min-h-[226px] md:rounded-[1.55rem] border border-[#1A1814]/8 bg-white/75 shadow-sm p-5 md:p-5 flex flex-col gap-2.5 transition-all duration-300 ease-out md:hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4973F]/50"
      style={{ boxShadow: hovered ? '0 0 0 1px rgba(196,151,63,.75), 0 22px 56px rgba(196,151,63,.12)' : undefined }}
    >
      <div className="flex flex-1 flex-col justify-between gap-3">
        <div className="font-display font-black text-4xl md:text-[2.8rem] tracking-[-0.04em] gold-text leading-none">
          {display()}
        </div>
        <p className="text-[13px] md:text-[13px] text-[#2E2B26] leading-relaxed">{label}</p>
      </div>
      <div
        className="mt-2 overflow-hidden border-t border-[#C4973F]/20 pt-3 md:max-h-0 md:pt-0 md:opacity-0 md:transition-all md:duration-500 md:ease-out md:group-hover:max-h-32 md:group-hover:pt-3 md:group-hover:opacity-100 md:group-focus:max-h-32 md:group-focus:pt-3 md:group-focus:opacity-100"
      >
        <p className="text-xs md:text-[12px] text-[#1A1814] font-semibold leading-relaxed">{insight}</p>
        <p className="text-xs text-[#8A8278] mt-1">Source: {source}</p>
      </div>
    </div>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const motionRef = useRef(null);
  const [triggered, setTriggered] = useState(false);
  const inView = useInView(motionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#FFFDF8] px-6 py-16 md:px-4 md:py-20">
      <motion.div
        ref={motionRef}
        variants={stagger}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 items-start"
      >
        {STATS.map((s, i) => (
          <motion.div key={s.value + s.source} variants={fadeUp} className="h-full">
            <StatCard {...s} delay={i * 150} triggered={triggered} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
