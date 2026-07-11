# Design Document — Taher Hussain Portfolio

## Overview

Taher Hussain is a creative technologist from Sri Lanka. This design document specifies the complete architecture, visual system, component model, and data layer for his personal portfolio site built with Next.js 14+ App Router, TypeScript, Tailwind CSS, Sanity CMS, Resend, and deployed on Vercel.

### Website Objective & Success Metrics

**Objective:** Deliver a production-ready personal portfolio that communicates Taher's identity as a creative technologist with a clean, premium, editorial visual language. Not a student template, not a startup landing page.

**Primary Goals:**
1. Credibility — position Taher as a serious creative technologist to collaborators, clients, and institutions.
2. Discoverability — SEO-ready pages with structured metadata.
3. Showcase — present six real projects across two categories (Digital Systems Lab, Media Gallery).
4. Writing presence — a live Sanity-backed blog.
5. Contact conversion — a functional, low-friction contact form via Resend.

**Success Metrics:**

| Metric | Target |
|---|---|
| Lighthouse Performance (desktop) | ≥ 85 on all primary pages |
| Lighthouse Accessibility | ≥ 90 on all pages |
| Blog cadence | ≥ 1 post live at launch |
| Zero placeholder content at launch | 100% real copy + images |
| Build errors on Vercel | 0 |

### Target Audience

| Segment | What they need to see |
|---|---|
| Potential collaborators | Strong portfolio work, clear skill set, approachable contact |
| School / institution leadership | Leadership experience, community impact, media production credibility |
| Clients (SMBs) | Case studies, professionalism, contact form |
| Recruiters / tech scouts | Full experience list, technical depth, writing quality |
| Curious readers | Clean reading experience, regular published content |

### Brand Positioning & Tone

Taher's brand sits at the intersection of editorial craft and technical depth. Calm, confident, quietly impressive.

- **Precise, not verbose** — short sentences, declarative headings
- **Confident, not boastful** — state what was built, not how amazing it is
- **Human, not corporate** — first-person voice on About and Blog
- **Editorial, not template** — copy reads like a magazine profile

**Forbidden tone patterns:** no exclamation points in body copy, no "passionate about / leverages / synergy", no results-driven bullet lists disguised as prose.


## Architecture

### Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14+ App Router |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 |
| CMS | Sanity.io (headless) |
| Email | Resend |
| Deployment | Vercel |
| Font | `next/font` — Geist Sans (primary), DM Serif Display (optional display) |

### Sitemap & Rendering Strategy

```
/                        → ISR  revalidate: 60s (Sanity: featured projects, featured experience, latest 3 posts, siteSettings)
/experience              → ISR  revalidate: 60s (Sanity: experience documents)
/projects                → ISR  revalidate: 60s (Sanity: all published projects)
/projects/systems        → ISR  revalidate: 60s (Sanity: published projects, category=systems)
/projects/media          → ISR  revalidate: 60s (Sanity: published projects, category=media)
/projects/[slug]         → ISR  revalidate: 60s + generateStaticParams (Sanity: project by slug)
/about                   → ISR  revalidate: 60s (Sanity: siteSettings + skills)
/blog                    → ISR  revalidate: 60s (Sanity: posts)
/blog/[slug]             → ISR  revalidate: 60s + generateStaticParams (Sanity: post by slug)
/contact                 → SSG  (form submits to API route; contact info from siteSettings if desired, but can be hardcoded as env var)
/api/contact             → Route Handler (POST, Resend)
```

All CMS-driven pages use ISR with a 60-second revalidation window — content updates in Sanity propagate to all affected pages within 60 seconds without a full rebuild, meeting the freshness SLA from Requirement 9.9. The contact page is the only SSG route because the form posts to an internal Next.js Route Handler and no CMS data is required. No API keys are exposed to the client.

### Directory Structure

```
src/
  app/
    layout.tsx              ← RootLayout, Nav, Footer, font vars
    page.tsx                ← Homepage (/)
    experience/page.tsx
    projects/
      page.tsx
      systems/page.tsx
      media/page.tsx
      [slug]/page.tsx
    about/page.tsx
    blog/
      page.tsx
      [slug]/page.tsx
    contact/page.tsx
    api/contact/route.ts    ← Resend Route Handler
  components/
    layout/                 ← Nav, Footer, PageHeader, Divider
    home/                   ← Hero, MetadataRow, ExperiencePreview, BlogPreview, AboutEditorial, ContactCTA
    shared/                 ← ProjectRow, ExperienceRow, BlogPostRow, Button, BackLink, CategoryBadge
    blog/                   ← ArticleHeader, ArticleBody
    contact/                ← ContactForm, ContactInfo
    projects/               ← ProjectHero, ProjectBody, ToolsGrid
  data/
    nav.ts                  ← Nav config (static — navigation items do not change at runtime)
    seed/                   ← Optional dev seed data only — not used in production builds
  lib/
    sanity/
      client.ts
      queries.ts
  types/
    index.ts                ← All TypeScript interfaces
sanity/
  schemas/
    post.ts
    project.ts
    experience.ts
    skill.ts
    siteSettings.ts
  sanity.config.ts          ← All 5 schemas registered here
```

### Visual Design System

#### Color Tokens

