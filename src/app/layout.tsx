import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Noto_Serif_Devanagari } from "next/font/google";
import { MotionProvider } from "@/components/animations/MotionProvider";
import { siteUrl } from "@/lib/utils";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const devanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600"],
  variable: "--font-devanagari",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "Vastu consultant · Sanjeev Jain",
    template: "%s · Sanjeev Jain",
  },
  description:
    "Mr. Sanjeev Jain is a Vastu Shastra consultant. He visits a home or workplace, studies its layout and directions, and explains practical guidance in simple language. A personal visit is ₹10,000.",
  applicationName: "Sanjeev Jain Vedic Vastu Consultancy",
  authors: [{ name: "Sanjeev Jain" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Sanjeev Jain Vedic Vastu Consultancy",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${devanagari.variable} h-full antialiased`}>
      <body className="min-h-full bg-ivory font-sans text-deep">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-ivory focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
