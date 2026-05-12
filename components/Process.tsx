'use client';

const STEPS = [
  {
    n: '01',
    time: '30 mins',
    title: 'Free Discovery Call',
    body: "We understand your clinic, your treatments, your clients, and exactly where you're losing leads and revenue right now. No pressure. Just clarity.",
  },
  {
    n: '02',
    time: '5–7 days',
    title: 'We Build Everything',
    body: "We design and build your complete automation system. Branded as your clinic. Tailored to your treatments and voice. You don't touch a thing.",
  },
  {
    n: '03',
    time: '1 hour',
    title: 'We Hand It Over',
    body: "We walk you through your Lumio dashboard. Everything is live, tested, and working before handover. One hour of your time. That's it.",
  },
  {
    n: '04',
    time: '24/7 forever',
    title: 'Your Clinic Runs Itself',
    body: 'Lumio handles leads, bookings, reminders, rebooking, and admin around the clock. We maintain everything. You focus on your clients.',
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="relative bg-[#1A1814] py-24 px-4 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-10"
        style={{ background: '#C4973F' }}
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-[.2em] text-[#C4973F]">How it works</span>
          <h2 className="mt-3 font-display font-black text-5xl md:text-7xl leading-[.9] tracking-[-0.03em] text-[#FFFDF8]">
            Live in <span className="italic gold-text">5–7 days.</span>
          </h2>
          <p className="mt-4 text-[#8A8278] max-w-md mx-auto text-base">
            You don&apos;t have to do anything technical.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-7 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(196,151,63,0.5)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '';
              }}
            >
              <div className="flex items-center justify-between">
                <span className="font-display italic font-black text-5xl gold-text leading-none">{s.n}</span>
                <span className="rounded-full border border-[#C4973F]/30 text-[#E8B44B] text-xs font-semibold px-3 py-1">
                  {s.time}
                </span>
              </div>
              <h3 className="font-display font-bold text-lg text-white">{s.title}</h3>
              <p className="text-sm text-[#8A8278] leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
