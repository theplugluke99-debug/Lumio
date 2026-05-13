'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Logo from '@/components/ui/Logo';

type Tab = 'overview' | 'activity' | 'conversations' | 'clients' | 'admin';
type FeedItem = { id: number; time: string; title: string; detail: string; icon: string; category: string };
type Convo = { id: string; name: string; channel: string; preview: string; time: string; messages: { role: 'lumio' | 'client'; text: string }[] };
type Client = { id: string; initials: string; name: string; lastVisit: string; bookings: number; spend: string; treatments: string[]; status: string; nextAppt: string; phone: string; channel: string };
type ChatMsg = { role: 'user' | 'assistant'; content: string };

const s = { fill: 'none' as const, stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

function Icon({ name, className = 'h-5 w-5' }: { name: string; className?: string }) {
  const m: Record<string, React.ReactNode> = {
    overview: <><rect x="3" y="3" width="7" height="7" rx="1.5" {...s}/><rect x="14" y="3" width="7" height="7" rx="1.5" {...s}/><rect x="3" y="14" width="7" height="7" rx="1.5" {...s}/><rect x="14" y="14" width="7" height="7" rx="1.5" {...s}/></>,
    activity: <path d="M3 12h4l2-6 4 12 3-8 2 2h3" {...s}/>,
    conversations: <><path d="M5 6.5h14v8.5H9l-4 3v-11.5Z" {...s}/><path d="M8 10h8M8 13h5" {...s}/></>,
    clients: <><path d="M8.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" {...s}/><path d="M2.8 20c.7-3.3 2.9-5 5.7-5s5 1.7 5.7 5" {...s}/><path d="M17 11a2.8 2.8 0 1 0 0-5.6" {...s}/><path d="M16 15c2.5.2 4.2 1.9 4.8 5" {...s}/></>,
    lock: <><rect x="5" y="10" width="14" height="10" rx="2" {...s}/><path d="M8 10V7a4 4 0 0 1 8 0v3" {...s}/></>,
    settings: <><circle cx="12" cy="12" r="3.5" {...s}/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1 .71V20.5a2 2 0 0 1-4 0v-.18a1.65 1.65 0 0 0-1-.71 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-.71-1H3.5a2 2 0 0 1 0-4h.18a1.65 1.65 0 0 0 .71-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-.71V3.5a2 2 0 0 1 4 0v.18a1.65 1.65 0 0 0 1 .71 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 .71 1H20.5a2 2 0 0 1 0 4h-.18a1.65 1.65 0 0 0-.71 1Z" {...s}/></>,
    bell: <><path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" {...s}/><path d="M10 21h4" {...s}/></>,
    lead: <><path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" {...s}/><path d="M2.5 21c.7-4 2.7-6 5.5-6 1.6 0 2.9.6 3.9 1.8" {...s}/><path d="M14 13h7M17.5 9.5v7" {...s}/></>,
    booking: <><rect x="4" y="5" width="16" height="15" rx="2" {...s}/><path d="M8 3v4M16 3v4M4 10h16" {...s}/><path d="m9 15 2 2 4-5" {...s}/></>,
    noshow: <><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" {...s}/><path d="m15 9-6 6M9 9l6 6" {...s}/></>,
    money: <><path d="M7 7h7a3 3 0 0 1 0 6H7V3" {...s}/><path d="M7 13h8a3 3 0 0 1 0 6H7v-6Z" {...s}/></>,
    star: <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6-5.4-2.8-5.4 2.8 1-6-4.4-4.3 6.1-.9L12 3Z" {...s}/>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" {...s}/><path d="m4 7 8 6 8-6" {...s}/></>,
    pulse: <path d="M3 12h4l2.2-6 4.6 12 2.2-6h5" {...s}/>,
    spark: <><path d="M12 2v5M12 17v5M4.9 4.9l3.5 3.5M15.6 15.6l3.5 3.5M2 12h5M17 12h5M4.9 19.1l3.5-3.5M15.6 8.4l3.5-3.5" {...s}/></>,
    x: <path d="M18 6L6 18M6 6l12 12" {...s}/>,
    send: <><path d="M22 2L11 13" {...s}/><path d="M22 2l-7 20-4-9-9-4 20-7z" {...s}/></>,
    menu: <><path d="M3 12h18M3 6h18M3 18h18" {...s}/></>,
    phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1 19.79 19.79 0 0 1 1.64 4.5 2 2 0 0 1 3.6 2.31h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.97-1.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z" {...s}/>,
  };
  return <svg viewBox="0 0 24 24" className={className}>{m[name] ?? null}</svg>;
}

function ProgressBar({ label, value, amber = false }: { label: string; value: number; amber?: boolean }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm font-bold text-[#1A1814]">
        <span>{label}</span><span>{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[#E8DED2]">
        <div className={`h-full rounded-full ${amber ? 'bg-[#E8B44B]' : 'bg-[#C4973F]'}`} style={{ width: `${value}%`, boxShadow: '0 0 18px rgba(196,151,63,.35)' }} />
      </div>
    </div>
  );
}

function Pill({ status }: { status: string }) {
  const t: Record<string, string> = {
    Active: 'bg-[#EDF4EE] text-[#5B8A68]', VIP: 'bg-[#FFF4DD] text-[#C4973F]',
    New: 'bg-[#F0EDF8] text-[#7C6B9A]', 'Due rebooking': 'bg-[#F9E1DF] text-[#B35A4C]',
    Completed: 'bg-[#EDF4EE] text-[#5B8A68]', Pending: 'bg-[#F9E1DF] text-[#B35A4C]',
    Sent: 'bg-[#FFF4DD] text-[#C4973F]', Paid: 'bg-[#EDF4EE] text-[#5B8A68]',
    Overdue: 'bg-[#F9E1DF] text-[#B35A4C]',
  };
  return <span className={`rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-[.14em] ${t[status] ?? 'bg-[#F4F1EC] text-[#8A8278]'}`}>{status}</span>;
}

function LiveDot() {
  return (
    <span className="relative flex h-2 w-2 shrink-0">
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#E8B44B] opacity-75" style={{ animation: 'ping 2s cubic-bezier(0,0,0.2,1) infinite' }} />
      <span className="relative h-2 w-2 rounded-full bg-[#E8B44B]" />
    </span>
  );
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const INITIAL_FEED: FeedItem[] = [
  { id: 1, time: '09:32', title: 'New DM answered', detail: 'Instagram · Lip filler enquiry qualified and routed to booking', icon: 'conversations', category: 'lead' },
  { id: 2, time: '09:28', title: 'Booking confirmed by AI', detail: 'Lip filler consultation · 27 May at 11:00am', icon: 'booking', category: 'booking' },
  { id: 3, time: '09:15', title: 'Appointment reminder sent', detail: "WhatsApp · Tomorrow's treatment confirmed", icon: 'bell', category: 'booking' },
  { id: 4, time: '09:02', title: 'Review requested', detail: 'Botox · 3 days post-treatment follow-up', icon: 'star', category: 'review' },
  { id: 5, time: '08:48', title: 'Aftercare sent', detail: 'Lip filler · Client +44 7700 900456', icon: 'mail', category: 'admin' },
];

const UPDATE_POOL: Omit<FeedItem, 'id' | 'time'>[] = [
  { title: 'New website enquiry handled', detail: 'Website · Dermaplaning question answered automatically', icon: 'lead', category: 'lead' },
  { title: 'No-show reminder sent', detail: "WhatsApp · 24-hour reminder delivered", icon: 'noshow', category: 'noshow' },
  { title: 'Instagram DM answered', detail: 'Instagram · Filler pricing → booking link sent', icon: 'conversations', category: 'lead' },
  { title: 'Rebooking sequence triggered', detail: "SMS · Client hadn't returned in 6 weeks", icon: 'booking', category: 'booking' },
  { title: '5-star review generated', detail: 'Google · Client left review via automated flow', icon: 'star', category: 'review' },
  { title: 'Consent form chased', detail: "Email · Tomorrow's client — 2nd automated reminder", icon: 'mail', category: 'admin' },
  { title: 'Booking confirmed by AI', detail: 'Cheek filler consultation · 30 May at 2:30pm', icon: 'booking', category: 'booking' },
  { title: 'Lead qualified', detail: 'Phone · Botox enquiry scored and routed to diary', icon: 'lead', category: 'lead' },
];

const FULL_FEED: FeedItem[] = [
  ...INITIAL_FEED,
  { id: 6, time: '08:34', title: 'New website enquiry', detail: 'Website form · Dermaplaning pricing answered', icon: 'lead', category: 'lead' },
  { id: 7, time: '08:21', title: 'No-show prevented', detail: "WhatsApp · Appointment reminder delivered", icon: 'noshow', category: 'noshow' },
  { id: 8, time: '08:10', title: 'Rebook sequence triggered', detail: "SMS · Client hadn't returned in 6 weeks", icon: 'booking', category: 'booking' },
  { id: 9, time: '07:58', title: 'Invoice chased', detail: 'Automatic payment reminder · INV-2055', icon: 'money', category: 'admin' },
  { id: 10, time: '07:45', title: '5-star review received', detail: 'Google · Hydrafacial follow-up', icon: 'star', category: 'review' },
  { id: 11, time: '07:30', title: 'Instagram DM answered', detail: 'Instagram · Filler pricing question → booking', icon: 'conversations', category: 'lead' },
  { id: 12, time: '07:15', title: 'Consent form chased', detail: "Email · Tomorrow's afternoon client", icon: 'mail', category: 'admin' },
  { id: 13, time: '07:01', title: 'Booking confirmed', detail: 'Botox 3-area · 28 May at 6:00pm', icon: 'booking', category: 'booking' },
  { id: 14, time: '06:48', title: 'Lead captured', detail: 'Instagram · Cheek filler enquiry', icon: 'lead', category: 'lead' },
  { id: 15, time: '06:35', title: 'Aftercare reminder', detail: 'Lip filler · Day 7 healing check-in', icon: 'mail', category: 'admin' },
  { id: 16, time: '06:20', title: 'No-show SMS', detail: 'WhatsApp · 48-hour reminder delivered', icon: 'noshow', category: 'noshow' },
  { id: 17, time: '06:05', title: 'Review flow triggered', detail: 'Skin booster · 5-day post-treatment', icon: 'star', category: 'review' },
  { id: 18, time: '05:50', title: 'Rebooking prompt sent', detail: 'Client · 6 weeks since last visit', icon: 'booking', category: 'booking' },
  { id: 19, time: '05:35', title: 'New enquiry handled', detail: 'Phone · Botox first-timer — qualified', icon: 'lead', category: 'lead' },
  { id: 20, time: '05:20', title: 'Monthly report generated', detail: 'May 2026 · Revenue & performance summary', icon: 'pulse', category: 'admin' },
];

const CONVOS: Convo[] = [
  {
    id: '1', name: 'Emma Wilson', channel: 'Instagram', preview: "Saturday works!", time: '09:32',
    messages: [
      { role: 'lumio', text: "Hi Emma! Thanks for reaching out 😊 I'm Lumio, the assistant for Glow Aesthetics. You were asking about lip filler — are you looking for a subtle 0.5ml or a fuller 1ml result?" },
      { role: 'client', text: "I'm not sure tbh — first time. What's the difference?" },
      { role: 'lumio', text: "No worries at all! 0.5ml gives a natural 'your lips but better' look — really popular for first-timers. 1ml is fuller and more defined. We always start with a free consultation so you can decide. We have Thursday 22 May at 2pm or Saturday 24 May at 11am — would either work?" },
      { role: 'client', text: "Saturday works!" },
      { role: 'lumio', text: "Perfect! I've pencilled in Saturday 24 May at 11:00am for your lip consultation with Glow Aesthetics ✅ Can I confirm your full name and a number for your booking reminder?" },
    ],
  },
  {
    id: '2', name: 'Sophie Carter', channel: 'WhatsApp', preview: "Wednesday please", time: '08:14',
    messages: [
      { role: 'lumio', text: "Hi Sophie! It's been around 6 weeks since your last visit — just checking in 💛 How's your treatment looking? We have some lovely availability this week if you'd like to book in?" },
      { role: 'client', text: "Oh wow yes actually, it's started to fade a bit!" },
      { role: 'lumio', text: "Great timing! We have Wednesday 29 May at 3:30pm or Friday 31 May at 11:00am, both with your usual clinician. Which works better?" },
      { role: 'client', text: "Wednesday please" },
      { role: 'lumio', text: "Booked! ✅ Wednesday 29 May at 3:30pm. I'll send a reminder 48 hours before. See you then Sophie 💛" },
    ],
  },
  {
    id: '3', name: 'Charlotte Reed', channel: 'Website', preview: "Evening if possible", time: '07:22',
    messages: [
      { role: 'client', text: "Hi, I'm interested in Botox — never had it before. How much does it cost?" },
      { role: 'lumio', text: "Hi Charlotte! Great to hear from you 😊 Our Botox starts from £180 for one area and £280 for three areas. First consultations are free. Which area were you thinking about?" },
      { role: 'client', text: "Mainly frown lines" },
      { role: 'lumio', text: "Lovely choice — one of our most popular treatments, very natural results. We have slots available this week. Would you prefer daytime or evening?" },
      { role: 'client', text: "Evening if possible" },
      { role: 'lumio', text: "We have Tuesday 28 May at 6:00pm available — shall I reserve that for you? 🗓️" },
    ],
  },
  {
    id: '4', name: 'Olivia Bennett', channel: 'WhatsApp', preview: "OK that's really reassuring", time: '06:50',
    messages: [
      { role: 'lumio', text: "Hi Olivia! It's been 3 days since your lip filler treatment 💛 Just checking in — how are you feeling? Any questions?" },
      { role: 'client', text: "It's a bit more swollen on one side than the other?" },
      { role: 'lumio', text: "Completely normal at day 3 — asymmetrical swelling is very common and settles by day 5–7. Avoid pressure on the area and stay hydrated. If you're still concerned after day 10, just give us a call." },
      { role: 'client', text: "OK that's really reassuring" },
      { role: 'lumio', text: "Brilliant! 😊 Your full aftercare guide is in your email. When you're happy with the results, a Google review would mean the world to us — here's the link: lumio.london/review" },
    ],
  },
];

const CLIENTS: Client[] = [
  { id: '1', initials: 'EW', name: 'Emma Wilson', lastVisit: '18 May 2026', bookings: 7, spend: '£1,240', treatments: ['Lip filler', 'Skin booster'], status: 'Active', nextAppt: '25 May 2026', phone: '+44 7700 900123', channel: 'Instagram' },
  { id: '2', initials: 'SC', name: 'Sophie Carter', lastVisit: '1 Apr 2026', bookings: 12, spend: '£2,180', treatments: ['Botox', 'Lip filler', 'Russian lips'], status: 'Due rebooking', nextAppt: '29 May 2026', phone: '+44 7700 900456', channel: 'WhatsApp' },
  { id: '3', initials: 'CR', name: 'Charlotte Reed', lastVisit: '10 May 2026', bookings: 3, spend: '£450', treatments: ['Botox'], status: 'New', nextAppt: '28 May 2026', phone: '+44 7700 900789', channel: 'Website' },
  { id: '4', initials: 'OB', name: 'Olivia Bennett', lastVisit: '20 May 2026', bookings: 5, spend: '£890', treatments: ['Lip filler', 'Cheek filler'], status: 'Active', nextAppt: '—', phone: '+44 7700 900012', channel: 'Instagram' },
  { id: '5', initials: 'GM', name: 'Grace Mitchell', lastVisit: '5 Apr 2026', bookings: 8, spend: '£1,560', treatments: ['Botox', 'Filler'], status: 'Due rebooking', nextAppt: '—', phone: '+44 7700 900345', channel: 'WhatsApp' },
  { id: '6', initials: 'AC', name: 'Amelia Clarke', lastVisit: '12 May 2026', bookings: 2, spend: '£280', treatments: ['Dermaplaning'], status: 'New', nextAppt: '26 May 2026', phone: '+44 7700 900678', channel: 'Website' },
  { id: '7', initials: 'IM', name: 'Isabelle Moore', lastVisit: '22 May 2026', bookings: 15, spend: '£3,200', treatments: ['Lip filler', 'Botox', 'Hydrafacial', 'Cheek filler'], status: 'VIP', nextAppt: '2 Jun 2026', phone: '+44 7700 900901', channel: 'Referral' },
  { id: '8', initials: 'LT', name: 'Lily Thompson', lastVisit: '19 May 2026', bookings: 1, spend: '£150', treatments: ['Consultation'], status: 'New', nextAppt: '28 May 2026', phone: '+44 7700 900234', channel: 'Google' },
];

// ─── Main ──────────────────────────────────────────────────────────────────────

export default function DemoPage() {
  const [tab, setTab] = useState<Tab>('overview');
  const [clinicName, setClinicName] = useState('Glow Aesthetics London');
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [bannerInput, setBannerInput] = useState('');
  const [lumiOpen, setLumiOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedConvo, setSelectedConvo] = useState('1');
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [actFilter, setActFilter] = useState('all');
  const [feedItems, setFeedItems] = useState<FeedItem[]>(INITIAL_FEED);
  const [lumiMsgs, setLumiMsgs] = useState<ChatMsg[]>([]);
  const [lumiInput, setLumiInput] = useState('');
  const [lumiLoading, setLumiLoading] = useState(false);
  const feedIdx = useRef(0);
  const lumiScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('lumio_demo_clinic') : null;
    if (saved) { setClinicName(saved); setBannerInput(saved === 'Glow Aesthetics London' ? '' : saved); }
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      const item = UPDATE_POOL[feedIdx.current % UPDATE_POOL.length];
      feedIdx.current++;
      const now = new Date();
      const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      setFeedItems(prev => [{ ...item, id: Date.now(), time }, ...prev.slice(0, 19)]);
    }, 8000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (lumiScrollRef.current) lumiScrollRef.current.scrollTop = lumiScrollRef.current.scrollHeight;
  }, [lumiMsgs]);

  const saveClinicName = () => {
    const name = bannerInput.trim() || 'Glow Aesthetics London';
    setClinicName(name);
    if (typeof window !== 'undefined') localStorage.setItem('lumio_demo_clinic', name);
    setBannerDismissed(true);
  };

  const clinicInitials = clinicName.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

  const sendToLumi = useCallback(async (msg: string) => {
    if (!msg.trim() || lumiLoading) return;
    const history: ChatMsg[] = [...lumiMsgs, { role: 'user', content: msg }];
    setLumiMsgs([...history, { role: 'assistant', content: '' }]);
    setLumiInput('');
    setLumiLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.ok || !res.body) throw new Error();
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = '';
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        setLumiMsgs(prev => { const u = [...prev]; u[u.length - 1] = { role: 'assistant', content: acc }; return u; });
      }
    } catch {
      setLumiMsgs(prev => { const u = [...prev]; u[u.length - 1] = { role: 'assistant', content: 'Sorry, I had trouble connecting. Please try again.' }; return u; });
    } finally {
      setLumiLoading(false);
    }
  }, [lumiMsgs, lumiLoading]);

  const navItems = [
    { id: 'overview' as Tab, icon: 'overview', label: 'Overview' },
    { id: 'activity' as Tab, icon: 'activity', label: 'Live activity' },
    { id: 'conversations' as Tab, icon: 'conversations', label: 'Conversations' },
    { id: 'clients' as Tab, icon: 'clients', label: 'Clients' },
    { id: 'admin' as Tab, icon: 'lock', label: 'Admin hub', locked: true },
  ];

  const currentConvo = CONVOS.find(c => c.id === selectedConvo);
  const currentClient = CLIENTS.find(c => c.id === selectedClient);
  const filteredFeed = actFilter === 'all' ? FULL_FEED : FULL_FEED.filter(i => i.category === actFilter);

  return (
    <div style={{ backgroundColor: '#FFFDF8', cursor: 'auto', minHeight: '100dvh' }} className="antialiased text-[#1A1814]">

      {/* Demo banner */}
      {!bannerDismissed && (
        <div className="relative z-50 border-b border-[#C4973F]/20" style={{ backgroundColor: '#1A1814' }}>
          <div className="mx-auto max-w-6xl px-4 py-2.5 flex flex-col sm:flex-row items-center gap-3 justify-between">
            <div className="flex items-center gap-2.5">
              <LiveDot />
              <span className="text-sm text-[#FFFDF8]/75">
                Interactive demo — <span className="text-[#E8B44B] font-semibold">personalise it with your clinic name</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text" placeholder="Your clinic name" value={bannerInput}
                onChange={e => setBannerInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && saveClinicName()}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-[#FFFDF8] placeholder:text-[#FFFDF8]/35 outline-none focus:border-[#C4973F]/60 w-44 transition-colors"
              />
              <button onClick={saveClinicName} className="rounded-full bg-[#C4973F] px-4 py-1.5 text-xs font-bold text-[#1A1814] hover:bg-[#E8B44B] transition-colors whitespace-nowrap">
                Personalise →
              </button>
              <button onClick={() => setBannerDismissed(true)} className="text-[#FFFDF8]/40 hover:text-[#FFFDF8]/80 transition-colors p-1">
                <Icon name="x" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Layout */}
      <div className="flex" style={{ minHeight: bannerDismissed ? '100dvh' : 'calc(100dvh - 44px)' }}>

        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <aside
          className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:sticky lg:top-0 z-50 lg:z-auto h-[100dvh] lg:h-auto w-[280px] shrink-0 border-r border-[rgba(26,24,20,0.08)] transition-transform duration-300 lg:transition-none flex flex-col p-6`}
          style={{ backgroundColor: 'rgba(249,237,232,0.6)', backdropFilter: 'blur(20px)' }}
        >
          <div className="mb-8 pt-2 shrink-0">
            <a href="/"><Logo /></a>
          </div>
          <nav className="space-y-1.5 flex-1">
            {navItems.map(({ id, icon, label, locked }) => (
              <button key={id} type="button"
                onClick={() => { setTab(id); setSidebarOpen(false); }}
                className={`group w-full flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition-all duration-200 ${tab === id ? 'border border-[#C4973F]/35 bg-[#FFFDF8] text-[#C4973F] shadow-[0_14px_40px_rgba(196,151,63,.09)]' : 'text-[#1A1814]/65 hover:bg-white/55 hover:text-[#1A1814]'}`}>
                <div className="flex items-center gap-3">
                  <span className={`grid h-8 w-8 place-items-center rounded-xl ${tab === id ? 'bg-[#C4973F]/12' : 'bg-white/45'}`}>
                    <Icon name={icon} className="h-4 w-4" />
                  </span>
                  <span className="font-semibold">{label}</span>
                </div>
                {locked && (
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-[#C4973F]/12 text-[#C4973F]">
                    <Icon name="lock" className="h-3 w-3" />
                  </span>
                )}
              </button>
            ))}
          </nav>
          <div className="pt-6 shrink-0">
            <a href="/audit" className="block rounded-[1.8rem] border border-[rgba(26,24,20,0.08)] bg-[#FFFDF8]/80 p-5 shadow-[0_20px_70px_rgba(26,24,20,.05)] hover:border-[#C4973F]/35 transition-colors">
              <div className="mb-3 text-[#C4973F]"><Icon name="spark" className="h-5 w-5" /></div>
              <p className="font-display text-xl italic leading-tight text-[#C4973F]">Ready for the real thing?</p>
              <p className="mt-2 text-[11px] font-bold text-[#8A8278]">Get your free clinic audit →</p>
            </a>
          </div>
        </aside>

        {/* Main column */}
        <div className="flex flex-1 min-w-0 flex-col">

          {/* Topbar */}
          <header className="sticky top-0 z-30 border-b border-[rgba(26,24,20,0.08)] px-5 py-4 backdrop-blur-2xl shrink-0"
            style={{ backgroundColor: 'rgba(255,253,248,0.88)' }}>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <button type="button" onClick={() => setSidebarOpen(true)}
                  className="grid h-9 w-9 place-items-center rounded-xl bg-[#F9EDE8] text-[#1A1814] lg:hidden shrink-0">
                  <Icon name="menu" className="h-4 w-4" />
                </button>
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#1A1814] font-display text-lg font-black text-[#E8B44B] shadow-[0_14px_40px_rgba(26,24,20,.12)] shrink-0">
                  {clinicInitials}
                </div>
                <div className="min-w-0">
                  <h1 className="font-display text-lg font-black tracking-[-0.03em] text-[#1A1814] truncate">{clinicName}</h1>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#5B8A68]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#5B8A68] shrink-0" /> Live automation active
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => setLumiOpen(true)}
                  className="hidden md:flex items-center gap-2 rounded-full border border-[#C4973F]/25 px-4 py-2 text-xs font-bold text-[#E8B44B] hover:border-[#C4973F]/50 transition-colors"
                  style={{ backgroundColor: '#1A1814' }}>
                  <LiveDot />
                  Ask Lumio
                </button>
                <button className="relative grid h-10 w-10 place-items-center rounded-full bg-[#F0EDF8] text-[#1A1814] hover:bg-[#F9EDE8] transition-colors">
                  <Icon name="bell" className="h-4 w-4" />
                  <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#C4973F]" style={{ boxShadow: '0 0 8px rgba(196,151,63,.8)' }} />
                </button>
              </div>
            </div>
          </header>

          {/* Scrollable content */}
          <main className="flex-1 overflow-y-auto px-5 py-7 lg:px-8 pb-28 lg:pb-16" style={{ backgroundColor: '#FFFDF8' }}>
            <div className="mx-auto max-w-[1280px]">

              {/* ── Overview ─────────────────────────────────────── */}
              {tab === 'overview' && (
                <div className="space-y-6">
                  <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-[.22em] text-[#C4973F]">Overview</p>
                      <h2 className="mt-1 font-display text-4xl font-black leading-none tracking-[-0.05em]">Clinic command centre</h2>
                    </div>
                    <p className="max-w-md text-sm leading-7 text-[#8A8278]">A live view of what Lumio has captured, handled, and protected this week.</p>
                  </div>

                  {/* Metric cards */}
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {[
                      { tint: '#F9EDE8', icon: 'lead', value: '31', label: 'Leads captured', note: 'Across website, phone and Instagram.', trend: '+18%', foot: 'Captured by Lumio' },
                      { tint: '#F0EDF8', icon: 'booking', value: '19', label: 'Bookings made by AI', note: 'Confirmed without manual chasing.', trend: 'AI', foot: 'No receptionist needed' },
                      { tint: '#EDF4EE', icon: 'noshow', value: '2', label: 'No-shows this week', note: 'Down from 9 after reminders launched.', trend: '-77%', foot: 'Revenue protected' },
                      { tint: '#FFF1D5', icon: 'money', value: '£4,800', label: 'Pipeline value', note: 'Revenue attributed to Lumio-handled leads.', trend: 'Live', foot: 'Tracked this week' },
                    ].map(card => (
                      <div key={card.label} className="group relative min-h-[210px] overflow-hidden rounded-[2rem] border border-[rgba(26,24,20,0.08)] bg-white/82 p-6 shadow-[0_24px_80px_rgba(26,24,20,.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C4973F]/45">
                        <div className="absolute inset-0 opacity-90" style={{ background: `radial-gradient(circle at 18% 12%, ${card.tint}, transparent 52%)` }} />
                        <div className="relative z-10 flex h-full flex-col">
                          <div className="flex items-start justify-between">
                            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/75 text-[#C4973F] shadow-inner"><Icon name={card.icon} className="h-5 w-5" /></div>
                            <span className="rounded-full bg-white/70 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[.14em] text-[#C4973F]">{card.trend}</span>
                          </div>
                          <div className="mt-5 font-display text-5xl font-black leading-none tracking-[-0.06em] text-[#1A1814]">{card.value}</div>
                          <p className="mt-2 text-sm font-extrabold text-[#1A1814]">{card.label}</p>
                          <p className="mt-1 text-xs leading-5 text-[#8A8278]">{card.note}</p>
                          <div className="mt-auto pt-4 text-[10px] font-bold uppercase tracking-[.16em] text-[#8A8278]/70">{card.foot}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-6 xl:grid-cols-[1.15fr_.85fr]">
                    {/* Live feed */}
                    <div className="rounded-[2.2rem] border border-[rgba(26,24,20,0.08)] bg-white/72 p-6 shadow-[0_26px_90px_rgba(26,24,20,.05)] backdrop-blur-xl">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-display text-2xl font-black tracking-[-0.04em]">Today&apos;s automation activity</h3>
                        <span className="flex items-center gap-1.5 rounded-full bg-[#FFF4DD] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.15em] text-[#C4973F]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#C4973F]" /> Live
                        </span>
                      </div>
                      {feedItems.slice(0, 6).map(item => (
                        <div key={item.id} className="flex items-center gap-4 border-b border-[rgba(26,24,20,0.06)] py-3.5 last:border-b-0">
                          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#FFF7E8] text-[#C4973F]"><Icon name={item.icon} className="h-4 w-4" /></div>
                          <div className="w-12 shrink-0 text-xs font-semibold text-[#8A8278]">{item.time}</div>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-bold text-[#1A1814]">{item.title}</div>
                            <div className="mt-0.5 truncate text-xs text-[#8A8278]">{item.detail}</div>
                          </div>
                          <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#5B8A68]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#5B8A68]" /> Done
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col gap-6">
                      {/* Health bars */}
                      <div className="rounded-[2.2rem] border border-[rgba(26,24,20,0.08)] bg-white/72 p-6 shadow-[0_26px_90px_rgba(26,24,20,.05)] backdrop-blur-xl">
                        <div className="mb-5 flex items-center justify-between">
                          <h3 className="font-display text-2xl font-black tracking-[-0.04em]">Automation health</h3>
                          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#FFF4DD] text-[#C4973F]"><Icon name="pulse" className="h-5 w-5" /></span>
                        </div>
                        <div className="space-y-5">
                          <ProgressBar label="Lead response" value={98} />
                          <ProgressBar label="Reminder delivery" value={100} />
                          <ProgressBar label="Rebooking rate" value={74} amber />
                          <ProgressBar label="Review generation" value={81} />
                        </div>
                      </div>
                      {/* Lumi CTA */}
                      <button type="button" onClick={() => setLumiOpen(true)}
                        className="group rounded-[2.2rem] border border-[#C4973F]/25 p-6 text-left transition hover:border-[#C4973F]/50 shadow-[0_26px_90px_rgba(26,24,20,.12)]"
                        style={{ backgroundColor: '#1A1814' }}>
                        <div className="flex items-start gap-4">
                          <div className="relative grid h-12 w-12 shrink-0 place-items-center rounded-[1.4rem] border border-[#C4973F]/25 bg-[#C4973F]/12">
                            <div className="absolute h-7 w-7 rounded-full bg-[#E8B44B]/30 blur-lg" />
                            <div className="relative h-3.5 w-3.5 rounded-full bg-[#E8B44B]" style={{ boxShadow: '0 0 25px rgba(232,180,75,.95)' }} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <LiveDot />
                              <span className="text-[10px] font-extrabold uppercase tracking-[.16em] text-[#E8B44B]">Lumio AI</span>
                            </div>
                            <p className="font-display text-lg font-black text-[#FFFDF8] leading-tight">Ask Lumio about your clinic</p>
                            <p className="mt-1.5 text-xs text-[#FFFDF8]/45 group-hover:text-[#FFFDF8]/65 transition-colors">Which clients need rebooking? →</p>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Intelligence panel */}
                  <div className="relative overflow-hidden rounded-[2.4rem] border border-[#C4973F]/25 p-7 text-[#FFFDF8] shadow-[0_35px_120px_rgba(26,24,20,.24)]" style={{ backgroundColor: '#1A1814' }}>
                    <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#C4973F]/25 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-32 left-6 h-72 w-72 rounded-full bg-[#E8B44B]/10 blur-3xl" />
                    <div className="relative z-10">
                      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <div className="inline-flex items-center gap-2 rounded-full border border-[#C4973F]/20 bg-white/[.05] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[.18em] text-[#E8B44B]">
                            <LiveDot /> Lumio Intelligence
                          </div>
                          <h3 className="mt-4 font-display text-3xl font-black leading-[1.05] tracking-[-0.04em] text-[#FFFDF8] md:text-4xl">
                            Like having your<span className="italic text-[#E8B44B]"> best operator </span>inside the clinic.
                          </h3>
                        </div>
                      </div>
                      <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
                        <div className="space-y-4">
                          <div className="rounded-[1.8rem] border border-white/10 bg-white/[.045] p-5 backdrop-blur-xl">
                            <div className="mb-3 flex items-center gap-3">
                              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#FFF4DD] text-[#C4973F]"><Icon name="spark" className="h-5 w-5" /></div>
                              <div><div className="text-xs font-bold uppercase tracking-[.16em] text-[#E8B44B]">Lumio</div><div className="text-xs text-[#FFFDF8]/45">2 seconds ago</div></div>
                            </div>
                            <p className="text-sm leading-7 text-[#FFFDF8]/72">Instagram DM automation paused Friday 6pm to Monday 9am. I&apos;ll resume automatically.</p>
                            <div className="mt-3 rounded-2xl border border-[#C4973F]/15 bg-[#C4973F]/10 p-3">
                              <p className="text-xs leading-6 text-[#FFFDF8]/62">Want me to add an out-of-office message in the meantime?</p>
                            </div>
                          </div>
                          <div className="rounded-[1.8rem] border border-white/10 bg-white/[.045] p-5 backdrop-blur-xl">
                            <div className="mb-3 flex items-center gap-3">
                              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#F0EDF8] text-[#C4973F]"><Icon name="mail" className="h-5 w-5" /></div>
                              <div><div className="text-xs font-bold uppercase tracking-[.16em] text-[#E8B44B]">Lumio</div><div className="text-xs text-[#FFFDF8]/45">Now active</div></div>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-black/10 p-4 text-sm leading-7 text-[#FFFDF8]/72">
                              &ldquo;Hi! We&apos;re at a training event this weekend and will be back Monday morning. Drop us a message and we&apos;ll get back to you first thing 🌟&rdquo;
                            </div>
                          </div>
                        </div>
                        <div className="rounded-[1.8rem] border border-white/10 bg-white/[.05] p-5 backdrop-blur-xl">
                          <div className="mb-4 flex items-center justify-between gap-3">
                            <div><div className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#E8B44B]">Client retention</div><h4 className="mt-1.5 font-display text-2xl font-black tracking-[-0.04em] text-[#FFFDF8]">Needs rebooking</h4></div>
                            <span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.14em] text-[#FFFDF8]/55">4 clients</span>
                          </div>
                          <div className="space-y-2.5">
                            {[['Emma Wilson', '7 weeks'], ['Sophie Carter', '6 weeks'], ['Olivia Bennett', '8 weeks'], ['Charlotte Hayes', '6 weeks']].map(([name, ago]) => (
                              <div key={name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/10 px-4 py-3 hover:border-[#C4973F]/35 hover:bg-white/[.04] transition-all">
                                <div><div className="text-sm font-bold text-[#FFFDF8]">{name}</div><div className="text-xs text-[#FFFDF8]/45">Last visit · {ago} ago</div></div>
                                <button className="rounded-xl bg-[#C4973F] px-3 py-2 text-[10px] font-extrabold uppercase tracking-[.14em] text-[#1A1814] hover:bg-[#E8B44B] transition-colors">Send</button>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 rounded-2xl border border-[#C4973F]/15 bg-[#C4973F]/10 p-3 flex items-start gap-2">
                            <div className="mt-0.5 text-[#E8B44B] shrink-0"><Icon name="pulse" className="h-4 w-4" /></div>
                            <p className="text-xs leading-6 text-[#FFFDF8]/65">Lumio predicts 68% chance of recovering 2+ clients with a check-in sequence this evening.</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 rounded-[1.8rem] border border-white/10 bg-white/[.04] p-3 backdrop-blur-xl">
                        <div className="flex items-center gap-3 rounded-[1.4rem] border border-white/10 bg-black/10 px-4 py-3">
                          <div className="relative grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-[#FFF4DD]">
                            <div className="absolute h-4 w-4 rounded-full bg-[#E8B44B]/40 blur-sm" />
                            <div className="relative h-2.5 w-2.5 rounded-full bg-[#E8B44B]" style={{ boxShadow: '0 0 20px rgba(232,180,75,.95)' }} />
                          </div>
                          <button onClick={() => setLumiOpen(true)} className="flex-1 text-left text-sm text-[#FFFDF8]/40 hover:text-[#FFFDF8]/65 transition-colors">
                            Ask Lumio anything or give it a task...
                          </button>
                          <button onClick={() => setLumiOpen(true)} className="rounded-2xl bg-[#C4973F] px-5 py-2 text-[10px] font-extrabold uppercase tracking-[.16em] text-[#1A1814] hover:bg-[#E8B44B] transition-colors">
                            Open
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Activity ─────────────────────────────────────── */}
              {tab === 'activity' && (
                <div className="space-y-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-[.22em] text-[#C4973F]">Live Activity</p>
                      <h2 className="mt-1 font-display text-4xl font-black leading-none tracking-[-0.05em]">Everything that happened</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { key: 'all', label: 'All' }, { key: 'lead', label: 'Leads' }, { key: 'booking', label: 'Bookings' },
                        { key: 'noshow', label: 'No-shows' }, { key: 'review', label: 'Reviews' }, { key: 'admin', label: 'Admin' },
                      ].map(f => (
                        <button key={f.key} type="button" onClick={() => setActFilter(f.key)}
                          className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[.12em] transition-all ${actFilter === f.key ? 'bg-[#C4973F] text-[#1A1814]' : 'bg-[#F9EDE8] text-[#8A8278] hover:bg-[#F0EDF8]'}`}>
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[2.2rem] border border-[rgba(26,24,20,0.08)] bg-white/72 p-6 shadow-[0_26px_90px_rgba(26,24,20,.05)] backdrop-blur-xl">
                    {filteredFeed.map(item => (
                      <div key={item.id} className="flex items-center gap-4 border-b border-[rgba(26,24,20,0.06)] py-4 last:border-b-0">
                        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#FFF7E8] text-[#C4973F]"><Icon name={item.icon} className="h-5 w-5" /></div>
                        <div className="w-12 shrink-0 text-xs font-semibold text-[#8A8278]">{item.time}</div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-bold text-[#1A1814]">{item.title}</div>
                          <div className="mt-0.5 truncate text-xs text-[#8A8278] sm:whitespace-normal">{item.detail}</div>
                        </div>
                        <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#5B8A68]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#5B8A68]" /> Completed
                        </div>
                      </div>
                    ))}
                    {filteredFeed.length === 0 && <div className="py-12 text-center text-sm text-[#8A8278]">No activity in this category today.</div>}
                  </div>
                </div>
              )}

              {/* ── Conversations ────────────────────────────────── */}
              {tab === 'conversations' && (
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[.22em] text-[#C4973F]">Conversations</p>
                    <h2 className="mt-1 font-display text-4xl font-black leading-none tracking-[-0.05em]">Handled by Lumio</h2>
                  </div>
                  <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
                    <div className="rounded-[2.2rem] border border-[rgba(26,24,20,0.08)] bg-white/72 overflow-hidden shadow-[0_26px_90px_rgba(26,24,20,.05)]">
                      {CONVOS.map(c => (
                        <button key={c.id} type="button" onClick={() => setSelectedConvo(c.id)}
                          className={`w-full flex items-center gap-4 border-b border-[rgba(26,24,20,0.06)] p-5 text-left transition-all last:border-b-0 ${selectedConvo === c.id ? 'bg-[#FFF4DD]' : 'hover:bg-[#F9EDE8]/50'}`}>
                          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl font-display text-sm font-black text-[#E8B44B]" style={{ backgroundColor: '#1A1814' }}>
                            {c.name.split(' ').map(w => w[0]).join('')}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-sm font-bold text-[#1A1814]">{c.name}</span>
                              <span className="text-xs text-[#8A8278] shrink-0">{c.time}</span>
                            </div>
                            <div className="mt-0.5 text-xs text-[#8A8278] truncate">{c.preview}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                    {currentConvo && (
                      <div className="rounded-[2.2rem] border border-[rgba(26,24,20,0.08)] bg-white/72 flex flex-col overflow-hidden shadow-[0_26px_90px_rgba(26,24,20,.05)]">
                        <div className="flex items-center gap-4 border-b border-[rgba(26,24,20,0.08)] px-6 py-4">
                          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl font-display text-sm font-black text-[#E8B44B]" style={{ backgroundColor: '#1A1814' }}>
                            {currentConvo.name.split(' ').map(w => w[0]).join('')}
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-[#1A1814]">{currentConvo.name}</div>
                            <div className="text-xs text-[#8A8278]">via {currentConvo.channel} · Handled by Lumio</div>
                          </div>
                          <Pill status="Completed" />
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[480px]">
                          {currentConvo.messages.map((msg, i) => (
                            <div key={i} className={`flex gap-3 ${msg.role === 'client' ? 'flex-row-reverse' : ''}`}>
                              {msg.role === 'lumio' && (
                                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-2xl mt-1" style={{ backgroundColor: '#1A1814' }}>
                                  <div className="h-2.5 w-2.5 rounded-full bg-[#E8B44B]" style={{ boxShadow: '0 0 12px rgba(232,180,75,.9)' }} />
                                </div>
                              )}
                              <div className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-6 ${msg.role === 'lumio' ? 'text-[#FFFDF8]/80 rounded-tl-sm' : 'bg-[#F9EDE8] text-[#1A1814] rounded-tr-sm'}`}
                                style={msg.role === 'lumio' ? { backgroundColor: '#1A1814' } : undefined}>
                                {msg.text}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── Clients ──────────────────────────────────────── */}
              {tab === 'clients' && (
                <div className="space-y-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-[.22em] text-[#C4973F]">Clients</p>
                      <h2 className="mt-1 font-display text-4xl font-black leading-none tracking-[-0.05em]">Your client base</h2>
                    </div>
                    <p className="text-sm text-[#8A8278]">{CLIENTS.length} clients · click a row to view</p>
                  </div>
                  <div className={`grid gap-6 ${selectedClient ? 'xl:grid-cols-[1fr_380px]' : ''}`}>
                    <div className="rounded-[2.2rem] border border-[rgba(26,24,20,0.08)] bg-white/72 overflow-hidden shadow-[0_26px_90px_rgba(26,24,20,.05)]">
                      <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 bg-[#F9EDE8]/55 px-6 py-4 text-[10px] font-extrabold uppercase tracking-[.18em] text-[#8A8278]">
                        <div>Client</div><div className="hidden sm:block">Last visit</div><div>Bookings</div><div className="hidden sm:block">Status</div>
                      </div>
                      {CLIENTS.map(client => (
                        <button key={client.id} type="button"
                          onClick={() => setSelectedClient(selectedClient === client.id ? null : client.id)}
                          className={`w-full grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center border-t border-[rgba(26,24,20,0.06)] px-6 py-4 text-left transition-all ${selectedClient === client.id ? 'bg-[#FFF4DD]' : 'bg-white hover:bg-[#F9EDE8]/30'}`}>
                          <div className="flex items-center gap-3">
                            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl font-display text-sm font-black text-[#E8B44B]" style={{ backgroundColor: '#1A1814' }}>{client.initials}</div>
                            <div><div className="font-bold text-[#1A1814]">{client.name}</div><div className="text-xs text-[#8A8278]">{client.spend} · via {client.channel}</div></div>
                          </div>
                          <div className="hidden text-sm text-[#8A8278] sm:block">{client.lastVisit}</div>
                          <div className="text-sm font-bold text-[#1A1814]">{client.bookings}</div>
                          <div className="hidden sm:block"><Pill status={client.status} /></div>
                        </button>
                      ))}
                    </div>
                    {currentClient && (
                      <div className="rounded-[2.2rem] border border-[rgba(26,24,20,0.08)] bg-white/72 p-6 shadow-[0_26px_90px_rgba(26,24,20,.05)] h-fit">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center gap-3">
                            <div className="grid h-14 w-14 place-items-center rounded-2xl font-display text-xl font-black text-[#E8B44B]" style={{ backgroundColor: '#1A1814' }}>{currentClient.initials}</div>
                            <div><div className="font-display text-xl font-black text-[#1A1814]">{currentClient.name}</div><div className="mt-1"><Pill status={currentClient.status} /></div></div>
                          </div>
                          <button onClick={() => setSelectedClient(null)} className="text-[#8A8278] hover:text-[#1A1814] transition-colors p-1">
                            <Icon name="x" className="h-5 w-5" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-5">
                          {[['Bookings', String(currentClient.bookings)], ['Total spend', currentClient.spend], ['Last visit', currentClient.lastVisit], ['Next appt', currentClient.nextAppt]].map(([label, val]) => (
                            <div key={label} className="rounded-2xl border border-[rgba(26,24,20,0.08)] bg-[#F9EDE8]/40 p-4">
                              <div className="text-[10px] font-bold uppercase tracking-[.14em] text-[#8A8278]">{label}</div>
                              <div className="mt-1 font-display text-lg font-black text-[#1A1814]">{val}</div>
                            </div>
                          ))}
                        </div>
                        <div className="mb-4">
                          <div className="text-[10px] font-bold uppercase tracking-[.14em] text-[#8A8278] mb-2">Treatments</div>
                          <div className="flex flex-wrap gap-2">{currentClient.treatments.map(t => <span key={t} className="rounded-full bg-[#FFF4DD] px-3 py-1.5 text-xs font-bold text-[#C4973F]">{t}</span>)}</div>
                        </div>
                        <div className="mb-5">
                          <div className="text-[10px] font-bold uppercase tracking-[.14em] text-[#8A8278] mb-1">Contact</div>
                          <div className="text-sm text-[#1A1814]">{currentClient.phone}</div>
                        </div>
                        <button className="w-full rounded-2xl bg-[#C4973F] px-4 py-3 text-xs font-extrabold uppercase tracking-[.14em] text-[#1A1814] hover:bg-[#E8B44B] transition-colors">
                          Send rebooking message →
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── Admin Hub (locked) ───────────────────────────── */}
              {tab === 'admin' && (
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[.22em] text-[#C4973F]">Operations Suite</p>
                    <h2 className="mt-1 font-display text-4xl font-black leading-none tracking-[-0.05em]">A back office that runs itself.</h2>
                  </div>
                  <div className="relative overflow-hidden rounded-[2.5rem] border border-[rgba(26,24,20,0.08)] shadow-[0_35px_120px_rgba(26,24,20,.08)]">
                    <div className="p-8 select-none pointer-events-none" style={{ opacity: 0.3, filter: 'blur(3px)' }}>
                      <div className="grid gap-6 xl:grid-cols-2">
                        <div className="rounded-[2rem] border border-[rgba(26,24,20,0.08)] bg-white/80 p-6">
                          <div className="mb-5 flex items-center justify-between">
                            <div><div className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#8A8278]">Consent forms</div><h4 className="mt-2 font-display text-3xl font-black">Tracker</h4></div>
                            <Pill status="Sent" />
                          </div>
                          {[['Amelia Clarke', '11:00am', 'Completed'], ['Grace Miller', '1:30pm', 'Pending'], ['Sophia Reed', '3:00pm', 'Sent']].map(([name, time, status]) => (
                            <div key={name} className="flex items-center justify-between rounded-2xl border border-[rgba(26,24,20,0.06)] bg-[#FFFDF8] px-4 py-4 mb-3 last:mb-0">
                              <div><div className="font-bold text-[#1A1814]">{name}</div><div className="text-xs text-[#8A8278]">Appt · {time}</div></div>
                              <Pill status={status} />
                            </div>
                          ))}
                        </div>
                        <div className="space-y-4">
                          <div className="rounded-[2rem] border border-[rgba(26,24,20,0.08)] bg-white/80 p-6">
                            <div className="mb-4 flex items-center justify-between"><div><div className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#8A8278]">Invoices</div><h4 className="mt-2 font-display text-3xl font-black">Auto-chasing</h4></div></div>
                            {[['INV-2048', '£480', 'Paid'], ['INV-2051', '£220', 'Sent'], ['INV-2055', '£640', 'Overdue']].map(([id, amt, status]) => (
                              <div key={id} className="flex items-center justify-between rounded-2xl border border-[rgba(26,24,20,0.06)] bg-[#FFFDF8] px-4 py-4 mb-3 last:mb-0">
                                <div><div className="font-bold text-[#1A1814]">{id}</div><div className="text-xs text-[#8A8278]">{amt}</div></div>
                                <Pill status={status} />
                              </div>
                            ))}
                          </div>
                          <div className="rounded-[2rem] p-6 text-[#FFFDF8]" style={{ backgroundColor: '#1A1814' }}>
                            <div className="text-xs uppercase tracking-[.18em] text-[#E8B44B]">Monthly report · May 2026</div>
                            <div className="mt-4 grid grid-cols-2 gap-4">
                              <div><div className="font-display text-4xl font-black">+38%</div><div className="mt-1 text-xs text-[#FFFDF8]/55">Lead response</div></div>
                              <div><div className="font-display text-4xl font-black">£18.4k</div><div className="mt-1 text-xs text-[#FFFDF8]/55">Revenue attributed</div></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Lock overlay */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center p-6" style={{ background: 'rgba(255,253,248,0.5)', backdropFilter: 'blur(2px)' }}>
                      <div className="max-w-sm w-full rounded-[2.2rem] border border-[#C4973F]/25 p-8 text-center shadow-[0_35px_120px_rgba(26,24,20,.4)]" style={{ backgroundColor: '#1A1814' }}>
                        <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-[1.7rem] border border-[#C4973F]/20 bg-[#C4973F]/10 text-[#E8B44B]">
                          <Icon name="lock" className="h-7 w-7" />
                        </div>
                        <div className="text-[10px] font-extrabold uppercase tracking-[.22em] text-[#E8B44B]">Full Operations</div>
                        <h4 className="mt-4 font-display text-4xl font-black leading-[.95] tracking-[-0.05em] text-[#FFFDF8]">Unlock the complete back office.</h4>
                        <p className="mt-4 text-sm leading-7 text-[#FFFDF8]/62">Consent forms. Invoice chasing. Reporting. Stock intelligence. Your entire back office — automated.</p>
                        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[.05] px-5 py-3 text-sm font-semibold text-[#FFFDF8]/72">
                          From <span className="text-[#E8B44B]">£4,000 setup</span> · <span className="text-[#E8B44B]">£1,400/month</span>
                        </div>
                        <a href="/audit" className="mt-5 block rounded-2xl bg-[#C4973F] px-7 py-4 text-[10px] font-extrabold uppercase tracking-[.18em] text-[#1A1814] hover:bg-[#E8B44B] transition-colors">
                          Get your free clinic audit →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </main>
        </div>
      </div>

      {/* Lumi slide-over */}
      {lumiOpen && <div className="fixed inset-0 z-50 bg-black/20 lg:bg-transparent" onClick={() => setLumiOpen(false)} />}
      <div className={`fixed right-0 top-0 z-50 h-full w-full max-w-[400px] flex flex-col shadow-[-30px_0_80px_rgba(26,24,20,.2)] transition-transform duration-300 ${lumiOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ backgroundColor: '#1A1814' }}>
        <div className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-[#C4973F]/15 blur-3xl" />
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4 shrink-0">
            <div className="relative grid h-10 w-10 place-items-center rounded-2xl border border-[#C4973F]/25 bg-[#C4973F]/12 shrink-0">
              <div className="absolute h-6 w-6 rounded-full bg-[#E8B44B]/35 blur-lg" />
              <div className="relative h-3 w-3 rounded-full bg-[#E8B44B]" style={{ boxShadow: '0 0 18px rgba(232,180,75,.95)' }} />
            </div>
            <div className="flex-1">
              <div className="font-bold text-[#FFFDF8]">Lumio AI</div>
              <div className="text-xs text-[#FFFDF8]/45">Ask anything about your clinic</div>
            </div>
            <button onClick={() => setLumiOpen(false)} className="text-[#FFFDF8]/40 hover:text-[#FFFDF8]/80 transition-colors p-1">
              <Icon name="x" className="h-5 w-5" />
            </button>
          </div>
          <div ref={lumiScrollRef} className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
            {lumiMsgs.length === 0 && (
              <div className="space-y-3 pt-2">
                <p className="text-sm text-[#FFFDF8]/50 leading-6">Ask anything or try one of these:</p>
                {["Which clients need rebooking?", "How many leads did we capture today?", "Summarise this week's performance", "Draft a follow-up for no-shows"].map(q => (
                  <button key={q} type="button" onClick={() => sendToLumi(q)}
                    className="w-full rounded-2xl border border-white/10 bg-white/[.045] px-4 py-3 text-left text-xs text-[#FFFDF8]/70 hover:border-[#C4973F]/35 hover:bg-white/[.06] transition-all">
                    {q} →
                  </button>
                ))}
              </div>
            )}
            {lumiMsgs.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {msg.role === 'assistant' && (
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-2xl bg-[#FFF4DD] mt-0.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#E8B44B]" style={{ boxShadow: '0 0 12px rgba(232,180,75,.9)' }} />
                  </div>
                )}
                <div className={`max-w-[84%] rounded-2xl px-4 py-3 text-sm leading-6 ${msg.role === 'assistant' ? 'bg-white/[.07] text-[#FFFDF8]/80 rounded-tl-sm' : 'bg-[#C4973F] text-[#1A1814] font-semibold rounded-tr-sm'}`}>
                  {msg.content === '' && lumiLoading && i === lumiMsgs.length - 1
                    ? <span className="flex gap-1 pt-1">{[0, 1, 2].map(d => <span key={d} className="h-1.5 w-1.5 rounded-full bg-[#E8B44B] typing-dot" style={{ animationDelay: `${d * 0.14}s` }} />)}</span>
                    : msg.content}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 p-4 shrink-0">
            <form onSubmit={e => { e.preventDefault(); sendToLumi(lumiInput); }} className="flex gap-2">
              <input
                value={lumiInput} onChange={e => setLumiInput(e.target.value)}
                placeholder="Ask Lumio anything..."
                className="flex-1 rounded-2xl border border-white/15 bg-white/[.07] px-4 py-3 text-sm text-[#FFFDF8] placeholder:text-[#FFFDF8]/35 focus:outline-none focus:border-[#C4973F]/50 transition-colors"
              />
              <button type="submit" disabled={!lumiInput.trim() || lumiLoading}
                className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#C4973F] text-[#1A1814] hover:bg-[#E8B44B] transition-colors disabled:opacity-40">
                <Icon name="send" className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[rgba(26,24,20,0.08)] lg:hidden"
        style={{ backgroundColor: 'rgba(255,253,248,0.95)', backdropFilter: 'blur(20px)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="grid grid-cols-5 gap-1 p-2">
          {[
            { id: 'overview' as Tab, icon: 'overview', label: 'Home' },
            { id: 'activity' as Tab, icon: 'activity', label: 'Live' },
            { id: 'conversations' as Tab, icon: 'conversations', label: 'Inbox' },
            { id: 'clients' as Tab, icon: 'clients', label: 'Clients' },
          ].map(({ id, icon, label }) => (
            <button key={id} type="button" onClick={() => setTab(id)}
              className={`grid place-items-center gap-1 rounded-2xl px-2 py-2.5 text-[10px] font-bold transition-all ${tab === id ? 'bg-[#C4973F] text-[#1A1814]' : 'text-[#8A8278]'}`}>
              <Icon name={icon} className="h-4 w-4" />
              {label}
            </button>
          ))}
          <button type="button" onClick={() => setLumiOpen(true)}
            className="grid place-items-center gap-1 rounded-2xl px-2 py-2.5 text-[10px] font-bold text-[#E8B44B]" style={{ backgroundColor: '#1A1814' }}>
            <Icon name="spark" className="h-4 w-4" />
            Lumio
          </button>
        </div>
      </nav>

      {/* Desktop CTA pill */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 hidden lg:block">
        <a href="/audit"
          className="flex items-center gap-4 rounded-full border border-[rgba(26,24,20,0.1)] px-6 py-3 shadow-[0_20px_60px_rgba(26,24,20,.1)] backdrop-blur-xl hover:shadow-[0_20px_60px_rgba(196,151,63,.15)] transition-all"
          style={{ backgroundColor: 'rgba(255,253,248,0.92)' }}>
          <span className="text-sm font-semibold text-[#1A1814]">Ready to see this in your clinic?</span>
          <span className="rounded-full bg-[#C4973F] px-4 py-1.5 text-xs font-bold text-[#1A1814] hover:bg-[#E8B44B] transition-colors">
            Get your free audit →
          </span>
        </a>
      </div>

    </div>
  );
}
