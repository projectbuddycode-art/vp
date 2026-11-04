import { images } from "@/lib/images";

export type VideoSlot = {
  id: string;
  title: string;
  /** Set when the compressed file exists in /public/videos. Absent files are not requested. */
  src?: string;
  webm?: string;
  mobileSrc?: string;
  poster: string;
  posterAlt: string;
};

/**
 * Drop compressed files at these paths to activate playback.
 * Until then the poster still is shown. No remote video URL is used.
 */
export const videos = {
  hero: {
    id: "hero",
    title: "Sunlight moving through a sandstone courtyard",
    poster: images.hero.src,
    posterAlt: images.hero.alt,
  },
  residential: {
    id: "residential",
    title: "A quiet walk through a home",
    poster: images.residence.src,
    posterAlt: images.residence.alt,
  },
  commercial: {
    id: "commercial",
    title: "Light across a workplace interior",
    poster: images.commercial.src,
    posterAlt: images.commercial.alt,
  },
  financial: {
    id: "financial",
    title: "A professional workspace in natural light",
    poster: images.modernHome.src,
    posterAlt: images.modernHome.alt,
  },
  health: {
    id: "health",
    title: "A calm room opening toward daylight",
    poster: images.courtyard.src,
    posterAlt: images.courtyard.alt,
  },
  finale: {
    id: "finale",
    title: "A sandstone facade in evening light",
    poster: images.palace.src,
    posterAlt: images.palace.alt,
  },
} as const satisfies Record<string, VideoSlot>;

export const serviceFilms = {
  "residential-vastu": videos.residential,
  "business-vastu": videos.commercial,
  "financial-professional-guidance": videos.financial,
  "health-wellbeing": videos.health,
} as const;
