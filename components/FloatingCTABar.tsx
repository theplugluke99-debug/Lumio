'use client';

import { useEffect, useState } from 'react';

export default function FloatingCTABar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('lumio-cta-dismissed')) {
      setDismissed(true);
      return;
    }
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const dismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('lumio-cta-dismissed', '1');
  };

  if (dismissed) return null;

  return (
    <div
      className="hidden md:flex"
      style={{
        position: 'fixed',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 40,
        alignItems: 'center',
        gap: 12,
        background: 'rgba(26,24,20,0.95)',
        border: '1px solid rgba(196,151,63,0.2)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: 99,
        padding: '10px 10px 10px 20px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 300ms ease',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-inter, Inter, sans-serif)',
        fontWeight: 500,
        fontSize: 13,
        color: '#FFFDF8',
      }}>
        Ready to automate your clinic?
      </span>

      <a
        href="https://buy.stripe.com/3cI14fgTV22F0yN5LWd3i00"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          background: '#C4973F',
          color: '#0F0E0B',
          borderRadius: 99,
          padding: '8px 18px',
          fontFamily: 'var(--font-inter, Inter, sans-serif)',
          fontWeight: 700,
          fontSize: 13,
          textDecoration: 'none',
        }}
      >
        Get started →
      </a>

      <button
        type="button"
        onClick={dismiss}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px 8px',
          fontFamily: 'var(--font-inter, Inter, sans-serif)',
          fontWeight: 400,
          fontSize: 18,
          color: 'rgba(255,253,248,0.3)',
          lineHeight: 1,
        }}
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}
