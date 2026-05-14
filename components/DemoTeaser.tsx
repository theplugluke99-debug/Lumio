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

        {/* Dashboard iframe preview */}
        <div className="mx-auto mb-12" style={{ maxWidth: 896 }}>
          {/* Gold glow */}
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
              src="/demo"
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
            {/* Gradient overlay */}
            <div
              className="pointer-events-none"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, transparent 0%, transparent 55%, #1A1814 100%)',
              }}
            />
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
