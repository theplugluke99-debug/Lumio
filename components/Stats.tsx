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
      className="group h-full min-h-0 rounded-[1.5rem] md:min-h-[300px] md:rounded-[1.75rem] border border-[#1A1814]/8 bg-white/70 shadow-sm p-5 md:p-6 flex flex-col gap-3 transition-all duration-300 md:hover:-translate-y-1"
      style={{ boxShadow: hovered ? '0 0 0 2px #C4973F, 0 20px 60px rgba(196,151,63,.1)' : undefined }}
    >
      <div className="font-display font-black text-4xl md:text-5xl tracking-[-0.04em] gold-text">
        {display()}
      </div>
      <p className="text-[13px] md:text-sm text-[#2E2B26] leading-relaxed">{label}</p>
      <div
        className="mt-2 md:mt-auto md:min-h-[7.25rem] overflow-hidden transition-all duration-500"
        style={{ opacity: hovered ? 1 : undefined, transform: hovered ? 'translateY(0)' : undefined }}
      >
        <p className="text-xs md:text-[13px] text-[#1A1814] font-semibold pt-2 border-t border-[#C4973F]/20">{insight}</p>
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
    <section ref={sectionRef} className="bg-[#FFFDF8] py-18 px-6 md:py-20 md:px-4">
      <motion.div
        ref={motionRef}
        variants={stagger}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 items-stretch"
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
