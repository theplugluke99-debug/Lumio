'use client';

import { useState, useEffect } from 'react';
import Logo from '@/components/ui/Logo';
import GoldButton from '@/components/ui/GoldButton';

interface Props {
  onStart: (clinicName: string) => void;
}

const GOLD_GRAD: React.CSSProperties = {
  background: 'linear-gradient(110deg,#C4973F 0%,#E8B44B 45%,#F4D38A 100%)',
  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
};

export default function PhaseIntro({ onStart }: Props) {
  const [visible, setVisible] = useState(false);
  const [clinicName, setClinicName] = useState('');
  useEffect(() => { const t = setTimeout(() => setVisible(true), 60); return () => clearTimeout(t); }, []);

  return (
    <div className="min-h-screen bg-[#1A1814] flex flex-col overflow-hidden relative"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease' }}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] opacity-10"
          style={{ background: 'radial-gradient(ellipse, #C4973F 0%, transparent 65%)' }} />
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden select-none">
          <span className="font-display text-[28vw] font-black italic text-white select-none"
            style={{ opacity: 0.018, letterSpacing: '-0.04em', whiteSpace: 'nowrap' }}>Lumio</span>
        </div>
      </div>

      <div className="relative z-10 px-6 pt-7 flex justify-between items-center">
        <a href="/"><Logo light /></a>
        <a href="/" className="text-sm text-white/40 hover:text-white/70 transition-colors">← Back to site</a>
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-20">
        <div className="flex flex-col items-center text-center gap-8 max-w-2xl w-full">
          <div style={{ animation: 'rise 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both' }}
            className="inline-flex items-center gap-2 rounded-full border border-[#C4973F]/30 bg-[#C4973F]/10 px-4 py-2 text-xs font-bold tracking-widest text-[#E8B44B] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C4973F] pulse-dot" />
            Free · Takes 3 minutes · Instant results
          </div>

          <h1 style={{ animation: 'rise 0.7s cubic-bezier(0.22,1,0.36,1) 0.25s both' }}
            className="font-display font-black text-4xl md:text-6xl lg:text-7xl leading-[.9] tracking-[-0.04em] text-[#FFFDF8]">
            Find out exactly what your clinic is{' '}
            <span className="italic" style={GOLD_GRAD}>leaving on the table.</span>
          </h1>

          <p style={{ animation: 'rise 0.7s cubic-bezier(0.22,1,0.36,1) 0.4s both', color: 'rgba(255,253,248,0.58)' }}
            className="text-base md:text-lg leading-relaxed max-w-lg">
            Answer 8 questions. Get a personalised revenue report showing exactly how much
            your clinic is losing every month — and what to do about it.
          </p>

          <div style={{ animation: 'rise 0.7s cubic-bezier(0.22,1,0.36,1) 0.5s both' }}
            className="w-full max-w-sm flex flex-col gap-3">
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-xs text-white/40 font-semibold uppercase tracking-widest px-1">
                Your clinic name (optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Glow Aesthetics London"
                value={clinicName}
                onChange={(e) => setClinicName(e.target.value)}
                className="rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-sm px-5 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-[#C4973F]/50 transition-colors"
              />
            </div>
            <GoldButton onClick={() => onStart(clinicName.trim())} large>Start my free audit</GoldButton>
            <p className="text-xs text-white/25 text-center">No email required to start. No sales calls.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
