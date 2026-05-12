import type { Metadata } from "next";
import { Playfair_Display, Syne } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumio — Your aesthetic clinic, running itself.",
  description:
    "AI automation for UK aesthetic clinics. Capture every lead, book every appointment, automate your admin. While you focus on your clients.",
  keywords: [
    "aesthetic clinic automation",
    "AI booking system",
    "clinic lead response",
    "aesthetic clinic software London",
  ],
  openGraph: {
    title: "Lumio — Your aesthetic clinic, running itself.",
    description:
      "AI automation for UK aesthetic clinics. Capture every lead, book every appointment, automate your admin. While you focus on your clients.",
    url: "https://lumio.london",
    siteName: "Lumio",
    locale: "en_GB",
    type: "website",
  },
  metadataBase: new URL("https://lumio.london"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${syne.variable}`}>
      <body
        style={{ fontFamily: "var(--font-syne), sans-serif" }}
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
