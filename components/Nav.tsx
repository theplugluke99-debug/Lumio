'use client';

import Logo from '@/components/ui/Logo';
import { NAV_LINKS } from '@/lib/data';

export default function Nav() {
  return (
    <div className="relative z-10 w-full px-4 pt-5">
      <nav className="mx-auto max-w-6xl flex items-center justify-between rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl px-5 py-3">
        <Logo large light />
        <div className="hidden md:flex items-center gap-8 text-sm text-white/60 font-medium">
          {NAV_LINKS.map(({ label, href, highlight }) => (
            <a key={label} href={href}
              className={highlight
                ? 'font-semibold text-[#C4973F]/90 hover:text-[#E8B44B] transition-colors'
                : 'hover:text-white transition-colors'}>
              {label}
            </a>
          ))}
        </div>
        <a href="/ai"
          className="hidden md:flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.18em] text-[#E8B44B]/70 hover:text-[#E8B44B] transition-colors">
          <div className="w-3 h-3 rounded-full bg-[#C4973F] animate-pulse" />
          AI
        </a>
        <a href="/audit" className="rounded-full bg-[#FFFDF8] text-[#1A1814] text-sm font-semibold px-5 py-2.5 hover:bg-[#C4973F] transition-colors duration-200">
          Get free audit →
        </a>
      </nav>
    </div>
  );
}
