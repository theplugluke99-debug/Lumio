import { useState, useRef, useEffect } from 'react';

export function useCountUp(
  target: number,
  duration: number,
  delay: number,
  triggered: boolean,
): number {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!triggered || hasRun.current) return;
    hasRun.current = true;
    const timer = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setCount(eased * target);
        if (p < 1) requestAnimationFrame(tick);
        else setCount(target);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timer);
  }, [triggered, target, duration, delay]);

  return count;
}
