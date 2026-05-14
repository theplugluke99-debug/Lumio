'use client';

import Logo from '@/components/ui/Logo';
import { NAV_LINKS } from '@/lib/data';

export default function Nav() {
  return (
    <div className="relative z-10 w-full px-4 pt-5">
      <nav className="mx-auto max-w-6xl flex items-center justify-between rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl px-5 py-3">
        <Logo light width={100} />
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
          <div className="relative group">
            <a href="/audit" className="rounded-full bg-[#FFFDF8] text-[#1A1814] text-sm font-semibold px-5 py-2.5 hover:bg-[#C4973F] transition-colors duration-200 whitespace-nowrap">
              Free Revenue Reveal →
            </a>
            <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-52 opacity-0 group-hover:opacity-100 transition-opacity duration-150 hidden md:block z-50">
              <div className="rounded-xl border border-[#C4973F]/30 bg-[#1A1814] px-4 py-3 text-xs text-white/70 leading-5">
                Answer 8 questions about your clinic.<br />
                Get your exact monthly revenue loss.<br />
                Personalised to your numbers.<br />
                Takes 3 minutes.
              </div>
              <div className="mx-auto mt-0 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#1A1814]" />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
