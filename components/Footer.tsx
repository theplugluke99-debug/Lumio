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
        <nav className="flex flex-col gap-3 text-sm text-[#8A8278]">
          <span className="text-xs font-bold uppercase tracking-widest text-white/20">Legal</span>
          <a href="/terms" className="hover:text-[#C4973F] transition-colors">Terms of Service</a>
          <a href="/privacy" className="hover:text-[#C4973F] transition-colors">Privacy Policy</a>
          <a href="/legal" className="hover:text-[#C4973F] transition-colors">Legal Notice</a>
        </nav>
      </div>
      <div className="mx-auto max-w-6xl mt-10 pt-6 border-t border-white/[0.06] flex flex-wrap justify-between gap-3">
        <p className="text-xs text-white/20">© {new Date().getFullYear()} Favours OS Ltd trading as Lumio. All rights reserved.</p>
        <p className="text-xs text-white/20">Registered in England and Wales.</p>
      </div>
    </footer>
  );
}
