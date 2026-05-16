'use client';

import { useState, useRef, useCallback } from 'react';

interface Props {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  maxWidth?: number;
}

export default function Tooltip({ content, position = 'top', maxWidth = 230 }: Props) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);

  const calcCoords = useCallback(() => {
    if (!triggerRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    if (position === 'top') setCoords({ top: r.top - 8, left: r.left + r.width / 2 });
    else if (position === 'bottom') setCoords({ top: r.bottom + 8, left: r.left + r.width / 2 });
    else if (position === 'left') setCoords({ top: r.top + r.height / 2, left: r.left - 8 });
    else setCoords({ top: r.top + r.height / 2, left: r.right + 8 });
  }, [position]);

  const show = () => { calcCoords(); setOpen(true); };
  const hide = () => setOpen(false);

  const transform =
    position === 'top' ? 'translate(-50%, -100%)' :
    position === 'bottom' ? 'translate(-50%, 0)' :
    position === 'left' ? 'translate(-100%, -50%)' :
    'translate(0, -50%)';

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onMouseEnter={show}
        onMouseLeave={hide}
        onClick={() => open ? hide() : show()}
        aria-label="More info"
        style={{
          width: 15, height: 15, borderRadius: '50%',
          border: '1px solid rgba(26,24,20,0.2)',
          background: 'transparent', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          color: '#8A8278', fontSize: 9, fontWeight: 700, fontStyle: 'italic',
          fontFamily: 'Georgia, serif', transition: 'all 150ms', flexShrink: 0,
        }}
      >
        i
      </button>
      {open && (
        <div style={{
          position: 'fixed',
          top: coords.top,
          left: coords.left,
          transform,
          maxWidth,
          width: 'max-content',
          background: '#1A1814',
          border: '1px solid rgba(196,151,63,0.25)',
          borderRadius: 10,
          padding: '8px 12px',
          fontSize: 12,
          color: 'rgba(255,253,248,0.85)',
          lineHeight: 1.6,
          zIndex: 9999,
          boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
          fontFamily: 'var(--font-inter), Inter, sans-serif',
          fontWeight: 400,
          pointerEvents: 'none',
        }}>
          {content}
        </div>
      )}
    </>
  );
}
