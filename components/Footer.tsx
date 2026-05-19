import Logo from '@/components/ui/Logo';
import { NAV_LINKS } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-[#2E2B26] py-14 px-4">
      <div className="mx-auto max-w-6xl flex flex-col items-center text-center md:flex-row md:items-start md:justify-between md:text-left gap-8 px-6 md:px-0">
        <div className="flex flex-col gap-3 items-center md:items-start">
          <Logo light width={100} />
          <p className="text-sm text-[#8A8278] max-w-xs">Work flows differently in the right light.</p>
          <p className="text-xs text-[#8A8278]">
            <a href="mailto:hello@lumio.london" className="hover:text-[#C4973F] transition-colors">hello@lumio.london</a>
            {' · '}
            <a href="https://lumio.london" className="hover:text-[#C4973F] transition-colors">lumio.london</a>
          </p>
        </div>
        <nav className="flex flex-wrap justify-center md:flex-col gap-3 text-sm text-[#8A8278]">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={label} href={href} className="hover:text-[#C4973F] transition-colors">{label}</a>
          ))}
        </nav>
        <nav className="flex flex-col items-center md:items-start gap-3 text-sm text-[#8A8278]">
          <span className="text-xs font-bold uppercase tracking-widest text-white/20">Legal</span>
          <a href="/terms" className="hover:text-[#C4973F] transition-colors">Terms of Service</a>
          <a href="/privacy" className="hover:text-[#C4973F] transition-colors">Privacy Policy</a>
          <a href="/legal" className="hover:text-[#C4973F] transition-colors">Legal Notice</a>
        </nav>
        <nav className="flex flex-col items-center md:items-start gap-3">
          <span style={{ fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#C4973F', marginBottom: 12 }}>Talk to us</span>
          <a
            href="https://calendly.com/hello-lumio/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FFFDF8] hover:text-[#C4973F] transition-colors"
            style={{ fontWeight: 500, fontSize: 13 }}
          >
            Book a 20 minute call →
          </a>
          <a
            href="mailto:hello@lumio.london"
            className="text-[#FFFDF8] hover:text-[#C4973F] transition-colors"
            style={{ fontWeight: 500, fontSize: 13 }}
          >
            hello@lumio.london
          </a>
          <p style={{ fontSize: 12, color: '#8A8278', maxWidth: 200 }}>
            No call required to get started — but always happy to chat.
          </p>
        </nav>
      </div>
      <div className="mx-auto max-w-6xl mt-10 pt-6 border-t border-white/[0.06] flex flex-wrap justify-center md:justify-between gap-3 px-6 md:px-0">
        <p className="text-xs text-white/20 text-center md:text-left">© {new Date().getFullYear()} Lumio. Operated by Favours Technologies Ltd (Co. No. 16265679), registered in England and Wales.</p>
      </div>
    </footer>
  );
}
