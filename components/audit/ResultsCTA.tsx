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
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10"
          style={{ background: '#C4973F' }} />
        <div className="relative z-10 mx-auto max-w-xl flex flex-col items-center gap-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#C4973F] mb-3">Ready to recover this revenue?</p>
            <h3 className="font-display font-black text-3xl md:text-5xl text-[#FFFDF8] leading-[.95] tracking-[-0.03em]">
              Get your full report
            </h3>
          </div>
          {!emailSent ? (
            <div className="w-full flex flex-col items-center gap-4">
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
                  className="rounded-full bg-[#C4973F] text-[#1A1814] text-sm font-bold px-5 py-2.5 hover:bg-[#E8B44B] transition-colors shrink-0"
                >
                  Get my full report →
                </button>
              </div>
              <a
                href={`/?tier=${encodeURIComponent(r.recommendedTier.toLowerCase().replace(' ', '-'))}#pricing`}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold border border-[#C4973F]/40 text-[#E8B44B] hover:bg-white/[0.06] transition-colors"
              >
                Start today — no call needed →
              </a>
              <p className="text-xs text-white/30">
                Prefer to speak to someone?{' '}
                <a href="mailto:hello@lumio.london" className="text-[#C4973F] hover:text-[#E8B44B] transition-colors underline underline-offset-2">
                  Book a 30-minute call →
                </a>
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 py-6">
              <div className="h-12 w-12 rounded-full bg-[#C4973F]/20 flex items-center justify-center text-[#C4973F] text-xl">✓</div>
              <p className="text-white font-semibold">Report on its way to {email}</p>
              <p className="text-sm text-white/40">We&apos;ll be in touch within a few hours.</p>
            </div>
          )}
        </div>
      </div>
      <div className="bg-[#0F0D0B] border-t border-white/[0.05] px-6 py-8 flex flex-wrap items-center justify-between gap-4">
        <Logo light />
        <p className="text-xs text-white/25">© Lumio · lumio.london · hello@lumio.london</p>
      </div>
    </>
  );
}
