import CountUp from '@/components/ui/CountUp';
import { Results } from '@/lib/audit';

interface Props { r: Results; label: string; scoreVisible: boolean; }

export default function ResultsScore({ r, label, scoreVisible }: Props) {
  return (
    <div className="relative overflow-hidden px-6 py-20 flex flex-col items-center text-center gap-8">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px] opacity-10"
        style={{ background: `radial-gradient(ellipse, ${r.scoreColor} 0%, transparent 65%)` }} />
      <div className="flex flex-col items-center gap-5 relative z-10"
        style={{ opacity: scoreVisible ? 1 : 0, transform: scoreVisible ? 'translateY(0)' : 'translateY(28px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
        <span className="text-xs font-bold uppercase tracking-[.2em] text-[#C4973F]">{label} — Your Revenue Reveal</span>
        <div className="flex items-center justify-center"
          style={{ width: 180, height: 180, borderRadius: '50%', border: `3px solid ${r.scoreColor}`, boxShadow: `0 0 60px ${r.scoreColor}40` }}>
          <div className="flex flex-col items-center">
            <span className="font-display font-black text-6xl leading-none" style={{ color: r.scoreColor }}>
              <CountUp target={r.score} duration={1500} delay={100} triggered={scoreVisible} />
            </span>
            <span className="text-xs text-white/40 mt-1 font-semibold">/ 100</span>
          </div>
        </div>
        <p className="text-sm font-bold uppercase tracking-widest" style={{ color: r.scoreColor }}>{r.scoreLabel}</p>
        <p className="text-[#8A8278] max-w-md text-base leading-relaxed">
          Here&apos;s exactly what your clinic is leaving on the table every month.
        </p>
      </div>
    </div>
  );
}
