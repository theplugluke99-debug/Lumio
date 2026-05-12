interface LogoProps {
  light?: boolean;
  small?: boolean;
}

export default function Logo({ light = false, small = false }: LogoProps) {
  const textColor = light ? '#FFFDF8' : '#1A1814';
  const arcColor = '#C4973F';
  const arcW = small ? 54 : 76;
  const arcH = small ? 8 : 11;
  const fontSize = small ? 19 : 26;

  return (
    <div className="relative inline-flex flex-col items-start leading-none select-none">
      <svg
        width={arcW}
        height={arcH}
        viewBox="0 0 80 12"
        className="mb-[-2px]"
        aria-hidden
      >
        <path
          d="M 8 10 Q 40 2 72 10"
          stroke={arcColor}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 0 4px rgba(196,151,63,0.6))' }}
        />
      </svg>
      <span
        style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 400,
          fontStyle: 'italic',
          fontSize: `${fontSize}px`,
          letterSpacing: '0.06em',
          color: textColor,
          lineHeight: 1,
        }}
      >
        Lumio
      </span>
    </div>
  );
}
