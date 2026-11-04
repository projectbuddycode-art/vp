"use client";

import Image from "next/image";
import Link from "next/link";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { useOnceInView } from "@/components/animations/useOnceInView";
import { VastuDiagram } from "@/components/diagrams/VastuDiagram";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { images, resolvePortrait, studyCaption } from "@/lib/images";
import { videos } from "@/lib/videos";
import { SanskritLabel } from "@/components/content/SanskritLabel";
import { ServiceVideoFeature } from "@/components/video/ServiceVideoFeature";
import { CinematicVideo } from "@/components/video/CinematicVideo";
import type { Article } from "@/lib/content/articles";
import type { CaseStudy } from "@/lib/data/public";
import { caseCategories, type SiteSettings } from "@/lib/site";
import { formatInr } from "@/lib/utils";

const areas = [
  {
    href: "/expertise/residential-vastu",
    category: "Residential Vastu",
    title: "Home and living spaces",
    text: "Understand the layout and surroundings of your home.",
    video: videos.residential,
    boundary: "Guidance is about the house. It is not a promise about family life or health.",
  },
  {
    href: "/expertise/business-vastu",
    category: "Commercial and business Vastu",
    title: "Business and workplace",
    text: "Study your business space with a thoughtful approach to Vastu.",
    video: videos.commercial,
    boundary: "This is not a forecast of profit, and it does not replace business or legal advice.",
  },
  {
    href: "/expertise/financial-professional-guidance",
    category: "Financial and professional concerns",
    title: "Work and money rooms",
    text: "Explore how your workspace and property are arranged.",
    video: videos.financial,
    boundary: "This is not financial advice, and it does not promise wealth or professional success.",
  },
  {
    href: "/expertise/health-wellbeing",
    category: "Health and wellbeing concerns",
    title: "A calmer living environment",
    text: "Look at the rooms you live in. This is not medical care.",
    video: videos.health,
    boundary: "The visit does not diagnose or treat illness, and it does not replace a doctor.",
  },
] as const;

const storyFields = [
  "The property or situation",
  "The concern shared",
  "What was studied",
  "Guidance suggested",
  "The client’s own feedback",
];

