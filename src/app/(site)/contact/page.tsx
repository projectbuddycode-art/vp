import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { getSettings } from "@/lib/data/public";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { formatInr, whatsappHref } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Book a Vastu visit",
  description: "Book a personal Vastu consultation with Mr. Sanjeev Jain. The on-site visit is ₹10,000. Travel and remedies are discussed separately.",
  path: "/contact",
  image: images.carving.src,
});

export default async function ContactPage() {
  const settings = await getSettings();
  const whatsapp = whatsappHref(settings.whatsapp, "Hello, I would like to enquire about a personal Vastu consultation.");

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="How do I book Mr. Sanjeev Jain?"
        text="Send your name, phone number, city and a short note about the property. A visit is confirmed only after the consultancy replies. The on-site fee is shown beside the form."
        crumbs={[{ href: "/", label: "Home" }, { href: "/contact", label: "Contact" }]}
        image={images.carving}
      />
      <section className="bg-ivory py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-serif text-5xl text-terracotta">{formatInr(settings.consultationFee)}</p>
            <p className="mt-3 text-sm leading-relaxed text-deep/75">One-time personal property visit by Sanjeev Jain.</p>
            <p className="mt-4 text-sm leading-relaxed text-deep/75">{settings.feeNote}</p>
            <p className="mt-4 text-sm leading-relaxed text-deep/75">{settings.bookingNote}</p>
            <dl className="mt-8 space-y-3 text-sm">
              <div>
                <dt className="text-[0.68rem] tracking-[0.16em] uppercase text-gold">Phone</dt>
                <dd>{settings.phone || "To be published"}</dd>
              </div>
              <div>
                <dt className="text-[0.68rem] tracking-[0.16em] uppercase text-gold">Email</dt>
                <dd>{settings.email || "To be published"}</dd>
              </div>
              <div>
                <dt className="text-[0.68rem] tracking-[0.16em] uppercase text-gold">WhatsApp</dt>
                <dd>
                  {whatsapp ? (
                    <a href={whatsapp} className="underline">
                      Message on WhatsApp
                    </a>
                  ) : (
                    "To be published"
                  )}
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