```typescript
// tailwind.config.ts → theme.extend.colors
{
  bg:        '#111111',   // Page background (near-black)
  surface:   '#181818',   // Slightly lighter surface (used sparingly)
  primary:   '#F5F2EE',   // Off-white primary text
  secondary: '#888888',   // Muted gray metadata / labels
  accent:    '#C9A96E',   // Warm stone — exactly ONE accent
  divider:   'rgba(255,255,255,0.08)', // 1px thin dividers
}
```


#### Typography Scale

Two typefaces only — Geist Sans for all UI and body, optional DM Serif Display only for hero display text:

| Token | Size | Usage |
|---|---|---|
| `text-xs` | 12px | Labels, captions |
| `text-sm` | 14px | Metadata, tags |
| `text-base` | 16px | Body |
| `text-lg` | 18px | Lead paragraph, blog body |
| `text-xl` | 20px | Card / row titles |
| `text-2xl` | 24px | Section headings |
| `text-3xl` | 30px | Sub-page headings |
| `text-4xl` | 36px | Hero statement |
| `text-5xl` | 48px | Hero name (mobile) |
| `text-7xl` | 72px | Hero name (desktop) |

Leading: 1.6 for body, 1.1 for display headings.

#### Spacing & Grid

- 8px base grid, Tailwind default spacing scale
- Section vertical padding: `py-20 md:py-28` (80px / 112px)
- Content horizontal padding: `px-6 md:px-12 lg:px-24`
- Max content width: `max-w-screen-xl mx-auto`
- 12-column grid for project and about layouts

#### Component States

| State | Treatment |
|---|---|
| Default link | `text-primary`, no underline |
| Hover link | `text-accent`, underline appears |
| Active nav item | `text-accent` |
| Hover project row | Background shifts to `surface`, opacity 0.9 — no scale |
| Hover experience row | `text-accent` on role title |
| Button default | 1px border `accent`, text `accent`, transparent bg |
| Button hover | bg fills to `accent`, text flips to `bg` |
| Input focus | 1px border `accent`, no box-shadow |
| Input error | 1px border red-500, inline error text red |
| Form success | Confirmation text in `accent` |

#### Forbidden Patterns

The following are explicitly prohibited across all components:

- `backdrop-blur` / `backdrop-filter` (glassmorphism)
- `bg-gradient-*` on any decorative surface
- Blob SVG shapes as background decoration
- `rounded-2xl` or larger radius on cards (max `rounded-sm` for inputs)
- `shadow-lg` or larger drop shadows
- `scale-105` or larger hover transforms (max `scale-[1.02]`)
- More than one accent color in use simultaneously
- Typefaces beyond the two defined
- `border-radius` on project images (full-bleed, sharp edges)

### Page-by-Page Content Structure

#### Homepage (`/`)

```
Nav
Hero: name "Taher Hussain" · role "Creative Technologist" · statement · paragraph ≤60w · 2 CTAs · MetadataRow
Divider
ExperiencePreview: heading + 5 ExperienceRows + "Full experience →"
Divider
ProjectsPreview: heading "Selected Work" + 6 ProjectRows (alternating) + "All projects →"
Divider
AboutEditorial: heading + 60–120w paragraph + "Read more →"
Divider
BlogPreview: heading "Writing" + 3 BlogPreviewRows + "All posts →"
Divider
ContactCTA: prompt line + "Get in touch →" link
Footer
```

#### Experience Page (`/experience`)

```
Nav → PageHeader "Experience" → Divider
ExperienceList:
  Founder · TaherHussainCreations · 2023–Present
  CTO · Starsons · 2024–Present
  Head of IT & Media · Starsons · 2023–2024
  Vice President · ICT Society · 2023–2024
  Editor · Interact Club · 2022–2023
Footer
```

#### Projects Index (`/projects`)

```
Nav → PageHeader "Projects" → category links (systems, media) → Divider
6 × ProjectRow (all projects, alternating) → Footer
```

#### Digital Systems Lab (`/projects/systems`)

```
Nav → PageHeader "Digital Systems Lab" subheading "AI · Web · Cloud · Robotics" → Divider
ProjectRow: TaherHussainCreations
ProjectRow: Starsons Digital Presence
ProjectRow: Pixel Perfect V1
ProjectRow: WRO / EchoLens
Footer
```

#### Media Gallery (`/projects/media`)

```
Nav → PageHeader "Media Gallery" subheading "Video · Photography · Visual Production" → Divider
ProjectRow: YOUTH 2K25
ProjectRow: Memento
Footer
```

#### Project Detail (`/projects/[slug]`)

```
Nav → BackLink "← Projects"
Full-bleed ProjectHero (image ~60vh + title overlay)
ProjectBody: H1 title · category badge · full description prose · ToolsGrid
Footer
```

#### About Page (`/about`)

```
Nav → PageHeader "About" → Divider
AboutGrid (12-col):
  Col 1–7: editorial bio 150–400w
  Col 8–12: portrait photograph (full editorial framing, no card border)
Divider
DisciplinesList: plain typographic list (not icon grid)
  AI & Automation · Multimedia Production · Video & Photography
  Graphic Design · Web Development · Cloud Infrastructure
  Robotics · Event Media · Digital Strategy
Divider
ContactPrompt: "Let's work together →" → /contact
Footer
```

