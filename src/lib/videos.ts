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
    title: "STHAPATYA opening film",
    src: "/videos/sthapathya-opening.mp4",
    mobileSrc: "/videos/sthapathya-opening-720.mp4",
    poster: "/images/video-posters/sthapathya-opening.jpg",
    posterAlt: "Still from the STHAPATYA opening film. An architectural study, not a client property.",
  },
  residential: {
    id: "residential",
    title: "Entering a modern residence. An architectural film, not a client property.",
    src: "/videos/residential.mp4",
    mobileSrc: "/videos/residential-720.mp4",
    poster: "/images/video-posters/residential.jpg",
    posterAlt: "Still from an architectural film of a modern residence. Not a client property.",
  },
  entrance: {
    id: "entrance",
    title: "Moving into a modern home. An architectural film, not a client property.",
    src: "/videos/entrance.mp4",
    mobileSrc: "/videos/entrance-720.mp4",
    poster: "/images/video-posters/entrance.jpg",
    posterAlt: "Still from an architectural film approaching a modern home. Not a client property.",
  },
  floorplan: {
    id: "floorplan",
    title: "An architectural floor-plan study. Not an assessment of a real property.",
    src: "/videos/courtyard.mp4",
    mobileSrc: "/videos/courtyard-720.mp4",
    poster: "/images/video-posters/courtyard.jpg",
    posterAlt: "Still from an architectural floor-plan film. Not an assessment of a real property.",
  },
  villa: {
    id: "villa",
    title: "A modern villa in evening light. An architectural film, not a client property.",
    src: "/videos/villa.mp4",
    poster: "/images/video-posters/villa.jpg",
    posterAlt: "Still from an architectural film of a modern villa. Not a client property.",
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
