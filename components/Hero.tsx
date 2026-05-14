'use client';

import Nav from '@/components/Nav';
import GoldButton from '@/components/ui/GoldButton';
import Logo from '@/components/ui/Logo';
import { HERO_ACTIVITY } from '@/lib/data';

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] bg-[#1A1814] overflow-hidden flex flex-col">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(ellipse at center, #C4973F 0%, transparent 65%)' }} />
        <div className="absolute top-[-80px] left-[-120px] w-[500px] h-[500px] rounded-full blur-[120px] opacity-10" style={{ background: '#C4973F' }} />
        <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full blur-[100px] opacity-10" style={{ background: '#E8B44B' }} />
        <div className="absolute inset-0 flex items-center justify-center select-none overflow-hidden">
          <span className="font-display text-[22vw] font-black italic text-white select-none"
            style={{ opacity: 0.025, letterSpacing: '-0.04em', whiteSpace: 'nowrap' }}>Lumio</span>
        </div>
      </div>

      <Nav />

      <div className="relative z-10 flex-1 flex items-start md:items-center px-4 pt-16 pb-16 md:py-0">
        <div className="mx-auto max-w-6xl w-full grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="flex flex-col gap-5 md:gap-7">
            <div className="reveal inline-flex items-center gap-2.5 self-start rounded-full border border-[#C4973F]/30 bg-[#C4973F]/10 px-4 py-2 text-xs font-semibold tracking-widest text-[#E8B44B] uppercase">
              <span className="pulse-dot h-2 w-2 rounded-full bg-[#C4973F]" />
              AI Automation · Aesthetic Clinics · London &amp; UK
            </div>

            <h1 className="reveal-2 font-display font-black text-[#FFFDF8] leading-[.88] tracking-[-0.04em]"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 9.4rem)' }}>
              Your clinic.<br />
              <span className="italic gold-text">Running itself.</span>
            </h1>

            <p className="reveal-3 text-base md:text-lg leading-relaxed max-w-md" style={{ color: 'rgba(255,253,248,0.62)' }}>
              While you&apos;re with a client, Lumio answers enquiries, books appointments,
              automates your admin, and follows up — automatically. Every lead captured.
              Every task handled. Nothing missed.
            </p>

            <div className="reveal-4 flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative group">
                  <GoldButton href="/audit">Get my free Revenue Reveal</GoldButton>
                  <div className="pointer-events-none absolute bottom-full left-0 mb-3 w-52 opacity-0 group-hover:opacity-100 transition-opacity duration-150 hidden md:block z-50">
                    <div className="rounded-xl border border-[#C4973F]/30 bg-[#1A1814] px-4 py-3 text-xs text-white/70 leading-5">
                      Answer 8 questions about your clinic.<br />
                      Get your exact monthly revenue loss.<br />
                      Personalised to your numbers.<br />
                      Takes 3 minutes.
                    </div>
                    <div className="ml-8 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#1A1814]" />
                  </div>
                </div>
                <a href="#services" className="text-sm text-white/50 hover:text-white/80 transition-colors">
                  See what&apos;s possible ↓
                </a>
              </div>
              <p className="text-xs text-white/30 pl-1">Takes 3 minutes. See your exact monthly revenue loss. No call required.</p>
              <a href="#talk-to-lumio" className="text-xs text-[#C4973F]/60 hover:text-[#C4973F] transition-colors pl-1">
                Or talk to our AI now — no forms, no calls →
              </a>
              <a href="/demo" className="group text-xs text-white/35 hover:text-[#C4973F] transition-colors pl-1 inline-flex items-center gap-1">
                Or explore the live demo first
                <span className="transition-transform duration-200 group-hover:translate-x-1 inline-block">→</span>
              </a>
            </div>
          </div>

          <div className="reveal-3 relative hidden md:block">
            <div className="absolute inset-0 rounded-[3rem] blur-[60px] opacity-30 -z-10"
              style={{ background: 'radial-gradient(ellipse, #C4973F 0%, transparent 70%)' }} />
            <div className="rounded-[3rem] border border-white/10 bg-white/[0.06] backdrop-blur-2xl p-3">
              <div className="rounded-[2.4rem] bg-[#FFFDF8] p-5 md:p-6" style={{ fontFamily: 'var(--font-inter, system-ui, sans-serif)' }}>
                <div className="flex items-center justify-between mb-5">
                  <Logo width={100} />
                  <span className="rounded-full bg-[#F9EDE8] px-3 py-1 text-xs font-bold tracking-wide text-[#C4973F] border border-[#C4973F]/20">● Live flow</span>
                </div>
                <div className="flex flex-col gap-2.5">
                  {HERO_ACTIVITY.map((row) => (
                    <div key={row.time} className="flex items-center gap-3 rounded-3xl bg-[#F9EDE8]/60 hover:bg-[#F9EDE8] px-4 py-3 transition-colors cursor-default">
                      <span className="text-xs font-bold text-[#C4973F] w-10 shrink-0">{row.time}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-[#1A1814] truncate">{row.title}</p>
                        <p className="text-[11px] text-[#8A8278] truncate">{row.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex gap-2 flex-wrap">
                  <span className="rounded-full bg-[#F0EDF8] px-3 py-1.5 text-xs font-bold text-[#1A1814]">31 leads</span>
                  <span className="rounded-full bg-[#EDF4EE] px-3 py-1.5 text-xs font-bold text-[#1A1814]">12 booked</span>
                  <span className="rounded-full bg-[#F2DDD8] px-3 py-1.5 text-xs font-bold text-[#1A1814]">£4.8k pipeline</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
