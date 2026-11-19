import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MotionShell } from "@/components/motion-shell";
import { siteDescription, siteUrl } from "@/lib/site";

const headingFont = localFont({
  src: "../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  variable: "--font-heading",
  weight: "200 800",
  display: "swap",
  preload: true,
});
const bodyFont = localFont({
  src: "../../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2",
  variable: "--font-body",
  weight: "100 1000",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: "Kousik Maity | Full Stack Developer & GenAI Engineer",
    template: "%s | Kousik Maity",
  },
  description: siteDescription,
  applicationName: "Kousik Maity Portfolio",
  authors: [{ name: "Kousik Maity", url: "https://github.com/Kousik8436" }],
  creator: "Kousik Maity",
  keywords: [
    "Kousik Maity",
    "Full Stack Developer",
    "GenAI Engineer",
    "MERN Stack",
    "React Developer",
    "Next.js",
    "Generative AI",
    "Developer Portfolio",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Kousik Maity",
    title: "Kousik Maity | Full Stack Developer & GenAI Engineer",
    description: siteDescription,
    ...(siteUrl ? { url: siteUrl } : {}),
    images: [
      {
        url: "/images/social-card.png",
        width: 1200,
        height: 630,
        alt: "Kousik Maity — Full Stack Developer & GenAI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kousik Maity | Full Stack Developer & GenAI Engineer",
    description: siteDescription,
    images: ["/images/social-card.png"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg", apple: "/apple-touch-icon.png" },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body id="top">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <MotionShell>
          <Header />
          {children}
          <Footer />
        </MotionShell>
      </body>
    </html>
  );
}
