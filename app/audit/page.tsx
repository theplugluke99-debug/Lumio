'use client';

import { useRef, useState } from 'react';
import CursorGlow from '@/components/ui/CursorGlow';
import PhaseIntro from '@/components/audit/PhaseIntro';
import PhaseQuestions from '@/components/audit/PhaseQuestions';
import PhaseCalculating from '@/components/audit/PhaseCalculating';
import PhaseResults from '@/components/audit/PhaseResults';
import { Answers } from '@/lib/audit';

type Phase = 'intro' | 'questions' | 'calculating' | 'results';

export default function AuditPage() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [clinicName, setClinicName] = useState('Your Clinic');
  const answersRef = useRef<Answers>({});
  const [fadeOut, setFadeOut] = useState(false);

  const go = (nextFn: () => void) => {
    setFadeOut(true);
    setTimeout(() => { nextFn(); setFadeOut(false); }, 320);
  };

  return (
    <main className="min-h-[100dvh] bg-[#1A1814]">
      {/* Overlay fades in/out during phase transitions — keeps charcoal visible, never exposes body bg */}
      <div
        className="fixed inset-0 z-[200] pointer-events-none bg-[#1A1814]"
        style={{ opacity: fadeOut ? 1 : 0, transition: 'opacity 0.32s ease' }}
      />
      <CursorGlow />
      {phase === 'intro' && (
        <PhaseIntro
          onStart={(name) => {
            setClinicName(name || 'Your Clinic');
            go(() => setPhase('questions'));
          }}
        />
      )}
      {phase === 'questions' && (
        <PhaseQuestions
          onComplete={(a) => {
            answersRef.current = a;
            go(() => setPhase('calculating'));
          }}
        />
      )}
      {phase === 'calculating' && (
        <PhaseCalculating onComplete={() => go(() => setPhase('results'))} />
      )}
      {phase === 'results' && (
        <PhaseResults answers={answersRef.current} clinicName={clinicName} />
      )}
    </main>
  );
}
