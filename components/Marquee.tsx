'use client';

const ITEMS = [
  'Lead Response', 'AUTOMATED', 'Booking System', '24/7', 'No-Shows', 'SLASHED',
  'Instagram DMs', 'HANDLED', 'Invoices', 'CHASED', 'Aftercare', 'AUTOMATED',
  'Reviews', 'ON AUTOPILOT', 'Admin', 'ELIMINATED', '5,000+ UK Clinics', 'UNDERSERVED',
];

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="bg-[#C4973F] border-y-2 border-[#1A1814] overflow-hidden py-3.5">
      <div className="marquee-track flex items-center gap-6 whitespace-nowrap w-max">
        {doubled.map((item, i) => (
          <span key={i} className="text-sm font-bold uppercase tracking-[.18em] text-[#1A1814] shrink-0">
            {item}
            {i < doubled.length - 1 && <span className="ml-6 opacity-40">·</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
