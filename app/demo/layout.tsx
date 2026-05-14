import { Inter, DM_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-dashboard',
  weight: ['400', '500', '600', '700'],
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dashboard-mono',
  weight: ['400', '500'],
  style: ['normal'],
});

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.variable} ${dmMono.variable}`}>
      <style>{`
        .demo-wrapper {
          --font-display: var(--font-dashboard);
          font-family: var(--font-dashboard), system-ui, sans-serif;
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
      `}</style>
      {children}
    </div>
  );
}
