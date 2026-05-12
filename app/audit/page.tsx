'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useCountUp } from '@/hooks/useCountUp';

/* ─── Types ─── */
type Phase = 'intro' | 'questions' | 'calculating' | 'results';
type Answers = Record<number, string>;

/* ─── Shared UI ─── */
function Logo({ light }: { light?: boolean }) {
  const filter = light
    ? 'brightness(10) saturate(0.6) sepia(0.3)'
    : 'brightness(0.15) sepia(1) saturate(4) hue-rotate(5deg)';
  return (
    <Image
      src="/lumio-logo.png"
      alt="Lumio"
      width={130}
      height={44}
      className="h-9 w-auto object-contain"
      style={{ filter }}
      priority
    />
  );
}

function GoldButton({
  children, onClick, href, large,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  large?: boolean;
}) {
  const base = `group inline-flex items-center gap-2 rounded-full font-semibold transition-all duration-200 hover:-translate-y-1 shadow-[0_20px_60px_rgba(196,151,63,.2)] bg-[#C4973F] text-[#1A1814] hover:bg-[#E8B44B] ${large ? 'px-9 py-4 text-base' : 'px-7 py-3.5 text-sm'}`;
  const arrow = <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>;
  if (href) return <a href={href} className={base}>{children}{arrow}</a>;
  return <button type="button" onClick={onClick} className={base}>{children}{arrow}</button>;
}

/* ─── CursorGlow ─── */
function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) { dotRef.current.style.left = `${e.clientX}px`; dotRef.current.style.top = `${e.clientY}px`; }
    };
    window.addEventListener('mousemove', onMove);
    let raf: number;
    const tick = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      if (ringRef.current) { ringRef.current.style.left = `${ring.current.x}px`; ringRef.current.style.top = `${ring.current.y}px`; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);
  return (
    <>
      <div ref={dotRef} className="fixed z-[9999] hidden md:block pointer-events-none"
        style={{ width: 16, height: 16, borderRadius: '50%', background: '#C4973F', transform: 'translate(-50%,-50%)', top: 0, left: 0 }} />
      <div ref={ringRef} className="fixed z-[9998] hidden md:block pointer-events-none"
        style={{ width: 48, height: 48, borderRadius: '50%', border: '1.5px solid #C4973F', transform: 'translate(-50%,-50%)', opacity: 0.5, top: 0, left: 0 }} />
    </>
  );
}

/* ─── Count-up display ─── */
function CountUp({
  target, prefix = '', suffix = '', duration = 1800, delay = 0, triggered, decimals = 0,
}: {
  target: number; prefix?: string; suffix?: string;
  duration?: number; delay?: number; triggered: boolean; decimals?: number;
}) {
  const count = useCountUp(target, duration, delay, triggered);
  const display = decimals > 0
    ? count.toFixed(decimals)
    : Math.floor(count).toLocaleString('en-GB');
  return <>{`${prefix}${display}${suffix}`}</>;
}

/* ─── Calculation engine ─── */
const ENQUIRIES_MAP: Record<string, number> = {
  '1–5': 3, '6–10': 8, '11–20': 15, '20+': 25,
};
const RESPONSE_MULT: Record<string, number> = {
  'Within minutes': 0.05, 'Within the hour': 0.25, 'Same day': 0.55, 'Next day or longer': 0.78,
};
const TREATMENT_VAL: Record<string, number> = {
  'Under £100': 75, '£100–£200': 150, '£200–£500': 350, '£500+': 650,
};
const NOSHOW_RATE: Record<string, number> = {
  'Less than 5%': 0.03, '5–10%': 0.075, '10–20%': 0.15, 'Over 20%': 0.25,
};
const LUMIO_MONTHLY: Record<string, number> = {
  Foundation: 600, 'Full System': 900, 'Full Operations': 1400,
};
const LUMIO_SETUP: Record<string, number> = {
  Foundation: 1500, 'Full System': 2500, 'Full Operations': 4000,
};

