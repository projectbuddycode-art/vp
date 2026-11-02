import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("font-serif text-xl italic text-bark", className)}>
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <Eyebrow className={light ? "text-sand" : undefined}>{eyebrow}</Eyebrow> : null}
      <h2
        className={cn(
          "font-serif text-[clamp(2.3rem,4.6vw,4.4rem)] leading-[0.96] font-medium tracking-[-0.03em]",
          eyebrow ? "mt-4" : "",
          light ? "text-ivory" : "text-deep",
        )}
      >
        {title}
      </h2>
      {text ? (
        <p className={cn("mt-6 max-w-2xl text-base leading-relaxed sm:text-lg", light ? "text-sand" : "text-deep/75")}>
          {text}
        </p>
      ) : null}
    </div>
  );
}
