'use client';

interface Props {
  mode: 'simple' | 'full';
  onSwitch: (mode: 'simple' | 'full') => void;
  dm: boolean;
}

export default function ModeToggle({ mode, onSwitch, dm }: Props) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      background: dm ? 'rgba(255,253,248,0.06)' : 'rgba(26,24,20,0.06)',
      border: `1px solid ${dm ? 'rgba(255,253,248,0.1)' : 'rgba(26,24,20,0.1)'}`,
      borderRadius: 99, padding: 3, flexShrink: 0,
    }}>
      {(['simple', 'full'] as const).map(m => (
        <button
          key={m}
          type="button"
          onClick={() => onSwitch(m)}
          style={{
            background: mode === m ? (dm ? '#C4973F' : '#1A1814') : 'transparent',
            color: mode === m ? (dm ? '#0F0E0B' : '#FFFDF8') : (dm ? 'rgba(255,253,248,0.4)' : 'rgba(26,24,20,0.4)'),
            borderRadius: 99, padding: '4px 12px',
            fontSize: 11, fontWeight: mode === m ? 700 : 600,
            border: 'none', cursor: 'pointer', transition: 'all 300ms',
            fontFamily: 'var(--font-inter, Inter, sans-serif)',
            textTransform: 'capitalize' as const,
            lineHeight: 1.4,
          }}
        >
          {m}
        </button>
      ))}
    </div>
  );
}
