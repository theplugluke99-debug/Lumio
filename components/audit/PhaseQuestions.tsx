'use client';

import { useState } from 'react';
import Logo from '@/components/ui/Logo';
import GoldButton from '@/components/ui/GoldButton';
import { QUESTIONS } from '@/lib/data';
import { Answers } from '@/lib/audit';

interface Props { onComplete: (answers: Answers) => void; }

export default function PhaseQuestions({ onComplete }: Props) {
  const [answers, setAnswers] = useState<Answers>({});
  const [qIndex, setQIndex] = useState(0);
  const [containerStyle, setContainerStyle] = useState<React.CSSProperties>({
    opacity: 1, transform: 'translateX(0)', transition: 'opacity 0.26s ease, transform 0.26s ease',
  });
  const [busy, setBusy] = useState(false);

  const selected = answers[qIndex] ?? null;

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
    if (qIndex === QUESTIONS.length - 1) { onComplete(answers); return; }
    navigate(qIndex + 1, 1);
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
                <button key={opt} type="button" onClick={() => !busy && setAnswers(prev => ({ ...prev, [qIndex]: opt }))}
                  className="rounded-full px-7 py-3.5 text-sm font-semibold text-left transition-all duration-200"
                  style={{
                    border: isSelected ? '1.5px solid #C4973F' : '1.5px solid rgba(255,255,255,0.12)',
                    background: isSelected ? '#C4973F' : 'rgba(255,255,255,0.03)',
                    color: isSelected ? '#1A1814' : 'rgba(255,255,255,0.65)',
                    transform: isSelected ? 'translateY(-1px)' : undefined,
                    boxShadow: isSelected ? '0 12px 40px rgba(196,151,63,.25)' : undefined,
                  }}
                  onMouseEnter={(e) => { if (!isSelected) { e.currentTarget.style.borderColor = 'rgba(196,151,63,0.5)'; e.currentTarget.style.color = '#E8B44B'; } }}
                  onMouseLeave={(e) => { if (!isSelected) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; } }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          <div style={{ opacity: selected ? 1 : 0, transform: selected ? 'translateY(0)' : 'translateY(10px)', transition: 'opacity 0.22s ease, transform 0.22s ease', pointerEvents: selected ? 'auto' : 'none' }}>
            <GoldButton onClick={handleNext}>{qIndex === QUESTIONS.length - 1 ? 'See my results' : 'Next'}</GoldButton>
          </div>
        </div>
      </div>
    </div>
  );
}
