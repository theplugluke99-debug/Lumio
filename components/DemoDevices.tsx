'use client';

import GoldButton from '@/components/ui/GoldButton';
import LumiLens from '@/components/LumiLens';
import Logo from '@/components/ui/Logo';

/* ─── Laptop dashboard UI ────────────────────────────────────────────── */
function DashboardUI() {
  const metrics = [
    { bg: '#F9EDE8', value: '31',     label: 'Leads captured',  trend: '+18%',       tc: '#5B8A68', arrow: '↑' },
    { bg: '#F0EDF8', value: '19',     label: 'Bookings by AI',  trend: 'AI handled', tc: '#C4973F', arrow: '↑' },
    { bg: '#EDF4EE', value: '2',      label: 'No-shows',        trend: '-77%',       tc: '#5B8A68', arrow: '↓' },
    { bg: '#F2DDD8', value: '£4,800', label: 'Pipeline value',  trend: 'Live',       tc: '#C4973F', arrow: '↑' },
  ];
  const feed = [
    { t: 'DM answered',            d: 'Instagram · Lip filler → booking' },
    { t: 'Booking confirmed by AI', d: '27 May at 11:00am' },
    { t: 'Appointment reminder',    d: "WhatsApp · Tomorrow's treatment" },
    { t: 'Review requested',        d: 'Botox · 3 days post-treatment' },
    { t: 'Aftercare sent',          d: 'Lip filler · +44 7700 900456' },
  ];
  const bars = [
    { label: 'Lead response',     w: 98  },
    { label: 'Reminders',         w: 100 },
    { label: 'Rebooking rate',    w: 74, amber: true },
    { label: 'Review generation', w: 81  },
  ];

  return (
    <div style={{ display: 'flex', height: '100%', background: '#0F0E0B', fontFamily: 'Inter, system-ui, sans-serif', overflow: 'hidden' }}>
      {/* Sidebar */}
      <div style={{ width: 160, background: '#0A0907', borderRight: '1px solid rgba(255,253,248,0.06)', display: 'flex', flexDirection: 'column', padding: '18px 10px', flexShrink: 0 }}>
        <div style={{ marginBottom: 20 }}><Logo light width={58} /></div>
        {['Overview','Live activity','Conversations','Clients','My Style','Integrations'].map((label, i) => (
          <div key={label} style={{ padding: '6px 9px', borderRadius: 7, marginBottom: 2, background: i === 0 ? 'rgba(196,151,63,0.14)' : 'transparent', fontSize: 10, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? '#C4973F' : 'rgba(255,253,248,0.35)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: i === 0 ? '#C4973F' : 'rgba(255,253,248,0.12)', flexShrink: 0 }} />
            {label}
          </div>
        ))}
        <div style={{ marginTop: 'auto', padding: '8px', background: 'rgba(196,151,63,0.1)', borderRadius: 8, border: '1px solid rgba(196,151,63,0.18)', fontSize: 10, fontWeight: 700, color: '#C4973F', textAlign: 'center' }}>Ask Lumi</div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 14px', minWidth: 0 }}>
        {/* Header */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C4973F', marginBottom: 2 }}>Overview</div>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#FFFDF8', letterSpacing: '-0.03em', lineHeight: 1 }}>Clinic command centre</div>
        </div>
        {/* 2×2 metric grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 10 }}>
          {metrics.map(m => (
            <div key={m.label} style={{ background: m.bg, borderRadius: 10, padding: '9px 10px', position: 'relative', overflow: 'hidden', minHeight: 64 }}>
              <div style={{ position: 'absolute', top: 6, right: 8, fontSize: 18, fontWeight: 900, color: m.tc, opacity: 0.6 }}>{m.arrow}</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#1A1814', lineHeight: 1 }}>{m.value}</div>
              <div style={{ fontSize: 8, fontWeight: 700, color: '#6B6259', marginTop: 3, lineHeight: 1.3 }}>{m.label}</div>
              <div style={{ fontSize: 7, fontWeight: 700, color: m.tc, marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{m.trend}</div>
            </div>
          ))}
        </div>
        {/* Lower panels */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 6 }}>
          <div style={{ background: 'rgba(255,253,248,0.04)', border: '1px solid rgba(255,253,248,0.07)', borderRadius: 10, padding: '9px 10px' }}>
            <div style={{ fontSize: 9, fontWeight: 800, color: '#FFFDF8', marginBottom: 7, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Today&apos;s activity</span>
              <span style={{ fontSize: 7, background: 'rgba(196,151,63,0.18)', color: '#C4973F', borderRadius: 99, padding: '2px 6px', fontWeight: 700 }}>Live</span>
            </div>
            {feed.map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: 6, padding: '4px 0', borderTop: i === 0 ? 'none' : '1px solid rgba(255,253,248,0.05)' }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#C4973F', flexShrink: 0, marginTop: 3 }} />
                <div>
                  <div style={{ fontSize: 8, fontWeight: 700, color: '#FFFDF8' }}>{f.t}</div>
                  <div style={{ fontSize: 7, color: 'rgba(255,253,248,0.35)' }}>{f.d}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: 'rgba(255,253,248,0.04)', border: '1px solid rgba(255,253,248,0.07)', borderRadius: 10, padding: '9px 10px' }}>
            <div style={{ fontSize: 9, fontWeight: 800, color: '#FFFDF8', marginBottom: 8 }}>Automation health</div>
            {bars.map(b => (
              <div key={b.label} style={{ marginBottom: 7 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 7, fontWeight: 600, color: 'rgba(255,253,248,0.45)', marginBottom: 3 }}>
                  <span>{b.label}</span><span>{b.w}%</span>
                </div>
                <div style={{ height: 3, background: 'rgba(255,253,248,0.08)', borderRadius: 99 }}>
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

/* ─── Phone UI ───────────────────────────────────────────────────────── */
function PhoneUI() {
  const metrics = [
    { bg: '#F9EDE8', value: '31',     label: 'Leads'    },
    { bg: '#F0EDF8', value: '19',     label: 'Bookings' },
    { bg: '#EDF4EE', value: '2',      label: 'No-shows' },
    { bg: '#F2DDD8', value: '£4,800', label: 'Pipeline' },
  ];
  return (
    <div style={{ height: '100%', background: '#FFFDF8', fontFamily: 'Inter, system-ui, sans-serif', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ background: 'rgba(255,253,248,0.95)', borderBottom: '1px solid rgba(26,24,20,0.07)', padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#5B8A68' }} />
          <span style={{ fontSize: 10, fontWeight: 700, color: '#1A1814' }}>Glow Aesthetics</span>
        </div>
        <div style={{ fontSize: 8, background: '#EDF4EE', color: '#5B8A68', borderRadius: 99, padding: '2px 7px', fontWeight: 700 }}>Live</div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '10px 10px 0' }}>
        <div style={{ background: '#1A1814', borderRadius: 12, padding: '12px', marginBottom: 10, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 80, height: 80, borderRadius: '50%', background: 'rgba(196,151,63,0.25)', filter: 'blur(25px)' }} />
          <div style={{ fontSize: 7, fontWeight: 700, letterSpacing: '0.14em', color: '#E8B44B', marginBottom: 4, textTransform: 'uppercase' }}>THIS WEEK</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
            {metrics.map(m => (
              <div key={m.label} style={{ background: m.bg, borderRadius: 8, padding: '7px 8px' }}>
                <div style={{ fontSize: 14, fontWeight: 900, color: '#1A1814', lineHeight: 1 }}>{m.value}</div>
                <div style={{ fontSize: 7, fontWeight: 600, color: '#6B6259', marginTop: 2 }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ fontSize: 7, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C4973F', marginBottom: 5 }}>LUMI SUGGESTS</div>
        {[
          { dot: '#C4973F', t: 'Sophie needs a rebooking nudge', d: '7 weeks since last visit' },
          { dot: '#5B8A68', t: '3 clients haven\'t reviewed yet', d: 'All treated in last 10 days' },
        ].map((c, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.72)', border: '1px solid rgba(26,24,20,0.07)', borderRadius: 9, padding: '8px 9px', marginBottom: 6, display: 'flex', gap: 7 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: c.dot, marginTop: 3, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, color: '#1A1814', lineHeight: 1.3 }}>{c.t}</div>
              <div style={{ fontSize: 8, color: '#8A8278', marginTop: 1 }}>{c.d}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ background: 'rgba(255,253,248,0.95)', borderTop: '1px solid rgba(26,24,20,0.07)', display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', padding: '6px 0 8px', flexShrink: 0 }}>
        {['Home','Activity','lens','Chats','More'].map((label, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, fontSize: i === 2 ? 12 : 7, fontWeight: i === 2 ? 900 : 700, color: i === 0 ? '#C4973F' : 'rgba(26,24,20,0.3)' }}>
            {label === 'lens' ? <LumiLens size={18} variant="dark" /> : label}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Laptop shell ───────────────────────────────────────────────────── */
function Laptop() {
  return (
    <div style={{ width: '100%', transformOrigin: 'bottom center', willChange: 'transform', position: 'relative' }}>
      {/* Glow */}
      <div aria-hidden style={{ position: 'absolute', top: '8%', left: '50%', transform: 'translateX(-50%)', width: '70%', height: '55%', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(196,151,63,0.18) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Screen shell */}
        <div style={{ width: '100%', aspectRatio: '16/10', background: 'linear-gradient(160deg,#2C2C2E 0%,#1C1C1E 60%,#141416 100%)', borderRadius: '10px 10px 3px 3px', padding: '9px 9px 7px', boxShadow: '0 0 0 1px rgba(255,255,255,0.09),inset 0 1px 0 rgba(255,255,255,0.13),0 30px 80px rgba(0,0,0,0.7),0 15px 30px rgba(0,0,0,0.5)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: '5%', right: '5%', height: 1, background: 'rgba(255,255,255,0.16)' }} />
          <div style={{ position: 'absolute', top: 4, left: '50%', transform: 'translateX(-50%)', width: 5, height: 5, borderRadius: '50%', background: '#1A1A1C', boxShadow: 'inset 0 0 2px rgba(255,255,255,0.15)' }} />
          <div style={{ width: '100%', height: '100%', background: '#0F0E0B', borderRadius: 3, overflow: 'hidden', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.5)' }}>
            <DashboardUI />
          </div>
        </div>
        {/* Hinge */}
        <div style={{ height: 4, background: 'linear-gradient(90deg,#1A1A1C,#2C2C2E 20%,#3A3A3C 50%,#2C2C2E 80%,#1A1A1C)', boxShadow: '0 2px 5px rgba(0,0,0,0.55)' }} />
        {/* Base */}
        <div style={{ height: 20, background: 'linear-gradient(180deg,#2C2C2E 0%,#242426 100%)', borderRadius: '0 0 8px 8px', boxShadow: '0 0 0 1px rgba(255,255,255,0.06),0 10px 35px rgba(0,0,0,0.55),0 4px 10px rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '20%', height: 9, background: 'rgba(255,255,255,0.04)', borderRadius: 3, border: '1px solid rgba(255,255,255,0.05)' }} />
        </div>
        {/* Shadow */}
        <div style={{ height: 8, background: 'linear-gradient(to bottom,rgba(0,0,0,0.3) 0%,transparent 100%)', borderRadius: '0 0 60% 60%', marginTop: 2 }} />
      </div>
    </div>
  );
}

/* ─── Phone shell ────────────────────────────────────────────────────── */
function Phone() {
  return (
    <div style={{ width: 210, flexShrink: 0, alignSelf: 'flex-end', transformOrigin: 'center center', willChange: 'transform', position: 'relative', marginBottom: 28 }}>
      {/* Glow */}
      <div aria-hidden style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '130%', height: '70%', borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(196,151,63,0.14) 0%,transparent 70%)', filter: 'blur(30px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'relative', zIndex: 1, background: 'linear-gradient(150deg,#2C2C2E 0%,#1C1C1E 50%,#141416 100%)', borderRadius: 34, padding: '9px 7px', boxShadow: '0 0 0 1px rgba(255,255,255,0.11),inset 0 1px 0 rgba(255,255,255,0.15),0 35px 70px rgba(0,0,0,0.6),0 15px 35px rgba(0,0,0,0.4)' }}>
        {/* Left buttons */}
        <div style={{ position: 'absolute', left: -3, top: '18%', width: 3, height: 24, background: '#2C2C2E', borderRadius: '2px 0 0 2px' }} />
        <div style={{ position: 'absolute', left: -3, top: '27%', width: 3, height: 40, background: '#2C2C2E', borderRadius: '2px 0 0 2px' }} />
        <div style={{ position: 'absolute', left: -3, top: '37%', width: 3, height: 40, background: '#2C2C2E', borderRadius: '2px 0 0 2px' }} />
        {/* Right button */}
        <div style={{ position: 'absolute', right: -3, top: '27%', width: 3, height: 52, background: '#2C2C2E', borderRadius: '0 2px 2px 0' }} />
        {/* Screen */}
        <div style={{ background: '#FFFDF8', borderRadius: 26, overflow: 'hidden', aspectRatio: '9/19.5', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.25)', position: 'relative' }}>
          {/* Dynamic island */}
          <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', width: 66, height: 20, background: '#0F0E0B', borderRadius: 99, zIndex: 10, boxShadow: '0 2px 6px rgba(0,0,0,0.35)' }} />
          {/* Content below island */}
          <div style={{ paddingTop: 35, height: '100%', boxSizing: 'border-box' }}>
            <PhoneUI />
          </div>
          {/* Reflection */}
          <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(255,255,255,0.05) 0%,transparent 50%)', borderRadius: 26, pointerEvents: 'none' }} />
        </div>
      </div>
      <div style={{ height: 10, background: 'radial-gradient(ellipse at 50% 0%,rgba(0,0,0,0.35) 0%,transparent 70%)', marginTop: 4 }} />
    </div>
  );
}

/* ─── Main export ────────────────────────────────────────────────────── */
export default function DemoDevices() {
  return (
    <section style={{ background: '#111009', paddingTop: 'clamp(5rem,8vw,8rem)', paddingBottom: 'clamp(6rem,10vw,10rem)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(1.5rem,4vw,2.5rem)' }}>

        {/* Headline */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem,5vw,5rem)' }}>
          <p style={{ fontFamily: 'var(--font-sans,Syne,sans-serif)', fontSize: 11, fontWeight: 800, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C4973F', margin: '0 0 1.5rem' }}>
            Live Demo
          </p>
          <h2 style={{ fontFamily: 'var(--font-display,Georgia,serif)', fontWeight: 700, fontSize: 'clamp(40px,6.5vw,90px)', lineHeight: 0.93, letterSpacing: '-0.03em', color: '#FFFDF8', margin: '0 auto', maxWidth: 900 }}>
            See your clinic<br />
            <em style={{ background: 'linear-gradient(135deg,#C4973F 0%,#E8B44B 55%,#C4973F 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              running itself.
            </em>
          </h2>
          <p style={{ fontFamily: 'var(--font-sans,Syne,sans-serif)', fontSize: 17, lineHeight: 1.8, color: 'rgba(250,247,242,0.5)', maxWidth: 580, margin: '1.75rem auto 0' }}>
            Real-time dashboard. Intelligent automation. Measurable results.
          </p>
        </div>

        {/* Devices — laptop + phone side by side on desktop, stacked on mobile */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'center', gap: 'clamp(1.5rem,4vw,3.5rem)', position: 'relative' }}>
          {/* Global glow */}
          <div aria-hidden style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '65%', height: '55%', background: 'radial-gradient(ellipse,rgba(196,151,63,0.1) 0%,transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
          {/* Laptop — takes remaining width */}
          <div style={{ flex: '1 1 320px', minWidth: 0, maxWidth: 760, zIndex: 1 }}>
            <Laptop />
          </div>
          {/* Phone — fixed width, hidden on very small screens */}
          <div style={{ flexShrink: 0, zIndex: 2 }}>
            <Phone />
          </div>
        </div>

        {/* CTAs */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(2.5rem,4vw,4rem)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <GoldButton href="/demo" large>Explore the live demo</GoldButton>
            <a
              href="/audit"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, borderRadius: 999, border: '1px solid rgba(255,253,248,0.18)', padding: '14px 28px', fontFamily: 'var(--font-inter,Inter,sans-serif)', fontWeight: 600, fontSize: 15, color: 'rgba(255,253,248,0.65)', textDecoration: 'none', transition: 'border-color 200ms, color 200ms' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(196,151,63,0.4)'; (e.currentTarget as HTMLElement).style.color = '#C4973F'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,253,248,0.18)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,253,248,0.65)'; }}
            >
              Get my free Revenue Reveal →
            </a>
          </div>
          <p style={{ fontFamily: 'var(--font-inter,Inter,sans-serif)', fontSize: 13, color: 'rgba(255,253,248,0.28)' }}>
            Customise it with your clinic name. No signup required.
          </p>
        </div>

      </div>
    </section>
  );
}
