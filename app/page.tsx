'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

/* ─── CursorGlow ─── */
function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', onMove);
    let raf: number;
    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top = `${ring.current.y}px`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed z-[9999] hidden md:block pointer-events-none"
        style={{ width: 16, height: 16, borderRadius: '50%', background: '#C4973F', transform: 'translate(-50%,-50%)', mixBlendMode: 'multiply', top: 0, left: 0 }}
      />
      <div
        ref={ringRef}
        className="fixed z-[9998] hidden md:block pointer-events-none"
        style={{ width: 48, height: 48, borderRadius: '50%', border: '1.5px solid #C4973F', transform: 'translate(-50%,-50%)', opacity: 0.5, top: 0, left: 0 }}
      />
    </>
  );
}

/* ─── Logo ─── */
function Logo({ small, large, light }: { small?: boolean; large?: boolean; light?: boolean }) {
  const size = large ? 'h-16 md:h-20' : 'h-10 md:h-12';
  const filter = light
    ? 'brightness(10) saturate(0.6) sepia(0.3)'
    : 'brightness(0.15) sepia(1) saturate(4) hue-rotate(5deg)';
  return (
    <Image
      src="/lumio-logo.png"
      alt="Lumio"
      width={large ? 200 : 140}
      height={large ? 80 : 48}
      className={`${size} w-auto object-contain`}
      style={{ filter }}
      priority
    />
  );
}

