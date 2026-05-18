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

const sceneMeta = [
  ['01', 'New enquiry', 'While you sleep', 'Every after-hours DM is captured, understood, and ready for Lumi.'],
  ['02', 'Lumi replies', 'In your voice', "Warm replies that sound like your clinic, not a fake chatbot."],
  ['03', 'Booking secured', 'No back-and-forth', 'Availability, prep notes, and confirmation handled in one flow.'],
  ['04', 'Connected tools', 'No rip and replace', 'Lumio connects the systems your clinic already depends on.'],
  ['05', 'No-shows reduced', 'Revenue protected', 'Reminders, confirmations, and reschedules happen before the slot is lost.'],
  ['06', 'Voice profile', 'Always on-brand', 'Lumi learns your tone, boundaries, and clinic language.'],
  ['07', 'Live dashboard', 'Everything visible', 'A calm command centre for leads, bookings, automations, and revenue.'],
  ['08', 'Results', 'Recovered revenue', 'The work Lumi handles turns into measurable clinic growth.'],
] as const;

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

const sceneVariants = {
  initial: { opacity: 0, y: 14, scale: 0.992, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.82, ease } },
  exit: { opacity: 0, y: -12, scale: 1.008, filter: 'blur(8px)', transition: { duration: 0.78, ease } },
};

function SceneShell({
  index,
  children,
  full = false,
}: {
  index: number;
  children: React.ReactNode;
  full?: boolean;
}) {
  const [number, label, title, support] = sceneMeta[index];

  return (
    <motion.div
      key={index}
      className="absolute inset-0"
      variants={sceneVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Atmosphere index={index} />
      <div className="relative z-10 flex h-full flex-col gap-3 p-4 sm:p-5">
        {full ? (
          <>
            <SceneHeader number={number} label={label} title={title} support={support} compact />
            <div className="min-h-0 flex-1">{children}</div>
          </>
        ) : (
          <div className="grid min-h-0 flex-1 gap-4 sm:grid-cols-[0.62fr_1.38fr] sm:items-center">
            <SceneHeader number={number} label={label} title={title} support={support} />
            <div className="min-h-0">{children}</div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function SceneHeader({
  number,
  label,
  title,
  support,
  compact = false,
}: {
  number: string;
  label: string;
  title: string;
  support: string;
  compact?: boolean;
}) {
  return (
    <motion.div
      className={compact ? 'flex items-start justify-between gap-4' : 'relative z-20'}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.62, ease, delay: 0.06 }}
    >
      <div className={compact ? 'min-w-0' : ''}>
        <div className="mb-3 flex items-center gap-2">
          <span className="text-[18px] font-semibold leading-none text-[#E8B44B] tabular-nums">{number}</span>
          <span className="h-px w-7 bg-gradient-to-r from-[#E8B44B]/80 to-transparent" />
          <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#E8B44B]/72">{label}</span>
        </div>
        <h2 className="max-w-[230px] text-[23px] font-black leading-[1.04] tracking-[-0.035em] text-[#FFFDF8] sm:text-[28px]">
          {title}
        </h2>
        {!compact && (
          <p className="mt-3 max-w-[230px] text-[12px] font-medium leading-relaxed text-[#faf7f2]/55 sm:text-[13px]">
            {support}
          </p>
        )}
      </div>
      {compact && <p className="hidden max-w-[260px] text-right text-[12px] font-medium leading-relaxed text-[#faf7f2]/52 sm:block">{support}</p>}
    </motion.div>
  );
}

function Atmosphere({ index }: { index: number }) {
  const glow = ['75% 32%', '62% 52%', '70% 38%', '76% 52%', '64% 70%', '70% 42%', '62% 48%', '68% 65%'][index];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${glow}, rgba(196,151,63,0.22), transparent 34%), radial-gradient(circle at 18% 14%, rgba(255,253,248,0.055), transparent 28%), linear-gradient(145deg, #111009, #0F0E0B 52%, #15110c)`,
        }}
      />
      <div className="absolute inset-[10px] rounded-[1.35rem] border border-[#C4973F]/10 sm:inset-[14px] sm:rounded-[1.85rem]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,253,248,0.028)_1px,transparent_1px),linear-gradient(0deg,rgba(255,253,248,0.02)_1px,transparent_1px)] bg-[size:48px_48px] opacity-45" />
      <div className="absolute inset-0 opacity-[0.055] [background-image:radial-gradient(rgba(255,253,248,0.5)_0.6px,transparent_0.7px)] [background-size:9px_9px]" />
      <GoldWaves className="absolute inset-x-[-28%] bottom-[4%] h-[36%] opacity-80" delay={index * 0.16} />
      <GoldWaves className="absolute inset-x-[-38%] bottom-[-14%] h-[34%] opacity-45" delay={index * 0.22 + 0.5} />
    </div>
  );
}