#### Blog Index (`/blog`)

```
Nav → PageHeader "Writing" → Divider
n × BlogPostRow (title · date · category · excerpt ≤30w) + dividers between
Footer
```

#### Blog Post (`/blog/[slug]`)

```
Nav → BackLink "← Writing"
ArticleHeader: H1 title · "Taher Hussain" · date · category
Divider
ArticleBody: PortableText rendered (h2, h3, p, a, blockquote)
Divider
BackLink "← Back to Writing"
Footer
```

#### Contact Page (`/contact`)

```
Nav → PageHeader "Contact" → short invitational paragraph
ContactGrid (12-col):
  Col 1–7: ContactForm (Name, Email, Subject, Message, Submit)
  Col 8–12: ContactInfo (professional email + optional social links)
Footer
```


## Components and Interfaces

All components live under `src/components/`. Shared primitives under `src/components/shared/`. Layout under `src/components/layout/`.

### Layout Components

```typescript
// src/components/layout/RootLayout.tsx
interface RootLayoutProps {
  children: React.ReactNode;
}
// Wraps html + body, mounts Nav and Footer, injects font CSS variables

// src/components/layout/Nav.tsx
// Props: none — reads pathname via usePathname()
// State: isDropdownOpen: boolean, isMobileOpen: boolean
// Data: imports navItems from src/data/nav.ts

// src/components/layout/Footer.tsx
// Props: none — static content, copyright, thin top divider

// src/components/layout/PageHeader.tsx
interface PageHeaderProps {
  heading: string;
  subheading?: string;
}

// src/components/layout/Divider.tsx
// Props: none — renders <hr className="border-t border-divider" />
```

### Homepage Components

```typescript
// src/components/home/Hero.tsx
interface HeroProps {
  name: string;            // "Taher Hussain"
  role: string;            // "Creative Technologist"
  statement: string;       // Bold 1–2 line headline
  paragraph: string;       // ≤60 words
  metadataLabels: string[]; // ["Sri Lanka", "AI", ...]
}

// src/components/home/MetadataRow.tsx
interface MetadataRowProps {
  labels: string[];
}
// Renders: horizontal dot-separated label list, no pills

// src/components/home/ExperiencePreview.tsx
interface ExperiencePreviewProps {
  entries: ExperienceEntry[]; // Exactly 5 for homepage
}

// src/components/home/BlogPreview.tsx
interface BlogPreviewProps {
  posts: BlogPostPreview[]; // Exactly 3 for homepage
}

// src/components/home/AboutEditorial.tsx
interface AboutEditorialProps {
  paragraph: string; // 60–120 words
}

// src/components/home/ContactCTA.tsx
interface ContactCTAProps {
  promptText: string;
}
```

### Shared / Reusable Components

```typescript
// src/components/shared/ProjectRow.tsx
interface ProjectRowProps {
  project: Project;
  index: number;       // 1-indexed; odd = image left, even = image right
  priority?: boolean;  // for next/image LCP optimization
}

// src/components/shared/ExperienceRow.tsx
interface ExperienceRowProps {
  entry: ExperienceEntry;
  showDivider?: boolean; // default true
}

// src/components/shared/BlogPostRow.tsx
interface BlogPostRowProps {
  post: BlogPostPreview;
  showDivider?: boolean; // default true
}

// src/components/shared/BackLink.tsx
interface BackLinkProps {
  href: string;
  label: string;
}

// src/components/shared/Button.tsx
type ButtonVariant = 'primary' | 'ghost';
interface ButtonProps {
  label: string;
  href?: string;          // if set, renders as <Link>
  onClick?: () => void;
  variant?: ButtonVariant; // default 'primary'
  type?: 'button' | 'submit';
  disabled?: boolean;
  loading?: boolean;
}

// src/components/shared/CategoryBadge.tsx
interface CategoryBadgeProps {
  category: 'systems' | 'media';
}
```

### Blog Components

```typescript
// src/components/blog/ArticleBody.tsx
import type { PortableTextBlock } from '@portabletext/types';
interface ArticleBodyProps {
  content: PortableTextBlock[];
}
// Uses @portabletext/react with custom components for h2, h3, p, a, blockquote

// src/components/blog/ArticleHeader.tsx
interface ArticleHeaderProps {
  title: string;
  author: string;       // "Taher Hussain"
  publishedAt: string;  // ISO date string
  category?: string;
}
```

### Contact Components

```typescript
// src/components/contact/ContactForm.tsx
type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}
// Internal state: values, errors, status: FormStatus
// Submit flow: validate → POST /api/contact → update status
// No external form library — native React state + custom validation

// src/components/contact/ContactInfo.tsx
// Props: none — renders static email address and optional social links
```

### Project Detail Components

```typescript
// src/components/projects/ProjectHero.tsx
interface ProjectHeroProps {
  title: string;
  category: 'systems' | 'media';
  image: ProjectImage | null;
}
// If image is null, renders accent-color placeholder panel

// src/components/projects/ProjectBody.tsx
interface ProjectBodyProps {
  description: string;
  tools: string[];
}

// src/components/projects/ToolsGrid.tsx
interface ToolsGridProps {
  tools: string[];
}
// Renders as clean typographic list, NOT icon grid
```

