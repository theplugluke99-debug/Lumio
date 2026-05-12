import Logo from '@/components/ui/Logo';

export const metadata = {
  title: 'Privacy Policy — Lumio',
  description: 'Privacy Policy for Lumio, operated by Favours Technologies Ltd (Co. No. 16265679). GDPR compliant.',
};

const GOLD: React.CSSProperties = {
  background: 'linear-gradient(110deg,#C4973F 0%,#E8B44B 45%,#F4D38A 100%)',
  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-display font-black italic text-2xl text-[#FFFDF8]" style={GOLD}>{title}</h2>
      <div className="flex flex-col gap-3 text-[#8A8278] text-sm leading-relaxed">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
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
          <h1 className="font-display font-black italic text-5xl md:text-6xl text-[#FFFDF8] leading-[.9] tracking-[-0.03em]">Privacy Policy</h1>
          <p className="text-[#8A8278] text-sm mt-2">Lumio is operated by Favours Technologies Ltd (Co. No. 16265679) · Last updated: May 2025</p>
        </div>

        <div className="w-full h-px bg-white/10" />

        <Section title="1. Who We Are">
          <p><strong className="text-[#FFFDF8]/70">Lumio</strong> is operated by <strong className="text-[#FFFDF8]/70">Favours Technologies Ltd</strong> (Company No. 16265679), registered in England and Wales. Favours Technologies Ltd is the data controller for personal data collected through this website and our services.</p>
          <p>We are committed to protecting your privacy and handling your data responsibly in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.</p>
          <p>Contact us with any privacy queries at <a href="mailto:hello@lumio.london" className="text-[#C4973F] hover:text-[#E8B44B] transition-colors">hello@lumio.london</a>.</p>
        </Section>

        <Section title="2. What Data We Collect">
          <p>We may collect the following categories of personal data:</p>
          <ul className="list-disc list-inside flex flex-col gap-1.5 pl-2">
            <li><strong className="text-[#FFFDF8]/70">Identity data:</strong> your name, clinic name, and job title</li>
            <li><strong className="text-[#FFFDF8]/70">Contact data:</strong> email address and phone number</li>
            <li><strong className="text-[#FFFDF8]/70">Business data:</strong> information about your clinic, including approximate lead volumes, revenue, and service types — provided voluntarily through our audit tool or directly</li>
            <li><strong className="text-[#FFFDF8]/70">Usage data:</strong> how you interact with our website (pages visited, time on site, device type) collected via cookies and analytics</li>
            <li><strong className="text-[#FFFDF8]/70">Communications:</strong> any messages you send us via email, our AI chat, or contact forms</li>
          </ul>
          <p>We do not collect sensitive personal data (such as health information) directly. If your clinic shares patient data with us as part of service delivery, a separate data processing agreement will be put in place.</p>
        </Section>

        <Section title="3. How We Use Your Data">
          <p>We use your personal data for the following purposes:</p>
          <ul className="list-disc list-inside flex flex-col gap-1.5 pl-2">
            <li>To deliver and improve our automation services</li>
            <li>To communicate with you about your account, your results, and our services</li>
            <li>To respond to enquiries submitted through our website or AI assistant</li>
            <li>To send you relevant updates or offers where you have given consent</li>
            <li>To fulfil our legal and contractual obligations</li>
            <li>To analyse usage of our website and improve user experience</li>
          </ul>
          <p>We process your data on the legal bases of: <strong className="text-[#FFFDF8]/70">contractual necessity</strong> (to deliver services you have engaged us for), <strong className="text-[#FFFDF8]/70">legitimate interests</strong> (to run and improve our business), and <strong className="text-[#FFFDF8]/70">consent</strong> (for marketing communications).</p>
        </Section>

        <Section title="4. We Never Sell Your Data">
          <p>We do not sell, rent, or trade your personal data to any third party. Full stop.</p>
          <p>We may share data with trusted service providers (such as our hosting, email, or analytics platforms) solely to deliver our services. These providers are contractually bound to process data only on our instructions and in line with UK GDPR requirements.</p>
        </Section>

        <Section title="5. Data Retention">
          <p>We retain personal data only for as long as necessary to fulfil the purposes for which it was collected, or as required by law. Client data is typically retained for up to 6 years following the end of an engagement, in line with standard UK commercial and tax record-keeping requirements.</p>
          <p>Audit tool results and anonymous usage data may be retained for longer for analytical purposes.</p>
        </Section>

        <Section title="6. Your Rights (UK GDPR)">
          <p>Under UK data protection law, you have the right to:</p>
          <ul className="list-disc list-inside flex flex-col gap-1.5 pl-2">
            <li><strong className="text-[#FFFDF8]/70">Access</strong> a copy of the personal data we hold about you</li>
            <li><strong className="text-[#FFFDF8]/70">Rectify</strong> inaccurate or incomplete data</li>
            <li><strong className="text-[#FFFDF8]/70">Erasure</strong> — request deletion of your data where there is no legitimate reason for us to retain it</li>
            <li><strong className="text-[#FFFDF8]/70">Restrict</strong> processing in certain circumstances</li>
            <li><strong className="text-[#FFFDF8]/70">Object</strong> to processing based on legitimate interests</li>
            <li><strong className="text-[#FFFDF8]/70">Portability</strong> — receive your data in a structured, machine-readable format</li>
            <li><strong className="text-[#FFFDF8]/70">Withdraw consent</strong> at any time where processing is based on consent</li>
          </ul>
          <p>To exercise any of these rights, contact us at <a href="mailto:hello@lumio.london" className="text-[#C4973F] hover:text-[#E8B44B] transition-colors">hello@lumio.london</a>. We will respond within 30 days. You also have the right to lodge a complaint with the <strong className="text-[#FFFDF8]/70">Information Commissioner's Office (ICO)</strong> at ico.org.uk.</p>
        </Section>

        <Section title="7. Cookies">
          <p>Our website uses cookies to understand how visitors use it and to improve performance. We use analytics cookies (such as those provided by Vercel Analytics) which do not identify you personally. You can disable cookies in your browser settings at any time.</p>
        </Section>

        <Section title="8. Security">
          <p>We take reasonable technical and organisational measures to protect your data against unauthorised access, loss, or disclosure. All data is transmitted over encrypted connections (HTTPS).</p>
        </Section>

        <Section title="9. Changes to This Policy">
          <p>We may update this Privacy Policy from time to time. Where changes are significant, we will notify existing clients by email. The latest version will always be available at lumio.london/privacy.</p>
        </Section>

        <div className="w-full h-px bg-white/10" />
        <p className="text-xs text-[#8A8278]">
          Data requests and privacy queries:{' '}
          <a href="mailto:hello@lumio.london" className="text-[#C4973F] hover:text-[#E8B44B] transition-colors">hello@lumio.london</a>
        </p>
      </div>
    </main>
  );
}
