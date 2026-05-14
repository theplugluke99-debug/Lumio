export default function Logo({ light = false, small = false, width }: { light?: boolean; small?: boolean; width?: number }) {
  return (
    <img
      src="/lumio-logo.png"
      alt="Lumio"
      style={{
        ...(width ? { width: `${width}px` } : {}),
        height: 'auto',
        filter: light ? 'brightness(0) invert(1)' : 'none',
      }}
      className={width ? 'object-contain' : `${small ? 'h-10 md:h-12' : 'h-16 md:h-20'} w-auto object-contain`}
    />
  );
}
