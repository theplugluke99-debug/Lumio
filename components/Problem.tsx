'use client';

const PAINS = [
  {
    n: '01',
    text: "Three enquiries came in while you were with a client. By the time you replied, they'd already booked somewhere else. That's £300–£600 gone before you even knew about it.",
  },
  {
    n: '02',
    text: "Someone DM'd your Instagram at 10pm asking about lip filler. You saw it at 9am. The moment had passed. They moved on.",
  },
  {
    n: '03',
    text: "A client hasn't rebooked in 6 weeks. You meant to follow up. You never did. They tried someone new. They stayed.",
  },
  {
    n: '04',
    text: 'Two no-shows this week. Filler prepped. Room booked. Injector paid. £400 of empty time — a simple reminder sequence would have prevented both.',
  },
];

export default function Problem() {
  return (
    <section className="grid md:grid-cols-2">
      {/* Left */}
      <div className="bg-[#F9EDE8] px-8 md:px-14 py-20 md:py-28 flex flex-col justify-center gap-7">
        <span className="text-xs font-bold uppercase tracking-[.2em] text-[#C4973F]">The reality</span>
        <h2 className="font-display font-black text-5xl md:text-7xl lg:text-8xl leading-[.9] tracking-[-0.03em] text-[#1A1814]">
          You&apos;re losing<br />
          <span className="italic gold-text">money right now.</span>
        </h2>
        <p className="text-[#8A8278] leading-relaxed max-w-sm text-base">
          The UK aesthetics industry is worth £3.6 billion — and the vast majority of clinics
          are still managing enquiries on WhatsApp, missing bookings while in treatment, and
          leaving revenue on the table every single day.
        </p>
        <p className="text-[#8A8278] leading-relaxed max-w-sm text-base">
          The systems exist to fix this. Most clinic owners just don&apos;t have the time to
          find and set them up. That&apos;s exactly what Lumio does.
        </p>
      </div>

      {/* Right */}
      <div className="relative bg-[#1A1814] px-8 md:px-14 py-20 md:py-28 flex flex-col justify-center gap-6 overflow-hidden">
        <div
          className="pointer-events-none absolute top-[-60px] right-[-60px] w-[300px] h-[300px] rounded-full blur-[80px] opacity-15"
          style={{ background: '#C4973F' }}
        />
        <span className="text-xs font-bold uppercase tracking-[.2em] text-[#C4973F]">Sound familiar?</span>
        {PAINS.map((p) => (
          <div
            key={p.n}
            className="rounded-[1.6rem] border border-white/10 bg-white/[0.045] px-5 py-5 flex gap-4 transition-all duration-300 hover:-translate-y-0.5"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(196,151,63,0.4)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(196,151,63,.08)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = '';
              (e.currentTarget as HTMLElement).style.boxShadow = '';
            }}
          >
            <span className="font-display italic text-[#C4973F]/40 text-lg font-black shrink-0 mt-0.5">
              {p.n}
            </span>
            <p className="text-sm text-white/60 leading-relaxed">{p.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
