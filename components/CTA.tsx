'use client';

import { useState } from 'react';
import GoldButton from '@/components/ui/GoldButton';

export default function CTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <section
      id="audit"
      className="relative bg-[#1A1814] py-28 px-4 overflow-hidden text-center"
    >
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[130px] opacity-10"
        style={{ background: '#C4973F' }}
      />

      <div className="relative mx-auto max-w-3xl flex flex-col items-center gap-8">
        <span className="text-xs font-bold uppercase tracking-[.2em] text-[#C4973F]">Revenue Reveal</span>

        <h2 className="font-display font-black text-5xl md:text-7xl lg:text-8xl leading-[.88] tracking-[-0.04em] text-[#FFFDF8]">
          Find out exactly<br />
          how much you&apos;re <span className="italic gold-text">leaving.</span>
        </h2>

        <p className="text-[#8A8278] max-w-md text-base leading-relaxed">
          Takes 3 minutes. Instant results. No call required. We&apos;ll show you exactly
          where your clinic is losing leads and revenue — and what Lumio would do about it.
        </p>

        {/* Primary CTA */}
        <GoldButton href="/audit">
          Find out what your clinic is losing — free, instant, no call needed
        </GoldButton>

        {/* Secondary: email */}
        {!submitted ? (
          <div className="w-full max-w-md flex flex-col gap-3">
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
          </div>
        ) : (
          <p className="text-sm text-[#C4973F] font-semibold flex items-center gap-2 justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            Report on its way to {email}
          </p>
        )}

        <p className="text-xs text-white/30">
          Prefer to speak to someone?{' '}
          <a
            href="mailto:hello@lumio.london"
            className="text-[#E8B44B] hover:text-[#F4D38A] transition-colors"
          >
            Book a call instead →
          </a>
        </p>
      </div>
    </section>
  );
}
