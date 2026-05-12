export function LumioOrb({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dims = { sm: 'w-6 h-6', md: 'w-8 h-8', lg: 'w-12 h-12' };
  const iconSize = { sm: 10, md: 14, lg: 20 };

  return (
    <div className={`relative flex-shrink-0 ${dims[size]}`}>
      <div className="absolute inset-0 rounded-full bg-[#C4973F]/25 blur-md" />
      <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#E8B44B] via-[#C4973F] to-[#A07830] flex items-center justify-center shadow-[0_0_24px_rgba(196,151,63,0.6)]">
        <svg width={iconSize[size]} height={iconSize[size]} viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="2.5" fill="#1A1814" />
          <path
            d="M7 1v2M7 11v2M1 7h2M11 7h2M2.93 2.93l1.41 1.41M9.66 9.66l1.41 1.41M2.93 11.07l1.41-1.41M9.66 4.34l1.41-1.41"
            stroke="#1A1814" strokeWidth="1.2" strokeLinecap="round"
          />
        </svg>
      </div>
      <div
        className="absolute inset-0 rounded-full bg-[#C4973F]/20"
        style={{ animation: 'ping 3s cubic-bezier(0,0,0.2,1) infinite' }}
      />
    </div>
  );
}
