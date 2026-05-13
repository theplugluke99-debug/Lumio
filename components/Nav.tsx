'use client';

import Logo from '@/components/ui/Logo';
import { NAV_LINKS } from '@/lib/data';

export default function Nav() {
  return (
    <div className="relative z-10 w-full px-4 pt-5">
      <nav className="mx-auto max-w-6xl flex items-center justify-between rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl px-5 py-3">
        <Logo light />
        <div className="hidden md:flex items-center gap-8 text-sm text-white/60 font-medium">
          {NAV_LINKS.filter(l => !l.highlight).map(({ label, href }) => (
            <a key={label} href={href} className="hover:text-white transition-colors">
              {label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a href="/demo" className="hidden md:flex items-center gap-1.5 text-sm font-medium text-[#C4973F] hover:text-[#E8B44B] transition-colors duration-200">
            <span className="text-xs">✦</span>
            See demo
          </a>
          <a href="/audit" className="rounded-full bg-[#FFFDF8] text-[#1A1814] text-sm font-semibold px-5 py-2.5 hover:bg-[#C4973F] transition-colors duration-200">
            Get free audit →
          </a>
        </div>
      </nav>
    </div>
  );
}
