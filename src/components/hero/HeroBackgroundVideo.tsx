"use client";

/**
 * Locked homepage background film.
 * Desktop (≥768px): original 16:9 source, crop, and presentation — do not change.
 * Mobile (≤767px): dedicated 9:16 source covering the hero viewport.
 * Other site films use CinematicVideo; this component is intentionally separate.
 */

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { videos } from "@/lib/videos";
import { cn } from "@/lib/utils";

const MOBILE_VIEWPORT = "(max-width: 767px)";

export function HeroBackgroundVideo({ className }: { className?: string }) {
  const video = videos.hero;
  const labelId = useId();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [reduced, setReduced] = useState(false);
  /** null until matchMedia runs — avoids downloading the wrong film. */
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  const activeSrc =
    isMobile === null ? null : isMobile ? video.mobileSrc || video.src || null : video.src || null;
  const allowVideo = Boolean(activeSrc) && !reduced;

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const viewport = window.matchMedia(MOBILE_VIEWPORT);

    const applyMotion = () => setReduced(motion.matches);
    const applyViewport = () => setIsMobile(viewport.matches);

    applyMotion();
    applyViewport();
    motion.addEventListener("change", applyMotion);
    viewport.addEventListener("change", applyViewport);
    return () => {
      motion.removeEventListener("change", applyMotion);
      viewport.removeEventListener("change", applyViewport);
    };
  }, []);

  useEffect(() => {
    const node = videoRef.current;
    if (!node || !activeSrc || reduced) return;

    setFailed(false);
    const current = node.dataset.activeSrc;
    if (current === activeSrc && node.error == null) {
      if (document.visibilityState === "visible" && node.paused) {
        void node.play().catch(() => undefined);
      }
      return;
    }

    node.dataset.activeSrc = activeSrc;
    node.pause();
    // Poster underneath prevents a black frame while the next film loads.
    node.src = activeSrc;
    node.load();
    void node.play().catch(() => undefined);
  }, [activeSrc, reduced]);

  useEffect(() => {
    const node = videoRef.current;
    if (!node || !allowVideo || failed) return;

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
  }, [allowVideo, activeSrc, failed]);

  const desktopFrame = "video-frame absolute top-0 left-0 h-[132%] w-full object-cover object-top";
  const mobileFrame = "absolute inset-0 h-full w-full object-cover object-center";
  const frameClass = isMobile ? mobileFrame : desktopFrame;
  const posterClass = isMobile ? "object-cover object-center" : "object-cover object-top";
  const videoVisible = allowVideo && !failed;

  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-charcoal", className)}>
      <p id={labelId} className="sr-only">
        {video.title}
      </p>
      <div
        className={cn("absolute", isMobile ? "inset-0" : "top-0 left-0 h-[132%] w-full")}
        aria-hidden={videoVisible}
      >
        <Image
          src={video.poster}
          alt={videoVisible ? "" : video.posterAlt}
          fill
          priority
          className={posterClass}
          sizes="100vw"
        />
      </div>
      {allowVideo ? (
        <video
          key={activeSrc || "hero"}
          ref={videoRef}
          className={cn(frameClass, videoVisible ? "opacity-100" : "opacity-0")}
          muted
          playsInline
          autoPlay
          loop
          preload="auto"
          aria-labelledby={labelId}
          onError={() => setFailed(true)}
          onLoadedData={() => setFailed(false)}
        />
      ) : null}
    </div>
  );
}
