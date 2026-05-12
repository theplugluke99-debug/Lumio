'use client';

import GoldButton from '@/components/ui/GoldButton';

const PLANS = [
  {
    name: 'Foundation',
    setup: '£1,500',
    monthly: '£600',
    tagline: 'Everything you need to stop losing leads.',
    features: [
      'Instant lead response system',
      'Automated booking & confirmations',
      'Appointment reminder sequences',
      'Review generation flow',
      'Lumio dashboard access',
      '30-day onboarding support',
    ],
    featured: false,
    badge: null as string | null,
  },
  {
    name: 'Full System',
    setup: '£2,500',
    monthly: '£900',
    tagline: 'Every lead. Every rebook. Everything automated.',
    features: [
      'Everything in Foundation',
      'Instagram DM automation',
      'Rebooking & retention flows',
      'Full AI conversation handling',
      'Monthly performance review',
      'Priority support',
    ],
    featured: true,
    badge: 'Most popular' as string | null,
  },
  {
    name: 'Full Operations',
    setup: '£4,000',
    monthly: '£1,400',
    tagline: 'Your entire clinic — front desk and back office — running itself.',
    features: [
      'Everything in Full System',
      'Consent form automation & filing',
      'Aftercare instruction sequences',
      'Invoice chasing automation',
      'Stock & supply reminders',
      'Inbox management flows',
      'Monthly performance reporting',
      'Dedicated monthly account call',
    ],
    featured: false,
    badge: 'Best value' as string | null,
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="py-24 px-4"
      style={{ background: 'linear-gradient(180deg, #F9EDE8 0%, #F0EDF8 50%, #FFFDF8 100%)' }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-[.2em] text-[#C4973F]">Investment</span>
          <h2 className="mt-3 font-display font-black text-4xl md:text-6xl leading-[.9] tracking-[-0.03em] text-[#1A1814]">
            Simple pricing.<br />
            <span className="italic gold-text">Pays for itself fast.</span>
          </h2>
          <p className="mt-4 text-[#8A8278] max-w-lg mx-auto text-base">
            A senior receptionist costs £28,000 a year and still misses calls. Lumio costs a
            fraction — and never sleeps.
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
                  <span className={`rounded-full px-4 py-1 text-xs font-bold ${p.featured ? 'bg-[#C4973F] text-[#1A1814]' : 'bg-[#1A1814] text-white'}`}>
                    {p.badge}
                  </span>
                </div>
              )}
              <div>
                <h3 className={`font-display font-bold text-2xl mb-1 ${p.featured ? 'text-white' : 'text-[#1A1814]'}`}>
                  {p.name}
                </h3>
                <p className={`text-sm ${p.featured ? 'text-white/50' : 'text-[#8A8278]'}`}>{p.tagline}</p>
              </div>
              <div>
                <div className={`font-display font-black text-4xl tracking-[-0.03em] ${p.featured ? 'text-white' : 'text-[#1A1814]'}`}>
                  {p.monthly}
                  <span className={`text-base font-normal ${p.featured ? 'text-white/40' : 'text-[#8A8278]'}`}>/mo</span>
                </div>
                <div className={`text-sm mt-1 ${p.featured ? 'text-white/40' : 'text-[#8A8278]'}`}>
                  {p.setup} setup
                </div>
              </div>
              <ul className="flex flex-col gap-2.5 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 text-[#C4973F] shrink-0">✓</span>
                    <span className={p.featured ? 'text-white/70' : 'text-[#2E2B26]'}>{f}</span>
                  </li>
                ))}
              </ul>
              <div>
                {p.featured
                  ? <GoldButton href="/audit">Get started</GoldButton>
                  : <GoldButton href="/audit" dark>Get started</GoldButton>
                }
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-[#8A8278] mt-10">
          Not sure which is right for you?{' '}
          <a href="/audit" className="text-[#C4973F] hover:text-[#E8B44B] underline underline-offset-4 transition-colors">
            Take the free audit
          </a>
          {' '}and we&apos;ll tell you honestly. No upsell, no pressure.
        </p>
      </div>
    </section>
  );
}
