import { Suspense } from "react";
import Link from "next/link";
import { WhatsAppButton } from "@/components/contact/WhatsAppButton";
import { Container } from "@/components/ui/Container";
import { getSettings } from "@/lib/data/public";
import { getCopy } from "@/lib/i18n/get-locale";
import { fill } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { publicWhatsappNumber } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Enquiry received",
  description: "Your consultation enquiry has been received.",
  path: "/contact/thank-you",
  noIndex: true,
});

async function ThankYou({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  const params = await searchParams;
  const [settings, copy] = await Promise.all([getSettings(), getCopy()]);
  const reference = params.ref || "";
  const message = reference
    ? fill(copy.confirm.whatsappBooking, {
        ref: reference,
        subject: copy.nav.contact,
        language: copy.languageLabel,
      })
    : copy.footer.whatsappMessage;

  return (
    <Container className="max-w-3xl py-28">
      <p className="text-[0.72rem] tracking-[0.22em] text-gold uppercase">{copy.nav.contact}</p>
      <h1 className="mt-4 font-serif text-5xl leading-tight sm:text-6xl">{copy.confirm.title}</h1>
      {reference ? <p className="mt-6 font-serif text-3xl text-terracotta">{reference}</p> : null}
      <p className="mt-6 text-base leading-relaxed text-deep/75">{copy.confirm.text}</p>
      <div className="mt-8 flex flex-wrap gap-4">
        <WhatsAppButton number={publicWhatsappNumber(settings.whatsapp, settings.phone)} message={message} label={copy.whatsapp.booking} />
        <Link href="/" className="border border-deep/20 px-5 py-3 text-sm">
          {copy.common.home}
        </Link>
      </div>
    </Container>
  );
}

export default function ThankYouPage({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  return (
    <Suspense fallback={<Container className="py-28">…</Container>}>
      <ThankYou searchParams={searchParams} />
    </Suspense>
  );
}
