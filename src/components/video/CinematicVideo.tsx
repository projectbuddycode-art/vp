"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import type { VideoSlot } from "@/lib/videos";
import { cn } from "@/lib/utils";

function pickSource(video: VideoSlot) {
  if (typeof window === "undefined") return video.src;
  const preferMobile = window.matchMedia("(max-width: 767px)").matches;
  if (preferMobile && video.mobileSrc) return video.mobileSrc;
  return video.src ?? video.mobileSrc;
}

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
  /** Play when near the viewport to keep scrolling smooth. */
  playInView?: boolean;
  playOnHover?: boolean;
  priority?: boolean;
  /** Keep looping without interruption while the film is active. */
  continuous?: boolean;
  className?: string;
  sizes?: string;
}) {
  const labelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [src, setSrc] = useState<string | undefined>(video.src ?? video.mobileSrc);
  const [nearView, setNearView] = useState(priority);
  const [pageVisible, setPageVisible] = useState(true);
  const [hasFrame, setHasFrame] = useState(false);
  const canPlay = Boolean(src) && !failed && !reduced;
  const shouldRun = canPlay && pageVisible && (priority || nearView) && (continuous || autoPlay || playInView || playOnHover);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const applySource = () => {
      setHasFrame(false);
      setSrc(pickSource(video));
    };
    applySource();
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    mobileQuery.addEventListener("change", applySource);
    return () => mobileQuery.removeEventListener("change", applySource);
  }, [video]);

  useEffect(() => {
    const onVisibility = () => setPageVisible(document.visibilityState === "visible");
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (priority) {
      setNearView(true);
      return;
    }
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setNearView(Boolean(entry?.isIntersecting));
      },
      {
        // Start slightly early; pause when far away to limit concurrent decode.
        rootMargin: "28% 0px",
        threshold: 0.08,
      },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, [priority]);

  useEffect(() => {
    const node = videoRef.current;
    if (!node || !canPlay) return;

    if (!shouldRun) {
      if (!node.paused) node.pause();
      return;
    }

    const tryPlay = () => {
      if (node.ended) node.currentTime = 0;
      if (node.paused) void node.play().catch(() => undefined);
    };

    tryPlay();
    node.addEventListener("loadeddata", tryPlay);
    node.addEventListener("canplay", tryPlay);
    node.addEventListener("ended", tryPlay);

    return () => {
      node.removeEventListener("loadeddata", tryPlay);
      node.removeEventListener("canplay", tryPlay);
      node.removeEventListener("ended", tryPlay);
    };
  }, [canPlay, shouldRun, src]);

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
      <div className={cn("absolute top-0 left-0 h-[132%] w-full transition-opacity duration-500", hasFrame && canPlay ? "opacity-0" : "opacity-100")}>
        <Image
          src={video.poster}
          alt={video.posterAlt}
          fill
          priority={priority}
          className="object-cover object-top"
          sizes={sizes}
        />
      </div>
      {canPlay ? (
        <video
          key={src}
          ref={videoRef}
          className="video-frame absolute top-0 left-0 h-[132%] w-full object-cover object-top"
          src={src}
          muted
          playsInline
          autoPlay={shouldRun}
          loop={loop || continuous || autoPlay}
          controls={controls}
          preload={priority || nearView ? "auto" : "metadata"}
          disablePictureInPicture
          aria-labelledby={labelId}
          onError={() => setFailed(true)}
          onPlaying={() => setHasFrame(true)}
          onLoadedData={() => {
            if (shouldRun) void videoRef.current?.play().catch(() => undefined);
          }}
        />
      ) : null}
      {!canPlay ? <span className="cinematic-light pointer-events-none absolute inset-0" aria-hidden /> : null}
    </div>
  );
}
