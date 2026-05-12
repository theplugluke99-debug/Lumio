'use client';

import { SERVICES } from '@/lib/data';

export default function Services() {
  return (
    <section id="services" className="py-24 px-4" style={{ background: 'linear-gradient(180deg, #FFFDF8 0%, #F0EDF8 50%, #FFFDF8 100%)' }}>
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-[.2em] text-[#C4973F]">What Lumio does</span>
          <h2 className="mt-3 font-display font-black text-5xl md:text-7xl leading-[.9] tracking-[-0.03em] text-[#1A1814]">
            Everything <span className="italic gold-text">handled.</span>
          </h2>
          <p className="mt-4 text-[#8A8278] max-w-md mx-auto text-base">Built for your clinic. Live in 5–7 days. No tech knowledge needed.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s) => (
            <div
              key={s.n}
              className="group relative rounded-[2rem] border border-[#1A1814]/8 bg-[#FFFDF8]/78 shadow-sm p-7 flex flex-col gap-4 overflow-hidden transition-all duration-300 hover:-translate-y-1"
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#C4973F'; (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 60px rgba(196,151,63,.12)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
            >
              <span className="absolute top-5 right-6 font-display italic font-black text-[4rem] leading-none text-[#1A1814]/[0.04] select-none">{s.n}</span>
              <div className="h-10 w-10 rounded-2xl bg-[#C4973F] flex items-center justify-center text-white text-lg">{s.icon}</div>
              <h3 className="font-display font-bold text-xl text-[#1A1814]">{s.name}</h3>
              <p className="text-sm text-[#8A8278] leading-relaxed flex-1">{s.body}</p>
              <div className="relative">
                <p className="text-xs font-bold text-[#C4973F] uppercase tracking-wide">{s.stat}</p>
                <span className="absolute bottom-[-2px] left-0 h-[2px] w-0 bg-[#C4973F] transition-all duration-500 group-hover:w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
