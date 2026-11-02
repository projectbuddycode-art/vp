import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How consultation enquiries and website data are handled.",
  path: "/privacy-policy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="How enquiry information is kept."
        text="This policy describes the consultancy website. It should be reviewed by a legal adviser before it is treated as formal advice."
        image={images.geometry}
      />
      <Container className="max-w-3xl space-y-5 py-16 text-base leading-relaxed text-deep/80">
        <p>
          The enquiry form collects your name, mobile number, email, city, property type, consultation category, preferred mode and date, a description of the property, your concern, and any floor plans or photographs you choose to attach. Privacy consent is required. Marketing consent is separate and optional.
        </p>
        <p>
          Enquiries are stored in a private Supabase project so the consultancy can respond, schedule a visit, and keep notes. Property files are kept in a private storage bucket. They are not published on the website. Case studies and testimonials are published only after a separate decision to do so.
        </p>
        <p>
          A shortened hash of the network address may be stored with the consent record. The raw address is not kept in the enquiry. Access to client records is limited to authorised administrators.
        </p>
        <p>
          If email delivery is configured, an acknowledgement may be sent to the address you provide, and a notice may be sent to the consultancy. WhatsApp is offered as a link you can choose to open. The website does not send promotional WhatsApp messages.
        </p>
        <p>
          You may ask for a correction or deletion of an enquiry by contacting the consultancy through a published phone number or email address. Those contact details are added from the studio desk when they are ready.
        </p>
      </Container>
    </>
  );
}
