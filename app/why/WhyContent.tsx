'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

/* ─── Shared tokens ─────────────────────────────────────────────────────── */
const BG = '#0F0E0B';
const TEXT = '#FFFDF8';
const MUTED = 'rgba(250,247,242,0.45)';
const GOLD = '#C4973F';

/* ─── Reusable: fade-up section wrapper ─────────────────────────────────── */
function FadeSection({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      style={{
        maxWidth: '720px',
        margin: '0 auto',
        padding: '6rem 2rem',
        textAlign: 'center',
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Gold vertical divider ─────────────────────────────────────────────── */
function Divider() {
  return (
    <div
      style={{
        width: '1px',
        height: '60px',
        background: 'linear-gradient(to bottom, transparent, rgba(196,151,63,0.4), transparent)',
        margin: '0 auto',
      }}
    />
  );
}

/* ─── Section label ──────────────────────────────────────────────────────── */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-inter, Inter, sans-serif)',
        fontWeight: 600,
        fontSize: '10px',
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        color: GOLD,
        display: 'block',
        marginBottom: '1.25rem',
      }}
    >
      {children}
    </span>
  );
}

/* ─── Section heading ────────────────────────────────────────────────────── */
function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: 'var(--font-display, "Playfair Display", serif)',
        fontWeight: 700,
        fontSize: 'clamp(32px, 5vw, 52px)',
        color: TEXT,
        lineHeight: 1.1,
        margin: 0,
      }}
    >
      {children}
    </h2>
  );
}

/* ─── Section body ───────────────────────────────────────────────────────── */
function Body({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: 'var(--font-inter, Inter, sans-serif)',
        fontWeight: 400,
        fontSize: '18px',
        color: 'rgba(250,247,242,0.55)',
        lineHeight: 1.9,
        maxWidth: '520px',
        margin: '1.5rem auto 0',
      }}
    >
      {children}
    </div>
  );
}

/* ─── SVG illustrations ──────────────────────────────────────────────────── */
const SvgOpening = () => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '120px', margin: '0 auto 2rem', display: 'block' }}>
    <path d="M20 80 Q60 20 100 80" stroke="#C4973F" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <circle cx="60" cy="75" r="14" stroke="#C4973F" strokeWidth="1" opacity="0.5" />
    <circle cx="60" cy="68" r="5" fill="#C4973F" opacity="0.4" />
  </svg>
);

const SvgHowWeBuild = () => (
  <svg viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '160px', margin: '0 auto 2rem', display: 'block' }}>
    <line x1="80" y1="10" x2="80" y2="70" stroke="rgba(196,151,63,0.2)" strokeWidth="1" />
    <circle cx="20" cy="20" r="3" fill="#C4973F" opacity="0.25" />
    <circle cx="40" cy="15" r="2" fill="#C4973F" opacity="0.2" />
    <circle cx="30" cy="40" r="4" fill="#C4973F" opacity="0.2" />
    <circle cx="55" cy="30" r="2" fill="#C4973F" opacity="0.15" />
    <circle cx="15" cy="55" r="3" fill="#C4973F" opacity="0.2" />
    <circle cx="45" cy="58" r="2" fill="#C4973F" opacity="0.18" />
    <circle cx="60" cy="50" r="3" fill="#C4973F" opacity="0.15" />
    <line x1="20" y1="20" x2="40" y2="15" stroke="#C4973F" strokeWidth="0.5" opacity="0.2" />
    <line x1="30" y1="40" x2="55" y2="30" stroke="#C4973F" strokeWidth="0.5" opacity="0.15" />
    <line x1="15" y1="55" x2="45" y2="58" stroke="#C4973F" strokeWidth="0.5" opacity="0.15" />
    <circle cx="100" cy="20" r="4" fill="#C4973F" opacity="0.6" />
    <circle cx="125" cy="45" r="4" fill="#C4973F" opacity="0.5" />
    <circle cx="100" cy="65" r="4" fill="#C4973F" opacity="0.55" />
    <line x1="100" y1="20" x2="125" y2="45" stroke="#C4973F" strokeWidth="1" opacity="0.4" />
    <line x1="125" y1="45" x2="100" y2="65" stroke="#C4973F" strokeWidth="1" opacity="0.4" />
  </svg>
);

const SvgTree = () => (
  <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100px', margin: '0 auto 2rem', display: 'block' }}>
    <line x1="50" y1="60" x2="50" y2="85" stroke="#C4973F" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    <line x1="50" y1="60" x2="30" y2="40" stroke="#C4973F" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <line x1="50" y1="60" x2="70" y2="40" stroke="#C4973F" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <line x1="50" y1="70" x2="25" y2="55" stroke="#C4973F" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
    <line x1="50" y1="70" x2="75" y2="55" stroke="#C4973F" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
    <line x1="30" y1="40" x2="22" y2="25" stroke="#C4973F" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
    <line x1="30" y1="40" x2="38" y2="24" stroke="#C4973F" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
    <line x1="70" y1="40" x2="62" y2="24" stroke="#C4973F" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
    <line x1="70" y1="40" x2="78" y2="25" stroke="#C4973F" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
    <line x1="50" y1="85" x2="30" y2="105" stroke="#C4973F" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    <line x1="50" y1="85" x2="70" y2="105" stroke="#C4973F" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    <line x1="50" y1="85" x2="50" y2="110" stroke="#C4973F" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
    <line x1="30" y1="105" x2="18" y2="115" stroke="#C4973F" strokeWidth="0.7" strokeLinecap="round" opacity="0.35" />
    <line x1="70" y1="105" x2="82" y2="115" stroke="#C4973F" strokeWidth="0.7" strokeLinecap="round" opacity="0.35" />
  </svg>
);

