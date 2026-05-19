import CountUp from '@/components/ui/CountUp';
import { Results, GOLD_GRAD } from '@/lib/audit';

const CALENDLY_URL = 'https://calendly.com/hello-lumio/30min';

interface Props { r: Results; label: string; totalVisible: boolean; }

export default function ResultsTotal({ r, label, totalVisible }: Props) {
  return (
    <div className="relative bg-[#0F0D0B] py-20 px-6 text-center overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[130px] opacity-10"
        style={{ background: '#C4973F' }} />
      <div className="relative z-10 flex flex-col items-center gap-4"
        style={{ opacity: totalVisible ? 1 : 0, transform: totalVisible ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
        <p className="text-base md:text-xl text-white/50 font-semibold">{label} is likely losing</p>
        <p className="font-display font-black leading-none tracking-[-0.05em]"
          style={{ fontSize: 'clamp(3.5rem,10vw,7rem)', ...GOLD_GRAD }}>
          £<CountUp target={r.totalMonthly} duration={2000} delay={200} triggered={totalVisible} />
        </p>
        <p className="text-base md:text-xl text-white/50 font-semibold">every single month</p>
        <p className="mt-3 text-[#8A8278] text-sm">
          That&apos;s{' '}
          <span className="text-[#E8B44B] font-bold">£{r.annualLoss.toLocaleString('en-GB')}</span>{' '}
          per year. Lumio can recover most of it.
        </p>

        <div className="mt-8 flex flex-col gap-3 w-full max-w-sm mx-auto"
          style={{ opacity: totalVisible ? 1 : 0, transition: 'opacity 0.6s ease 0.4s' }}>
          <a
            href="https://buy.stripe.com/3cI14fgTV22F0yN5LWd3i00"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 w-full rounded-full bg-[#C4973F] text-[#1A1814] text-sm font-bold px-8 py-4 hover:bg-[#E8B44B] transition-all duration-200 hover:-translate-y-1 shadow-[0_20px_60px_rgba(196,151,63,.3)]"
          >
            Start recovering this <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 w-full rounded-full border border-[#C4973F]/40 text-[#E8B44B]/80 text-sm font-semibold px-8 py-4 hover:border-[#C4973F]/70 hover:text-[#E8B44B] hover:bg-white/[0.04] transition-all duration-200 hover:-translate-y-1"
          >
            Book a call with Luke first <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
          <p className="text-center text-xs text-white/30 mt-1">
            Or email us:{' '}
            <a href="mailto:hello@lumio.london" className="text-[#C4973F] hover:text-[#E8B44B] transition-colors">
              hello@lumio.london
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
