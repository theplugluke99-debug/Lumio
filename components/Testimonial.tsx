'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TESTIMONIAL } from '@/lib/data';

const ease = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

export default function Testimonial() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="bg-[#F2DDD8] py-24 md:py-28 px-4 text-center">
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="mx-auto max-w-[980px] flex flex-col items-center gap-7"
      >
        <motion.div variants={fadeUp} className="text-[#C4973F] text-2xl tracking-widest">★★★★★</motion.div>
        <motion.blockquote variants={fadeUp} className="font-display font-semibold text-3xl md:text-4xl lg:text-5xl leading-[1.25] tracking-[-0.02em] text-[#1A1814]">
          &ldquo;{TESTIMONIAL.quote}&rdquo;
        </motion.blockquote>
        <motion.p variants={fadeUp} className="text-sm font-semibold text-[#8A8278] tracking-wide uppercase">{TESTIMONIAL.author}</motion.p>
      </motion.div>
    </section>
  );
}
