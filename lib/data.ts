// ─── Hero ─────────────────────────────────────────────────────────────────────

export const HERO_ACTIVITY = [
  { time: '10:04', title: 'Instagram DM answered', detail: 'Lip filler enquiry moved to booking' },
  { time: '10:07', title: 'Reminder sent', detail: "Tomorrow's consultation confirmed" },
  { time: '10:12', title: 'Review requested', detail: 'Google review flow triggered' },
  { time: '10:19', title: 'Aftercare sent', detail: 'Client received branded guidance' },
];

// ─── Nav / Footer ─────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: 'Services', href: '#services', highlight: false },
  { label: 'How it works', href: '#process', highlight: false },
  { label: 'Pricing', href: '#pricing', highlight: false },
  { label: 'Free Revenue Reveal', href: '/audit', highlight: true },
];

// ─── Marquee ──────────────────────────────────────────────────────────────────

export const MARQUEE_ITEMS = [
  'Lead Response', 'AUTOMATED', 'Booking System', '24/7', 'No-Shows', 'SLASHED',
  'Instagram DMs', 'HANDLED', 'Invoices', 'CHASED', 'Aftercare', 'AUTOMATED',
  'Reviews', 'ON AUTOPILOT', 'Admin', 'ELIMINATED', '5,000+ UK Clinics', 'UNDERSERVED',
];

// ─── Stats ────────────────────────────────────────────────────────────────────

export const STATS = [
  {
    countTarget: 3.6, countDecimals: 1, prefix: '£', suffix: 'bn', commas: false,
    value: '£3.6bn',
    label: 'UK aesthetics market annually — and most clinics are still running on WhatsApp',
    insight: "A £3.6bn industry with zero automation. That's the gap Lumio fills.",
    source: 'WifiTalents, 2026',
  },
  {
    countTarget: 5000, countDecimals: 0, prefix: '', suffix: '+', commas: true,
    value: '5,000+',
    label: 'Independent aesthetic clinics in the UK with no automation system',
    insight: "Most have no way to follow up a single missed enquiry. That's your opportunity.",
    source: 'PolicyBee, 2026',
  },
  {
    countTarget: 23, countDecimals: 0, prefix: '', suffix: '%', commas: false,
    value: '23%',
    label: 'Average no-show rate in aesthetic clinics — pure revenue walking out the door',
    insight: 'Every empty slot costs £150–£400. A smart reminder sequence prevents most of them.',
    source: 'ProspyrMed, 2024',
  },
  {
    countTarget: 185, countDecimals: 0, prefix: '£', suffix: '', commas: false,
    value: '£185',
    label: 'Average revenue per treatment in UK aesthetic clinics — per single booking',
    insight: 'At £185 a treatment, Lumio pays for itself after just a handful of recovered leads.',
    source: 'Aesthetic Medicine, 2024',
  },
];

// ─── Problem ──────────────────────────────────────────────────────────────────

export const PAINS = [
  {
    n: '01',
    text: "Three enquiries came in while you were with a client. By the time you replied, they'd already booked somewhere else. That's £300–£600 gone before you even knew about it.",
  },
  {
    n: '02',
    text: "Someone DM'd your Instagram at 10pm asking about lip filler. You saw it at 9am. The moment had passed. They moved on.",
  },
  {
    n: '03',
    text: "A client hasn't rebooked in 6 weeks. You meant to follow up. You never did. They tried someone new. They stayed.",
  },
  {
    n: '04',
    text: 'Two no-shows this week. Filler prepped. Room booked. Injector paid. £400 of empty time — a simple reminder sequence would have prevented both.',
  },
];

// ─── Services ─────────────────────────────────────────────────────────────────

