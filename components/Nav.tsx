'use client';

import Logo from '@/components/ui/Logo';

export default function Nav() {
  return (
    <div className="relative z-10 w-full px-4 pt-5">
      <nav className="mx-auto max-w-6xl flex items-center justify-between rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl px-5 py-3">
        <Logo large light />
        <div className="hidden md:flex items-center gap-8 text-sm text-white/60 font-medium">
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#process" className="hover:text-white transition-colors">How it works</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="/audit" className="font-semibold text-[#C4973F]/90 hover:text-[#E8B44B] transition-colors">
            Free audit
          </a>
        </div>
        <a
          href="/audit"
          className="rounded-full bg-[#FFFDF8] text-[#1A1814] text-sm font-semibold px-5 py-2.5 hover:bg-[#C4973F] transition-colors duration-200"
        >
          Get free audit →
        </a>
      </nav>
    </div>
  );
}
