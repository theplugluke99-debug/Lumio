'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import LumiLens from '@/components/LumiLens';
import Logo from '@/components/ui/Logo';

type LumioProductFilmProps = {
  humanAssets?: boolean;
};

const SCENE_MS = 5750;
const ease = [0.22, 1, 0.36, 1] as const;

const scenes = [
  SceneEnquiry,
  SceneReply,
  SceneBooking,
  SceneIntegrations,
  SceneNoShows,
  SceneVoice,
  SceneDashboard,
  SceneResults,
];

const sceneCopy = [
  {
    eyebrow: 'After hours',
    title: 'New enquiry. While you sleep.',
    support: 'Every enquiry answered instantly. Even after hours.',
  },
  {
    eyebrow: 'Lumi replies',
    title: 'Lumi replies. Like you would.',
    support: "Natural, on-brand replies trained on your clinic's tone.",
  },
  {
    eyebrow: 'Booked',
    title: 'Booking confirmed. Slot secured.',
    support: 'No back-and-forth. No missed opportunity.',
  },
  {
    eyebrow: 'Connected clinic',
    title: 'Everything connected. Everything works.',
    support: 'Lumio plugs into the tools your clinic already uses - no rip and replace.',
  },
  {
    eyebrow: 'Protected revenue',
    title: 'No-shows prevented. Revenue protected.',
    support: 'Clients confirm, reschedule, or give enough notice to refill the slot.',
  },
  {
    eyebrow: 'Voice profile',
    title: 'Your voice. Perfected.',
    support: 'Lumi is trained on how your clinic actually speaks.',
  },
  {
    eyebrow: 'Live dashboard',
    title: 'A calm command centre.',
    support: 'Everything Lumi handles - visible in one calm dashboard.',
  },
  {
    eyebrow: 'Results',
    title: 'Results that speak for themselves.',
    support: 'Your clinic. Running itself.',
  },
];

const sceneVariants = {
  initial: { opacity: 0, y: 18, scale: 0.985, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.82, ease } },
  exit: { opacity: 0, y: -14, scale: 1.01, filter: 'blur(8px)', transition: { duration: 0.78, ease } },
};

const softIn = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.72, ease } },
};

function FilmText({ index }: { index: number }) {
  const copy = sceneCopy[index];

  return (
    <motion.div
      className="relative z-20 max-w-[310px] px-5 pt-5 sm:px-7 sm:pt-7"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease, delay: 0.08 }}
    >
      <div className="mb-3 flex items-center gap-2">
        <Logo light width={62} />
        <span className="h-1 w-1 rounded-full bg-[#C4973F]/70" />
        <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#E8B44B]/75">
          {copy.eyebrow}
        </span>
      </div>
      <h2 className="font-display text-[2rem] font-black leading-[0.96] tracking-[-0.035em] text-[#FFFDF8] sm:text-[2.45rem] md:text-[2.2rem] lg:text-[2.55rem]">
        {copy.title}
      </h2>
      <p className="mt-3 max-w-[280px] text-[12px] font-medium leading-relaxed text-[rgba(250,247,242,0.55)] sm:text-sm">
        {copy.support}
      </p>
    </motion.div>
  );
}

function Shell({ children, index }: { children: React.ReactNode; index: number }) {
  return (
    <motion.div
      key={index}
      className="absolute inset-0"
      variants={sceneVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <FilmText index={index} />
      <div className="absolute inset-x-4 bottom-4 top-[215px] z-10 sm:inset-x-7 sm:bottom-7 sm:top-[235px] md:top-[250px]">
        {children}
      </div>
    </motion.div>
  );
}

function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-[#C4973F]/18 bg-[#16130f]/78 shadow-[0_20px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl ${className}`}>
      {children}
    </div>
  );
}

function Tick({ delay = 0 }: { delay?: number }) {
  return (
    <motion.span
      className="flex h-5 w-5 items-center justify-center rounded-full bg-[#C4973F] text-[10px] font-black text-[#111009]"
      initial={{ opacity: 0, scale: 0.35 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.38, ease }}
    >
      ✓
    </motion.span>
  );
}

