# Implementation Plan: Taher Hussain Portfolio

## Overview

Build a fully production-ready personal portfolio site with Next.js 14+ App Router, TypeScript, Tailwind CSS, Sanity CMS (headless backend for all updatable content), Resend (contact form), and Vercel deployment. All project, experience, skill, and site settings content is fetched from Sanity CMS via GROQ queries — no static TypeScript data files for content in production. The site uses ISR (revalidate: 60s) on all CMS-driven pages and SSG for the contact page only.

---

## Tasks

- [x] 1. Scaffold project foundation and design system
  - [x] 1.1 Initialise Next.js 14+ App Router project with TypeScript strict mode and Tailwind CSS
    - Run `create-next-app` with TypeScript, Tailwind, App Router, `src/` directory
    - Confirm `tsconfig.json` has `"strict": true`
    - _Requirements: 9.1, 9.7, 9.8_

  - [x] 1.2 Configure Tailwind design tokens
    - Extend `tailwind.config.ts` with all color tokens: `bg: '#111111'`, `surface: '#181818'`, `primary: '#F5F2EE'`, `secondary: '#888888'`, `accent: '#C9A96E'`, `divider: 'rgba(255,255,255,0.08)'`
    - Add typography scale aliases and spacing utilities per design spec
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

  - [x] 1.3 Install and configure `next/font` for Geist Sans
    - Import Geist Sans via `next/font/google`, inject CSS variables into `<html>` in `src/app/layout.tsx`
    - Add optional DM Serif Display variable for hero display text
    - _Requirements: 1.5_

  - [x] 1.4 Create `src/types/index.ts` with all Sanity-shaped TypeScript interfaces
    - Define `SanityImage { asset: { _ref, _type }, hotspot?, alt? }`
    - Define `Project { _id, slug, title, category, description, fullDescription, featuredImage: SanityImage | null, galleryImages?, tools, order, featured, published }`
    - Define `ExperienceEntry { _id, role, organisation, dateRange, description, category, order, current }`
    - Define `Skill { _id, label, order }`
    - Define `SiteSettings { name, role, bio, portrait, email, linkedIn?, metaDescription }`
    - Define `BlogPostPreview`, `BlogPost`, `ContactFormPayload`, `NavItem` per design spec
    - _Requirements: 5.16, 4.8, 6.8, 6.9, 7.8_

  - [x] 1.5 Create `src/data/nav.ts` with static navigation config
    - Export `navItems: NavItem[]` with all 6 items in the exact defined order including the nested Projects dropdown children
    - This file is the only static data file in `src/data/` — no static content arrays
    - _Requirements: 2.2, 2.3, 2.4_

  - [x]* 1.6 Create `src/data/seed/` directory with development seed data
    - Create `src/data/seed/projects.ts` exporting a `Project[]` array of 6 sample projects (4 systems, 2 media) matching the Sanity `Project` interface shape
    - Create `src/data/seed/experience.ts` exporting an `ExperienceEntry[]` array of 5 entries matching the Sanity `ExperienceEntry` interface shape
    - Create `src/data/seed/skills.ts` exporting a `Skill[]` array of 9 entries matching the Sanity `Skill` interface shape
    - Guard all seed imports with `if (process.env.NODE_ENV !== 'production')` — seed data MUST NOT be imported in production builds
    - _Requirements: 10.7, 10.8_

  - [x] 1.7 Set up `.env.local` with all required environment variables
    - Add placeholder entries: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_TOKEN`, `RESEND_API_KEY`, `CONTACT_EMAIL`
    - Add `.env.local` to `.gitignore`
    - _Requirements: 10.4, 10.5, 10.6_

- [x] 2. Build layout components
  - [x] 2.1 Build `RootLayout` (`src/app/layout.tsx`) and `Footer` component
    - Wire font CSS variables into `<html>` tag
    - Mount `Nav` and `Footer` around `{children}` in the root layout
    - `Footer` renders static copyright with a thin top divider
    - _Requirements: 1.6, 2.1_

  - [x] 2.2 Build `Nav` component with desktop dropdown and mobile hamburger
    - Reads `navItems` from `src/data/nav.ts`
    - Uses `usePathname()` to apply accent color class to the active nav item
    - Renders Projects dropdown on hover (desktop) with `Digital Systems Lab → /projects/systems` and `Media Gallery → /projects/media`
    - Renders hamburger collapse menu on viewports < 768px
    - Fixed/sticky positioning at top of viewport
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8_

  - [ ]* 2.3 Write property test for Nav active state (Property 3)
    - **Property 3: Active nav item receives accent styling for any route**
    - For any valid route in the sitemap, render `Nav` with that pathname and assert exactly one nav item has the accent color class
    - **Validates: Requirements 2.5**

  - [x]* 2.4 Write property test for Nav href mapping (Property 2)
    - **Property 2: Nav item hrefs match defined route mapping**
    - For any nav item in `navItems`, assert the `href` matches a defined sitemap route
    - **Validates: Requirements 2.3**

  - [x] 2.5 Build `PageHeader`, `Divider`, `Button`, `BackLink`, `CategoryBadge` shared primitives
    - `Divider`: `<hr className="border-t border-divider" />`
    - `Button`: 1px accent border, transparent bg default; fills accent on hover; renders as `<Link>` if `href` prop provided
    - `PageHeader`: displays heading + optional subheading in editorial type size
    - `BackLink`: renders an arrow + label link
    - `CategoryBadge`: styles `systems` and `media` labels distinctly
    - _Requirements: 1.6, 1.10_

- [x] 3. Build shared content row components
  - [x] 3.1 Build `ExperienceRow` component typed against Sanity `ExperienceEntry`
    - Renders role title, organisation name, date range, and one-line description in a horizontal row
    - Applies accent color to role title on hover (no layout shift)
    - Renders `<Divider />` below row when `showDivider` prop is true (default true)
    - _Requirements: 4.2, 4.3, 4.5_

  - [x]* 3.2 Write property test for ExperienceRow (Property 5)
    - **Property 5: Experience row renders all required fields for any entry**
    - Use `fast-check` to generate arbitrary `ExperienceEntry` objects with non-empty role, organisation, dateRange; assert rendered output contains all three as text nodes
    - **Validates: Requirements 4.2**

  - [x] 3.3 Build `ProjectRow` component typed against Sanity `Project`
    - Accepts `project: Project` and `index: number` (1-indexed)
    - Odd index: image left, text right; even index: image right, text left
    - Renders full-bleed image via `next/image` (≥50% row width on desktop) or accent-color placeholder panel when `featuredImage` is `null`
    - Renders title, description (30–60 words), category badge, and "View" link to `/projects/[slug]`
    - Hover: background shifts to `surface`, opacity 0.9 — no scale transform
    - On mobile (< 768px): image stacks above text block
    - _Requirements: 5.5, 5.6, 5.7, 5.8, 5.10, 9.3, 9.4_

  - [x]* 3.4 Write property test for ProjectRow alternating layout (Property 11)
    - **Property 11: Project row image position alternates by index**
    - Generate arbitrary 1-indexed values; assert image container precedes text container in DOM when index is odd and follows when even
    - **Validates: Requirements 5.7**

  - [x]* 3.5 Write property test for ProjectRow required fields (Property 10)
    - **Property 10: ProjectRow renders all required fields for any project**
    - Generate arbitrary `Project` objects; assert rendered output contains title, non-empty description, category label, and link with `href === /projects/[slug]`
    - **Validates: Requirements 5.6**

  - [x] 3.6 Build `BlogPostRow` component typed against Sanity `BlogPostPreview`
    - Renders post title, formatted publication date, category label, and excerpt (≤ 30 words)
    - Renders `<Divider />` when `showDivider` is true (default true)
    - _Requirements: 7.2, 7.3_

  - [x]* 3.7 Write property test for BlogPostRow (Property 13)
    - **Property 13: Blog post preview row renders all required fields for any post**
    - Generate arbitrary `BlogPostPreview` objects; assert rendered output contains title, formatted date, category, and excerpt ≤ 30 words
    - **Validates: Requirements 7.2**

  - [ ]* 3.8 Write property test for divider count invariant (Property 6)
    - **Property 6: n rows produce n−1 dividers**
    - Generate arrays of n > 1 items for ExperienceList and BlogList; assert rendered output contains exactly n−1 divider elements
    - **Validates: Requirements 4.3, 7.3**

- [x] 4. Build homepage sections and homepage page
  - [x] 4.1 Build `Hero` and `MetadataRow` components
    - `Hero`: renders name, role label, bold statement, paragraph (≤ 60 words), two CTAs ("View Projects" → `/projects`, "Contact" → `/contact`), and `MetadataRow`
    - `MetadataRow`: renders `["Sri Lanka", "AI", "Multimedia", "Design", "Web", "Cloud"]` as dot-separated inline labels (no pill badges)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [ ]* 4.2 Write property test for MetadataRow (Property 4)
    - **Property 4: Metadata row renders all defined labels**
    - For any label in the defined set, assert it appears as a visible text node in rendered output
    - **Validates: Requirements 3.5**

  - [x] 4.3 Build `ExperiencePreview`, `AboutEditorial`, `BlogPreview`, `ContactCTA` homepage section components
    - `ExperiencePreview`: renders exactly 5 `ExperienceRow` components + "Full experience →" link to `/experience`
    - `AboutEditorial`: renders 60–120 word paragraph in large type + "Read more →" link to `/about`
    - `BlogPreview`: renders exactly 3 `BlogPostRow` components + "All posts →" link to `/blog`
    - `ContactCTA`: renders short prompt line + "Get in touch →" link to `/contact`
    - _Requirements: 3.6, 3.7, 3.8, 3.9, 3.10_

  - [x] 4.4 Wire homepage (`src/app/page.tsx`) with seed data for layout validation
    - Compose all sections: `Hero`, `ExperiencePreview`, `ProjectsPreview`, `AboutEditorial`, `BlogPreview`, `ContactCTA` with `<Divider />` between each
    - Use seed data from `src/data/seed/` during this phase for layout verification
    - Mark this page for Sanity wiring in Task 8
    - `export const revalidate = 60`
    - _Requirements: 3.6, 3.7, 3.8, 3.9, 3.10, 3.11_

  - [ ]* 4.5 Write property test for Nav presence on all routes (Property 1)
    - **Property 1: Navigation renders on every valid route**
    - For any route in the sitemap array, render the page and assert the `Nav` component is present in the output
    - **Validates: Requirements 2.1**

- [x] 5. Build experience, projects, and about pages
  - [x] 5.1 Wire `/experience` page (`src/app/experience/page.tsx`)
    - Compose `PageHeader "Experience"`, then map all `ExperienceEntry` items to `<ExperienceRow>` with dividers
    - Use seed data for layout validation; mark for Sanity wiring in Task 8
    - `export const revalidate = 60`
    - _Requirements: 4.1, 4.2, 4.3_

  - [x] 5.2 Wire `/projects` page (`src/app/projects/page.tsx`)
    - Compose `PageHeader "Projects"`, category sub-links, then map all project items to `<ProjectRow index={i+1}>`
    - Use seed data for layout validation; mark for Sanity wiring in Task 8
    - `export const revalidate = 60`
    - _Requirements: 5.1, 5.2_

  - [x] 5.3 Wire `/projects/systems` and `/projects/media` pages
    - `systems/page.tsx`: `PageHeader "Digital Systems Lab"` with subheading `"AI · Web · Cloud · Robotics"`, filter to category `"systems"` only
    - `media/page.tsx`: `PageHeader "Media Gallery"` with subheading `"Video · Photography · Visual Production"`, filter to category `"media"` only
    - Use seed data for layout validation; mark for Sanity wiring in Task 8
    - `export const revalidate = 60`
    - _Requirements: 5.3, 5.4_

  - [x] 5.4 Build project detail components and wire `/projects/[slug]` page
    - Build `ProjectHero` (full-bleed image ~60vh + title overlay, or accent-color placeholder when `image` is `null`), `ProjectBody` (full description prose), `ToolsGrid` (clean typographic list, NOT icon grid)
    - Wire `src/app/projects/[slug]/page.tsx`: `BackLink "← Projects"`, `ProjectHero`, `ProjectBody`
    - Use seed data for layout validation; mark for Sanity wiring in Task 8
    - `export const revalidate = 60`
    - _Requirements: 5.9, 5.10_

  - [ ]* 5.5 Write property test for project detail page required fields (Property 12)
    - **Property 12: Project detail page renders all required fields for any project**
    - Generate arbitrary `Project` objects; assert rendered output contains title, image or placeholder, description, tools list, and back link to `/projects`
    - **Validates: Requirements 5.9**

  - [x] 5.6 Wire `/about` page (`src/app/about/page.tsx`)
    - Compose `PageHeader "About"`, 12-col grid (bio col 1–7, portrait col 8–12), `DisciplinesList`, `ContactPrompt "Let's work together →" → /contact`
    - Use seed data + placeholder portrait for layout validation; mark for Sanity wiring in Task 8
    - `export const revalidate = 60`
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 6. Build blog pages
  - [x] 6.1 Wire `/blog` page (`src/app/blog/page.tsx`)
    - Compose `PageHeader "Writing"`, then map all post items to `<BlogPostRow>` with dividers
    - Use seed data for layout validation; mark for Sanity wiring in Task 8
    - `export const revalidate = 60`
    - _Requirements: 7.1, 7.2, 7.3_

  - [x] 6.2 Build `ArticleHeader` and `ArticleBody` blog components
    - `ArticleHeader`: renders H1 title, "Taher Hussain", formatted date, category
    - `ArticleBody`: renders Portable Text blocks via `@portabletext/react` with custom components for h2, h3, p, a, blockquote; applies editorial typographic styles with appropriate heading hierarchy and paragraph spacing
    - _Requirements: 7.5, 7.6_

  - [x] 6.3 Wire `/blog/[slug]` page (`src/app/blog/[slug]/page.tsx`)
    - Compose `BackLink "← Writing"`, `ArticleHeader`, `<Divider />`, `ArticleBody`, `<Divider />`, `BackLink "← Back to Writing"`
    - Mark for Sanity wiring in Task 8 (call `notFound()` when post is missing)
    - `export const revalidate = 60`
    - Add `src/app/blog/[slug]/not-found.tsx` with "Post not found." message and back link to `/blog`
    - _Requirements: 7.4, 7.5, 7.6, 7.7_

  - [ ]* 6.4 Write property test for blog post detail page required fields (Property 15)
    - **Property 15: Blog post detail page renders all required fields for any post**
    - Generate arbitrary `BlogPost` objects with non-empty title, author, publishedAt, body; assert rendered output contains all five required fields including back link to `/blog`
    - **Validates: Requirements 7.5**

- [x] 7. Checkpoint — layout and component pass
  - Ensure all pages render correctly against seed data at 375px, 768px, 1024px, 1440px
  - Run `tsc --noEmit` and ESLint — fix all type errors and lint violations
  - Ensure all tests pass, ask the user if questions arise

- [x] 8. Sanity CMS — schema definitions
  - [x] 8.1 Create Sanity project and configure dataset
    - Run `npm create sanity@latest` in the project root, configure project name, `production` dataset
    - Verify `sanity.config.ts` and `sanity/` directory are created
    - _Requirements: 11.6_

  - [x] 8.2 Define `project` schema (`sanity/schemas/project.ts`)
    - Fields: `title` (string, required), `slug` (slug from title, required), `category` (string list: `["systems","media"]`, required), `description` (text, max 150), `fullDescription` (Portable Text array), `featuredImage` (image + hotspot + alt), `galleryImages` (array of images + alt), `tools` (array of strings), `order` (number), `featured` (boolean, default false), `published` (boolean, default false)
    - Add preview and ordering config
    - _Requirements: 5.16, 11.1_

  - [x] 8.3 Define `experience` schema (`sanity/schemas/experience.ts`)
    - Fields: `role` (string, required), `organisation` (string, required), `dateRange` (string, required), `description` (string), `category` (string list: `["leadership","robotics","media","web","creative-tech"]`), `order` (number), `current` (boolean, default false)
    - Add preview and ordering config
    - _Requirements: 4.8, 11.2_

  - [x] 8.4 Define `skill` schema (`sanity/schemas/skill.ts`)
    - Fields: `label` (string, required), `order` (number)
    - Add preview config
    - _Requirements: 6.8, 11.3_

  - [x] 8.5 Define `post` schema (`sanity/schemas/post.ts`)
    - Fields: `title` (string, required), `slug` (slug from title, required), `publishedAt` (datetime, required), `excerpt` (text, max 300), `body` (Portable Text array + image blocks with alt), `category` (string), `author` (string, default `"Taher Hussain"`)
    - Add preview config
    - _Requirements: 7.8, 11.4_

  - [x] 8.6 Define `siteSettings` singleton schema (`sanity/schemas/siteSettings.ts`)
    - Fields: `name` (string), `role` (string), `bio` (Portable Text array), `portrait` (image + hotspot + alt), `email` (string), `linkedIn` (URL), `metaDescription` (string)
    - Configure as singleton in `sanity.config.ts` so only one document of this type can exist
    - _Requirements: 6.9, 11.5_

  - [x] 8.7 Register all 5 schemas in `sanity.config.ts`
    - Import and add `projectSchema`, `experienceSchema`, `skillSchema`, `postSchema`, `siteSettingsSchema` to the `schema.types` array
    - Configure `siteSettings` singleton plugin/desk structure
    - _Requirements: 11.6_

  - [x]* 8.8 Write property test for all Sanity schema field completeness (Property 14)
    - **Property 14: All Sanity schemas contain their required field definitions**
    - For each of the 5 schemas, for any required field name in its defined set (`post`: `["title","slug","publishedAt","excerpt","body","category","author"]`; `project`: `["title","slug","category","description","fullDescription","featuredImage","tools","order","featured","published"]`; `experience`: `["role","organisation","dateRange","description","category","order","current"]`; `skill`: `["label","order"]`; `siteSettings`: `["name","role","bio","portrait","email","linkedIn","metaDescription"]`), assert the schema definition object contains a field entry with that exact `name` value
    - **Validates: Requirements 7.8, 11.1, 11.2, 11.3, 11.4, 11.5**

- [x] 9. Sanity CMS — client, GROQ queries, and data wiring
  - [x] 9.1 Implement Sanity client (`src/lib/sanity/client.ts`)
    - Create authenticated server-side client using `createClient` from `next-sanity`
    - Configure `projectId` from `NEXT_PUBLIC_SANITY_PROJECT_ID`, `dataset` from `NEXT_PUBLIC_SANITY_DATASET` (default `"production"`), `apiVersion: "2024-01-01"`, `useCdn: false`, `token` from `SANITY_API_TOKEN` (server-side only, never exposed to client)
    - _Requirements: 9.5, 10.5_

  - [x] 9.2 Implement all GROQ queries (`src/lib/sanity/queries.ts`)
    - Projects: `ALL_PUBLISHED_PROJECTS_QUERY`, `SYSTEMS_PROJECTS_QUERY`, `MEDIA_PROJECTS_QUERY`, `PROJECT_BY_SLUG_QUERY`, `ALL_PROJECT_SLUGS_QUERY`, `FEATURED_PROJECTS_QUERY`
    - Experience: `ALL_EXPERIENCE_QUERY`, `FEATURED_EXPERIENCE_QUERY`
    - Skills: `ALL_SKILLS_QUERY`
    - Site settings: `SITE_SETTINGS_QUERY`
    - Blog: `ALL_POSTS_QUERY`, `LATEST_POSTS_QUERY`, `POST_BY_SLUG_QUERY`, `ALL_POST_SLUGS_QUERY`
    - All queries match the exact GROQ strings defined in the design document
    - _Requirements: 4.6, 4.7, 5.11, 5.12, 5.13, 5.14, 5.15, 6.6, 6.7, 7.1_

  - [x]* 9.3 Write property test for projects page renders all published projects (Property 7)
    - **Property 7: Projects page renders every published project returned from Sanity**
    - Mock the Sanity client to return an arbitrary array of published `Project` objects matching the GROQ query shape; render the `/projects` page with that data; assert a `ProjectRow` for each project is present — no project is silently omitted
    - **Validates: Requirements 5.1, 5.11**

  - [x]* 9.4 Write property test for systems page category filter (Property 8)
    - **Property 8: Systems page only renders systems-category projects**
    - Mock `SYSTEMS_PROJECTS_QUERY` to return an arbitrary array of projects; for any project rendered on the systems page, assert `category === "systems"` and no `category === "media"` project appears
    - **Validates: Requirements 5.3, 5.12**

  - [x]* 9.5 Write property test for media page category filter (Property 9)
    - **Property 9: Media page only renders media-category projects**
    - Mock `MEDIA_PROJECTS_QUERY` to return an arbitrary array of projects; for any project rendered on the media page, assert `category === "media"` and no `category === "systems"` project appears
    - **Validates: Requirements 5.4, 5.13**

  - [x] 9.6 Wire `/projects` page to `ALL_PUBLISHED_PROJECTS_QUERY` with ISR
    - Replace seed data with `sanityClient.fetch(ALL_PUBLISHED_PROJECTS_QUERY)` in `src/app/projects/page.tsx`
    - `export const revalidate = 60`
    - _Requirements: 5.11_

  - [x] 9.7 Wire `/projects/systems` and `/projects/media` pages with ISR
    - Replace seed data with `SYSTEMS_PROJECTS_QUERY` in `systems/page.tsx` and `MEDIA_PROJECTS_QUERY` in `media/page.tsx`
    - `export const revalidate = 60` on both pages
    - _Requirements: 5.12, 5.13_

  - [x] 9.8 Wire `/projects/[slug]` with `PROJECT_BY_SLUG_QUERY` + `generateStaticParams` + `notFound()`
    - Fetch project via `PROJECT_BY_SLUG_QUERY` with `$slug` parameter
    - Call `notFound()` if project is missing or `published !== true`
    - Implement `generateStaticParams()` using `ALL_PROJECT_SLUGS_QUERY` to pre-render all published slugs at build time
    - Add `src/app/projects/[slug]/not-found.tsx` with back link to `/projects`
    - `export const revalidate = 60`
    - _Requirements: 5.14, 5.15_

  - [x] 9.9 Wire `/experience` page to `ALL_EXPERIENCE_QUERY` with ISR
    - Replace seed data with `sanityClient.fetch(ALL_EXPERIENCE_QUERY)` in `src/app/experience/page.tsx`
    - `export const revalidate = 60`
    - _Requirements: 4.6_

  - [x] 9.10 Wire `/blog` page to `ALL_POSTS_QUERY` with ISR
    - Replace seed data with `sanityClient.fetch(ALL_POSTS_QUERY)` in `src/app/blog/page.tsx`
    - `export const revalidate = 60`
    - _Requirements: 7.1_

  - [x] 9.11 Wire `/blog/[slug]` with `POST_BY_SLUG_QUERY` + `generateStaticParams` + `notFound()`
    - Fetch post via `POST_BY_SLUG_QUERY` with `$slug` parameter
    - Call `notFound()` if post is missing
    - Implement `generateStaticParams()` using `ALL_POST_SLUGS_QUERY`
    - `export const revalidate = 60`
    - _Requirements: 7.4, 7.7_

  - [x] 9.12 Wire `/about` page to `SITE_SETTINGS_QUERY` + `ALL_SKILLS_QUERY` with ISR
    - Replace seed data with parallel Sanity fetches for both queries
    - Render bio from Portable Text using `@portabletext/react`, portrait via `next/image` with hotspot support
    - `export const revalidate = 60`
    - _Requirements: 6.6, 6.7_

  - [x] 9.13 Wire homepage (`/`) to all 4 Sanity queries with ISR
    - Fetch `FEATURED_PROJECTS_QUERY` (6 projects), `FEATURED_EXPERIENCE_QUERY` (5 entries), `LATEST_POSTS_QUERY` (3 posts), `SITE_SETTINGS_QUERY`
    - Replace seed data with live Sanity data
    - `export const revalidate = 60`
    - _Requirements: 3.6, 3.7, 3.9, 4.7_

- [x] 10. Seed real content into Sanity CMS
  - [x] 10.1 Seed all real content into Sanity Studio
    - Create 6 project documents (4 systems, 2 media): TaherHussainCreations, Starsons Digital Presence, Pixel Perfect V1, WRO / EchoLens, YOUTH 2K25, Memento — all with `published: true`, images uploaded to Sanity asset CDN (≥ 1200×800px), `order` field set
    - Create 5 experience documents in the order defined: Founder · TaherHussainCreations, CTO · Starsons, Head of IT & Media · Starsons, Vice President · ICT Society, Editor · Interact Club — with `order` field set
    - Create 9 skill documents in the defined order: AI & Automation, Multimedia Production, Video & Photography, Graphic Design, Web Development, Cloud Infrastructure, Robotics, Event Media, Digital Strategy
    - Create 1+ published `post` document with real content
    - Create the `siteSettings` singleton document with bio (Portable Text), portrait uploaded to Sanity CDN, email, LinkedIn, metaDescription
    - _Requirements: 10.1, 10.2, 10.3_

- [x] 11. Checkpoint — full Sanity wiring pass
  - Verify all pages return real Sanity data (no seed data in production paths)
  - Verify ISR revalidate: 60 is set on all CMS-driven pages
  - Verify `notFound()` fires correctly for missing project and blog slugs
  - Ensure all tests pass, ask the user if questions arise

- [x] 12. Build contact form and API route
  - [x] 12.1 Build `ContactForm` component with client-side validation
    - Native React state — no form library
    - Fields: Name (text, required), Email (email, required), Subject (text, required), Message (textarea, required)
    - Validate on submit: empty required fields → inline error per field; invalid email format (regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`) → inline email error
    - `FormStatus` state: `idle | submitting | success | error`
    - On success: show accent-colored confirmation message "Message sent. I'll be in touch soon." and reset all fields
    - On error: show red-500 error message "Something went wrong. Please try again or email directly." without clearing user input
    - Submit button: disabled + text "Sending…" while submitting
    - _Requirements: 8.2, 8.4, 8.5, 8.6, 8.7_

  - [x]* 12.2 Write property test for ContactForm empty field validation (Property 17)
    - **Property 17: Submitting with any empty required field triggers validation and blocks API call**
    - For any required field in `["name","email","subject","message"]`, submit the form with that field empty and all others valid; assert inline validation error appears on that specific field and the contact API is not called
    - **Validates: Requirements 8.6**

  - [x]* 12.3 Write property test for ContactForm invalid email validation (Property 18)
    - **Property 18: Any invalid email string triggers format validation and blocks API call**
    - Generate arbitrary strings that do not match `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`; submit the form with each as the email value and all other fields valid; assert inline email validation error appears and the API is not called
    - **Validates: Requirements 8.7**

  - [x]* 12.4 Write property test for ContactForm field rendering (Property 16)
    - **Property 16: Contact form renders all required input fields**
    - For any required field name in `["Name","Email","Subject","Message"]`, assert the rendered `ContactForm` contains an input or textarea element associated with that label or name attribute
    - **Validates: Requirements 8.2**

  - [x] 12.5 Build `/api/contact` Route Handler with Resend
    - `POST /api/contact` handler: server-side validate required fields and email format → HTTP 400 if invalid
    - Call Resend API with `RESEND_API_KEY` to send message to `CONTACT_EMAIL`
    - Return HTTP 500 with `{ error: 'Failed to send.' }` on Resend failure
    - Neither `RESEND_API_KEY` nor `CONTACT_EMAIL` is exposed to the client
    - _Requirements: 8.3, 10.4, 10.6_

  - [x] 12.6 Build `ContactInfo` component and wire `/contact` page
    - `ContactInfo`: renders Taher's professional email address and optional social links as plain text elements
    - `src/app/contact/page.tsx`: `PageHeader "Contact"`, short invitational paragraph (20–50 words), 12-col grid (ContactForm col 1–7, ContactInfo col 8–12)
    - Contact page is SSG (no `revalidate` export)
    - _Requirements: 8.1, 8.8_

