'use client';

import { MARQUEE_ITEMS } from '@/lib/data';

export default function Marquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="bg-[#C4973F] border-t-2 border-[#C4973F] overflow-hidden py-2 md:py-3.5">
      <div className="marquee-track flex items-center gap-4 md:gap-6 whitespace-nowrap w-max">
        {doubled.map((item, i) => (
          <span key={i} className="text-[10px] md:text-sm font-bold uppercase tracking-[.14em] md:tracking-[.18em] text-[#1A1814] shrink-0">
            {item}
            {i < doubled.length - 1 && <span className="ml-4 md:ml-6 opacity-40">·</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
