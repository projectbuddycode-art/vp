import { PhoneConsultationForm } from "@/components/forms/PhoneConsultationForm";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { getSettings } from "@/lib/data/public";
import { getCopy } from "@/lib/i18n/get-locale";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Phone consultation",
  description: "A phone consultation with Mr. Sanjeev Jain is ₹1,000. ₹250 confirms the request. ₹750 remains. Choose money or health.",
  path: "/phone-consultation",
  image: images.modernHome.src,
});

export default async function PhoneConsultationPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string }>;
}) {
  const params = await searchParams;
  const [copy, settings] = await Promise.all([getCopy(), getSettings()]);
  const subject = params.subject === "health" || params.subject === "money" ? params.subject : "";
  return (
    <>
      <PageHero
        eyebrow={copy.phone.eyebrow}
        title={copy.phone.title}
        text={copy.phone.text}
        crumbs={[
          { href: "/", label: copy.common.home },
          { href: "/phone-consultation", label: copy.phone.eyebrow },
        ]}
        image={images.modernHome}
      />
      <section className="bg-ivory py-16 sm:py-20">
        <Container className="max-w-3xl">
          <PhoneConsultationForm initialSubject={subject} whatsappNumber={settings.whatsapp} />
        </Container>
      </section>
    </>
  );
}
