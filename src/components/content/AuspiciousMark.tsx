import { cn } from "@/lib/utils";

/**
 * Traditional Indian auspicious mark. Each arm turns clockwise.
 * It is drawn once and then stays still. It is not a spinner.
 */
export function AuspiciousMark({ className }: { className?: string }) {
  const arms = ["M50 50 V18 H68", "M50 50 H82 V68", "M50 50 V82 H32", "M50 50 H18 V32"];
  return (
    <svg viewBox="0 0 100 100" className={cn("auspicious-mark", className)} aria-hidden>
      {arms.map((d) => (
        <path key={d} className="auspicious-stroke" d={d} pathLength={1} fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="square" />
      ))}
    </svg>
  );
}
