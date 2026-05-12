'use client';

const SERVICES = [
  {
    n: '01', icon: '✦', name: 'Instant Lead Response',
    body: "Every enquiry answered in seconds — 24 hours a day, 7 days a week. Your AI qualifies leads, answers questions about your treatments, and moves them toward booking while you're with clients. You never miss another lead again.",
    stat: '↑ Response rate from hours to seconds',
  },
  {
    n: '02', icon: '◐', name: 'Automated Booking & Reminders',
    body: "Appointments booked, confirmed, and reminded automatically. Intelligent multi-step reminder sequences reduce no-shows dramatically. No more £300 empty slots from treatments you've already prepped for.",
    stat: '↓ No-show rate by up to 60%',
  },
  {
    n: '03', icon: '✉', name: 'Instagram DM Automation',
    body: "Someone DMs at 11pm asking about Botox. Lumio responds instantly — branded as you, conversational, warm. It answers their questions and books them in before you've even woken up.",
    stat: 'Zero missed DMs. Ever.',
  },
  {
    n: '04', icon: '↻', name: 'Rebooking & Retention',
    body: 'Your existing clients are your most profitable asset. Lumio automatically follows up after every treatment, nurtures rebookings, and keeps clients returning month after month — without you lifting a finger.',
    stat: '↑ Client lifetime value significantly',
  },
  {
    n: '05', icon: '★', name: 'Five-Star Review Generation',
    body: 'After every completed treatment, a perfectly timed message requests a Google review. More five-star reviews. Better local ranking. More organic bookings. Zero effort from you.',
    stat: 'Reputation growing on autopilot',
  },
  {
    n: '06', icon: '⌁', name: 'Full Admin Automation',
    body: 'Consent forms chased and filed. Aftercare instructions sent automatically. Invoices chased. Stock reminders triggered. Monthly reports generated. Your entire back office, running without you.',
    stat: 'Hours back every single week',
  },
  {
    n: '07', icon: '◈', name: 'Your Lumio Dashboard',
    body: 'Every lead captured, every conversation handled, every booking made, every admin task completed — visible in one clean dashboard. Real numbers. Real revenue attributed to Lumio. Always in your control.',
    stat: 'Complete visibility. Zero admin.',
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 px-4"
      style={{ background: 'linear-gradient(180deg, #FFFDF8 0%, #F0EDF8 50%, #FFFDF8 100%)' }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-[.2em] text-[#C4973F]">What Lumio does</span>
          <h2 className="mt-3 font-display font-black text-5xl md:text-7xl leading-[.9] tracking-[-0.03em] text-[#1A1814]">
            Everything <span className="italic gold-text">handled.</span>
          </h2>
          <p className="mt-4 text-[#8A8278] max-w-md mx-auto text-base">
            Built for your clinic. Live in 5–7 days. No tech knowledge needed.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s) => (
            <div
              key={s.n}
              className="group relative rounded-[2rem] border border-[#1A1814]/8 bg-[#FFFDF8]/78 shadow-sm p-7 flex flex-col gap-4 overflow-hidden transition-all duration-300 hover:-translate-y-1"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '#C4973F';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 60px rgba(196,151,63,.12)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '';
                (e.currentTarget as HTMLElement).style.boxShadow = '';
              }}
            >
              <span className="absolute top-5 right-6 font-display italic font-black text-[4rem] leading-none text-[#1A1814]/[0.04] select-none">
                {s.n}
              </span>
              <div className="h-10 w-10 rounded-2xl bg-[#C4973F] flex items-center justify-center text-white text-lg">
                {s.icon}
              </div>
              <h3 className="font-display font-bold text-xl text-[#1A1814]">{s.name}</h3>
              <p className="text-sm text-[#8A8278] leading-relaxed flex-1">{s.body}</p>
              <div className="relative">
                <p className="text-xs font-bold text-[#C4973F] uppercase tracking-wide">{s.stat}</p>
                <span className="absolute bottom-[-2px] left-0 h-[2px] w-0 bg-[#C4973F] transition-all duration-500 group-hover:w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
