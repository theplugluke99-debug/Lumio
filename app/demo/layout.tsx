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
        @keyframes lumiRing {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.06); }
        }
        @keyframes lumiBreathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.07); }
        }
        .lumi-ring { animation: lumiRing 3s ease-in-out infinite; }
        .lumi-breathe { animation: lumiBreathe 3s ease-in-out infinite; }
      `}</style>
      {children}
    </div>
  );
}
