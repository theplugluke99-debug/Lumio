import GoldButton from '@/components/ui/GoldButton';

const FEED = [
  { time: '09:32', title: 'Instagram DM answered', detail: 'Lip filler enquiry → booking confirmed', status: 'Done' },
  { time: '09:28', title: 'Booking confirmed by AI', detail: 'Consultation · 27 May at 11:00am', status: 'Done' },
  { time: '09:15', title: 'Appointment reminder sent', detail: "WhatsApp · Tomorrow's treatment confirmed", status: 'Done' },
  { time: '09:02', title: 'Review requested', detail: 'Botox · 3 days post-treatment', status: 'Done' },
];

const METRICS = [
  { label: '↑ 31 leads', bg: '#F9EDE8' },
  { label: '✓ 19 booked', bg: '#F0EDF8' },
  { label: '↓ -77% no-shows', bg: '#EDF4EE' },
  { label: '£4.8k pipeline', bg: '#F2DDD8' },
];

export default function DemoTeaser() {
  return (
    <section className="py-24 px-4 overflow-hidden" style={{ backgroundColor: '#1A1814' }}>
      <div className="mx-auto max-w-6xl">

        <div className="text-center mb-16">
          <span className="text-[10px] font-extrabold uppercase tracking-[.26em] text-[#C4973F]">Live Demo</span>
          <h2 className="mt-4 font-display font-black text-4xl md:text-6xl lg:text-7xl leading-[.9] tracking-[-0.04em] text-[#FFFDF8]">
            See your clinic<br />
            <span className="italic text-[#E8B44B]">running itself.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/45 max-w-lg mx-auto">
            Don&apos;t take our word for it. Explore a live dashboard — customise it with your clinic name and see exactly what your business looks like on autopilot.
          </p>
        </div>

        {/* Preview card */}
        <div className="relative mx-auto max-w-[800px] mb-12">
          {/* Gold glow */}
          <div className="pointer-events-none absolute -inset-4 rounded-[3.5rem] blur-[80px] opacity-20"
            style={{ background: 'radial-gradient(ellipse at 60% 40%, #C4973F 0%, transparent 65%)' }} />

          <div className="relative rounded-[2.5rem] bg-[#FFFDF8] shadow-[0_50px_180px_rgba(26,24,20,.6)] overflow-hidden">

            {/* Topbar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(26,24,20,0.08)]"
              style={{ background: 'rgba(249,237,232,0.6)' }}>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl font-display text-sm font-black text-[#E8B44B]" style={{ backgroundColor: '#1A1814' }}>
                  GA
                </div>
                <div>
                  <div className="font-display text-base font-black text-[#1A1814]">Glow Aesthetics London</div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#5B8A68]">
                    <span className="relative flex h-1.5 w-1.5 shrink-0">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-[#5B8A68] opacity-60" style={{ animation: 'ping 2s cubic-bezier(0,0,0.2,1) infinite' }} />
                      <span className="relative h-1.5 w-1.5 rounded-full bg-[#5B8A68]" />
                    </span>
                    Live automation active
                  </div>
                </div>
              </div>
              <span className="rounded-full bg-[#FFF4DD] border border-[#C4973F]/20 px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[.16em] text-[#C4973F]">
                ✦ LIVE
              </span>
            </div>

            {/* Metric pills */}
            <div className="flex flex-wrap gap-2.5 px-6 py-4 border-b border-[rgba(26,24,20,0.06)]">
              {METRICS.map(({ label, bg }) => (
                <div key={label} className="relative overflow-hidden rounded-2xl border border-[rgba(26,24,20,0.08)] px-4 py-2.5 shadow-sm"
                  style={{ backgroundColor: bg }}>
                  <span className="font-display text-sm font-black text-[#1A1814]">{label}</span>
                </div>
              ))}
            </div>

            {/* Activity feed */}
            <div className="px-6 py-5">
              <div className="mb-4 text-[10px] font-extrabold uppercase tracking-[.2em] text-[#C4973F]">Today&apos;s automation activity</div>
              <div className="space-y-0">
                {FEED.map((item, i) => (
                  <div key={item.time} className={`flex items-center gap-4 py-3 ${i < FEED.length - 1 ? 'border-b border-[rgba(26,24,20,0.06)]' : ''}`}>
                    <span className="w-10 shrink-0 text-[10px] font-semibold text-[#8A8278]">{item.time}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-[#1A1814]">{item.title}</div>
                      <div className="text-[11px] text-[#8A8278] truncate">{item.detail}</div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#5B8A68] shrink-0">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#5B8A68]" />
                      Done
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-3">
          <GoldButton href="/demo" large>Explore the live demo →</GoldButton>
          <p className="text-sm text-white/35">Customise it with your clinic name. No signup required.</p>
        </div>

      </div>
    </section>
  );
}
