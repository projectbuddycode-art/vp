"use client";

import Image from "next/image";
import Link from "next/link";
import { GoldLine } from "@/components/animations/GoldLine";
import { Reveal } from "@/components/animations/Reveal";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { useOnceInView } from "@/components/animations/useOnceInView";
import { VastuDiagram } from "@/components/diagrams/VastuDiagram";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { images, resolvePortrait } from "@/lib/images";
import { videos } from "@/lib/videos";
import { SanskritLabel } from "@/components/content/SanskritLabel";
import { ServiceVideoFeature } from "@/components/video/ServiceVideoFeature";
import { CinematicVideo } from "@/components/video/CinematicVideo";
import type { Article } from "@/lib/content/articles";
import type { CaseStudy } from "@/lib/data/public";
import { WhatsAppButton } from "@/components/contact/WhatsAppButton";
import { useCopy } from "@/components/i18n/LocaleProvider";
import { fill } from "@/lib/i18n/dictionaries";
import { visitFees } from "@/lib/payments/fees";
import { caseCategories, type SiteSettings } from "@/lib/site";
import { formatInr, publicWhatsappNumber } from "@/lib/utils";

const areaVideos = [videos.residential, videos.entrance, videos.floorplan, videos.villa] as const;
const areaHrefs = [
  "/expertise/residential-vastu",
  "/expertise/business-vastu",
  "/expertise/financial-professional-guidance",
  "/expertise/health-wellbeing",
] as const;

