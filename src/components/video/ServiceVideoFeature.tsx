import { Button } from "@/components/ui/Button";
import { CinematicVideo } from "@/components/video/CinematicVideo";
import { studyCaption } from "@/lib/images";
import type { VideoSlot } from "@/lib/videos";
import { cn } from "@/lib/utils";

export function ServiceVideoFeature({
  category,
  title,
  description,
  href,
  cta = "Explore this service",
  video,
  reverse = false,
  boundary,
  variant = "feature",
}: {
  category: string;
  title: string;
  description: string;
  href?: string;
  cta?: string;
  video: VideoSlot;
  reverse?: boolean;
  boundary?: string;
  variant?: "feature" | "panel";
}) {
  if (variant === "panel") {
    return (
      <figure>
        <CinematicVideo
          video={video}
          playInView
          playOnHover
          className="aspect-[16/9]"
          sizes="(min-width: 1024px) 70vw, 100vw"
        />
        <figcaption className="mt-3 max-w-2xl text-base leading-relaxed text-deep/80">{description}</figcaption>
        <p className="mt-2 text-xs text-bark">{studyCaption} A filmed sequence will replace this still when it is ready.</p>
      </figure>
    );
  }

  return (
    <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
      <div className={cn(reverse && "lg:order-2")}>
        <CinematicVideo
          video={video}
          playInView
          playOnHover
          className="aspect-[16/10]"
          sizes="(min-width: 1024px) 48vw, 100vw"
        />
        <p className="mt-2 text-xs text-bark">{studyCaption}</p>
      </div>
      <div className={cn(reverse && "lg:order-1")}>
        <p className="font-serif text-xl italic text-bark">{category}</p>
        <h3 className="mt-2 font-serif text-4xl leading-tight sm:text-5xl">{title}</h3>
        <p className="mt-4 max-w-md text-base leading-relaxed text-deep/80">{description}</p>
        {boundary ? <p className="mt-4 max-w-md text-sm leading-relaxed text-bark">{boundary}</p> : null}
        {href ? (
          <div className="mt-6">
            <Button href={href} variant="line">
              {cta}
            </Button>
          </div>
        ) : null}
      </div>
    </article>
  );
}
