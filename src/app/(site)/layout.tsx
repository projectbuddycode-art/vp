import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileBookBar } from "@/components/layout/MobileBookBar";
import { getSettings } from "@/lib/data/public";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="content" className="pb-20 sm:pb-0">{children}</main>
      <Footer settings={settings} />
      <MobileBookBar />
    </>
  );
}
