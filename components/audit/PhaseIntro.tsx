'use client';

import { useState, useEffect } from 'react';
import Logo from '@/components/ui/Logo';
import GoldButton from '@/components/ui/GoldButton';
import { LumioOrb } from '@/components/ui/LumioOrb';

interface Props { onStart: (clinicName: string) => void; }

const GOLD_GRAD: React.CSSProperties = {
  background: 'linear-gradient(110deg,#C4973F 0%,#E8B44B 45%,#F4D38A 100%)',
  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
};

export default function PhaseIntro({ onStart }: Props) {
  const [visible, setVisible] = useState(false);
  const [clinicName, setClinicName] = useState('');
  useEffect(() => { const t = setTimeout(() => setVisible(true), 60); return () => clearTimeout(t); }, []);

  return (
    <div className="min-h-[100dvh] flex flex-col overflow-hidden relative"
      style={{ backgroundColor: '#1A1814', opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease' }}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] opacity-10"
          style={{ background: 'radial-gradient(ellipse, #C4973F 0%, transparent 65%)' }} />
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden select-none">
          <span className="font-display text-[28vw] font-black italic text-white select-none"
            style={{ opacity: 0.018, letterSpacing: '-0.04em', whiteSpace: 'nowrap' }}>Lumio</span>
        </div>
      </div>

      <div className="relative z-10 px-6 pt-7 flex justify-between items-center">
        <a href="/"><span className="block md:hidden"><Logo light width={80} /></span><span className="hidden md:block"><Logo light width={100} /></span></a>
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
                className="rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-sm px-5 py-3 text-white placeholder-white/25 outline-none focus:border-[#C4973F]/50 transition-colors"
                style={{ fontSize: '16px' }}
              />
            </div>
            <GoldButton onClick={() => onStart(clinicName.trim())} large>Start my Revenue Reveal</GoldButton>
            <div className="flex flex-col gap-1.5 pt-1">
              {['Personalised to your clinic', 'Your exact revenue loss calculated', 'Recommended plan included', 'Takes 3 minutes'].map(item => (
                <p key={item} className="text-[11px] text-[#C4973F]/55 text-left flex items-center gap-1.5 before:content-['·'] before:text-[#C4973F]">{item}</p>
              ))}
            </div>
          </div>

          <div style={{ animation: 'rise 0.7s cubic-bezier(0.22,1,0.36,1) 0.65s both' }}
            className="w-full max-w-sm">
            <div className="flex items-center gap-4 mb-5">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-[#FFFDF8]/30 uppercase tracking-widest">or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>
            <a href="/ai" className="group flex items-center gap-3 mx-auto w-fit px-5 py-3 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-[#C4973F]/40 hover:bg-[#C4973F]/[0.06]">
              <LumioOrb size="sm" />
              <span className="text-sm text-[#FFFDF8]/45 group-hover:text-[#E8B44B] transition-colors duration-200">
                Prefer to talk it through? Chat with Lumio AI instead
              </span>
              <span className="text-[#C4973F]/50 group-hover:text-[#C4973F] group-hover:translate-x-1 transition-all duration-200">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