interface Results {
  score: number; scoreLabel: string; scoreColor: string;
  slowResponseLoss: number; noShowLoss: number; rebookingLoss: number;
  totalMonthly: number; annualLoss: number;
  weeklyEnquiries: number; responseMultiplier: number;
  avgTreatmentValue: number; noShowRate: number;
  recommendedTier: 'Foundation' | 'Full System' | 'Full Operations';
  tierReasons: string[];
  month1Net: number; month3Cumulative: number; month6Cumulative: number; roiMultiple: number;
}

function calculate(answers: Answers): Results {
  const weeklyEnquiries = ENQUIRIES_MAP[answers[0]] ?? 8;
  const responseMultiplier = RESPONSE_MULT[answers[1]] ?? 0.55;
  const avgTreatmentValue = TREATMENT_VAL[answers[2]] ?? 150;
  const noShowRate = NOSHOW_RATE[answers[3]] ?? 0.075;

  const slowResponseLoss = Math.round(weeklyEnquiries * responseMultiplier * avgTreatmentValue * 4.33);
  const noShowLoss = Math.round(20 * noShowRate * avgTreatmentValue * 4.33);
  const hasRebooking = answers[6] === 'Yes';
  const rebookingLoss = hasRebooking
    ? 0
    : Math.round(weeklyEnquiries * 0.3 * avgTreatmentValue * 4.33 * 0.4);
  const totalMonthly = slowResponseLoss + noShowLoss + rebookingLoss;
  const annualLoss = totalMonthly * 12;

  // Readiness score — starts at 100, deductions lower it
  let score = 100;
  if (answers[1] === 'Within the hour') score -= 10;
  else if (answers[1] === 'Same day') score -= 25;
  else if (answers[1] === 'Next day or longer') score -= 40;
  if (answers[5] === 'Partially — I do some manually') score -= 15;
  else if (answers[5] === "No, it's all manual") score -= 30;
  else if (answers[5] === "I don't follow up at all") score -= 40;
  if (answers[6] === 'I do it manually sometimes') score -= 10;
  else if (answers[6] === 'No') score -= 20;
  else if (answers[6] === "What's that?") score -= 25;
  if (answers[3] === '5–10%') score -= 5;
  else if (answers[3] === '10–20%') score -= 10;
  else if (answers[3] === 'Over 20%') score -= 15;
  score = Math.max(0, score);

  const scoreLabel = score <= 30
    ? 'Significant opportunity'
    : score <= 60 ? 'Moderate systems in place'
    : score <= 80 ? 'Good foundations'
    : 'Already optimised';
  const scoreColor = score <= 30 ? '#E8998D'
    : score <= 60 ? '#C4973F'
    : score <= 80 ? '#7AAB82'
    : '#E8B44B';

  // Recommended tier
  const needsDMs = answers[4] === 'Instagram DMs';
  const noFollowUp = answers[5] === "No, it's all manual" || answers[5] === "I don't follow up at all";
  const noRebooking = answers[6] === 'No' || answers[6] === "What's that?";
  const adminPain = answers[7] === 'Admin taking too long';

  let recommendedTier: 'Foundation' | 'Full System' | 'Full Operations' = 'Foundation';
  const tierReasons: string[] = [];

  if (needsDMs || noFollowUp || noRebooking || score < 40) {
    recommendedTier = 'Full System';
    if (needsDMs) tierReasons.push('Instagram DM automation — your main enquiry channel needs 24/7 coverage');
    if (noFollowUp) tierReasons.push("Full AI conversation handling — you're losing leads by replying too slowly or not at all");
    if (noRebooking) tierReasons.push('Rebooking & retention flows — your existing clients are your most profitable asset');
    if (!tierReasons.length) tierReasons.push("Your score indicates multiple revenue leaks that Foundation alone won't fully close");
  } else {
    tierReasons.push('Instant lead response & booking automation will recover the majority of your losses');
    tierReasons.push('Reminder sequences will reduce your no-show rate immediately');
  }
  if (adminPain && recommendedTier === 'Full System') {
    recommendedTier = 'Full Operations';
    tierReasons.push('Full admin automation — consent forms, aftercare, invoicing and inbox all handled for you');
  }
  if (score < 15) {
    recommendedTier = 'Full Operations';
    if (!tierReasons.some((r) => r.includes('admin'))) {
      tierReasons.push('Your clinic has significant gaps across leads, retention, and operations — Full Operations closes them all');
    }
  }

  // ROI — using totalMonthly directly per spec
  const monthly = LUMIO_MONTHLY[recommendedTier];
  const setup = LUMIO_SETUP[recommendedTier];
  const month1Net = totalMonthly - monthly;
  const month3Cumulative = totalMonthly * 3 - (setup + monthly * 3);
  const month6Cumulative = totalMonthly * 6 - (setup + monthly * 6);
  const roiMultiple = Math.max(1, Math.round((totalMonthly * 12) / (setup + monthly * 12) * 10) / 10);

  return {
    score, scoreLabel, scoreColor,
    slowResponseLoss, noShowLoss, rebookingLoss, totalMonthly, annualLoss,
    weeklyEnquiries, responseMultiplier, avgTreatmentValue, noShowRate,
    recommendedTier, tierReasons,
    month1Net, month3Cumulative, month6Cumulative, roiMultiple,
  };
}

