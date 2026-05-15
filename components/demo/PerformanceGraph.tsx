'use client'

import { useState } from 'react'

interface Props { darkMode: boolean }

const DATA_8W = [
  { week: 'W1', leads: 12, booked: 7 },
  { week: 'W2', leads: 15, booked: 9 },
  { week: 'W3', leads: 11, booked: 8 },
  { week: 'W4', leads: 18, booked: 12 },
  { week: 'W5', leads: 22, booked: 15 },
  { week: 'W6', leads: 19, booked: 13 },
  { week: 'W7', leads: 27, booked: 18 },
  { week: 'W8', leads: 31, booked: 19 },
]

const DATA_4W = DATA_8W.slice(-4)

const DATA_3M = [
  { week: 'W1', leads: 8, booked: 4 },
  { week: 'W2', leads: 10, booked: 6 },
  { week: 'W3', leads: 9, booked: 5 },
  { week: 'W4', leads: 12, booked: 7 },
  { week: 'W5', leads: 11, booked: 8 },
  { week: 'W6', leads: 15, booked: 9 },
  { week: 'W7', leads: 13, booked: 10 },
  { week: 'W8', leads: 18, booked: 12 },
  { week: 'W9', leads: 22, booked: 15 },
  { week: 'W10', leads: 27, booked: 18 },
  { week: 'W11', leads: 31, booked: 19 },
  { week: 'W12', leads: 31, booked: 19 },
]

const ALL_DATA: Record<string, typeof DATA_8W> = { '4W': DATA_4W, '8W': DATA_8W, '3M': DATA_3M }

export default function PerformanceGraph({ darkMode: dm }: Props) {
  const [period, setPeriod] = useState('8W')
  const data = ALL_DATA[period]

  const cardBg = dm ? 'rgba(255,253,248,0.04)' : 'rgba(255,255,255,0.72)'
  const border = dm ? 'rgba(255,253,248,0.08)' : 'rgba(26,24,20,0.08)'
  const textPri = dm ? '#FFFDF8' : '#1A1814'
  const textMut = dm ? 'rgba(255,253,248,0.35)' : 'rgba(26,24,20,0.4)'
  const gridClr = dm ? 'rgba(255,253,248,0.06)' : 'rgba(26,24,20,0.06)'

  const W = 600, H = 140, padX = 4, padY = 4
  const iW = W - 2 * padX, iH = H - 2 * padY
  const maxV = Math.max(...data.map(d => d.leads))
  const n = data.length

  const xp = (i: number) => padX + (n > 1 ? (i / (n - 1)) * iW : iW / 2)
  const yp = (v: number) => padY + iH - (v / maxV) * iH

  const linePath = (key: 'leads' | 'booked') =>
    data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xp(i).toFixed(1)},${yp(d[key]).toFixed(1)}`).join(' ')

  const areaPath = (key: 'leads' | 'booked') =>
    linePath(key) + ` L ${xp(n - 1).toFixed(1)},${H} L ${xp(0).toFixed(1)},${H} Z`

  const labelData = n <= 8 ? data : data.filter((_, i) => i % 3 === 0 || i === n - 1)

  return (
    <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: '1.25rem', padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 700, fontSize: 16, color: textPri }}>
          Leads captured
        </span>
        <div style={{ display: 'flex', gap: 6 }}>
          {['4W', '8W', '3M'].map(p => (
            <button key={p} onClick={() => setPeriod(p)} style={{
              fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 500, fontSize: 12,
              borderRadius: 99, padding: '4px 12px', cursor: 'pointer', transition: 'all 150ms',
              background: period === p ? '#C4973F' : 'transparent',
              color: period === p ? '#1A1814' : textMut,
              border: period === p ? '1px solid #C4973F' : `1px solid ${border}`,
            }}>
              {p}
            </button>
          ))}
        </div>
      </div>

      <div style={{ height: 200, position: 'relative' }}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="none" style={{ display: 'block' }}>
          {[0.25, 0.5, 0.75, 1].map(t => (
            <line key={t}
              x1={padX} y1={padY + iH * (1 - t)} x2={W - padX} y2={padY + iH * (1 - t)}
              stroke={gridClr} strokeDasharray="4 4" strokeWidth={1}
            />
          ))}
          <path d={areaPath('leads')} fill="rgba(196,151,63,0.08)" />
          <path d={areaPath('booked')} fill="rgba(91,138,104,0.08)" />
          <path d={linePath('leads')} fill="none" stroke="#C4973F" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          <path d={linePath('booked')} fill="none" stroke="#5B8A68" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, marginBottom: 12 }}>
        {labelData.map((d, i) => (
          <span key={i} style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 11, color: textMut }}>{d.week}</span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 20, marginBottom: 12 }}>
        {[{ color: '#C4973F', label: 'Leads captured' }, { color: '#5B8A68', label: 'Bookings made' }].map(({ color, label }) => (
          <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 500, fontSize: 12, color: textMut }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, display: 'inline-block' }} />
            {label}
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 600, fontSize: 13, color: '#5B8A68' }}>↑ 158% leads vs 8 weeks ago</span>
        <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 600, fontSize: 13, color: '#5B8A68' }}>↑ 171% bookings vs 8 weeks ago</span>
      </div>
    </div>
  )
}
