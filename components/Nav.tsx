'use client';

import Logo from '@/components/ui/Logo';
import { NAV_LINKS } from '@/lib/data';

export default function Nav() {
  return (
    <div className="relative z-10 px-4 pt-5 md:pt-6">
      <nav className="relative mx-auto flex w-full max-w-6xl items-center justify-between gap-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl px-3 py-3 sm:px-5 lg:px-6">
        <Logo light width={66} />
        <div className="hidden md:flex items-center gap-5 lg:gap-8 text-sm text-white/60 font-medium">
          {NAV_LINKS.filter(l => !l.highlight).map(({ label, href }) => (
            <a key={label} href={href} className="hover:text-white transition-colors">
              {label}
            </a>
          ))}
        </div>
        <div className="absolute right-3 top-1/2 flex min-w-0 shrink-0 -translate-y-1/2 items-center gap-2.5 md:static md:translate-y-0 md:gap-3">
          <a href="/demo" className="hidden md:flex items-center gap-1.5 text-sm font-medium text-[#C4973F] hover:text-[#E8B44B] transition-colors duration-200">
            See demo
          </a>
          <a href="/audit" className="rounded-full bg-[#FFFDF8] text-[#1A1814] text-[10px] sm:text-sm font-semibold px-2.5 sm:px-5 py-2.5 hover:bg-[#C4973F] transition-colors duration-200 whitespace-nowrap">
            <span className="sm:hidden">Reveal →</span>
            <span className="hidden sm:inline">Free Revenue Reveal →</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
