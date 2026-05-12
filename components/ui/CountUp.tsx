'use client';

import { useCountUp } from '@/hooks/useCountUp';

interface CountUpProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
  triggered: boolean;
  decimals?: number;
}

export default function CountUp({
  target, prefix = '', suffix = '', duration = 1800, delay = 0, triggered, decimals = 0,
}: CountUpProps) {
  const count = useCountUp(target, duration, delay, triggered);
  const display = decimals > 0
    ? count.toFixed(decimals)
    : Math.floor(count).toLocaleString('en-GB');
  return <>{`${prefix}${display}${suffix}`}</>;
}
