const elements = [
  {
    term: "पृथ्वी",
    name: "Earth",
    meaning: "The ground, the structure, and the weight of a building.",
    path: "M12 34 L24 10 L36 34 Z",
  },
  {
    term: "जल",
    name: "Water",
    meaning: "Water in and around a property, including how it is placed.",
    path: "M12 28c4-8 8-8 12 0s8 8 12 0",
  },
  {
    term: "अग्नि",
    name: "Fire",
    meaning: "Heat, the kitchen, and the brighter parts of a plan.",
    path: "M24 10c2 6-4 8-2 14 6-2 10 4 2 14-10-6-14-8-8-16 2 2 6 0 8-12z",
  },
  {
    term: "वायु",
    name: "Air",
    meaning: "Movement of air, openings, and how a room breathes.",
    path: "M10 20h22M14 28h18",
  },
  {
    term: "आकाश",
    name: "Space",
    meaning: "The open centre and the room a person can move through.",
    path: "M24 12a12 12 0 1 1 0 24a8 8 0 1 0 0-16",
  },
] as const;

export function FiveElements() {
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
