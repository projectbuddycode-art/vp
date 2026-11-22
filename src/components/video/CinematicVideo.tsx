"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import type { VideoSlot } from "@/lib/videos";
import { cn } from "@/lib/utils";

export function CinematicVideo({
  video,
  autoPlay = true,
  loop = true,
  controls = false,
  playInView = false,
  playOnHover = false,
  priority = false,
  continuous = true,
  className,
  sizes = "100vw",
}: {
  video: VideoSlot;
  autoPlay?: boolean;
  loop?: boolean;
  controls?: boolean;
  /** Kept for call-site compatibility; films no longer pause when leaving view. */
  playInView?: boolean;
  playOnHover?: boolean;
  priority?: boolean;
  /** Keep a muted film playing without interruption. */
  continuous?: boolean;
  className?: string;
  sizes?: string;
}) {
  const labelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [reduced, setReduced] = useState(false);
  const canPlay = Boolean(video.src) && !failed && !reduced;
  const keepAlive = continuous || autoPlay || playInView;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const node = videoRef.current;
    if (!node || !canPlay || !keepAlive) return;

    const ensurePlaying = () => {
      if (node.ended) node.currentTime = 0;
      if (node.paused) void node.play().catch(() => undefined);
    };

    ensurePlaying();

    const onVisibility = () => {
      if (document.visibilityState === "visible") ensurePlaying();
    };

    node.addEventListener("pause", ensurePlaying);
    node.addEventListener("ended", ensurePlaying);
    node.addEventListener("stalled", ensurePlaying);
    node.addEventListener("suspend", ensurePlaying);
    node.addEventListener("waiting", ensurePlaying);
    document.addEventListener("visibilitychange", onVisibility);

    const retry = window.setInterval(ensurePlaying, 2500);

    return () => {
      window.clearInterval(retry);
      node.removeEventListener("pause", ensurePlaying);
      node.removeEventListener("ended", ensurePlaying);
      node.removeEventListener("stalled", ensurePlaying);
      node.removeEventListener("suspend", ensurePlaying);
      node.removeEventListener("waiting", ensurePlaying);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [canPlay, keepAlive]);

  return (
    <div
      ref={rootRef}
      className={cn("group/video relative overflow-hidden bg-charcoal", className)}
      onMouseEnter={() => {
        if (playOnHover && canPlay) void videoRef.current?.play().catch(() => undefined);
      }}
    >
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
          loop={loop || continuous || autoPlay}
          controls={controls}
          preload="auto"
          aria-labelledby={labelId}
          onError={() => setFailed(true)}
          onLoadedData={() => {
            void videoRef.current?.play().catch(() => undefined);
          }}
          onCanPlay={() => {
            void videoRef.current?.play().catch(() => undefined);
          }}
        >
          {video.mobileSrc ? <source src={video.mobileSrc} media="(max-width: 767px)" type="video/mp4" /> : null}
          {video.webm ? <source src={video.webm} type="video/webm" /> : null}
          {video.src ? <source src={video.src} type="video/mp4" /> : null}
        </video>
      ) : (
        <div className="absolute top-0 left-0 h-[132%] w-full">
          <Image
            src={video.poster}
            alt={video.posterAlt}
            fill
            priority={priority}
            className="object-cover object-top"
            sizes={sizes}
          />
        </div>
      )}
      {!canPlay ? <span className="cinematic-light pointer-events-none absolute inset-0" aria-hidden /> : null}
    </div>
  );
}
