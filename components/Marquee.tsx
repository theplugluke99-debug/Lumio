'use client';

import { MARQUEE_ITEMS } from '@/lib/data';

export default function Marquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="bg-[#C4973F] border-t-2 border-[#C4973F] overflow-hidden py-3.5">
      <div className="marquee-track flex items-center gap-6 whitespace-nowrap w-max">
        {doubled.map((item, i) => (
          <span key={i} className="text-sm font-bold uppercase tracking-[.18em] text-[#1A1814] shrink-0">
            {item}
            {i < doubled.length - 1 && <span className="ml-6 opacity-40">·</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
