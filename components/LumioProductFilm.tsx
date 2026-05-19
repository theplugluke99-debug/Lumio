'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import LumiLens from '@/components/LumiLens';
import {
  CalendlyLogo,
  FreshaLogo,
  GmailLogo,
  GoogleLogo,
  InstagramLogo,
  PhorestLogo,
  StripeLogo,
  TrustpilotLogo,
  WhatsAppLogo,
} from '@/components/logos/IntegrationLogos';
import Logo from '@/components/ui/Logo';

type LumioProductFilmProps = {
  humanAssets?: boolean;
};

const SCENE_MS = 4200;
const ease = [0.22, 1, 0.36, 1] as const;
const interStack = 'var(--font-inter), Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const scenes = [
  {
    number: '01',
    title: 'New enquiry',
    support: 'While you sleep, Lumi captures the lead and understands what they need.',
  },
  {
    number: '02',
    title: 'Lumi replies',
    support: 'Natural replies in your clinic voice, without sounding automated.',
  },
  {
    number: '03',
    title: 'Booking confirmed',
    support: 'Availability, prep notes, and calendar updates handled in one flow.',
  },
  {
    number: '04',
    title: 'Everything connected',
    support: 'Lumio plugs into the tools your clinic already uses.',
  },
  {
    number: '05',
    title: 'No-shows prevented',
    support: 'Smart reminders protect revenue before a slot is lost.',
  },
  {
    number: '06',
    title: 'Your voice',
    support: 'Lumi learns tone, boundaries, phrasing, and clinic style.',
  },
  {
    number: '07',
    title: 'Dashboard close-up',
    support: 'Every lead, booking, automation, and recovery visible in one place.',
  },
  {
    number: '08',
    title: 'Results',
    support: 'Recovered revenue becomes measurable clinic growth.',
  },
] as const;

const layerTransition = { duration: 0.72, ease };

export default function LumioProductFilm({ humanAssets = false }: LumioProductFilmProps) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSceneIndex((current) => (current + 1) % scenes.length);
    }, SCENE_MS);

    return () => window.clearTimeout(timer);
  }, [sceneIndex]);

  return (
    <div
      className="relative h-full w-full overflow-hidden bg-[#0F0E0B] text-[#FFFDF8] [font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif]"
      style={{ fontFamily: interStack }}
      aria-label="Lumio automated product film"
    >
      <PersistentBackdrop sceneIndex={sceneIndex} reducedMotion={Boolean(reducedMotion)} humanAssets={humanAssets} />

      <motion.div
        className="absolute inset-0 z-10"
        animate={
          reducedMotion
            ? { scale: 1, x: 0, y: 0 }
            : {
                scale: sceneIndex === 6 ? 1.025 : sceneIndex === 7 ? 1.01 : 1,
                x: sceneIndex === 3 ? -4 : sceneIndex === 6 ? 3 : 0,
                y: sceneIndex === 4 ? -2 : 0,
              }
        }
        transition={{ duration: 1.2, ease }}
      >
        <div className="relative h-full w-full p-3 sm:p-5">
          <div className="relative h-full w-full overflow-hidden rounded-[1.15rem] border border-[#C4973F]/12 bg-black/[0.08] sm:rounded-[1.75rem]">
            <SceneCaption sceneIndex={sceneIndex} />
            <FilmSweep sceneIndex={sceneIndex} reducedMotion={Boolean(reducedMotion)} />
            <div className="absolute inset-x-3 bottom-3 top-[58px] sm:inset-x-5 sm:bottom-5 sm:top-[62px]">
              <div className="relative h-full w-full">
                <PersistentRails sceneIndex={sceneIndex} reducedMotion={Boolean(reducedMotion)} />
                <CinematicPanelStrip sceneIndex={sceneIndex} reducedMotion={Boolean(reducedMotion)} />
                <MotionPath reducedMotion={Boolean(reducedMotion)} />
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={sceneIndex}
                    className="absolute inset-0"
                    initial={{ opacity: 0, x: 22, y: 4, scale: 0.985, filter: 'blur(7px)' }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: -22, y: -3, scale: 1.012, filter: 'blur(7px)' }}
                    transition={layerTransition}
                  >
                    <SceneContent sceneIndex={sceneIndex} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function PersistentBackdrop({
  sceneIndex,
  reducedMotion,
  humanAssets,
}: {
  sceneIndex: number;
  reducedMotion: boolean;
  humanAssets: boolean;
}) {
  const glowPositions = ['70% 28%', '72% 46%', '68% 34%', '76% 50%', '62% 66%', '70% 42%', '60% 45%', '66% 62%'];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: 1 }}
        style={{
          background: `radial-gradient(circle at ${glowPositions[sceneIndex]}, rgba(232,180,75,0.22), transparent 34%), radial-gradient(circle at 18% 12%, rgba(255,253,248,0.06), transparent 28%), linear-gradient(145deg, #12100b, #0F0E0B 48%, #17120c)`,
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,253,248,0.026)_1px,transparent_1px),linear-gradient(0deg,rgba(255,253,248,0.018)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40" />
      <div className="absolute inset-0 opacity-[0.055] [background-image:radial-gradient(rgba(255,253,248,0.56)_0.55px,transparent_0.7px)] [background-size:9px_9px]" />
      <div
        className={`absolute left-[-10%] top-[2%] h-[62%] w-[52%] rounded-full blur-3xl transition-opacity duration-700 ${
          sceneIndex === 0 || sceneIndex === 1 ? 'opacity-60' : 'opacity-18'
        }`}
        style={{
          background: humanAssets
            ? 'radial-gradient(circle at 48% 38%, rgba(232,180,75,0.2), rgba(84,58,34,0.16) 38%, transparent 68%)'
            : 'radial-gradient(circle at 52% 42%, rgba(255,220,162,0.18), rgba(108,70,38,0.18) 42%, transparent 70%)',
        }}
      />
      <div
        className={`absolute left-[3%] top-[10%] hidden h-[46%] w-[30%] rounded-[48%] bg-[radial-gradient(circle_at_58%_28%,rgba(255,225,178,0.16),rgba(112,74,42,0.14)_36%,transparent_68%)] blur-[10px] transition-opacity duration-700 sm:block ${
          sceneIndex === 0 ? 'opacity-80' : 'opacity-20'
        }`}
      />
      <div
        className={`absolute left-[18%] top-[18%] hidden h-[19%] w-[11%] -rotate-12 rounded-full bg-[#130f0b] blur-[5px] transition-opacity duration-700 sm:block ${
          sceneIndex === 0 ? 'opacity-65' : 'opacity-0'
        }`}
      />
      <div
        className={`absolute left-[7%] top-[18%] hidden h-[1px] w-[23%] rotate-[-16deg] bg-gradient-to-r from-transparent via-[#F2D49B]/28 to-transparent transition-opacity duration-700 sm:block ${
          sceneIndex === 0 ? 'opacity-90' : 'opacity-0'
        }`}
      />
      <div
        className={`absolute left-[9%] top-[33%] hidden h-20 w-44 rounded-full bg-[#0b0907]/60 blur-xl transition-opacity duration-700 sm:block ${
          sceneIndex === 0 ? 'opacity-80' : 'opacity-0'
        }`}
      />
      <GoldWaves reducedMotion={reducedMotion} className="absolute inset-x-[-24%] bottom-[5%] h-[34%] opacity-90" />
      <GoldWaves reducedMotion={reducedMotion} className="absolute inset-x-[-36%] bottom-[-11%] h-[30%] opacity-52" secondary />
      <div className="absolute inset-x-0 bottom-0 h-[34%] bg-gradient-to-t from-[#0F0E0B] via-[#0F0E0B]/42 to-transparent" />
    </div>
  );
}

