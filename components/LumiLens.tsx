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
  className = '',
}: LumiLensProps) {
  const isDark = variant === 'dark';
  const core = isDark ? '#C4973F' : '#F4D38A';
  const pearl = isDark ? '#FFF7E8' : '#FFFDF8';
  const rim = isDark ? 'rgba(196,151,63,0.34)' : 'rgba(244,211,138,0.4)';
  const glow = isDark ? 'rgba(196,151,63,0.24)' : 'rgba(232,180,75,0.28)';

  return (
    <span
      className={`lumi-mark ${className}`}
      style={{
        width: size,
        height: size,
        background:
          `radial-gradient(circle at 36% 30%, ${pearl} 0%, ${core} 36%, rgba(196,151,63,0.72) 62%, rgba(15,14,11,0.18) 100%)`,
        border: `1px solid ${rim}`,
        boxShadow: `0 0 ${Math.max(14, size * 0.65)}px ${glow}, inset 0 1px 2px rgba(255,255,255,0.45)`,
      }}
      aria-hidden="true"
    >
      <span
        className="lumi-mark__arc"
        style={{
          borderColor: isDark ? 'rgba(255,253,248,0.45)' : 'rgba(255,253,248,0.7)',
        }}
      />
    </span>
  );
}
