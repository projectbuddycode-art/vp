import { SanskritVerseRibbon } from "@/components/verses/SanskritVerseRibbon";
import {
  ConsultationBand,
  FinalCta,
  FounderStory,
  VastuIntro,
  GuidanceAreas,
  KnowledgePreview,
  Philosophy,
  Specialisations,
} from "@/components/home/HomeSections";
import { Journey } from "@/components/home/Journey";
import { FaqList } from "@/components/home/FaqList";
import { TestimonialCarousel } from "@/components/home/Testimonials";
import { getArticles, getFaqs, getPublicReviews, getSettings } from "@/lib/data/public";
import { disclaimer } from "@/lib/site";
import { publicWhatsappNumber } from "@/lib/utils";

/** Data-backed homepage body — streamed after the hero so the film can start sooner. */
export async function HomeBelowFold() {
  const [settings, faqs, articles, reviews] = await Promise.all([
    getSettings(),
    getFaqs(),
    getArticles(),
    getPublicReviews(),
  ]);

  return (
    <>
      <SanskritVerseRibbon index={0} />
      <VastuIntro />
      <FounderStory settings={settings} />
      <SanskritVerseRibbon index={1} />
      <Philosophy />
      <Specialisations whatsappNumber={publicWhatsappNumber(settings.whatsapp, settings.phone)} />
      <SanskritVerseRibbon index={2} />
      <Journey />
      <SanskritVerseRibbon index={3} />
      <GuidanceAreas />
      <SanskritVerseRibbon index={0} />
      <TestimonialCarousel items={reviews} />
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
