import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import Providers from "@/components/site/Providers";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });

const description =
  "Engineering portfolio of Alexander Thompson — Electrical Engineering student at Northeastern University pursuing Bioengineering, with work in medical device design, robotics and embedded systems.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Engineering Portfolio`, template: `%s — ${site.name}` },
  description,
  keywords: ["biomedical engineering", "medical device design", "robotics", "embedded systems", "Northeastern University", "engineering portfolio"],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    title: `${site.name} — Engineering Portfolio`,
    description,
    siteName: site.name,
  },
  twitter: { card: "summary_large_image", title: `${site.name} — Engineering Portfolio`, description },
};

export const viewport: Viewport = { themeColor: "#07111F", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-signal focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <Providers>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
