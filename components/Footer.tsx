import Logo from '@/components/ui/Logo';
import { NAV_LINKS } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-[#2E2B26] py-14 px-4">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-start justify-between gap-8">
        <div className="flex flex-col gap-3">
          <Logo small light />
          <p className="text-sm text-[#8A8278] max-w-xs">Work flows differently in the right light.</p>
          <p className="text-xs text-[#8A8278]">
            <a href="mailto:hello@lumio.london" className="hover:text-[#C4973F] transition-colors">hello@lumio.london</a>
            {' · '}
            <a href="https://lumio.london" className="hover:text-[#C4973F] transition-colors">lumio.london</a>
          </p>
        </div>
        <nav className="flex flex-col gap-3 text-sm text-[#8A8278]">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={label} href={href} className="hover:text-[#C4973F] transition-colors">{label}</a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
