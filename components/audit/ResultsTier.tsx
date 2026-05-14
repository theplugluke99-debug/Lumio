import { Results } from '@/lib/audit';
import { TIER_FEATURES } from '@/lib/data';
import { LUMIO_MONTHLY, LUMIO_SETUP } from '@/lib/audit';
import GoldButton from '@/components/ui/GoldButton';

interface Props { r: Results; label: string; }

export default function ResultsTier({ r, label }: Props) {
  return (
    <div className="py-16 px-4 bg-[#1A1814]">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-[2rem] border border-[#C4973F]/30 bg-white/[0.03] p-8 md:p-10 flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.2em] text-[#C4973F] mb-1">
                Recommended for {label}
              </p>
              <h3 className="font-display font-black text-3xl text-[#FFFDF8]">{r.recommendedTier}</h3>
            </div>
            <div className="text-right">
              <span className="font-display font-black text-3xl text-[#FFFDF8]">
                £{LUMIO_MONTHLY[r.recommendedTier]}
                <span className="text-base font-normal text-white/40">/mo</span>
              </span>
              <p className="text-xs text-white/40 mt-0.5">
                £{LUMIO_SETUP[r.recommendedTier].toLocaleString('en-GB')} setup
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm text-white/50 mb-3">Based on your Revenue Reveal, here&apos;s why this tier fits:</p>
            <ul className="flex flex-col gap-2">
              {r.tierReasons.map((reason, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  <span className="text-[#C4973F] mt-0.5 shrink-0">✦</span>
                  <span className="text-white/70">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-white/[0.06] pt-6">
            <p className="text-xs font-bold uppercase tracking-wide text-white/30 mb-3">What&apos;s included</p>
            <ul className="grid sm:grid-cols-2 gap-2">
              {TIER_FEATURES[r.recommendedTier].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-white/55">
                  <span className="text-[#C4973F] shrink-0">✓</span>{f}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-white/[0.06] pt-6 flex flex-col items-start gap-2">
            <GoldButton href={`mailto:hello@lumio.london?subject=I'd like to get started with Lumio&body=Hi — I've just completed the Lumio Revenue Reveal and I'd like to get started with the ${r.recommendedTier} plan. My clinic is:`}>
              Get started with {r.recommendedTier}
            </GoldButton>
            <p className="text-xs text-white/30 pl-1">Or call us — we&apos;ll get you set up today</p>
          </div>
        </div>
      </div>
    </div>
  );
}
