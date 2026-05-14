'use client';

import { useState } from 'react';
import Logo from '@/components/ui/Logo';
import { Results } from '@/lib/audit';

interface Props { r: Results; }

export default function ResultsCTA({ r }: Props) {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  return (
    <>
      <div className="relative py-20 px-4 bg-[#0F0D0B] text-center overflow-hidden">
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] opacity-8"
          style={{ background: '#C4973F' }} />

        <div className="relative z-10 mx-auto max-w-xl flex flex-col items-center gap-3">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#C4973F]">Ready to recover this revenue?</p>
          <h3 className="font-display font-black text-3xl md:text-5xl text-[#FFFDF8] leading-[.95] tracking-[-0.03em]">
            See your clinic running itself.
          </h3>
        </div>

        <div className="relative z-10 mx-auto max-w-xl mt-10 flex flex-col items-center gap-5">

          {/* Primary — Demo CTA */}
          <div className="w-full flex flex-col items-center gap-2">
            <a
              href="/demo?from=reveal"
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#C4973F] text-[#1A1814] text-sm font-bold px-8 py-4 hover:bg-[#E8B44B] transition-all duration-200 hover:-translate-y-1 shadow-[0_20px_60px_rgba(196,151,63,.3)]"
            >
              See your clinic on Lumio
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
            <p className="text-xs text-white/35">Interactive demo — takes 60 seconds. No email needed.</p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 w-full max-w-xs">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-white/25 font-medium">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Secondary — Email report */}
          <div className="w-full flex flex-col items-center gap-3">
            <p className="text-sm font-semibold text-white/60">Get your full report emailed →</p>
            {!emailSent ? (
              <div className="w-full flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-xl px-2 py-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-white placeholder-white/30 px-4 outline-none"
                />
                <button
                  type="button"
                  onClick={() => { if (email) setEmailSent(true); }}
                  className="rounded-full bg-white/10 text-white/70 text-sm font-semibold px-5 py-2.5 hover:bg-white/20 transition-colors shrink-0"
                >
                  Send report →
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 py-3">
                <div className="h-10 w-10 rounded-full bg-[#C4973F]/20 flex items-center justify-center text-[#C4973F]">✓</div>
                <p className="text-white/70 font-semibold text-sm">Report on its way to {email}</p>
                <p className="text-xs text-white/30">We&apos;ll be in touch within a few hours.</p>
              </div>
            )}
          </div>

          {/* Tertiary — Start today */}
          <a
            href={`/?tier=${encodeURIComponent(r.recommendedTier.toLowerCase().replace(' ', '-'))}#pricing`}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold border border-[#C4973F]/30 text-[#E8B44B]/80 hover:border-[#C4973F]/60 hover:text-[#E8B44B] hover:bg-white/[0.04] transition-all"
          >
            Start today — no call needed →
          </a>

          <p className="text-xs text-white/25">
            Prefer to speak to someone?{' '}
            <a href="mailto:hello@lumio.london" className="text-[#C4973F] hover:text-[#E8B44B] transition-colors underline underline-offset-2">
              Book a 30-minute call →
            </a>
          </p>
        </div>
      </div>

      <div className="bg-[#0F0D0B] border-t border-white/[0.05] px-6 py-8 flex flex-wrap items-center justify-between gap-4">
        <Logo light width={100} />
        <p className="text-xs text-white/25">© Lumio · lumio.london · hello@lumio.london</p>
      </div>
    </>
  );
}
