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
    /** Desktop / tablet (≥768px): original 16:9 homepage film — do not change. */
    src: "/videos/sthapatya-opening.mp4",
    /** Phones (≤767px): dedicated 9:16 homepage film. */
    mobileSrc: "/videos/sthapatya-home-mobile-9x16.mp4",
    poster: "/images/video-posters/sthapatya-opening.jpg",
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
  /**
   * Service pages reuse existing architectural films so every public video
   * supports a clear narrative. Source masters in the repo root are the same
   * subjects already compressed under /public/videos — they are not served.
   */
  commercial: {
    id: "commercial",
    title: "Approaching a workplace. An architectural film, not a client office.",
    src: "/videos/entrance.mp4",
    mobileSrc: "/videos/entrance-720.mp4",
    poster: "/images/video-posters/entrance.jpg",
    posterAlt: "Still from an architectural approach film used for business Vastu. Not a client office.",
  },
  financial: {
    id: "financial",
    title: "A floor-plan study for work and money rooms. Not a financial result.",
    src: "/videos/courtyard.mp4",
    mobileSrc: "/videos/courtyard-720.mp4",
    poster: "/images/video-posters/courtyard.jpg",
    posterAlt: "Still from an architectural floor-plan film used for work and money rooms.",
  },
  health: {
    id: "health",
    title: "A calmer living environment. An architectural film, not medical advice.",
    src: "/videos/villa.mp4",
    poster: "/images/video-posters/villa.jpg",
    posterAlt: "Still from an architectural film used for health and wellbeing consultations.",
  },
  finale: {
    id: "finale",
    title: "Evening light on a modern residence. An architectural film, not a client property.",
    src: "/videos/villa.mp4",
    poster: "/images/video-posters/villa.jpg",
    posterAlt: "Still from an architectural film of a modern villa. Not a client property.",
  },
} as const satisfies Record<string, VideoSlot>;

export const serviceFilms = {
  "residential-vastu": videos.residential,
  "business-vastu": videos.commercial,
  "financial-professional-guidance": videos.financial,
  "health-wellbeing": videos.health,
} as const;