export function FounderStory({ settings }: { settings: SiteSettings }) {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <FounderPortrait url={settings.founderPortraitUrl} />
        <div>
          <SanskritLabel term="परंपरा" reading="Knowledge through tradition" meaning="A tradition carried forward, then used with care on each property." />
          <h2 className="mt-3 font-serif text-[clamp(2.5rem,4.4vw,4.4rem)] leading-[0.98] font-medium tracking-[-0.03em]">
            Mr. Sanjeev Jain
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-deep/80">
            {settings.founderSummary ? (
              settings.founderSummary.split("\n").filter(Boolean).map((paragraph) => <p key={paragraph}>{paragraph}</p>)
            ) : (
              <>
                <p>
                  Mr. Sanjeev Jain worked in the diamond industry. Alongside that work, he practises Vastu Shastra from knowledge passed to him, which he has refined by visiting properties himself.
                </p>
                <p>
                  He does not use one fixed chart for every building. The guidance follows the property he has seen.
                </p>
                <p>
                  He looks at the layout, the directions, and the way the place is used. Only then does he suggest practical guidance for that property.
                </p>
                <p className="text-sm text-bark">
                  Qualifications, awards, and years of practice are not listed here. They will be added only if he chooses to publish them.
                </p>
              </>
            )}
          </div>
          <div className="mt-8">
            <Button href="/contact">Book a Visit</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

function FounderPortrait({ url }: { url?: string }) {
  const { ref, seen } = useOnceInView<HTMLDivElement>(0.3);
  return (
    <figure>
      <div ref={ref} className={`portrait-reveal relative aspect-[3/2] bg-parchment ${seen ? "is-in" : ""}`}>
        <Image
          src={resolvePortrait(url)}
          alt={images.founder.alt}
          fill
          className="object-cover object-center"
          sizes="(min-width: 1024px) 46vw, 100vw"
        />
      </div>
      <figcaption className="mt-3 text-sm text-bark">Mr. Sanjeev Jain, in his study. The photograph is shown without retouching his face.</figcaption>
    </figure>
  );
}

export function Philosophy() {
  return (
    <section className="bg-ivory py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SanskritLabel term="दिशा एवं संतुलन" reading="Directions and balance" meaning="Direction means which way a room faces. Balance means the parts of the plan sit together in a thoughtful way." />
          <h2 className="mt-3 font-serif text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.98] font-medium tracking-[-0.03em]">
            How a property is studied.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-deep/80">
            <p>
              Vastu Shastra looks at where the rooms sit, which way the entrance faces, and what is around the property. These are traditional ideas. Mr. Sanjeev Jain applies them only after he has seen the place.
            </p>
            <p>
              <span className="devanagari">प्रकृति</span> means nature: the light, air and setting around the building. <span className="devanagari">संतुलन</span> means balance: a thoughtful arrangement of the plan. A drawing on this website cannot tell you what your home needs.
            </p>
            <p>
              The square below is a simple Vastu diagram. The centre and the edges give a shared language for a plan. It is not a reading of your home.
            </p>
            <div>
              <p className="text-sm text-bark">
                <span className="devanagari">पंचमहाभूत</span> · the five elements: earth, water, fire, air and space. They belong to the wider Indian tradition behind Vastu. They are not a diagnosis.
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {[
                  ["पृथ्वी", "Earth"],
                  ["जल", "Water"],
                  ["अग्नि", "Fire"],
                  ["वायु", "Air"],
                  ["आकाश", "Space"],
                ].map(([term, name], index) => (
                  <li key={term} className="element-mark border border-deep/10 bg-white px-3 py-2 text-sm" style={{ animationDelay: `${index * 0.18}s` }}>
                    <span className="devanagari">{term}</span> {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <VastuDiagram />
      </Container>
    </section>
  );
}

export function GuidanceAreas() {
  return (
    <section className="bg-parchment py-20 sm:py-28">
      <Container>
        <div className="max-w-3xl">
          <p className="font-serif text-xl italic text-bark">Areas of guidance</p>
          <h2 className="mt-3 font-serif text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.98] font-medium tracking-[-0.03em]">
            Every property has its own story.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-deep/80 sm:text-lg">
            People come with different questions. These are areas of consultation. They are not guaranteed results.
          </p>
        </div>
        <div className="mt-14 space-y-20">
          {areas.map((area, index) => (
            <ServiceVideoFeature
              key={area.href}
              category={area.category}
              title={area.title}
              description={area.text}
              href={area.href}
              video={area.video}
              reverse={index % 2 === 1}
              boundary={area.boundary}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export function CaseStories({ studies }: { studies: CaseStudy[] }) {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <p className="font-serif text-xl italic text-bark">Case studies</p>
        <h2 className="mt-3 max-w-3xl font-serif text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.98] font-medium tracking-[-0.03em]">
          Real stories, only when a client agrees.
        </h2>
        {studies.length === 0 ? (
          <div className="mt-12">
            <p className="max-w-2xl text-base leading-relaxed text-deep/75">
              No client story is published yet. When one is added, it will use the client’s own words and only photographs they have approved. Nothing on this page is invented.
            </p>
            <ol className="mt-10 grid gap-px bg-deep/10 sm:grid-cols-2 lg:grid-cols-5">
              {storyFields.map((field, index) => (
                <li key={field} className="bg-ivory px-5 py-6">
                  <p className="font-serif text-2xl text-gold">0{index + 1}</p>
                  <p className="mt-3 font-serif text-2xl leading-tight">{field}</p>
                  <p className="mt-3 text-sm text-bark">Waiting for a verified account.</p>
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {studies.slice(0, 3).map((study) => (
              <Link key={study.id} href={`/case-studies/${study.slug}`} className="group">
                <div className="relative aspect-[4/3] bg-parchment">
                  {study.coverImageUrl ? (
                    <Image src={study.coverImageUrl} alt={study.coverImageAlt} fill className="object-cover" sizes="(min-width: 1280px) 30vw, 100vw" />
                  ) : null}
                </div>
                <p className="mt-4 text-sm text-bark">
                  {caseCategories.find((item) => item.value === study.category)?.label ?? study.category}
                </p>
                <h3 className="mt-1 font-serif text-3xl leading-tight group-hover:text-bark">{study.title}</h3>
              </Link>
            ))}
          </div>
        )}
        <div className="mt-10">
          <Button href="/case-studies" variant="line">
            View case studies
          </Button>
        </div>
      </Container>
    </section>
  );
}

export function KnowledgePreview({ articles }: { articles: Article[] }) {
  return (
    <section className="bg-ivory py-20 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-serif text-xl italic text-bark">Knowledge centre</p>
            <h2 className="mt-3 font-serif text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.98] font-medium tracking-[-0.03em]">
              Plain answers, before you book.
            </h2>
          </div>
          <Button href="/knowledge-centre" variant="line">
            Read the articles
          </Button>
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <Link key={article.slug} href={`/knowledge-centre/${article.slug}`} className="group">
              <div className="relative aspect-[4/3] bg-parchment">
                <Image src={article.image} alt={article.imageAlt} fill className="object-cover" sizes="(min-width: 1024px) 30vw, 100vw" />
              </div>
              <p className="mt-2 text-xs text-bark">{studyCaption}</p>
              <h3 className="mt-4 font-serif text-3xl leading-tight group-hover:text-bark">{article.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-deep/70">{article.excerpt}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function ConsultationBand({ settings }: { settings: SiteSettings }) {
  return (
    <section id="book" className="bg-white py-20 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <p className="font-serif text-xl italic text-bark">Consultation</p>
          <h2 className="mt-3 font-serif text-[clamp(2.3rem,4vw,3.8rem)] leading-[1] font-medium tracking-[-0.03em]">
            How much does a visit cost?
          </h2>
          <p className="mt-6 font-serif text-5xl text-deep">{formatInr(settings.consultationFee)}</p>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-deep/80">
            <p>The visit is personally conducted by Mr. Sanjeev Jain.</p>
            <p>Travel arrangements, and any travel cost, are confirmed separately. {settings.feeNote}</p>
            <p>
              Suggested remedies are separate from the consultation fee. The cost depends on the property and the work required.
            </p>
            <p>
              Many simpler remedies may cost around ₹5,000–₹6,000, or less. That is not a guaranteed maximum. Major structural changes may cost much more.
            </p>
            <p>{settings.bookingNote}</p>
          </div>
        </div>
        <div className="border border-deep/10 bg-ivory p-5 sm:p-8">
          <h3 className="font-serif text-3xl">Start with a conversation.</h3>
          <p className="mt-2 mb-6 text-sm leading-relaxed text-bark">
            Tell us about the property. We will reply before a visit is confirmed.
          </p>
          <ConsultationForm settings={settings} />
        </div>
      </Container>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="grid bg-deep text-ivory lg:grid-cols-2">
      <div className="flex flex-col justify-end px-5 py-16 sm:px-8 lg:px-14 lg:py-24">
        <p className="font-serif text-xl italic text-sand">A next step</p>
        <h2 className="mt-4 max-w-xl font-serif text-[clamp(2.6rem,4.8vw,4.8rem)] leading-[0.98] font-medium tracking-[-0.03em]">
          Every Space Has a Story. Let’s Understand Yours.
        </h2>
        <div className="mt-8">
          <Button href="/contact" variant="light">
            Book Your Personal Consultation
          </Button>
        </div>
      </div>
      <div className="relative min-h-[52vw] lg:min-h-[28rem]">
        <CinematicVideo video={videos.finale} playInView className="absolute inset-0" sizes="(min-width: 1024px) 50vw, 100vw" />
        <p className="absolute right-0 bottom-0 left-0 bg-deep/80 px-5 py-3 text-xs text-sand sm:px-8">{studyCaption}</p>
      </div>
    </section>
  );
}
