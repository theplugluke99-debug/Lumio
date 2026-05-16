'use client';

import { motion } from 'framer-motion';
import GoldButton from '@/components/ui/GoldButton';

const ease = [0.25, 0.1, 0.25, 1] as const;
const fadeUp = { hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } } };

/* ─── Inline dashboard UI for laptop screen ─── */
function DashboardPreview() {
  const metrics = [
    { bg: '#F9EDE8', value: '31', label: 'Leads captured', trend: '+18%', tc: '#5B8A68', arrow: '↑' },
    { bg: '#F0EDF8', value: '19', label: 'Bookings by AI', trend: 'AI handled', tc: '#C4973F', arrow: '↑' },
    { bg: '#EDF4EE', value: '2', label: 'No-shows', trend: '-77%', tc: '#5B8A68', arrow: '↓' },
    { bg: '#F2DDD8', value: '£4,800', label: 'Pipeline value', trend: 'Live tracking', tc: '#C4973F', arrow: '↑' },
  ];
  const feed = [
    { t: 'DM answered', d: 'Instagram · Lip filler → booking' },
    { t: 'Booking confirmed by AI', d: '27 May at 11:00am' },
    { t: 'Appointment reminder sent', d: "WhatsApp · Tomorrow's treatment" },
    { t: 'Review requested', d: 'Botox · 3 days post-treatment' },
    { t: 'Aftercare sent', d: 'Lip filler · Client +44 7700 900456' },
  ];
  const bars = [
    { label: 'Lead response', w: 98 }, { label: 'Reminder delivery', w: 100 },
    { label: 'Rebooking rate', w: 74, amber: true }, { label: 'Review generation', w: 81 },
  ];
  return (
    <div style={{ display: 'flex', height: '100%', background: '#0F0E0B', fontFamily: 'Inter, system-ui, sans-serif', overflow: 'hidden' }}>
      {/* Sidebar */}
      <div style={{ width: 180, background: 'rgba(20,18,14,0.98)', borderRight: '1px solid rgba(255,253,248,0.07)', display: 'flex', flexDirection: 'column', padding: '20px 12px', flexShrink: 0 }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 900, color: '#C4973F', letterSpacing: '-0.02em' }}>lumio</div>
        </div>
        {[
          { label: 'Overview', active: true },
          { label: 'Live activity', active: false },
          { label: 'Conversations', active: false },
          { label: 'Clients', active: false },
          { label: 'My Style', active: false },
          { label: 'Integrations', active: false },
        ].map(item => (
          <div key={item.label} style={{ padding: '7px 10px', borderRadius: 8, marginBottom: 2, background: item.active ? 'rgba(196,151,63,0.14)' : 'transparent', fontSize: 11, fontWeight: item.active ? 700 : 500, color: item.active ? '#C4973F' : 'rgba(255,253,248,0.38)', display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: item.active ? '#C4973F' : 'rgba(255,253,248,0.15)', flexShrink: 0 }} />
            {item.label}
          </div>
        ))}
        <div style={{ marginTop: 'auto', padding: '10px', background: 'rgba(196,151,63,0.1)', borderRadius: 10, border: '1px solid rgba(196,151,63,0.2)', fontSize: 11, fontWeight: 700, color: '#C4973F', textAlign: 'center' }}>
          Ask Lumi ✦
        </div>
      </div>
      {/* Main */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 18px', minWidth: 0 }}>
        {/* Header */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C4973F', marginBottom: 3 }}>Overview</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: '#FFFDF8', letterSpacing: '-0.03em', lineHeight: 1 }}>Clinic command centre</div>
          <div style={{ fontSize: 9, color: 'rgba(255,253,248,0.45)', marginTop: 3 }}>A live view of what Lumio has captured, handled, and protected this week.</div>
        </div>
        {/* Metrics 2×2 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
          {metrics.map(m => (
            <div key={m.label} style={{ background: m.bg, borderRadius: 12, padding: '10px 12px', position: 'relative', overflow: 'hidden', minHeight: 72 }}>
              <div style={{ position: 'absolute', top: 8, right: 10, fontSize: 20, fontWeight: 900, color: m.tc, opacity: 0.7 }}>{m.arrow}</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#1A1814', lineHeight: 1 }}>{m.value}</div>
              <div style={{ fontSize: 9, fontWeight: 700, color: '#6B6259', marginTop: 3, lineHeight: 1.3 }}>{m.label}</div>
              <div style={{ fontSize: 8, fontWeight: 700, color: m.tc, marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{m.trend}</div>
            </div>
          ))}
        </div>
        {/* Lower two panels */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 8 }}>
          {/* Activity feed */}
          <div style={{ background: 'rgba(255,253,248,0.04)', border: '1px solid rgba(255,253,248,0.07)', borderRadius: 12, padding: '10px 12px' }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: '#FFFDF8', marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Today&apos;s activity</span>
              <span style={{ fontSize: 8, background: 'rgba(196,151,63,0.2)', color: '#C4973F', borderRadius: 99, padding: '2px 7px', fontWeight: 700 }}>Live</span>
            </div>
            {feed.map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, padding: '5px 0', borderTop: i === 0 ? 'none' : '1px solid rgba(255,253,248,0.05)' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#C4973F', flexShrink: 0, marginTop: 3 }} />
                <div>
                  <div style={{ fontSize: 9, fontWeight: 700, color: '#FFFDF8' }}>{f.t}</div>
                  <div style={{ fontSize: 8, color: 'rgba(255,253,248,0.38)' }}>{f.d}</div>
                </div>
              </div>
            ))}
          </div>
          {/* Automation health */}
          <div style={{ background: 'rgba(255,253,248,0.04)', border: '1px solid rgba(255,253,248,0.07)', borderRadius: 12, padding: '10px 12px' }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: '#FFFDF8', marginBottom: 10 }}>Automation health</div>
            {bars.map(b => (
              <div key={b.label} style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 8, fontWeight: 600, color: 'rgba(255,253,248,0.55)', marginBottom: 4 }}>
                  <span>{b.label}</span><span>{b.w}%</span>
                </div>
                <div style={{ height: 4, background: 'rgba(255,253,248,0.08)', borderRadius: 99 }}>
                  <div style={{ width: `${b.w}%`, height: '100%', background: b.amber ? '#E8B44B' : '#C4973F', borderRadius: 99 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Inline mobile UI for phone screen ─── */
function PhoneUI() {
  const metrics = [
    { bg: '#F9EDE8', value: '31', label: 'Leads' },
    { bg: '#F0EDF8', value: '19', label: 'Bookings' },
    { bg: '#EDF4EE', value: '2', label: 'No-shows' },
    { bg: '#F2DDD8', value: '£4,800', label: 'Pipeline' },
  ];
  return (
    <div style={{ height: '100%', background: '#FFFDF8', fontFamily: 'Inter, system-ui, sans-serif', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Topbar */}
      <div style={{ background: 'rgba(255,253,248,0.95)', backdropFilter: 'blur(12px)', padding: '8px 14px', borderBottom: '1px solid rgba(26,24,20,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#5B8A68' }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: '#1A1814' }}>Glow Aesthetics</span>
        </div>
        <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#F0EDF8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 10, height: 10, borderRadius: 2, border: '1.5px solid #7C6B9A' }} />
        </div>
      </div>
      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 12px 0' }}>
        {/* Hero card */}
        <div style={{ background: '#1A1814', borderRadius: 14, padding: '14px', marginBottom: 12, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 90, height: 90, borderRadius: '50%', background: 'rgba(196,151,63,0.25)', filter: 'blur(30px)' }} />
          <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.14em', color: '#E8B44B', marginBottom: 4, textTransform: 'uppercase' }}>THIS WEEK</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {metrics.map(m => (
              <div key={m.label} style={{ background: m.bg, borderRadius: 9, padding: '8px 9px' }}>
                <div style={{ fontSize: 16, fontWeight: 900, color: '#1A1814', lineHeight: 1 }}>{m.value}</div>
                <div style={{ fontSize: 8, fontWeight: 600, color: '#6B6259', marginTop: 2 }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Lumi suggests */}
        <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C4973F', marginBottom: 6 }}>LUMI SUGGESTS</div>
        {[
          { dot: '#C4973F', t: 'Sophie needs a rebooking nudge', d: '7 weeks since last visit' },
          { dot: '#5B8A68', t: '3 clients haven\'t reviewed', d: 'All treated in last 10 days' },
        ].map((c, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.72)', border: '1px solid rgba(26,24,20,0.08)', borderRadius: 10, padding: '9px 10px', marginBottom: 7, display: 'flex', gap: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: c.dot, marginTop: 3, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#1A1814', lineHeight: 1.3 }}>{c.t}</div>
              <div style={{ fontSize: 9, color: '#8A8278', marginTop: 1 }}>{c.d}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Bottom nav */}
      <div style={{ background: 'rgba(255,253,248,0.95)', backdropFilter: 'blur(12px)', borderTop: '1px solid rgba(26,24,20,0.07)', display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', padding: '6px 0 8px', flexShrink: 0 }}>
        {['Home', 'Activity', '✦', 'Chats', 'More'].map((label, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, fontSize: i === 2 ? 14 : 7, fontWeight: i === 2 ? 900 : 700, color: i === 0 ? '#C4973F' : 'rgba(26,24,20,0.35)' }}>
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Laptop component ─── */
function Laptop() {
  return (
    <div
      className="relative w-full"
      style={{
        maxWidth: 900,
        transformOrigin: 'bottom center',
        willChange: 'transform',
        flexShrink: 0,
      }}
    >
      {/* Glow behind screen */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '60%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(196,151,63,0.22) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Screen assembly */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Screen shell — dark aluminium */}
        <div
          style={{
            width: '100%',
            aspectRatio: '16 / 10',
            background: 'linear-gradient(160deg, #2C2C2E 0%, #1C1C1E 60%, #141416 100%)',
            borderRadius: '12px 12px 4px 4px',
            padding: '10px 10px 8px',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.10), inset 0 1px 0 rgba(255,255,255,0.14), 0 40px 100px rgba(0,0,0,0.7), 0 20px 40px rgba(0,0,0,0.5)',
            position: 'relative',
          }}
        >
          {/* Top edge reflection */}
          <div style={{ position: 'absolute', top: 0, left: '5%', right: '5%', height: 1, background: 'rgba(255,255,255,0.18)', borderRadius: '0 0 2px 2px' }} />
          {/* Camera */}
          <div style={{ position: 'absolute', top: 4, left: '50%', transform: 'translateX(-50%)', width: 5, height: 5, borderRadius: '50%', background: '#1A1A1C', boxShadow: 'inset 0 0 2px rgba(255,255,255,0.2)' }} />
          {/* Screen */}
          <div
            style={{
              width: '100%',
              height: '100%',
              background: '#0F0E0B',
              borderRadius: '4px',
              overflow: 'hidden',
              boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.5)',
            }}
          >
            <DashboardPreview />
          </div>
        </div>

        {/* Hinge */}
        <div style={{ height: 4, background: 'linear-gradient(90deg, #1A1A1C, #2C2C2E 20%, #3A3A3C 50%, #2C2C2E 80%, #1A1A1C)', boxShadow: '0 2px 6px rgba(0,0,0,0.6)', zIndex: 2, position: 'relative' }} />

        {/* Keyboard base */}
        <div
          style={{
            height: 22,
            background: 'linear-gradient(180deg, #2C2C2E 0%, #242426 100%)',
            borderRadius: '0 0 10px 10px',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.07), 0 12px 40px rgba(0,0,0,0.6), 0 4px 12px rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Trackpad hint */}
          <div style={{ width: '22%', height: 10, background: 'rgba(255,255,255,0.04)', borderRadius: 3, border: '1px solid rgba(255,255,255,0.06)' }} />
        </div>

        {/* Ground shadow */}
        <div style={{ height: 8, background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 100%)', borderRadius: '0 0 60% 60%', marginTop: 2 }} />
      </div>
    </div>
  );
}

/* ─── Phone component ─── */
function Phone() {
  return (
    <div
      style={{
        width: 220,
        flexShrink: 0,
        alignSelf: 'flex-end',
        transformOrigin: 'center center',
        willChange: 'transform',
        position: 'relative',
        marginBottom: 30,
      }}
    >
      {/* Glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '120%',
          height: '70%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(196,151,63,0.18) 0%, transparent 70%)',
          filter: 'blur(30px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Phone shell */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          background: 'linear-gradient(150deg, #2C2C2E 0%, #1C1C1E 50%, #141416 100%)',
          borderRadius: 36,
          padding: '10px 8px',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.12), inset 0 1px 0 rgba(255,255,255,0.16), 0 40px 80px rgba(0,0,0,0.65), 0 20px 40px rgba(0,0,0,0.45)',
        }}
      >
        {/* Side buttons — left */}
        <div style={{ position: 'absolute', left: -3, top: '18%', width: 3, height: 26, background: '#2C2C2E', borderRadius: '2px 0 0 2px', boxShadow: '-1px 0 0 rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'absolute', left: -3, top: '26%', width: 3, height: 44, background: '#2C2C2E', borderRadius: '2px 0 0 2px', boxShadow: '-1px 0 0 rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'absolute', left: -3, top: '36%', width: 3, height: 44, background: '#2C2C2E', borderRadius: '2px 0 0 2px', boxShadow: '-1px 0 0 rgba(255,255,255,0.08)' }} />
        {/* Side button — right */}
        <div style={{ position: 'absolute', right: -3, top: '26%', width: 3, height: 56, background: '#2C2C2E', borderRadius: '0 2px 2px 0', boxShadow: '1px 0 0 rgba(255,255,255,0.08)' }} />

        {/* Screen area */}
        <div
          style={{
            background: '#FFFDF8',
            borderRadius: 28,
            overflow: 'hidden',
            aspectRatio: '9 / 19.5',
            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.3)',
            position: 'relative',
          }}
        >
          {/* Dynamic island */}
          <div
            style={{
              position: 'absolute',
              top: 9,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 72,
              height: 22,
              background: '#0F0E0B',
              borderRadius: 99,
              zIndex: 10,
              boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
            }}
          />
          {/* Content — pushed below dynamic island */}
          <div style={{ paddingTop: 38, height: '100%', boxSizing: 'border-box' }}>
            <PhoneUI />
          </div>
          {/* Reflection overlay */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)',
              borderRadius: 28,
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>

      {/* Ground shadow */}
      <div style={{ height: 12, background: 'radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0.4) 0%, transparent 70%)', marginTop: 4 }} />
    </div>
  );
}

/* ─── Main export ─── */
export default function ProductShowcase() {
  return (
    <section
      style={{
        background: '#111009',
        overflowX: 'clip',
        paddingTop: 'clamp(5rem, 8vw, 8rem)',
        paddingBottom: 'clamp(6rem, 10vw, 10rem)',
      }}
    >
      <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 clamp(1rem, 4vw, 3rem)' }}>

        {/* Top content */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 5vw, 5rem)' }}
        >
          <motion.span
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-sans, Syne, sans-serif)',
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#C4973F',
              display: 'block',
              marginBottom: '1.5rem',
            }}
          >
            Live Demo
          </motion.span>

          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-display, Georgia, serif)',
              fontWeight: 700,
              fontSize: 'clamp(42px, 7vw, 96px)',
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
              color: '#FFFDF8',
              maxWidth: 1000,
              margin: '0 auto',
            }}
          >
            See your clinic<br />
            <em style={{
              background: 'linear-gradient(135deg, #C4973F 0%, #E8B44B 60%, #C4973F 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontSize: 'clamp(46px, 7.5vw, 104px)',
            }}>
              running itself.
            </em>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-sans, Syne, sans-serif)',
              fontSize: 18,
              lineHeight: 1.8,
              color: 'rgba(250,247,242,0.55)',
              maxWidth: 620,
              margin: '2rem auto 0',
            }}
          >
            Real-time dashboard. Intelligent automation. Measurable results.
          </motion.p>
        </motion.div>

        {/* Device showcase */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-col md:flex-row items-center md:items-end justify-center"
          style={{ gap: 'clamp(1.5rem, 4vw, 4rem)', position: 'relative' }}
        >
          {/* Subtle radial glow behind everything */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: '20%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '70%',
              height: '60%',
              background: 'radial-gradient(ellipse, rgba(196,151,63,0.12) 0%, transparent 70%)',
              filter: 'blur(60px)',
              pointerEvents: 'none',
            }}
          />

          {/* Laptop */}
          <div className="w-full md:w-auto" style={{ maxWidth: 780, zIndex: 1 }}>
            <Laptop />
          </div>

          {/* Phone — hidden on small mobile, shown on md+ */}
          <div className="hidden md:block" style={{ zIndex: 2 }}>
            <Phone />
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          style={{ textAlign: 'center', marginTop: 'clamp(2.5rem, 4vw, 4rem)' }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <GoldButton href="/demo" large>Explore the live demo</GoldButton>
            <a
              href="/audit"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                borderRadius: 999,
                border: '1px solid rgba(255,253,248,0.18)',
                padding: '14px 28px',
                fontFamily: 'var(--font-inter, Inter, sans-serif)',
                fontWeight: 600,
                fontSize: 15,
                color: 'rgba(255,253,248,0.7)',
                textDecoration: 'none',
                transition: 'all 200ms',
                background: 'transparent',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(196,151,63,0.4)'; (e.currentTarget as HTMLElement).style.color = '#C4973F'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,253,248,0.18)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,253,248,0.7)'; }}
            >
              Get my free Revenue Reveal →
            </a>
          </div>
          <p
            style={{
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              fontSize: 13,
              color: 'rgba(255,253,248,0.3)',
            }}
          >
            Customise it with your clinic name. No signup required.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
