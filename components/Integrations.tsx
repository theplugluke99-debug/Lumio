'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  InstagramLogo, WhatsAppLogo, GoogleLogo, PhorestLogo, FreshaLogo, StripeLogo,
  CalendlyLogo, TreatwellLogo, FacesLogo, GmailLogo, FacebookLogo, TrustpilotLogo,
} from '@/components/logos/IntegrationLogos'

const ROW1 = [
  { Logo: InstagramLogo, name: 'Instagram' },
  { Logo: WhatsAppLogo, name: 'WhatsApp' },
  { Logo: GoogleLogo, name: 'Google' },
  { Logo: PhorestLogo, name: 'Phorest' },
  { Logo: FreshaLogo, name: 'Fresha' },
  { Logo: StripeLogo, name: 'Stripe' },
]

const ROW2 = [
  { Logo: CalendlyLogo, name: 'Calendly' },
  { Logo: TreatwellLogo, name: 'Treatwell' },
  { Logo: FacesLogo, name: 'Faces' },
  { Logo: GmailLogo, name: 'Gmail' },
  { Logo: FacebookLogo, name: 'Facebook' },
  { Logo: TrustpilotLogo, name: 'Trustpilot' },
]

export default function Integrations() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const itemVariant = (i: number) => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' as const },
    },
  })

  return (
    <section style={{ backgroundColor: '#111009', padding: '5rem 2rem', textAlign: 'center' }}>
      <p style={{
        fontFamily: 'var(--font-inter), Inter, sans-serif',
        fontWeight: 600, fontSize: 10, letterSpacing: '0.2em',
        textTransform: 'uppercase', color: '#C4973F', marginBottom: '1.5rem',
      }}>
        Works with everything you use
      </p>

      <h2 style={{
        fontFamily: 'var(--font-display), serif',
        fontWeight: 700, fontSize: 'clamp(28px,4vw,48px)',
        color: '#FFFDF8', margin: 0,
      }}>
        No rip and replace.
      </h2>

      <p style={{
        fontFamily: 'var(--font-inter), Inter, sans-serif',
        fontWeight: 400, fontSize: 17, lineHeight: 1.8,
        color: 'rgba(250,247,242,0.45)',
        maxWidth: 480, margin: '1rem auto 3rem',
      }}>
        Lumio connects to the tools you already use. Instagram, WhatsApp, your booking system, your
        payment processor. Everything works together from day one.
      </p>

      <div ref={ref} style={{ maxWidth: 700, margin: '0 auto' }}>
        {/* Row 1 */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem 3rem', marginBottom: '2rem' }}>
          {ROW1.map(({ Logo, name }, i) => (
            <motion.div
              key={name}
              variants={itemVariant(i)}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
            >
              <motion.div
                whileHover={{ scale: 1.08, opacity: 1 }}
                style={{ opacity: 0.65, transition: 'opacity 200ms', cursor: 'default' }}
              >
                <Logo size={40} />
              </motion.div>
              <span style={{
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                fontWeight: 500, fontSize: 11,
                color: 'rgba(250,247,242,0.3)',
                transition: 'color 200ms',
              }}>
                {name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Row 2 */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem 3rem' }}>
          {ROW2.map(({ Logo, name }, i) => (
            <motion.div
              key={name}
              variants={itemVariant(i + ROW1.length)}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
            >
              <motion.div
                whileHover={{ scale: 1.08, opacity: 1 }}
                style={{ opacity: 0.55, transition: 'opacity 200ms', cursor: 'default' }}
              >
                <Logo size={32} />
              </motion.div>
              <span style={{
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                fontWeight: 500, fontSize: 11,
                color: 'rgba(250,247,242,0.3)',
              }}>
                {name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div style={{
        width: 60, height: 1, background: 'rgba(250,247,242,0.1)',
        margin: '3rem auto 1.5rem',
      }} />

      <p style={{
        fontFamily: 'var(--font-inter), Inter, sans-serif',
        fontWeight: 400, fontSize: 14,
        color: 'rgba(250,247,242,0.3)', fontStyle: 'italic',
      }}>
        Don&apos;t see your tool? We connect to 50+ platforms.{' '}
        <a
          href="mailto:hello@lumio.london"
          style={{ color: '#C4973F', textDecoration: 'none', fontStyle: 'normal' }}
        >
          Ask us.
        </a>
      </p>
    </section>
  )
}
