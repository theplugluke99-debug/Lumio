import CountUp from '@/components/ui/CountUp';
import { Results, GOLD_GRAD } from '@/lib/audit';

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
      </div>
    </div>
  );
}
