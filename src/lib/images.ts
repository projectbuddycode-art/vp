export type SiteImage = {
  src: string;
  alt: string;
};

/**
 * Atmospheric studies generated for this website.
 * They illustrate architecture and material. They are not photographs of client properties.
 * Replace any file by keeping the same path, or point CMS records at new public image URLs.
 */
export const images = {
  hero: {
    src: "/images/hero-sandstone.jpg",
    alt: "Architectural study of a sandstone courtyard. Not a client property.",
  },
  courtyard: {
    src: "/images/courtyard.jpg",
    alt: "Architectural study of a courtyard. Not a client property.",
  },
  carving: {
    src: "/images/carving-detail.jpg",
    alt: "Architectural study of carved stone detail. Not a client property.",
  },
  residence: {
    src: "/images/residence-interior.jpg",
    alt: "Architectural study of a living room. Not a client property.",
  },
  commercial: {
    src: "/images/commercial-interior.jpg",
    alt: "Architectural study of a workplace interior. Not a client property.",
  },
  modernHome: {
    src: "/images/modern-home.jpg",
    alt: "Architectural study of a modern house. Not a client property.",
  },
  geometry: {
    src: "/images/geometry-study.jpg",
    alt: "Architectural study of a planning diagram. Not a client floor plan.",
  },
  palace: {
    src: "/images/palace-facade.jpg",
    alt: "Architectural study of a sandstone facade. Not a client property.",
  },
  founder: {
    src: "/images/founder/sanjeev-jain.jpg",
    alt: "Sanjeev Jain seated in his study, wearing a cream bandhgala and a red tilak.",
  },
} as const satisfies Record<string, SiteImage>;

export function resolvePortrait(url?: string) {
  const value = url?.trim();
  return value ? value : images.founder.src;
}

export const studyCaption =
  "Architectural study prepared for this website. Not a photograph of a client, a client property, or Mr. Sanjeev Jain.";