function GoldWaves({ className = '', delay = 0 }: { className?: string; delay?: number }) {
  const paths = [
    'M0 95 C80 26 132 142 210 70 C292 -5 354 104 446 46 C518 2 574 78 660 36',
    'M0 118 C86 72 138 130 218 88 C302 42 370 120 454 78 C534 36 600 84 660 62',
    'M0 72 C96 18 168 108 240 54 C318 0 372 84 452 42 C530 0 600 52 660 28',
    'M0 142 C116 106 168 150 258 114 C340 80 408 136 480 102 C552 66 610 98 660 86',
  ];

  return (
    <svg className={className} viewBox="0 0 660 170" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={`film-wave-${delay}`} x1="0" x2="1">
          <stop offset="0%" stopColor="#C4973F" stopOpacity="0" />
          <stop offset="40%" stopColor="#E8B44B" stopOpacity="0.32" />
          <stop offset="54%" stopColor="#F4D38A" stopOpacity="0.86" />
          <stop offset="100%" stopColor="#C4973F" stopOpacity="0" />
        </linearGradient>
      </defs>
      {paths.map((path, i) => (
        <motion.path
          key={path}
          d={path}
          fill="none"
          stroke={`url(#film-wave-${delay})`}
          strokeLinecap="round"
          strokeWidth={i === 0 ? 1.6 : 0.75}
          initial={{ pathLength: 0.16, pathOffset: 0.2, opacity: 0 }}
          animate={{ pathLength: 1, pathOffset: [0.1, 0], opacity: i === 0 ? 0.95 : 0.42 }}
          transition={{ delay: 0.12 + delay + i * 0.05, duration: 2.8, ease }}
        />
      ))}
    </svg>
  );
}

function GlassPanel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-[#C4973F]/18 bg-[linear-gradient(145deg,rgba(29,25,19,0.86),rgba(10,9,7,0.76))] shadow-[0_24px_90px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,253,248,0.075)] backdrop-blur-xl ${className}`}>
      {children}
    </div>
  );
}

function MiniAvatar({ label = 'S' }: { label?: string }) {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[radial-gradient(circle_at_35%_28%,rgba(255,221,172,0.4),rgba(196,151,63,0.2)_42%,rgba(255,255,255,0.07))] text-[11px] font-black text-[#FFFDF8]">
      {label}
    </span>
  );
}

function ChannelPill({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-white/8 bg-white/[0.045] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#FFFDF8]/48">{children}</span>;
}

function Tick({ delay = 0 }: { delay?: number }) {
  return (
    <motion.span
      className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E8B44B] text-[10px] font-black text-[#111009]"
      initial={{ opacity: 0, scale: 0.35 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.34, ease }}
    >
      ✓
    </motion.span>
  );
}

function SceneEnquiry() {
  return (
    <SceneShell index={0}>
      <div className="relative mx-auto w-full max-w-[390px]">
        <div className="absolute -inset-7 rounded-full bg-[#E8B44B]/12 blur-3xl" />
        <motion.div
          className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#0b0a08]/82 p-3 shadow-[0_22px_80px_rgba(0,0,0,0.55)]"
          initial={{ opacity: 0, y: 18, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.28, duration: 0.76, ease }}
        >
          <div className="absolute right-[-10%] top-[-10%] h-36 w-36 rounded-full bg-[#D8B17A]/10 blur-2xl" />
          <div className="mb-3 flex items-center justify-between border-b border-white/7 pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#833AB4,#E1306C,#FCAF45)] text-[15px] font-black text-white">◎</div>
              <div>
                <div className="text-[12px] font-black text-[#FFFDF8]">Instagram DM</div>
                <div className="text-[10px] font-medium text-[#FFFDF8]/38">Glow Aesthetics · 11:42pm</div>
              </div>
            </div>
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E8B44B] opacity-40" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-[#E8B44B]" />
            </span>
          </div>
          <div className="space-y-3">
            <div className="max-w-[86%] rounded-2xl rounded-tl-md border border-white/8 bg-white/[0.065] p-3">
              <p className="text-[14px] font-semibold leading-snug text-[#FFFDF8]">Hi lovely, do you have lip filler availability this week?</p>
              <div className="mt-2 text-[10px] font-medium text-[#FFFDF8]/35">11:42pm</div>
            </div>
            <motion.div
              className="flex items-center gap-2 rounded-xl border border-[#C4973F]/20 bg-[#C4973F]/10 px-3 py-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.45, ease }}
            >
              <LumiLens size={20} />
              <div>
                <div className="text-[11px] font-black text-[#E8B44B]">Lead captured</div>
                <div className="text-[10px] text-[#FFFDF8]/42">Treatment intent: Lip filler · Priority: High</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </SceneShell>
  );
}