- [x] 13. SEO, metadata, and Polish
  - [x] 13.1 Add `generateMetadata()` to all page files
    - For CMS-driven pages, pull `metaDescription` from the Sanity `siteSettings` document (for global pages) or from the document's own fields (project title + description, blog post title + excerpt)
    - Define `<title>` and `<meta name="description">` for every route via Next.js Metadata API
    - _Requirements: 9.6_

  - [x] 13.2 Audit all images from Sanity CDN
    - Confirm every image rendered via `next/image` has a non-empty `alt` attribute sourced from Sanity
    - Confirm all project images in Sanity CDN are ≥ 1200×800px
    - Confirm accent-color placeholder panels display correctly for any project where `featuredImage` is `null`
    - _Requirements: 9.3, 9.4, 10.1, 5.10_

  - [x] 13.3 Full responsive pass and forbidden pattern audit
    - Test all pages at 375px, 768px, 1024px, 1440px viewports
    - Audit all components: remove any `backdrop-blur`, `bg-gradient-*`, `rounded-2xl`, `shadow-lg`, `scale-105` or larger, multiple accent colors, third typeface
    - _Requirements: 1.7, 1.8, 1.9, 9.7_

  - [x] 13.4 Run `tsc --noEmit` and ESLint — fix all errors
    - Zero TypeScript errors, zero ESLint violations before deploy
    - _Requirements: 9.8_

