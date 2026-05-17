'use client';

import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia('(max-width: 767px)').matches || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', onMove);
    let raf: number;
    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top = `${ring.current.y}px`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('mousemove', onMove);
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
          transform: 'translate(-50%,-50%)',
          mixBlendMode: 'multiply',
          top: 0,
          left: 0,
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
          transform: 'translate(-50%,-50%)',
          opacity: 0.5,
          top: 0,
          left: 0,
        }}
      />
    </>
  );
}
