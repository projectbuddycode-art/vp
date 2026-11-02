import { Suspense } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getSettings } from "@/lib/data/public";
import { pageMetadata } from "@/lib/seo";
import { whatsappHref } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Enquiry received",
  description: "Your consultation enquiry has been received.",
  path: "/contact/thank-you",
  noIndex: true,
});

async function ThankYou({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  const params = await searchParams;
  const settings = await getSettings();
  const reference = params.ref || "";
  const whatsapp = whatsappHref(
    settings.whatsapp,
    reference
      ? `Hello, I have sent a consultation enquiry. The reference is ${reference}.`
      : "Hello, I would like to enquire about a personal Vastu consultation.",
  );

  return (
    <Container className="max-w-3xl py-28">
      <p className="text-[0.72rem] tracking-[0.22em] text-gold uppercase">Enquiry</p>
      <h1 className="mt-4 font-serif text-5xl leading-tight sm:text-6xl">The conversation has a reference.</h1>
      {reference ? <p className="mt-6 font-serif text-3xl text-terracotta">{reference}</p> : null}
      <p className="mt-6 text-base leading-relaxed text-deep/75">
        If the private desk is connected, this reference is the one stored with your enquiry. Keep it for any follow-up. A visit is confirmed only after the consultancy contacts you.
      </p>
      <p className="mt-4 text-sm leading-relaxed text-deep/70">
        An acknowledgement email is sent when email delivery has been configured. Promotional WhatsApp messages are not sent from this form.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        {whatsapp ? (
          <a href={whatsapp} className="bg-deep px-5 py-3 text-[0.72rem] tracking-[0.16em] text-ivory uppercase">
            Continue on WhatsApp
          </a>
        ) : null}
        <Link href="/" className="border border-deep/20 px-5 py-3 text-[0.72rem] tracking-[0.16em] uppercase">
          Return home
        </Link>
      </div>
    </Container>
  );
}

export default function ThankYouPage({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  return (
    <Suspense fallback={<Container className="py-28">Preparing your confirmation…</Container>}>
      <ThankYou searchParams={searchParams} />
    </Suspense>
  );
}
