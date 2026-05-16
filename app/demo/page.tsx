'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import Logo from '@/components/ui/Logo';
import { MD } from '@/lib/chat';
import VoiceProfile from '@/components/demo/VoiceProfile';
import SuggestedActions from '@/components/demo/SuggestedActions';
import PerformanceGraph from '@/components/demo/PerformanceGraph';
import ClientProfile from '@/components/demo/ClientProfile';
import IntegrationsTab from '@/components/demo/IntegrationsTab';
import MicButton from '@/components/MicButton';
import { PWASetup } from '@/components/PWASetup';

type Tab = 'overview' | 'activity' | 'conversations' | 'clients' | 'voice' | 'admin' | 'integrations';
type Tier = 'foundation' | 'fullsystem' | 'fullops';
type FeedItem = { id: number; time: string; title: string; detail: string; icon: string; category: string };
type Convo = { id: string; name: string; channel: string; preview: string; time: string; messages: { role: 'lumio' | 'client'; text: string }[] };
type Client = { id: string; initials: string; name: string; lastVisit: string; bookings: number; spend: string; treatments: string[]; status: string; nextAppt: string; phone: string; channel: string };
type ChatMsg = { role: 'user' | 'assistant'; content: string };

const SVG = { fill: 'none' as const, stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

function Icon({ name, className = 'h-5 w-5' }: { name: string; className?: string }) {
  const m: Record<string, React.ReactNode> = {
    overview: <><rect x="3" y="3" width="7" height="7" rx="1.5" {...SVG}/><rect x="14" y="3" width="7" height="7" rx="1.5" {...SVG}/><rect x="3" y="14" width="7" height="7" rx="1.5" {...SVG}/><rect x="14" y="14" width="7" height="7" rx="1.5" {...SVG}/></>,
    activity: <path d="M3 12h4l2-6 4 12 3-8 2 2h3" {...SVG}/>,
    conversations: <><path d="M5 6.5h14v8.5H9l-4 3v-11.5Z" {...SVG}/><path d="M8 10h8M8 13h5" {...SVG}/></>,
    clients: <><path d="M8.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" {...SVG}/><path d="M2.8 20c.7-3.3 2.9-5 5.7-5s5 1.7 5.7 5" {...SVG}/><path d="M17 11a2.8 2.8 0 1 0 0-5.6" {...SVG}/><path d="M16 15c2.5.2 4.2 1.9 4.8 5" {...SVG}/></>,
    lock: <><rect x="5" y="10" width="14" height="10" rx="2" {...SVG}/><path d="M8 10V7a4 4 0 0 1 8 0v3" {...SVG}/></>,
    bell: <><path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" {...SVG}/><path d="M10 21h4" {...SVG}/></>,
    lead: <><path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" {...SVG}/><path d="M2.5 21c.7-4 2.7-6 5.5-6 1.6 0 2.9.6 3.9 1.8" {...SVG}/><path d="M14 13h7M17.5 9.5v7" {...SVG}/></>,
    booking: <><rect x="4" y="5" width="16" height="15" rx="2" {...SVG}/><path d="M8 3v4M16 3v4M4 10h16" {...SVG}/><path d="m9 15 2 2 4-5" {...SVG}/></>,
    noshow: <><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" {...SVG}/><path d="m15 9-6 6M9 9l6 6" {...SVG}/></>,
    money: <><path d="M7 7h7a3 3 0 0 1 0 6H7V3" {...SVG}/><path d="M7 13h8a3 3 0 0 1 0 6H7v-6Z" {...SVG}/></>,
    star: <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6-5.4-2.8-5.4 2.8 1-6-4.4-4.3 6.1-.9L12 3Z" {...SVG}/>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" {...SVG}/><path d="m4 7 8 6 8-6" {...SVG}/></>,
    pulse: <path d="M3 12h4l2.2-6 4.6 12 2.2-6h5" {...SVG}/>,
    spark: <><path d="M12 2v5M12 17v5M4.9 4.9l3.5 3.5M15.6 15.6l3.5 3.5M2 12h5M17 12h5M4.9 19.1l3.5-3.5M15.6 8.4l3.5-3.5" {...SVG}/></>,
    x: <path d="M18 6L6 18M6 6l12 12" {...SVG}/>,
    send: <><path d="M22 2L11 13" {...SVG}/><path d="M22 2l-7 20-4-9-9-4 20-7z" {...SVG}/></>,
    menu: <><path d="M3 12h18M3 6h18M3 18h18" {...SVG}/></>,
    mic: <><path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3Z" {...SVG}/><path d="M19 10a7 7 0 0 1-14 0M12 19v3M8 22h8" {...SVG}/></>,
    voice: <><path d="M12 20h9" {...SVG}/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" {...SVG}/></>,
    plug: <><path d="M18.36 6.64a9 9 0 1 1-12.73 0" {...SVG}/><line x1="12" y1="2" x2="12" y2="12" {...SVG}/></>,
  };
  return <svg viewBox="0 0 24 24" className={className}>{m[name] ?? null}</svg>;
}

function ProgressBar({ label, value, amber = false, textColor = '#1A1814' }: { label: string; value: number; amber?: boolean; textColor?: string }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm font-bold" style={{ color: textColor }}>
        <span>{label}</span><span>{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[#E8DED2]">
        <div className={`h-full rounded-full ${amber ? 'bg-[#E8B44B]' : 'bg-[#C4973F]'}`} style={{ width: `${value}%`, boxShadow: '0 0 18px rgba(196,151,63,.35)' }} />
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const t: Record<string, string> = {
    Active: 'bg-[#EDF4EE] text-[#5B8A68]', VIP: 'bg-[#FFF4DD] text-[#C4973F]',
    New: 'bg-[#F0EDF8] text-[#7C6B9A]', 'Due rebooking': 'bg-[#F9E1DF] text-[#B35A4C]',
    Lapsed: 'bg-[#F2E8E8] text-[#8A5B5B]',
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
      { role: 'lumio', text: "Hi Emma! Thanks for reaching out. I'm Lumi, the assistant for Glow Aesthetics. You were asking about lip filler — are you looking for a subtle 0.5ml or a fuller 1ml result?" },
      { role: 'client', text: "I'm not sure tbh — first time. What's the difference?" },
      { role: 'lumio', text: "No worries at all! 0.5ml gives a natural 'your lips but better' look — really popular for first-timers. 1ml is fuller and more defined. We always start with a free consultation so you can decide. We have Thursday 22 May at 2pm or Saturday 24 May at 11am — would either work?" },
      { role: 'client', text: "Saturday works!" },
      { role: 'lumio', text: "Perfect! I've pencilled in Saturday 24 May at 11:00am for your lip consultation with Glow Aesthetics. Can I confirm your full name and a number for your booking reminder?" },
    ],
  },
  {
    id: '2', name: 'Sophie Carter', channel: 'WhatsApp', preview: "Wednesday please", time: '08:14',
    messages: [
      { role: 'lumio', text: "Hi Sophie! It's been around 6 weeks since your last visit — just checking in. How's your treatment looking? We have some lovely availability this week if you'd like to book in?" },
      { role: 'client', text: "Oh wow yes actually, it's started to fade a bit!" },
      { role: 'lumio', text: "Great timing! We have Wednesday 29 May at 3:30pm or Friday 31 May at 11:00am, both with your usual clinician. Which works better?" },
      { role: 'client', text: "Wednesday please" },
      { role: 'lumio', text: "Booked! Wednesday 29 May at 3:30pm. I'll send a reminder 48 hours before. See you then Sophie." },
    ],
  },
  {
    id: '3', name: 'Charlotte Reed', channel: 'Website', preview: "Evening if possible", time: '07:22',
    messages: [
      { role: 'client', text: "Hi, I'm interested in Botox — never had it before. How much does it cost?" },
      { role: 'lumio', text: "Hi Charlotte! Great to hear from you. Our Botox starts from £180 for one area and £280 for three areas. First consultations are free. Which area were you thinking about?" },
      { role: 'client', text: "Mainly frown lines" },
      { role: 'lumio', text: "Lovely choice — one of our most popular treatments, very natural results. We have slots available this week. Would you prefer daytime or evening?" },
      { role: 'client', text: "Evening if possible" },
      { role: 'lumio', text: "We have Tuesday 28 May at 6:00pm available — shall I reserve that for you?" },
    ],
  },
  {
    id: '4', name: 'Olivia Bennett', channel: 'WhatsApp', preview: "OK that's really reassuring", time: '06:50',
    messages: [
      { role: 'lumio', text: "Hi Olivia! It's been 3 days since your lip filler treatment. Just checking in — how are you feeling? Any questions?" },
      { role: 'client', text: "It's a bit more swollen on one side than the other?" },
      { role: 'lumio', text: "Completely normal at day 3 — asymmetrical swelling is very common and settles by day 5–7. Avoid pressure on the area and stay hydrated. If you're still concerned after day 10, just give us a call." },
      { role: 'client', text: "OK that's really reassuring" },
      { role: 'lumio', text: "Brilliant! Your full aftercare guide is in your email. When you're happy with the results, a Google review would mean the world to us — here's the link: lumio.london/review" },
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
  { id: '8', initials: 'HT', name: 'Hannah Taylor', lastVisit: '5 Apr 2026', bookings: 3, spend: '£670', treatments: ['Lip filler', 'Skin booster'], status: 'Lapsed', nextAppt: '—', phone: '+44 7700 900234', channel: 'WhatsApp' },
];

const METRIC_CARDS = [
  { bg: '#F9EDE8', icon: 'lead', value: '31', label: 'Leads captured', note: 'Across website, phone and Instagram.', trend: '+18% this week', trendColor: '#5B8A68', arrow: '↑', arrowColor: '#C4973F' },
  { bg: '#F0EDF8', icon: 'booking', value: '19', label: 'Bookings by AI', note: 'Confirmed without manual chasing.', trend: 'AI handled', trendColor: '#C4973F', arrow: '↑', arrowColor: '#C4973F' },
  { bg: '#EDF4EE', icon: 'noshow', value: '2', label: 'No-shows this week', note: 'Down from 9 after reminders launched.', trend: '-77% vs before', trendColor: '#5B8A68', arrow: '↓', arrowColor: '#5B8A68' },
  { bg: '#F2DDD8', icon: 'money', value: '£4,800', label: 'Pipeline value', note: 'Revenue attributed to Lumio leads.', trend: 'Live tracking', trendColor: '#C4973F', arrow: '↑', arrowColor: '#C4973F' },
];

// ─── Main ──────────────────────────────────────────────────────────────────────

export default function DemoPage() {
  const [tab, setTab] = useState<Tab>('overview');
  const [tier, setTier] = useState<Tier>('foundation');
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
  const [fromReveal, setFromReveal] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showPills, setShowPills] = useState(true);
  const [dashMode, setDashMode] = useState<'light' | 'dark'>('dark');
  const [mobileConvoFull, setMobileConvoFull] = useState(false);
  const [mobileProfileFull, setMobileProfileFull] = useState(false);
  const [clientSearch, setClientSearch] = useState('');
  const [clientFilter, setClientFilter] = useState('All');
  const [showNotifs, setShowNotifs] = useState(false);
  const [notifsRead, setNotifsRead] = useState(false);
  const feedIdx = useRef(0);
  const lumiScrollRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const bh = bannerDismissed ? 0 : 52;
  const dm = dashMode === 'dark';
  const dBg = dm ? '#141210' : '#FFFDF8';
  const dSidebarBg = dm ? 'rgba(20,18,16,0.98)' : 'rgba(249,237,232,0.96)';
  const dTopbarBg = dm ? 'rgba(20,18,16,0.92)' : 'rgba(255,253,248,0.92)';
  const dCardBg = dm ? 'rgba(255,253,248,0.04)' : 'rgba(255,255,255,0.72)';
  const dCardBorder = dm ? 'rgba(255,253,248,0.08)' : 'rgba(26,24,20,0.08)';
  const dText = dm ? '#FFFDF8' : '#1A1814';
  const dTextMuted = dm ? 'rgba(255,253,248,0.5)' : '#8A8278';
  const dTextSub = dm ? 'rgba(255,253,248,0.35)' : 'rgba(26,24,20,0.4)';
  const dBorderSoft = dm ? 'rgba(255,253,248,0.06)' : 'rgba(26,24,20,0.06)';
  const dIconBg = dm ? 'rgba(196,151,63,0.15)' : '#FFF7E8';
  const dTableHeader = dm ? 'rgba(255,253,248,0.04)' : 'rgba(249,237,232,0.55)';
  const dSelectedBg = dm ? 'rgba(196,151,63,0.12)' : '#FFF4DD';
  const dClientBubble = dm ? 'rgba(255,253,248,0.06)' : '#F9EDE8';
  const dFilterBtn = dm ? 'rgba(255,253,248,0.06)' : '#F9EDE8';
  const dTagBg = dm ? 'rgba(196,151,63,0.15)' : '#FFF4DD';
  const dInputBg = dm ? 'rgba(255,253,248,0.06)' : '#FFFFFF';
  const dInputBorder = dm ? 'rgba(255,253,248,0.12)' : 'rgba(26,24,20,0.12)';
  const dSecBg = dm ? 'rgba(255,253,248,0.03)' : '#F9EDE8';

  // Persist dashboard theme to localStorage
  useEffect(() => {
    localStorage.setItem('lumio-theme', dashMode);
  }, [dashMode]);

  // Restore theme from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('lumio-theme');
    if (saved === 'light' || saved === 'dark') setDashMode(saved);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const preview = params.get('preview') === 'true';
    setIsPreview(preview);
    setIsClient(params.get('client') === 'true');
    setFromReveal(params.get('from') === 'reveal');
    if (preview) { setBannerDismissed(true); return; }
    const saved = localStorage.getItem('lumio_demo_clinic');
    if (saved && saved.trim().length >= 3 && saved.trim() !== 'Glow Aesthetics London') {
      setClinicName(saved.trim());
      setBannerInput(saved.trim());
    }
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

  useEffect(() => {
    if (lumiOpen && lumiMsgs.length === 0) {
      setLumiMsgs([{ role: 'assistant', content: "Hi — I run the automations for this clinic.\n\n**This week I've handled:**\n- 31 new enquiries — all responded to within seconds\n- 19 bookings confirmed automatically\n- 9 no-shows prevented by reminders\n- £4,800 in pipeline protected\n\nAsk me anything." }]);
    }
  }, [lumiOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!showNotifs) return;
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifs(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showNotifs]);

  const saveClinicName = () => {
    const name = bannerInput.trim() || 'Glow Aesthetics London';
    setClinicName(name);
    if (typeof window !== 'undefined') localStorage.setItem('lumio_demo_clinic', name);
    setBannerDismissed(true);
  };

  const clinicInitials = clinicName.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

  const openLumi = useCallback((prefill?: string) => {
    setLumiOpen(true);
    if (prefill) setLumiInput(prefill);
  }, []);

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
    { id: 'voice' as Tab, icon: 'voice', label: 'My Style' },
    { id: 'admin' as Tab, icon: tier === 'fullops' ? 'spark' : 'lock', label: 'Admin hub', locked: tier !== 'fullops' },
    { id: 'integrations' as Tab, icon: 'plug', label: 'Integrations' },
  ];

  const currentConvo = CONVOS.find(c => c.id === selectedConvo);
  const filteredFeed = actFilter === 'all' ? FULL_FEED : FULL_FEED.filter(i => i.category === actFilter);

  return (
    <div className="demo-wrapper antialiased overflow-x-hidden" style={{ backgroundColor: dBg, color: dText, minHeight: '100dvh' }}>
      {isClient && <PWASetup />}

      {/* Demo banner */}
      {!bannerDismissed && (
        <div className="fixed top-0 inset-x-0 z-[100] border-b border-[#C4973F]/20" style={{ backgroundColor: '#1A1814' }}>
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
              <MicButton onResult={setBannerInput} />
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

      {/* Sidebar — fixed at all times */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside
        className="hidden lg:flex fixed top-0 left-0 z-50 w-[280px] shrink-0 border-r flex-col p-6 overflow-y-auto"
        style={{ backgroundColor: dSidebarBg, backdropFilter: 'blur(20px)', top: bh, height: `calc(100dvh - ${bh}px)`, borderColor: dCardBorder }}
      >
        <div className="mb-8 pt-2 shrink-0">
          <a href="/"><Logo width={80} /></a>
        </div>
        <nav className="space-y-1.5 flex-1">
          {navItems.map(({ id, icon, label, locked }) => {
            const active = tab === id;
            return (
              <button key={id} type="button"
                onClick={() => { setTab(id); setSidebarOpen(false); }}
                className="group w-full flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition-all duration-200"
                style={{
                  border: active ? '1px solid rgba(196,151,63,0.35)' : '1px solid transparent',
                  backgroundColor: active ? (dm ? 'rgba(196,151,63,0.12)' : '#FFFDF8') : 'transparent',
                  color: active ? '#C4973F' : dTextMuted,
                  boxShadow: active ? '0 14px 40px rgba(196,151,63,0.09)' : 'none',
                }}>
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-xl"
                    style={{ backgroundColor: active ? 'rgba(196,151,63,0.12)' : (dm ? 'rgba(255,253,248,0.06)' : 'rgba(255,255,255,0.45)') }}>
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
            );
          })}
        </nav>
        <div className="pt-4 flex flex-col gap-3 shrink-0">
          {/* Ask Lumi sidebar button */}
          <button
            type="button"
            onClick={() => openLumi()}
            className="w-full flex items-center gap-3 rounded-2xl border border-[#C4973F]/30 px-4 py-3.5 text-sm font-semibold text-[#FFFDF8] hover:border-[#C4973F]/60 hover:bg-[#C4973F]/5 transition-all"
            style={{ backgroundColor: '#1A1814' }}
          >
            <div className="relative flex h-5 w-5 shrink-0 items-center justify-center">
              <span className="absolute h-5 w-5 rounded-full bg-[#E8B44B]/30 blur-sm" style={{ animation: 'ping 2s cubic-bezier(0,0,0.2,1) infinite' }} />
              <span className="relative h-2.5 w-2.5 rounded-full bg-[#E8B44B]" style={{ boxShadow: '0 0 10px rgba(232,180,75,.9)' }} />
            </div>
            <span>Ask Lumi</span>
          </button>

          {!isPreview && (
          <a href="/audit" className="block rounded-[1.8rem] border border-[rgba(26,24,20,0.08)] bg-[#FFFDF8]/80 p-5 shadow-[0_20px_70px_rgba(26,24,20,.05)] hover:border-[#C4973F]/35 transition-colors">
            <div className="mb-3 text-[#C4973F]"><Icon name="spark" className="h-5 w-5" /></div>
            <p className="text-xl italic leading-tight text-[#C4973F]">Ready for the real thing?</p>
            <p className="mt-2 text-[11px] font-bold text-[#8A8278]">Get your free Revenue Reveal →</p>
          </a>
          )}
        </div>
      </aside>

      {/* Main column — offset by sidebar width on desktop */}
      <div className="flex flex-col lg:ml-[280px] min-h-screen" style={{ paddingTop: bh }}>

        {/* Topbar */}
        <header className="sticky z-30 border-b px-5 py-4 backdrop-blur-2xl shrink-0"
          style={{ top: bh, backgroundColor: dTopbarBg, borderColor: dCardBorder }}>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#1A1814] text-lg font-black text-[#E8B44B] shadow-[0_14px_40px_rgba(26,24,20,.12)] shrink-0">
                {clinicInitials}
              </div>
              <div className="min-w-0">
                <h1 className="text-lg font-black tracking-[-0.03em] truncate" style={{ color: dText }}>{clinicName}</h1>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#5B8A68]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#5B8A68] shrink-0" /> Live automation active
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {/* Dashboard light/dark toggle */}
              <button
                type="button"
                onClick={() => setDashMode(m => m === 'light' ? 'dark' : 'light')}
                style={{
                  width: 40, height: 40, borderRadius: '50%',
                  border: `1px solid ${dm ? 'rgba(250,247,242,0.15)' : 'rgba(26,24,20,0.15)'}`,
                  background: 'transparent', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: dm ? 'rgba(250,247,242,0.6)' : 'rgba(26,24,20,0.5)',
                  transition: 'all 200ms',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(196,151,63,0.4)'; (e.currentTarget as HTMLElement).style.color = '#C4973F'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = dm ? 'rgba(250,247,242,0.15)' : 'rgba(26,24,20,0.15)'; (e.currentTarget as HTMLElement).style.color = dm ? 'rgba(250,247,242,0.6)' : 'rgba(26,24,20,0.5)'; }}
              >
                {dm ? (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </svg>
                )}
              </button>
              {/* Ask Lumi — mobile only (sidebar hidden on mobile) */}
              <button type="button" onClick={() => openLumi()}
                className="lg:hidden flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold text-[#FFFDF8] transition-colors"
                style={{ backgroundColor: '#1A1814' }}>
                <span className="h-2 w-2 rounded-full bg-[#E8B44B]" style={{ boxShadow: '0 0 8px rgba(232,180,75,.9)' }} />
                Lumi
              </button>
              <div className="relative" ref={notifRef}>
                <button
                  type="button"
                  onClick={() => setShowNotifs(v => !v)}
                  className="relative grid h-10 w-10 place-items-center rounded-full transition-colors"
                  style={{ background: dm ? 'rgba(255,253,248,0.08)' : '#F0EDF8', color: dm ? '#FFFDF8' : '#1A1814' }}
                >
                  <Icon name="bell" className="h-4 w-4" />
                  {!notifsRead && (
                    <span className="absolute -top-1 -right-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#C4973F] text-[10px] font-bold text-[#1A1814]">4</span>
                  )}
                </button>

                {showNotifs && (
                  <div style={{
                    position: 'absolute', top: 'calc(100% + 12px)', right: 0,
                    width: 340, background: dm ? '#141210' : '#FFFDF8',
                    border: `1px solid ${dCardBorder}`, borderRadius: '1.25rem',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.3)', zIndex: 50, overflow: 'hidden',
                  }}>
                    <div style={{
                      padding: '1rem 1.25rem', borderBottom: `1px solid ${dCardBorder}`,
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    }}>
                      <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 600, fontSize: 15, color: dText }}>Notifications</span>
                      <button onClick={() => setNotifsRead(true)} style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 500, fontSize: 12, color: '#C4973F', background: 'none', border: 'none', cursor: 'pointer' }}>
                        Mark all read
                      </button>
                    </div>

                    {([
                      { dot: '#C4973F', title: 'Lumi booked Emma Wilson', body: 'Lip filler consultation confirmed for Friday 11am', time: '2 min ago', read: false },
                      { dot: '#C4973F', title: 'New 5-star review received', body: 'Sophie Carter left a Google review after her treatment', time: '14 min ago', read: false },
                      { dot: '#5B8A68', title: 'No-show prevented', body: "Charlotte Reed confirmed after Lumi's reminder sequence", time: '1 hr ago', read: false },
                      { dot: '#C4973F', title: 'Rebooking message sent', body: 'Lumi reached out to Olivia Bennett — 7 weeks since last visit', time: '2 hr ago', read: false },
                      { dot: '#8A8278', title: 'Monthly report ready', body: 'May 2026 performance summary generated by Lumi', time: 'Yesterday', read: true },
                    ] as { dot: string; title: string; body: string; time: string; read: boolean }[]).map((notif, ni, arr) => (
                      <div key={ni} style={{
                        padding: '1rem 1.25rem',
                        borderBottom: ni < arr.length - 1 ? `1px solid ${dCardBorder}` : 'none',
                        display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer',
                        background: !notifsRead && !notif.read ? (dm ? 'rgba(196,151,63,0.04)' : 'rgba(196,151,63,0.03)') : 'transparent',
                      }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: notifsRead ? '#8A8278' : notif.dot, marginTop: 5, flexShrink: 0 }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 600, fontSize: 13, color: dText, lineHeight: 1.4 }}>{notif.title}</div>
                          <div style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 12, color: dTextMuted, lineHeight: 1.5, marginTop: 2 }}>{notif.body}</div>
                        </div>
                        <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 11, color: dTextSub, whiteSpace: 'nowrap', flexShrink: 0 }}>{notif.time}</span>
                      </div>
                    ))}

                    <div style={{ padding: '0.75rem 1.25rem', textAlign: 'center' }}>
                      <button onClick={() => { setTab('activity'); setShowNotifs(false); }} style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 500, fontSize: 13, color: '#C4973F', background: 'none', border: 'none', cursor: 'pointer' }}>
                        View all activity →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto px-4 py-8 lg:px-8 pb-28 lg:pb-16" style={{ backgroundColor: dBg }}>
          <div className="mx-auto max-w-[1280px]">

            {/* Tier selector — overview only */}
            {tab === 'overview' && (
              <div className="mb-6 flex items-center gap-2 flex-wrap">
                {([
                  { id: 'foundation' as Tier, label: 'Foundation' },
                  { id: 'fullsystem' as Tier, label: 'Full System' },
                  { id: 'fullops' as Tier, label: 'Full Operations' },
                ] as { id: Tier; label: string }[]).map(t => (
                  <button key={t.id} type="button"
                    onClick={() => setTier(t.id)}
                    className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-200 ${tier === t.id ? 'bg-[#1A1814] text-[#E8B44B] shadow-[0_8px_24px_rgba(26,24,20,.15)]' : 'bg-[#F9EDE8] text-[#8A8278] hover:bg-[#F0EDF8] hover:text-[#1A1814]'}`}>
                    {t.label}
                  </button>
                ))}
              </div>
            )}

            {/* ── Overview ─────────────────────────────────────── */}
            {tab === 'overview' && (
              <div className="space-y-6">

                {/* Full Operations locked */}
                {tier === 'fullops' && (
                  <div className="relative overflow-hidden rounded-[2.5rem] border border-[rgba(26,24,20,0.08)] shadow-[0_35px_120px_rgba(26,24,20,.08)]">
                    {/* Blurred admin preview behind */}
                    <div className="p-8 select-none pointer-events-none" style={{ opacity: 0.3, filter: 'blur(4px)' }}>
                      <div className="grid gap-6 xl:grid-cols-2">
                        <div className="rounded-[2rem] border border-[rgba(26,24,20,0.08)] bg-white/80 p-6">
                          <div className="mb-4"><div className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#8A8278]">Consent forms</div><h4 className="mt-2 text-3xl font-black">Tracker</h4></div>
                          {[['Amelia Clarke', '11:00am', 'Completed'], ['Grace Miller', '1:30pm', 'Pending']].map(([name, time, status]) => (
                            <div key={name} className="flex items-center justify-between rounded-2xl border border-[rgba(26,24,20,0.06)] bg-[#FFFDF8] px-4 py-4 mb-3 last:mb-0">
                              <div><div className="font-bold text-[#1A1814]">{name}</div><div className="text-xs text-[#8A8278]">Appt · {time}</div></div>
                              <StatusPill status={status} />
                            </div>
                          ))}
                        </div>
                        <div className="rounded-[2rem] p-8 text-[#FFFDF8]" style={{ backgroundColor: '#1A1814' }}>
                          <div className="text-xs uppercase tracking-[.18em] text-[#E8B44B]">Monthly report · May 2026</div>
                          <div className="mt-6 grid grid-cols-2 gap-6">
                            <div><div className="text-5xl font-black">+38%</div><div className="mt-2 text-xs text-[#FFFDF8]/55">Lead response</div></div>
                            <div><div className="text-5xl font-black">£18.4k</div><div className="mt-2 text-xs text-[#FFFDF8]/55">Revenue attributed</div></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Upgrade overlay */}
                    <div className="absolute inset-0 z-10 flex items-center justify-center p-6" style={{ background: 'rgba(255,253,248,0.6)', backdropFilter: 'blur(4px)' }}>
                      <div className="w-[min(480px,90vw)] max-h-[80vh] overflow-y-auto rounded-[2.2rem] border border-[#C4973F]/25 p-8 text-center shadow-[0_35px_120px_rgba(26,24,20,.4)]" style={{ backgroundColor: '#1A1814' }}>
                        <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-[1.7rem] border border-[#C4973F]/20 bg-[#C4973F]/10 text-[#E8B44B]">
                          <Icon name="lock" className="h-7 w-7" />
                        </div>
                        <div className="text-[10px] font-extrabold uppercase tracking-[.22em] text-[#E8B44B]">Full Operations Tier</div>
                        <h4 className="mt-4 text-4xl font-black leading-[.95] tracking-[-0.05em] text-[#FFFDF8]">Your complete back office running itself.</h4>
                        <p className="mt-4 text-sm leading-7 text-[#FFFDF8]/62">Consent forms. Invoice chasing. Reporting. Stock intelligence. Your entire back office — automated.</p>
                        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[.05] px-5 py-3 text-sm font-semibold text-[#FFFDF8]/72">
                          From <span className="text-[#E8B44B]">£4,000 setup</span> · <span className="text-[#E8B44B]">£1,400/month</span>
                        </div>
                        <a href="/#pricing" className="mt-5 block rounded-2xl bg-[#C4973F] px-7 py-4 text-[10px] font-extrabold uppercase tracking-[.18em] text-[#1A1814] hover:bg-[#E8B44B] transition-colors">
                          Upgrade to Full Operations →
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {tier !== 'fullops' && (
                  <>
                    <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                      <div>
                        <p className="text-[10px] font-extrabold uppercase tracking-[.22em] text-[#C4973F]">
                          {tier === 'fullsystem' ? 'Full System · Overview' : 'Overview'}
                        </p>
                        <h2 className="mt-1 text-4xl font-black leading-none tracking-[-0.05em]">Clinic command centre</h2>
                      </div>
                      <p className="max-w-md text-sm leading-7 text-[#8A8278]">A live view of what Lumio has captured, handled, and protected this week.</p>
                    </div>

                    {/* Metric cards — 2×2 on mobile, 4 cols on xl */}
                    <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                      {METRIC_CARDS.map(card => (
                        <div key={card.label}
                          className="relative min-h-[200px] overflow-hidden rounded-[2rem] border-l-[3px] border-[#C4973F] p-5 shadow-[0_8px_40px_rgba(26,24,20,.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(26,24,20,.10)]"
                          style={{ backgroundColor: card.bg }}>
                          <span className="absolute top-4 right-4 text-4xl font-black leading-none select-none" style={{ color: card.arrowColor }}>
                            {card.arrow}
                          </span>
                          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/60 text-[#C4973F] shadow-inner">
                            <Icon name={card.icon} className="h-5 w-5" />
                          </div>
                          <div className="mt-4 text-4xl md:text-5xl font-black leading-none tracking-[-0.04em] text-[#1A1814]">{card.value}</div>
                          <p className="mt-2 text-xs md:text-sm font-bold text-[#1A1814]">{card.label}</p>
                          <p className="mt-1 text-[11px] leading-5 text-[#8A8278] hidden sm:block">{card.note}</p>
                          <div className="mt-3 text-[10px] font-bold uppercase tracking-[.14em]" style={{ color: card.trendColor }}>{card.trend}</div>
                        </div>
                      ))}
                    </div>

                    {/* Response time + Revenue widgets */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div style={{ background: dCardBg, border: `1px solid ${dCardBorder}`, borderRadius: '1.25rem', padding: '1.5rem', flex: 1 }}>
                        <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#C4973F', margin: '0 0 1rem' }}>RESPONSE TIME</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1rem' }}>
                          <div>
                            <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 12, fontWeight: 500, color: dTextMuted, margin: '0 0 4px' }}>Before Lumio</p>
                            <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 40, fontWeight: 800, color: dTextSub, lineHeight: 1, margin: 0 }}>4.2h</p>
                            <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 12, color: dTextMuted, margin: '4px 0 0' }}>average response</p>
                          </div>
                          <div style={{ color: '#C4973F', fontSize: 24, flexShrink: 0 }}>→</div>
                          <div>
                            <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 12, fontWeight: 500, color: '#C4973F', margin: '0 0 4px' }}>With Lumio</p>
                            <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 40, fontWeight: 800, color: '#C4973F', lineHeight: 1, margin: 0 }}>23s</p>
                            <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 12, color: dTextMuted, margin: '4px 0 0' }}>average response</p>
                          </div>
                        </div>
                        <div style={{ width: '100%', background: dBorderSoft, borderRadius: 99, height: 6, marginBottom: 8 }}>
                          <div style={{ width: '98%', height: '100%', background: '#C4973F', borderRadius: 99 }} />
                        </div>
                        <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 11, color: dTextMuted, margin: 0 }}>98% faster. Every enquiry. Every time.</p>
                      </div>

                      <div style={{ background: dCardBg, border: `1px solid ${dCardBorder}`, borderRadius: '1.25rem', padding: '1.5rem', flex: 1 }}>
                        <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#C4973F', margin: '0 0 1rem' }}>REVENUE RECOVERED</p>
                        <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 40, fontWeight: 800, color: '#C4973F', lineHeight: 1, margin: '0 0 4px' }}>£4,800</p>
                        <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 12, color: dTextMuted, margin: '0 0 1rem' }}>captured this week alone</p>
                        <div>
                          {([
                            { label: 'Missed enquiries recovered', amount: '£2,800' },
                            { label: 'No-shows prevented', amount: '£1,200' },
                            { label: 'Rebooking revenue', amount: '£800' },
                          ] as { label: string; amount: string }[]).map((row, ri, arr) => (
                            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: ri < arr.length - 1 ? `1px solid ${dBorderSoft}` : 'none' }}>
                              <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 12, fontWeight: 500, color: dTextSub }}>{row.label}</span>
                              <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#C4973F' }}>{row.amount}</span>
                            </div>
                          ))}
                        </div>
                        <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 11, color: dTextMuted, fontStyle: 'italic', margin: '1rem 0 0' }}>vs £0 before Lumio</p>
                      </div>
                    </div>

                    <div className="grid gap-6 xl:grid-cols-[1.15fr_.85fr]">
                      {/* Live feed */}
                      <div className="rounded-[2.2rem] border border-[rgba(26,24,20,0.08)] bg-white/72 p-6 shadow-[0_26px_90px_rgba(26,24,20,.05)] backdrop-blur-xl">
                        <div className="mb-4 flex items-center justify-between">
                          <h3 className="text-2xl font-black tracking-[-0.04em]">Today&apos;s automation activity</h3>
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
                        <button type="button" onClick={() => setTab('activity')}
                          className="mt-4 w-full text-center text-xs font-bold text-[#C4973F] hover:text-[#E8B44B] transition-colors py-2">
                          View full activity log →
                        </button>
                      </div>

                      {/* Automation health */}
                      <div className="rounded-[2.2rem] border border-[rgba(26,24,20,0.08)] bg-white/72 p-6 shadow-[0_26px_90px_rgba(26,24,20,.05)] backdrop-blur-xl">
                        <div className="mb-5 flex items-center justify-between">
                          <h3 className="text-2xl font-black tracking-[-0.04em]">Automation health</h3>
                          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#FFF4DD] text-[#C4973F]"><Icon name="pulse" className="h-5 w-5" /></span>
                        </div>
                        <div className="space-y-5">
                          <ProgressBar label="Lead response" value={98} textColor={dText} />
                          <ProgressBar label="Reminder delivery" value={100} textColor={dText} />
                          <ProgressBar label="Rebooking rate" value={74} amber textColor={dText} />
                          <ProgressBar label="Review generation" value={81} textColor={dText} />
                        </div>
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
                              <LiveDot /> Lumi Intelligence
                            </div>
                            <h3 className="mt-4 text-3xl font-black leading-[1.05] tracking-[-0.04em] text-[#FFFDF8] md:text-4xl">
                              Like having your<span className="italic text-[#E8B44B]"> best operator </span>inside the clinic.
                            </h3>
                          </div>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
                          <div className="space-y-4">
                            <div className="rounded-[1.8rem] border border-white/10 bg-white/[.045] p-5 backdrop-blur-xl">
                              <div className="mb-3 flex items-center gap-3">
                                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#FFF4DD] text-[#C4973F]"><Icon name="spark" className="h-5 w-5" /></div>
                                <div><div className="text-xs font-bold uppercase tracking-[.16em] text-[#E8B44B]">Lumi</div><div className="text-xs text-[#FFFDF8]/45">2 seconds ago</div></div>
                              </div>
                              <p className="text-sm leading-7 text-[#FFFDF8]/72">Instagram DM automation paused Friday 6pm to Monday 9am. I&apos;ll resume automatically.</p>
                              <div className="mt-3 rounded-2xl border border-[#C4973F]/15 bg-[#C4973F]/10 p-3">
                                <p className="text-xs leading-6 text-[#FFFDF8]/62">Want me to add an out-of-office message in the meantime?</p>
                              </div>
                            </div>
                            <div className="rounded-[1.8rem] border border-white/10 bg-white/[.045] p-5 backdrop-blur-xl">
                              <div className="mb-3 flex items-center gap-3">
                                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#F0EDF8] text-[#C4973F]"><Icon name="mail" className="h-5 w-5" /></div>
                                <div><div className="text-xs font-bold uppercase tracking-[.16em] text-[#E8B44B]">Lumi</div><div className="text-xs text-[#FFFDF8]/45">Now active</div></div>
                              </div>
                              <div className="rounded-2xl border border-white/10 bg-black/10 p-4 text-sm leading-7 text-[#FFFDF8]/72">
                                &ldquo;Hi! We&apos;re at a training event this weekend and will be back Monday morning. Drop us a message and we&apos;ll get back to you first thing.&rdquo;
                              </div>
                            </div>
                          </div>
                          <div className="rounded-[1.8rem] border border-white/10 bg-white/[.05] p-5 backdrop-blur-xl">
                            <div className="mb-4 flex items-center justify-between gap-3">
                              <div><div className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#E8B44B]">Client retention</div><h4 className="mt-1.5 text-2xl font-black tracking-[-0.04em] text-[#FFFDF8]">Needs rebooking</h4></div>
                              <span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.14em] text-[#FFFDF8]/55">4 clients</span>
                            </div>
                            <div className="space-y-2.5">
                              {[['Emma Wilson', '7 weeks'], ['Sophie Carter', '6 weeks'], ['Olivia Bennett', '8 weeks'], ['Charlotte Hayes', '6 weeks']].map(([name, ago]) => (
                                <div key={name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/10 px-4 py-3 hover:border-[#C4973F]/35 hover:bg-white/[.04] transition-all">
                                  <div><div className="text-sm font-bold text-[#FFFDF8]">{name}</div><div className="text-xs text-[#FFFDF8]/45">Last visit · {ago} ago</div></div>
                                  <button
                                    onClick={() => openLumi(`Send a rebooking message to ${name} who hasn't visited in ${ago}`)}
                                    className="rounded-xl bg-[#C4973F] px-3 py-2 text-[10px] font-extrabold uppercase tracking-[.14em] text-[#1A1814] hover:bg-[#E8B44B] transition-colors">
                                    Send
                                  </button>
                                </div>
                              ))}
                            </div>
                            <div className="mt-4 rounded-2xl border border-[#C4973F]/15 bg-[#C4973F]/10 p-3 flex items-start gap-2">
                              <div className="mt-0.5 text-[#E8B44B] shrink-0"><Icon name="pulse" className="h-4 w-4" /></div>
                              <p className="text-xs leading-6 text-[#FFFDF8]/65">Lumi predicts 68% chance of recovering 2+ clients with a check-in sequence this evening.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Full System extra conversations prompt */}
                    {tier === 'fullsystem' && (
                      <div className="rounded-[2.2rem] border border-[#C4973F]/25 bg-[#FFF4DD]/40 p-6">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                          <div>
                            <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#C4973F]">Full System — Included</p>
                            <h3 className="mt-1 text-2xl font-black tracking-[-0.04em]">AI-handled conversations</h3>
                            <p className="mt-1 text-sm text-[#8A8278]">Every Instagram DM, website enquiry and WhatsApp — answered by Lumi on your behalf.</p>
                          </div>
                          <button type="button" onClick={() => setTab('conversations')}
                            className="rounded-full bg-[#C4973F] px-6 py-3 text-xs font-extrabold uppercase tracking-[.14em] text-[#1A1814] hover:bg-[#E8B44B] transition-colors whitespace-nowrap">
                            View conversations →
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Performance graph */}
                    <PerformanceGraph darkMode={dm} />

                    {/* Lumi suggests */}
                    <SuggestedActions darkMode={dm} />
                  </>
                )}
              </div>
            )}

            {/* ── Activity ─────────────────────────────────────── */}
            {tab === 'activity' && (
              <div className="space-y-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[.22em] text-[#C4973F]">Live Activity</p>
                    <h2 className="mt-1 text-4xl font-black leading-none tracking-[-0.05em]">Everything that happened</h2>
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
                        <div className="mt-0.5 text-xs text-[#8A8278] truncate sm:whitespace-normal">{item.detail}</div>
                      </div>
                      <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#5B8A68] shrink-0">
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
                {!mobileConvoFull && (
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[.22em] text-[#C4973F]">Conversations</p>
                    <h2 className="mt-1 text-4xl font-black leading-none tracking-[-0.05em]" style={{ color: dText }}>Handled by Lumi</h2>
                  </div>
                )}
                {mobileConvoFull && (
                  <button type="button" onClick={() => setMobileConvoFull(false)}
                    className="flex items-center gap-2 text-sm font-bold text-[#C4973F] lg:hidden">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                    Back
                  </button>
                )}
                <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
                  <div className={`rounded-[2.2rem] border border-[rgba(26,24,20,0.08)] bg-white/72 overflow-hidden shadow-[0_26px_90px_rgba(26,24,20,.05)] ${mobileConvoFull ? 'hidden lg:block' : 'block'}`}>
                    {CONVOS.map(c => (
                      <button key={c.id} type="button" onClick={() => { setSelectedConvo(c.id); setMobileConvoFull(true); }}
                        className={`w-full flex items-center gap-4 border-b border-[rgba(26,24,20,0.06)] p-5 text-left transition-all last:border-b-0 ${selectedConvo === c.id ? 'bg-[#FFF4DD]' : 'hover:bg-[#F9EDE8]/50'}`}>
                        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-sm font-black text-[#E8B44B]" style={{ backgroundColor: '#1A1814' }}>
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
                    <div className={`rounded-[2.2rem] border border-[rgba(26,24,20,0.08)] bg-white/72 flex flex-col overflow-hidden shadow-[0_26px_90px_rgba(26,24,20,.05)] ${mobileConvoFull ? 'flex' : 'hidden lg:flex'}`}>
                      <div className="flex items-center gap-4 border-b border-[rgba(26,24,20,0.08)] px-6 py-4">
                        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-sm font-black text-[#E8B44B]" style={{ backgroundColor: '#1A1814' }}>
                          {currentConvo.name.split(' ').map(w => w[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-[#1A1814]">{currentConvo.name}</div>
                          <div className="text-xs text-[#8A8278]">via {currentConvo.channel} · Handled by Lumi</div>
                        </div>
                        <StatusPill status="Completed" />
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
            {tab === 'clients' && (() => {
              const AVATAR_GRADIENTS: Record<string, string> = {
                '1': 'linear-gradient(135deg,#C4973F,#E8B44B)',
                '2': 'linear-gradient(135deg,#5B8A68,#7AB088)',
                '3': 'linear-gradient(135deg,#7C6B9A,#A08CC0)',
                '4': 'linear-gradient(135deg,#C4973F,#D4A84B)',
                '5': 'linear-gradient(135deg,#5B6A8A,#7A8FAA)',
                '6': 'linear-gradient(135deg,#8A6B5B,#AA8B7B)',
                '7': 'linear-gradient(135deg,#6B8A6B,#8BAA8B)',
                '8': 'linear-gradient(135deg,#8A7B5B,#AA9B7B)',
              };
              const FILTER_PILLS = ['All', 'Active', 'VIP', 'Due rebooking', 'New', 'Lapsed'];
              const filtered = CLIENTS.filter(c => {
                const matchSearch = c.name.toLowerCase().includes(clientSearch.toLowerCase());
                const matchFilter = clientFilter === 'All' || c.status === clientFilter;
                return matchSearch && matchFilter;
              });
              const activeId = selectedClient ?? '1';
              return (
                <div>
                  {/* Mobile back button */}
                  {mobileProfileFull && (
                    <button type="button" onClick={() => setMobileProfileFull(false)}
                      className="mb-4 flex items-center gap-2 text-sm font-bold text-[#C4973F] lg:hidden">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                      All clients
                    </button>
                  )}
                  {!mobileProfileFull && (
                    <div className="mb-5">
                      <p className="text-[10px] font-extrabold uppercase tracking-[.22em] text-[#C4973F]">Clients</p>
                      <h2 className="mt-1 text-4xl font-black leading-none tracking-[-0.05em]" style={{ color: dText }}>Your client base</h2>
                    </div>
                  )}
                  <div className="flex gap-4 lg:gap-6" style={{ alignItems: 'flex-start' }}>
                    {/* LEFT PANEL */}
                    <div className={`${mobileProfileFull ? 'hidden' : 'flex'} lg:flex flex-col gap-3`} style={{ width: '38%', flexShrink: 0 }}>
                      {/* Search */}
                      <div style={{ position: 'relative' }}>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke={dTextMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                          <circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/>
                        </svg>
                        <input
                          type="text"
                          placeholder="Search clients…"
                          value={clientSearch}
                          onChange={e => setClientSearch(e.target.value)}
                          style={{
                            width: '100%', boxSizing: 'border-box',
                            background: dCardBg, border: `1px solid ${dCardBorder}`,
                            borderRadius: '0.875rem', padding: '10px 14px 10px 38px',
                            fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 13,
                            color: dText, outline: 'none',
                          }}
                        />
                      </div>
                      {/* Filter pills */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {FILTER_PILLS.map(p => (
                          <button key={p} type="button" onClick={() => setClientFilter(p)} style={{
                            fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 600, fontSize: 11,
                            borderRadius: 99, padding: '4px 12px', cursor: 'pointer', transition: 'all 150ms',
                            background: clientFilter === p ? '#C4973F' : dFilterBtn,
                            color: clientFilter === p ? '#1A1814' : dTextMuted,
                            border: 'none',
                          }}>
                            {p}
                          </button>
                        ))}
                      </div>
                      {/* Client list */}
                      <div style={{ background: dCardBg, border: `1px solid ${dCardBorder}`, borderRadius: '1.25rem', overflow: 'hidden' }}>
                        {filtered.length === 0 && (
                          <div style={{ padding: '2rem', textAlign: 'center', fontSize: 13, color: dTextMuted }}>No clients found</div>
                        )}
                        {filtered.map((client, idx) => {
                          const isActive = activeId === client.id;
                          return (
                            <button key={client.id} type="button"
                              onClick={() => { setSelectedClient(client.id); setMobileProfileFull(true); }}
                              style={{
                                width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                                padding: '14px 16px', textAlign: 'left', cursor: 'pointer',
                                background: isActive ? (dm ? 'rgba(196,151,63,0.12)' : '#FFF4DD') : 'transparent',
                                borderTop: idx === 0 ? 'none' : `1px solid ${dBorderSoft}`,
                                transition: 'background 150ms', border: 'none',
                              }}
                            >
                              <div style={{
                                width: 40, height: 40, borderRadius: '0.75rem', flexShrink: 0,
                                background: AVATAR_GRADIENTS[client.id] ?? '#C4973F',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 800, fontSize: 13,
                                color: '#FFFDF8',
                              }}>
                                {client.initials}
                              </div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                                  <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 700, fontSize: 13, color: dText, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {client.name}
                                  </span>
                                  <StatusPill status={client.status} />
                                </div>
                                <div style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 11, color: dTextMuted, marginTop: 2 }}>
                                  {client.spend} · {client.lastVisit}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* RIGHT PANEL */}
                    <div className={`${mobileProfileFull ? 'block' : 'hidden'} lg:block`} style={{ flex: 1, minWidth: 0 }}>
                      <ClientProfile clientId={activeId} darkMode={dm} />
                    </div>
                  </div>
                </div>
              );
            })()}


            {/* ── Admin Hub ───────────────────────────────────── */}
            {tab === 'admin' && (
              <div className="space-y-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[.22em] text-[#C4973F]">Operations Suite</p>
                    <h2 className="mt-1 text-4xl font-black leading-none tracking-[-0.05em]">
                      {tier === 'fullops' ? 'Your back office, automated.' : 'A back office that runs itself.'}
                    </h2>
                  </div>
                  {tier === 'fullops' && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#EDF4EE] px-4 py-2 text-xs font-bold text-[#5B8A68] self-start sm:self-auto">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#5B8A68]" /> Full Operations active
                    </span>
                  )}
                </div>

                {tier === 'fullops' ? (
                  <div className="grid gap-6 xl:grid-cols-2">
                    <div className="rounded-[2.2rem] border border-[rgba(26,24,20,0.08)] bg-white/72 p-6 shadow-[0_26px_90px_rgba(26,24,20,.05)]">
                      <div className="mb-5 flex items-center justify-between">
                        <div><div className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#8A8278]">Consent forms</div><h4 className="mt-2 text-2xl font-black">Tracker</h4></div>
                        <StatusPill status="Sent" />
                      </div>
                      {[['Amelia Clarke', '11:00am', 'Completed'], ['Grace Miller', '1:30pm', 'Pending'], ['Sophia Reed', '3:00pm', 'Sent']].map(([name, time, status]) => (
                        <div key={name} className="flex items-center justify-between rounded-2xl border border-[rgba(26,24,20,0.06)] bg-[#FFFDF8] px-4 py-4 mb-3 last:mb-0">
                          <div><div className="font-bold text-[#1A1814]">{name}</div><div className="text-xs text-[#8A8278]">Appt · {time}</div></div>
                          <StatusPill status={status} />
                        </div>
                      ))}
                    </div>
                    <div className="space-y-4">
                      <div className="rounded-[2.2rem] border border-[rgba(26,24,20,0.08)] bg-white/72 p-6 shadow-[0_26px_90px_rgba(26,24,20,.05)]">
                        <div className="mb-4"><div className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#8A8278]">Invoices</div><h4 className="mt-2 text-2xl font-black">Auto-chasing</h4></div>
                        {[['INV-2048', '£480', 'Paid'], ['INV-2051', '£220', 'Sent'], ['INV-2055', '£640', 'Overdue']].map(([id, amt, status]) => (
                          <div key={id} className="flex items-center justify-between rounded-2xl border border-[rgba(26,24,20,0.06)] bg-[#FFFDF8] px-4 py-4 mb-3 last:mb-0">
                            <div><div className="font-bold text-[#1A1814]">{id}</div><div className="text-xs text-[#8A8278]">{amt}</div></div>
                            <StatusPill status={status} />
                          </div>
                        ))}
                      </div>
                      <div className="rounded-[2.2rem] p-6 text-[#FFFDF8]" style={{ backgroundColor: '#1A1814' }}>
                        <div className="text-xs uppercase tracking-[.18em] text-[#E8B44B]">Monthly report · May 2026</div>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div><div className="text-4xl font-black">+38%</div><div className="mt-1 text-xs text-[#FFFDF8]/55">Lead response</div></div>
                          <div><div className="text-4xl font-black">£18.4k</div><div className="mt-1 text-xs text-[#FFFDF8]/55">Revenue attributed</div></div>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div><div className="text-4xl font-black">-77%</div><div className="mt-1 text-xs text-[#FFFDF8]/55">No-shows</div></div>
                          <div><div className="text-4xl font-black">94%</div><div className="mt-1 text-xs text-[#FFFDF8]/55">Client retention</div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative overflow-hidden rounded-[2.5rem] border border-[rgba(26,24,20,0.08)] shadow-[0_35px_120px_rgba(26,24,20,.08)]">
                    <div className="p-8 select-none pointer-events-none" style={{ opacity: 0.3, filter: 'blur(3px)' }}>
                      <div className="grid gap-6 xl:grid-cols-2">
                        <div className="rounded-[2rem] border border-[rgba(26,24,20,0.08)] bg-white/80 p-6">
                          <div className="mb-5 flex items-center justify-between">
                            <div><div className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#8A8278]">Consent forms</div><h4 className="mt-2 text-3xl font-black">Tracker</h4></div>
                            <StatusPill status="Sent" />
                          </div>
                          {[['Amelia Clarke', '11:00am', 'Completed'], ['Grace Miller', '1:30pm', 'Pending'], ['Sophia Reed', '3:00pm', 'Sent']].map(([name, time, status]) => (
                            <div key={name} className="flex items-center justify-between rounded-2xl border border-[rgba(26,24,20,0.06)] bg-[#FFFDF8] px-4 py-4 mb-3 last:mb-0">
                              <div><div className="font-bold text-[#1A1814]">{name}</div><div className="text-xs text-[#8A8278]">Appt · {time}</div></div>
                              <StatusPill status={status} />
                            </div>
                          ))}
                        </div>
                        <div className="space-y-4">
                          <div className="rounded-[2rem] border border-[rgba(26,24,20,0.08)] bg-white/80 p-6">
                            <div className="mb-4"><div className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#8A8278]">Invoices</div><h4 className="mt-2 text-3xl font-black">Auto-chasing</h4></div>
                            {[['INV-2048', '£480', 'Paid'], ['INV-2051', '£220', 'Sent'], ['INV-2055', '£640', 'Overdue']].map(([id, amt, status]) => (
                              <div key={id} className="flex items-center justify-between rounded-2xl border border-[rgba(26,24,20,0.06)] bg-[#FFFDF8] px-4 py-4 mb-3 last:mb-0">
                                <div><div className="font-bold text-[#1A1814]">{id}</div><div className="text-xs text-[#8A8278]">{amt}</div></div>
                                <StatusPill status={status} />
                              </div>
                            ))}
                          </div>
                          <div className="rounded-[2rem] p-6 text-[#FFFDF8]" style={{ backgroundColor: '#1A1814' }}>
                            <div className="text-xs uppercase tracking-[.18em] text-[#E8B44B]">Monthly report · May 2026</div>
                            <div className="mt-4 grid grid-cols-2 gap-4">
                              <div><div className="text-4xl font-black">+38%</div><div className="mt-1 text-xs text-[#FFFDF8]/55">Lead response</div></div>
                              <div><div className="text-4xl font-black">£18.4k</div><div className="mt-1 text-xs text-[#FFFDF8]/55">Revenue attributed</div></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 z-20 flex items-center justify-center p-6" style={{ background: 'rgba(255,253,248,0.5)', backdropFilter: 'blur(2px)' }}>
                      <div className="w-[min(480px,90vw)] max-h-[80vh] overflow-y-auto rounded-[2.2rem] border border-[#C4973F]/25 p-8 text-center shadow-[0_35px_120px_rgba(26,24,20,.4)]" style={{ backgroundColor: '#1A1814' }}>
                        <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-[1.7rem] border border-[#C4973F]/20 bg-[#C4973F]/10 text-[#E8B44B]">
                          <Icon name="lock" className="h-7 w-7" />
                        </div>
                        <div className="text-[10px] font-extrabold uppercase tracking-[.22em] text-[#E8B44B]">Full Operations</div>
                        <h4 className="mt-4 text-4xl font-black leading-[.95] tracking-[-0.05em] text-[#FFFDF8]">Unlock the complete back office.</h4>
                        <p className="mt-4 text-sm leading-7 text-[#FFFDF8]/62">Consent forms. Invoice chasing. Reporting. Stock intelligence. Your entire back office — automated.</p>
                        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[.05] px-5 py-3 text-sm font-semibold text-[#FFFDF8]/72">
                          From <span className="text-[#E8B44B]">£4,000 setup</span> · <span className="text-[#E8B44B]">£1,400/month</span>
                        </div>
                        <a href="/#pricing" className="mt-5 block rounded-2xl bg-[#C4973F] px-7 py-4 text-[10px] font-extrabold uppercase tracking-[.18em] text-[#1A1814] hover:bg-[#E8B44B] transition-colors">
                          Upgrade to Full Operations →
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── Voice Profile ─────────────────────────────────── */}
            {tab === 'voice' && <VoiceProfile darkMode={dm} />}

            {/* ── Integrations ─────────────────────────────────── */}
            {tab === 'integrations' && <IntegrationsTab darkMode={dm} />}

          </div>
        </main>
      </div>

      {/* Lumi backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-[#1A1814]/50 backdrop-blur-sm transition-opacity duration-200 ${lumiOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setLumiOpen(false)}
      />

      {/* Lumi modal — theme follows dashboard mode (dm) */}
      <div
        className={`fixed z-[51] flex flex-col overflow-hidden transition-all duration-200
          inset-0 rounded-none
          sm:inset-auto sm:top-1/2 sm:left-1/2 sm:w-[min(520px,92vw)] sm:max-h-[80vh] sm:rounded-[2rem]
          ${lumiOpen
            ? 'opacity-100 scale-100 sm:-translate-x-1/2 sm:-translate-y-1/2'
            : 'opacity-0 scale-95 pointer-events-none sm:-translate-x-1/2 sm:-translate-y-1/2'}`}
        style={{
          background: dm
            ? 'radial-gradient(ellipse at 30% 0%, rgba(196,151,63,0.15) 0%, #1A1814 55%)'
            : 'radial-gradient(ellipse at 30% 0%, rgba(196,151,63,0.1) 0%, #FFFDF8 55%)',
          border: `1px solid ${dm ? 'rgba(196,151,63,0.3)' : 'rgba(196,151,63,0.15)'}`,
          boxShadow: '0 40px 120px rgba(26,24,20,0.4)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Blob decorations */}
        <div className="pointer-events-none absolute top-0 left-0 w-48 h-48 rounded-full blur-[80px] opacity-20 -translate-x-1/3 -translate-y-1/3" style={{ background: '#C4973F' }} />
        <div className="pointer-events-none absolute bottom-0 right-0 w-40 h-40 rounded-full blur-[60px] opacity-10 translate-x-1/3 translate-y-1/3" style={{ background: '#C4973F' }} />

        {/* Top bar — close button only, no internal theme toggle */}
        <div className="relative z-10 flex items-center justify-end px-5 pt-5 shrink-0">
          <button
            type="button"
            onClick={() => setLumiOpen(false)}
            className="grid h-9 w-9 place-items-center rounded-xl transition-colors"
            style={{ color: dm ? 'rgba(255,253,248,0.45)' : '#8A8278' }}
          >
            <Icon name="x" className="h-5 w-5" />
          </button>
        </div>

        {/* Identity */}
        <div className="relative z-10 flex flex-col items-center pt-3 pb-4 px-6 shrink-0">
          <div className="relative flex items-center justify-center mb-4" style={{ width: 130, height: 130 }}>
            <div className="absolute inset-6 rounded-full blur-[28px] opacity-40" style={{ background: '#C4973F' }} />
            <div className="absolute rounded-full" style={{ width: 120, height: 120, border: '1px solid rgba(196,151,63,0.25)' }} />
            <div className="absolute rounded-full" style={{ width: 88, height: 88, border: '1px solid rgba(196,151,63,0.2)' }} />
            <div className="absolute top-0 left-1/2 -translate-x-1/2" style={{ width: 120, height: 1, background: 'linear-gradient(90deg, transparent, rgba(196,151,63,0.5), transparent)' }} />
            <div
              className="lumi-breathe relative"
              style={{
                width: 60, height: 60, borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 30%, #F5E6C8, #C4973F 55%, #8B6420)',
                zIndex: 2,
              }}
            >
              <div className="absolute" style={{ top: '16%', left: '18%', width: '32%', height: '28%', borderRadius: '50%', background: 'rgba(255,255,255,0.5)', filter: 'blur(3px)' }} />
            </div>
          </div>
          <div className="lumi-identity-name text-2xl font-black tracking-[-0.02em]" style={{ color: dm ? '#FFFDF8' : '#1A1814' }}>Lumi</div>
          <div className="text-[10px] font-bold uppercase tracking-[.18em] mt-1" style={{ color: dm ? 'rgba(250,247,242,0.45)' : '#8A8278' }}>
            Your clinic automation assistant
          </div>
        </div>

        {/* Scrollable body */}
        <div className="relative z-10 flex-1 overflow-y-auto min-h-0">
          {showPills ? (
            <>
              {/* Action buttons 2×2 grid */}
              <div className="grid grid-cols-2 gap-2.5 px-4 pb-3">
                <button
                  type="button"
                  onClick={() => { setShowPills(false); sendToLumi('What am I losing this month?'); }}
                  className="flex items-start gap-3 p-4 text-left transition-all hover:-translate-y-0.5"
                  style={{
                    minHeight: 74, borderRadius: '1.45rem',
                    backgroundColor: dm ? 'rgba(255,253,248,0.06)' : 'white',
                    border: `1px solid ${dm ? 'rgba(196,151,63,0.2)' : 'rgba(26,24,20,0.08)'}`,
                    boxShadow: dm ? 'none' : '0 2px 8px rgba(26,24,20,0.04)',
                    color: dm ? '#FFFDF8' : '#1A1814',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C4973F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                  <span className="text-sm font-bold leading-tight">What am I losing this month?</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setShowPills(false); sendToLumi('Which clients need attention?'); }}
                  className="flex items-start gap-3 p-4 text-left transition-all hover:-translate-y-0.5"
                  style={{
                    minHeight: 74, borderRadius: '1.45rem',
                    backgroundColor: dm ? 'rgba(255,253,248,0.06)' : 'white',
                    border: `1px solid ${dm ? 'rgba(196,151,63,0.2)' : 'rgba(26,24,20,0.08)'}`,
                    boxShadow: dm ? 'none' : '0 2px 8px rgba(26,24,20,0.04)',
                    color: dm ? '#FFFDF8' : '#1A1814',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C4973F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  <span className="text-sm font-bold leading-tight">Which clients need attention?</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setShowPills(false); sendToLumi('What can Lumi actually do?'); }}
                  className="col-span-2 flex items-center gap-3 p-4 text-left transition-all hover:-translate-y-0.5"
                  style={{
                    minHeight: 74, borderRadius: '1.45rem',
                    backgroundColor: dm ? 'rgba(196,151,63,0.1)' : 'rgba(196,151,63,0.06)',
                    border: '1px solid rgba(196,151,63,0.25)',
                    color: dm ? '#FFFDF8' : '#1A1814',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C4973F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z"/>
                  </svg>
                  <span className="text-sm font-bold leading-tight">What can Lumi actually do?</span>
                </button>
              </div>

              {/* Stats card */}
              <div className="relative mx-4 mb-4 rounded-[1.45rem] p-4 overflow-hidden" style={{
                background: dm ? 'rgba(196,151,63,0.07)' : 'rgba(196,151,63,0.05)',
                border: '1px solid rgba(196,151,63,0.12)',
              }}>
                <svg className="absolute bottom-0 left-0 right-0 w-full opacity-20" height="40" viewBox="0 0 400 40" preserveAspectRatio="none" fill="none">
                  <path d="M0 20 Q50 5 100 20 T200 20 T300 20 T400 20 V40 H0 Z" fill="#C4973F"/>
                </svg>
                <p className="text-[10px] font-bold uppercase tracking-[.16em] mb-3" style={{ color: '#C4973F' }}>This week</p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C4973F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.59 3.47 2 2 0 0 1 3.56 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.9-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    <span className="text-xs font-medium" style={{ color: dm ? 'rgba(250,247,242,0.65)' : '#8A8278' }}>31 enquiries responded to instantly</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C4973F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <span className="text-xs font-medium" style={{ color: dm ? 'rgba(250,247,242,0.65)' : '#8A8278' }}>19 bookings confirmed automatically</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C4973F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    <span className="text-xs font-medium" style={{ color: dm ? 'rgba(250,247,242,0.65)' : '#8A8278' }}>9 no-shows prevented</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div
              ref={lumiScrollRef}
              className="px-4 py-3 space-y-4"
            >
              {lumiMsgs.map((msg, i) => (
                <div key={i} className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  {msg.role === 'assistant' && (
                    <span className="text-[10px] font-extrabold uppercase tracking-[.16em] px-1" style={{ color: dm ? '#E8B44B' : '#C4973F' }}>
                      Lumi
                    </span>
                  )}
                  <div
                    className={`max-w-[84%] rounded-2xl px-4 py-3 text-sm leading-6 ${msg.role === 'assistant' ? 'rounded-tl-sm' : 'rounded-tr-sm'}`}
                    style={msg.role === 'assistant'
                      ? { backgroundColor: dm ? 'rgba(255,253,248,0.08)' : '#F9EDE8', color: dm ? '#FFFDF8' : '#1A1814' }
                      : { backgroundColor: dm ? '#C4973F' : '#1A1814', color: dm ? '#1A1814' : '#FFFDF8' }
                    }
                  >
                    {msg.content === '' && lumiLoading && i === lumiMsgs.length - 1
                      ? <span className="flex gap-1 pt-1">{[0, 1, 2].map(d => <span key={d} className="h-1.5 w-1.5 rounded-full bg-[#C4973F] typing-dot" style={{ animationDelay: `${d * 0.14}s` }} />)}</span>
                      : msg.role === 'assistant'
                        ? <ReactMarkdown components={MD as never}>{msg.content}</ReactMarkdown>
                        : msg.content
                    }
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input row */}
        <div
          className="relative z-10 shrink-0 p-4"
          style={{ borderTop: `1px solid ${dm ? 'rgba(255,253,248,0.08)' : 'rgba(26,24,20,0.08)'}` }}
        >
          <form onSubmit={e => { e.preventDefault(); setShowPills(false); sendToLumi(lumiInput); }} className="flex items-center gap-2">
            <input
              value={lumiInput} onChange={e => setLumiInput(e.target.value)}
              placeholder="Ask Lumi anything about your clinic..."
              style={{
                fontSize: '16px',
                backgroundColor: dm ? 'rgba(255,253,248,0.06)' : 'white',
                color: dm ? '#FFFDF8' : '#1A1814',
                borderColor: dm ? 'rgba(255,253,248,0.12)' : 'rgba(26,24,20,0.12)',
              }}
              className="flex-1 rounded-full border px-5 py-2.5 text-sm placeholder:text-[#8A8278]/60 focus:outline-none focus:border-[#C4973F]/50 transition-colors"
            />
            <MicButton onResult={setLumiInput} />
            <button
              type="submit"
              disabled={!lumiInput.trim() || lumiLoading}
              className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full transition-colors disabled:opacity-40"
              style={{ backgroundColor: '#C4973F', color: '#1A1814' }}
            >
              <Icon name="send" className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Mobile bottom nav — 5 tabs with Lumi orb center */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t lg:hidden"
        style={{ backgroundColor: dTopbarBg, backdropFilter: 'blur(20px)', borderColor: dCardBorder, paddingBottom: 'env(safe-area-inset-bottom)', height: 64 }}>
        <div className="grid grid-cols-5 h-full items-center px-1">
          {([
            { id: 'overview' as Tab, icon: 'overview', label: 'Home' },
            { id: 'activity' as Tab, icon: 'activity', label: 'Activity' },
          ] as { id: Tab; icon: string; label: string }[]).map(({ id, icon, label }) => (
            <button key={id} type="button" onClick={() => setTab(id)}
              className="flex flex-col items-center justify-center gap-1 h-full text-[10px] font-bold transition-all"
              style={{ color: tab === id ? '#C4973F' : dTextMuted }}>
              <Icon name={icon} className="h-5 w-5" />
              {label}
            </button>
          ))}
          {/* Lumi orb — center */}
          <button type="button" onClick={() => openLumi()}
            className="flex flex-col items-center justify-center h-full">
            <div
              className="lumi-breathe"
              style={{
                width: 42, height: 42, borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 30%, #F5E6C8, #C4973F 55%, #8B6420)',
                boxShadow: '0 4px 20px rgba(196,151,63,0.55)',
              }}
            />
          </button>
          {([
            { id: 'conversations' as Tab, icon: 'conversations', label: 'Inbox' },
            { id: 'clients' as Tab, icon: 'clients', label: 'Clients' },
          ] as { id: Tab; icon: string; label: string }[]).map(({ id, icon, label }) => (
            <button key={id} type="button" onClick={() => setTab(id)}
              className="flex flex-col items-center justify-center gap-1 h-full text-[10px] font-bold transition-all"
              style={{ color: tab === id ? '#C4973F' : dTextMuted }}>
              <Icon name={icon} className="h-5 w-5" />
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* Desktop sticky CTA — smart: changes when coming from reveal */}
      {!isPreview && (
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 hidden lg:block">
        <div className="flex items-center gap-4 rounded-full border border-[rgba(26,24,20,0.1)] px-6 py-3 shadow-[0_20px_60px_rgba(26,24,20,.1)] backdrop-blur-xl hover:shadow-[0_20px_60px_rgba(196,151,63,.15)] transition-all"
          style={{ backgroundColor: 'rgba(255,253,248,0.92)' }}>
          <span className="text-sm font-semibold text-[#1A1814]">
            {fromReveal ? 'Ready to get started? No call needed.' : 'Ready to see this in your clinic?'}
          </span>
          <a
            href={fromReveal ? '/#pricing' : '/audit'}
            className="rounded-full bg-[#C4973F] px-4 py-1.5 text-xs font-bold text-[#1A1814] hover:bg-[#E8B44B] transition-colors whitespace-nowrap"
          >
            {fromReveal ? 'View pricing →' : 'Get your free Revenue Reveal →'}
          </a>
        </div>
      </div>
      )}

    </div>
  );
}
