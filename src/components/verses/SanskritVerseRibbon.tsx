import { verses, type SanskritVerse } from "@/lib/verses";

function VerseSet({ verse, hidden = false }: { verse: SanskritVerse; hidden?: boolean }) {
  return (
    <div className="verse-set" aria-hidden={hidden || undefined}>
      <p className="devanagari text-[1.15rem] leading-snug text-deep sm:text-[1.35rem]">{verse.sanskrit}</p>
      <span className="verse-ornament" aria-hidden>
        <svg viewBox="0 0 48 12" className="h-3 w-12">
          <path d="M1 6h16M31 6h16M24 1.5 27.2 6 24 10.5 20.8 6Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
        </svg>
      </span>
      <p className="text-[0.92rem] leading-relaxed text-bark">{verse.translation}</p>
      <p className="text-[0.72rem] leading-relaxed text-bark/80">{verse.source}</p>
    </div>
  );
}

export function SanskritVerseRibbon({
  index = 0,
  verse,
}: {
  index?: number;
  verse?: SanskritVerse;
}) {
  const item = verse ?? verses[index % verses.length];
  const reverse = index % 2 === 1;

  return (
    <section
      className="verse-ribbon"
      data-reverse={reverse ? "true" : "false"}
      aria-label={`${item.translation} Source: ${item.source}.`}
    >
      <div className="verse-marquee">
        <VerseSet verse={item} />
        <VerseSet verse={item} hidden />
      </div>
    </section>
  );
}
