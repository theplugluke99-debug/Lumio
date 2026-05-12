export default function Logo({ light = false, small = false }: { light?: boolean; small?: boolean }) {
  return (
    <img
      src="/lumio-logo.png"
      alt="Lumio"
      className={`${small ? 'h-10 md:h-12' : 'h-16 md:h-20'} w-auto object-contain`}
      style={{ filter: light ? 'brightness(0) invert(1)' : 'none' }}
    />
  );
}
