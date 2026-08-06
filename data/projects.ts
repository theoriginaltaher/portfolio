/**
 * Presentation data for the pre-CMS build.
 *
 * Keep this module shaped like the future Sanity project documents described in
 * .kiro/specs/taher-hussain-portfolio/design.md. Pages consume these exports
 * through typed arrays, so replacing them with GROQ query results is isolated to
 * the data-loading boundary.
 */
export type ProjectCategory = "systems" | "media";

export type SystemProject = {
  slug: string;
  title: string;
  category: "systems";
  description: string;
  fullDescription: string;
  tools: string[];
  status: string;
  year: string;
  signal: string;
  featured: boolean;
  published: boolean;
};

export type MediaItem = {
  id: string;
  title: string;
  project: string;
  year: string;
  src: string;
  alt: string;
  focalPoint: string;
  span: "wide" | "tall" | "standard";
};

export const systemProjects: SystemProject[] = [
  {
    slug: "taher-hussain-creations",
    title: "Taher Hussain Creations",
    category: "systems",
    description: "A modular creative operations system connecting client intake, production tracking, publishing, and delivery.",
    fullDescription: "Designed as a practical operating layer for creative work, with clear handoffs between discovery, production, review, and release.",
    tools: ["Next.js", "Automation", "Cloud workflows"],
    status: "Active system",
    year: "2023–Now",
    signal: "OPS / 01",
    featured: true,
    published: true,
  },
  {
    slug: "starsons-digital-presence",
    title: "Starsons Digital Presence",
    category: "systems",
    description: "A unified web and media foundation for a growing business, built to keep brand, content, and operations aligned.",
    fullDescription: "The system joins customer-facing pages with reusable content structures and a maintainable publishing workflow.",
    tools: ["Web architecture", "Content systems", "Analytics"],
    status: "In operation",
    year: "2024–Now",
    signal: "WEB / 02",
    featured: true,
    published: true,
  },
  {
    slug: "pixel-perfect-v1",
    title: "Pixel Perfect V1",
    category: "systems",
    description: "A focused interface experiment translating visual references into responsive, production-ready web components.",
    fullDescription: "Built to test repeatable design-to-code decisions across typography, spacing, responsiveness, and interaction states.",
    tools: ["React", "TypeScript", "Design systems"],
    status: "Prototype complete",
    year: "2024",
    signal: "UI / 03",
    featured: false,
    published: true,
  },
  {
    slug: "echolens",
    title: "EchoLens",
    category: "systems",
    description: "A robotics concept exploring environmental sensing, accessible feedback, and reliable real-time decisions.",
    fullDescription: "Developed through a WRO-focused research process that connected physical prototyping with a legible digital control layer.",
    tools: ["Robotics", "Sensors", "Rapid prototyping"],
    status: "Research archive",
    year: "2023",
    signal: "R&D / 04",
    featured: false,
    published: true,
  },
];

export const mediaItems: MediaItem[] = [
  { id: "frame-01", title: "Available Light", project: "Studio Notes", year: "2026", src: "/assets/taher-hero-camera.png", alt: "Taher holding a camera in a low-lit creative workspace", focalPoint: "52% 42%", span: "tall" },
  { id: "frame-02", title: "Field Monitor", project: "YOUTH 2K25", year: "2025", src: "/assets/taher-portrait-hero-color.png", alt: "Wide portrait study in a blue-lit production environment", focalPoint: "54% 47%", span: "wide" },
  { id: "frame-03", title: "Between Takes", project: "Memento", year: "2025", src: "/assets/taher-hero-reference.png", alt: "Vertical contact-sheet style portrait study", focalPoint: "50% 24%", span: "standard" },
  { id: "frame-04", title: "Red Room", project: "Studio Notes", year: "2026", src: "/assets/taher-hero-camera.png", alt: "Cinematic close crop of a camera operator under red light", focalPoint: "72% 38%", span: "wide" },
  { id: "frame-05", title: "Signal Check", project: "Memento", year: "2025", src: "/assets/taher-portrait.png", alt: "Monochrome portrait framed as a production still", focalPoint: "50% 42%", span: "standard" },
  { id: "frame-06", title: "Afterimage", project: "YOUTH 2K25", year: "2025", src: "/assets/taher-reference-portrait.png", alt: "Portrait detail from the YOUTH 2K25 visual archive", focalPoint: "50% 38%", span: "tall" },
];
