"use client";

import { usePageBodies } from "@/components/i18n/LocaleProvider";

const elementMeta = [
  { term: "पृथ्वी", path: "M12 34 L24 10 L36 34 Z" },
  { term: "जल", path: "M12 28c4-8 8-8 12 0s8 8 12 0" },
  { term: "अग्नि", path: "M24 10c2 6-4 8-2 14 6-2 10 4 2 14-10-6-14-8-8-16 2 2 6 0 8-12z" },
  { term: "वायु", path: "M10 20h22M14 28h18" },
  { term: "आकाश", path: "M24 12a12 12 0 1 1 0 24a8 8 0 1 0 0-16" },
] as const;

export function FiveElements() {
  const bodies = usePageBodies();
  const elements = elementMeta.map((meta, index) => ({
    ...meta,
    name: bodies.elements[index]?.name ?? "",
    meaning: bodies.elements[index]?.meaning ?? "",
  }));

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {elements.map((element, index) => (
        <li key={element.term} className="element-mark border border-deep/10 bg-white p-4" style={{ animationDelay: `${index * 0.12}s` }}>
          <svg viewBox="0 0 48 48" className="h-12 w-12 text-gold" aria-hidden>
            <rect x="4" y="4" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <path d={element.path} fill="none" stroke="#211B17" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <p className="devanagari mt-3 text-xl">{element.term}</p>
          <p className="font-serif text-2xl">{element.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-deep/75">{element.meaning}</p>
        </li>
      ))}
    </ul>
  );
}
