export type MediaAsset = {
  type: "image" | "video";
  src: string;
  alt: string;
  title?: string;
  featured?: boolean;
};

export type MediaAlbum = {
  title: string;
  slug: string;
  date: string;
  category: string;
  description: string;
  coverImage: string;
  coverAlt: string;
  tags: string[];
  mediaCount: number;
  items: MediaAsset[];
};

const frames = {
  camera: "/assets/taher-hero-camera.png",
  portrait: "/assets/taher-portrait-hero-color.png",
  reference: "/assets/taher-reference-portrait.png",
  mono: "/assets/taher-portrait.png",
  archive: "/assets/taher-hero-reference.png",
  wide: "/assets/taher-hero-wide.png",
};

export const mediaAlbums: MediaAlbum[] = [
  {
    title: "YOUTH 2K25",
    slug: "youth-2k25",
    date: "October 2024 – April 2025",
    category: "Event Media",
    description: "Visual coverage and storytelling for a high-energy youth event, from the first promotional frame through to the final highlight reel.",
    coverImage: frames.camera,
    coverAlt: "Camera in use during a live production",
    tags: ["Photography", "Video", "Event coverage"],
    mediaCount: 24,
    items: [
      { type: "image", src: frames.camera, alt: "Camera prepared for live event coverage", title: "Production floor", featured: true },
      { type: "image", src: frames.portrait, alt: "Portrait from the YOUTH 2K25 archive", title: "Between takes" },
      { type: "image", src: frames.reference, alt: "Editorial portrait from the event archive", title: "Signal" },
      { type: "image", src: frames.wide, alt: "Wide production still", title: "The room" },
    ],
  },
  {
    title: "Memento | Relive The Past",
    slug: "memento",
    date: "October 2021 – Present",
    category: "Archive / Storytelling",
    description: "A visual archive shaped around memory, nostalgia, and the people and moments that formed Burhani Serendib School.",
    coverImage: frames.archive,
    coverAlt: "Portrait study from the Memento archive",
    tags: ["Archive", "Photography", "Storytelling"],
    mediaCount: 18,
    items: [
      { type: "image", src: frames.archive, alt: "Archive portrait study", title: "Memory study", featured: true },
      { type: "image", src: frames.mono, alt: "Monochrome portrait from the archive", title: "Presence" },
      { type: "image", src: frames.reference, alt: "Portrait detail from Memento", title: "Detail" },
      { type: "image", src: frames.wide, alt: "Wide image from the archive", title: "Context" },
    ],
  },
  {
    title: "School Media Coverage",
    slug: "school-media-coverage",
    date: "August 2024 – November 2025",
    category: "Event Documentation",
    description: "Photo and video coverage for school-led programmes, assemblies, prize giving, and leadership events.",
    coverImage: frames.portrait,
    coverAlt: "Event media portrait in a blue-lit workspace",
    tags: ["School", "Event", "Documentation"],
    mediaCount: 32,
    items: [
      { type: "image", src: frames.portrait, alt: "Event coverage portrait", title: "On assignment", featured: true },
      { type: "image", src: frames.camera, alt: "Camera used for event documentation", title: "Capture" },
      { type: "image", src: frames.wide, alt: "Wide event coverage frame", title: "Scale" },
    ],
  },
  {
    title: "Sports Day / Activity Coverage",
    slug: "sports-day-activity-coverage",
    date: "August 2023 – July 2025",
    category: "Photography",
    description: "Action-focused event coverage with attention to timing, emotion, and a clear visual record of the day.",
    coverImage: frames.wide,
    coverAlt: "Wide frame from an activity coverage archive",
    tags: ["Sports", "Photography", "Editing"],
    mediaCount: 28,
    items: [
      { type: "image", src: frames.wide, alt: "Wide activity coverage frame", title: "Motion", featured: true },
      { type: "image", src: frames.camera, alt: "Camera and production setup", title: "Ready" },
      { type: "image", src: frames.reference, alt: "Editorial event frame", title: "Reaction" },
    ],
  },
];

export function getMediaAlbum(slug: string) {
  return mediaAlbums.find((album) => album.slug === slug);
}
