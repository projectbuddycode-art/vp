import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getSettings } from "@/lib/data/public";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="content">{children}</main>
      <Footer settings={settings} />
    </>
  );
}