### Navigation Data

```typescript
// src/data/nav.ts
export const navItems: NavItem[] = [
  { label: '01 / HOME',       href: '/' },
  { label: '02 / EXPERIENCE', href: '/experience' },
  {
    label: '03 / PROJECTS',
    href: '/projects',
    children: [
      { label: 'Digital Systems Lab', href: '/projects/systems' },
      { label: 'Media Gallery',       href: '/projects/media' },
    ],
  },
  { label: '04 / ABOUT',   href: '/about' },
  { label: '05 / BLOG',    href: '/blog' },
  { label: '06 / CONTACT', href: '/contact' },
];
```


## Data Models

### TypeScript Interfaces

```typescript
// src/types/index.ts

export interface SanityImage {
  asset: { _ref: string; _type: 'reference' };
  hotspot?: { x: number; y: number };
  alt?: string;
}

export interface Project {
  _id: string;
  slug: string;
  title: string;
  category: 'systems' | 'media';
  description: string;                   // max 150 chars, for ProjectRow
  fullDescription: PortableTextBlock[];  // for detail page
  featuredImage: SanityImage | null;
  galleryImages?: SanityImage[];
  tools: string[];
  order: number;
  featured: boolean;
  published: boolean;
}

export interface ExperienceEntry {
  _id: string;
  role: string;
  organisation: string;
  dateRange: string;         // e.g. "2023 – Present"
  description: string;       // one-line
  category: 'leadership' | 'robotics' | 'media' | 'web' | 'creative-tech';
  order: number;
  current: boolean;          // marks active roles
}

export interface Skill {
  _id: string;
  label: string;
  order: number;
}

export interface SiteSettings {
  name: string;
  role: string;
  bio: PortableTextBlock[];
  portrait: SanityImage;
  email: string;
  linkedIn?: string;
  metaDescription: string;
}

export interface BlogPostPreview {
  title: string;
  slug: string;
  publishedAt: string;  // ISO 8601
  excerpt: string;      // max 30 words for preview rows
  category: string;
}

export interface BlogPost extends BlogPostPreview {
  author: string;
  body: PortableTextBlock[];
  excerpt: string;      // max 300 chars (full excerpt from CMS)
}

export interface ContactFormPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}
```

> **Note:** `ProjectImage` and the old `id`-based interfaces are replaced by the Sanity-shaped interfaces above. All project, experience, and skill content is fetched from Sanity CMS at runtime — there are no static TypeScript data arrays for these types in production.

### Sanity CMS Schemas

All five document types are defined in `sanity/schemas/` and registered in `sanity.config.ts`. The `siteSettings` type is configured as a singleton — only one document of this type is allowed.

```typescript
// sanity/schemas/project.ts
export const projectSchema = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title',           type: 'string',   validation: (R) => R.required() }),
    defineField({ name: 'slug',            type: 'slug',     options: { source: 'title', maxLength: 96 }, validation: (R) => R.required() }),
    defineField({ name: 'category',        type: 'string',   options: { list: ['systems', 'media'] }, validation: (R) => R.required() }),
    defineField({ name: 'description',     type: 'text',     rows: 3, validation: (R) => R.max(150) }),
    defineField({ name: 'fullDescription', type: 'array',    of: [{ type: 'block' }] }),
    defineField({ name: 'featuredImage',   type: 'image',    options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alt text' }] }),
    defineField({ name: 'galleryImages',   type: 'array',    of: [{ type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string' }] }] }),
    defineField({ name: 'tools',           type: 'array',    of: [{ type: 'string' }] }),
    defineField({ name: 'order',           type: 'number' }),
    defineField({ name: 'featured',        type: 'boolean',  initialValue: false }),
    defineField({ name: 'published',       type: 'boolean',  initialValue: false }),
  ],
  preview: { select: { title: 'title', subtitle: 'category', media: 'featuredImage' } },
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
});

// sanity/schemas/experience.ts
export const experienceSchema = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({ name: 'role',         type: 'string',  validation: (R) => R.required() }),
    defineField({ name: 'organisation', type: 'string',  validation: (R) => R.required() }),
    defineField({ name: 'dateRange',    type: 'string',  validation: (R) => R.required() }),
    defineField({ name: 'description',  type: 'string' }),
    defineField({ name: 'category',     type: 'string',  options: { list: ['leadership', 'robotics', 'media', 'web', 'creative-tech'] } }),
    defineField({ name: 'order',        type: 'number' }),
    defineField({ name: 'current',      type: 'boolean', initialValue: false }),
  ],
  preview: { select: { title: 'role', subtitle: 'organisation' } },
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
});

// sanity/schemas/skill.ts
export const skillSchema = defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    defineField({ name: 'label', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'order', type: 'number' }),
  ],
  preview: { select: { title: 'label' } },
});

// sanity/schemas/siteSettings.ts
export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'name',            type: 'string' }),
    defineField({ name: 'role',            type: 'string' }),
    defineField({ name: 'bio',             type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'portrait',        type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string' }] }),
    defineField({ name: 'email',           type: 'string' }),
    defineField({ name: 'linkedIn',        type: 'url' }),
    defineField({ name: 'metaDescription', type: 'string' }),
  ],
  preview: { select: { title: 'name' } },
});
// Registered as a singleton in sanity.config.ts — only one siteSettings document allowed

// sanity/schemas/post.ts
export const postSchema = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title',       type: 'string',   validation: (R) => R.required() }),
    defineField({ name: 'slug',        type: 'slug',     options: { source: 'title', maxLength: 96 }, validation: (R) => R.required() }),
    defineField({ name: 'publishedAt', type: 'datetime', validation: (R) => R.required() }),
    defineField({ name: 'excerpt',     type: 'text',     rows: 3, validation: (R) => R.max(300) }),
    defineField({ name: 'category',    type: 'string' }),
    defineField({ name: 'author',      type: 'string',   initialValue: 'Taher Hussain' }),
    defineField({
      name: 'body',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alt text' }] },
      ],
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'publishedAt' } },
});
```

