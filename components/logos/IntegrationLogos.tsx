interface LogoProps { size?: number; className?: string; dark?: boolean }

export function InstagramLogo({ size = 32, className = '' }: LogoProps) {
  const id = 'ig-grad'
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <defs>
        <radialGradient id={id} cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill={`url(#${id})`} />
      <rect x="9" y="9" width="14" height="14" rx="4.5" stroke="white" strokeWidth="1.6" fill="none" />
      <circle cx="16" cy="16" r="3.5" stroke="white" strokeWidth="1.6" fill="none" />
      <circle cx="21.5" cy="10.5" r="1" fill="white" />
    </svg>
  )
}

export function WhatsAppLogo({ size = 32, className = '' }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <rect width="32" height="32" rx="8" fill="#25D366" />
      <path d="M16 7C11.03 7 7 11.03 7 16c0 1.58.41 3.07 1.13 4.36L7 25l4.77-1.25A9 9 0 1 0 16 7z" fill="white" />
      <path d="M20.5 18.3c-.25-.12-1.47-.72-1.7-.8-.23-.08-.4-.12-.56.12s-.64.8-.79.97c-.14.17-.29.19-.54.06a6.8 6.8 0 0 1-2-.98 7.55 7.55 0 0 1-1.39-1.55c-.15-.25-.02-.39.11-.51.12-.11.25-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.12.17 1.77 2.7 4.29 3.78 1.69.69 2.35.75 3.19.63.51-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.28z" fill="#25D366" />
    </svg>
  )
}

export function GoogleLogo({ size = 32, className = '' }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <path d="M30.5 16.3c0-1.1-.1-2.2-.28-3.2H16v6.06h8.12a6.94 6.94 0 0 1-3 4.54v3.77h4.84C28.6 24.88 30.5 20.95 30.5 16.3z" fill="#4285F4" />
      <path d="M16 31c4.07 0 7.48-1.35 9.97-3.66l-4.84-3.76c-1.35.9-3.07 1.43-5.13 1.43-3.94 0-7.28-2.66-8.47-6.24H2.55v3.9A15 15 0 0 0 16 31z" fill="#34A853" />
      <path d="M7.53 18.77a9.02 9.02 0 0 1 0-5.54V9.33H2.55a15 15 0 0 0 0 13.34l4.98-3.9z" fill="#FBBC05" />
      <path d="M16 6.96a8.12 8.12 0 0 1 5.74 2.24l4.3-4.3A14.45 14.45 0 0 0 16 1a15 15 0 0 0-13.45 8.33l4.98 3.9C8.72 9.62 12.06 6.96 16 6.96z" fill="#EA4335" />
    </svg>
  )
}

export function PhorestLogo({ size = 32, className = '' }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <rect width="32" height="32" rx="8" fill="#1D9B8E" />
      <text x="7" y="23" fontFamily="Georgia, serif" fontWeight="700" fontSize="20" fill="white">P</text>
    </svg>
  )
}

export function FreshaLogo({ size = 32, className = '' }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <rect width="32" height="32" rx="8" fill="#00C2A8" />
      <text x="9" y="23" fontFamily="Georgia, serif" fontWeight="700" fontSize="20" fill="white">f</text>
    </svg>
  )
}

export function StripeLogo({ size = 32, className = '' }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <rect width="32" height="32" rx="8" fill="#635BFF" />
      <path d="M14.1 12.6c0-1.1.9-1.5 2.4-1.5 2.1 0 4.7.64 6.8 1.78V7.2A18 18 0 0 0 16.5 6C11.2 6 7.7 8.7 7.7 13c0 6.5 9 5.5 9 8.3 0 1.3-1.1 1.72-2.7 1.72-2.3 0-5.3-.97-7.6-2.27v5.8c2.6 1.1 5.2 1.57 7.6 1.57 5.4 0 9.2-2.67 9.2-7.1-.02-7.03-9.1-5.8-9.1-8.4z" fill="white" />
    </svg>
  )
}

export function CalendlyLogo({ size = 32, className = '' }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <rect width="32" height="32" rx="8" fill="#006BFF" />
      <rect x="8" y="10" width="16" height="14" rx="2" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M8 14h16" stroke="white" strokeWidth="1.5" />
      <path d="M12 8v4M20 8v4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="11" y="18" width="3" height="3" rx="0.5" fill="white" />
      <rect x="18" y="18" width="3" height="3" rx="0.5" fill="white" />
    </svg>
  )
}

export function TreatwellLogo({ size = 32, className = '' }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <rect width="32" height="32" rx="8" fill="#1FB864" />
      <path d="M16 8c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8z" fill="rgba(255,255,255,0.15)" />
      <path d="M11 12h10M16 12v8" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function FacesLogo({ size = 32, className = '' }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <rect width="32" height="32" rx="8" fill="#1C3553" />
      <text x="8" y="23" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="18" fill="white">F</text>
    </svg>
  )
}

export function GmailLogo({ size = 32, className = '' }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <rect width="32" height="32" rx="8" fill="white" />
      <path d="M4 9h24v14H4V9z" fill="white" stroke="#E0E0E0" strokeWidth="0.5" />
      <path d="M4 9l12 9 12-9" stroke="#EA4335" strokeWidth="2" strokeLinejoin="round" fill="none" />
      <path d="M4 9v14M28 9v14" stroke="#34A853" strokeWidth="1.5" />
      <path d="M4 23l8-7M28 23l-8-7" stroke="#FBBC05" strokeWidth="1.5" />
    </svg>
  )
}

export function FacebookLogo({ size = 32, className = '' }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <rect width="32" height="32" rx="8" fill="#1877F2" />
      <path d="M21 6h-3a5 5 0 0 0-5 5v3h-3v4h3v8h4v-8h3l1-4h-4V11a1 1 0 0 1 1-1h3V6z" fill="white" />
    </svg>
  )
}

export function TrustpilotLogo({ size = 32, className = '' }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <rect width="32" height="32" rx="8" fill="#00B67A" />
      <path d="M16 7l2.47 7.6H26l-6.17 4.49 2.36 7.25L16 21.84l-6.19 4.5 2.36-7.25L6 14.6h7.53L16 7z" fill="white" />
    </svg>
  )
}
