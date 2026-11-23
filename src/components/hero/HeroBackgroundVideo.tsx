"use client";

/**
 * Locked homepage background film.
 * Desktop / laptop: original 16:9 source, crop, and presentation — do not change.
 * Phone: dedicated 9:16 source covering the hero viewport — never fall back to 16:9.
 * Other site films use CinematicVideo; this component is intentionally separate.
 */

import Image from "next/image";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { videos } from "@/lib/videos";
import { cn } from "@/lib/utils";

const MOBILE_VIEWPORT = "(max-width: 767px)";

/** Prefer viewport width; also catch phones that request a desktop site. */
function resolveIsPhone() {
  if (typeof window === "undefined") return false;

  const narrowViewport =
    window.matchMedia(MOBILE_VIEWPORT).matches || window.innerWidth <= 767;

  const shortSide = Math.min(window.screen.width, window.screen.height);
  const phoneHardware =
    shortSide > 0 &&
    shortSide <= 520 &&
    window.matchMedia("(hover: none)").matches &&
    window.matchMedia("(pointer: coarse)").matches;

  return narrowViewport || phoneHardware;
}

export function HeroBackgroundVideo({ className }: { className?: string }) {
  const video = videos.hero;
  const labelId = useId();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [reduced, setReduced] = useState(false);
  /** null until layout effect — avoids downloading the wrong film. */
  const [isPhone, setIsPhone] = useState<boolean | null>(null);

  const desktopSrc = video.src || null;
  const phoneSrc = video.mobileSrc || null;
  // On phones never fall back to the 16:9 film.
  const activeSrc = isPhone === null ? null : isPhone ? phoneSrc : desktopSrc;
  const allowVideo = Boolean(activeSrc) && !reduced;

  useLayoutEffect(() => {
    const apply = () => setIsPhone(resolveIsPhone());
    apply();

    const viewport = window.matchMedia(MOBILE_VIEWPORT);
    viewport.addEventListener("change", apply);
    window.addEventListener("resize", apply);
    window.addEventListener("orientationchange", apply);

    return () => {
      viewport.removeEventListener("change", apply);
      window.removeEventListener("resize", apply);
      window.removeEventListener("orientationchange", apply);
    };
  }, []);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyMotion = () => setReduced(motion.matches);
    applyMotion();
    motion.addEventListener("change", applyMotion);
    return () => motion.removeEventListener("change", applyMotion);
  }, []);

  useEffect(() => {
    const node = videoRef.current;
    if (!node || !activeSrc || reduced) return;

    setFailed(false);

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
  }, [activeSrc, reduced]);

  const desktopFrame = "video-frame absolute top-0 left-0 h-[132%] w-full object-cover object-top";
  const mobileFrame = "absolute inset-0 h-full w-full object-cover object-center";
  const frameClass = isPhone ? mobileFrame : desktopFrame;
  const posterClass = isPhone ? "object-cover object-center" : "object-cover object-top";
  const videoVisible = allowVideo && !failed;

  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-charcoal", className)}>
      <p id={labelId} className="sr-only">
        {video.title}
      </p>
      <div
        className={cn("absolute", isPhone ? "inset-0" : "top-0 left-0 h-[132%] w-full")}
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
      {allowVideo && activeSrc ? (
        <video
          key={activeSrc}
          ref={videoRef}
          className={cn(frameClass, videoVisible ? "opacity-100" : "opacity-0")}
          src={activeSrc}
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
