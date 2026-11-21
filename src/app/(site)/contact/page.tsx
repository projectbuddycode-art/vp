import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { WhatsAppButton } from "@/components/contact/WhatsAppButton";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { getSettings } from "@/lib/data/public";
import { getCopy } from "@/lib/i18n/get-locale";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { visitFees } from "@/lib/payments/fees";
import { formatInr } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Book a Vastu visit",
  description: "Book a personal Vastu consultation with Mr. Sanjeev Jain. The on-site visit is ₹10,000. Travel and remedies are discussed separately.",
  path: "/contact",
  image: images.carving.src,
});

export default async function ContactPage() {
  const [settings, copy] = await Promise.all([getSettings(), getCopy()]);
  const fees = visitFees(settings.consultationFee, settings.bookingToken);

  return (
    <>
      <PageHero
        eyebrow={copy.nav.contact}
        title={copy.home.formTitle}
        text={copy.home.formText}
        crumbs={[
          { href: "/", label: copy.common.home },
          { href: "/contact", label: copy.nav.contact },
        ]}
        image={images.carving}
      />
      <section className="bg-ivory py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-serif text-5xl text-terracotta">{formatInr(fees.total)}</p>
            <p className="mt-3 text-sm leading-relaxed text-deep/75">{copy.home.visitBy}</p>
            <p className="mt-4 text-sm leading-relaxed text-deep/75">
              {copy.visit.tokenLabel}: {formatInr(fees.token)}. {copy.visit.remainingLabel}: {formatInr(fees.remaining)}.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-deep/75">{settings.feeNote}</p>
            <p className="mt-4 text-sm leading-relaxed text-deep/75">{settings.bookingNote}</p>
            <dl className="mt-8 space-y-3 text-sm">
              <div>
                <dt className="text-[0.68rem] tracking-[0.16em] text-gold uppercase">{copy.footer.phone}</dt>
                <dd>{settings.phone || "—"}</dd>
              </div>
              <div>
                <dt className="text-[0.68rem] tracking-[0.16em] text-gold uppercase">Email</dt>
                <dd>{settings.email || "—"}</dd>
              </div>
              <div>
                <dt className="text-[0.68rem] tracking-[0.16em] text-gold uppercase">{copy.whatsapp.label}</dt>
                <dd className="mt-2">
                  <WhatsAppButton number={settings.whatsapp} message={copy.footer.whatsappMessage} label={copy.whatsapp.enquire} variant="line" />
                </dd>
              </div>
            </dl>
          </div>
          <div className="border border-deep/10 bg-white p-5 sm:p-8">
            <ConsultationForm settings={settings} />
          </div>
        </Container>
      </section>
    </>
  );
}
