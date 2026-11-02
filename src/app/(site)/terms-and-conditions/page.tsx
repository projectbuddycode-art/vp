import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { disclaimer } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Terms and Conditions",
  description: "Terms for enquiring about and receiving a Vastu consultation.",
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Terms"
        title="The terms of a consultation enquiry."
        text="These terms describe the website and the consultation offer. Have them reviewed for your jurisdiction before relying on them."
        image={images.carving}
      />
      <Container className="max-w-3xl space-y-5 py-16 text-base leading-relaxed text-deep/80">
        <p>
          Submitting the form is a request for the consultancy to consider a visit or an initial discussion. It does not by itself reserve a date. A consultation is confirmed only when the consultancy agrees a time with you.
        </p>
        <p>
          The published fee covers a one-time personal property visit. Travel charges, where a journey requires them, may be quoted separately. Remedy costs are independent of the fee, depend on the recommendations, and are not capped by a guaranteed maximum.
        </p>
        <p>{disclaimer}</p>
        <p>
          You are responsible for the accuracy of the details and files you send, and for having the right to share photographs and drawings of the property. Structural, medical, financial, and legal decisions remain with the professionals qualified to make them.
        </p>
        <p>
          Website content, including the knowledge centre, is general explanation. It is not a consultation and not a reading of any particular property.
        </p>
      </Container>
    </>
  );
}
