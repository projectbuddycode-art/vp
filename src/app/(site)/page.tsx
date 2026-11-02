import { SanskritVerseRibbon } from "@/components/verses/SanskritVerseRibbon";
import {
  CaseStories,
  ConsultationBand,
  FinalCta,
  FounderStory,
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
    "@type": "ProfessionalService",
    name: `${settings.brandName} ${settings.practiceName}`,
    description: "Personal Vastu guidance. Mr. Sanjeev Jain studies each property before suggesting practical changes.",
    url: siteUrl(),
    image: `${siteUrl()}/images/hero-sandstone.jpg`,
    priceRange: `INR ${settings.consultationFee}`,
    founder: { "@type": "Person", name: settings.brandName },
    areaServed: settings.serviceAreas || undefined,
    telephone: settings.phone || undefined,
    email: settings.email || undefined,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero sanskrit={settings.heroSanskrit} translation={settings.heroTranslation} fee={settings.consultationFee} />
      <SanskritVerseRibbon index={0} />
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
