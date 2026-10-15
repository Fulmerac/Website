import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { applyTarget } from "@/lib/apply";
import { site } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Independent Life Insurance Agent Careers — Secure Life Agency",
    template: "%s — Secure Life Agency",
  },
  description:
    "Secure Life Agency recruits independent, commission-based life insurance agents — whether you're new to the industry or already licensed.",
  openGraph: { siteName: site.name, type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={archivo.variable}>
      <body className="flex min-h-dvh flex-col bg-white">
        <a
          href="#main"
          className="sr-only z-50 rounded bg-white px-4 py-2 text-black focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader apply={applyTarget()} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: site.name,
              url: site.url,
              areaServed: "US",
              ...(site.contact.email ? { email: site.contact.email } : {}),
              ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
            }),
          }}
        />
      </body>
    </html>
  );
}