const SvgHorizon = () => (
  <svg viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '200px', margin: '0 auto 2rem', display: 'block' }}>
    <line x1="0" y1="55" x2="200" y2="55" stroke="rgba(196,151,63,0.25)" strokeWidth="1" />
    <circle cx="60" cy="45" r="2.5" fill="#C4973F" opacity="0.4" />
    <circle cx="100" cy="38" r="3.5" fill="#C4973F" opacity="0.6" />
    <circle cx="140" cy="45" r="2.5" fill="#C4973F" opacity="0.4" />
    <circle cx="80" cy="48" r="1.5" fill="#C4973F" opacity="0.3" />
    <circle cx="120" cy="48" r="1.5" fill="#C4973F" opacity="0.3" />
    <circle cx="100" cy="38" r="8" stroke="#C4973F" strokeWidth="0.5" opacity="0.2" />
  </svg>
);

const SvgConnected = () => (
  <svg viewBox="0 0 180 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '180px', margin: '0 auto 2rem', display: 'block' }}>
    <circle cx="90" cy="50" r="6" fill="#C4973F" opacity="0.7" />
    <circle cx="40" cy="30" r="4" fill="#C4973F" opacity="0.4" />
    <circle cx="140" cy="30" r="4" fill="#C4973F" opacity="0.4" />
    <circle cx="30" cy="70" r="3" fill="#C4973F" opacity="0.3" />
    <circle cx="150" cy="70" r="3" fill="#C4973F" opacity="0.3" />
    <circle cx="90" cy="15" r="3" fill="#C4973F" opacity="0.3" />
    <line x1="90" y1="50" x2="40" y2="30" stroke="#C4973F" strokeWidth="0.8" opacity="0.25" />
    <line x1="90" y1="50" x2="140" y2="30" stroke="#C4973F" strokeWidth="0.8" opacity="0.25" />
    <line x1="90" y1="50" x2="30" y2="70" stroke="#C4973F" strokeWidth="0.8" opacity="0.2" />
    <line x1="90" y1="50" x2="150" y2="70" stroke="#C4973F" strokeWidth="0.8" opacity="0.2" />
    <line x1="90" y1="50" x2="90" y2="15" stroke="#C4973F" strokeWidth="0.8" opacity="0.2" />
  </svg>
);