function SceneEnquiry() {
  return (
    <Shell index={0}>
      <div className="relative h-full">
        <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_36%_38%,rgba(255,221,167,0.16),transparent_30%),linear-gradient(135deg,rgba(255,253,248,0.06),transparent_46%)]" />
        <div className="absolute left-[12%] top-[18%] h-32 w-20 rounded-full bg-[#FFFDF8]/[0.055] blur-2xl" />
        <motion.div
          className="absolute left-1/2 top-[46%] w-[86%] max-w-[330px] -translate-x-1/2"
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.42, duration: 0.85, ease }}
        >
          <GlassCard className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8B44B]">Instagram · 11:42pm</span>
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E8B44B] opacity-40" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-[#E8B44B]" />
              </span>
            </div>
            <p className="text-base font-semibold leading-snug text-[#FFFDF8]">
              Hi lovely, do you have lip filler availability this week?
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </Shell>
  );
}

function SceneReply() {
  return (
    <Shell index={1}>
      <div className="flex h-full flex-col justify-end gap-3 pb-2">
        <motion.div className="max-w-[78%] rounded-2xl rounded-bl-md border border-white/8 bg-white/[0.07] p-3 text-sm text-[#FFFDF8]" {...softIn}>
          Hi lovely, do you have lip filler availability this week?
        </motion.div>
        <motion.div
          className="ml-auto flex w-20 items-center gap-1.5 rounded-2xl rounded-br-md border border-[#C4973F]/18 bg-[#211a10] p-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: [0, 1, 1, 0], y: 0 }}
          transition={{ delay: 0.45, duration: 1.25, ease }}
        >
          {[0, 1, 2].map((dot) => (
            <span key={dot} className="typing-dot h-1.5 w-1.5 rounded-full bg-[#E8B44B]" style={{ animationDelay: `${dot * 0.16}s` }} />
          ))}
        </motion.div>
        <motion.div
          className="ml-auto max-w-[86%] rounded-2xl rounded-br-md border border-[#C4973F]/25 bg-gradient-to-br from-[#302514] to-[#18120c] p-3.5 text-sm font-medium leading-relaxed text-[#FFFDF8] shadow-[0_0_44px_rgba(196,151,63,0.16)]"
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.35, duration: 0.72, ease }}
        >
          Hey lovely - yes, I have Thursday 2pm or Friday 11am free. Would you like me to book you in?
        </motion.div>
      </div>
    </Shell>
  );
}

