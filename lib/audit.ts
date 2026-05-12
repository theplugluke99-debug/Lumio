import { PLANS, PlanName } from './data';

// ─── Lookup maps (derived from PLANS so prices stay in one place) ─────────────

export const LUMIO_MONTHLY = Object.fromEntries(PLANS.map(p => [p.name, p.monthly])) as Record<PlanName, number>;
export const LUMIO_SETUP = Object.fromEntries(PLANS.map(p => [p.name, p.setup])) as Record<PlanName, number>;

export const ENQUIRIES_MAP: Record<string, number> = {
  '1–5': 3, '6–10': 8, '11–20': 15, '20+': 25,
};

export const RESPONSE_MULT: Record<string, number> = {
  'Within minutes': 0.05, 'Within the hour': 0.25, 'Same day': 0.55, 'Next day or longer': 0.78,
};

export const TREATMENT_VAL: Record<string, number> = {
  'Under £100': 75, '£100–£200': 150, '£200–£500': 350, '£500+': 650,
};

export const NOSHOW_RATE: Record<string, number> = {
  'Less than 5%': 0.03, '5–10%': 0.075, '10–20%': 0.15, 'Over 20%': 0.25,
};

// ─── Types ────────────────────────────────────────────────────────────────────

export type Answers = Record<number, string>;

export interface Results {
  score: number; scoreLabel: string; scoreColor: string;
  slowResponseLoss: number; noShowLoss: number; rebookingLoss: number;
  totalMonthly: number; annualLoss: number;
  weeklyEnquiries: number; responseMultiplier: number;
  avgTreatmentValue: number; noShowRate: number;
  recommendedTier: PlanName;
  tierReasons: string[];
  month1Net: number; month3Cumulative: number; month6Cumulative: number; roiMultiple: number;
}

// ─── Shared gold gradient style ────────────────────────────────────────────────

export const GOLD_GRAD: React.CSSProperties = {
  background: 'linear-gradient(110deg,#C4973F 0%,#E8B44B 45%,#F4D38A 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

// ─── Calculation engine ───────────────────────────────────────────────────────

export function calculate(answers: Answers): Results {
  const weeklyEnquiries = ENQUIRIES_MAP[answers[0]] ?? 8;
  const responseMultiplier = RESPONSE_MULT[answers[1]] ?? 0.55;
  const avgTreatmentValue = TREATMENT_VAL[answers[2]] ?? 150;
  const noShowRate = NOSHOW_RATE[answers[3]] ?? 0.075;

  const slowResponseLoss = Math.round(weeklyEnquiries * responseMultiplier * avgTreatmentValue * 4.33);
  const noShowLoss = Math.round(20 * noShowRate * avgTreatmentValue * 4.33);
  const hasRebooking = answers[6] === 'Yes';
  const rebookingLoss = hasRebooking ? 0 : Math.round(weeklyEnquiries * 0.3 * avgTreatmentValue * 4.33 * 0.4);
  const totalMonthly = slowResponseLoss + noShowLoss + rebookingLoss;
  const annualLoss = totalMonthly * 12;

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

  const scoreLabel = score <= 30 ? 'Significant opportunity'
    : score <= 60 ? 'Moderate systems in place'
    : score <= 80 ? 'Good foundations'
    : 'Already optimised';
  const scoreColor = score <= 30 ? '#E8998D'
    : score <= 60 ? '#C4973F'
    : score <= 80 ? '#7AAB82'
    : '#E8B44B';

  const needsDMs = answers[4] === 'Instagram DMs';
  const noFollowUp = answers[5] === "No, it's all manual" || answers[5] === "I don't follow up at all";
  const noRebooking = answers[6] === 'No' || answers[6] === "What's that?";
  const adminPain = answers[7] === 'Admin taking too long';

  let recommendedTier: PlanName = 'Foundation';
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
    if (!tierReasons.some(r => r.includes('admin'))) {
      tierReasons.push('Your clinic has significant gaps across leads, retention, and operations — Full Operations closes them all');
    }
  }

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