export const SERVICES = [
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

// ─── Process ──────────────────────────────────────────────────────────────────

export const STEPS = [
  {
    n: '01', time: '30 mins', title: 'Free Discovery Call',
    body: "We understand your clinic, your treatments, your clients, and exactly where you're losing leads and revenue right now. No pressure. Just clarity.",
  },
  {
    n: '02', time: '5–7 days', title: 'We Build Everything',
    body: "We design and build your complete automation system. Branded as your clinic. Tailored to your treatments and voice. You don't touch a thing.",
  },
  {
    n: '03', time: '1 hour', title: 'We Hand It Over',
    body: "We walk you through your Lumio dashboard. Everything is live, tested, and working before handover. One hour of your time. That's it.",
  },
  {
    n: '04', time: '24/7 forever', title: 'Your Clinic Runs Itself',
    body: 'Lumio handles leads, bookings, reminders, rebooking, and admin around the clock. We maintain everything. You focus on your clients.',
  },
];

// ─── Pricing ──────────────────────────────────────────────────────────────────

export const PLANS = [
  {
    name: 'Foundation' as const,
    setup: 1500,
    monthly: 600,
    tagline: 'Everything you need to stop losing leads.',
    features: [
      'Instant lead response system',
      'Automated booking & confirmations',
      'Appointment reminder sequences',
      'Review generation flow',
      'Lumio dashboard access',
      '30-day onboarding support',
    ],
    featured: false,
    badge: null as string | null,
  },
  {
    name: 'Full System' as const,
    setup: 2500,
    monthly: 900,
    tagline: 'Every lead. Every rebook. Everything automated.',
    features: [
      'Everything in Foundation',
      'Instagram DM automation',
      'Rebooking & retention flows',
      'Full AI conversation handling',
      'Monthly performance review',
      'Priority support',
    ],
    featured: true,
    badge: 'Most popular' as string | null,
  },
  {
    name: 'Full Operations' as const,
    setup: 4000,
    monthly: 1400,
    tagline: 'Your entire clinic — front desk and back office — running itself.',
    features: [
      'Everything in Full System',
      'Consent form automation & filing',
      'Aftercare instruction sequences',
      'Invoice chasing automation',
      'Stock & supply reminders',
      'Inbox management flows',
      'Monthly performance reporting',
      'Dedicated monthly account call',
    ],
    featured: false,
    badge: 'Best value' as string | null,
  },
];

export type PlanName = typeof PLANS[number]['name'];

// ─── Testimonial ──────────────────────────────────────────────────────────────

export const TESTIMONIAL = {
  quote: "I went from missing half my evening enquiries to waking up with confirmed bookings. Lumio runs in the background and I don't have to think about it. It just works.",
  author: 'Sarah M. — Aesthetic Clinic Owner, London',
};

// ─── Chat ─────────────────────────────────────────────────────────────────────

export const CHAT_PILLS = [
  { label: 'Get my revenue numbers', message: 'Get my revenue numbers' },
  { label: 'Build my automation blueprint', message: 'Build my automation blueprint' },
  { label: 'See my ROI projection', message: 'See my ROI projection' },
];

export const CHAT_TRUST = [
  { text: 'No data stored — conversations are private' },
  { text: 'Powered by Claude AI' },
  { text: 'Real answers, not scripted responses' },
];

// ─── Audit ────────────────────────────────────────────────────────────────────

export const QUESTIONS = [
  { text: 'How many new enquiries does your clinic receive each week?', options: ['1–5', '6–10', '11–20', '20+'] },
  { text: 'How quickly do you typically respond to a new enquiry?', options: ['Within minutes', 'Within the hour', 'Same day', 'Next day or longer'] },
  { text: "What's your average treatment value?", options: ['Under £100', '£100–£200', '£200–£500', '£500+'] },
  { text: 'What percentage of your appointments are no-shows or last-minute cancellations?', options: ['Less than 5%', '5–10%', '10–20%', 'Over 20%'] },
  { text: 'How do most of your enquiries come in?', options: ['Instagram DMs', 'Website form', 'Phone calls', 'Walk-ins / Word of mouth'] },
  { text: 'Do you currently have an automated system to follow up missed enquiries?', options: ['Yes, fully automated', 'Partially — I do some manually', "No, it's all manual", "I don't follow up at all"] },
  { text: 'Do you have an automated rebooking flow for past clients?', options: ['Yes', 'No', 'I do it manually sometimes', "What's that?"] },
  { text: "What's your biggest operational headache right now?", options: ['Missing enquiries', 'No-shows & cancellations', 'Admin taking too long', 'Getting clients to rebook'] },
];

export const CALC_STEPS = [
  'Analysing your clinic data...',
  'Calculating revenue losses...',
  'Building your personalised report...',
];

export const TIER_FEATURES: Record<PlanName, string[]> = {
  Foundation: [
    'Instant lead response system', 'Automated booking & confirmations',
    'Appointment reminder sequences', 'Review generation flow',
    'Lumio dashboard access', '30-day onboarding support',
  ],
  'Full System': [
    'Everything in Foundation', 'Instagram DM automation',
    'Rebooking & retention flows', 'Full AI conversation handling',
    'Monthly performance review', 'Priority support',
  ],
  'Full Operations': [
    'Everything in Full System', 'Consent form automation & filing',
    'Aftercare instruction sequences', 'Invoice chasing automation',
    'Stock & supply reminders', 'Dedicated monthly account call',
  ],
};
