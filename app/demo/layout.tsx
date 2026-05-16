import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={inter.variable}>
      <style>{`
        .demo-wrapper,
        .demo-wrapper * {
          font-family: var(--font-inter), sans-serif !important;
        }
        .demo-wrapper, .demo-wrapper * {
          cursor: default !important;
        }
        .demo-wrapper button,
        .demo-wrapper a,
        .demo-wrapper [role="button"] {
          cursor: pointer !important;
        }
        .demo-wrapper input,
        .demo-wrapper textarea {
          cursor: text !important;
        }
        .demo-wrapper .lumi-identity-name {
          font-family: var(--font-display, 'Playfair Display', serif) !important;
        }
      `}</style>
      {children}
    </div>
  );
}
