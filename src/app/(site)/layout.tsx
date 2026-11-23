import { Suspense } from "react";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileBookBar } from "@/components/layout/MobileBookBar";
import { getSettings } from "@/lib/data/public";
import { getLocale } from "@/lib/i18n/get-locale";

async function SiteFooter() {
  const settings = await getSettings();
  return <Footer settings={settings} />;
}

async function SiteChrome({ children }: { children: React.ReactNode }) {
  // Locale only — do not await settings before streaming the hero film.
  const locale = await getLocale();
  return (
    <LocaleProvider locale={locale}>
      <ScrollProgress />
      <Header />
      <main id="content" className="pb-20 sm:pb-0">
        {children}
      </main>
      <Suspense fallback={null}>
        <SiteFooter />
      </Suspense>
      <MobileBookBar />
    </LocaleProvider>
  );
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<main id="content" className="min-h-screen bg-ivory px-6 py-24" />}>
      <SiteChrome>{children}</SiteChrome>
    </Suspense>
  );
}
