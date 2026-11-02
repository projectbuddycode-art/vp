"use client";

import Image from "next/image";
import Link from "next/link";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { useOnceInView } from "@/components/animations/useOnceInView";
import { VastuDiagram } from "@/components/diagrams/VastuDiagram";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { images, resolvePortrait, studyCaption } from "@/lib/images";
import type { Article } from "@/lib/content/articles";
import type { CaseStudy } from "@/lib/data/public";
import { caseCategories, type SiteSettings } from "@/lib/site";
import { formatInr } from "@/lib/utils";

const areas = [
  {
    href: "/expertise/residential-vastu",
    title: "Home and Living Spaces",
    text: "Houses, flats, and plots. The visit looks at how your family actually uses the place.",
    image: images.residence,
  },
  {
    href: "/expertise/business-vastu",
    title: "Business and Workplace",
    text: "Offices, shops, and other workplaces. Guidance is about the rooms, not a promise of profit.",
    image: images.commercial,
  },
  {
    href: "/expertise/financial-professional-guidance",
    title: "Financial and Professional Concerns",
    text: "People often ask about the rooms where work and money decisions happen. This is spatial guidance, not financial advice.",
    image: images.modernHome,
  },
  {
    href: "/expertise/health-wellbeing",
    title: "Health and Wellbeing Concerns",
    text: "Some people want a calmer home while they look after their health. The visit does not treat illness.",
    image: images.courtyard,
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
          <p className="font-serif text-xl italic text-bark">Meet Sanjeev Jain</p>
          <h2 className="mt-3 font-serif text-[clamp(2.5rem,4.4vw,4.4rem)] leading-[0.98] font-medium tracking-[-0.03em]">
            Mr. Sanjeev Jain
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-deep/80">
            {settings.founderSummary ? (
              settings.founderSummary.split("\n").filter(Boolean).map((paragraph) => <p key={paragraph}>{paragraph}</p>)
            ) : (
              <>
                <p>
                  Mr. Sanjeev Jain spent his working life in the diamond industry. Alongside that work, he practises Vastu from knowledge he inherited.
                </p>
                <p>
                  He has refined that knowledge through his own study and by visiting properties in person. He does not use one fixed chart for every building.
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
          <p className="font-serif text-xl italic text-bark">The approach</p>
          <h2 className="mt-3 font-serif text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.98] font-medium tracking-[-0.03em]">
            A personal approach to Vastu.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-deep/80">
            <p>
              Vastu is a traditional way of looking at a building. It asks where the rooms sit, which way the entrance faces, and what is around the property.
            </p>
            <p>
              Mr. Sanjeev Jain studies those things on the property itself. A drawing on a website cannot tell you what your home needs.
            </p>
            <p>
              The square below is a simple Vastu diagram. The centre and the edges give a shared language for a plan. It is not a diagnosis.
            </p>
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
        <div className="mt-14 space-y-16">
          {areas.map((area, index) => (
            <Link key={area.href} href={area.href} className="group grid items-center gap-6 lg:grid-cols-2 lg:gap-14">
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative aspect-[16/10] bg-ivory">
                  <Image src={area.image.src} alt={area.image.alt} fill className="object-cover" sizes="(min-width: 1024px) 46vw, 100vw" />
                </div>
                <p className="mt-2 text-xs text-bark">{studyCaption}</p>
              </div>
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <p className="font-serif text-2xl text-gold">0{index + 1}</p>
                <h3 className="mt-2 font-serif text-4xl leading-tight group-hover:text-bark sm:text-5xl">{area.title}</h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-deep/75">{area.text}</p>
              </div>
            </Link>
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
            Personal on-site consultation
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
      <div>
        <div className="relative min-h-[52vw] lg:min-h-full">
          <Image src={images.palace.src} alt={images.palace.alt} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
        <p className="bg-deep px-5 py-3 text-xs text-sand sm:px-8">{studyCaption}</p>
      </div>
    </section>
  );
}
