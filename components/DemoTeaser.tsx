'use client';

import GoldButton from '@/components/ui/GoldButton';

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

        {/* Dashboard iframe preview — desktop only */}
        <div className="mx-auto mb-12 hidden md:block" style={{ maxWidth: 896 }}>
          <div className="pointer-events-none absolute translate-x-[-50%] left-1/2 w-[600px] h-[300px] rounded-full blur-[100px] opacity-15"
            style={{ background: 'radial-gradient(ellipse at 50% 50%, #C4973F 0%, transparent 70%)' }} />
          <div
            className="relative overflow-hidden"
            style={{
              width: '100%',
              maxWidth: 896,
              height: 602,
              borderRadius: '1.5rem',
              border: '1px solid rgba(196,151,63,0.2)',
              boxShadow: '0 40px 120px rgba(26,24,20,0.4)',
            }}
          >
            <iframe
              src="/demo?preview=true"
              scrolling="no"
              tabIndex={-1}
              style={{
                width: '1280px',
                height: '860px',
                transform: 'scale(0.7)',
                transformOrigin: 'top left',
                pointerEvents: 'none',
                border: 'none',
                borderRadius: '1.5rem',
              }}
            />
            <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 0%, transparent 55%, #1A1814 100%)' }} />
          </div>
        </div>

        {/* Mobile preview card */}
        <div className="mx-auto mb-12 md:hidden max-w-sm">
          <div className="rounded-[2rem] border border-[#C4973F]/20 bg-white/[0.04] p-4 shadow-[0_30px_80px_rgba(26,24,20,0.4)]">
            <div className="rounded-[1.5rem] bg-[#FFFDF8] p-5" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-black text-[#1A1814]">Glow Aesthetics</span>
                <span className="rounded-full bg-[#EDF4EE] px-2 py-1 text-[9px] font-bold text-[#5B8A68]">Live</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {[['#F9EDE8','31','Leads captured'],['#F0EDF8','19','AI bookings'],['#EDF4EE','2','No-shows'],['#F2DDD8','£4,800','Pipeline']].map(([bg,v,l]) => (
                  <div key={l} className="rounded-xl p-3" style={{ backgroundColor: bg }}>
                    <div className="text-xl font-black text-[#1A1814]">{v}</div>
                    <div className="text-[10px] font-bold text-[#8A8278]">{l}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {[['Instagram DM answered','Lip filler enquiry → booking'],['Booking confirmed by AI','27 May at 11:00am']].map(([t,d]) => (
                  <div key={t} className="flex items-start gap-2.5 rounded-xl bg-[#F9EDE8]/70 px-3 py-2.5">
                    <div className="h-2 w-2 rounded-full bg-[#C4973F] shrink-0 mt-1" />
                    <div>
                      <p className="text-xs font-bold text-[#1A1814]">{t}</p>
                      <p className="text-[10px] text-[#8A8278]">{d}</p>
                    </div>
                  </div>
                ))}
              </div>
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
