import Logo from '@/components/ui/Logo';

export const metadata = {
  title: 'Terms of Service — Lumio',
  description: 'Terms of Service for Lumio, trading name of Favours OS Ltd.',
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

export default function TermsPage() {
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
          <h1 className="font-display font-black italic text-5xl md:text-6xl text-[#FFFDF8] leading-[.9] tracking-[-0.03em]">Terms of Service</h1>
          <p className="text-[#8A8278] text-sm mt-2">Favours OS Ltd (trading as Lumio) · Last updated: May 2025</p>
        </div>

        <div className="w-full h-px bg-white/10" />

        <Section title="1. Who We Are">
          <p>These Terms of Service govern your use of services provided by <strong className="text-[#FFFDF8]/70">Favours OS Ltd</strong>, a company registered in England and Wales, trading as <strong className="text-[#FFFDF8]/70">Lumio</strong> ("we", "us", "our").</p>
          <p>By engaging our services you agree to be bound by these terms. Please read them carefully before proceeding.</p>
        </Section>

        <Section title="2. Services Provided">
          <p>Lumio provides AI-powered automation services for aesthetic clinics, including but not limited to:</p>
          <ul className="list-disc list-inside flex flex-col gap-1.5 pl-2">
            <li>AI-driven enquiry response and lead capture</li>
            <li>Automated appointment booking and calendar management</li>
            <li>Client follow-up and rebooking sequences</li>
            <li>Administrative automation and workflow setup</li>
            <li>Ongoing optimisation and support</li>
          </ul>
          <p>The exact scope of services is confirmed in writing at the point of engagement. We reserve the right to update or improve our service offering at any time, provided core deliverables remain fulfilled.</p>
        </Section>

        <Section title="3. Payment Terms">
          <p>Our pricing structure consists of:</p>
          <ul className="list-disc list-inside flex flex-col gap-1.5 pl-2">
            <li><strong className="text-[#FFFDF8]/70">Setup fee:</strong> a one-time fee payable before work commences, covering onboarding, configuration, and integration.</li>
            <li><strong className="text-[#FFFDF8]/70">Monthly retainer:</strong> a recurring fee billed monthly in advance, covering ongoing management, optimisation, and support.</li>
          </ul>
          <p>All fees are quoted exclusive of VAT where applicable. Payment is due within 7 days of invoice. Late payments may incur interest at 8% above the Bank of England base rate under the Late Payment of Commercial Debts Act 1998.</p>
          <p><strong className="text-[#FFFDF8]/70">Cancellation:</strong> Either party may terminate the monthly retainer with 30 days' written notice. Notice must be sent to hello@lumio.london. The setup fee is non-refundable except as set out in clause 4 below.</p>
        </Section>

        <Section title="4. Money-Back Guarantee">
          <p>We are confident in the results our system delivers. If, within the first 30 days of your service going live, we have not generated at least <strong className="text-[#FFFDF8]/70">5 qualified leads</strong> for your clinic, we will refund your setup fee in full — no questions asked.</p>
          <p>A "qualified lead" is defined as a genuine enquiry from a prospective client that has been captured and responded to via the Lumio system. This guarantee applies to the initial setup fee only and does not cover monthly retainer payments already made.</p>
          <p>To claim, contact us at hello@lumio.london within 35 days of your go-live date.</p>
        </Section>

        <Section title="5. Intellectual Property">
          <p>All proprietary systems, automations, workflows, prompts, and software developed by Lumio remain the intellectual property of Favours OS Ltd. You are granted a non-exclusive licence to use these systems for the duration of your engagement.</p>
          <p>Any content, branding, or clinic-specific materials you provide remain your property. You grant us a limited licence to use them solely for the purpose of delivering the agreed services.</p>
        </Section>

        <Section title="6. Confidentiality">
          <p>Both parties agree to keep confidential any non-public information received in connection with the engagement. This includes pricing, client data, system configurations, and business processes. This obligation survives termination of the agreement.</p>
        </Section>

        <Section title="7. Limitation of Liability">
          <p>To the maximum extent permitted by law, Favours OS Ltd's total liability to you in connection with these terms shall not exceed the total fees paid by you in the 3 months preceding the claim.</p>
          <p>We shall not be liable for any indirect, consequential, incidental, or special damages, including loss of revenue, loss of profits, or loss of data, even if advised of the possibility of such damages.</p>
          <p>Nothing in these terms limits liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded by law.</p>
        </Section>

        <Section title="8. Governing Law">
          <p>These terms are governed by the laws of <strong className="text-[#FFFDF8]/70">England and Wales</strong>. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
        </Section>

        <Section title="9. Changes to These Terms">
          <p>We may update these terms from time to time. Where changes are material, we will notify you by email. Continued use of our services after notice constitutes acceptance of the updated terms.</p>
        </Section>

        <div className="w-full h-px bg-white/10" />
        <p className="text-xs text-[#8A8278]">
          Questions? Contact us at{' '}
          <a href="mailto:hello@lumio.london" className="text-[#C4973F] hover:text-[#E8B44B] transition-colors">hello@lumio.london</a>
        </p>
      </div>
    </main>
  );
}
