'use client';

interface GoldButtonProps {
  children: React.ReactNode;
  href?: string;
  dark?: boolean;
  large?: boolean;
  onClick?: () => void;
}

export default function GoldButton({ children, href, dark, large, onClick }: GoldButtonProps) {
  const base =
    `group inline-flex items-center gap-2 rounded-full font-semibold transition-all duration-200 hover:-translate-y-1 shadow-[0_20px_60px_rgba(196,151,63,.2)] ${large ? 'px-9 py-4 text-base' : 'px-7 py-3.5 text-sm'}`;
  const color = dark
    ? 'bg-[#1A1814] text-[#FFFDF8] hover:bg-[#2E2B26]'
    : 'bg-[#C4973F] text-[#1A1814] hover:bg-[#E8B44B]';
  const arrow = (
    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
  );

  if (href) {
    return (
      <a href={href} className={`${base} ${color}`}>
        {children}
        {arrow}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={`${base} ${color}`}>
      {children}
      {arrow}
    </button>
  );
}
