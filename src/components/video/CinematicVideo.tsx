"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import type { VideoSlot } from "@/lib/videos";
import { cn } from "@/lib/utils";

export function CinematicVideo({
  video,
  autoPlay = false,
  loop = true,
  controls = false,
  playInView = false,
  playOnHover = false,
  priority = false,
  continuous = false,
  className,
  sizes = "100vw",
}: {
  video: VideoSlot;
  autoPlay?: boolean;
  loop?: boolean;
  controls?: boolean;
  playInView?: boolean;
  playOnHover?: boolean;
  priority?: boolean;
  /** Keep a muted film playing. Used for the full-screen opening. */
  continuous?: boolean;
  className?: string;
  sizes?: string;
}) {
  const labelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [playing, setPlaying] = useState(false);
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
    const root = rootRef.current;
    if (!node || !root || !canPlay) return;

    const play = () => {
      void node.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    };
    const pause = () => {
      node.pause();
      setPlaying(false);
    };

    if (continuous || (!playInView && autoPlay)) play();

    if (continuous) {
      const keepPlaying = () => {
        if (node.paused || node.ended) {
          if (node.ended) node.currentTime = 0;
          void node.play().then(() => setPlaying(true)).catch(() => undefined);
        }
      };
      node.addEventListener("pause", keepPlaying);
      node.addEventListener("ended", keepPlaying);
      node.addEventListener("stalled", keepPlaying);
      return () => {
        node.removeEventListener("pause", keepPlaying);
        node.removeEventListener("ended", keepPlaying);
        node.removeEventListener("stalled", keepPlaying);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting && (autoPlay || playInView)) play();
        else pause();
      },
      { threshold: 0.45 },
    );
    observer.observe(root);
    return () => {
      observer.disconnect();
      pause();
    };
  }, [autoPlay, canPlay, continuous, playInView]);

  function toggle() {
    const node = videoRef.current;
    if (!node) return;
    if (node.paused) void node.play().then(() => setPlaying(true)).catch(() => setFailed(true));
    else {
      node.pause();
      setPlaying(false);
    }
  }

  return (
    <div
      ref={rootRef}
      className={cn("group/video relative overflow-hidden bg-charcoal", className)}
      onMouseEnter={() => {
        if (playOnHover && canPlay) void videoRef.current?.play().then(() => setPlaying(true)).catch(() => undefined);
      }}
      onMouseLeave={() => {
        if (playOnHover && !playInView && !autoPlay) {
          videoRef.current?.pause();
          setPlaying(false);
        }
      }}
    >
      <p id={labelId} className="sr-only">
        {video.title}
      </p>
      {canPlay ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-center"
          poster={video.poster}
          muted
          playsInline
          autoPlay={autoPlay || continuous}
          loop={loop || continuous}
          controls={controls}
          preload={priority || continuous ? "auto" : "none"}
          aria-labelledby={labelId}
          onError={() => setFailed(true)}
        >
          {video.mobileSrc ? <source src={video.mobileSrc} media="(max-width: 767px)" type="video/mp4" /> : null}
          {video.webm ? <source src={video.webm} type="video/webm" /> : null}
          {video.src ? <source src={video.src} type="video/mp4" /> : null}
        </video>
      ) : (
        <Image
          src={video.poster}
          alt={video.posterAlt}
          fill
          priority={priority}
          className="object-cover"
          sizes={sizes}
        />
      )}
      {continuous ? <span className="video-corner-blur" aria-hidden /> : null}
      {!canPlay ? <span className="cinematic-light pointer-events-none absolute inset-0" aria-hidden /> : null}
      {canPlay && !continuous ? (
        <button
          type="button"
          className="absolute right-3 bottom-3 z-10 bg-ivory/90 px-3 py-2 text-sm text-deep"
          aria-pressed={playing}
          onClick={toggle}
        >
          {playing ? "Pause film" : "Play film"}
        </button>
      ) : null}
    </div>
  );
}
