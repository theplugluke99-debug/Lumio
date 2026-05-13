import GoldButton from '@/components/ui/GoldButton';

const FEED = [
  { time: '09:32', title: 'Instagram DM answered', detail: 'Lip filler enquiry → booking confirmed', icon: '💬' },
  { time: '09:28', title: 'Booking confirmed by AI', detail: 'Consultation · 27 May at 11:00am', icon: '📅' },
  { time: '09:15', title: 'Appointment reminder sent', detail: "WhatsApp · Tomorrow's treatment confirmed", icon: '🔔' },
  { time: '09:02', title: 'Review requested', detail: 'Botox · 3 days post-treatment', icon: '⭐' },
];

export default function DemoTeaser() {
  return (
    <section className="py-24 px-4 overflow-hidden" style={{ backgroundColor: '#1A1814' }}>
      <div className="mx-auto max-w-6xl">

        {/* Section header */}
        <div className="text-center mb-14">
          <span className="text-[10px] font-extrabold uppercase tracking-[.24em] text-[#C4973F]">Live Demo</span>
          <h2 className="mt-4 font-display font-black text-4xl md:text-6xl leading-[.9] tracking-[-0.04em] text-[#FFFDF8]">
            See your clinic<br />
            <span className="italic text-[#E8B44B]">running itself.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/45 max-w-lg mx-auto">
            Don&apos;t take our word for it. Explore a live Lumio dashboard — customise it with your clinic name and see exactly what your business looks like on autopilot.
          </p>
        </div>

        {/* Dashboard preview card */}
        <div className="relative mx-auto max-w-2xl mb-12">
          {/* Glow */}
          <div className="pointer-events-none absolute inset-0 rounded-[3rem] blur-[60px] opacity-25 scale-90"
            style={{ background: 'radial-gradient(ellipse at center, #C4973F 0%, transparent 70%)' }} />

          <div className="relative rounded-[2.4rem] border border-[#C4973F]/20 bg-[#FFFDF8] overflow-hidden shadow-[0_40px_140px_rgba(26,24,20,.5)]">
            {/* Dashboard topbar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(26,24,20,0.08)]"
              style={{ background: 'rgba(249,237,232,0.5)' }}>
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#1A1814] font-display text-sm font-black text-[#E8B44B]">GA</div>
                <div>
                  <div className="font-display text-sm font-black text-[#1A1814]">Glow Aesthetics London</div>
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#5B8A68]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#5B8A68]" /> Live automation active
                  </div>
                </div>
              </div>
              <span className="rounded-full bg-[#FFF4DD] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.15em] text-[#C4973F]">
                <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-[#C4973F]" />
                Live
              </span>
            </div>

            {/* Metric pills */}
            <div className="flex flex-wrap gap-3 px-6 py-5 border-b border-[rgba(26,24,20,0.06)]">
              {[
                { label: '31 leads', tint: '#F9EDE8' },
                { label: '19 booked', tint: '#F0EDF8' },
                { label: '£4.8k pipeline', tint: '#FFF1D5' },
                { label: '-77% no-shows', tint: '#EDF4EE' },
              ].map(({ label, tint }) => (
                <div key={label} className="relative overflow-hidden rounded-2xl border border-[rgba(26,24,20,0.08)] px-4 py-2.5">
                  <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 10% 50%, ${tint}, transparent 70%)` }} />
                  <span className="relative text-xs font-extrabold text-[#1A1814]">{label}</span>
                </div>
              ))}
            </div>

            {/* Activity feed */}
            <div className="px-6 py-4">
              <div className="mb-3 text-[10px] font-extrabold uppercase tracking-[.18em] text-[#C4973F]">Today&apos;s automation activity</div>
              {FEED.map(item => (
                <div key={item.time} className="flex items-center gap-3 py-2.5 border-b border-[rgba(26,24,20,0.06)] last:border-b-0">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[#FFF7E8] text-base">{item.icon}</div>
                  <div className="w-10 shrink-0 text-[10px] font-semibold text-[#8A8278]">{item.time}</div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-[#1A1814] truncate">{item.title}</div>
                    <div className="text-[11px] text-[#8A8278] truncate">{item.detail}</div>
                  </div>
                  <div className="hidden sm:flex items-center gap-1 text-[10px] text-[#5B8A68] shrink-0">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#5B8A68]" /> Done
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-3">
          <GoldButton href="/demo" large>Explore the live demo</GoldButton>
          <p className="text-sm text-white/35">Customise it with your clinic name. No signup required.</p>
        </div>

      </div>
    </section>
  );
}
