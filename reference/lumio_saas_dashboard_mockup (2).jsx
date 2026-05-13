import React from "react";

const C = {
  ivory: "#FFFDF8",
  blush: "#F9EDE8",
  lavender: "#F0EDF8",
  sage: "#EDF4EE",
  rose: "#F2DDD8",
  gold: "#C4973F",
  goldBright: "#E8B44B",
  charcoal: "#1A1814",
  muted: "#8A8278",
  border: "rgba(26,24,20,0.08)",
};

function Logo() {
  return (
    <div className="relative inline-flex items-center justify-center">
      <span className="absolute -top-4 left-1/2 h-10 w-[118%] -translate-x-1/2 rounded-full border-t border-[#C4973F]" />
      <span className="absolute -top-2 left-1/2 h-10 w-28 -translate-x-1/2 rounded-full bg-[#E8B44B]/25 blur-xl" />
      <span className="relative font-display text-5xl font-black tracking-[-0.07em] text-[#1A1814]">Lumio</span>
      <span className="ml-1 mt-4 h-2 w-2 rounded-full bg-[#C4973F] shadow-[0_0_18px_rgba(232,180,75,.8)]" />
    </div>
  );
}

function Icon({ name, className = "h-5 w-5" }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  const icons = {
    overview: <><rect x="3" y="3" width="7" height="7" rx="1.5" {...common}/><rect x="14" y="3" width="7" height="7" rx="1.5" {...common}/><rect x="3" y="14" width="7" height="7" rx="1.5" {...common}/><rect x="14" y="14" width="7" height="7" rx="1.5" {...common}/></>,
    activity: <path d="M3 12h4l2-6 4 12 3-8 2 2h3" {...common}/>,
    conversations: <><path d="M5 6.5h14v8.5H9l-4 3v-11.5Z" {...common}/><path d="M8 10h8M8 13h5" {...common}/></>,
    clients: <><path d="M8.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" {...common}/><path d="M2.8 20c.7-3.3 2.9-5 5.7-5s5 1.7 5.7 5" {...common}/><path d="M17 11a2.8 2.8 0 1 0 0-5.6" {...common}/><path d="M16 15c2.5.2 4.2 1.9 4.8 5" {...common}/></>,
    lock: <><rect x="5" y="10" width="14" height="10" rx="2" {...common}/><path d="M8 10V7a4 4 0 0 1 8 0v3" {...common}/></>,
    settings: <><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" {...common}/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.05.05a2 2 0 0 1-2.83 2.83l-.05-.05A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .92V20.5a2 2 0 0 1-4 0v-.18a1.7 1.7 0 0 0-1-.92 1.7 1.7 0 0 0-1.88.34l-.05.05a2 2 0 0 1-2.83-2.83l.05-.05A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.92-1H3.5a2 2 0 0 1 0-4h.18a1.7 1.7 0 0 0 .92-1 1.7 1.7 0 0 0-.34-1.88l-.05-.05a2 2 0 0 1 2.83-2.83l.05.05A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.92V3.5a2 2 0 0 1 4 0v.18a1.7 1.7 0 0 0 1 .92 1.7 1.7 0 0 0 1.88-.34l.05-.05a2 2 0 0 1 2.83 2.83l-.05.05A1.7 1.7 0 0 0 19.4 9c.32.37.63.7.92 1h.18a2 2 0 0 1 0 4h-.18a1.7 1.7 0 0 0-.92 1Z" {...common}/></>,
    bell: <><path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" {...common}/><path d="M10 21h4" {...common}/></>,
    lead: <><path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" {...common}/><path d="M2.5 21c.7-4 2.7-6 5.5-6 1.6 0 2.9.6 3.9 1.8" {...common}/><path d="M14 13h7M17.5 9.5v7" {...common}/></>,
    booking: <><rect x="4" y="5" width="16" height="15" rx="2" {...common}/><path d="M8 3v4M16 3v4M4 10h16" {...common}/><path d="m9 15 2 2 4-5" {...common}/></>,
    noshow: <><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" {...common}/><path d="M8 12h8M12 8v8" {...common}/></>,
    money: <><path d="M7 7h7a3 3 0 0 1 0 6H7V3" {...common}/><path d="M7 13h8a3 3 0 0 1 0 6H7v-6Z" {...common}/></>,
    star: <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6-5.4-2.8-5.4 2.8 1-6-4.4-4.3 6.1-.9L12 3Z" {...common}/>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" {...common}/><path d="m4 7 8 6 8-6" {...common}/></>,
    pulse: <path d="M3 12h4l2.2-6 4.6 12 2.2-6h5" {...common}/>,
    spark: <><path d="M12 2v5M12 17v5M4.9 4.9l3.5 3.5M15.6 15.6l3.5 3.5M2 12h5M17 12h5M4.9 19.1l3.5-3.5M15.6 8.4l3.5-3.5" {...common}/></>,
  };
  return <svg viewBox="0 0 24 24" className={className}>{icons[name]}</svg>;
}

