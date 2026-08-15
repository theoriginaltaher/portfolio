import type { PortableTextBlock } from "@portabletext/types";

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

export type SanityImage = {
  asset?: { _ref?: string; url?: string; metadata?: { dimensions?: { width: number; height: number } } };
  alt?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
};

export type Project = {
  _id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  shortDescription: string;
  fullDescription?: PortableTextBlock[];
  featuredImage?: SanityImage | null;
  gallery?: SanityImage[];
  year: string;
  role: string;
  tools: string[];
  order: number;
  featured: boolean;
  published: boolean;
};

export type ExperienceEntry = {
  _id: string;
  role: string;
  organisation: string;
  location?: string;
  dateRange: string;
  description?: string;
  category: "work" | "leadership";
  order: number;
  current: boolean;
};

export type Skill = { _id: string; label: string; order: number };

export type EducationEntry = {
  _id: string;
  school: string;
  qualification: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  activities: string[];
  order: number;
};

export type Certification = {
  _id: string;
  name: string;
  issuer: string;
  issuedOn?: string;
  credentialId?: string;
  credentialUrl?: string;
  order: number;
};

export type Course = { _id: string; name: string; reference?: string; order: number };

export type Language = { _id: string; name: string; proficiency: string; order: number };

export type CareerProject = {
  _id: string;
  title: string;
  description: string;
  startDate?: string;
  endDate?: string;
  externalUrl?: string;
  order: number;
  published: boolean;
};

export type Recommendation = {
  _id: string;
  personName: string;
  role?: string;
  organisation?: string;
  quote: string;
  receivedAt?: string;
  order: number;
  published: boolean;
};

export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  readingTime: number;
  body: PortableTextBlock[];
  coverImage?: SanityImage | null;
};

export type BlogPostPreview = Omit<BlogPost, "body">;

export type SiteSettings = {
  name: string;
  role: string;
  headline?: string;
  location?: string;
  bio: PortableTextBlock[];
  portrait?: SanityImage | null;
  email: string;
  linkedIn?: string;
  metaDescription: string;
};
