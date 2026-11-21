import { BookingConfirmation } from "@/components/booking/BookingConfirmation";
import { Container } from "@/components/ui/Container";
import { getSettings } from "@/lib/data/public";
import { getCopy } from "@/lib/i18n/get-locale";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Booking confirmation",
  description: "Your STHAPATYA consultation request confirmation.",
  path: "/booking/confirmation",
  noIndex: true,
});

export default async function BookingConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const params = await searchParams;
  const [settings, copy] = await Promise.all([getSettings(), getCopy()]);
  const bookingCode = String(params.ref || "").trim();
  return (
    <section className="bg-ivory py-20 sm:py-28">
      <Container className="max-w-3xl">
        {bookingCode ? (
          <BookingConfirmation bookingCode={bookingCode} whatsappNumber={settings.whatsapp} />
        ) : (
          <p className="text-sm text-bark">{copy.common.notFoundText}</p>
        )}
      </Container>
    </section>
  );
}