function SceneBooking() {
  const items = ['Confirmation sent', 'Prep notes sent', 'Calendar updated'];

  return (
    <Shell index={2}>
      <div className="flex h-full items-center justify-center">
        <motion.div
          className="w-full max-w-[360px]"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease }}
        >
          <GlassCard className="p-5">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E8B44B]">Friday 11am</div>
                <div className="mt-1 text-2xl font-black tracking-[-0.04em] text-[#FFFDF8]">Lip Filler</div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#C4973F]/25 bg-[#C4973F]/12 text-[#E8B44B]">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M7 3v3M17 3v3M4 9h16M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
                </svg>
              </div>
            </div>
            <div className="space-y-3">
              {items.map((item, itemIndex) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-3 rounded-xl bg-white/[0.045] px-3 py-2.5 text-sm font-semibold text-[#FFFDF8]/85"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.78 + itemIndex * 0.28, duration: 0.48, ease }}
                >
                  <Tick delay={0.95 + itemIndex * 0.28} />
                  {item}
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </Shell>
  );
}

function SceneIntegrations() {
  const nodes = ['Instagram', 'WhatsApp', 'Google', 'Fresha', 'Phorest', 'Stripe', 'Calendly', 'Gmail', 'Trustpilot'];

  return (
    <Shell index={3}>
      <div className="relative h-full">
        <div className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <div className="rounded-full border border-[#C4973F]/25 bg-[#111009]/90 p-3 shadow-[0_0_58px_rgba(196,151,63,0.2)]">
            <LumiLens size={58} animated />
          </div>
          <span className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8B44B]">Lumio</span>
        </div>
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 420 300" preserveAspectRatio="none" aria-hidden="true">
          {nodes.map((_, i) => {
            const angle = (Math.PI * 2 * i) / nodes.length - Math.PI / 2;
            const x = 210 + Math.cos(angle) * 160;
            const y = 150 + Math.sin(angle) * 100;
            return (
              <motion.line
                key={i}
                x1="210"
                y1="150"
                x2={x}
                y2={y}
                stroke="#C4973F"
                strokeWidth="1"
                strokeOpacity="0.28"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0.08, 0.34, 0.16] }}
                transition={{ delay: 0.28 + i * 0.06, duration: 1.7, repeat: Infinity, repeatType: 'mirror' }}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0">
          {nodes.map((node, i) => {
            const angle = (Math.PI * 2 * i) / nodes.length - Math.PI / 2;
            const left = 50 + Math.cos(angle) * 38;
            const top = 50 + Math.sin(angle) * 34;
            return (
              <motion.div
                key={node}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-[#18140f]/88 px-3 py-2 text-[10px] font-bold text-[#FFFDF8]/75 shadow-[0_14px_34px_rgba(0,0,0,0.34)] backdrop-blur"
                style={{ left: `${left}%`, top: `${top}%` }}
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 + i * 0.08, duration: 0.5, ease }}
              >
                {node}
              </motion.div>
            );
          })}
        </div>
      </div>
    </Shell>
  );
}

function SceneNoShows() {
  const items = ['48h reminder sent', '24h reminder confirmed', 'Morning reminder scheduled'];

  return (
    <Shell index={4}>
      <div className="grid h-full gap-4 sm:grid-cols-[1fr_0.72fr] sm:items-center">
        <GlassCard className="p-4">
          <div className="space-y-4">
            {items.map((item, i) => (
              <motion.div key={item} className="flex items-center gap-3" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.38 + i * 0.42, duration: 0.5, ease }}>
                <div className="flex flex-col items-center">
                  <motion.span className="h-4 w-4 rounded-full bg-[#C4973F]" initial={{ scale: 0.4 }} animate={{ scale: 1 }} transition={{ delay: 0.5 + i * 0.42, duration: 0.35, ease }} />
                  {i < items.length - 1 && <span className="mt-1 h-7 w-px bg-[#C4973F]/25" />}
                </div>
                <span className="text-sm font-semibold text-[#FFFDF8]/82">{item}</span>
              </motion.div>
            ))}
          </div>
        </GlassCard>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.25, duration: 0.72, ease }}>
          <GlassCard className="p-5 text-center">
            <div className="font-display text-5xl font-black tracking-[-0.06em] text-[#E8B44B]">67%</div>
            <div className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-[#FFFDF8]/60">fewer no-shows</div>
          </GlassCard>
        </motion.div>
      </div>
    </Shell>
  );
}

