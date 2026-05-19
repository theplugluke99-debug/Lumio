'use client';

import { PLANS } from '@/lib/data';

const STRIPE_LINKS: Record<string, string> = {
  Foundation: 'https://buy.stripe.com/3cI14fgTV22F0yN5LWd3i00',
  'Full System': 'https://buy.stripe.com/5kQ14f1Z14aN0yNb6gd3i02',
};

const CALENDLY_URL = '#'; // TODO: Replace with Calendly booking link

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 px-6 md:py-24 md:px-4" style={{ background: 'linear-gradient(180deg, #F9EDE8 0%, #F0EDF8 50%, #FFFDF8 100%)' }}>
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-[.2em] text-[#C4973F]">Investment</span>
          <h2 className="mt-3 font-display font-black text-4xl md:text-6xl leading-[.9] tracking-[-0.03em] text-[#1A1814]">
            Simple pricing.<br />
            <span className="italic gold-text">Pays for itself fast.</span>
          </h2>
          <p className="mt-4 text-[#8A8278] max-w-lg mx-auto text-base">
            A senior receptionist costs £28,000 a year and still misses calls. Lumio costs a fraction — and never sleeps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-[2.2rem] p-7 md:p-8 flex flex-col gap-6 shadow transition-all duration-300 hover:-translate-y-1 ${p.featured ? 'bg-[#1A1814]' : 'bg-white'}`}
              style={{ border: p.featured ? '2px solid #C4973F' : '1px solid rgba(26,24,20,0.08)' }}
            >
              {p.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className={`rounded-full px-4 py-1 text-xs font-bold ${p.featured ? 'bg-[#C4973F] text-[#1A1814]' : 'bg-[#1A1814] text-white'}`}>{p.badge}</span>
                </div>
              )}
              <div>
                <h3 className={`font-display font-bold text-2xl mb-1 ${p.featured ? 'text-white' : 'text-[#1A1814]'}`}>{p.name}</h3>
                <p className={`text-sm ${p.featured ? 'text-white/50' : 'text-[#8A8278]'}`}>{p.tagline}</p>
              </div>
              <div>
                <div className={`font-display font-black text-4xl tracking-[-0.03em] ${p.featured ? 'text-white' : 'text-[#1A1814]'}`}>
                  £{p.monthly}<span className={`text-base font-normal ${p.featured ? 'text-white/40' : 'text-[#8A8278]'}`}>/mo</span>
                </div>
                <div className={`text-sm mt-1 ${p.featured ? 'text-white/40' : 'text-[#8A8278]'}`}>£{p.setup.toLocaleString()} setup</div>
              </div>
              <ul className="flex flex-col gap-2.5 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 text-[#C4973F] shrink-0"><path d="M20 6L9 17l-5-5"/></svg>
                    <span className={p.featured ? 'text-white/70' : 'text-[#2E2B26]'}>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-2">
                {p.name !== 'Full Operations' ? (
                  <>
                    <a
                      href={STRIPE_LINKS[p.name]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group inline-flex items-center justify-center gap-2 w-full rounded-full text-sm font-semibold px-7 py-3.5 transition-all duration-200 hover:-translate-y-1 shadow-[0_20px_60px_rgba(196,151,63,.2)] ${p.featured ? 'bg-[#C4973F] text-[#1A1814] hover:bg-[#E8B44B]' : 'bg-[#1A1814] text-[#FFFDF8] hover:bg-[#2E2B26]'}`}
                    >
                      Get started <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </a>
                    <a
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-center text-[11px] font-medium transition-colors hover:text-[#C4973F] ${p.featured ? 'text-white/40' : 'text-[#8A8278]'}`}
                    >
                      Or book a call first →
                    </a>
                  </>
                ) : (
                  <a
                    href="mailto:hello@lumio.london"
                    className="group inline-flex items-center justify-center gap-2 w-full rounded-full bg-[#1A1814] text-[#FFFDF8] text-sm font-semibold px-7 py-3.5 hover:bg-[#2E2B26] transition-all duration-200 hover:-translate-y-1 shadow-[0_20px_60px_rgba(196,151,63,.2)]"
                  >
                    Book a call <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </a>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', marginTop: 8 }}>
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#C4973F" strokeWidth="2" strokeLinecap="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <span className={`text-[11px] ${p.featured ? 'text-white/30' : 'text-[#8A8278]/60'}`}>
                    Secure payment via Stripe
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-[#8A8278] mt-10">
          Not sure which is right for you?{' '}
          <a href="/audit" className="text-[#C4973F] hover:text-[#E8B44B] underline underline-offset-4 transition-colors">Take the free Revenue Reveal</a>
          {' '}and we&apos;ll tell you honestly. No upsell, no pressure.
        </p>
      </div>
    </section>
  );
}
