"use client";

/**
 * Locked homepage background film.
 * Do not change placement, crop, playback, or presentation without explicit approval.
 * Other site films use CinematicVideo; this component is intentionally separate.
 */

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { videos } from "@/lib/videos";
import { cn } from "@/lib/utils";

export function HeroBackgroundVideo({ className }: { className?: string }) {
  const video = videos.hero;
  const labelId = useId();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [reduced, setReduced] = useState(false);
  const canPlay = Boolean(video.src) && !failed && !reduced;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const node = videoRef.current;
    if (!node || !canPlay) return;

    const ensurePlaying = () => {
      if (document.visibilityState !== "visible") return;
      if (node.ended) node.currentTime = 0;
      if (node.paused) void node.play().catch(() => undefined);
    };

    ensurePlaying();
    node.addEventListener("loadeddata", ensurePlaying);
    node.addEventListener("canplay", ensurePlaying);
    document.addEventListener("visibilitychange", ensurePlaying);

    return () => {
      node.removeEventListener("loadeddata", ensurePlaying);
      node.removeEventListener("canplay", ensurePlaying);
      document.removeEventListener("visibilitychange", ensurePlaying);
    };
  }, [canPlay]);

  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-charcoal", className)}>
      <p id={labelId} className="sr-only">
        {video.title}
      </p>
      {canPlay ? (
        <video
          ref={videoRef}
          className="video-frame absolute top-0 left-0 h-[132%] w-full object-cover object-top"
          muted
          playsInline
          autoPlay
          loop
          preload="auto"
          aria-labelledby={labelId}
          onError={() => setFailed(true)}
        >
          {video.mobileSrc ? <source src={video.mobileSrc} media="(max-width: 767px)" type="video/mp4" /> : null}
          {video.src ? <source src={video.src} type="video/mp4" /> : null}
        </video>
      ) : (
        <div className="absolute top-0 left-0 h-[132%] w-full">
          <Image
            src={video.poster}
            alt={video.posterAlt}
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
        </div>
      )}
    </div>
  );
}