function SceneVoice() {
  const avoid = ['cheap', 'discount', 'pushy'];
  const rows = [
    ['Greeting style', 'Warm', 86],
    ['Tone', 'Friendly, reassuring', 78],
    ['Clinic style', 'Luxury, trust, results', 92],
  ] as const;

  return (
    <Shell index={5}>
      <div className="flex h-full items-center justify-center">
        <GlassCard className="w-full max-w-[370px] p-4">
          <div className="mb-4 flex items-center gap-3">
            <LumiLens size={38} animated />
            <div>
              <div className="text-sm font-black text-[#FFFDF8]">Clinic voice profile</div>
              <div className="text-xs text-[#FFFDF8]/42">Trained from real conversations</div>
            </div>
          </div>
          <div className="space-y-4">
            {rows.map(([label, value, width], i) => (
              <div key={label}>
                <div className="mb-1.5 flex justify-between gap-3 text-xs">
                  <span className="font-semibold text-[#FFFDF8]/48">{label}</span>
                  <span className="font-bold text-[#FFFDF8]/85">{value}</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/8">
                  <motion.div className="h-full rounded-full bg-gradient-to-r from-[#C4973F] to-[#E8B44B]" initial={{ width: 0 }} animate={{ width: `${width}%` }} transition={{ delay: 0.45 + i * 0.2, duration: 0.9, ease }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8B44B]/80">Words to avoid</div>
            <div className="flex flex-wrap gap-2">
              {avoid.map((word, i) => (
                <motion.span key={word} className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-1.5 text-xs font-bold text-[#FFFDF8]/72" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 + i * 0.12, duration: 0.4, ease }}>
                  {word}
                </motion.span>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>
    </Shell>
  );
}

function SceneDashboard() {
  const metrics = [
    ['31', 'leads captured'],
    ['19', 'bookings'],
    ['2', 'no-shows'],
    ['£4,800', 'pipeline'],
  ];
  const bars = [96, 88, 74];

  return (
    <Shell index={6}>
      <motion.div
        className="h-full origin-bottom rounded-2xl border border-[#C4973F]/18 bg-[#0F0E0B] p-3 shadow-[0_22px_90px_rgba(0,0,0,0.52)]"
        initial={{ opacity: 0, scale: 0.94, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.22, duration: 0.9, ease }}
      >
        <div className="flex h-full overflow-hidden rounded-xl border border-white/8 bg-[#111009]">
          <aside className="hidden w-[86px] shrink-0 border-r border-white/8 bg-black/18 p-3 sm:block">
            <Logo light width={52} />
            <div className="mt-5 space-y-2">
              {['Overview', 'Activity', 'Clients', 'Voice'].map((item, i) => (
                <div key={item} className={`rounded-lg px-2 py-1.5 text-[9px] font-bold ${i === 0 ? 'bg-[#C4973F]/16 text-[#E8B44B]' : 'text-white/28'}`}>{item}</div>
              ))}
            </div>
          </aside>
          <main className="min-w-0 flex-1 p-3">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-black text-[#FFFDF8]">Clinic command centre</div>
              <div className="rounded-full bg-[#C4973F]/14 px-2.5 py-1 text-[9px] font-bold text-[#E8B44B]">Live</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {metrics.map(([value, label], i) => (
                <motion.div key={label} className="rounded-xl bg-[#FFFDF8] p-3 text-[#111009]" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.12, duration: 0.42, ease }}>
                  <div className="text-xl font-black leading-none tracking-[-0.04em]">{value}</div>
                  <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.08em] text-[#6b6259]">{label}</div>
                </motion.div>
              ))}
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-xl border border-white/8 bg-white/[0.045] p-3">
                <div className="mb-2 text-[10px] font-black text-[#FFFDF8]">Recent activity</div>
                {['DM answered - Instagram', 'Booking confirmed - Friday', 'Review requested - Botox'].map((activity, i) => (
                  <motion.div key={activity} className="flex items-center gap-2 border-t border-white/6 py-1.5 text-[9px] font-semibold text-white/56 first:border-t-0" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 + i * 0.15, duration: 0.38, ease }}>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C4973F]" />
                    {activity}
                  </motion.div>
                ))}
              </div>
              <div className="rounded-xl border border-white/8 bg-white/[0.045] p-3">
                <div className="mb-2 text-[10px] font-black text-[#FFFDF8]">Revenue recovered</div>
                <svg viewBox="0 0 130 62" className="mb-2 h-14 w-full overflow-visible">
                  <motion.path d="M4 52 C24 50 30 38 44 39 C60 40 62 20 78 23 C94 25 98 10 126 8" fill="none" stroke="#E8B44B" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.65, duration: 1.4, ease }} />
                </svg>
                {bars.map((bar, i) => (
                  <div key={bar} className="mb-1.5 h-1.5 rounded-full bg-white/8">
                    <motion.div className="h-full rounded-full bg-[#C4973F]" initial={{ width: 0 }} animate={{ width: `${bar}%` }} transition={{ delay: 1 + i * 0.14, duration: 0.65, ease }} />
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </motion.div>
    </Shell>
  );
}

function SceneResults() {
  const rows = [
    ['Leads captured', '+127'],
    ['No-shows prevented', '+23'],
    ['Rebookings recovered', '+18'],
    ['Reviews generated', '+12'],
  ];

  return (
    <Shell index={7}>
      <div className="flex h-full items-center justify-center">
        <GlassCard className="w-full max-w-[380px] p-5">
          <motion.div className="text-center" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.7, ease }}>
            <div className="font-display text-6xl font-black leading-none tracking-[-0.07em] text-[#E8B44B]">£3,200</div>
            <div className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-[#FFFDF8]/55">Recovered this month</div>
          </motion.div>
          <div className="mt-5 space-y-2">
            {rows.map(([label, value], i) => (
              <motion.div key={label} className="flex items-center justify-between rounded-xl bg-white/[0.05] px-3 py-2.5 text-sm font-semibold text-[#FFFDF8]/76" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 + i * 0.13, duration: 0.4, ease }}>
                <span>{label}</span>
                <span className="font-black text-[#E8B44B]">{value}</span>
              </motion.div>
            ))}
          </div>
          <motion.div className="mt-5 text-center font-display text-2xl font-black italic tracking-[-0.04em] text-[#FFFDF8]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.55, duration: 0.85, ease }}>
            Your clinic. Running itself.
          </motion.div>
        </GlassCard>
      </div>
    </Shell>
  );
}

export default function LumioProductFilm({ humanAssets = false }: LumioProductFilmProps) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const Scene = scenes[sceneIndex];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSceneIndex((current) => (current + 1) % scenes.length);
    }, reducedMotion ? 7000 : SCENE_MS);

    return () => window.clearTimeout(timer);
  }, [sceneIndex, reducedMotion]);

  return (
    <div
      className="lumio-film relative h-full w-full overflow-hidden bg-[#0F0E0B] text-[#FFFDF8]"
      data-human-assets={humanAssets ? 'available' : 'abstract'}
      aria-label="Lumio product film"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(196,151,63,0.22),transparent_36%),radial-gradient(circle_at_18%_75%,rgba(232,180,75,0.11),transparent_32%),linear-gradient(145deg,#111009,#0F0E0B_48%,#17130d)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.055] [background-image:radial-gradient(rgba(255,253,248,0.55)_0.6px,transparent_0.7px)] [background-size:9px_9px]" />
      <div className="film-wave pointer-events-none absolute inset-x-[-20%] bottom-[-10%] h-[58%] opacity-50" />
      <AnimatePresence mode="wait" initial={false}>
        <Scene key={sceneIndex} />
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-24 bg-gradient-to-t from-[#0F0E0B]/88 to-transparent" />
      <div className="absolute bottom-4 left-5 z-40 flex gap-1.5">
        {scenes.map((_, i) => (
          <span key={i} className={`h-1 rounded-full transition-all duration-700 ${i === sceneIndex ? 'w-7 bg-[#E8B44B]' : 'w-1.5 bg-white/20'}`} />
        ))}
      </div>
      <style jsx>{`
        .film-wave {
          background:
            repeating-radial-gradient(ellipse at 50% 100%, transparent 0 22px, rgba(196, 151, 63, 0.18) 23px, transparent 25px),
            radial-gradient(ellipse at 50% 100%, rgba(232, 180, 75, 0.18), transparent 62%);
          animation: lumioFilmWave 15s ease-in-out infinite alternate;
          transform: translate3d(0, 0, 0);
        }

        @keyframes lumioFilmWave {
          from {
            transform: translateY(10px) scale(1);
          }
          to {
            transform: translateY(-28px) scale(1.04);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .film-wave {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
