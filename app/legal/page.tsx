import Logo from '@/components/ui/Logo';

export const metadata = {
  title: 'Legal Notice — Lumio',
  description: 'Legal notice and company information for Lumio, trading name of Favours OS Ltd.',
};

const GOLD: React.CSSProperties = {
  background: 'linear-gradient(110deg,#C4973F 0%,#E8B44B 45%,#F4D38A 100%)',
  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
};

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-8">
      <span className="text-[#C4973F] text-xs font-bold uppercase tracking-widest w-44 shrink-0 pt-0.5">{label}</span>
      <span className="text-[#8A8278] text-sm leading-relaxed">{children}</span>
    </div>
  );
}

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-[#1A1814]">
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[160px] opacity-[0.06]" style={{ background: '#C4973F' }} />

      <div className="relative z-10 px-6 pt-7 flex justify-between items-center max-w-4xl mx-auto">
        <a href="/"><Logo light /></a>
        <a href="/" className="text-sm text-white/40 hover:text-white/70 transition-colors">← Back to site</a>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-16 flex flex-col gap-12">
        <div className="flex flex-col gap-3">
          <span className="text-xs font-bold uppercase tracking-[.2em] text-[#C4973F]">Legal</span>
          <h1 className="font-display font-black italic text-5xl md:text-6xl text-[#FFFDF8] leading-[.9] tracking-[-0.03em]">Legal Notice</h1>
          <p className="text-[#8A8278] text-sm mt-2">Company and regulatory information</p>
        </div>

        <div className="w-full h-px bg-white/10" />

        <section className="flex flex-col gap-6">
          <h2 className="font-display font-black italic text-2xl" style={GOLD}>Company Information</h2>
          <div className="flex flex-col gap-5">
            <Row label="Legal name">Favours OS Ltd</Row>
            <Row label="Trading name">Lumio</Row>
            <Row label="Registered in">England and Wales</Row>
            <Row label="Website">
              <a href="https://lumio.london" className="text-[#C4973F] hover:text-[#E8B44B] transition-colors">lumio.london</a>
            </Row>
            <Row label="Contact">
              <a href="mailto:hello@lumio.london" className="text-[#C4973F] hover:text-[#E8B44B] transition-colors">hello@lumio.london</a>
            </Row>
          </div>
        </section>

        <div className="w-full h-px bg-white/10" />

        <section className="flex flex-col gap-6">
          <h2 className="font-display font-black italic text-2xl" style={GOLD}>Website Disclaimer</h2>
          <div className="flex flex-col gap-3 text-[#8A8278] text-sm leading-relaxed">
            <p>The information on this website is provided for general informational purposes only. While we make every effort to keep it accurate and up to date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, or suitability of the information.</p>
            <p>Results described on this website (such as lead volumes, revenue recovery, and time savings) are illustrative of typical outcomes for Lumio clients and are not guaranteed for every clinic. Individual results will vary depending on clinic size, service mix, and engagement with the system.</p>
            <p>Any reliance you place on information from this website is strictly at your own risk.</p>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="font-display font-black italic text-2xl" style={GOLD}>Intellectual Property</h2>
          <div className="flex flex-col gap-3 text-[#8A8278] text-sm leading-relaxed">
            <p>All content on this website — including text, graphics, logos, and software — is the property of Favours OS Ltd or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent.</p>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="font-display font-black italic text-2xl" style={GOLD}>Governing Law</h2>
          <div className="flex flex-col gap-3 text-[#8A8278] text-sm leading-relaxed">
            <p>This website and any disputes arising from its use are governed by the laws of England and Wales. The courts of England and Wales have exclusive jurisdiction over any such disputes.</p>
          </div>
        </section>

        <div className="w-full h-px bg-white/10" />

        <div className="flex flex-wrap gap-6 text-xs text-[#8A8278]">
          <a href="/terms" className="hover:text-[#C4973F] transition-colors">Terms of Service</a>
          <a href="/privacy" className="hover:text-[#C4973F] transition-colors">Privacy Policy</a>
          <a href="mailto:hello@lumio.london" className="hover:text-[#C4973F] transition-colors">hello@lumio.london</a>
        </div>
      </div>
    </main>
  );
}