function GoldWaves({
  className = '',
  reducedMotion,
  secondary = false,
}: {
  className?: string;
  reducedMotion: boolean;
  secondary?: boolean;
}) {
  const paths = [
    'M0 106 C80 24 142 142 224 72 C306 2 372 112 458 46 C536 -10 604 78 690 30',
    'M0 132 C92 74 150 144 242 94 C330 46 402 128 488 82 C574 36 630 88 690 58',
    'M0 78 C108 20 170 112 260 58 C350 4 410 86 500 44 C574 8 628 52 690 24',
    'M0 152 C126 104 188 154 278 118 C364 82 430 138 512 102 C590 68 640 98 690 84',
  ];

  return (
    <svg className={className} viewBox="0 0 690 176" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={secondary ? 'film-wave-secondary' : 'film-wave-primary'} x1="0" x2="1">
          <stop offset="0%" stopColor="#C4973F" stopOpacity="0" />
          <stop offset="40%" stopColor="#E8B44B" stopOpacity={secondary ? '0.2' : '0.34'} />
          <stop offset="55%" stopColor="#F6D88C" stopOpacity={secondary ? '0.62' : '0.92'} />
          <stop offset="100%" stopColor="#C4973F" stopOpacity="0" />
        </linearGradient>
      </defs>
      {paths.map((path, index) => (
        <motion.path
          key={path}
          d={path}
          fill="none"
          stroke={`url(#${secondary ? 'film-wave-secondary' : 'film-wave-primary'})`}
          strokeLinecap="round"
          strokeWidth={index === 0 ? 1.55 : 0.75}
          initial={false}
          animate={
            reducedMotion
              ? { pathLength: 1, pathOffset: 0, opacity: index === 0 ? 0.75 : 0.35 }
              : { pathLength: 1, pathOffset: [0.06, -0.06], opacity: index === 0 ? 0.92 : 0.4 }
          }
          transition={{ duration: secondary ? 8 : 6.5, repeat: reducedMotion ? 0 : Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: index * 0.15 }}
        />
      ))}
    </svg>
  );
}

function SceneCaption({ sceneIndex }: { sceneIndex: number }) {
  const scene = scenes[sceneIndex];

  return (
    <div className="absolute left-4 right-4 top-4 z-30 flex items-start justify-between gap-3 sm:left-6 sm:right-6 sm:top-5">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={scene.title}
          className="flex min-w-0 items-center gap-2 rounded-full border border-[#C4973F]/14 bg-black/18 px-2.5 py-1.5 backdrop-blur-md"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.55, ease }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E8B44B] opacity-35" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E8B44B]" />
          </span>
          <span className="text-[8px] font-black uppercase tracking-[0.16em] text-[#E8B44B]/76">Lumi live</span>
          <span className="hidden h-px w-5 bg-[#E8B44B]/28 sm:block" />
          <span className="hidden truncate text-[10px] font-bold text-[#FFFDF8]/54 sm:block">{scene.title}</span>
        </motion.div>
      </AnimatePresence>
      <div className="hidden h-px w-20 bg-gradient-to-r from-transparent via-[#E8B44B]/20 to-transparent sm:block" />
    </div>
  );
}