### Sanity Client & GROQ Queries

```typescript
// src/lib/sanity/client.ts
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

// src/lib/sanity/queries.ts

// PROJECTS
export const ALL_PUBLISHED_PROJECTS_QUERY = `
  *[_type == "project" && published == true] | order(order asc) {
    _id, title, "slug": slug.current, category, description, tools, order, featured,
    featuredImage { asset, hotspot, alt }
  }
`;
export const SYSTEMS_PROJECTS_QUERY = `
  *[_type == "project" && published == true && category == "systems"] | order(order asc) {
    _id, title, "slug": slug.current, category, description, tools, order,
    featuredImage { asset, hotspot, alt }
  }
`;
export const MEDIA_PROJECTS_QUERY = `
  *[_type == "project" && published == true && category == "media"] | order(order asc) {
    _id, title, "slug": slug.current, category, description, tools, order,
    featuredImage { asset, hotspot, alt }
  }
`;
export const PROJECT_BY_SLUG_QUERY = `
  *[_type == "project" && slug.current == $slug && published == true][0] {
    _id, title, "slug": slug.current, category, description, fullDescription, tools, order,
    featuredImage { asset, hotspot, alt }, galleryImages[] { asset, hotspot, alt }
  }
`;
export const ALL_PROJECT_SLUGS_QUERY = `
  *[_type == "project" && published == true] { "slug": slug.current }
`;
export const FEATURED_PROJECTS_QUERY = `
  *[_type == "project" && published == true && featured == true] | order(order asc) [0..5] {
    _id, title, "slug": slug.current, category, description, tools, order,
    featuredImage { asset, hotspot, alt }
  }
`;

// EXPERIENCE
export const ALL_EXPERIENCE_QUERY = `
  *[_type == "experience"] | order(order asc) {
    _id, role, organisation, dateRange, description, category, order, current
  }
`;
export const FEATURED_EXPERIENCE_QUERY = `
  *[_type == "experience"] | order(order asc) [0..4] {
    _id, role, organisation, dateRange, category
  }
`;

// SKILLS
export const ALL_SKILLS_QUERY = `
  *[_type == "skill"] | order(order asc) { _id, label, order }
`;

// SITE SETTINGS
export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    name, role, bio, portrait { asset, hotspot, alt }, email, linkedIn, metaDescription
  }
`;

// BLOG
export const ALL_POSTS_QUERY = `
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    title, "slug": slug.current, publishedAt, excerpt, category
  }
`;
export const LATEST_POSTS_QUERY = `
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) [0..2] {
    title, "slug": slug.current, publishedAt, excerpt, category
  }
`;
export const POST_BY_SLUG_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    title, "slug": slug.current, publishedAt, excerpt, category, author, body
  }
`;
export const ALL_POST_SLUGS_QUERY = `
  *[_type == "post" && defined(slug.current)] { "slug": slug.current }
`;
```

### Environment Variables

| Variable | Used by | Exposed to client |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity client | Yes |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity client | Yes |
| `SANITY_API_TOKEN` | Sanity read operations in ISR pages (server-side only) | No |
| `RESEND_API_KEY` | `/api/contact` Route Handler | No |
| `CONTACT_EMAIL` | `/api/contact` Route Handler | No |

None of these values are committed to source control. All set in Vercel project settings. `SANITY_API_TOKEN` is required for authenticated read requests during ISR revalidation — it is never sent to the client.


## Error Handling

### Contact Form

The form uses a layered error-handling strategy — client-side validation first, then server-side, then network/API errors:

1. **Client-side validation** (before any API call):
   - Empty required fields → inline error per field, form does not submit
   - Invalid email format → inline error on email field, form does not submit
   - Validation runs on submit and optionally on blur

2. **API route server-side validation** (`/api/contact`):
   - Missing fields → HTTP 400 with `{ error: 'Missing required fields.' }`
   - Invalid email → HTTP 400 with `{ error: 'Invalid email address.' }`
   - Returns 400 before calling Resend to avoid unnecessary API calls

3. **Resend / network failure**:
   - Resend API error → HTTP 500 with `{ error: 'Failed to send.' }`
   - Client receives error → shows "Something went wrong. Please try again or email directly." and preserves user input
   - No automatic retry — user retries manually

