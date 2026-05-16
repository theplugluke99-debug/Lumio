'use client'

import { useState } from 'react'
import {
  InstagramLogo, WhatsAppLogo, GoogleLogo, PhorestLogo, FreshaLogo, StripeLogo,
  CalendlyLogo, TreatwellLogo, FacesLogo, GmailLogo, FacebookLogo, TrustpilotLogo,
} from '@/components/logos/IntegrationLogos'

interface Props { darkMode: boolean }

type Status = 'connected' | 'pending' | 'none'

const INTEGRATIONS: {
  Logo: React.ComponentType<{ size?: number }>
  name: string
  description: string
  detail: string
  status: Status
}[] = [
  { Logo: InstagramLogo, name: 'Instagram', description: 'DM responses & lead capture', detail: 'Lumi reads every incoming DM, qualifies the lead, and replies in your voice within seconds — 24/7.', status: 'connected' },
  { Logo: WhatsAppLogo, name: 'WhatsApp', description: 'Client messaging & reminders', detail: 'Sends booking confirmations, no-show reminders, and rebooking nudges automatically via WhatsApp.', status: 'connected' },
  { Logo: GoogleLogo, name: 'Google Business', description: 'Review generation & responses', detail: 'Triggers post-treatment review requests at the optimal moment, and responds to new reviews on your behalf.', status: 'connected' },
  { Logo: PhorestLogo, name: 'Phorest', description: 'Booking sync & client records', detail: 'Lumi pulls live appointment data, updates client notes, and triggers automations based on booking status.', status: 'connected' },
  { Logo: StripeLogo, name: 'Stripe', description: 'Payment processing & invoices', detail: 'Tracks outstanding balances and sends automated payment chasers for unpaid or overdue invoices.', status: 'connected' },
  { Logo: GmailLogo, name: 'Gmail', description: 'Email enquiries & follow-ups', detail: 'Handles inbound email enquiries and sends aftercare, follow-up, and rebooking sequences automatically.', status: 'pending' },
  { Logo: FreshaLogo, name: 'Fresha', description: 'Booking system integration', detail: 'Syncs bookings and client profiles from Fresha to trigger Lumi automations at the right moment.', status: 'none' },
  { Logo: CalendlyLogo, name: 'Calendly', description: 'Appointment scheduling', detail: 'Connects Lumi to your Calendly so bookings trigger immediate confirmation and reminder sequences.', status: 'none' },
  { Logo: FacebookLogo, name: 'Facebook', description: 'Messenger enquiries', detail: 'Lumi responds to Facebook Messenger DMs with the same speed and warmth as Instagram.', status: 'none' },
  { Logo: TreatwellLogo, name: 'Treatwell', description: 'Booking platform sync', detail: 'Pulls Treatwell bookings into Lumi so reminders and follow-ups go out on time, every time.', status: 'none' },
  { Logo: FacesLogo, name: 'Faces', description: 'Consent form management', detail: 'Tracks consent form completion and chases clients automatically before their appointment.', status: 'none' },
  { Logo: TrustpilotLogo, name: 'Trustpilot', description: 'Review collection & display', detail: 'Automates Trustpilot review requests post-treatment and monitors your rating over time.', status: 'none' },
]

function StatusBadge({ status, dm }: { status: Status; dm: boolean }) {
  const textMuted = dm ? 'rgba(255,253,248,0.4)' : '#8A8278'
  if (status === 'connected') {
    return (
      <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 500, fontSize: 11, color: '#5B8A68', whiteSpace: 'nowrap' }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#5B8A68', display: 'inline-block', flexShrink: 0 }} />
        Connected
      </span>
    )
  }
  if (status === 'pending') {
    return (
      <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 500, fontSize: 11, color: '#C4973F', whiteSpace: 'nowrap' }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C4973F', display: 'inline-block', flexShrink: 0 }} />
        Pending
      </span>
    )
  }
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 500, fontSize: 11, color: textMuted, whiteSpace: 'nowrap', cursor: 'pointer' }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: textMuted, display: 'inline-block', flexShrink: 0 }} />
      Connect →
    </span>
  )
}

export default function IntegrationsTab({ darkMode: dm }: Props) {
  const [toast, setToast] = useState(false)

  const cardBg = dm ? 'rgba(255,253,248,0.04)' : 'rgba(255,255,255,0.72)'
  const cardBorder = dm ? 'rgba(255,253,248,0.08)' : 'rgba(26,24,20,0.08)'
  const textPri = dm ? '#FFFDF8' : '#1A1814'
  const textMuted = dm ? 'rgba(255,253,248,0.5)' : '#8A8278'
  const secBg = dm ? 'rgba(255,253,248,0.03)' : '#F9EDE8'

  const fireToast = () => {
    setToast(true)
    setTimeout(() => setToast(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div>
        <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#C4973F', marginBottom: '0.5rem' }}>
          Integrations
        </p>
        <h2 style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 700, fontSize: 22, color: textPri, margin: '0 0 0.4rem' }}>
          Connected tools
        </h2>
        <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 400, fontSize: 14, color: textMuted, margin: 0 }}>
          Everything Lumio connects to for your clinic.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '0.75rem',
      }}>
        {INTEGRATIONS.map(({ Logo, name, description, detail, status }) => (
          <div
            key={name}
            style={{
              background: cardBg, border: `1px solid ${cardBorder}`,
              borderRadius: '1rem', padding: '1.25rem',
              display: 'flex', flexDirection: 'column', gap: '0.75rem',
              transition: 'border-color 200ms',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = dm ? 'rgba(255,253,248,0.18)' : 'rgba(26,24,20,0.18)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = cardBorder }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
              <div style={{ flexShrink: 0 }}>
                <Logo size={32} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 600, fontSize: 14, color: textPri, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {name}
                </div>
                <div style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 400, fontSize: 12, color: textMuted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {description}
                </div>
              </div>
              <div style={{ flexShrink: 0 }}>
                <StatusBadge status={status} dm={dm} />
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 400, fontSize: 12, color: textMuted, lineHeight: 1.55, margin: 0 }}>
              {detail}
            </p>
          </div>
        ))}
      </div>

      <div style={{
        background: secBg, border: `1px solid ${cardBorder}`,
        borderRadius: '1rem', padding: '1.5rem', textAlign: 'center',
      }}>
        <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 600, fontSize: 15, color: textPri, margin: '0 0 0.5rem' }}>
          Don&apos;t see your tool?
        </p>
        <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 400, fontSize: 13, color: textMuted, lineHeight: 1.7, margin: '0 0 1.25rem', maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
          Lumio connects to 50+ platforms. If you use it, we can almost certainly integrate it.
        </p>
        <button
          type="button"
          onClick={fireToast}
          style={{
            background: '#C4973F', color: '#1A1814', border: 'none',
            borderRadius: 99, padding: '10px 24px',
            fontFamily: 'var(--font-inter), Inter, sans-serif',
            fontWeight: 600, fontSize: 13, cursor: 'pointer', transition: 'background 200ms',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#E8B44B' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#C4973F' }}
        >
          Request an integration →
        </button>
      </div>

      {toast && (
        <div style={{
          position: 'fixed', bottom: 100, left: '50%', transform: 'translateX(-50%)',
          background: '#1A1814', border: '1px solid rgba(196,151,63,0.3)',
          borderRadius: '0.75rem', padding: '12px 20px',
          fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 500, fontSize: 13,
          color: '#FFFDF8', zIndex: 100, whiteSpace: 'nowrap',
        }}>
          Request sent to hello@lumio.london ✦
        </div>
      )}
    </div>
  )
}
