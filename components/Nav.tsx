'use client';

import Logo from '@/components/ui/Logo';
import { NAV_LINKS } from '@/lib/data';

export default function Nav() {
  return (
    <div className="relative z-10 w-screen max-w-[100vw] px-4 pt-5 md:pt-6">
      <nav className="mx-auto flex w-[calc(100vw-2rem)] max-w-6xl items-center justify-between gap-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl px-3 py-3 sm:px-5 md:w-full lg:px-6">
        <Logo light width={84} />
        <div className="hidden md:flex items-center gap-5 lg:gap-8 text-sm text-white/60 font-medium">
          {NAV_LINKS.filter(l => !l.highlight).map(({ label, href }) => (
            <a key={label} href={href} className="hover:text-white transition-colors">
              {label}
            </a>
          ))}
        </div>
        <div className="absolute right-3 flex min-w-0 items-center gap-2.5 md:static md:gap-3">
          <a href="/demo" className="hidden md:flex items-center gap-1.5 text-sm font-medium text-[#C4973F] hover:text-[#E8B44B] transition-colors duration-200">
            See demo
          </a>
          <a href="/audit" className="rounded-full bg-[#FFFDF8] text-[#1A1814] text-[11px] sm:text-sm font-semibold px-3 sm:px-5 py-2.5 hover:bg-[#C4973F] transition-colors duration-200 whitespace-nowrap">
            Free Revenue Reveal →
          </a>
        </div>
      </nav>
    </div>
  );
}