const SvgGlow = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '80px', margin: '0 auto 2rem', display: 'block' }}>
    <circle cx="40" cy="40" r="35" stroke="#C4973F" strokeWidth="0.5" opacity="0.2" />
    <circle cx="40" cy="40" r="20" stroke="#C4973F" strokeWidth="0.5" opacity="0.35" />
    <circle cx="40" cy="40" r="8" fill="#C4973F" opacity="0.6" />
  </svg>
);

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function WhyContent() {
  return (
    <div style={{ background: BG, minHeight: '100vh', color: TEXT }}>

      {/* Nav */}
      <nav style={{ padding: '2rem' }}>
        <span
          style={{
            fontFamily: 'var(--font-display, "Playfair Display", serif)',
            fontStyle: 'italic',
            fontWeight: 700,
            fontSize: '16px',
            color: 'rgba(250,247,242,0.5)',
          }}
        >
          Built with purpose.
        </span>
      </nav>

      {/* Section 1 — Opening */}
      <FadeSection>
        <SvgOpening />
        <Label>Why we build</Label>
        <Heading>We believe people deserve more.</Heading>
        <Body>
          <p>More time. More clarity. More space to actually enjoy the life they&apos;re building.</p>
          <p style={{ marginTop: '1.2rem' }}>
            That belief sits at the centre of everything we make.
          </p>
        </Body>
      </FadeSection>

      <Divider />

      {/* Section 2 — How we build */}
      <FadeSection>
        <SvgHowWeBuild />
        <Heading>Most technology asks more of you than it gives back.</Heading>
        <Body>
          <p>We build differently.</p>
          <p style={{ marginTop: '1.2rem' }}>
            Every product we create starts with one question: does this genuinely make
            someone&apos;s life better? Not just more efficient. Better.
          </p>
          <p style={{ marginTop: '1.2rem' }}>
            If the answer isn&apos;t clearly yes — we don&apos;t build it.
          </p>
        </Body>
      </FadeSection>

      <Divider />

      {/* Section 3 — What your money supports */}
      <FadeSection>
        <SvgTree />
        <Heading>What your investment supports.</Heading>
        <Body>
          <p>
            When you invest in any of our products, you&apos;re contributing to something
            larger than the product itself.
          </p>
          <p style={{ marginTop: '1.2rem' }}>
            A portion of every subscription goes toward building technology infrastructure
            that serves people — not just businesses.
          </p>
          <p style={{ marginTop: '1.2rem' }}>
            Tools that give independent people access to what was previously only available
            to large organisations. Quietly. Deliberately. From the ground up.
          </p>
        </Body>
      </FadeSection>

      <Divider />

      {/* Section 4 — The vision */}
      <FadeSection>
        <SvgHorizon />
        <Heading>The world we&apos;re working toward.</Heading>
        <Body>
          <p>
            One where technology handles the mechanical — so people can focus on the meaningful.
          </p>
          <p style={{ marginTop: '1.2rem' }}>Where your time is genuinely yours.</p>
          <p style={{ marginTop: '1.2rem' }}>
            Where what you earn reflects what you genuinely contribute — not the
            circumstances you were born into.
          </p>
          <p style={{ marginTop: '1.2rem' }}>
            We&apos;re not there yet. But every product we ship is a step in that direction.
          </p>
        </Body>
      </FadeSection>

      <Divider />

      {/* Section 5 — What's being built */}
      <FadeSection>
        <SvgConnected />
        <Heading>This is just the beginning.</Heading>
        <Body>
          <p>
            We&apos;re building a collection of tools — each one solving a real problem for
            real people.
          </p>
          <p style={{ marginTop: '1.2rem' }}>
            Some are live. Some are in development. All of them connect toward the same
            larger purpose.
          </p>
          <p style={{ marginTop: '1.2rem' }}>The full picture will reveal itself over time.</p>
          <p style={{ marginTop: '1.2rem' }}>For now — what you see is just the start.</p>
        </Body>
      </FadeSection>

      <Divider />

      {/* Section 6 — Who we are */}
      <FadeSection>
        <SvgGlow />
        <Heading>
          Independently built.{' '}
          <br />
          Intentionally human.
        </Heading>
        <Body>
          <p>We&apos;re a small self-funded team.</p>
          <p style={{ marginTop: '1.2rem' }}>
            No investors to answer to. No growth targets to hit at the expense of the
            people we serve.
          </p>
          <p style={{ marginTop: '1.2rem' }}>
            Just people building things they genuinely believe in — for people who deserve
            better tools.
          </p>
          <p style={{ marginTop: '1.2rem' }}>Thank you for being part of it.</p>
        </Body>
      </FadeSection>

      <Divider />

      {/* Section 7 — Close */}
      <FadeSection style={{ padding: '8rem 2rem' }}>
        <p
          style={{
            fontFamily: 'var(--font-display, "Playfair Display", serif)',
            fontStyle: 'italic',
            fontWeight: 700,
            fontSize: 'clamp(24px, 3.5vw, 40px)',
            color: TEXT,
            maxWidth: '560px',
            margin: '0 auto',
            lineHeight: 1.2,
          }}
        >
          If any of this resonates —<br />
          you&apos;re already where you need to be.
        </p>

        {/* Short gold rule */}
        <div
          style={{
            width: '40px',
            height: '1px',
            background: GOLD,
            margin: '2rem auto',
          }}
        />

        {/* CTA button */}
        <Link
          href="/"
          style={{
            display: 'inline-block',
            border: `1px solid rgba(196,151,63,0.4)`,
            background: GOLD,
            color: '#0F0E0B',
            borderRadius: '99px',
            padding: '14px 32px',
            fontFamily: 'var(--font-inter, Inter, sans-serif)',
            fontWeight: 600,
            fontSize: '15px',
            textDecoration: 'none',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          See what we&apos;re building →
        </Link>

        {/* Sub-label */}
        <p
          style={{
            fontFamily: 'var(--font-inter, Inter, sans-serif)',
            fontWeight: 400,
            fontSize: '13px',
            color: MUTED,
            marginTop: '1.5rem',
          }}
        >
          Or explore one of our products:
        </p>

        {/* Product links */}
        <p
          style={{
            fontFamily: 'var(--font-inter, Inter, sans-serif)',
            fontWeight: 400,
            fontSize: '14px',
            color: MUTED,
            marginTop: '0.75rem',
          }}
        >
          <Link
            href="/"
            style={{ color: 'rgba(196,151,63,0.7)', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(196,151,63,0.7)')}
          >
            Lumio
          </Link>
          {' · '}
          <span style={{ color: 'rgba(250,247,242,0.25)' }}>Lighthouse</span>
          {' · '}
          <span style={{ color: 'rgba(250,247,242,0.2)' }}>More coming</span>
        </p>
      </FadeSection>

      {/* Footer */}
      <footer
        style={{
          padding: '3rem 2rem',
          textAlign: 'center',
          borderTop: 'rgba(196,151,63,0.08) 1px solid',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-inter, Inter, sans-serif)',
            fontWeight: 400,
            fontSize: '13px',
            color: MUTED,
          }}
        >
          © 2026 — All rights reserved.
        </p>
      </footer>
    </div>
  );
}