function SceneReply() {
  return (
    <SceneShell index={1}>
      <GlassPanel className="mx-auto w-full max-w-[420px] p-3">
        <div className="mb-3 flex items-center justify-between border-b border-white/7 pb-3">
          <div className="flex items-center gap-2">
            <MiniAvatar label="S" />
            <div>
              <div className="text-[12px] font-black text-[#FFFDF8]">Sophie M.</div>
              <div className="text-[10px] text-[#FFFDF8]/38">Instagram · New enquiry</div>
            </div>
          </div>
          <ChannelPill>Auto reply on</ChannelPill>
        </div>
        <div className="space-y-2.5">
          <motion.div className="max-w-[78%] rounded-2xl rounded-bl-md bg-white/[0.075] p-3 text-[13px] font-medium leading-snug text-[#FFFDF8]/88" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.28, duration: 0.48, ease }}>
            Do you have lip filler availability this week?
          </motion.div>
          <motion.div
            className="ml-auto flex w-16 items-center justify-center gap-1 rounded-2xl rounded-br-md border border-[#C4973F]/18 bg-[#211a10] py-2.5"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: [0, 1, 1, 0], y: 0 }}
            transition={{ delay: 0.72, duration: 1.15, ease }}
          >
            {[0, 1, 2].map((dot) => (
              <span key={dot} className="typing-dot h-1.5 w-1.5 rounded-full bg-[#E8B44B]" style={{ animationDelay: `${dot * 0.14}s` }} />
            ))}
          </motion.div>
          <motion.div
            className="ml-auto max-w-[86%] rounded-2xl rounded-br-md border border-[#C4973F]/24 bg-[linear-gradient(145deg,rgba(61,45,22,0.9),rgba(25,18,10,0.9))] p-3 text-[13px] font-semibold leading-relaxed text-[#FFFDF8] shadow-[0_0_40px_rgba(196,151,63,0.13)]"
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.28, duration: 0.58, ease }}
          >
            <span className="mb-2 flex items-center gap-2 text-[10px] font-black text-[#E8B44B]/82">
              <LumiLens size={16} />
              Lumi · trained tone
            </span>
            Hey lovely - yes, I have Thursday 2pm or Friday 11am free. Would you like me to book you in?
          </motion.div>
          <motion.div className="ml-auto flex max-w-[86%] gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.4, ease }}>
            {['Thursday 2pm', 'Friday 11am'].map((slot) => (
              <span key={slot} className="rounded-full border border-[#C4973F]/20 bg-[#C4973F]/10 px-3 py-1.5 text-[10px] font-black text-[#E8B44B]">{slot}</span>
            ))}
          </motion.div>
        </div>
      </GlassPanel>
    </SceneShell>
  );
}

