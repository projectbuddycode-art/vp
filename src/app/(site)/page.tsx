import { SanskritVerseRibbon } from "@/components/verses/SanskritVerseRibbon";
import {
  CaseStories,
  ConsultationBand,
  FinalCta,
  FounderStory,
  VastuIntro,
  GuidanceAreas,
  KnowledgePreview,
  Philosophy,
} from "@/components/home/HomeSections";
import { Journey } from "@/components/home/Journey";
import { FaqList } from "@/components/home/FaqList";
import { TestimonialCarousel } from "@/components/home/Testimonials";
import { Hero } from "@/components/hero/Hero";
import { getArticles, getCaseStudies, getFaqs, getSettings, getTestimonials } from "@/lib/data/public";
import { disclaimer } from "@/lib/site";
import { siteUrl } from "@/lib/utils";

export default async function HomePage() {
  const [settings, faqs, articles, studies, testimonials] = await Promise.all([
    getSettings(),
    getFaqs(),
    getArticles(),
    getCaseStudies(),
    getTestimonials(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Sanjeev Jain",
        jobTitle: "Vastu Shastra consultant",
        description:
          "Vastu Shastra consultant. He worked in the diamond industry and practises from inherited knowledge, refined through property visits.",
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
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <SanskritVerseRibbon index={0} />
      <VastuIntro />
      <FounderStory settings={settings} />
      <SanskritVerseRibbon index={1} />
      <Philosophy />
      <SanskritVerseRibbon index={2} />
      <Journey />
      <SanskritVerseRibbon index={3} />
      <GuidanceAreas />
      <SanskritVerseRibbon index={0} />
      <CaseStories studies={studies} />
      <SanskritVerseRibbon index={1} />
      <TestimonialCarousel items={testimonials} />
      <SanskritVerseRibbon index={2} />
      <KnowledgePreview articles={articles} />
      <SanskritVerseRibbon index={3} />
      <ConsultationBand settings={settings} />
      <FaqList faqs={faqs} />
      <FinalCta />
      <p className="sr-only">{disclaimer}</p>
    </>
  );
}
