import CountUp from '@/components/ui/CountUp';
import { Results, GOLD_GRAD } from '@/lib/audit';

interface Props { r: Results; totalVisible: boolean; }

const ROI_ITEMS = (r: Results) => [
  { label: 'Month 1 net', value: r.month1Net, prefix: '£', suffix: '', decimals: 0 },
  { label: 'Month 3 cumulative', value: r.month3Cumulative, prefix: '£', suffix: '', decimals: 0 },
  { label: 'Month 6 cumulative', value: r.month6Cumulative, prefix: '£', suffix: '', decimals: 0 },
  { label: 'Annual ROI', value: r.roiMultiple, prefix: '', suffix: '×', decimals: 1 },
];

export default function ResultsRoi({ r, totalVisible }: Props) {
  return (
    <div className="py-16 px-4" style={{ background: 'linear-gradient(180deg, #1A1814 0%, #0F0D0B 100%)' }}>
      <div className="mx-auto max-w-4xl">
        <p className="text-center text-xs font-bold uppercase tracking-[.2em] text-[#C4973F] mb-10">
          Your ROI projection
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ROI_ITEMS(r).map((item, i) => (
            <div key={item.label}
              className="rounded-[1.5rem] border border-white/[0.07] bg-white/[0.03] p-5 flex flex-col gap-2 text-center"
              style={{
                opacity: totalVisible ? 1 : 0,
                transform: totalVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.5s ease ${i * 120 + 200}ms, transform 0.5s ease ${i * 120 + 200}ms`,
              }}>
              <p className="text-[11px] text-white/35 font-semibold uppercase tracking-wide">{item.label}</p>
              <p className="font-display font-black text-2xl md:text-3xl" style={GOLD_GRAD}>
                <CountUp
                  target={Math.max(0, item.value)}
                  prefix={item.prefix}
                  suffix={item.suffix}
                  duration={1400}
                  delay={i * 120 + 200}
                  triggered={totalVisible}
                  decimals={item.decimals}
                />
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