function FilmSweep({ sceneIndex, reducedMotion }: { sceneIndex: number; reducedMotion: boolean }) {
  if (reducedMotion) return null;

  return (
    <motion.div
      key={`sweep-${sceneIndex}`}
      className="pointer-events-none absolute inset-y-0 z-20 w-[42%] -skew-x-12 bg-gradient-to-r from-transparent via-[#F6D88C]/[0.09] to-transparent"
      initial={{ x: '-130%', opacity: 0 }}
      animate={{ x: '260%', opacity: [0, 1, 0] }}
      transition={{ duration: 1.12, ease, delay: 0.08 }}
    />
  );
}

function PersistentRails({ sceneIndex, reducedMotion }: { sceneIndex: number; reducedMotion: boolean }) {
  return (
    <>
      <motion.div
        className="absolute left-[8%] top-[42%] hidden h-px w-[84%] bg-gradient-to-r from-transparent via-[#E8B44B]/20 to-transparent sm:block"
        animate={reducedMotion ? { opacity: 0.28 } : { opacity: [0.2, 0.42, 0.2], x: sceneIndex % 2 ? 8 : -8 }}
        transition={{ duration: 4.5, repeat: reducedMotion ? 0 : Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />
      <div className="absolute inset-x-[7%] bottom-[15%] h-px bg-gradient-to-r from-transparent via-[#E8B44B]/16 to-transparent" />
      <div className="absolute inset-0 rounded-[1.15rem] border border-[#C4973F]/[0.045] sm:rounded-[1.75rem]" />
    </>
  );
}

function CinematicPanelStrip({ sceneIndex, reducedMotion }: { sceneIndex: number; reducedMotion: boolean }) {
  const panels = [
    ['DM', '11:42pm'],
    ['Reply', 'voice matched'],
    ['Book', 'Fri 11am'],
    ['Sync', '9 tools'],
    ['Reminder', 'confirmed'],
    ['Voice', 'warm'],
    ['Dashboard', 'live'],
    ['Result', '£3.2k'],
  ];

  return (
    <div className="pointer-events-none absolute inset-x-[-12%] top-[4%] z-0 hidden h-12 overflow-hidden opacity-45 sm:block">
      <motion.div
        className="flex gap-2"
        animate={reducedMotion ? { x: '-4%' } : { x: ['0%', '-17%', '0%'] }}
        transition={{ duration: 12, repeat: reducedMotion ? 0 : Infinity, ease: 'easeInOut' }}
      >
        {[...panels, ...panels].map(([label, value], index) => (
          <div
            key={`${label}-${index}`}
            className={`w-24 shrink-0 rounded-xl border px-2.5 py-2 ${
              index % panels.length === sceneIndex
                ? 'border-[#E8B44B]/20 bg-[#C4973F]/10'
                : 'border-white/[0.055] bg-white/[0.025]'
            }`}
          >
            <div className="text-[8px] font-black uppercase tracking-[0.13em] text-[#E8B44B]/56">{label}</div>
            <div className="mt-1 truncate text-[8px] font-semibold text-[#FFFDF8]/30">{value}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function MotionPath({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-x-[5%] bottom-[6%] z-0 hidden h-12 opacity-55 sm:block">
      <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[#E8B44B]/22 to-transparent" />
      {!reducedMotion && (
        <>
          {[0, 1, 2].map((packet) => (
            <motion.span
              key={packet}
              className="absolute top-1/2 h-1.5 w-10 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-[#F5D88A] to-transparent opacity-80 blur-[0.5px]"
              initial={{ left: '-8%' }}
              animate={{ left: '100%' }}
              transition={{ duration: 3.9, repeat: Infinity, ease: 'linear', delay: packet * 1.25 }}
            />
          ))}
        </>
      )}
      <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between">
        {Array.from({ length: 8 }).map((_, index) => (
          <span
            key={index}
            className="h-1.5 w-1.5 rounded-full border border-[#E8B44B]/18 bg-[#C4973F]/18 shadow-[0_0_14px_rgba(232,180,75,0.18)]"
          />
        ))}
      </div>
    </div>
  );
}

function SceneContent({ sceneIndex }: { sceneIndex: number }) {
  if (sceneIndex === 0) return <ConversationScene mode="enquiry" />;
  if (sceneIndex === 1) return <ConversationScene mode="reply" />;
  if (sceneIndex === 2) return <BookingScene />;
  if (sceneIndex === 3) return <IntegrationsScene />;
  if (sceneIndex === 4) return <NoShowScene />;
  if (sceneIndex === 5) return <VoiceScene />;
  if (sceneIndex === 6) return <DashboardScene />;
  return <ResultsScene />;
}

function FilmLayout({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <div className="grid h-full min-h-0 items-center gap-3 sm:grid-cols-[0.5fr_1.5fr] sm:gap-4">
      <div className="hidden min-w-0 sm:block">{aside}</div>
      <div className="min-h-0 min-w-0">{children}</div>
    </div>
  );
}

function StoryAside({ eyebrow = 'automation', title, children }: { eyebrow?: string; title: string; children: ReactNode }) {
  return (
    <div className="relative rounded-2xl border border-[#C4973F]/14 bg-[#0b0a08]/34 p-3 shadow-[0_18px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl">
      <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#E8B44B]/10 blur-2xl" />
      <div className="relative">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#E8B44B]" />
          <span className="text-[8px] font-black uppercase tracking-[0.16em] text-[#E8B44B]/72">{eyebrow}</span>
        </div>
        <h3 className="text-[15px] font-black leading-tight tracking-[-0.03em] text-[#FFFDF8]">{title}</h3>
        <p className="mt-2 text-[10px] font-semibold leading-relaxed text-[#FFFDF8]/54">{children}</p>
        <div className="mt-4 text-[16px] font-light text-[#E8B44B]">→</div>
      </div>
    </div>
  );
}

function GlassPanel({ children, className = '', style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div
      className={`relative rounded-[1.35rem] border border-[#C4973F]/18 bg-[linear-gradient(145deg,rgba(29,25,19,0.88),rgba(10,9,7,0.78))] shadow-[0_24px_90px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,253,248,0.075)] backdrop-blur-xl ${className}`}
      style={style}
    >
      <motion.span
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#F4D58E]/55 to-transparent"
        animate={{ opacity: [0.18, 0.72, 0.18], x: ['-18%', '18%', '-18%'] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      {children}
    </div>
  );
}

function ConversationScene({ mode }: { mode: 'enquiry' | 'reply' }) {
  const replyInsights = [
    ['Availability', '2 slots found'],
    ['Tone', 'Warm'],
    ['Intent', 'Ready to book'],
  ];

  return (
    <FilmLayout
      aside={
        <StoryAside eyebrow={mode === 'enquiry' ? '11:42pm' : 'on-brand'} title={mode === 'enquiry' ? 'While the clinic sleeps.' : 'Like you would.'}>
          {mode === 'enquiry'
            ? 'A late enquiry becomes structured lead data before the clinic opens.'
            : 'Lumi checks availability and replies with warmth, context, and restraint.'}
        </StoryAside>
      }
    >
      <motion.div
        className="relative mx-auto w-full max-w-[450px]"
        animate={{ y: mode === 'reply' ? [0, -3, 0] : [0, 3, 0], rotateX: [0, 0.35, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute -inset-5 rounded-full bg-[#E8B44B]/12 blur-3xl" />
        <div className="absolute -left-8 top-4 hidden h-32 w-32 rounded-full bg-[radial-gradient(circle_at_55%_35%,rgba(255,225,180,0.18),rgba(72,44,25,0.2)_42%,transparent_72%)] blur-md sm:block" />
        <GlassPanel className="relative overflow-hidden p-3 sm:p-4">
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#E8B44B]/[0.08] to-transparent" />
          <div className="mb-3 flex items-center justify-between border-b border-white/7 pb-3">
            <div className="flex items-center gap-2">
              <InstagramLogo size={32} />
              <div>
                <div className="text-[12px] font-black text-[#FFFDF8]">Instagram</div>
                <div className="text-[10px] font-medium text-[#FFFDF8]/38">Glow Aesthetics · 11:42pm</div>
              </div>
            </div>
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E8B44B] opacity-35" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-[#E8B44B]" />
            </span>
          </div>
          <div className="space-y-3">
            <MessageBubble align="left">Hi lovely, do you have lip filler availability this week?</MessageBubble>
            {mode === 'reply' ? (
              <>
                <TypingDots />
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.48, duration: 0.5, ease }}>
                  <MessageBubble align="right">
                    Hey lovely — yes, I have Thursday 2pm or Friday 11am free. Would you like me to book you in?
                  </MessageBubble>
                </motion.div>
                <div className="grid grid-cols-3 gap-2">
                  {replyInsights.map(([label, value], index) => (
                    <motion.div
                      key={label}
                      className="rounded-xl border border-white/8 bg-white/[0.045] px-2.5 py-2"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.74 + index * 0.08, duration: 0.36, ease }}
                    >
                      <div className="text-[8px] font-black uppercase tracking-[0.12em] text-[#FFFDF8]/34">{label}</div>
                      <div className="mt-1 truncate text-[10px] font-black text-[#E8B44B]/86">{value}</div>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <div className="grid gap-2 sm:grid-cols-2">
                <motion.div
                  className="flex items-center gap-2 rounded-xl border border-[#C4973F]/20 bg-[#C4973F]/10 px-3 py-2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.58, duration: 0.45, ease }}
                >
                  <LumiLens size={20} />
                  <div>
                    <div className="text-[10px] font-black text-[#E8B44B]">Lead captured</div>
                    <div className="text-[9px] text-[#FFFDF8]/42">Lip filler · High intent</div>
                  </div>
                </motion.div>
                <motion.div
                  className="rounded-xl border border-white/8 bg-white/[0.045] px-3 py-2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.72, duration: 0.45, ease }}
                >
                  <div className="text-[10px] font-black text-[#FFFDF8]/70">Matched workflow</div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/8">
                    <motion.div className="h-full rounded-full bg-[#E8B44B]" initial={{ width: 0 }} animate={{ width: '82%' }} transition={{ delay: 0.9, duration: 0.55, ease }} />
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </GlassPanel>
      </motion.div>
    </FilmLayout>
  );
}

function MessageBubble({ children, align }: { children: ReactNode; align: 'left' | 'right' }) {
  return (
    <div className={`flex ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[86%] rounded-2xl p-3 text-[12px] font-semibold leading-snug sm:text-[13px] ${
          align === 'right'
            ? 'rounded-tr-md border border-[#E8B44B]/25 bg-[#C4973F]/18 text-[#FFFDF8]'
            : 'rounded-tl-md border border-white/8 bg-white/[0.065] text-[#FFFDF8]/88'
        }`}
      >
        {children}
        <div className="mt-2 text-[9px] font-medium text-[#FFFDF8]/34">{align === 'right' ? 'Lumi · 11:43pm' : '11:42pm'}</div>
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <motion.div
      className="ml-auto flex w-fit items-center gap-1 rounded-2xl rounded-tr-md border border-[#E8B44B]/18 bg-[#C4973F]/12 px-3 py-2"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease }}
    >
      {[0, 1, 2].map((dot) => (
        <motion.span
          key={dot}
          className="h-1.5 w-1.5 rounded-full bg-[#E8B44B]"
          animate={{ opacity: [0.35, 1, 0.35], y: [0, -2, 0] }}
          transition={{ duration: 0.8, repeat: 2, delay: dot * 0.12 }}
        />
      ))}
    </motion.div>
  );
}

function BookingScene() {
  const items = ['Confirmation sent', 'Prep notes sent', 'Calendar updated'];
  const clientRows = [
    ['Client', 'Sarah M.'],
    ['Channel', 'Instagram'],
    ['Deposit', 'Ready'],
  ];

  return (
    <FilmLayout aside={<StoryAside eyebrow="calendar" title="Slot secured.">The conversation resolves into a real appointment, with client care handled automatically.</StoryAside>}>
      <motion.div
        className="relative mx-auto w-full max-w-[460px]"
        animate={{ y: [3, -4, 3], scale: [0.995, 1, 0.995] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute -inset-4 rounded-full bg-[#E8B44B]/12 blur-3xl" />
        <GlassPanel className="relative overflow-hidden p-4">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-[#E8B44B]/70">booking confirmed</div>
              <h3 className="mt-2 text-[24px] font-black tracking-[-0.03em] text-[#FFFDF8]">Friday 11am</h3>
              <p className="mt-1 text-[12px] font-semibold text-[#FFFDF8]/54">Lip Filler · Sarah M.</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#E8B44B]/22 bg-[#C4973F]/12 text-[18px] font-black text-[#E8B44B]">11</div>
          </div>
          <div className="mb-3 grid grid-cols-3 gap-2">
            {clientRows.map(([label, value], index) => (
              <motion.div
                key={label}
                className="rounded-xl border border-white/8 bg-white/[0.04] px-2.5 py-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + index * 0.08, duration: 0.36, ease }}
              >
                <div className="text-[8px] font-black uppercase tracking-[0.12em] text-[#FFFDF8]/32">{label}</div>
                <div className="mt-1 truncate text-[10px] font-black text-[#FFFDF8]/72">{value}</div>
              </motion.div>
            ))}
          </div>
          <div className="space-y-2.5">
            {items.map((item, index) => (
              <motion.div
                key={item}
                className="flex items-center gap-2.5 rounded-xl border border-white/8 bg-white/[0.045] px-3 py-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.17, duration: 0.45, ease }}
              >
                <Tick delay={0.28 + index * 0.16} />
                <span className="text-[12px] font-bold text-[#FFFDF8]/74">{item}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {['Thu 2pm', 'Fri 11am', 'Fri 3pm'].map((slot) => (
              <div key={slot} className={`rounded-xl border px-2 py-2 text-center text-[10px] font-black ${slot === 'Fri 11am' ? 'border-[#E8B44B]/30 bg-[#C4973F]/14 text-[#E8B44B]' : 'border-white/8 bg-white/[0.035] text-[#FFFDF8]/34'}`}>
                {slot}
              </div>
            ))}
          </div>
        </GlassPanel>
      </motion.div>
    </FilmLayout>
  );
}

function IntegrationsScene() {
  const nodes = [
    { name: 'Instagram', Logo: InstagramLogo },
    { name: 'WhatsApp', Logo: WhatsAppLogo },
    { name: 'Google', Logo: GoogleLogo },
    { name: 'Fresha', Logo: FreshaLogo },
    { name: 'Phorest', Logo: PhorestLogo },
    { name: 'Stripe', Logo: StripeLogo },
    { name: 'Calendly', Logo: CalendlyLogo },
    { name: 'Gmail', Logo: GmailLogo },
    { name: 'Trustpilot', Logo: TrustpilotLogo },
  ];

  return (
    <motion.div
      className="relative mx-auto h-full w-full max-w-[620px]"
      animate={{ scale: [0.992, 1.012, 0.992], rotate: [0, 0.15, 0] }}
      transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E8B44B]/10 blur-3xl" />
      <motion.div className="absolute left-1/2 top-1/2 h-[168px] w-[168px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E8B44B]/10" animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute left-1/2 top-1/2 h-[238px] w-[238px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E8B44B]/[0.055]" animate={{ scale: [1.04, 1, 1.04], opacity: [0.35, 0.8, 0.35] }} transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }} />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 620 330" aria-hidden="true">
        {nodes.map((_, index) => {
          const angle = (Math.PI * 2 * index) / nodes.length - Math.PI / 2;
          const x = 310 + Math.cos(angle) * 210;
          const y = 165 + Math.sin(angle) * 112;
          return (
            <motion.line
              key={index}
              x1={310}
              y1={165}
              x2={x}
              y2={y}
              stroke="#E8B44B"
              strokeOpacity="0.28"
              strokeDasharray="3 7"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.08 * index, duration: 0.65, ease }}
            />
          );
        })}
      </svg>
      <div className="absolute left-1/2 top-1/2 z-10 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[2rem] border border-[#E8B44B]/25 bg-[#111009]/82 shadow-[0_0_70px_rgba(232,180,75,0.22)] backdrop-blur-xl">
        <div className="text-center">
          <LumiLens size={34} className="mx-auto" />
          <div className="mt-2 text-[12px] font-black text-[#FFFDF8]">Lumio</div>
        </div>
      </div>
      {nodes.map(({ name, Logo: IntegrationLogo }, index) => {
        const angle = (Math.PI * 2 * index) / nodes.length - Math.PI / 2;
        const x = 50 + Math.cos(angle) * 34;
        const y = 50 + Math.sin(angle) * 34;
        return (
          <motion.div
            key={name}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-[#15120d]/90 px-3 py-2 text-center shadow-[0_18px_50px_rgba(0,0,0,0.42)] backdrop-blur-xl"
            style={{ left: `${x}%`, top: `${y}%` }}
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.12 + index * 0.06, duration: 0.45, ease }}
          >
            <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.035]">
              <IntegrationLogo size={24} />
            </div>
            <div className="text-[10px] font-bold text-[#FFFDF8]/72">{name}</div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function NoShowScene() {
  const rows = [
    ['48h', 'Reminder sent', 'Email'],
    ['24h', 'Reminder confirmed', 'SMS'],
    ['AM', 'Morning reminder scheduled', 'WhatsApp'],
    ['✓', 'Client confirmed', '11:02am'],
  ];

  return (
    <FilmLayout aside={<MetricCallout value="67%" label="fewer no-shows" />}>
      <motion.div animate={{ y: [2, -3, 2] }} transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}>
        <GlassPanel className="mx-auto w-full max-w-[430px] p-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-[#E8B44B]/70">reminder timeline</div>
            <div className="mt-1 text-[13px] font-bold text-[#FFFDF8]/58">Friday 11am · Lip Filler</div>
          </div>
          <span className="rounded-full border border-[#E8B44B]/24 bg-[#C4973F]/12 px-3 py-1 text-[10px] font-black text-[#E8B44B]">protected</span>
        </div>
        <div className="relative space-y-3">
          <div className="absolute bottom-5 left-[17px] top-5 w-px bg-[#E8B44B]/18" />
          {rows.map(([time, title, channel], index) => (
            <motion.div
              key={title}
              className="relative flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.04] px-3 py-2.5"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15, duration: 0.45, ease }}
            >
              <span className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E8B44B]/28 bg-[#15120d] text-[10px] font-black text-[#E8B44B]">{time}</span>
              <div className="min-w-0">
                <div className="truncate text-[12px] font-black text-[#FFFDF8]/82">{title}</div>
                <div className="text-[10px] font-medium text-[#FFFDF8]/38">{channel}</div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-[#E8B44B]/18 bg-[#C4973F]/10 px-3 py-2">
            <div className="text-[8px] font-black uppercase tracking-[0.14em] text-[#E8B44B]/70">slot status</div>
            <div className="mt-1 text-[11px] font-black text-[#FFFDF8]/80">Confirmed</div>
          </div>
          <div className="rounded-xl border border-white/8 bg-white/[0.04] px-3 py-2">
            <div className="text-[8px] font-black uppercase tracking-[0.14em] text-[#FFFDF8]/34">fallback</div>
            <div className="mt-1 text-[11px] font-black text-[#FFFDF8]/70">Waitlist ready</div>
          </div>
        </div>
        </GlassPanel>
      </motion.div>
    </FilmLayout>
  );
}

function MetricCallout({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[1.5rem] border border-[#E8B44B]/18 bg-[#C4973F]/10 p-5 shadow-[0_22px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <motion.div
        className="text-[42px] font-black leading-none tracking-[-0.05em] text-[#E8B44B]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease }}
      >
        {value}
      </motion.div>
      <div className="mt-2 text-[12px] font-bold uppercase tracking-[0.16em] text-[#FFFDF8]/48">{label}</div>
    </div>
  );
}

function VoiceScene() {
  const sliders = [
    ['Greeting style', 'Warm', '88%'],
    ['Tone', 'Friendly, reassuring', '82%'],
    ['Clinic style', 'Luxury, trust, results', '78%'],
  ];
  const avoids = ['Cheap', 'Discount', 'Pushy'];
  const approved = ['Hey lovely', 'Of course', 'You are in safe hands'];

  return (
    <FilmLayout aside={<StoryAside eyebrow="training" title="Always on-brand.">Lumi is trained on how your clinic actually speaks, including what never to say.</StoryAside>}>
      <motion.div animate={{ y: [-2, 3, -2] }} transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}>
        <GlassPanel className="mx-auto w-full max-w-[440px] p-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-[#E8B44B]/70">voice profile</div>
            <div className="mt-1 text-[14px] font-black text-[#FFFDF8]">Glow Aesthetics</div>
          </div>
          <LumiLens size={30} />
        </div>
        <div className="space-y-3">
          {sliders.map(([label, value, width], index) => (
            <div key={label} className="rounded-xl border border-white/8 bg-white/[0.04] p-3">
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-[10px] font-bold text-[#FFFDF8]/42">{label}</span>
                <span className="text-[11px] font-black text-[#FFFDF8]/80">{value}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#C4973F] to-[#F1CC74]"
                  initial={{ width: 0 }}
                  animate={{ width }}
                  transition={{ delay: 0.15 + index * 0.12, duration: 0.65, ease }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#FFFDF8]/38">avoids</div>
          <div className="flex flex-wrap gap-2">
            {avoids.map((word, index) => (
              <motion.span
                key={word}
                className="rounded-full border border-[#E8B44B]/18 bg-[#C4973F]/10 px-3 py-1.5 text-[10px] font-bold text-[#E8B44B]/78"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + index * 0.08, duration: 0.35, ease }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>
        <div className="mt-3 hidden rounded-xl border border-white/8 bg-white/[0.04] p-3 sm:block">
          <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#FFFDF8]/38">approved language</div>
          <div className="flex flex-wrap gap-2">
            {approved.map((phrase) => (
              <span key={phrase} className="rounded-full border border-white/8 bg-black/18 px-2.5 py-1 text-[9px] font-bold text-[#FFFDF8]/54">
                {phrase}
              </span>
            ))}
          </div>
        </div>
        </GlassPanel>
      </motion.div>
    </FilmLayout>
  );
}

function DashboardScene() {
  const metrics = [
    ['31', 'Leads captured', '+18% this week'],
    ['19', 'Bookings by AI', 'AI handled'],
    ['2', 'No-shows this week', '-77% vs before'],
    ['£4,800', 'Pipeline value', 'Live tracking'],
  ];
  const suggestions = [
    ['Sophie Carter needs a rebooking nudge', 'Last visit 7 weeks ago'],
    ['3 clients have not left a Google review', 'Emma, Charlotte and Olivia'],
  ];
  const activity = [
    ['New DM answered', 'Instagram · Lip filler enquiry qualified', '09:32'],
    ['Booking confirmed by AI', 'Emma Wilson · Friday 11am', '09:26'],
    ['No-show prevented', 'WhatsApp · Appointment reminder delivered', '09:15'],
  ];
  const nav = ['Overview', 'Activity', 'Chats', 'Clients', 'Tasks', 'Automation', 'Reviews', 'Reports'];

  return (
    <motion.div
      className="relative mx-auto h-full w-full max-w-[730px]"
      style={{ fontFamily: interStack }}
      animate={{ scale: [1.006, 1.025, 1.006], x: [0, -4, 0] }}
      transition={{ duration: 4.1, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="absolute -inset-3 rounded-[1.8rem] bg-[#E8B44B]/10 blur-2xl" />
      <GlassPanel className="relative h-full overflow-hidden" style={{ fontFamily: interStack }}>
        <div className="flex h-full">
          <aside className="hidden w-[126px] shrink-0 border-r border-white/8 bg-[#141210]/95 p-3 sm:block">
            <div className="mb-4">
              <Logo light width={70} />
            </div>
            {nav.map((item, index) => (
              <div
                key={item}
                className={`mb-1 rounded-xl px-2 py-1.5 text-[8px] font-semibold ${
                  index === 0 ? 'border border-[#C4973F]/30 bg-[#C4973F]/12 text-[#C4973F] shadow-[0_10px_28px_rgba(196,151,63,0.08)]' : 'text-[#FFFDF8]/42'
                }`}
              >
                {item}
              </div>
            ))}
          </aside>
          <main className="min-w-0 flex-1 bg-[#141210] p-3 sm:p-4" style={{ fontFamily: interStack }}>
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <div className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#E8B44B]">THIS WEEK</div>
                <div className="mt-1 max-w-[210px] truncate text-[16px] font-extrabold leading-none text-[#FFFDF8]">Glow Aesthetics London</div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.04] px-2.5 py-1 text-[9px] font-medium text-[#5B8A68]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#5B8A68]" />
                Live automation active
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {metrics.map(([value, label, delta], index) => (
                <motion.div
                  key={label}
                  className="rounded-xl border border-white/8 bg-white/[0.045] p-2.5 shadow-[inset_0_1px_0_rgba(255,253,248,0.035)]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.4, ease }}
                >
                  <div className="text-[17px] font-extrabold tracking-[-0.03em] text-[#FFFDF8]">{value}</div>
                  <div className="mt-1 text-[9px] font-semibold leading-tight text-[#FFFDF8]/50">{label}</div>
                  <div className="mt-1 text-[8px] font-semibold text-[#C4973F]">{delta}</div>
                </motion.div>
              ))}
            </div>
            <div className="mt-3 grid min-h-0 gap-2 sm:grid-cols-[0.92fr_1.08fr]">
              <div className="rounded-xl border border-white/8 bg-white/[0.04] p-3">
                <div className="mb-2 text-[9px] font-bold uppercase tracking-[0.12em] text-[#C4973F]">LUMI SUGGESTS</div>
                {suggestions.map(([title, body], index) => (
                  <motion.div
                    key={title}
                    className="mb-2 flex gap-2 rounded-lg border border-white/[0.045] bg-black/12 px-2 py-2 last:mb-0"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + index * 0.08, duration: 0.32, ease }}
                  >
                    <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${index === 0 ? 'bg-[#C4973F]' : 'bg-[#5B8A68]'}`} />
                    <span className="min-w-0">
                      <span className="block truncate text-[10px] font-semibold text-[#FFFDF8]/72">{title}</span>
                      <span className="mt-0.5 block truncate text-[9px] font-normal text-[#FFFDF8]/38">{body}</span>
                    </span>
                  </motion.div>
                ))}
              </div>
              <div className="rounded-xl border border-white/8 bg-white/[0.04] p-3">
                <div className="mb-2 text-[9px] font-bold uppercase tracking-[0.12em] text-[#C4973F]">TODAY</div>
                {activity.map(([title, detail, time], index) => (
                  <motion.div
                    key={title}
                    className="mb-2 flex items-center gap-2 rounded-lg bg-black/14 px-2 py-1.5 last:mb-0"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.38 + index * 0.08, duration: 0.32, ease }}
                  >
                    <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#C4973F]/15 text-[#C4973F]">
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[10px] font-semibold text-[#FFFDF8]/70">{title}</div>
                      <div className="truncate text-[9px] font-normal text-[#FFFDF8]/36">{detail}</div>
                    </div>
                    <span className="text-[8px] text-[#FFFDF8]/30">{time}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="mt-2 hidden rounded-xl border border-white/8 bg-white/[0.04] p-3 sm:block">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#C4973F]">Revenue recovered</span>
                <span className="text-[10px] font-extrabold text-[#E8B44B]">£3,200</span>
              </div>
              <RevenueChart />
            </div>
          </main>
        </div>
      </GlassPanel>
    </motion.div>
  );
}

function RevenueChart() {
  return (
    <svg viewBox="0 0 180 58" className="h-[58px] w-full overflow-visible" aria-hidden="true">
      <path d="M4 50 C26 34 42 46 58 30 C76 12 92 40 110 28 C132 14 136 22 154 8 C164 2 172 8 176 5" fill="none" stroke="#E8B44B" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 50 C26 34 42 46 58 30 C76 12 92 40 110 28 C132 14 136 22 154 8 C164 2 172 8 176 5 L176 58 L4 58 Z" fill="url(#chartFill)" opacity="0.25" />
      <defs>
        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#E8B44B" />
          <stop offset="1" stopColor="#E8B44B" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ResultsScene() {
  const rows = [
    ['Leads captured', '+127'],
    ['No-shows prevented', '+23'],
    ['Rebookings recovered', '+18'],
    ['Reviews generated', '+12'],
  ];

  return (
    <FilmLayout aside={<StoryAside eyebrow="payoff" title="Running itself.">Your clinic keeps moving while the team focuses on clients, care, and outcomes.</StoryAside>}>
      <motion.div animate={{ y: [4, -3, 4], scale: [0.996, 1.006, 0.996] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}>
        <GlassPanel className="mx-auto w-full max-w-[450px] p-4">
        <div className="mb-4 rounded-2xl border border-[#E8B44B]/20 bg-[radial-gradient(circle_at_80%_20%,rgba(232,180,75,0.18),transparent_36%),rgba(196,151,63,0.1)] p-4">
          <div className="text-[10px] font-black uppercase tracking-[0.18em] text-[#E8B44B]/72">recovered this month</div>
          <motion.div
            className="mt-2 text-[42px] font-black leading-none tracking-[-0.055em] text-[#E8B44B] sm:text-[52px]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            £3,200
          </motion.div>
        </div>
        <div className="mb-3 flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.04] px-3 py-2">
          <div>
            <div className="text-[10px] font-black text-[#FFFDF8]/72">Trustpilot request flow</div>
            <div className="mt-0.5 text-[9px] font-medium text-[#FFFDF8]/34">12 reviews generated</div>
          </div>
          <div className="text-[12px] tracking-[0.08em] text-[#E8B44B]">★★★★★</div>
        </div>
        <div className="space-y-2">
          {rows.map(([label, value], index) => (
            <motion.div
              key={label}
              className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.045] px-3 py-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.18 + index * 0.09, duration: 0.4, ease }}
            >
              <span className="text-[12px] font-bold text-[#FFFDF8]/64">{label}</span>
              <span className="text-[12px] font-black text-[#E8B44B]">{value}</span>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-4 text-center text-[18px] font-black tracking-[-0.03em] text-[#FFFDF8] sm:text-[22px]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.72, duration: 0.5, ease }}
        >
          Your clinic. Running itself.
        </motion.div>
        </GlassPanel>
      </motion.div>
    </FilmLayout>
  );
}

function Tick({ delay = 0 }: { delay?: number }) {
  return (
    <motion.span
      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E8B44B] text-[10px] font-black text-[#111009]"
      initial={{ opacity: 0, scale: 0.35 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.34, ease }}
    >
      ✓
    </motion.span>
  );
}
