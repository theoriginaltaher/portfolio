export type MediaAsset = {
  id: string;
  type: "image" | "video";
  src: string;
  alt: string;
  title: string;
  poster?: string;
  width?: number;
  height?: number;
  caption?: string;
  captionsUrl?: string;
};

export type MediaAlbum = {
  title: string;
  slug: string;
  date: string;
  category: "Photography" | "Video" | "Graphics & PR";
  description: string;
  coverImage?: string;
  coverAlt: string;
  tags: string[];
  items: MediaAsset[];
};

export const mediaCategories = ["Photography", "Video", "Graphics & PR"] as const;