function NavItem({ icon, label, active, locked }) {
  return (
    <div className={`group flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition-all duration-300 ${active ? "border border-[#C4973F]/35 bg-[#FFFDF8] text-[#C4973F] shadow-[0_14px_40px_rgba(196,151,63,.09)]" : "text-[#1A1814]/68 hover:bg-white/55 hover:text-[#1A1814]"}`}>
      <div className="flex items-center gap-3">
        <span className={`grid h-8 w-8 place-items-center rounded-xl ${active ? "bg-[#C4973F]/12" : "bg-white/45"}`}><Icon name={icon} className="h-4.5 w-4.5" /></span>
        <span className="font-semibold">{label}</span>
      </div>
      {locked && <span className="grid h-7 w-7 place-items-center rounded-full bg-[#C4973F]/12 text-[#C4973F]"><Icon name="lock" className="h-3.5 w-3.5" /></span>}
    </div>
  );
}

function MetricCard({ tint, icon, value, label, note, trend, foot }) {
  return (
    <div className="group relative min-h-[245px] overflow-hidden rounded-[2rem] border border-[rgba(26,24,20,0.08)] bg-white/82 p-6 shadow-[0_24px_80px_rgba(26,24,20,.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C4973F]/45">
      <div className="absolute inset-0 opacity-90" style={{ background: `radial-gradient(circle at 18% 12%, ${tint}, transparent 52%)` }} />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/75 text-[#C4973F] shadow-inner"><Icon name={icon} className="h-6 w-6" /></div>
          <span className="rounded-full bg-white/70 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[.14em] text-[#C4973F]">{trend}</span>
        </div>
        <div className="mt-8 font-display text-6xl font-black leading-none tracking-[-.06em] text-[#1A1814]">{value}</div>
        <p className="mt-3 text-[16px] font-extrabold leading-6 text-[#1A1814]">{label}</p>
        <p className="mt-2 text-xs leading-5 text-[#8A8278]">{note}</p>
        <div className="mt-auto pt-5 text-[10px] font-bold uppercase tracking-[.16em] text-[#8A8278]/70">{foot}</div>
      </div>
    </div>
  );
}

function ActivityRow({ time, title, detail, status, icon }) {
  return (
    <div className="flex items-center gap-4 border-b border-[rgba(26,24,20,0.06)] py-4 last:border-b-0">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#FFF7E8] text-[#C4973F]"><Icon name={icon} className="h-5 w-5" /></div>
      <div className="w-14 shrink-0 text-xs font-semibold text-[#8A8278]">{time}</div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-bold text-[#1A1814]">{title}</div>
        <div className="mt-1 truncate text-xs text-[#8A8278] sm:whitespace-normal">{detail}</div>
      </div>
      <div className="hidden items-center gap-2 text-xs text-[#5B8A68] sm:flex">
        <span className="h-1.5 w-1.5 rounded-full bg-[#5B8A68]" /> {status}
      </div>
    </div>
  );
}

function ProgressBar({ label, value, amber }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm font-bold text-[#1A1814]">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[#E8DED2]">
        <div className={`h-full rounded-full shadow-[0_0_18px_rgba(196,151,63,.35)] ${amber ? "bg-[#E8B44B]" : "bg-[#C4973F]"}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function StatusPill({ children, tone = "gold" }) {
  const tones = {
    green: "bg-[#EDF4EE] text-[#5B8A68]",
    gold: "bg-[#FFF4DD] text-[#C4973F]",
    red: "bg-[#F9E1DF] text-[#B35A4C]",
    slate: "bg-[#F4F1EC] text-[#8A8278]",
  };

  return (
    <span className={`rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-[.14em] ${tones[tone]}`}>
      {children}
    </span>
  );
}

function Toggle({ enabled }) {
  return (
    <div className={`relative h-7 w-12 rounded-full transition ${enabled ? "bg-[#C4973F]" : "bg-[#DDD5C5]"}`}>
      <div className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${enabled ? "left-6" : "left-1"}`} />
    </div>
  );
}

function AdminHubPanel() {
  const consentRows = [
    ["Amelia Clarke", "11:00am", "Completed", true],
    ["Grace Miller", "1:30pm", "Pending", true],
    ["Sophia Reed", "3:00pm", "Sent", false],
  ];

  const invoices = [
    ["INV-2048", "£480", "Paid", "green"],
    ["INV-2051", "£220", "Sent", "gold"],
    ["INV-2055", "£640", "Overdue", "red"],
  ];

  const stock = [
    ["Lip filler syringes", 84, false],
    ["Botox units", 62, false],
    ["Numbing cream", 24, true],
    ["Aftercare packs", 12, true],
  ];

  return (
    <div className="mt-8 space-y-6">
      <div>
        <div className="mb-3 text-[10px] font-extrabold uppercase tracking-[.22em] text-[#C4973F]">Operations Suite</div>
        <h3 className="font-display text-5xl font-black tracking-[-.05em] text-[#1A1814]">A back office that runs itself.</h3>
      </div>

      <div className="relative overflow-hidden rounded-[2.5rem] border border-[rgba(26,24,20,0.08)] bg-white/70 p-8 shadow-[0_35px_120px_rgba(26,24,20,.08)]">
        <div className="absolute inset-0 backdrop-blur-[4px]" />
        <div className="absolute inset-0 bg-[#FFFDF8]/70" />

        <div className="grid gap-6 opacity-40 xl:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-[2rem] border border-[rgba(26,24,20,0.08)] bg-white/80 p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#8A8278]">Consent forms</div>
                <h4 className="mt-2 font-display text-3xl font-black">Tracker</h4>
              </div>
              <StatusPill tone="gold">Live sync</StatusPill>
            </div>

            <div className="space-y-4">
              {consentRows.map(([name, time, status]) => (
                <div key={name} className="flex items-center justify-between rounded-2xl border border-[rgba(26,24,20,0.06)] bg-white px-4 py-4">
                  <div>
                    <div className="text-sm font-bold text-[#1A1814]">{name}</div>
                    <div className="mt-1 text-xs text-[#8A8278]">Appointment · {time}</div>
                  </div>
                  <StatusPill tone={status === "Completed" ? "green" : status === "Pending" ? "red" : "gold"}>{status}</StatusPill>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-[rgba(26,24,20,0.08)] bg-white/80 p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#8A8278]">Invoices</div>
                  <h4 className="mt-2 font-display text-3xl font-black">Auto-chasing</h4>
                </div>
                <Toggle enabled />
              </div>

              <div className="space-y-3">
                {invoices.map(([id, amount, status, tone]) => (
                  <div key={id} className="flex items-center justify-between rounded-2xl border border-[rgba(26,24,20,0.06)] bg-white px-4 py-4">
                    <div>
                      <div className="text-sm font-bold text-[#1A1814]">{id}</div>
                      <div className="mt-1 text-xs text-[#8A8278]">{amount}</div>
                    </div>
                    <StatusPill tone={tone}>{status}</StatusPill>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-[rgba(26,24,20,0.08)] bg-white/80 p-6">
              <div className="mb-5">
                <div className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#8A8278]">Monthly reporting</div>
                <h4 className="mt-2 font-display text-3xl font-black">May 2026 Report</h4>
              </div>

              <div className="rounded-2xl bg-[#1A1814] p-5 text-[#FFFDF8]">
                <div className="text-xs uppercase tracking-[.18em] text-[#E8B44B]">Generated automatically by Lumio</div>
                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div>
                    <div className="font-display text-4xl font-black">+38%</div>
                    <div className="mt-1 text-xs text-[#FFFDF8]/55">Lead response improvement</div>
                  </div>
                  <div>
                    <div className="font-display text-4xl font-black">£18.4k</div>
                    <div className="mt-1 text-xs text-[#FFFDF8]/55">Revenue attributed</div>
                  </div>
                </div>

                <button className="mt-6 rounded-2xl bg-[#C4973F] px-5 py-3 text-[10px] font-extrabold uppercase tracking-[.16em] text-[#1A1814] transition hover:bg-[#E8B44B]">
                  Download report
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 z-20 flex items-center justify-center p-6">
          <div className="max-w-lg rounded-[2.2rem] border border-[#C4973F]/25 bg-[#1A1814] p-8 text-center shadow-[0_35px_120px_rgba(26,24,20,.35)]">
            <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-[1.7rem] border border-[#C4973F]/20 bg-[#C4973F]/10 text-[#E8B44B]">
              <Icon name="lock" className="h-7 w-7" />
            </div>

            <div className="text-[10px] font-extrabold uppercase tracking-[.22em] text-[#E8B44B]">Full Operations</div>
            <h4 className="mt-4 font-display text-5xl font-black leading-[.95] tracking-[-.05em] text-[#FFFDF8]">
              Unlock the complete back office.
            </h4>

            <p className="mt-5 text-sm leading-7 text-[#FFFDF8]/62">
              Consent forms. Invoice chasing. Reporting. Stock intelligence. The entire operational layer — automated.
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[.05] px-5 py-4 text-sm font-semibold text-[#FFFDF8]/72">
              From <span className="text-[#E8B44B]">£4,000 setup</span> · <span className="text-[#E8B44B]">£1,400/month</span>
            </div>

            <button className="mt-6 rounded-2xl bg-[#C4973F] px-7 py-4 text-[10px] font-extrabold uppercase tracking-[.18em] text-[#1A1814] transition hover:bg-[#E8B44B]">
              Upgrade to Full Operations
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
        <div className="rounded-[2.4rem] border border-[rgba(26,24,20,0.08)] bg-white/78 p-7 shadow-[0_35px_120px_rgba(26,24,20,.08)]">
          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#C4973F]">Consent forms tracker</div>
              <h4 className="mt-2 font-display text-4xl font-black tracking-[-.05em]">Everything signed before they arrive.</h4>
            </div>

            <div className="flex items-center gap-3 rounded-full border border-[rgba(26,24,20,0.08)] bg-[#FFFDF8] px-4 py-3 text-xs font-bold text-[#8A8278]">
              <span className="h-2 w-2 rounded-full bg-[#5B8A68]" /> Auto-chasing active
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.8rem] border border-[rgba(26,24,20,0.06)]">
            <div className="grid grid-cols-[1.2fr_.8fr_.8fr_.7fr] bg-[#F9EDE8]/55 px-5 py-4 text-[10px] font-extrabold uppercase tracking-[.18em] text-[#8A8278]">
              <div>Client</div>
              <div>Appointment</div>
              <div>Status</div>
              <div>Auto-chase</div>
            </div>

            {consentRows.map(([name, time, status, enabled]) => (
              <div key={name} className="grid grid-cols-[1.2fr_.8fr_.8fr_.7fr] items-center border-t border-[rgba(26,24,20,0.06)] bg-white px-5 py-5 text-sm">
                <div>
                  <div className="font-bold text-[#1A1814]">{name}</div>
                  <div className="mt-1 text-xs text-[#8A8278]">Aesthetic consultation</div>
                </div>
                <div className="font-semibold text-[#8A8278]">{time}</div>
                <div>
                  <StatusPill tone={status === "Completed" ? "green" : status === "Pending" ? "red" : "gold"}>{status}</StatusPill>
                </div>
                <div>
                  <Toggle enabled={enabled} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2.4rem] border border-[rgba(26,24,20,0.08)] bg-white/78 p-7 shadow-[0_35px_120px_rgba(26,24,20,.08)]">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#C4973F]">Invoice status</div>
                <h4 className="mt-2 font-display text-4xl font-black tracking-[-.05em]">Revenue protected.</h4>
              </div>
              <Toggle enabled />
            </div>

            <div className="space-y-3">
              {invoices.map(([id, amount, status, tone]) => (
                <div key={id} className="flex items-center justify-between rounded-2xl border border-[rgba(26,24,20,0.06)] bg-[#FFFDF8] px-5 py-4">
                  <div>
                    <div className="font-bold text-[#1A1814]">{id}</div>
                    <div className="mt-1 text-xs text-[#8A8278]">{amount}</div>
                  </div>
                  <StatusPill tone={tone}>{status}</StatusPill>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.4rem] border border-[rgba(26,24,20,0.08)] bg-white/78 p-7 shadow-[0_35px_120px_rgba(26,24,20,.08)]">
            <div className="mb-6">
              <div className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#C4973F]">Stock reminders</div>
              <h4 className="mt-2 font-display text-4xl font-black tracking-[-.05em]">Never run low again.</h4>
            </div>

            <div className="space-y-5">
              {stock.map(([item, level, low]) => (
                <div key={item}>
                  <div className="mb-2 flex items-center justify-between text-sm font-bold text-[#1A1814]">
                    <span>{item}</span>
                    <span className={low ? "text-[#C4973F]" : "text-[#8A8278]"}>{level}%</span>
                  </div>
                  <ProgressBar value={level} amber={low} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IntelligencePanel() {
  const rebookClients = [
    ["Emma Wilson", "Last visit · 7 weeks ago"],
    ["Sophie Carter", "Last visit · 6 weeks ago"],
    ["Olivia Bennett", "Last visit · 8 weeks ago"],
    ["Charlotte Hayes", "Last visit · 6 weeks ago"],
  ];

  return (
    <div className="relative overflow-hidden rounded-[2.4rem] border border-[#C4973F]/25 bg-[#1A1814] p-6 text-[#FFFDF8] shadow-[0_35px_120px_rgba(26,24,20,.24)] lg:p-7">
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#C4973F]/25 blur-3xl" />
      <div className="absolute -bottom-32 left-6 h-72 w-72 rounded-full bg-[#E8B44B]/10 blur-3xl" />

      <div className="relative z-10">
        <div className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C4973F]/20 bg-white/[.05] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[.18em] text-[#E8B44B]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E8B44B] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E8B44B]" />
              </span>
              Lumio Intelligence
            </div>

            <h3 className="mt-5 max-w-xl font-display text-4xl font-black leading-[1.02] tracking-[-.05em] text-[#FFFDF8] lg:text-[3.2rem]">
              Like having your
              <span className="italic text-[#E8B44B]"> best operator </span>
              inside the clinic.
            </h3>
          </div>

          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-[1.8rem] border border-[#C4973F]/25 bg-[#C4973F]/12 shadow-[0_0_50px_rgba(196,151,63,.22)]">
            <div className="relative flex h-7 w-7 items-center justify-center">
              <div className="absolute h-7 w-7 rounded-full bg-[#E8B44B]/35 blur-md" />
              <div className="relative h-4 w-4 rounded-full bg-[#E8B44B] shadow-[0_0_25px_rgba(232,180,75,.95)]" />
            </div>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.05fr_.95fr]">
          <div className="space-y-4">

            <div className="rounded-[1.8rem] border border-white/10 bg-white/[.045] p-5 backdrop-blur-xl">
              <div className="mb-3 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#FFF4DD] text-[#C4973F]">
                  <Icon name="spark" className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-[.16em] text-[#E8B44B]">Lumio</div>
                  <div className="text-xs text-[#FFFDF8]/45">2 seconds ago</div>
                </div>
              </div>

              <p className="text-sm leading-7 text-[#FFFDF8]/72">
                Instagram DM automation paused from Friday 6pm to Monday 9am. I'll resume automatically.
              </p>

              <div className="mt-4 rounded-2xl border border-[#C4973F]/15 bg-[#C4973F]/10 p-4">
                <p className="text-xs leading-6 text-[#FFFDF8]/62">
                  Want me to add an out-of-office message in the meantime?
                </p>
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-white/10 bg-white/[.045] p-5 backdrop-blur-xl">
              <div className="mb-3 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#F0EDF8] text-[#C4973F]">
                  <Icon name="mail" className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-[.16em] text-[#E8B44B]">Lumio</div>
                  <div className="text-xs text-[#FFFDF8]/45">Now active</div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/10 p-4 text-sm leading-7 text-[#FFFDF8]/72">
                “Hi! We're at a training event this weekend and will be back Monday morning. Drop us a message and we'll get back to you first thing 🌟”
              </div>
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-white/10 bg-white/[.05] p-5 backdrop-blur-xl">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#E8B44B]">Client retention</div>
                <h4 className="mt-2 font-display text-3xl font-black tracking-[-.04em] text-[#FFFDF8]">Clients needing rebooking</h4>
              </div>

              <div className="rounded-full border border-white/10 bg-white/[.04] px-3 py-2 text-[10px] font-bold uppercase tracking-[.14em] text-[#FFFDF8]/55">
                4 clients
              </div>
            </div>

            <div className="space-y-3">
              {rebookClients.map(([name, date]) => (
                <div key={name} className="group flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/10 p-4 transition hover:border-[#C4973F]/35 hover:bg-white/[.04] sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-sm font-bold text-[#FFFDF8]">{name}</div>
                    <div className="mt-1 text-xs text-[#FFFDF8]/45">{date}</div>
                  </div>

                  <button className="rounded-xl bg-[#C4973F] px-4 py-3 text-[10px] font-extrabold uppercase tracking-[.14em] text-[#1A1814] transition hover:bg-[#E8B44B]">
                    Send rebooking
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-[#C4973F]/15 bg-[#C4973F]/10 p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-[#E8B44B]"><Icon name="pulse" className="h-4 w-4" /></div>
                <p className="text-xs leading-6 text-[#FFFDF8]/65">
                  Lumio predicts a 68% chance of recovering at least 2 of these clients with a soft check-in sequence this evening.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-[1.8rem] border border-white/10 bg-white/[.04] p-3 backdrop-blur-xl">
          <div className="flex items-center gap-3 rounded-[1.4rem] border border-white/10 bg-black/10 px-4 py-4">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFF4DD] text-[#C4973F]">
              <div className="absolute h-4 w-4 rounded-full bg-[#E8B44B]/40 blur-sm" />
              <div className="relative h-2.5 w-2.5 rounded-full bg-[#E8B44B] shadow-[0_0_20px_rgba(232,180,75,.95)]" />
            </div>

            <input
              placeholder="Ask Lumio anything or give it a task..."
              className="flex-1 bg-transparent text-sm text-[#FFFDF8] placeholder:text-[#FFFDF8]/32 focus:outline-none"
            />

            <button className="rounded-2xl bg-[#C4973F] px-5 py-3 text-[10px] font-extrabold uppercase tracking-[.16em] text-[#1A1814] transition hover:bg-[#E8B44B]">
              Run
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LumioDashboard() {
  return (
    <main className="min-h-screen bg-[#FFFDF8] text-[#1A1814] antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=Syne:wght@400;600;700;800&display=swap');
        main { font-family: 'Syne', sans-serif; }
        .font-display { font-family: 'Playfair Display', serif; }
      `}</style>

      <div className="flex min-h-screen">
        <aside className="hidden w-[290px] shrink-0 border-r border-[rgba(26,24,20,0.08)] bg-[#F9EDE8]/55 p-6 lg:block">
          <div className="mb-10 pt-4">
            <Logo />
          </div>

          <nav className="space-y-2">
            <NavItem icon="overview" label="Overview" active />
            <NavItem icon="activity" label="Live activity" />
            <NavItem icon="conversations" label="Conversations" />
            <NavItem icon="clients" label="Clients" />
            <NavItem icon="lock" label="Admin hub" locked />
            <NavItem icon="settings" label="Settings" />
          </nav>

          <div className="mt-auto pt-20">
            <div className="rounded-[2rem] border border-[rgba(26,24,20,0.08)] bg-[#FFFDF8]/80 p-5 shadow-[0_20px_70px_rgba(26,24,20,.05)]">
              <div className="mb-7 text-[#C4973F]"><Icon name="spark" className="h-6 w-6" /></div>
              <p className="font-display text-2xl italic leading-tight text-[#C4973F]">Everything is handled.</p>
              <p className="mt-6 text-[10px] font-bold uppercase tracking-[.18em] text-[#8A8278]">LUMIO.LONDON</p>
            </div>
          </div>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-40 border-b border-[rgba(26,24,20,0.08)] bg-[#FFFDF8]/78 px-6 py-5 backdrop-blur-2xl lg:px-9">
            <div className="flex items-center justify-between gap-6">
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#1A1814] font-display text-xl font-black text-[#E8B44B] shadow-[0_18px_50px_rgba(26,24,20,.12)]">GA</div>
                  <div>
                    <h1 className="truncate font-display text-3xl font-black tracking-[-.04em] text-[#1A1814]">Glow Aesthetics London</h1>
                    <div className="mt-1 flex items-center gap-2 text-xs font-semibold text-[#5B8A68]"><span className="h-2 w-2 rounded-full bg-[#5B8A68]" /> Live automation active</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="hidden rounded-full border border-[rgba(26,24,20,0.08)] bg-white/70 px-4 py-3 text-xs font-bold uppercase tracking-[.14em] text-[#8A8278] transition hover:border-[#C4973F]/40 hover:text-[#C4973F] md:block">Export report</button>
                <button className="relative grid h-11 w-11 place-items-center rounded-full bg-[#F0EDF8] text-[#1A1814] transition hover:bg-[#F9EDE8] hover:text-[#C4973F]">
                  <Icon name="bell" className="h-5 w-5" />
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#C4973F] shadow-[0_0_10px_rgba(196,151,63,.7)]" />
                </button>
                <div className="h-12 w-12 rounded-full border-2 border-white bg-[linear-gradient(135deg,#C4973F,#1A1814)] shadow-[0_12px_40px_rgba(26,24,20,.12)]" />
              </div>
            </div>
          </header>

          <div className="relative flex-1 overflow-hidden px-6 py-8 lg:px-9">
            <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#F0EDF8] blur-3xl" />
            <div className="pointer-events-none absolute -left-28 bottom-10 h-96 w-96 rounded-full bg-[#F9EDE8] blur-3xl" />

            <div className="relative z-10 mx-auto max-w-[1440px]">
              <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[.22em] text-[#C4973F]">Overview</p>
                  <h2 className="mt-2 font-display text-5xl font-black leading-none tracking-[-.05em]">Clinic command centre</h2>
                </div>
                <p className="max-w-md text-sm leading-7 text-[#8A8278]">A live view of what Lumio has captured, handled, recovered and protected for your clinic this week.</p>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                <MetricCard tint="#F9EDE8" icon="lead" value="31" label="Leads captured this week" note="Across website, phone and Instagram." trend="+18%" foot="Captured by Lumio" />
                <MetricCard tint="#F0EDF8" icon="booking" value="19" label="Bookings made by AI" note="Confirmed automatically without manual chasing." trend="AI" foot="No receptionist needed" />
                <MetricCard tint="#EDF4EE" icon="noshow" value="2" label="No-shows this week" note="Down from 9 after reminder flow launched." trend="-77%" foot="Revenue protected" />
                <MetricCard tint="#FFF1D5" icon="money" value="£4,800" label="Pipeline value" note="Revenue attributed to Lumio-handled leads." trend="Live" foot="Tracked this week" />
              </div>

              <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_.95fr]">
                <div className="rounded-[2.2rem] border border-[rgba(26,24,20,0.08)] bg-white/72 p-6 shadow-[0_26px_90px_rgba(26,24,20,.05)] backdrop-blur-xl">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-display text-3xl font-black tracking-[-.04em]">Today's automation activity</h3>
                    <span className="rounded-full bg-[#FFF4DD] px-3 py-2 text-[10px] font-bold uppercase tracking-[.15em] text-[#C4973F]"><span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-[#C4973F]" /> Live feed</span>
                  </div>
                  <ActivityRow time="08:32" title="New DM answered" detail="Instagram · Lip filler enquiry qualified and routed to booking" status="Completed" icon="conversations" />
                  <ActivityRow time="08:28" title="Booking confirmed by AI" detail="Consultation · 24 May at 11:00" status="Completed" icon="booking" />
                  <ActivityRow time="08:15" title="Appointment reminder sent" detail="WhatsApp · Tomorrow's treatment confirmed" status="Completed" icon="bell" />
                  <ActivityRow time="07:45" title="Review requested" detail="Botox · 3 days post-treatment" status="Completed" icon="star" />
                  <ActivityRow time="07:30" title="Aftercare sent" detail="Lip filler · Client +44 7700 900123" status="Completed" icon="mail" />
                </div>

                <div className="grid gap-6">
                  <div className="rounded-[2.2rem] border border-[rgba(26,24,20,0.08)] bg-white/72 p-6 shadow-[0_26px_90px_rgba(26,24,20,.05)] backdrop-blur-xl">
                    <div className="mb-7 flex items-center justify-between">
                      <h3 className="font-display text-3xl font-black tracking-[-.04em]">Automation health</h3>
                      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#FFF4DD] text-[#C4973F]"><Icon name="pulse" className="h-5 w-5" /></span>
                    </div>
                    <div className="space-y-6">
                      <ProgressBar label="Lead response" value={98} />
                      <ProgressBar label="Reminder delivery" value={100} />
                      <ProgressBar label="Rebooking rate" value={74} />
                      <ProgressBar label="Review generation" value={81} />
                    </div>
                  </div>

                  <IntelligencePanel />

              <AdminHubPanel />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <nav className="fixed bottom-4 left-4 right-4 z-50 grid grid-cols-5 gap-2 rounded-[1.6rem] border border-[rgba(26,24,20,0.08)] bg-[#FFFDF8]/90 p-2 shadow-[0_24px_90px_rgba(26,24,20,.12)] backdrop-blur-2xl lg:hidden">
        {[
          ["overview", "Home"],
          ["activity", "Live"],
          ["conversations", "Inbox"],
          ["clients", "Clients"],
          ["spark", "Lumio"],
        ].map(([icon, label], i) => (
          <button key={label} className={`grid place-items-center gap-1 rounded-2xl px-2 py-2 text-[10px] font-bold ${i === 0 ? "bg-[#C4973F] text-[#1A1814]" : "text-[#8A8278]"}`}>
            <Icon name={icon} className="h-4 w-4" />
            {label}
          </button>
        ))}
      </nav>
    </main>
  );
}
