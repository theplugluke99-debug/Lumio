'use client';

import { motion } from 'framer-motion';
import Nav from '@/components/Nav';
import GoldButton from '@/components/ui/GoldButton';

const ease = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

function ProductDemoPanel() {
  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <div
        className="absolute inset-0 -z-10 rounded-[2rem] md:rounded-[3rem] blur-[56px] opacity-35"
        style={{ background: 'radial-gradient(ellipse, rgba(196,151,63,.55) 0%, transparent 70%)' }}
      />
      <div className="rounded-[2rem] md:rounded-[3rem] border border-white/10 bg-[#211E19]/88 p-2.5 shadow-[0_34px_100px_rgba(0,0,0,.42)] backdrop-blur-2xl">
        <div className="relative overflow-hidden rounded-[1.55rem] md:rounded-[2.35rem] border border-[#C4973F]/25 bg-[#FFFDF8] px-6 py-9 md:px-10 md:py-12 min-h-[320px] md:min-h-[460px] flex flex-col items-center justify-center text-center">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{ background: 'radial-gradient(circle at 50% 42%, rgba(232,180,75,.16), transparent 42%)' }}
          />
          <div className="relative grid h-20 w-20 md:h-24 md:w-24 place-items-center rounded-full bg-[#C4973F] shadow-[0_20px_60px_rgba(196,151,63,.35)]">
            <div className="ml-1 h-0 w-0 border-y-[12px] border-y-transparent border-l-[18px] border-l-[#1A1814]" />
          </div>
          <p className="relative mt-8 font-display text-3xl md:text-4xl italic text-[#1A1814]">
            Lumio product demo
          </p>
          <p className="relative mt-3 max-w-xs text-sm md:text-base leading-relaxed text-[#8A8278]">
            Feature walkthrough coming soon
          </p>
          <div className="relative mt-9 flex flex-wrap justify-center gap-2.5">
            {['Leads', 'Bookings', 'Reviews', 'Admin'].map((label) => (
              <span key={label} className="rounded-full border border-[#C4973F]/20 bg-[#F9EDE8]/80 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[.14em] text-[#1A1814]/70">
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative flex min-h-[110svh] w-full max-w-full flex-col overflow-hidden bg-[#1A1814]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(ellipse at center, #C4973F 0%, transparent 65%)' }} />
        <div className="absolute top-[-80px] left-[-120px] w-[500px] h-[500px] rounded-full blur-[120px] opacity-10" style={{ background: '#C4973F' }} />
        <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full blur-[100px] opacity-10" style={{ background: '#E8B44B' }} />
        <div className="absolute inset-0 flex items-center justify-center select-none overflow-hidden">
          <span className="font-display text-[22vw] font-black italic text-white select-none"
            style={{ opacity: 0.025, letterSpacing: '-0.04em', whiteSpace: 'nowrap' }}>Lumio</span>
        </div>
      </div>

      <Nav />

      <div className="relative z-10 flex w-screen max-w-[100vw] flex-1 items-start px-4 pt-20 pb-24 md:items-center md:pt-24 md:pb-28 lg:pt-28 lg:pb-32">
        <div className="mx-auto grid w-[calc(100vw-2rem)] min-w-0 max-w-7xl grid-cols-1 items-center gap-14 md:w-full md:grid-cols-[minmax(0,660px)_minmax(360px,1fr)] md:gap-16 lg:gap-24">

          <motion.div
            className="flex w-full min-w-0 max-w-[660px] flex-col items-center text-center md:items-start md:text-left"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex w-full max-w-full min-w-0 items-center justify-center gap-2.5 rounded-full border border-[#C4973F]/30 bg-[#C4973F]/10 px-4 py-2 text-center text-[10px] sm:w-auto sm:text-xs font-semibold leading-relaxed tracking-[.18em] sm:tracking-widest text-[#E8B44B] uppercase"
            >
              <span className="pulse-dot h-2 w-2 rounded-full bg-[#C4973F]" />
              <span className="min-w-0 whitespace-normal">AI Automation · Aesthetic Clinics · London &amp; UK</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-8 md:mt-10 font-display font-black text-[#FFFDF8] leading-[.94] tracking-[-0.035em]"
              style={{ fontSize: 'clamp(3rem, 8.2vw, 7rem)' }}
            >
              Your clinic.<br />
              <span className="italic gold-text">Running<span className="sm:hidden"><br /></span> itself.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-8 md:mt-10 text-base md:text-lg leading-relaxed mx-auto md:mx-0 max-w-[540px]"
              style={{ color: 'rgba(255,253,248,0.62)' }}
            >
              While you&apos;re with a client, Lumio answers enquiries, books appointments,
              automates your admin, and follows up — automatically. Every lead captured.
              Every task handled. Nothing missed.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9 md:mt-11 flex flex-col gap-4 w-full md:w-auto">
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-center gap-3.5 w-full sm:w-auto">
                <div className="mx-auto w-full max-w-[calc(100vw-2rem)] sm:mx-0 sm:w-auto sm:max-w-none [&>a]:w-full [&>a]:justify-center [&>a]:px-5 sm:[&>a]:w-auto sm:[&>a]:px-9">
                  <GoldButton href="/audit" large>Get my free Revenue Reveal</GoldButton>
                </div>
                <a href="#services" className="text-sm text-white/50 hover:text-white/80 transition-colors">
                  See what&apos;s possible ↓
                </a>
              </div>
              <div className="flex flex-col gap-2 pt-1">
                <p className="text-xs text-white/30">Takes 3 minutes. See your exact monthly revenue loss. No call required.</p>
                <a href="#talk-to-lumio" className="text-xs text-[#C4973F]/60 hover:text-[#C4973F] transition-colors">
                  Or talk to our AI now — no forms, no calls →
                </a>
                <a href="/demo" className="group text-xs text-white/35 hover:text-[#C4973F] transition-colors inline-flex items-center justify-center md:justify-start gap-1">
                  Or explore the live demo first
                  <span className="transition-transform duration-200 group-hover:translate-x-1 inline-block">→</span>
                </a>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="block md:hidden mt-10 w-full">
              <ProductDemoPanel />
            </motion.div>
          </motion.div>

          <motion.div
            className="relative hidden md:block"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.4 }}
          >
            <ProductDemoPanel />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