4. **Form states**: `'idle' | 'submitting' | 'success' | 'error'`
   - `submitting`: Submit button disabled + loading indicator (no spinner animation, text changes to "Sending…")
   - `success`: Confirmation message shown in accent color, all fields reset
   - `error`: Error message shown in red-500, fields preserved

### Blog 404 Handling

When `/blog/[slug]` receives a slug not found in the CMS:

```typescript
// src/app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';

const post = await getPostBySlug(params.slug);
if (!post) notFound();
// Next.js renders the nearest not-found.tsx with 404 HTTP status
```

A `not-found.tsx` file provides a minimal message: "Post not found." with a back link to `/blog`.

### Project Placeholder Images

When a `Project` has `image: null`, the `ProjectRow` and `ProjectHero` components render a solid-color panel using the accent color (`bg-accent`) at the same dimensions a real image would occupy. This prevents layout shifts and maintains visual structure.

### ISR Revalidation Failures

If Sanity is unreachable during ISR revalidation, Next.js serves the last successfully cached version (stale-while-revalidate). No user-facing error is shown. The content may be up to the last build age + 60s old.


## Testing Strategy

### Dual Testing Approach

Unit tests verify specific examples, edge cases, and component rendering. Property tests verify universal invariants across generated inputs. Both are necessary for comprehensive coverage.

**Unit tests** focus on:
- Specific rendered output for known inputs (component snapshots)
- Correct navigation structure and links
- Form validation logic with concrete examples
- Blog post and project rendering with sample data

**Property tests** focus on:
- Invariants that hold across all valid inputs (any project, any experience entry, any blog post)
- Filtering correctness (any systems-category project stays on systems page)
- Alternating layout correctness (any index produces correct image position)
- Validation rejection (any whitespace-only or malformed email is rejected)

**Integration tests** (example-based, not property-based):
- Sanity GROQ query returns expected shape
- Resend API called with correct payload on form submit

### Test Infrastructure

- **Test runner**: Vitest (compatible with Next.js App Router, fast, TypeScript-native)
- **Component rendering**: `@testing-library/react`
- **Property testing**: `fast-check` (TypeScript-native PBT library)
- **Mocking**: `vi.mock` for Sanity client, Resend, `next/navigation`

### Property Test Configuration

- Minimum 100 iterations per property (fast-check default)
- Tag format: `fc.assert(fc.property(...), { numRuns: 100 })`
- Each property test file references its design property number in a comment


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

**Property Reflection:** All 18 properties below are distinct. No consolidation was possible — each validates a different component, data type, or behavioral invariant. Properties 8 and 9 share the same pattern (category filter) but test different pages and different filter values, so both are retained. Property 6 covers the divider count invariant for both experience and blog row lists. Properties 7, 8, and 9 now additionally validate against Sanity GROQ query output rather than static arrays, but the invariants themselves are unchanged. Property 14 is extended to cover all 5 Sanity schemas.

---

### Property 1: Navigation renders on every valid route

*For any* route defined in the sitemap (`/`, `/experience`, `/projects`, `/projects/systems`, `/projects/media`, `/about`, `/blog`, `/contact`), when the page is rendered, the `Nav` component SHALL be present in the output.

**Validates: Requirements 2.1**

---

### Property 2: Nav item hrefs match defined route mapping

*For any* nav item object in the `navItems` configuration array, the `href` property SHALL exactly match its corresponding defined route, such that no nav item points to a route not present in the sitemap.

**Validates: Requirements 2.3**

---

### Property 3: Active nav item receives accent styling for any route

*For any* valid page route in the sitemap, when the `Nav` component is rendered with that route as the active pathname, the nav item whose `href` matches that route SHALL have the accent color class applied, and no other nav item SHALL have the accent color class.

**Validates: Requirements 2.5**

---

### Property 4: Metadata row renders all defined labels

*For any* label in the set `["Sri Lanka", "AI", "Multimedia", "Design", "Web", "Cloud"]`, when the `MetadataRow` component is rendered with the full label array, the rendered output SHALL contain that label as a visible text node.

**Validates: Requirements 3.5**

---

### Property 5: Experience row renders all required fields for any entry

*For any* `ExperienceEntry` object with non-empty role, organisation, and dateRange fields, when the `ExperienceRow` component is rendered with that entry, the rendered output SHALL contain the role title, organisation name, and date range as non-empty text nodes.

**Validates: Requirements 4.2**

---

### Property 6: Divider count invariant — n rows produce n−1 dividers

*For any* array of `n` items (n > 1) rendered as a list of rows with dividers (ExperienceList or BlogList), the rendered output SHALL contain exactly `n - 1` divider elements, ensuring every consecutive pair of rows is separated by exactly one divider and no extra dividers are added.

**Validates: Requirements 4.3, 7.3**

---

### Property 7: Projects page renders every published project returned from Sanity

*For any* array of published `Project` objects returned from a mocked Sanity GROQ query, when the `/projects` page is rendered with that data, a `ProjectRow` for each project in the array SHALL be present in the output such that no project is silently omitted. This invariant holds regardless of whether the data originates from a static array or a Sanity GROQ query — the rendering contract is identical.

**Validates: Requirements 5.1, 5.11**

---

### Property 8: Systems page only renders systems-category projects

