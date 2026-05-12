import CountUp from '@/components/ui/CountUp';
import { Results, GOLD_GRAD } from '@/lib/audit';

interface Props { r: Results; cardsVisible: boolean; }

export default function ResultsLosses({ r, cardsVisible }: Props) {
  const cards = [
    {
      title: 'Lost to slow enquiry response', bg: '#F9EDE8', amount: r.slowResponseLoss,
      note: `Based on your response time and ${r.weeklyEnquiries} weekly enquiries, an estimated ${Math.round(r.responseMultiplier * 100)}% of leads are booking elsewhere before you reply.`,
    },
    {
      title: 'Lost to no-shows & cancellations', bg: '#F0EDF8', amount: r.noShowLoss,
      note: `At ${Math.round(r.noShowRate * 100)}% no-show rate and £${r.avgTreatmentValue} average treatment value, you're losing approximately ${Math.round(20 * r.noShowRate)} treatments per month.`,
    },
    {
      title: 'Lost to no rebooking system', bg: '#F2DDD8', amount: r.rebookingLoss,
      note: r.rebookingLoss === 0
        ? 'Great — you already have a rebooking system in place.'
        : `Without automated rebooking, clinics typically retain 40% fewer returning clients — approximately £${r.rebookingLoss.toLocaleString('en-GB')}/month lost.`,
    },
  ];

  return (
    <div className="px-4 pb-16">
      <div className="mx-auto max-w-5xl">
        <p className="text-center text-xs font-bold uppercase tracking-[.2em] text-[#C4973F] mb-8">
          Your monthly revenue losses
        </p>
        <div className="grid md:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <div key={card.title} className="rounded-[1.75rem] p-7 flex flex-col gap-4"
              style={{
                background: card.bg,
                opacity: cardsVisible ? 1 : 0,
                transform: cardsVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: `opacity 0.6s ease ${i * 180}ms, transform 0.6s ease ${i * 180}ms`,
              }}>
              <p className="text-xs font-bold uppercase tracking-wide text-[#8A8278]">{card.title}</p>
              <p className="font-display font-black text-4xl md:text-5xl tracking-[-0.04em]" style={GOLD_GRAD}>
                £<CountUp target={card.amount} duration={1600} delay={i * 180 + 100} triggered={cardsVisible} />/mo
              </p>
              <p className="text-sm text-[#8A8278] leading-relaxed">{card.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
