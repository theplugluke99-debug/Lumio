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
      className="group rounded-[2rem] border border-[#1A1814]/8 bg-white/65 shadow-sm p-7 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1"
      style={{ boxShadow: hovered ? '0 0 0 2px #C4973F, 0 20px 60px rgba(196,151,63,.1)' : undefined }}
    >
      <div className="font-display font-black text-5xl md:text-6xl tracking-[-0.04em] gold-text">
        {display()}
      </div>
      <p className="text-sm text-[#2E2B26] leading-relaxed">{label}</p>
      <div
        className="overflow-hidden transition-all duration-500"
        style={{ maxHeight: hovered ? '7rem' : 0, opacity: hovered ? 1 : 0 }}
      >
        <p className="text-sm text-[#1A1814] font-semibold pt-2 border-t border-[#C4973F]/20">{insight}</p>
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
    <section ref={sectionRef} className="bg-[#FFFDF8] py-20 px-4">
      <motion.div
        ref={motionRef}
        variants={stagger}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="mx-auto max-w-6xl grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {STATS.map((s, i) => (
          <motion.div key={s.value + s.source} variants={fadeUp}>
            <StatCard {...s} delay={i * 150} triggered={triggered} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