const GOLD_GRAD: React.CSSProperties = {
  background: 'linear-gradient(110deg,#C4973F 0%,#E8B44B 45%,#F4D38A 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

/* ─── PHASE 1 — Intro ─── */
function PhaseIntro({ onStart }: { onStart: (clinicName: string) => void }) {
  const [visible, setVisible] = useState(false);
  const [clinicName, setClinicName] = useState('');
  useEffect(() => { const t = setTimeout(() => setVisible(true), 60); return () => clearTimeout(t); }, []);

  return (
    <div
      className="min-h-screen bg-[#1A1814] flex flex-col overflow-hidden relative"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease' }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] opacity-10"
          style={{ background: 'radial-gradient(ellipse, #C4973F 0%, transparent 65%)' }} />
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden select-none">
          <span className="font-display text-[28vw] font-black italic text-white select-none"
            style={{ opacity: 0.018, letterSpacing: '-0.04em', whiteSpace: 'nowrap' }}>Lumio</span>
        </div>
      </div>

      <div className="relative z-10 px-6 pt-7 flex justify-between items-center">
        <a href="/"><Logo light /></a>
        <a href="/" className="text-sm text-white/40 hover:text-white/70 transition-colors">← Back to site</a>
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-20">
        <div className="flex flex-col items-center text-center gap-8 max-w-2xl w-full">
          <div style={{ animation: 'rise 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both' }}
            className="inline-flex items-center gap-2 rounded-full border border-[#C4973F]/30 bg-[#C4973F]/10 px-4 py-2 text-xs font-bold tracking-widest text-[#E8B44B] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C4973F] pulse-dot" />
            Free · Takes 3 minutes · Instant results
          </div>

          <h1 style={{ animation: 'rise 0.7s cubic-bezier(0.22,1,0.36,1) 0.25s both' }}
            className="font-display font-black text-4xl md:text-6xl lg:text-7xl leading-[.9] tracking-[-0.04em] text-[#FFFDF8]">
            Find out exactly what your clinic is{' '}
            <span className="italic" style={GOLD_GRAD}>leaving on the table.</span>
          </h1>

          <p style={{ animation: 'rise 0.7s cubic-bezier(0.22,1,0.36,1) 0.4s both', color: 'rgba(255,253,248,0.58)' }}
            className="text-base md:text-lg leading-relaxed max-w-lg">
            Answer 8 questions. Get a personalised revenue report showing exactly how much
            your clinic is losing every month — and what to do about it.
          </p>

          <div style={{ animation: 'rise 0.7s cubic-bezier(0.22,1,0.36,1) 0.5s both' }}
            className="w-full max-w-sm flex flex-col gap-3">
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-xs text-white/40 font-semibold uppercase tracking-widest px-1">
                Your clinic name (optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Glow Aesthetics London"
                value={clinicName}
                onChange={(e) => setClinicName(e.target.value)}
                className="rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-sm px-5 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-[#C4973F]/50 transition-colors"
              />
            </div>
            <GoldButton onClick={() => onStart(clinicName.trim())} large>
              Start my free audit
            </GoldButton>
            <p className="text-xs text-white/25 text-center">No email required to start. No sales calls.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── PHASE 2 — Questions ─── */
const QUESTIONS = [
  { text: 'How many new enquiries does your clinic receive each week?', options: ['1–5', '6–10', '11–20', '20+'] },
  { text: 'How quickly do you typically respond to a new enquiry?', options: ['Within minutes', 'Within the hour', 'Same day', 'Next day or longer'] },
  { text: "What's your average treatment value?", options: ['Under £100', '£100–£200', '£200–£500', '£500+'] },
  { text: 'What percentage of your appointments are no-shows or last-minute cancellations?', options: ['Less than 5%', '5–10%', '10–20%', 'Over 20%'] },
  { text: 'How do most of your enquiries come in?', options: ['Instagram DMs', 'Website form', 'Phone calls', 'Walk-ins / Word of mouth'] },
  { text: 'Do you currently have an automated system to follow up missed enquiries?', options: ['Yes, fully automated', 'Partially — I do some manually', "No, it's all manual", "I don't follow up at all"] },
  { text: 'Do you have an automated rebooking flow for past clients?', options: ['Yes', 'No', 'I do it manually sometimes', "What's that?"] },
  { text: "What's your biggest operational headache right now?", options: ['Missing enquiries', 'No-shows & cancellations', 'Admin taking too long', 'Getting clients to rebook'] },
];

function PhaseQuestions({ onComplete }: { onComplete: (answers: Answers) => void }) {
  // Single source of truth — no separate 'selected' state
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
    // Exit animation
    setContainerStyle({ opacity: 0, transform: `translateX(${dir * -52}px)`, transition: 'opacity 0.22s ease, transform 0.22s ease' });
    setTimeout(() => {
      setQIndex(nextIdx);
      // Enter from opposite side (no transition flash)
      setContainerStyle({ opacity: 0, transform: `translateX(${dir * 52}px)`, transition: 'none' });
      requestAnimationFrame(() => requestAnimationFrame(() => {
        setContainerStyle({ opacity: 1, transform: 'translateX(0)', transition: 'opacity 0.28s ease, transform 0.28s ease' });
        setBusy(false);
      }));
    }, 240);
  };

  const handleSelect = (opt: string) => {
    if (busy) return;
    setAnswers((prev) => ({ ...prev, [qIndex]: opt }));
  };

  const handleNext = () => {
    if (!selected || busy) return;
    if (qIndex === QUESTIONS.length - 1) {
      onComplete(answers);
      return;
    }
    navigate(qIndex + 1, 1);
  };

  const handleBack = () => {
    if (qIndex === 0 || busy) return;
    navigate(qIndex - 1, -1);
  };

  const progress = (qIndex / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-[#1A1814] flex flex-col relative overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] opacity-8"
        style={{ background: '#C4973F' }} />

      {/* Top bar */}
      <div className="relative z-10 px-6 pt-6 pb-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            className={`flex items-center gap-2 text-sm transition-all duration-200 ${qIndex === 0 ? 'opacity-0 pointer-events-none' : 'text-white/40 hover:text-white/80'}`}
          >
            <span>←</span> Back
          </button>
          <a href="/"><Logo light /></a>
          <span className="text-xs font-semibold text-[#C4973F] tracking-wide">
            Question {qIndex + 1} of {QUESTIONS.length}
          </span>
        </div>
        <div className="h-[3px] w-full rounded-full bg-white/[0.07] overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #C4973F, #E8B44B)' }}
          />
        </div>
      </div>

      {/* Question content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl flex flex-col items-center gap-10" style={containerStyle}>
          <h2 className="font-display italic font-black text-2xl md:text-4xl text-center text-[#FFFDF8] leading-[1.15] tracking-[-0.02em]">
            {QUESTIONS[qIndex].text}
          </h2>

          <div className="flex flex-col gap-3 w-full">
            {QUESTIONS[qIndex].options.map((opt) => {
              const isSelected = selected === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSelect(opt)}
                  className="rounded-full px-7 py-3.5 text-sm font-semibold text-left transition-all duration-200"
                  style={{
                    border: isSelected ? '1.5px solid #C4973F' : '1.5px solid rgba(255,255,255,0.12)',
                    background: isSelected ? '#C4973F' : 'rgba(255,255,255,0.03)',
                    color: isSelected ? '#1A1814' : 'rgba(255,255,255,0.65)',
                    transform: isSelected ? 'translateY(-1px)' : undefined,
                    boxShadow: isSelected ? '0 12px 40px rgba(196,151,63,.25)' : undefined,
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      (e.currentTarget).style.borderColor = 'rgba(196,151,63,0.5)';
                      (e.currentTarget).style.color = '#E8B44B';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      (e.currentTarget).style.borderColor = 'rgba(255,255,255,0.12)';
                      (e.currentTarget).style.color = 'rgba(255,255,255,0.65)';
                    }
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          <div style={{
            opacity: selected ? 1 : 0,
            transform: selected ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.22s ease, transform 0.22s ease',
            pointerEvents: selected ? 'auto' : 'none',
          }}>
            <GoldButton onClick={handleNext}>
              {qIndex === QUESTIONS.length - 1 ? 'See my results' : 'Next'}
            </GoldButton>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── PHASE 3 — Calculating ─── */
const CALC_STEPS = [
  'Analysing your clinic data...',
  'Calculating revenue losses...',
  'Building your personalised report...',
];

function PhaseCalculating({ onComplete }: { onComplete: () => void }) {
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
      const barDur = 1400;
      const animBar = (now: number) => {
        if (cancelled) return;
        const p = Math.min((now - barStart) / barDur, 1);
        setBarWidth(p * 100);
        if (p < 1) { requestAnimationFrame(animBar); return; }
        setTimeout(() => {
          if (cancelled) return;
          setStepVisible(false);
          setTimeout(() => {
            if (cancelled) return;
            step++;
            if (step >= CALC_STEPS.length) {
              setFading(true);
              setTimeout(() => onCompleteRef.current(), 400);
            } else {
              setStepIndex(step);
              runStep();
            }
          }, 300);
        }, 200);
      };
      requestAnimationFrame(animBar);
    };

    runStep();
    return () => { cancelled = true; };
  }, []);

  return (
    <div
      className="min-h-screen bg-[#1A1814] flex flex-col items-center justify-center gap-10 px-6 relative overflow-hidden"
      style={{ opacity: fading ? 0 : 1, transition: fading ? 'opacity 0.4s ease' : undefined }}
    >
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] opacity-10"
        style={{ background: '#C4973F' }} />
      <Logo light />
      <div className="flex flex-col items-center gap-6 w-full max-w-xs relative z-10">
        <p
          className="font-display italic text-xl text-[#FFFDF8] text-center"
          style={{ opacity: stepVisible ? 1 : 0, transform: stepVisible ? 'translateY(0)' : 'translateY(-8px)', transition: 'opacity 0.3s ease, transform 0.3s ease' }}
        >
          {CALC_STEPS[stepIndex]}
        </p>
        <div className="h-[3px] w-full rounded-full bg-white/[0.08] overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{ width: `${barWidth}%`, background: 'linear-gradient(90deg, #C4973F, #E8B44B)', transition: barWidth === 0 ? 'none' : 'width 0.05s linear' }}
          />
        </div>
        <p className="text-xs text-white/25 tracking-wide">Step {stepIndex + 1} of {CALC_STEPS.length}</p>
      </div>
    </div>
  );
}

/* ─── PHASE 4 — Results ─── */
const TIER_FEATURES: Record<string, string[]> = {
  Foundation: [
    'Instant lead response system', 'Automated booking & confirmations',
    'Appointment reminder sequences', 'Review generation flow',
    'Lumio dashboard access', '30-day onboarding support',
  ],
  'Full System': [
    'Everything in Foundation', 'Instagram DM automation',
    'Rebooking & retention flows', 'Full AI conversation handling',
    'Monthly performance review', 'Priority support',
  ],
  'Full Operations': [
    'Everything in Full System', 'Consent form automation & filing',
    'Aftercare instruction sequences', 'Invoice chasing automation',
    'Stock & supply reminders', 'Dedicated monthly account call',
  ],
};

function PhaseResults({ answers, clinicName }: { answers: Answers; clinicName: string }) {
  const r = calculate(answers);
  const label = clinicName || 'Your Clinic';

  // Staggered reveal triggers — all driven by mounting
  const [scoreVisible, setScoreVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [totalVisible, setTotalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setScoreVisible(true), 150);
    const t2 = setTimeout(() => setCardsVisible(true), 900);
    const t3 = setTimeout(() => setTotalVisible(true), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const revealCards = [
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
    <div className="bg-[#1A1814] min-h-screen overflow-x-hidden">
      {/* Sticky nav */}
      <div className="sticky top-0 z-20 px-6 py-4 flex items-center justify-between bg-[#1A1814]/80 backdrop-blur-xl border-b border-white/[0.05]">
        <a href="/"><Logo light /></a>
        <span className="text-xs text-white/40 font-semibold truncate max-w-[200px]">{label} Report</span>
        <a href="/audit" className="text-xs text-white/40 hover:text-white/70 transition-colors">Retake ↺</a>
      </div>

      {/* Score section */}
      <div className="relative overflow-hidden px-6 py-20 flex flex-col items-center text-center gap-8">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px] opacity-10"
          style={{ background: `radial-gradient(ellipse, ${r.scoreColor} 0%, transparent 65%)` }} />

        <div
          className="flex flex-col items-center gap-5 relative z-10"
          style={{ opacity: scoreVisible ? 1 : 0, transform: scoreVisible ? 'translateY(0)' : 'translateY(28px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
        >
          <span className="text-xs font-bold uppercase tracking-[.2em] text-[#C4973F]">
            {label} — Your results are ready
          </span>

          {/* Score circle — count-up triggers immediately on scoreVisible */}
          <div
            className="flex items-center justify-center"
            style={{ width: 180, height: 180, borderRadius: '50%', border: `3px solid ${r.scoreColor}`, boxShadow: `0 0 60px ${r.scoreColor}40` }}
          >
            <div className="flex flex-col items-center">
              <span className="font-display font-black text-6xl leading-none" style={{ color: r.scoreColor }}>
                <CountUp target={r.score} duration={1500} delay={100} triggered={scoreVisible} />
              </span>
              <span className="text-xs text-white/40 mt-1 font-semibold">/ 100</span>
            </div>
          </div>

          <p className="text-sm font-bold uppercase tracking-widest" style={{ color: r.scoreColor }}>
            {r.scoreLabel}
          </p>
          <p className="text-[#8A8278] max-w-md text-base leading-relaxed">
            A score of {r.score} means there is significant untapped revenue available in {label}.
            Here&apos;s your breakdown.
          </p>
        </div>
      </div>

      {/* Revenue loss cards */}
      <div className="px-4 pb-16">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-xs font-bold uppercase tracking-[.2em] text-[#C4973F] mb-8">
            Your monthly revenue losses
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {revealCards.map((card, i) => (
              <div
                key={card.title}
                className="rounded-[1.75rem] p-7 flex flex-col gap-4"
                style={{
                  background: card.bg,
                  opacity: cardsVisible ? 1 : 0,
                  transform: cardsVisible ? 'translateY(0)' : 'translateY(40px)',
                  transition: `opacity 0.6s ease ${i * 180}ms, transform 0.6s ease ${i * 180}ms`,
                }}
              >
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

      {/* Total — dramatic reveal */}
      <div className="relative bg-[#0F0D0B] py-20 px-6 text-center overflow-hidden">
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[130px] opacity-10"
          style={{ background: '#C4973F' }} />
        <div
          className="relative z-10 flex flex-col items-center gap-4"
          style={{ opacity: totalVisible ? 1 : 0, transform: totalVisible ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}
        >
          <p className="text-base md:text-xl text-white/50 font-semibold">
            {label} is likely losing
          </p>
          <p className="font-display font-black leading-none tracking-[-0.05em]"
            style={{ fontSize: 'clamp(3.5rem,10vw,7rem)', ...GOLD_GRAD }}>
            £<CountUp target={r.totalMonthly} duration={2000} delay={200} triggered={totalVisible} />
          </p>
          <p className="text-base md:text-xl text-white/50 font-semibold">every single month</p>
          <p className="mt-3 text-[#8A8278] text-sm">
            That&apos;s{' '}
            <span className="text-[#E8B44B] font-bold">
              £{r.annualLoss.toLocaleString('en-GB')}
            </span>{' '}
            per year. Lumio can recover most of it.
          </p>
        </div>
      </div>

      {/* Recommended tier */}
      <div className="py-16 px-4 bg-[#1A1814]">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-[2rem] border border-[#C4973F]/30 bg-white/[0.03] p-8 md:p-10 flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.2em] text-[#C4973F] mb-1">
                  Recommended for {label}
                </p>
                <h3 className="font-display font-black text-3xl text-[#FFFDF8]">{r.recommendedTier}</h3>
              </div>
              <div className="text-right">
                <span className="font-display font-black text-3xl text-[#FFFDF8]">
                  £{LUMIO_MONTHLY[r.recommendedTier]}
                  <span className="text-base font-normal text-white/40">/mo</span>
                </span>
                <p className="text-xs text-white/40 mt-0.5">
                  £{LUMIO_SETUP[r.recommendedTier].toLocaleString('en-GB')} setup
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm text-white/50 mb-3">Based on your audit, here&apos;s why this tier fits:</p>
              <ul className="flex flex-col gap-2">
                {r.tierReasons.map((reason, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <span className="text-[#C4973F] mt-0.5 shrink-0">✦</span>
                    <span className="text-white/70">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-white/[0.06] pt-6">
              <p className="text-xs font-bold uppercase tracking-wide text-white/30 mb-3">What&apos;s included</p>
              <ul className="grid sm:grid-cols-2 gap-2">
                {TIER_FEATURES[r.recommendedTier].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/55">
                    <span className="text-[#C4973F] shrink-0">✓</span>{f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ROI projection */}
      <div className="py-16 px-4" style={{ background: 'linear-gradient(180deg, #1A1814 0%, #0F0D0B 100%)' }}>
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-xs font-bold uppercase tracking-[.2em] text-[#C4973F] mb-10">
            Your ROI projection
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Month 1 net', value: r.month1Net, prefix: '£', suffix: '' },
              { label: 'Month 3 cumulative', value: r.month3Cumulative, prefix: '£', suffix: '' },
              { label: 'Month 6 cumulative', value: r.month6Cumulative, prefix: '£', suffix: '' },
              { label: 'Annual ROI', value: r.roiMultiple, prefix: '', suffix: '×', decimals: 1 },
            ].map((item, i) => (
              <div
                key={item.label}
                className="rounded-[1.5rem] border border-white/[0.07] bg-white/[0.03] p-5 flex flex-col gap-2 text-center"
                style={{
                  opacity: totalVisible ? 1 : 0,
                  transform: totalVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.5s ease ${i * 120 + 200}ms, transform 0.5s ease ${i * 120 + 200}ms`,
                }}
              >
                <p className="text-[11px] text-white/35 font-semibold uppercase tracking-wide">{item.label}</p>
                <p className="font-display font-black text-2xl md:text-3xl" style={GOLD_GRAD}>
                  <CountUp
                    target={Math.max(0, item.value)}
                    prefix={item.prefix}
                    suffix={item.suffix}
                    duration={1400}
                    delay={i * 120 + 200}
                    triggered={totalVisible}
                    decimals={item.decimals ?? 0}
                  />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="relative py-20 px-4 bg-[#0F0D0B] text-center overflow-hidden">
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10"
          style={{ background: '#C4973F' }} />
        <div className="relative z-10 mx-auto max-w-xl flex flex-col items-center gap-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#C4973F] mb-3">Ready to recover this revenue?</p>
            <h3 className="font-display font-black text-3xl md:text-5xl text-[#FFFDF8] leading-[.95] tracking-[-0.03em]">
              Get your full report
            </h3>
          </div>
          {!emailSent ? (
            <div className="w-full flex flex-col items-center gap-4">
              <div className="w-full flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-xl px-2 py-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-white placeholder-white/30 px-4 outline-none"
                />
                <button
                  type="button"
                  onClick={() => { if (email) setEmailSent(true); }}
                  className="rounded-full bg-[#C4973F] text-[#1A1814] text-sm font-bold px-5 py-2.5 hover:bg-[#E8B44B] transition-colors shrink-0"
                >
                  Get my full report →
                </button>
              </div>
              <a
                href={`/?tier=${encodeURIComponent(r.recommendedTier.toLowerCase().replace(' ', '-'))}#pricing`}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold border border-[#C4973F]/40 text-[#E8B44B] hover:bg-white/[0.06] transition-colors"
              >
                Start today — no call needed →
              </a>
              <p className="text-xs text-white/30">
                Prefer to speak to someone?{' '}
                <a href="mailto:hello@lumio.london" className="text-[#C4973F] hover:text-[#E8B44B] transition-colors underline underline-offset-2">
                  Book a 30-minute call →
                </a>
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 py-6">
              <div className="h-12 w-12 rounded-full bg-[#C4973F]/20 flex items-center justify-center text-[#C4973F] text-xl">✓</div>
              <p className="text-white font-semibold">Report on its way to {email}</p>
              <p className="text-sm text-white/40">We&apos;ll be in touch within a few hours.</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-[#0F0D0B] border-t border-white/[0.05] px-6 py-8 flex flex-wrap items-center justify-between gap-4">
        <Logo light />
        <p className="text-xs text-white/25">© Lumio · lumio.london · hello@lumio.london</p>
      </div>
    </div>
  );
}

/* ─── Main page ─── */
export default function AuditPage() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [clinicName, setClinicName] = useState('Your Clinic');
  // Use ref for answers — synchronous, no batching issues
  const answersRef = useRef<Answers>({});
  const [fadeOut, setFadeOut] = useState(false);

  const go = (nextFn: () => void) => {
    setFadeOut(true);
    setTimeout(() => { nextFn(); setFadeOut(false); }, 320);
  };

  return (
    <main style={{ opacity: fadeOut ? 0 : 1, transition: 'opacity 0.32s ease' }}>
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
            answersRef.current = a; // synchronous ref update — guaranteed before results render
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
