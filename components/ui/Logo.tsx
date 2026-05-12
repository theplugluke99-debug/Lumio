import Image from 'next/image';

interface LogoProps {
  small?: boolean;
  large?: boolean;
  light?: boolean;
}

export default function Logo({ small, large, light }: LogoProps) {
  const sizeClass = large ? 'h-20 md:h-24' : 'h-10 md:h-12';
  const filter = light
    ? 'brightness(10) saturate(0.6) sepia(0.3)'
    : 'brightness(0.15) sepia(1) saturate(4) hue-rotate(5deg)';
  return (
    <Image
      src="/lumio-logo.png"
      alt="Lumio"
      width={large ? 200 : 140}
      height={large ? 80 : 48}
      className={`${sizeClass} w-auto object-contain`}
      style={{ filter }}
      priority
    />
  );
}