- [x] 14. Deployment and final validation
  - [x] 14.1 Deploy to Vercel and set all environment variables
    - Set `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_TOKEN`, `RESEND_API_KEY`, `CONTACT_EMAIL` in Vercel project settings — none committed to source control
    - Trigger production deployment; confirm zero build errors
    - _Requirements: 9.8, 10.4, 10.5, 10.6_

  - [x] 14.2 Run Lighthouse on deployed URL and verify scores
    - Run Lighthouse on `/`, `/projects`, `/about`, `/blog`, `/contact`
    - Performance ≥ 85 on desktop, Accessibility ≥ 90 on all pages
    - Fix any score regressions before marking done
    - _Requirements: 9.1, 9.2_

  - [x] 14.3 Final content and ISR verification
    - Confirm at least 1 blog post is published and visible at `/blog`
    - Update a Sanity document and verify the affected page reflects the change within 60 seconds
    - Confirm no static seed data is reachable in production paths
    - _Requirements: 9.9, 10.2, 10.3, 10.7, 11.7_

---

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Seed data in `src/data/seed/` is for local development only — never imported in production builds (guarded by `NODE_ENV` check)
- All CMS-driven pages use `export const revalidate = 60` for ISR — the only SSG page is `/contact`
- The Sanity `siteSettings` document is a singleton — only one document of this type is allowed in Sanity Studio
- Property tests use `fast-check` with `fc.assert(fc.property(...), { numRuns: 100 })` and reference their design property number in a comment
- Properties 7, 8, and 9 mock the Sanity client to return GROQ-shaped data — the rendering invariants are identical to the static array case
- Each property test file must include a comment referencing its design property number (e.g., `// Property 7: Projects page renders every published project returned from Sanity`)
- Checkpoints at Tasks 7 and 11 validate layout+type correctness before and after full Sanity wiring