function SceneBooking() {
  const checklist = ['Confirmation sent', 'Prep notes sent', 'Calendar updated'];

  return (
    <SceneShell index={2}>
      <GlassPanel className="mx-auto w-full max-w-[430px] overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
          <div>
            <div className="text-[12px] font-black text-[#FFFDF8]">Booking confirmed</div>
            <div className="text-[10px] text-[#FFFDF8]/38">Generated from Instagram enquiry</div>
          </div>
          <span className="rounded-full bg-[#C4973F]/14 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-[#E8B44B]">secured</span>
        </div>
        <div className="grid gap-3 p-4 sm:grid-cols-[0.82fr_1fr]">
          <motion.div
            className="rounded-2xl border border-[#C4973F]/18 bg-[#C4973F]/10 p-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.5, ease }}
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="text-[10px] font-black uppercase tracking-[0.14em] text-[#E8B44B]">Friday</div>
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#E8B44B]" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M7 3v3M17 3v3M4 9h16M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
              </svg>
            </div>
            <div className="text-[30px] font-black leading-none tracking-[-0.05em] text-[#FFFDF8]">11:00</div>
            <div className="mt-2 text-[12px] font-bold text-[#FFFDF8]/62">Lip Filler · 45 mins</div>
            <div className="mt-3 rounded-xl bg-black/18 p-2 text-[10px] font-medium text-[#FFFDF8]/45">Client: Sophie M. · £180 deposit link ready</div>
          </motion.div>
          <div className="space-y-2">
            {checklist.map((item, i) => (
              <motion.div
                key={item}
                className="flex items-center gap-3 rounded-xl border border-white/7 bg-white/[0.045] px-3 py-2.5 text-[12px] font-bold text-[#FFFDF8]/82"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.68 + i * 0.2, duration: 0.4, ease }}
              >
                <Tick delay={0.78 + i * 0.2} />
                {item}
              </motion.div>
            ))}
            <motion.div className="rounded-xl border border-[#C4973F]/16 bg-[#C4973F]/8 px-3 py-2.5 text-[11px] font-semibold text-[#E8B44B]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.35, duration: 0.42, ease }}>
              No missed opportunity. No manual chasing.
            </motion.div>
          </div>
        </div>
      </GlassPanel>
    </SceneShell>
  );
}

function SceneIntegrations() {
  const nodes = ['Instagram', 'WhatsApp', 'Google', 'Fresha', 'Phorest', 'Stripe', 'Calendly', 'Gmail', 'Trustpilot'];

  return (
    <SceneShell index={3}>
      <div className="relative mx-auto h-[295px] w-full max-w-[430px] sm:h-[330px]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 430 330" preserveAspectRatio="none" aria-hidden="true">
          {nodes.map((_, i) => {
            const angle = (Math.PI * 2 * i) / nodes.length - Math.PI / 2;
            const x = 215 + Math.cos(angle) * 168;
            const y = 165 + Math.sin(angle) * 112;
            return (
              <motion.line
                key={i}
                x1="215"
                y1="165"
                x2={x}
                y2={y}
                stroke="#C4973F"
                strokeWidth="1"
                strokeOpacity="0.34"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0.12, 0.42, 0.2] }}
                transition={{ delay: 0.22 + i * 0.05, duration: 1.75, repeat: Infinity, repeatType: 'mirror' }}
              />
            );
          })}
        </svg>
        <div className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <div className="rounded-full border border-[#C4973F]/28 bg-[#0F0E0B]/94 p-4 shadow-[0_0_70px_rgba(196,151,63,0.24)]">
            <LumiLens size={62} animated />
          </div>
          <span className="mt-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#E8B44B]">Lumio</span>
        </div>
        {nodes.map((node, i) => {
          const angle = (Math.PI * 2 * i) / nodes.length - Math.PI / 2;
          const left = 50 + Math.cos(angle) * 38;
          const top = 50 + Math.sin(angle) * 35;
          return (
            <motion.div
              key={node}
              className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-2xl border border-white/10 bg-[#18140f]/88 px-3 py-2 text-[10px] font-black text-[#FFFDF8]/78 shadow-[0_14px_38px_rgba(0,0,0,0.34)] backdrop-blur"
              style={{ left: `${left}%`, top: `${top}%` }}
              initial={{ opacity: 0, scale: 0.78 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.24 + i * 0.07, duration: 0.42, ease }}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/[0.06] text-[#E8B44B]">{node[0]}</span>
              <span className="hidden sm:inline">{node}</span>
            </motion.div>
          );
        })}
      </div>
    </SceneShell>
  );
}

