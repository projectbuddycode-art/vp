import { Swastik } from "@/components/content/Swastik";
import type { SanskritVerse } from "@/lib/verses";

export function SanskritMantra({ verse }: { verse: SanskritVerse }) {
  return (
    <figure className="border border-deep/10 bg-parchment px-6 py-8 sm:px-10">
      <div className="flex items-start justify-between gap-6">
        <Swastik />
        <span className="mt-3 h-px flex-1 bg-gold/80" aria-hidden />
      </div>
      <p className="devanagari mt-6 text-2xl leading-relaxed text-deep sm:text-3xl">{verse.sanskrit}</p>
      <p className="mt-4 font-serif text-lg italic text-bark">{verse.transliteration}</p>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-deep/80">{verse.translation}</p>
      <figcaption className="mt-4 text-sm leading-relaxed text-bark">
        {verse.source}. {verse.context}
      </figcaption>
    </figure>
  );
}
