'use client';

import { useState, useEffect, useRef } from 'react';
import Logo from '@/components/ui/Logo';
import GoldButton from '@/components/ui/GoldButton';
import { LumioOrb } from '@/components/ui/LumioOrb';
import { QUESTIONS } from '@/lib/data';
import { Answers } from '@/lib/audit';

interface Props { onComplete: (answers: Answers) => void; }

const NUDGES = [
  'Good — enquiry volume is the biggest factor in your result.',
  'This is where most clinics lose the most money. Key data point.',
  'Treatment value really sharpens your numbers. Good.',
  'Honest answer here gives you the most accurate report.',
  'This tells us exactly where to focus your automation.',
  'This is usually the biggest gap. Your report will show the full impact.',
  'Rebooking is pure profit — clients who already trust you.',
  'Perfect — building your report now.',
];

export default function PhaseQuestions({ onComplete }: Props) {
  const [answers, setAnswers] = useState<Answers>({});
  const [qIndex, setQIndex] = useState(0);
  const [containerStyle, setContainerStyle] = useState<React.CSSProperties>({
    opacity: 1, transform: 'translateX(0)', transition: 'opacity 0.26s ease, transform 0.26s ease',
  });
  const [busy, setBusy] = useState(false);
  const [nudgeVisible, setNudgeVisible] = useState(false);
  const [showHesitation, setShowHesitation] = useState(false);
  const hesitationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selected = answers[qIndex] ?? null;

  const resetHesitation = () => {
    if (hesitationTimer.current) clearTimeout(hesitationTimer.current);
    setShowHesitation(false);
    hesitationTimer.current = setTimeout(() => setShowHesitation(true), 18000);
  };

  useEffect(() => {
    resetHesitation();
    return () => { if (hesitationTimer.current) clearTimeout(hesitationTimer.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qIndex]);

  const navigate = (nextIdx: number, dir: 1 | -1) => {
    if (busy) return;
    setBusy(true);
    setContainerStyle({ opacity: 0, transform: `translateX(${dir * -52}px)`, transition: 'opacity 0.22s ease, transform 0.22s ease' });
    setTimeout(() => {
      setQIndex(nextIdx);
      setContainerStyle({ opacity: 0, transform: `translateX(${dir * 52}px)`, transition: 'none' });
      requestAnimationFrame(() => requestAnimationFrame(() => {
        setContainerStyle({ opacity: 1, transform: 'translateX(0)', transition: 'opacity 0.28s ease, transform 0.28s ease' });
        setBusy(false);
      }));
    }, 240);
  };

  const handleNext = () => {
    if (!selected || busy) return;
    resetHesitation();
    if (qIndex === QUESTIONS.length - 1) { onComplete(answers); return; }
    setNudgeVisible(true);
    setTimeout(() => {
      setNudgeVisible(false);
      setTimeout(() => navigate(qIndex + 1, 1), 300);
    }, 1500);
  };

  const progress = (qIndex / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-[#1A1814] flex flex-col relative overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] opacity-8" style={{ background: '#C4973F' }} />

      <div className="relative z-10 px-6 pt-6 pb-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <button type="button" onClick={() => { if (qIndex > 0) navigate(qIndex - 1, -1); }}
            className={`flex items-center gap-2 text-sm transition-all duration-200 ${qIndex === 0 ? 'opacity-0 pointer-events-none' : 'text-white/40 hover:text-white/80'}`}>
            <span>←</span> Back
          </button>
          <a href="/"><Logo light /></a>
          <span className="text-xs font-semibold text-[#C4973F] tracking-wide">Question {qIndex + 1} of {QUESTIONS.length}</span>
        </div>
        <div className="h-[3px] w-full rounded-full bg-white/[0.07] overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #C4973F, #E8B44B)' }} />
        </div>
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl flex flex-col items-center gap-10" style={containerStyle}>
          <h2 className="font-display italic font-black text-2xl md:text-4xl text-center text-[#FFFDF8] leading-[1.15] tracking-[-0.02em]">
            {QUESTIONS[qIndex].text}
          </h2>
          <div className="flex flex-col gap-3 w-full">
            {QUESTIONS[qIndex].options.map((opt) => {
              const isSelected = selected === opt;
              return (
                <button key={opt} type="button"
                  onClick={() => { if (!busy) { setAnswers(prev => ({ ...prev, [qIndex]: opt })); resetHesitation(); } }}
                  className="rounded-full px-7 py-3.5 text-sm font-semibold text-left transition-all duration-200"
                  style={{
                    border: isSelected ? '1.5px solid #C4973F' : '1.5px solid rgba(255,255,255,0.12)',
                    background: isSelected ? '#C4973F' : 'rgba(255,255,255,0.03)',
                    color: isSelected ? '#1A1814' : 'rgba(255,255,255,0.65)',
                    transform: isSelected ? 'translateY(-1px)' : undefined,
                    boxShadow: isSelected ? '0 12px 40px rgba(196,151,63,.25)' : undefined,
                    minHeight: '44px', touchAction: 'manipulation',
                  }}
                  onMouseEnter={(e) => { if (!isSelected) { e.currentTarget.style.borderColor = 'rgba(196,151,63,0.5)'; e.currentTarget.style.color = '#E8B44B'; } }}
                  onMouseLeave={(e) => { if (!isSelected) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; } }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          <div className="w-full flex flex-col items-center gap-4">
            <p className="text-sm italic text-[#E8B44B]/70 text-center h-5 transition-opacity duration-300"
              style={{ opacity: nudgeVisible ? 1 : 0 }}>
              {NUDGES[qIndex]}
            </p>
            <div style={{ opacity: selected ? 1 : 0, transform: selected ? 'translateY(0)' : 'translateY(10px)', transition: 'opacity 0.22s ease, transform 0.22s ease', pointerEvents: selected ? 'auto' : 'none' }}>
              <GoldButton onClick={handleNext}>{qIndex === QUESTIONS.length - 1 ? 'See my results' : 'Next'}</GoldButton>
            </div>
            <a href="/ai" className="group flex items-center gap-3 mx-auto w-fit mt-2 px-5 py-3 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-[#C4973F]/40 hover:bg-[#C4973F]/[0.06]">
              <LumioOrb size="sm" />
              <span className="text-sm text-[#FFFDF8]/45 group-hover:text-[#E8B44B] transition-colors duration-200">
                Prefer to talk it through? Chat with Lumio AI instead
              </span>
              <span className="text-[#C4973F]/50 group-hover:text-[#C4973F] group-hover:translate-x-1 transition-all duration-200">→</span>
            </a>
          </div>
        </div>
      </div>

      {showHesitation && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20" style={{ animation: 'rise 0.4s ease both' }}>
          <a href="/ai" className="flex items-center gap-2 text-xs text-[#FFFDF8]/30 hover:text-[#E8B44B] transition-colors bg-[#1A1814]/80 backdrop-blur px-4 py-3 rounded-full border border-white/10">
            <LumioOrb size="sm" />
            <span>Prefer to just talk it through? Chat with our AI instead →</span>
          </a>
        </div>
      )}
    </div>
  );
}
