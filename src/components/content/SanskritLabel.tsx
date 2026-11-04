export function SanskritLabel({
  term,
  reading,
  meaning,
  light = false,
}: {
  term: string;
  reading: string;
  meaning: string;
  light?: boolean;
}) {
  return (
    <p className={light ? "text-sand" : "text-bark"}>
      <span className="devanagari text-xl text-inherit">{term}</span>
      <span className="mx-2 text-gold">·</span>
      <span className="font-serif text-xl italic">{reading}</span>
      <span className={`mt-1 block text-sm not-italic leading-relaxed ${light ? "text-sand/90" : "text-deep/70"}`}>{meaning}</span>
    </p>
  );
}
