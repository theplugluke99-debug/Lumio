'use client';

import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const visible = useRef(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!finePointer.matches || reducedMotion.matches) {
      return;
    }

    const dot = dotRef.current;
    const cursorRing = ringRef.current;

    if (!dot || !cursorRing) {
      return;
    }

    const place = (element: HTMLDivElement, x: number, y: number, scale = 1) => {
      element.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
    };

    const show = () => {
      if (visible.current) return;
      visible.current = true;
      dot.style.opacity = '1';
      cursorRing.style.opacity = '0.62';
      ring.current = { ...mouse.current };
      place(cursorRing, ring.current.x, ring.current.y);
    };

    const hide = () => {
      visible.current = false;
      dot.style.opacity = '0';
      cursorRing.style.opacity = '0';
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;

      mouse.current = { x: e.clientX, y: e.clientY };
      place(dot, e.clientX, e.clientY);
      show();
    };

    const onDown = () => {
      place(dot, mouse.current.x, mouse.current.y, 0.72);
      place(cursorRing, ring.current.x, ring.current.y, 0.86);
    };

    const onUp = () => {
      place(dot, mouse.current.x, mouse.current.y);
      place(cursorRing, ring.current.x, ring.current.y);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.addEventListener('mouseleave', hide);
    window.addEventListener('blur', hide);

    let raf: number;
    const animate = () => {
      if (visible.current) {
        ring.current.x += (mouse.current.x - ring.current.x) * 0.18;
        ring.current.y += (mouse.current.y - ring.current.y) * 0.18;
        place(cursorRing, ring.current.x, ring.current.y);
      }
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('mouseleave', hide);
      window.removeEventListener('blur', hide);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed z-[9999] hidden md:block pointer-events-none"
        style={{
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: '#C4973F',
          transform: 'translate3d(-120px, -120px, 0) translate(-50%, -50%)',
          mixBlendMode: 'multiply',
          opacity: 0,
          top: 0,
          left: 0,
          transition: 'opacity 160ms ease',
          willChange: 'transform, opacity',
        }}
      />
      <div
        ref={ringRef}
        className="fixed z-[9998] hidden md:block pointer-events-none"
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          border: '1.5px solid #C4973F',
          transform: 'translate3d(-120px, -120px, 0) translate(-50%, -50%)',
          opacity: 0,
          top: 0,
          left: 0,
          transition: 'opacity 180ms ease',
          willChange: 'transform, opacity',
        }}
      />
    </>
  );
}