/* ─── GoldButton ─── */
function GoldButton({ children, href, dark }: { children: React.ReactNode; href?: string; dark?: boolean }) {
  const base =
    'group inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-sm transition-all duration-200 -translate-y-0 hover:-translate-y-1 shadow-[0_20px_60px_rgba(196,151,63,.2)]';
  const color = dark
    ? 'bg-[#1A1814] text-[#FFFDF8] hover:bg-[#2E2B26]'
    : 'bg-[#C4973F] text-[#1A1814] hover:bg-[#E8B44B]';
  const Tag = href ? 'a' : 'button';
  return (
    <Tag href={href} className={`${base} ${color}`}>
      {children}
      <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
    </Tag>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="relative min-h-screen bg-[#1A1814] overflow-hidden flex flex-col">
      {/* Background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(ellipse at center, #C4973F 0%, transparent 65%)' }} />
        <div className="absolute top-[-80px] left-[-120px] w-[500px] h-[500px] rounded-full blur-[120px] opacity-10"
          style={{ background: '#C4973F' }} />
        <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full blur-[100px] opacity-10"
          style={{ background: '#E8B44B' }} />
        <div className="absolute inset-0 flex items-center justify-center select-none overflow-hidden">
          <span
            className="font-display text-[22vw] font-black italic text-white select-none"
            style={{ opacity: 0.025, letterSpacing: '-0.04em', whiteSpace: 'nowrap' }}
          >
            Lumio
          </span>
        </div>
      </div>

      {/* Nav */}
      <div className="relative z-10 w-full px-4 pt-5">
        <nav className="mx-auto max-w-6xl flex items-center justify-between rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl px-5 py-3">
          <Logo small light />
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60 font-medium">
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#process" className="hover:text-white transition-colors">How it works</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <a href="#audit"
            className="rounded-full bg-[#FFFDF8] text-[#1A1814] text-sm font-semibold px-5 py-2.5 hover:bg-[#C4973F] transition-colors duration-200">
            Book free audit →
          </a>
        </nav>
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex items-center px-4 py-20 md:py-0">
        <div className="mx-auto max-w-6xl w-full grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left */}
          <div className="flex flex-col gap-7">
            <div className="reveal inline-flex items-center gap-2.5 self-start rounded-full border border-[#C4973F]/30 bg-[#C4973F]/10 px-4 py-2 text-xs font-semibold tracking-widest text-[#E8B44B] uppercase">
              <span className="pulse-dot h-2 w-2 rounded-full bg-[#C4973F]" />
              AI Automation · Aesthetic Clinics · London &amp; UK
            </div>

            <h1 className="reveal-2 font-display font-black text-[#FFFDF8] leading-[.84] tracking-[-0.04em]"
              style={{ fontSize: 'clamp(3.5rem, 8vw, 9.4rem)' }}>
              Your clinic.<br />
              <span className="italic gold-text">Running itself.</span>
            </h1>

            <p className="reveal-3 text-base md:text-lg leading-relaxed max-w-md" style={{ color: 'rgba(255,253,248,0.62)' }}>
              While you&apos;re with a client, Lumio answers enquiries, books appointments, automates your admin, and follows up — automatically. Every lead captured. Every task handled. Nothing missed.
            </p>

            <div className="reveal-4 flex flex-wrap items-center gap-4">
              <GoldButton href="#audit">Get my free clinic audit</GoldButton>
              <a href="#services" className="text-sm text-white/50 hover:text-white/80 transition-colors">
                See what&apos;s possible ↓
              </a>
            </div>
          </div>

          {/* Right: Dashboard mockup */}
          <div className="reveal-3 relative">
            <div className="absolute inset-0 rounded-[3rem] blur-[60px] opacity-30 -z-10"
              style={{ background: 'radial-gradient(ellipse, #C4973F 0%, transparent 70%)' }} />
            <div className="rounded-[3rem] border border-white/10 bg-white/[0.06] backdrop-blur-2xl p-3">
              <div className="rounded-[2.4rem] bg-[#FFFDF8] p-5 md:p-6">
                {/* Card header */}
                <div className="flex items-center justify-between mb-5">
                  <Logo small />
                  <span className="rounded-full bg-[#F9EDE8] px-3 py-1 text-xs font-bold tracking-wide text-[#C4973F] border border-[#C4973F]/20">
                    ● Live flow
                  </span>
                </div>
                {/* Activity rows */}
                <div className="flex flex-col gap-2.5">
                  {[
                    { time: '10:04', title: 'Instagram DM answered', detail: 'Lip filler enquiry moved to booking' },
                    { time: '10:07', title: 'Reminder sent', detail: 'Tomorrow\'s consultation confirmed' },
                    { time: '10:12', title: 'Review requested', detail: 'Google review flow triggered' },
                    { time: '10:19', title: 'Aftercare sent', detail: 'Client received branded guidance' },
                  ].map((row) => (
                    <div key={row.time}
                      className="group flex items-center gap-3 rounded-3xl bg-[#F9EDE8]/60 hover:bg-[#F9EDE8] px-4 py-3 transition-colors cursor-default">
                      <span className="text-xs font-bold text-[#C4973F] w-10 shrink-0">{row.time}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-[#1A1814] truncate">{row.title}</p>
                        <p className="text-[11px] text-[#8A8278] truncate">{row.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Stats */}
                <div className="mt-4 flex gap-2 flex-wrap">
                  <span className="rounded-full bg-[#F0EDF8] px-3 py-1.5 text-xs font-bold text-[#1A1814]">31 leads</span>
                  <span className="rounded-full bg-[#EDF4EE] px-3 py-1.5 text-xs font-bold text-[#1A1814]">12 booked</span>
                  <span className="rounded-full bg-[#F2DDD8] px-3 py-1.5 text-xs font-bold text-[#1A1814]">£4.8k pipeline</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Marquee ─── */
const MARQUEE_ITEMS = [
  'Lead Response', 'AUTOMATED', 'Booking System', '24/7', 'No-Shows', 'SLASHED',
  'Instagram DMs', 'HANDLED', 'Invoices', 'CHASED', 'Aftercare', 'AUTOMATED',
  'Reviews', 'ON AUTOPILOT', 'Admin', 'ELIMINATED', '5,000+ UK Clinics', 'UNDERSERVED',
];

function Marquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="bg-[#C4973F] border-y-2 border-[#1A1814] overflow-hidden py-3.5">
      <div className="marquee-track flex items-center gap-6 whitespace-nowrap w-max">
        {doubled.map((item, i) => (
          <span key={i} className="text-sm font-bold uppercase tracking-[.18em] text-[#1A1814] shrink-0">
            {item}
            {i < doubled.length - 1 && <span className="ml-6 opacity-40">·</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Stats ─── */
const STATS = [
  {
    value: '£3.6bn',
    label: 'UK aesthetics market annually — and most clinics are still running on WhatsApp',
    insight: 'A £3.6bn industry with zero automation. That\'s the gap Lumio fills.',
    source: 'WifiTalents, 2026',
  },
  {
    value: '5,000+',
    label: 'Independent aesthetic clinics in the UK with no automation system',
    insight: 'Most have no way to follow up a single missed enquiry. That\'s your opportunity.',
    source: 'PolicyBee, 2026',
  },
  {
    value: '23%',
    label: 'Average no-show rate in aesthetic clinics — pure revenue walking out the door',
    insight: 'Every empty slot costs £150–£400. A smart reminder sequence prevents most of them.',
    source: 'ProspyrMed, 2024',
  },
  {
    value: '23%',
    label: 'Growth in non-invasive UK procedures in 2025 — demand has never been higher',
    insight: 'Clinics that can\'t keep up with demand are losing to the ones that can. Lumio is the difference.',
    source: 'The Exeter Daily, 2025',
  },
];

function StatCard({ value, label, insight, source }: typeof STATS[0]) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group rounded-[2rem] border border-[#1A1814]/8 bg-white/65 shadow-sm p-7 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1"
      style={{ boxShadow: hovered ? '0 0 0 2px #C4973F, 0 20px 60px rgba(196,151,63,.1)' : undefined }}
    >
      <div className="font-display font-black text-5xl md:text-6xl tracking-[-0.04em] gold-text">{value}</div>
      <p className="text-sm text-[#2E2B26] leading-relaxed">{label}</p>
      <div
        className="overflow-hidden transition-all duration-500"
        style={{ maxHeight: hovered ? '7rem' : 0, opacity: hovered ? 1 : 0 }}
      >
        <p className="text-sm text-[#1A1814] font-semibold pt-2 border-t border-[#C4973F]/20">{insight}</p>
        <p className="text-xs text-[#8A8278] mt-1">Source: {source}</p>
      </div>
    </div>
  );
}

function Stats() {
  return (
    <section className="bg-[#FFFDF8] py-20 px-4">
      <div className="mx-auto max-w-6xl grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {STATS.map((s) => <StatCard key={s.value + s.source} {...s} />)}
      </div>
    </section>
  );
}

/* ─── Problem ─── */
const PAINS = [
  {
    n: '01',
    text: 'Three enquiries came in while you were with a client. By the time you replied, they\'d already booked somewhere else. That\'s £300–£600 gone before you even knew about it.',
  },
  {
    n: '02',
    text: 'Someone DM\'d your Instagram at 10pm asking about lip filler. You saw it at 9am. The moment had passed. They moved on.',
  },
  {
    n: '03',
    text: 'A client hasn\'t rebooked in 6 weeks. You meant to follow up. You never did. They tried someone new. They stayed.',
  },
  {
    n: '04',
    text: 'Two no-shows this week. Filler prepped. Room booked. Injector paid. £400 of empty time — a simple reminder sequence would have prevented both.',
  },
];

function Problem() {
  return (
    <section className="grid md:grid-cols-2">
      {/* Left */}
      <div className="bg-[#F9EDE8] px-8 md:px-14 py-20 md:py-28 flex flex-col justify-center gap-7">
        <span className="text-xs font-bold uppercase tracking-[.2em] text-[#C4973F]">The reality</span>
        <h2 className="font-display font-black text-5xl md:text-7xl lg:text-8xl leading-[.9] tracking-[-0.03em] text-[#1A1814]">
          You&apos;re losing<br />
          <span className="italic gold-text">money right now.</span>
        </h2>
        <p className="text-[#8A8278] leading-relaxed max-w-sm text-base">
          The UK aesthetics industry is worth £3.6 billion — and the vast majority of clinics are still managing enquiries on WhatsApp, missing bookings while in treatment, and leaving revenue on the table every single day.
        </p>
        <p className="text-[#8A8278] leading-relaxed max-w-sm text-base">
          The systems exist to fix this. Most clinic owners just don&apos;t have the time to find and set them up. That&apos;s exactly what Lumio does.
        </p>
      </div>
      {/* Right */}
      <div className="relative bg-[#1A1814] px-8 md:px-14 py-20 md:py-28 flex flex-col justify-center gap-6 overflow-hidden">
        <div className="pointer-events-none absolute top-[-60px] right-[-60px] w-[300px] h-[300px] rounded-full blur-[80px] opacity-15"
          style={{ background: '#C4973F' }} />
        <span className="text-xs font-bold uppercase tracking-[.2em] text-[#C4973F]">Sound familiar?</span>
        {PAINS.map((p) => (
          <div key={p.n}
            className="group rounded-[1.6rem] border border-white/10 bg-white/[0.045] px-5 py-5 flex gap-4 transition-all duration-300 hover:-translate-y-0.5"
            style={{ }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(196,151,63,0.4)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(196,151,63,.08)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
          >
            <span className="font-display italic text-[#C4973F]/40 text-lg font-black shrink-0 mt-0.5">{p.n}</span>
            <p className="text-sm text-white/60 leading-relaxed">{p.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Services ─── */
const SERVICES = [
  { n: '01', icon: '✦', name: 'Instant Lead Response', body: 'Every enquiry answered in seconds — 24 hours a day, 7 days a week. Your AI qualifies leads, answers questions about your treatments, and moves them toward booking while you\'re with clients. You never miss another lead again.', stat: '↑ Response rate from hours to seconds' },
  { n: '02', icon: '◐', name: 'Automated Booking & Reminders', body: 'Appointments booked, confirmed, and reminded automatically. Intelligent multi-step reminder sequences reduce no-shows dramatically. No more £300 empty slots from treatments you\'ve already prepped for.', stat: '↓ No-show rate by up to 60%' },
  { n: '03', icon: '✉', name: 'Instagram DM Automation', body: 'Someone DMs at 11pm asking about Botox. Lumio responds instantly — branded as you, conversational, warm. It answers their questions and books them in before you\'ve even woken up.', stat: 'Zero missed DMs. Ever.' },
  { n: '04', icon: '↻', name: 'Rebooking & Retention', body: 'Your existing clients are your most profitable asset. Lumio automatically follows up after every treatment, nurtures rebookings, and keeps clients returning month after month — without you lifting a finger.', stat: '↑ Client lifetime value significantly' },
  { n: '05', icon: '★', name: 'Five-Star Review Generation', body: 'After every completed treatment, a perfectly timed message requests a Google review. More five-star reviews. Better local ranking. More organic bookings. Zero effort from you.', stat: 'Reputation growing on autopilot' },
  { n: '06', icon: '⌁', name: 'Full Admin Automation', body: 'Consent forms chased and filed. Aftercare instructions sent automatically. Invoices chased. Stock reminders triggered. Monthly reports generated. Your entire back office, running without you.', stat: 'Hours back every single week' },
  { n: '07', icon: '◈', name: 'Your Lumio Dashboard', body: 'Every lead captured, every conversation handled, every booking made, every admin task completed — visible in one clean dashboard. Real numbers. Real revenue attributed to Lumio. Always in your control.', stat: 'Complete visibility. Zero admin.' },
];

function Services() {
  return (
    <section id="services" className="py-24 px-4" style={{ background: 'linear-gradient(180deg, #FFFDF8 0%, #F0EDF8 50%, #FFFDF8 100%)' }}>
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-[.2em] text-[#C4973F]">What Lumio does</span>
          <h2 className="mt-3 font-display font-black text-5xl md:text-7xl leading-[.9] tracking-[-0.03em] text-[#1A1814]">
            Everything <span className="italic gold-text">handled.</span>
          </h2>
          <p className="mt-4 text-[#8A8278] max-w-md mx-auto text-base">
            Built for your clinic. Live in 5–7 days. No tech knowledge needed.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s) => (
            <div key={s.n}
              className="group relative rounded-[2rem] border border-[#1A1814]/8 bg-[#FFFDF8]/78 shadow-sm p-7 flex flex-col gap-4 overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{ }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#C4973F'; (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 60px rgba(196,151,63,.12)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
            >
              {/* Ghost number */}
              <span className="absolute top-5 right-6 font-display italic font-black text-[4rem] leading-none text-[#1A1814]/[0.04] select-none">
                {s.n}
              </span>
              {/* Icon */}
              <div className="h-10 w-10 rounded-2xl bg-[#C4973F] flex items-center justify-center text-white text-lg">
                {s.icon}
              </div>
              <h3 className="font-display font-bold text-xl text-[#1A1814]">{s.name}</h3>
              <p className="text-sm text-[#8A8278] leading-relaxed flex-1">{s.body}</p>
              <div className="relative">
                <p className="text-xs font-bold text-[#C4973F] uppercase tracking-wide">{s.stat}</p>
                {/* Gold underline sweep */}
                <span className="absolute bottom-[-2px] left-0 h-[2px] w-0 bg-[#C4973F] transition-all duration-500 group-hover:w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Process ─── */
const STEPS = [
  { n: '01', time: '30 mins', title: 'Free Discovery Call', body: 'We understand your clinic, your treatments, your clients, and exactly where you\'re losing leads and revenue right now. No pressure. Just clarity.' },
  { n: '02', time: '5–7 days', title: 'We Build Everything', body: 'We design and build your complete automation system. Branded as your clinic. Tailored to your treatments and voice. You don\'t touch a thing.' },
  { n: '03', time: '1 hour', title: 'We Hand It Over', body: 'We walk you through your Lumio dashboard. Everything is live, tested, and working before handover. One hour of your time. That\'s it.' },
  { n: '04', time: '24/7 forever', title: 'Your Clinic Runs Itself', body: 'Lumio handles leads, bookings, reminders, rebooking, and admin around the clock. We maintain everything. You focus on your clients.' },
];

function Process() {
  return (
    <section id="process" className="relative bg-[#1A1814] py-24 px-4 overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-10"
        style={{ background: '#C4973F' }} />
      <div className="relative mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-[.2em] text-[#C4973F]">How it works</span>
          <h2 className="mt-3 font-display font-black text-5xl md:text-7xl leading-[.9] tracking-[-0.03em] text-[#FFFDF8]">
            Live in <span className="italic gold-text">5–7 days.</span>
          </h2>
          <p className="mt-4 text-[#8A8278] max-w-md mx-auto text-base">
            You don&apos;t have to do anything technical.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((s) => (
            <div key={s.n}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-7 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1"
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(196,151,63,0.5)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = ''; }}
            >
              <div className="flex items-center justify-between">
                <span className="font-display italic font-black text-5xl gold-text leading-none">{s.n}</span>
                <span className="rounded-full border border-[#C4973F]/30 text-[#E8B44B] text-xs font-semibold px-3 py-1">
                  {s.time}
                </span>
              </div>
              <h3 className="font-display font-bold text-lg text-white">{s.title}</h3>
              <p className="text-sm text-[#8A8278] leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing ─── */
const PLANS = [
  {
    name: 'Foundation',
    setup: '£1,500',
    monthly: '£600',
    tagline: 'Everything you need to stop losing leads.',
    features: [
      'Instant lead response system',
      'Automated booking & confirmations',
      'Appointment reminder sequences',
      'Review generation flow',
      'Lumio dashboard access',
      '30-day onboarding support',
    ],
    cta: 'Get started',
    featured: false,
    badge: null,
  },
  {
    name: 'Full System',
    setup: '£2,500',
    monthly: '£900',
    tagline: 'Every lead. Every rebook. Everything automated.',
    features: [
      'Everything in Foundation',
      'Instagram DM automation',
      'Rebooking & retention flows',
      'Full AI conversation handling',
      'Monthly performance review',
      'Priority support',
    ],
    cta: 'Get started',
    featured: true,
    badge: 'Most popular',
  },
  {
    name: 'Full Operations',
    setup: '£4,000',
    monthly: '£1,400',
    tagline: 'Your entire clinic — front desk and back office — running itself.',
    features: [
      'Everything in Full System',
      'Consent form automation & filing',
      'Aftercare instruction sequences',
      'Invoice chasing automation',
      'Stock & supply reminders',
      'Inbox management flows',
      'Monthly performance reporting',
      'Dedicated monthly account call',
    ],
    cta: 'Get started',
    featured: false,
    badge: 'Best value',
  },
];

function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4" style={{ background: 'linear-gradient(180deg, #F9EDE8 0%, #F0EDF8 50%, #FFFDF8 100%)' }}>
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-[.2em] text-[#C4973F]">Investment</span>
          <h2 className="mt-3 font-display font-black text-4xl md:text-6xl leading-[.9] tracking-[-0.03em] text-[#1A1814]">
            Simple pricing.<br />
            <span className="italic gold-text">Pays for itself fast.</span>
          </h2>
          <p className="mt-4 text-[#8A8278] max-w-lg mx-auto text-base">
            A senior receptionist costs £28,000 a year and still misses calls. Lumio costs a fraction — and never sleeps.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {PLANS.map((p) => (
            <div key={p.name} className={`relative rounded-[2.2rem] p-7 md:p-8 flex flex-col gap-6 shadow transition-all duration-300 hover:-translate-y-1 ${p.featured ? 'bg-[#1A1814]' : 'bg-white'}`}
              style={{ border: p.featured ? '2px solid #C4973F' : '1px solid rgba(26,24,20,0.08)' }}
            >
              {p.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className={`rounded-full px-4 py-1 text-xs font-bold ${p.featured ? 'bg-[#C4973F] text-[#1A1814]' : 'bg-[#1A1814] text-white'}`}>
                    {p.badge}
                  </span>
                </div>
              )}
              <div>
                <h3 className={`font-display font-bold text-2xl mb-1 ${p.featured ? 'text-white' : 'text-[#1A1814]'}`}>{p.name}</h3>
                <p className={`text-sm ${p.featured ? 'text-white/50' : 'text-[#8A8278]'}`}>{p.tagline}</p>
              </div>
              <div>
                <div className={`font-display font-black text-4xl tracking-[-0.03em] ${p.featured ? 'text-white' : 'text-[#1A1814]'}`}>
                  {p.monthly}<span className={`text-base font-normal ${p.featured ? 'text-white/40' : 'text-[#8A8278]'}`}>/mo</span>
                </div>
                <div className={`text-sm mt-1 ${p.featured ? 'text-white/40' : 'text-[#8A8278]'}`}>{p.setup} setup</div>
              </div>
              <ul className="flex flex-col gap-2.5 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 text-[#C4973F] shrink-0">✓</span>
                    <span className={p.featured ? 'text-white/70' : 'text-[#2E2B26]'}>{f}</span>
                  </li>
                ))}
              </ul>
              <div>
                {p.featured ? (
                  <GoldButton href="#audit">{p.cta}</GoldButton>
                ) : (
                  <GoldButton href="#audit" dark>{p.cta}</GoldButton>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-[#8A8278] mt-10">
          Not sure which is right for you?{' '}
          <a href="#audit" className="text-[#C4973F] hover:text-[#E8B44B] underline underline-offset-4 transition-colors">
            Book a free call
          </a>{' '}
          and we&apos;ll tell you honestly. No upsell, no pressure.
        </p>
      </div>
    </section>
  );
}

/* ─── Testimonial ─── */
function Testimonial() {
  return (
    <section className="bg-[#F2DDD8] py-24 px-4 text-center">
      <div className="mx-auto max-w-4xl flex flex-col items-center gap-7">
        <div className="text-[#C4973F] text-2xl tracking-widest">★★★★★</div>
        <blockquote className="font-display font-black italic text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-[-0.03em] text-[#1A1814]">
          &ldquo;I went from missing half my evening enquiries to waking up with confirmed bookings. Lumio runs in the background and I don&apos;t have to think about it. It just works.&rdquo;
        </blockquote>
        <p className="text-sm font-semibold text-[#8A8278] tracking-wide uppercase">
          Sarah M. — Aesthetic Clinic Owner, London
        </p>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function CTA() {
  const [email, setEmail] = useState('');
  return (
    <section id="audit" className="relative bg-[#1A1814] py-28 px-4 overflow-hidden text-center">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[130px] opacity-10"
        style={{ background: '#C4973F' }} />
      <div className="relative mx-auto max-w-3xl flex flex-col items-center gap-8">
        <span className="text-xs font-bold uppercase tracking-[.2em] text-[#C4973F]">Free clinic audit</span>
        <h2 className="font-display font-black text-5xl md:text-7xl lg:text-8xl leading-[.88] tracking-[-0.04em] text-[#FFFDF8]">
          Find out exactly<br />how much you&apos;re <span className="italic gold-text">leaving.</span>
        </h2>
        <p className="text-[#8A8278] max-w-md text-base leading-relaxed">
          Free 30-minute call. We&apos;ll show you exactly where your clinic is losing leads and revenue — and what Lumio would do about it. No pressure. No pitch.
        </p>
        <div className="w-full max-w-md flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] backdrop-blur-xl px-2 py-2">
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder-white/30 px-4 outline-none"
          />
          <button
            className="rounded-full bg-[#C4973F] text-[#1A1814] text-sm font-bold px-5 py-2.5 hover:bg-[#E8B44B] transition-colors shrink-0"
            onClick={() => setEmail('')}
          >
            Book free audit →
          </button>
        </div>
        <p className="text-xs text-[#8A8278]">
          Or email us directly at{' '}
          <a href="mailto:hello@lumio.london" className="text-[#E8B44B] hover:text-[#F4D38A] transition-colors">
            hello@lumio.london
          </a>
        </p>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="bg-[#2E2B26] py-14 px-4">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-start justify-between gap-8">
        <div className="flex flex-col gap-3">
          <Logo small light />
          <p className="text-sm text-[#8A8278] max-w-xs">Work flows differently in the right light.</p>
          <p className="text-xs text-[#8A8278]">
            <a href="mailto:hello@lumio.london" className="hover:text-[#C4973F] transition-colors">hello@lumio.london</a>
            {' · '}
            <a href="https://lumio.london" className="hover:text-[#C4973F] transition-colors">lumio.london</a>
          </p>
        </div>
        <nav className="flex flex-col gap-3 text-sm text-[#8A8278]">
          {['Services', 'How it works', 'Pricing', 'Contact'].map((link) => (
            <a
              key={link}
              href={link === 'Contact' ? '#audit' : `#${link.toLowerCase().replace(/ /g, '-')}`}
              className="hover:text-[#C4973F] transition-colors"
            >
              {link}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

/* ─── Page ─── */
export default function Page() {
  return (
    <main>
      <CursorGlow />
      <Hero />
      <Marquee />
      <Stats />
      <Problem />
      <Services />
      <Process />
      <Pricing />
      <Testimonial />
      <CTA />
      <Footer />
    </main>
  );
}
