'use client'

import { motion } from 'framer-motion'
import {
  InstagramLogo, WhatsAppLogo, GoogleLogo, PhorestLogo, FreshaLogo, StripeLogo,
  CalendlyLogo, TreatwellLogo, FacesLogo, GmailLogo, FacebookLogo, TrustpilotLogo,
} from '@/components/logos/IntegrationLogos'

const INTEGRATIONS = [
  { Logo: InstagramLogo, name: 'Instagram' },
  { Logo: WhatsAppLogo, name: 'WhatsApp' },
  { Logo: GoogleLogo, name: 'Google' },
  { Logo: PhorestLogo, name: 'Phorest' },
  { Logo: FreshaLogo, name: 'Fresha' },
  { Logo: StripeLogo, name: 'Stripe' },
  { Logo: CalendlyLogo, name: 'Calendly' },
  { Logo: TreatwellLogo, name: 'Treatwell' },
  { Logo: FacesLogo, name: 'Faces' },
  { Logo: GmailLogo, name: 'Gmail' },
  { Logo: FacebookLogo, name: 'Facebook' },
  { Logo: TrustpilotLogo, name: 'Trustpilot' },
]

export default function Integrations() {
  const itemVariant = (i: number) => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.5, delay: i * 0.06, ease: 'easeOut' as const },
    },
  })

  return (
    <section style={{ backgroundColor: '#111009', padding: '6rem 1.5rem', textAlign: 'center' }}>
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
        maxWidth: 540, margin: '1rem auto 3.5rem',
      }}>
        Lumio connects to the tools you already use. Instagram, WhatsApp, your booking system, your
        payment processor. Everything works together from day one.
      </p>

      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {INTEGRATIONS.map(({ Logo, name }, i) => (
            <motion.div
              key={name}
              variants={itemVariant(i)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="group"
              style={{
                minHeight: 104,
                borderRadius: '1.25rem',
                border: '1px solid rgba(196,151,63,0.12)',
                background: 'rgba(255,253,248,0.035)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                boxShadow: '0 18px 60px rgba(0,0,0,0.08)',
              }}
            >
              <motion.div
                whileHover={{ scale: 1.04, opacity: 1 }}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 16,
                  border: '1px solid rgba(250,247,242,0.08)',
                  background: 'rgba(250,247,242,0.05)',
                  display: 'grid',
                  placeItems: 'center',
                  opacity: 0.86,
                  transition: 'opacity 200ms',
                  cursor: 'default',
                  filter: 'grayscale(1) saturate(0.2)',
                }}
              >
                <Logo size={24} />
              </motion.div>
              <span style={{
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                fontWeight: 600, fontSize: 11,
                color: 'rgba(250,247,242,0.48)',
              }}>
                {name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div style={{
        width: 60, height: 1, background: 'rgba(250,247,242,0.1)',
        margin: '3.5rem auto 1.5rem',
      }} />

      <p style={{
        fontFamily: 'var(--font-inter), Inter, sans-serif',
        fontWeight: 400, fontSize: 14,
        color: 'rgba(250,247,242,0.34)',
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
