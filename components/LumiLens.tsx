'use client';

interface LumiLensProps {
  size?: number;
  variant?: 'light' | 'dark';
  animated?: boolean;
  className?: string;
}

export default function LumiLens({
  size = 32,
  variant = 'light',
  animated = false,
  className = '',
}: LumiLensProps) {
  const isDark = variant === 'dark';
  const glow = isDark ? 'rgba(196,151,63,0.16)' : 'rgba(232,180,75,0.22)';
  const stroke = '#C4973F';
  const highlight = '#E8B44B';
  const surface = isDark ? 'rgba(26,24,20,0.04)' : 'rgba(255,253,248,0.04)';

  return (
    <span
      className={`lumi-lens ${animated ? 'lumi-lens--animated' : ''} ${className}`}
      style={{ width: size, height: size, ['--lens-glow' as string]: glow }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        fill="none"
        role="img"
      >
        <circle cx="32" cy="32" r="25.5" fill={surface} stroke={stroke} strokeOpacity="0.72" strokeWidth="1.4" />
        <circle cx="32" cy="32" r="15.5" stroke={stroke} strokeOpacity="0.22" strokeWidth="1" />
        <circle cx="32" cy="32" r="5.2" fill={highlight} fillOpacity="0.18" />
        <circle cx="32" cy="32" r="3" fill={highlight} fillOpacity="0.34" />
        <g className="lumi-lens__aperture" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M32 9.5v9.2" opacity="0.86" />
          <path d="M47.9 16.1l-6.5 6.5" opacity="0.72" />
          <path d="M54.5 32h-9.2" opacity="0.86" />
          <path d="M47.9 47.9l-6.5-6.5" opacity="0.72" />
          <path d="M32 54.5v-9.2" opacity="0.86" />
          <path d="M16.1 47.9l6.5-6.5" opacity="0.72" />
          <path d="M9.5 32h9.2" opacity="0.86" />
          <path d="M16.1 16.1l6.5 6.5" opacity="0.72" />
        </g>
        <g stroke={highlight} strokeWidth="1.1" strokeLinecap="round" opacity="0.55">
          <path d="M29 18.7 22.7 32 29 45.3" />
          <path d="M35 18.7 41.3 32 35 45.3" />
        </g>
      </svg>
    </span>
  );
}
