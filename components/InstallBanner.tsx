'use client'

import { useState, useEffect } from 'react'

export default function InstallBanner() {
  const [installPrompt, setInstallPrompt] = useState<any>(null)
  const [showBanner, setShowBanner] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('lumio-install-dismissed') === 'true') return

    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    const standalone = window.matchMedia('(display-mode: standalone)').matches
    if (standalone) return

    setIsIOS(iOS)

    if (iOS) {
      setShowBanner(true)
      return
    }

    const handler = (e: Event) => {
      e.preventDefault()
      setInstallPrompt(e)
      setShowBanner(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const dismiss = () => {
    setShowBanner(false)
    localStorage.setItem('lumio-install-dismissed', 'true')
  }

  const install = async () => {
    if (!installPrompt) return
    installPrompt.prompt()
    await installPrompt.userChoice
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: '#1A1814',
      borderTop: '1px solid rgba(196,151,63,0.2)',
      padding: '1rem 1.5rem',
      paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))',
      display: 'flex', alignItems: 'center', gap: '1rem',
      zIndex: 100,
    }}>
      {/* Lumio logo icon */}
      <div style={{
        width: 40, height: 40, borderRadius: 10, flexShrink: 0,
        background: 'linear-gradient(135deg,#C4973F,#E8B44B)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontWeight: 900, fontSize: 18, color: '#1A1814', fontFamily: 'var(--font-display), serif', fontStyle: 'italic' }}>L</span>
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 600, fontSize: 14, color: '#FFFDF8' }}>
          Add Lumio to your home screen
        </div>
        {isIOS ? (
          <div style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 400, fontSize: 12, color: 'rgba(255,253,248,0.5)', marginTop: 2 }}>
            Tap{' '}
            <svg style={{ display: 'inline', verticalAlign: 'middle', marginBottom: 1 }} viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="rgba(196,151,63,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
              <polyline points="16 6 12 2 8 6"/>
              <line x1="12" y1="2" x2="12" y2="15"/>
            </svg>
            {' '}then &ldquo;Add to Home Screen&rdquo;
          </div>
        ) : (
          <div style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 400, fontSize: 12, color: 'rgba(255,253,248,0.5)', marginTop: 2 }}>
            Your clinic dashboard, one tap away.
          </div>
        )}
      </div>

      {/* Buttons */}
      {!isIOS && (
        <button
          type="button"
          onClick={install}
          style={{
            background: '#C4973F', color: '#1A1814',
            border: 'none', borderRadius: 99,
            padding: '8px 18px',
            fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 600, fontSize: 13,
            cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
          }}
        >
          Add
        </button>
      )}
      <button
        type="button"
        onClick={dismiss}
        style={{
          background: 'transparent', border: 'none',
          fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 500, fontSize: 13,
          color: 'rgba(255,253,248,0.4)', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
          padding: '8px 4px',
        }}
      >
        {isIOS ? '×' : 'Not now'}
      </button>
    </div>
  )
}
