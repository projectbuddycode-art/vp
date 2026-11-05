import { cn } from "@/lib/utils";

export function BrandMark({
  className,
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  const ink = light ? "#F5F0E6" : "#211B17";
  return (
    <svg viewBox="0 0 48 48" className={cn("h-9 w-9", className)} aria-hidden>
      <rect x="3.5" y="3.5" width="41" height="41" fill="none" stroke={ink} strokeWidth="1.2" />
      <rect x="13.5" y="13.5" width="21" height="21" fill="none" stroke="#B68B50" strokeWidth="1" />
      <path d="M24 3.5v8M24 36.5v8M3.5 24h8M36.5 24h8" stroke={ink} strokeWidth="1" />
      <path d="M8 8l6 6M40 8l-6 6M8 40l6-6M40 40l-6-6" stroke="#B68B50" strokeWidth="0.8" />
      <circle cx="24" cy="24" r="1.7" fill="#B68B50" />
    </svg>
  );
}

export function BrandLockup({ light = false }: { light?: boolean }) {
  return (
    <span className="flex min-w-0 items-center gap-2.5">
      <BrandMark light={light} />
      <span className="min-w-0 leading-none">
        <span className="block font-serif text-[1.35rem] tracking-[0.14em] sm:text-[1.45rem]">STHAPATYA</span>
        <span className={cn("mt-1 block text-[0.68rem]", light ? "text-sand" : "text-bark")}>
          <span className="devanagari">स्थापत्य</span>
          <span className="mx-1">·</span>
          Sanjeev Jain
        </span>
      </span>
    </span>
  );
}
