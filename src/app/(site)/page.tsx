import { Suspense } from "react";
import { Hero } from "@/components/hero/Hero";
import { HeroFilmPreload } from "@/components/hero/HeroFilmPreload";
import { HomeBelowFold } from "@/components/home/HomeBelowFold";
import { getFaqs, getSettings } from "@/lib/data/public";
import { siteUrl } from "@/lib/utils";

async function HomeJsonLd() {
  const [settings, faqs] = await Promise.all([getSettings(), getFaqs()]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Sanjeev Jain",
        jobTitle: "Vastu Shastra consultant",
        description:
          "Vastu Shastra consultant with a professional background in the diamond industry. He practises from inherited knowledge, refined through property visits.",
        url: siteUrl(),
        image: `${siteUrl()}/images/founder/sanjeev-jain.jpg`,
      },
      {
        "@type": "ProfessionalService",
        name: "STHAPATYA",
        alternateName: "Sanjeev Jain Vastu Shastra consultancy",
        description:
          "STHAPATYA is the personal Vastu Shastra consultancy of Mr. Sanjeev Jain. Each property is studied on site. A visit is ₹10,000. Outcomes are not guaranteed.",
        url: siteUrl(),
        image: `${siteUrl()}/images/hero-sandstone.jpg`,
        priceRange: `INR ${settings.consultationFee}`,
        founder: { "@type": "Person", name: "Sanjeev Jain" },
        areaServed: settings.serviceAreas || undefined,
        telephone: settings.phone || undefined,
        email: settings.email || undefined,
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  );
}

export default function HomePage() {
  return (
    <>
      <HeroFilmPreload />
      <Suspense fallback={null}>
        <HomeJsonLd />
      </Suspense>
      <Hero />
      <Suspense fallback={null}>
        <HomeBelowFold />
      </Suspense>
    </>
  );
}
