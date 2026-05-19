'use client';

import { useRef, useState } from 'react';
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

export default function CTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="audit"
      className="relative bg-[#1A1814] py-22 px-6 md:py-28 md:px-4 overflow-hidden text-center"
    >
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[130px] opacity-10"
        style={{ background: '#C4973F' }}
      />

      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="relative mx-auto max-w-3xl flex flex-col items-center gap-8"
      >
        <motion.span variants={fadeUp} className="text-xs font-bold uppercase tracking-[.2em] text-[#C4973F]">Revenue Reveal</motion.span>

        <motion.h2 variants={fadeUp} className="font-display font-black text-5xl md:text-7xl lg:text-8xl leading-[.88] tracking-[-0.04em] text-[#FFFDF8]">
          Find out exactly<br />
          how much you&apos;re <span className="italic gold-text">leaving.</span>
        </motion.h2>

        <motion.p variants={fadeUp} className="text-[#8A8278] max-w-xl text-base leading-relaxed">
          Takes 3 minutes. Instant results. No call required. We&apos;ll show you exactly
          where your clinic is losing leads and revenue — and what Lumio would do about it.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col items-center gap-3">
          <a
            href="/audit"
            className="inline-flex max-w-full items-center justify-center rounded-full bg-[#C4973F] px-7 py-4 text-sm font-semibold text-[#1A1814] shadow-[0_20px_60px_rgba(196,151,63,.2)] transition-all duration-200 hover:-translate-y-1 hover:bg-[#E8B44B] md:px-9 md:text-base"
          >
            Find out what your clinic is losing — free, instant, no call needed →
          </a>
          <p className="text-xs text-white/30">
            Personalised to your clinic · Free Revenue Reveal · No call required
          </p>
          <p style={{ fontWeight: 400, fontSize: 14, color: 'rgba(250,247,242,0.4)', marginTop: '1rem' }}>
            Or{' '}
            <a
              href="https://calendly.com/hello-lumio/30min"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#C4973F', textDecoration: 'none' }}
              className="hover:opacity-80 transition-opacity"
            >
              speak to a human first
            </a>{' '}→
          </p>
        </motion.div>

        {/* Secondary: email */}
        <motion.div variants={fadeUp} className="w-full max-w-md flex flex-col gap-3">
          {!submitted ? (
            <>
              <p className="text-xs text-white/30 uppercase tracking-widest font-semibold">
                Or get the full report by email
              </p>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] backdrop-blur-xl px-2 py-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-white placeholder-white/30 px-4 outline-none"
                />
                <button
                  onClick={() => { if (email) setSubmitted(true); }}
                  className="rounded-full bg-[#C4973F] text-[#1A1814] text-sm font-bold px-5 py-2.5 hover:bg-[#E8B44B] transition-colors shrink-0"
                >
                  Send report →
                </button>
              </div>
            </>
          ) : (
            <p className="text-sm text-[#C4973F] font-semibold flex items-center gap-2 justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              Report on its way to {email}
            </p>
          )}
        </motion.div>

        <motion.p variants={fadeUp} className="text-xs text-white/30">
          Prefer to speak to someone?{' '}
          <a
            href="mailto:hello@lumio.london"
            className="text-[#E8B44B] hover:text-[#F4D38A] transition-colors"
          >
            Book a call instead →
          </a>
        </motion.p>
      </motion.div>
    </section>
  );
}
