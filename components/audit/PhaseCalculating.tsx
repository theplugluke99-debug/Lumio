'use client';

import { useState, useEffect, useRef } from 'react';
import Logo from '@/components/ui/Logo';
import { CALC_STEPS } from '@/lib/data';

interface Props { onComplete: () => void; }

export default function PhaseCalculating({ onComplete }: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const [barWidth, setBarWidth] = useState(0);
  const [stepVisible, setStepVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let step = 0;
    let cancelled = false;

    const runStep = () => {
      if (cancelled) return;
      setStepVisible(true);
      setBarWidth(0);
      const barStart = performance.now();
      const animBar = (now: number) => {
        if (cancelled) return;
        const p = Math.min((now - barStart) / 1400, 1);
        setBarWidth(p * 100);
        if (p < 1) { requestAnimationFrame(animBar); return; }
        setTimeout(() => {
          if (cancelled) return;
          setStepVisible(false);
          setTimeout(() => {
            if (cancelled) return;
            step++;
            if (step >= CALC_STEPS.length) { setFading(true); setTimeout(() => onCompleteRef.current(), 400); }
            else { setStepIndex(step); runStep(); }
          }, 300);
        }, 200);
      };
      requestAnimationFrame(animBar);
    };

    runStep();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="min-h-screen bg-[#1A1814] flex flex-col items-center justify-center gap-10 px-6 relative overflow-hidden"
      style={{ opacity: fading ? 0 : 1, transition: fading ? 'opacity 0.4s ease' : undefined }}>
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] opacity-10" style={{ background: '#C4973F' }} />
      <Logo light />
      <div className="flex flex-col items-center gap-6 w-full max-w-xs relative z-10">
        <p className="font-display italic text-xl text-[#FFFDF8] text-center"
          style={{ opacity: stepVisible ? 1 : 0, transform: stepVisible ? 'translateY(0)' : 'translateY(-8px)', transition: 'opacity 0.3s ease, transform 0.3s ease' }}>
          {CALC_STEPS[stepIndex]}
        </p>
        <div className="h-[3px] w-full rounded-full bg-white/[0.08] overflow-hidden">
          <div className="h-full rounded-full"
            style={{ width: `${barWidth}%`, background: 'linear-gradient(90deg, #C4973F, #E8B44B)', transition: barWidth === 0 ? 'none' : 'width 0.05s linear' }} />
        </div>
        <p className="text-xs text-white/25 tracking-wide">Step {stepIndex + 1} of {CALC_STEPS.length}</p>
      </div>
    </div>
  );
}