function SceneNoShows() {
  const items = [
    ['48h reminder sent', 'Email', 'Delivered 09:30'],
    ['24h reminder confirmed', 'SMS', 'Client replied yes'],
    ['Morning reminder scheduled', 'WhatsApp', 'Queued 08:00'],
  ];

  return (
    <SceneShell index={4}>
      <GlassPanel className="mx-auto grid w-full max-w-[430px] gap-3 p-4 sm:grid-cols-[1fr_0.72fr]">
        <div className="space-y-3">
          {items.map(([title, channel, detail], i) => (
            <motion.div key={title} className="relative flex gap-3" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.28 + i * 0.28, duration: 0.42, ease }}>
              <div className="flex flex-col items-center">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#C4973F]/25 bg-[#C4973F]/12 text-[11px] font-black text-[#E8B44B]">{i + 1}</span>
                {i < items.length - 1 && <span className="mt-1 h-8 w-px bg-[#C4973F]/24" />}
              </div>
              <div className="min-w-0 rounded-xl border border-white/7 bg-white/[0.045] px-3 py-2">
                <div className="text-[12px] font-black text-[#FFFDF8]">{title}</div>
                <div className="mt-1 flex gap-2 text-[10px] text-[#FFFDF8]/38"><span>{channel}</span><span>·</span><span>{detail}</span></div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex flex-col justify-between gap-3">
          <motion.div className="rounded-2xl border border-[#C4973F]/18 bg-[#C4973F]/10 p-4 text-center" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.9, duration: 0.5, ease }}>
            <div className="text-[34px] font-black leading-none tracking-[-0.05em] text-[#E8B44B]">67%</div>
            <div className="mt-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#FFFDF8]/50">fewer no-shows</div>
          </motion.div>
          <motion.div className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.055] p-3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.42, ease }}>
            <MiniAvatar label="S" />
            <div>
              <div className="text-[12px] font-black text-[#FFFDF8]">Client confirmed</div>
              <div className="text-[10px] text-[#FFFDF8]/38">11:02am · slot protected</div>
            </div>
          </motion.div>
        </div>
      </GlassPanel>
    </SceneShell>
  );
}