*For any* project rendered on the `/projects/systems` page (data sourced from the Sanity `SYSTEMS_PROJECTS_QUERY` or a mock returning the same shape), the project's `category` field SHALL equal `"systems"`. No project with `category === "media"` SHALL appear in the rendered output.

**Validates: Requirements 5.3, 5.12**

---

### Property 9: Media page only renders media-category projects

*For any* project rendered on the `/projects/media` page (data sourced from the Sanity `MEDIA_PROJECTS_QUERY` or a mock returning the same shape), the project's `category` field SHALL equal `"media"`. No project with `category === "systems"` SHALL appear in the rendered output.

**Validates: Requirements 5.4, 5.13**

---

### Property 10: ProjectRow renders all required fields for any project

*For any* `Project` object, when the `ProjectRow` component is rendered with that project, the rendered output SHALL contain the project title, a non-empty description string, the category label, and a link element with `href` equal to `/projects/[project.slug]`.

**Validates: Requirements 5.6**

---

### Property 11: Project row image position alternates by index

*For any* array of projects rendered as a `ProjectList`, for each project at position `i` (1-indexed), the `ProjectRow` component SHALL place the image container before the text container in the DOM when `i` is odd, and after the text container when `i` is even.

**Validates: Requirements 5.7**

---

### Property 12: Project detail page renders all required fields for any project

*For any* `Project` object, when the project detail page is rendered with that project's data, the rendered output SHALL contain: the project title, an image element (or accent-color placeholder when `image` is `null`), the full description, a non-empty tools list, and a back link with `href` equal to `/projects`.

**Validates: Requirements 5.9**

---

### Property 13: Blog post preview row renders all required fields for any post

*For any* `BlogPostPreview` object, when the `BlogPostRow` component is rendered with that post, the rendered output SHALL contain the post title, a formatted publication date string, a category label, and an excerpt of no more than 30 words.

**Validates: Requirements 7.2**

---

### Property 14: All Sanity schemas contain their required field definitions

*For any* field name in the required set for each schema — `post`: `["title", "slug", "publishedAt", "excerpt", "body", "category", "author"]`; `project`: `["title", "slug", "category", "description", "fullDescription", "featuredImage", "tools", "order", "featured", "published"]`; `experience`: `["role", "organisation", "dateRange", "description", "category", "order", "current"]`; `skill`: `["label", "order"]`; `siteSettings`: `["name", "role", "bio", "portrait", "email", "linkedIn", "metaDescription"]` — the corresponding Sanity schema definition object SHALL contain a field entry with that exact `name` value.

**Validates: Requirements 7.8, 11.1, 11.2, 11.3, 11.4, 11.5**

---

### Property 15: Blog post detail page renders all required fields for any post

*For any* `BlogPost` object with non-empty title, author, publishedAt, and body fields, when the blog post detail page is rendered with that post's data, the rendered output SHALL contain: the post title, the author name, a formatted publication date, a non-empty rendered body, and a back link with `href` equal to `/blog`.

**Validates: Requirements 7.5**

---

### Property 16: Contact form renders all required input fields

*For any* required field name in the set `["Name", "Email", "Subject", "Message"]`, when the `ContactForm` component is rendered, the form output SHALL contain an input or textarea element associated with that field label or name attribute.

**Validates: Requirements 8.2**

---

### Property 17: Submitting with any empty required field triggers validation and blocks API call

*For any* required field in `["name", "email", "subject", "message"]`, when the `ContactForm` is submitted with that field left empty and all other fields containing valid values, the form SHALL display an inline validation error associated with that specific field AND SHALL NOT invoke the contact API endpoint.

**Validates: Requirements 8.6**

---

### Property 18: Any invalid email string triggers format validation and blocks API call

*For any* string that does not conform to the pattern `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` (including empty strings, strings without `@`, strings without a domain), when that string is entered in the email field of `ContactForm` and the form is submitted with all other fields valid, the form SHALL display an inline validation error on the email field AND SHALL NOT invoke the contact API endpoint.

**Validates: Requirements 8.7**


## Implementation Plan

### Phase 1 — Foundation (Days 1–3)

