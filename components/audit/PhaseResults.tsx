'use client';

import { useEffect, useState } from 'react';
import Logo from '@/components/ui/Logo';
import ResultsScore from './ResultsScore';
import ResultsLosses from './ResultsLosses';
import ResultsTotal from './ResultsTotal';
import ResultsTier from './ResultsTier';
import ResultsRoi from './ResultsRoi';
import ResultsCTA from './ResultsCTA';
import { calculate, Answers } from '@/lib/audit';

interface Props { answers: Answers; clinicName: string; }

export default function PhaseResults({ answers, clinicName }: Props) {
  const r = calculate(answers);
  const label = clinicName || 'Your Clinic';

  const [scoreVisible, setScoreVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [totalVisible, setTotalVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setScoreVisible(true), 150);
    const t2 = setTimeout(() => setCardsVisible(true), 900);
    const t3 = setTimeout(() => setTotalVisible(true), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="min-h-[100dvh] overflow-x-hidden" style={{ backgroundColor: '#1A1814' }}>
      <div className="sticky top-0 z-20 px-6 py-4 flex items-center justify-between bg-[#1A1814]/80 backdrop-blur-xl border-b border-white/[0.05]">
        <a href="/"><Logo light /></a>
        <span className="text-xs text-white/40 font-semibold truncate max-w-[200px]">{label} Report</span>
        <a href="/audit" className="text-xs text-white/40 hover:text-white/70 transition-colors">Retake ↺</a>
      </div>
      <ResultsScore r={r} label={label} scoreVisible={scoreVisible} />
      <ResultsLosses r={r} cardsVisible={cardsVisible} />
      <ResultsTotal r={r} label={label} totalVisible={totalVisible} />
      <ResultsTier r={r} label={label} />
      <ResultsRoi r={r} totalVisible={totalVisible} />
      <ResultsCTA r={r} />
    </div>
  );
}
