'use client'

import { useSpeechToText } from '@/lib/useSpeechToText'

interface Props {
  onResult: (text: string) => void
  className?: string
}

export default function MicButton({ onResult, className = '' }: Props) {
  const { isListening, isSupported, startListening, stopListening } = useSpeechToText(onResult)

  if (!isSupported) return null

  return (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      {isListening && (
        <div style={{
          position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)',
          marginBottom: 6,
          background: 'rgba(196,151,63,0.92)', color: '#1A1814',
          borderRadius: 99, padding: '4px 12px',
          fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 11, fontWeight: 600,
          whiteSpace: 'nowrap', zIndex: 20,
        }}>
          Listening...
        </div>
      )}
      <button
        type="button"
        onClick={isListening ? stopListening : startListening}
        aria-label={isListening ? 'Stop listening' : 'Speak your message'}
        className={className}
        style={{
          width: 36, height: 36, borderRadius: '50%',
          background: isListening ? 'rgba(196,151,63,0.1)' : 'transparent',
          border: `1px solid ${isListening ? '#C4973F' : 'rgba(196,151,63,0.3)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', transition: 'all 200ms',
          color: isListening ? '#C4973F' : 'rgba(196,151,63,0.6)',
        }}
        onMouseEnter={e => {
          if (!isListening) {
            const el = e.currentTarget as HTMLElement
            el.style.borderColor = 'rgba(196,151,63,0.5)'
            el.style.color = '#C4973F'
          }
        }}
        onMouseLeave={e => {
          if (!isListening) {
            const el = e.currentTarget as HTMLElement
            el.style.borderColor = 'rgba(196,151,63,0.3)'
            el.style.color = 'rgba(196,151,63,0.6)'
          }
        }}
      >
        {isListening ? (
          <span style={{
            width: 10, height: 10, borderRadius: '50%', background: '#C4973F',
            display: 'block', animation: 'ping 1s cubic-bezier(0,0,0.2,1) infinite',
          }} />
        ) : (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="2" width="6" height="11" rx="3"/>
            <path d="M5 10a7 7 0 0 0 14 0"/>
            <path d="M12 19v3"/>
            <path d="M9 22h6"/>
          </svg>
        )}
      </button>
    </div>
  )
}