1. Scaffold Next.js 14+ App Router project with TypeScript and Tailwind CSS.
2. Configure `tailwind.config.ts` with all design tokens (colors, font, spacing aliases).
3. Install and configure `next/font` for Geist Sans.
4. Create `src/types/index.ts` with all TypeScript interfaces (Sanity-shaped: `Project`, `ExperienceEntry`, `Skill`, `SiteSettings`, `SanityImage`, `BlogPostPreview`, `BlogPost`, `ContactFormPayload`, `NavItem`).
5. Create `src/data/nav.ts` with the static navigation config (navigation items do not change at runtime).
6. Create `src/data/seed/` directory with optional development seed data matching the Sanity schema shapes — for local development fallback only, never imported in production builds.
7. Set up `.env.local` with all required environment variables (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_TOKEN`, `RESEND_API_KEY`, `CONTACT_EMAIL`).
8. Build `RootLayout`, `Nav` (desktop + mobile hamburger), `Footer`, `Divider`, `PageHeader`, `Button`, `BackLink`.

### Phase 2 — Layout Components (Days 4–5)

1. Build `Hero`, `MetadataRow` — props match the `SiteSettings` and static label shapes.
2. Build `ExperienceRow`, `ExperiencePreview` — props typed against `ExperienceEntry` (Sanity shape).
3. Build `ProjectRow` with alternating index logic — props typed against `Project` (Sanity shape, `featuredImage: SanityImage | null`).
4. Build `AboutEditorial`, `ContactCTA`, `BlogPreview`, `BlogPostRow` — all typed against their respective Sanity-shaped interfaces.

### Phase 3 — Core Pages (Days 6–8)

1. Wire `/experience` page — component structure in place, Sanity data wired in Phase 4.
2. Wire `/projects`, `/projects/systems`, `/projects/media` pages — component structure in place, Sanity data wired in Phase 4.
3. Wire `/about` page — component structure in place, Sanity data wired in Phase 4.
4. Wire `/` homepage — component structure in place, Sanity data wired in Phase 4.

> All components are built using the TypeScript interfaces that match the Sanity document shapes. During this phase, components can be developed against the seed data in `src/data/seed/` to verify layout and rendering before CMS is wired.

### Phase 4 — Sanity CMS Setup & Data Wiring (Days 9–12)

1. Create Sanity project via `sanity.io`, configure dataset (`production`).
2. Define all 5 schemas: `project`, `experience`, `skill`, `post`, `siteSettings`.
3. Register all schemas in `sanity.config.ts`. Configure `siteSettings` as a singleton.
4. Seed the CMS with all real content:
   - 6 projects (4 systems, 2 media) with real images uploaded to Sanity asset CDN (≥1200×800px), `published: true`
   - 5 experience entries with real role/org/date data, `order` field set
   - 9 skills in the defined discipline order
   - 1+ published blog post
   - 1 `siteSettings` document with bio (Portable Text), portrait, email, LinkedIn
5. Install `next-sanity`, `@portabletext/react`.
6. Build `src/lib/sanity/client.ts` (authenticated server-side client using `SANITY_API_TOKEN`).
7. Build `src/lib/sanity/queries.ts` with all GROQ queries: `ALL_PUBLISHED_PROJECTS_QUERY`, `SYSTEMS_PROJECTS_QUERY`, `MEDIA_PROJECTS_QUERY`, `PROJECT_BY_SLUG_QUERY`, `ALL_PROJECT_SLUGS_QUERY`, `FEATURED_PROJECTS_QUERY`, `ALL_EXPERIENCE_QUERY`, `FEATURED_EXPERIENCE_QUERY`, `ALL_SKILLS_QUERY`, `SITE_SETTINGS_QUERY`, `ALL_POSTS_QUERY`, `LATEST_POSTS_QUERY`, `POST_BY_SLUG_QUERY`, `ALL_POST_SLUGS_QUERY`.
8. Wire all pages to Sanity with ISR (`export const revalidate = 60`):
   - `/` — `FEATURED_PROJECTS_QUERY`, `FEATURED_EXPERIENCE_QUERY`, `LATEST_POSTS_QUERY`, `SITE_SETTINGS_QUERY`
   - `/experience` — `ALL_EXPERIENCE_QUERY`
   - `/projects` — `ALL_PUBLISHED_PROJECTS_QUERY`
   - `/projects/systems` — `SYSTEMS_PROJECTS_QUERY`
   - `/projects/media` — `MEDIA_PROJECTS_QUERY`
   - `/projects/[slug]` — `PROJECT_BY_SLUG_QUERY` + `generateStaticParams` from `ALL_PROJECT_SLUGS_QUERY`; call `notFound()` if project is missing or `published !== true`
   - `/about` — `SITE_SETTINGS_QUERY` + `ALL_SKILLS_QUERY`
   - `/blog` — `ALL_POSTS_QUERY`
   - `/blog/[slug]` — `POST_BY_SLUG_QUERY` + `generateStaticParams` from `ALL_POST_SLUGS_QUERY`; call `notFound()` if post is missing
9. Build `ArticleHeader`, `ArticleBody` (PortableText renderer with custom components for h2, h3, p, a, blockquote).
10. Add `not-found.tsx` for missing blog posts and project detail pages.

### Phase 5 — Contact & API (Days 13–14)

1. Build `ContactForm` with client-side validation (native React state, no form library).
2. Build `/api/contact` Route Handler with Resend.
3. Connect form to API route, implement `idle / submitting / success / error` states.
4. Build `ContactInfo` component.

### Phase 6 — Polish, SEO & Launch (Days 15–16)

1. Add `generateMetadata()` to all page files. For CMS-driven pages, pull `metaDescription` from `siteSettings` or the document's own fields.
2. Audit all images — confirm `alt` text is set in Sanity, confirm dimensions ≥ 1200×800px.
3. Verify accent-color placeholder panels display correctly for any project with `featuredImage: null`.
4. Full responsive pass: 375px, 768px, 1024px, 1440px.
5. Run `tsc --noEmit` and ESLint — fix all errors.
6. Deploy to Vercel, set all env vars in Vercel dashboard.
7. Run Lighthouse on deployed URL against all primary pages. Fix any score regressions.
8. Confirm at least 1 blog post is published and visible at `/blog`.