function SceneVoice() {
  const rows = [
    ['Greeting style', 'Warm', 90],
    ['Tone', 'Friendly, reassuring', 85],
    ['Clinic style', 'Luxury, trust, results', 80],
  ] as const;
  const avoid = ['cheap', 'discount', 'pushy'];
  const phrases = ['Hey lovely', 'Of course', 'You are in safe hands'];

  return (
    <SceneShell index={5}>
      <GlassPanel className="mx-auto w-full max-w-[430px] p-4">
        <div className="mb-4 flex items-center justify-between border-b border-white/7 pb-3">
          <div className="flex items-center gap-3">
            <LumiLens size={36} animated />
            <div>
              <div className="text-[13px] font-black text-[#FFFDF8]">Clinic voice profile</div>
              <div className="text-[10px] text-[#FFFDF8]/38">Training source: 248 past replies</div>
            </div>
          </div>
          <ChannelPill>Active</ChannelPill>
        </div>
        <div className="space-y-3">
          {rows.map(([label, value, width], i) => (
            <div key={label}>
              <div className="mb-1.5 flex justify-between gap-3 text-[11px]">
                <span className="font-bold text-[#FFFDF8]/48">{label}</span>
                <span className="font-black text-[#FFFDF8]/84">{value}</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/8">
                <motion.div className="h-full rounded-full bg-gradient-to-r from-[#C4973F] to-[#E8B44B]" initial={{ width: 0 }} animate={{ width: `${width}%` }} transition={{ delay: 0.38 + i * 0.16, duration: 0.85, ease }} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <div className="mb-2 text-[10px] font-black uppercase tracking-[0.15em] text-[#E8B44B]/80">Approved phrases</div>
            <div className="flex flex-wrap gap-2">
              {phrases.map((phrase, i) => (
                <motion.span key={phrase} className="rounded-full border border-[#C4973F]/16 bg-[#C4973F]/8 px-2.5 py-1.5 text-[10px] font-bold text-[#FFFDF8]/72" initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 + i * 0.08, duration: 0.34, ease }}>
                  {phrase}
                </motion.span>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 text-[10px] font-black uppercase tracking-[0.15em] text-[#E8B44B]/80">Words to avoid</div>
            <div className="flex flex-wrap gap-2">
              {avoid.map((word, i) => (
                <motion.span key={word} className="rounded-full border border-white/10 bg-white/[0.045] px-2.5 py-1.5 text-[10px] font-bold text-[#FFFDF8]/62" initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 + i * 0.08, duration: 0.34, ease }}>
                  {word}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </GlassPanel>
    </SceneShell>
  );
}

function DashboardPanel() {
  const metrics = [
    ['31', 'Leads captured', '+22% vs last 7 days'],
    ['19', 'Bookings', '+18% vs last 7 days'],
    ['2', 'No-shows prevented', '+21% vs last 7 days'],
    ['£4,800', 'Pipeline', 'Live tracked value'],
  ];
  const feed = [
    ['DM answered', 'Instagram · 11:42pm'],
    ['Appointment booked', 'Friday 11:00am'],
    ['No-show prevented', 'SMS confirmed'],
    ['Review request sent', 'Yesterday'],
  ];
  const bars = [
    ['Lead response', 98],
    ['Reminder delivery', 100],
    ['Rebooking rate', 74],
  ] as const;

  return (
    <motion.div
      className="h-full overflow-hidden rounded-2xl border border-[#C4973F]/20 bg-[#0F0E0B] shadow-[0_24px_90px_rgba(0,0,0,0.56),0_0_55px_rgba(196,151,63,0.08)]"
      initial={{ opacity: 0, y: 16, scale: 0.975 }}
      animate={{ opacity: 1, y: 0, scale: [0.975, 1, 1.012] }}
      transition={{ delay: 0.16, duration: 4.8, ease }}
    >
      <div className="flex h-full min-h-0">
        <aside className="hidden w-[92px] shrink-0 border-r border-white/8 bg-black/20 p-3 sm:block">
          <Logo light width={54} />
          <div className="mt-5 space-y-1.5">
            {['Overview', 'Conversations', 'Bookings', 'Clients', 'Voice', 'Integrations'].map((item, i) => (
              <div key={item} className={`rounded-lg px-2 py-1.5 text-[8px] font-black ${i === 0 ? 'bg-[#C4973F]/14 text-[#E8B44B]' : 'text-white/28'}`}>{item}</div>
            ))}
          </div>
        </aside>
        <main className="min-w-0 flex-1 p-3">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="text-[14px] font-black text-[#FFFDF8]">Overview</div>
              <div className="text-[9px] font-medium text-white/34">Glow Aesthetics · This week</div>
            </div>
            <span className="rounded-full bg-[#C4973F]/14 px-2.5 py-1 text-[9px] font-black text-[#E8B44B]">Live</span>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {metrics.map(([value, label, trend], i) => (
              <motion.div key={label} className="rounded-xl border border-white/8 bg-white/[0.045] p-2.5" initial={{ opacity: 0, y: 9 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 + i * 0.09, duration: 0.36, ease }}>
                <div className="text-[18px] font-black leading-none tracking-[-0.04em] text-[#FFFDF8]">{value}</div>
                <div className="mt-1 text-[8px] font-black uppercase tracking-[0.08em] text-[#FFFDF8]/38">{label}</div>
                <div className="mt-1.5 text-[8px] font-bold text-[#E8B44B]/75">{trend}</div>
              </motion.div>
            ))}
          </div>
          <div className="mt-3 grid min-h-0 gap-2 sm:grid-cols-[1fr_0.9fr]">
            <div className="rounded-xl border border-white/8 bg-white/[0.04] p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10px] font-black text-[#FFFDF8]">Recent activity</span>
                <span className="text-[8px] font-bold text-[#E8B44B]/75">Auto-handled</span>
              </div>
              {feed.map(([title, detail], i) => (
                <motion.div key={title} className="flex items-center gap-2 border-t border-white/6 py-1.5 first:border-t-0" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.78 + i * 0.11, duration: 0.34, ease }}>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E8B44B]" />
                  <div>
                    <div className="text-[9px] font-black text-[#FFFDF8]/78">{title}</div>
                    <div className="text-[8px] text-white/32">{detail}</div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="rounded-xl border border-white/8 bg-white/[0.04] p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10px] font-black text-[#FFFDF8]">Revenue recovered</span>
                <span className="text-[9px] font-black text-[#E8B44B]">£3,200</span>
              </div>
              <svg viewBox="0 0 150 62" className="mb-2 h-14 w-full overflow-visible">
                <path d="M4 56H146" stroke="rgba(255,253,248,0.08)" />
                <path d="M4 38H146" stroke="rgba(255,253,248,0.06)" />
                <motion.path d="M5 54 C24 44 31 48 43 36 C58 19 70 42 86 31 C104 19 111 30 125 12 C133 3 140 8 146 7" fill="none" stroke="#E8B44B" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.64, duration: 1.35, ease }} />
              </svg>
              {bars.map(([label, width], i) => (
                <div key={label} className="mb-1.5">
                  <div className="mb-1 flex justify-between text-[8px] font-bold text-white/38"><span>{label}</span><span>{width}%</span></div>
                  <div className="h-1.5 rounded-full bg-white/8">
                    <motion.div className="h-full rounded-full bg-[#C4973F]" initial={{ width: 0 }} animate={{ width: `${width}%` }} transition={{ delay: 1 + i * 0.12, duration: 0.58, ease }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </motion.div>
  );
}

function SceneDashboard() {
  return (
    <SceneShell index={6} full>
      <DashboardPanel />
    </SceneShell>
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
    <SceneShell index={7}>
      <GlassPanel className="mx-auto w-full max-w-[430px] p-4">
        <div className="mb-4 flex items-center justify-between border-b border-white/7 pb-3">
          <div>
            <div className="text-[12px] font-black text-[#FFFDF8]">Revenue recovery</div>
            <div className="text-[10px] text-[#FFFDF8]/38">This month · auto-attributed</div>
          </div>
          <ChannelPill>May</ChannelPill>
        </div>
        <motion.div className="rounded-2xl border border-[#C4973F]/18 bg-[#C4973F]/10 p-4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26, duration: 0.5, ease }}>
          <div className="text-[48px] font-black leading-none tracking-[-0.07em] text-[#E8B44B]">£3,200</div>
          <div className="mt-1 text-[11px] font-black uppercase tracking-[0.16em] text-[#FFFDF8]/52">Recovered this month</div>
          <div className="mt-3 flex items-center gap-2 text-[10px] font-bold text-[#E8B44B]/78"><span className="h-1.5 w-1.5 rounded-full bg-[#E8B44B]" /> +26% vs last month</div>
        </motion.div>
        <div className="mt-3 space-y-2">
          {rows.map(([label, value], i) => (
            <motion.div key={label} className="flex items-center justify-between rounded-xl border border-white/7 bg-white/[0.045] px-3 py-2.5 text-[12px] font-bold text-[#FFFDF8]/76" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.74 + i * 0.1, duration: 0.34, ease }}>
              <span>{label}</span>
              <span className="font-black text-[#E8B44B]">{value}</span>
            </motion.div>
          ))}
        </div>
        <motion.div className="mt-4 flex items-center justify-between rounded-xl border border-[#C4973F]/16 bg-black/22 px-3 py-2.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.45, duration: 0.5, ease }}>
          <span className="text-[12px] font-black text-[#FFFDF8]">Your clinic. Running itself.</span>
          <LumiLens size={24} animated />
        </motion.div>
      </GlassPanel>
    </SceneShell>
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
      className="relative h-full w-full overflow-hidden bg-[#0F0E0B] text-[#FFFDF8] [font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif]"
      data-human-assets={humanAssets ? 'available' : 'abstract'}
      aria-label="Lumio product film"
    >
      <AnimatePresence mode="wait" initial={false}>
        <Scene key={sceneIndex} />
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-16 bg-gradient-to-t from-[#0F0E0B]/90 to-transparent" />
      <div className="absolute bottom-3 left-4 z-40 flex gap-1.5 sm:bottom-4 sm:left-5">
        {scenes.map((_, i) => (
          <span key={i} className={`h-1 rounded-full transition-all duration-700 ${i === sceneIndex ? 'w-7 bg-[#E8B44B]' : 'w-1.5 bg-white/20'}`} />
        ))}
      </div>
    </div>
  );
}
