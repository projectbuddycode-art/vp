import type { Metadata } from "next";
import { Suspense } from "react";
import { Cormorant_Garamond, Inter, Noto_Sans_Devanagari, Noto_Sans_Gujarati, Noto_Serif_Devanagari } from "next/font/google";
import { MotionProvider } from "@/components/animations/MotionProvider";
import { getCopy, getLocale } from "@/lib/i18n/get-locale";
import { localeMeta } from "@/lib/i18n/locale";
import { siteUrl } from "@/lib/utils";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const devanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600"],
  variable: "--font-devanagari",
  display: "swap",
});

const hindi = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hindi",
  display: "swap",
});

const gujarati = Noto_Sans_Gujarati({
  subsets: ["gujarati"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-gujarati",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "STHAPATYA · Sanjeev Jain",
    template: "%s · STHAPATYA",
  },
  description:
    "STHAPATYA is the Vastu Shastra consultancy of Mr. Sanjeev Jain. He visits a home or workplace, studies its layout and directions, and explains practical guidance. A personal visit is ₹10,000.",
  applicationName: "STHAPATYA",
  authors: [{ name: "Sanjeev Jain" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "STHAPATYA",
  },
  robots: { index: true, follow: true },
};

async function DocumentShell({ children }: { children: React.ReactNode }) {
  const [locale, copy] = await Promise.all([getLocale(), getCopy()]);
  return (
    <html lang={localeMeta[locale].html} className={`${serif.variable} ${sans.variable} ${devanagari.variable} ${hindi.variable} ${gujarati.variable} h-full antialiased`}>
      <body className="min-h-full bg-ivory font-sans text-deep">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-ivory focus:px-4 focus:py-2"
        >
          {copy.skip}
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <html lang="en" className={`${serif.variable} ${sans.variable} ${devanagari.variable} ${hindi.variable} ${gujarati.variable} h-full antialiased`}>
          <body className="min-h-full bg-ivory font-sans text-deep">
            <MotionProvider>{children}</MotionProvider>
          </body>
        </html>
      }
    >
      <DocumentShell>{children}</DocumentShell>
    </Suspense>
  );
}