export function VastuIntro() {
  const copy = useCopy();
  return (
    <section className="bg-ivory py-20 sm:py-28">
      <Container className="max-w-3xl">
        <Reveal>
          <SanskritLabel
            term="वास्तु परिचय"
            reading={copy.home.introEyebrow}
            meaning={copy.home.intro1}
          />
          <h2 className="mt-4 font-serif text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.98] font-medium tracking-[-0.03em]">
            {copy.home.introTitle}
          </h2>
          <div className="mt-6 space-y-4 text-base leading-[1.75] text-deep/80">
            <p>{copy.home.intro1}</p>
            <p>{copy.home.intro2}</p>
            <p>{copy.home.intro3}</p>
          </div>
          <div className="mt-8">
            <Button href="/understanding-vastu" variant="line">
              {copy.home.introCta}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export function FounderStory({ settings }: { settings: SiteSettings }) {
  const copy = useCopy();
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <FounderPortrait url={settings.founderPortraitUrl} caption={copy.home.founderCaption} />
        <div>
          <p className="text-[0.72rem] tracking-[0.22em] text-gold uppercase">{copy.home.founderEyebrow}</p>
          <h2 className="mt-3 font-serif text-[clamp(2.4rem,4.2vw,4.2rem)] leading-[0.98] font-medium tracking-[-0.03em]">
            {copy.home.founderTitle}
          </h2>
          <GoldLine className="mt-5 h-3 w-40 text-gold" />
          <div className="mt-6 space-y-4 text-base leading-relaxed text-deep/80">
            {settings.founderSummary ? (
              settings.founderSummary.split("\n").filter(Boolean).map((paragraph) => <p key={paragraph}>{paragraph}</p>)
            ) : (
              <>
                <p>{copy.home.founder1}</p>
                <p>{copy.home.founder2}</p>
                <p>{copy.home.founder3}</p>
                <p>{copy.home.founder4}</p>
                <p>{copy.home.founder5}</p>
              </>
            )}
            <p className="font-serif text-xl leading-snug text-deep italic">{copy.home.founderQuote}</p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact">{copy.bookVisit}</Button>
            <Button href="/about" variant="line">
              {copy.nav.about}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

function FounderPortrait({ url, caption }: { url?: string; caption: string }) {
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
        <svg viewBox="0 0 120 80" className="pointer-events-none absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] text-gold/80" aria-hidden>
          <path d="M2 16V2h14M104 2h14v14M118 64v14H104M16 78H2V64" fill="none" stroke="currentColor" strokeWidth="0.6" />
        </svg>
      </div>
      <figcaption className="mt-3 text-sm text-bark">{caption}</figcaption>
    </figure>
  );
}

export function Philosophy() {
  const copy = useCopy();
  const elements = [
    ["पृथ्वी", copy.home.earth],
    ["जल", copy.home.water],
    ["अग्नि", copy.home.fire],
    ["वायु", copy.home.air],
    ["आकाश", copy.home.space],
  ] as const;
  return (
    <section className="bg-ivory py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SanskritLabel term="दिशा एवं संतुलन" reading={copy.home.philosophyTitle} meaning={copy.home.philosophy1} />
          <h2 className="mt-3 font-serif text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.98] font-medium tracking-[-0.03em]">
            {copy.home.philosophyTitle}
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-deep/80">
            <p>{copy.home.philosophy1}</p>
            <p>{copy.home.philosophy2}</p>
            <p>{copy.home.philosophy3}</p>
            <div>
              <p className="text-sm text-bark">{copy.home.philosophyElements}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {elements.map(([term, name], index) => (
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

export function Specialisations({ whatsappNumber }: { whatsappNumber?: string }) {
  const copy = useCopy();
  const cards = [
    {
      title: copy.home.moneyTitle,
      text: copy.home.moneyText,
      points: copy.home.moneyPoints,
      href: "/phone-consultation?subject=money",
      cta: copy.bookMoney,
      whatsapp: copy.whatsapp.money,
    },
    {
      title: copy.home.healthTitle,
      text: copy.home.healthText,
      points: copy.home.healthPoints,
      href: "/phone-consultation?subject=health",
      cta: copy.bookHealth,
      whatsapp: copy.whatsapp.health,
    },
  ];
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <div className="max-w-3xl">
          <p className="text-[0.72rem] tracking-[0.22em] text-gold uppercase">{copy.home.focusEyebrow}</p>
          <h2 className="mt-3 font-serif text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.98] font-medium tracking-[-0.03em]">
            {copy.home.focusTitle}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-deep/80 sm:text-lg">{copy.home.focusText}</p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {cards.map((card) => (
            <article key={card.title} className="flex flex-col border border-deep/10 bg-ivory p-6 sm:p-8">
              <h3 className="font-serif text-4xl leading-tight">{card.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-deep/80">{card.text}</p>
              <ul className="mt-5 space-y-2 text-sm leading-relaxed text-deep/75">
                {card.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3">
                <WhatsAppButton number={whatsappNumber} message={card.whatsapp} label={copy.whatsapp.direct} className="w-full sm:w-auto" />
                <Button href={card.href} variant="line">
                  {card.cta}
                </Button>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-bark">{copy.home.disclaimer}</p>
      </Container>
    </section>
  );
}

export function GuidanceAreas() {
  const copy = useCopy();
  return (
    <section className="bg-parchment py-20 sm:py-28">
      <Container>
        <div className="max-w-3xl">
          <p className="font-serif text-xl italic text-bark">{copy.home.areasEyebrow}</p>
          <h2 className="mt-3 font-serif text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.98] font-medium tracking-[-0.03em]">
            {copy.home.areasTitle}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-deep/80 sm:text-lg">{copy.home.areasText}</p>
        </div>
        <div className="mt-14 space-y-20">
          {copy.home.areas.map((area, index) => (
            <ServiceVideoFeature
              key={areaHrefs[index]}
              category={area.category}
              title={area.title}
              description={area.text}
              href={areaHrefs[index]}
              cta={copy.home.explore}
              video={areaVideos[index]}
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
  const copy = useCopy();
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <p className="font-serif text-xl italic text-bark">{copy.home.studiesEyebrow}</p>
        <h2 className="mt-3 max-w-3xl font-serif text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.98] font-medium tracking-[-0.03em]">
          {copy.home.studiesTitle}
        </h2>
        {studies.length === 0 ? (
          <div className="mt-12">
            <p className="max-w-2xl text-base leading-relaxed text-deep/75">{copy.home.studiesEmpty}</p>
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
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/case-studies/understanding-a-modern-residence">{copy.home.readStudy}</Button>
          <Button href="/case-studies" variant="line">
            {copy.home.viewStudies}
          </Button>
        </div>
      </Container>
    </section>
  );
}

export function KnowledgePreview({ articles }: { articles: Article[] }) {
  const copy = useCopy();
  return (
    <section className="bg-ivory py-20 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-serif text-xl italic text-bark">{copy.home.knowledgeEyebrow}</p>
            <h2 className="mt-3 font-serif text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.98] font-medium tracking-[-0.03em]">
              {copy.home.knowledgeTitle}
            </h2>
          </div>
          <Button href="/knowledge-centre" variant="line">
            {copy.home.readArticles}
          </Button>
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          {articles.slice(0, 3).map((article, index) => {
            const film = [videos.entrance, videos.floorplan, videos.villa][index] ?? videos.villa;
            return (
              <article key={article.slug}>
                <CinematicVideo video={film} playInView className="aspect-[4/3]" sizes="(min-width: 1024px) 30vw, 100vw" />
                <p className="mt-2 text-xs text-bark">{copy.home.filmNote}</p>
                <h3 className="mt-4 font-serif text-3xl leading-tight">
                  <Link href={`/knowledge-centre/${article.slug}`} className="hover:text-bark">
                    {article.title}
                  </Link>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-deep/70">{article.excerpt}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export function ConsultationBand({ settings }: { settings: SiteSettings }) {
  const copy = useCopy();
  const fees = visitFees(settings.consultationFee, settings.bookingToken);
  return (
    <section id="book" className="bg-white py-20 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <p className="font-serif text-xl italic text-bark">{copy.home.consultEyebrow}</p>
          <h2 className="mt-3 font-serif text-[clamp(2.3rem,4vw,3.8rem)] leading-[1] font-medium tracking-[-0.03em]">
            {copy.home.consultTitle}
          </h2>
          <p className="mt-6 font-serif text-5xl text-deep">{formatInr(fees.total)}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <p>
              <span className="block text-xs text-bark">{copy.visit.totalLabel}</span>
              <span className="font-serif text-2xl">{formatInr(fees.total)}</span>
            </p>
            <p>
              <span className="block text-xs text-bark">{copy.visit.tokenLabel}</span>
              <span className="font-serif text-2xl">{formatInr(fees.token)}</span>
            </p>
            <p>
              <span className="block text-xs text-bark">{copy.visit.remainingLabel}</span>
              <span className="font-serif text-2xl">{formatInr(fees.remaining)}</span>
            </p>
          </div>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-deep/80">
            <p>{copy.home.visitBy}</p>
            <p>{fill(copy.home.tokenLine, { token: formatInr(fees.token), remaining: formatInr(fees.remaining) })}</p>
            <p>
              {copy.home.travelNote} {settings.feeNote}
            </p>
            <p>{copy.home.remedies}</p>
            <p>{copy.home.remedyRange}</p>
            <p>{settings.bookingNote}</p>
            <p className="text-sm text-bark">{copy.home.disclaimer}</p>
          </div>
          <div className="mt-8 flex flex-col gap-3">
            <WhatsAppButton
              number={publicWhatsappNumber(settings.whatsapp, settings.phone)}
              message={copy.footer.whatsappMessage}
              label={copy.whatsapp.direct}
              className="w-full sm:w-auto"
            />
            <Button href="/phone-consultation" variant="line">
              {copy.bookPhone}
            </Button>
          </div>
        </div>
        <div className="border border-deep/10 bg-ivory p-5 sm:p-8">
          <h3 className="font-serif text-3xl">{copy.home.formTitle}</h3>
          <p className="mt-2 mb-6 text-sm leading-relaxed text-bark">{copy.home.formText}</p>
          <ConsultationForm settings={settings} />
        </div>
      </Container>
    </section>
  );
}

export function FinalCta() {
  const copy = useCopy();
  return (
    <section className="grid bg-deep text-ivory lg:grid-cols-2">
      <div className="flex flex-col justify-end px-5 py-16 sm:px-8 lg:px-14 lg:py-24">
        <p className="font-serif text-xl italic text-sand">{copy.home.finalEyebrow}</p>
        <h2 className="mt-4 max-w-xl font-serif text-[clamp(2.6rem,4.8vw,4.8rem)] leading-[0.98] font-medium tracking-[-0.03em]">
          {copy.home.finalTitle}
        </h2>
        <div className="mt-8">
          <Button href="/contact" variant="light">
            {copy.bookPersonal}
          </Button>
        </div>
      </div>
      <div className="relative min-h-[52vw] lg:min-h-[28rem]">
        <CinematicVideo video={videos.finale} playInView className="absolute inset-0" sizes="(min-width: 1024px) 50vw, 100vw" />
        <p className="absolute right-0 bottom-0 left-0 bg-deep/80 px-5 py-3 text-xs text-sand sm:px-8">{copy.home.finalFilm}</p>
      </div>
    </section>
  );
}