---

## Task Dependency Graph

```json
{
  "waves": [
    {
      "id": 0,
      "tasks": ["1.1", "1.2", "1.3"]
    },
    {
      "id": 1,
      "tasks": ["1.4", "1.5", "1.6", "1.7"]
    },
    {
      "id": 2,
      "tasks": ["2.1", "2.5"]
    },
    {
      "id": 3,
      "tasks": ["2.2", "8.1"]
    },
    {
      "id": 4,
      "tasks": ["2.3", "2.4", "3.1", "3.3", "3.6", "8.2", "8.3", "8.4", "8.5", "8.6"]
    },
    {
      "id": 5,
      "tasks": ["3.2", "3.4", "3.5", "3.7", "3.8", "4.1", "8.7"]
    },
    {
      "id": 6,
      "tasks": ["4.2", "4.3", "8.8"]
    },
    {
      "id": 7,
      "tasks": ["4.4", "5.1", "5.2", "5.3", "6.1"]
    },
    {
      "id": 8,
      "tasks": ["4.5", "5.4", "5.6", "6.2", "9.1", "9.2"]
    },
    {
      "id": 9,
      "tasks": ["5.5", "6.3", "9.3", "9.4", "9.5", "9.6", "9.7", "9.9", "9.10", "9.12"]
    },
    {
      "id": 10,
      "tasks": ["6.4", "9.8", "9.11", "9.13"]
    },
    {
      "id": 11,
      "tasks": ["10.1"]
    },
    {
      "id": 12,
      "tasks": ["12.1"]
    },
    {
      "id": 13,
      "tasks": ["12.2", "12.3", "12.4", "12.5"]
    },
    {
      "id": 14,
      "tasks": ["12.6"]
    },
    {
      "id": 15,
      "tasks": ["13.1", "13.2", "13.3", "13.4"]
    },
    {
      "id": 16,
      "tasks": ["14.1"]
    },
    {
      "id": 17,
      "tasks": ["14.2", "14.3"]
    }
  ]
}
```
