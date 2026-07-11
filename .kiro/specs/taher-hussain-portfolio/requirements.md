# Requirements Document

## Introduction

Taher Hussain is a creative technologist from Sri Lanka working across AI-powered multimedia, video production, photography, graphic design, web design, cloud tools, digital strategy, robotics/WRO, school leadership, event media, and creative workflow automation. This specification defines a fully production-ready personal portfolio website built with Next.js, TypeScript, and Tailwind CSS. The site must communicate a clean, premium, editorial, and professionally mature personal brand — not a student CV, startup landing page, or template site. All pages are fully built with real content wired in, a headless CMS (Sanity) powering all updatable content including projects, experience entries, skills, blog posts, and site settings, and a functional contact form connected via Resend or Formspree.

---

## Glossary

- **Portfolio Site**: The complete Next.js web application described in this document.
- **Navigation Bar**: The persistent top-level navigation component present on all pages.
- **Hero Section**: The above-the-fold section on the homepage.
- **Projects Section**: The image-led editorial section listing Taher's work, using full-bleed alternating image/text rows.
- **Digital Systems Lab**: A sub-category of projects focusing on AI, cloud, web, and technical systems work (`/projects/systems`).
- **Media Gallery**: A sub-category of projects focusing on video, photography, and visual media work (`/projects/media`).
- **Blog**: The content publishing area powered by a headless CMS (Sanity), accessible at `/blog`.
- **CMS**: Content Management System — Sanity.io, used as the headless backend for blog posts.
- **Contact Form**: The form on `/contact` that submits messages via Resend or Formspree.
- **Accent Color**: A single, muted accent color used sparingly across the site for emphasis.
- **Design System**: The defined set of typography, color, spacing, and component rules applied consistently across all pages.
- **App Router**: Next.js 14+ App Router, the routing architecture used for this project.
- **Metadata Row**: A horizontal row of short descriptive tags displayed beneath the hero statement.
- **Experience Row**: A single-line row component displaying a role, organisation, and date range in the Experience section.
- **Project Row**: A full-bleed horizontal row with a large image on one side and editorial text on the other, alternating per row.
- **GROQ**: Graph-Relational Object Queries — the query language used by Sanity to fetch CMS content.
- **CMS Schema**: The set of Sanity document type definitions (project, experience, skill, post, siteSettings) that define the structure of all CMS-managed content.
- **siteSettings**: A Sanity singleton document containing Taher's profile, bio, portrait, and contact details.
- **ISR**: Incremental Static Regeneration — a Next.js rendering strategy that regenerates cached pages on the server at a defined interval (e.g., 60 seconds) without a full rebuild.

---

## Requirements

### Requirement 1: Visual Design System

**User Story:** As a visitor, I want to experience a consistent, premium, editorial visual language across the entire site, so that Taher's brand feels intentional, mature, and professional.

#### Acceptance Criteria

1. THE Portfolio Site SHALL use a near-black or charcoal background color (approximately `#0D0D0D` to `#111111`) as the default page background across all routes.
2. THE Portfolio Site SHALL use an off-white text color (approximately `#F0EDE8` to `#FAFAF8`) as the primary text color.
3. THE Portfolio Site SHALL use a muted gray color (approximately `#888888` to `#999999`) as the secondary text color for metadata, labels, and supporting copy.
4. THE Portfolio Site SHALL define and use exactly one accent color (a single muted, non-neon tone such as a warm stone, dusty sage, or faded brass) for interactive states, active indicators, and sparse decorative elements.
5. THE Portfolio Site SHALL use a strict typographic scale based on a single serif or high-quality grotesque font for headings and a complementary sans-serif for body text, with no more than two typeface families total.
6. THE Portfolio Site SHALL render thin horizontal divider lines (1px, low-opacity) between major sections and between list rows.
7. THE Portfolio Site SHALL apply generous whitespace (minimum 80px vertical padding between major sections on desktop) to maintain an editorial, spacious feel.
8. THE Portfolio Site SHALL NOT use glassmorphism, glowing blob effects, random gradients, generic rounded cards, or excessive drop shadows.
9. THE Portfolio Site SHALL NOT use more than one accent color simultaneously.
10. WHEN a user hovers over an interactive element (link, button, project row, nav item), THE Portfolio Site SHALL apply a refined, minimal hover state (opacity shift, underline, or subtle color transition — no scale transforms larger than 1.02).

---

### Requirement 2: Navigation

**User Story:** As a visitor, I want a clear, editorial navigation bar with numbered items and a projects dropdown, so that I can move between all sections of the site with confidence.

#### Acceptance Criteria

1. THE Navigation Bar SHALL be present and visible on all pages across all routes.
2. THE Navigation Bar SHALL display the following items in this exact order: `01 / HOME`, `02 / EXPERIENCE`, `03 / PROJECTS`, `04 / ABOUT`, `05 / BLOG`, `06 / CONTACT`.
3. THE Navigation Bar SHALL link each item to its corresponding route: `/`, `/experience`, `/projects`, `/about`, `/blog`, `/contact`.
4. WHEN a user hovers over `03 / PROJECTS`, THE Navigation Bar SHALL display a dropdown containing two items: `Digital Systems Lab → /projects/systems` and `Media Gallery → /projects/media`.
5. WHEN a user is on a given route, THE Navigation Bar SHALL display that navigation item in the Accent Color to indicate the active page.
6. THE Navigation Bar SHALL display Taher's name or a wordmark on the left side as a home link.
7. WHEN the viewport width is below 768px, THE Navigation Bar SHALL collapse into a mobile-friendly hamburger or minimal menu.
8. THE Navigation Bar SHALL maintain a fixed or sticky position at the top of the viewport during scroll.

---

### Requirement 3: Homepage (`/`)

**User Story:** As a visitor, I want a homepage that immediately communicates who Taher is, shows a preview of his experience, projects, writing, and includes a contact prompt, so that I understand his full profile at a glance.

#### Acceptance Criteria

1. THE Hero Section SHALL display Taher's full name "Taher Hussain" as the largest typographic element on the page.
2. THE Hero Section SHALL display the role label "Creative Technologist" beneath the name.
3. THE Hero Section SHALL display a short bold statement (one to two lines) and a paragraph of no more than 60 words describing Taher's work and background.
4. THE Hero Section SHALL display two CTAs: a primary button "View Projects" linking to `/projects`, and a secondary button or text link "Contact" linking to `/contact`.
5. THE Hero Section SHALL display a Metadata Row containing the following labels in a horizontal single-line layout: `Sri Lanka`, `AI`, `Multimedia`, `Design`, `Web`, `Cloud`.
6. THE Homepage SHALL include an Experience preview section displaying exactly 5 roles as clean single-line rows, each showing the role title, organisation name, and date range.
7. THE Homepage SHALL include a Projects section displaying exactly 6 projects using the Project Row layout (full-bleed alternating image/text rows).
8. THE Homepage SHALL include an About editorial section containing a single paragraph (60–120 words) in a large, readable type size.
9. THE Homepage SHALL include a Blog preview section displaying exactly 3 article rows, each showing the article title, publication date, and a short excerpt or tag.
10. THE Homepage SHALL include a Contact CTA section with a short prompt line and a visible link or button to `/contact`.
11. WHEN the viewport width is below 768px, THE Homepage SHALL stack all Project Rows vertically with the image above the text block.

---

### Requirement 4: Experience Page (`/experience`)

**User Story:** As a visitor, I want a dedicated experience page listing Taher's roles in a clean, structured format, so that I can review his professional background in detail.

#### Acceptance Criteria

1. THE Experience Page SHALL display a page heading "Experience" in large editorial type.
2. THE Experience Page SHALL list all experience entries as clean horizontal rows, each row containing: role title, organisation name, date range (month/year format), and a short one-line description.
3. THE Experience Page SHALL render a thin divider line between each experience row.
4. THE Experience Page SHALL include at least the following 5 roles: a role at a school (leadership/prefect), a robotics or WRO competition role, a media or event production role, a web or digital design role, and a creative technology or AI project role.
5. WHEN the user hovers over an experience row, THE Experience Page SHALL apply the defined refined hover state without layout shift.
6. THE Experience Page SHALL fetch all experience entries from Sanity CMS as `experience` documents, ordered by the `order` field, using ISR with revalidate: 60s.
7. THE Homepage ExperiencePreview section SHALL fetch the 5 entries where `featured` is `true`, or the first 5 entries ordered by `order` if fewer than 5 are marked featured, from Sanity CMS using ISR with revalidate: 60s.
8. THE Sanity CMS `experience` document type SHALL include the following fields: role (string, required), organisation (string, required), dateRange (string, required), description (string, one-line), category (string: one of leadership/robotics/media/web/creative-tech), order (number), current (boolean — marks active roles).

---

### Requirement 5: Projects Pages (`/projects`, `/projects/systems`, `/projects/media`)

**User Story:** As a visitor, I want to browse Taher's projects in an editorial, image-led layout that clearly distinguishes digital/technical work from media/visual work, so that I can explore his portfolio by category.

#### Acceptance Criteria

1. THE Projects Page at `/projects` SHALL display a full list of all projects from both categories using the Project Row layout.
2. THE Projects Page SHALL link to `/projects/systems` and `/projects/media` as sub-category pages.
3. THE Digital Systems Lab page at `/projects/systems` SHALL display only projects categorised as `systems` using the Project Row layout.
4. THE Media Gallery page at `/projects/media` SHALL display only projects categorised as `media` using the Project Row layout.
5. THE Project Row SHALL display a full-bleed project image occupying at least 50% of the row width on desktop.
6. THE Project Row SHALL display the project title, a short description (30–60 words), the project category label, and a "View" link or arrow.
7. WHEN project rows alternate, THE Portfolio Site SHALL place the image on the left for odd-numbered rows and on the right for even-numbered rows.
8. WHEN a user clicks a Project Row or its "View" link, THE Portfolio Site SHALL navigate to a project detail page at `/projects/[slug]`.
9. THE Project Detail Page SHALL display the project title, full image, full description, tools/technologies used, and a back link to the parent projects page.
10. IF a project has no featuredImage, THE Portfolio Site SHALL display a solid-color accent-color placeholder panel.
11. THE Projects Page at `/projects` SHALL fetch all published projects (where `published` is `true`) from Sanity CMS ordered by the `order` field, using ISR with revalidate: 60s.
12. THE Digital Systems Lab page SHALL fetch only published projects where `category` is `"systems"` from Sanity CMS using ISR with revalidate: 60s.
13. THE Media Gallery page SHALL fetch only published projects where `category` is `"media"` from Sanity CMS using ISR with revalidate: 60s.
14. THE Project Detail Page at `/projects/[slug]` SHALL fetch the project matching the slug from Sanity CMS using ISR with revalidate: 60s, and SHALL call `notFound()` if the project is not found or `published` is not `true`.
15. THE Portfolio Site SHALL use `generateStaticParams()` for `/projects/[slug]` by querying all published project slugs from Sanity CMS at build time.
16. THE Sanity CMS `project` document type SHALL include the following fields: title (string, required), slug (slug, required, sourced from title), category (string: "systems" or "media", required), description (text, max 150 chars), fullDescription (Portable Text array), featuredImage (image with hotspot + alt), galleryImages (array of images with alt), tools (array of strings), order (number), featured (boolean), published (boolean).

---

### Requirement 6: About Page (`/about`)

**User Story:** As a visitor or collaborator, I want to read a personal editorial profile of Taher, so that I understand his background, values, and creative approach beyond a list of skills.

#### Acceptance Criteria

1. THE About Page SHALL display a large editorial section heading "About".
2. THE About Page SHALL display a full editorial bio of Taher (150–400 words) written in first or third person, covering his background, creative interests, and geographic/cultural context.
3. THE About Page SHALL display a portrait photograph of Taher with editorial framing (not a square thumbnail or cropped headshot card).
4. THE About Page SHALL display a skills or disciplines list as a clean typographic list (not icon grid), ordered by the `order` field from Sanity CMS.
5. THE About Page SHALL include a link to `/contact` at the bottom of the page.
6. THE About Page bio text and portrait image SHALL be fetched from the Sanity `siteSettings` singleton document, so Taher can update his bio, portrait, and contact info from Sanity Studio without touching code.
7. THE About Page skills list SHALL be fetched from Sanity CMS as `skill` documents ordered by the `order` field, using ISR with revalidate: 60s.
8. THE Sanity CMS `skill` document type SHALL include the following fields: label (string, required), order (number).
9. THE Sanity CMS `siteSettings` singleton document SHALL include the following fields: name (string), role (string), bio (Portable Text), portrait (image with hotspot + alt), email (string), linkedIn (URL string), metaDescription (string).

---

### Requirement 7: Blog (`/blog` and `/blog/[slug]`)

**User Story:** As a reader, I want to browse and read Taher's blog posts backed by a live CMS, so that I can follow his writing and thinking over time.

#### Acceptance Criteria

1. THE Blog Page SHALL fetch and display all published blog posts from the Sanity CMS using GROQ queries at build time (SSG) or request time (SSR).
2. THE Blog Page SHALL display each post as a row containing: post title, publication date, category or tag, and a short excerpt (maximum 30 words).
3. THE Blog Page SHALL render a thin divider line between each post row.
4. WHEN a user clicks a blog post row, THE Portfolio Site SHALL navigate to `/blog/[slug]` where `[slug]` is the post's unique identifier in the CMS.
5. THE Blog Post Page at `/blog/[slug]` SHALL display: post title, author name ("Taher Hussain"), publication date, full post body rendered from Portable Text (Sanity's rich text format), and a back link to `/blog`.
6. THE Blog Post Page SHALL apply the same editorial typographic styles to body content, with appropriate heading hierarchy (H2, H3) and paragraph spacing.
7. IF a blog post is not found in the CMS, THEN THE Blog Post Page SHALL return a 404 status and display a "Post not found" message with a link back to `/blog`.
8. THE Sanity CMS schema SHALL define a `post` document type with the following fields: `title` (string, required), `slug` (slug, required), `publishedAt` (datetime, required), `excerpt` (text, max 300 chars), `body` (array of Portable Text blocks), `category` (string), and `author` (string, default "Taher Hussain").

---

### Requirement 8: Contact Page (`/contact`)

**User Story:** As a potential collaborator or client, I want to send Taher a message directly from the site, so that I can get in touch without leaving the page.

#### Acceptance Criteria

1. THE Contact Page SHALL display a page heading "Contact" and a short invitational paragraph (20–50 words).
2. THE Contact Form SHALL include the following fields: Name (text, required), Email (email, required), Subject (text, required), Message (textarea, required).
3. WHEN a user submits the Contact Form with all required fields completed, THE Contact Form SHALL send the message to Taher's designated email address via Resend or Formspree API.
4. WHEN the Contact Form submission is successful, THE Contact Form SHALL display a visible confirmation message ("Message sent. I'll be in touch soon.") and reset all form fields.
5. IF the Contact Form submission fails due to a network or API error, THEN THE Contact Form SHALL display an error message ("Something went wrong. Please try again or email directly.") without clearing the user's input.
6. IF a required field is empty when the user attempts to submit the Contact Form, THEN THE Contact Form SHALL display an inline validation error beside the relevant field before making any API request.
7. IF the email field contains a value that does not match a valid email format, THEN THE Contact Form SHALL display an inline validation error on the email field before making any API request.
8. THE Contact Page SHALL display Taher's professional email address and, optionally, links to his LinkedIn and/or social profiles as plain text elements alongside the form.

---

### Requirement 9: Performance and Technical Standards

**User Story:** As a visitor on any device or connection, I want the site to load quickly and function correctly, so that I have a smooth browsing experience.

#### Acceptance Criteria

1. THE Portfolio Site SHALL achieve a Lighthouse Performance score of 85 or above on desktop for all primary pages (`/`, `/projects`, `/about`, `/blog`, `/contact`).
2. THE Portfolio Site SHALL achieve a Lighthouse Accessibility score of 90 or above on all pages.
3. THE Portfolio Site SHALL use Next.js Image (`next/image`) for all project and portrait images to enable automatic WebP conversion and lazy loading.
4. THE Portfolio Site SHALL define descriptive `alt` text for every image element.
5. THE Portfolio Site SHALL use Next.js App Router with appropriate rendering strategies: SSG for navigation-only static pages, ISR (revalidate: 60s) for all CMS-driven pages including projects, experience, blog, and about.
6. THE Portfolio Site SHALL define `<title>` and `<meta name="description">` tags for each route using Next.js Metadata API.
7. THE Portfolio Site SHALL be fully responsive and functional across viewport widths from 375px (mobile) to 1440px (desktop).
8. THE Portfolio Site SHALL deploy successfully to Vercel with zero build errors.
9. WHEN any Sanity CMS content is updated (projects, experience, skills, blog posts, or site settings), THE affected pages SHALL reflect updated content within 60 seconds via ISR revalidation.

---

### Requirement 10: Content and Data

**User Story:** As the site owner (Taher), I want real content — real project images, real copy, real experience entries — wired into the site at launch, so that the site is genuinely production-ready and not placeholder-filled.

#### Acceptance Criteria

1. THE Portfolio Site SHALL include real project images for all 6 featured projects, uploaded to Sanity's asset CDN (not stored in `/public`), with minimum dimensions of 1200×800px.
2. THE Portfolio Site SHALL display real, non-placeholder copy for all sections on the Homepage, Experience Page, About Page, and Projects Pages.
3. THE Portfolio Site SHALL include at least 1 published blog post live in the Sanity CMS at the time of deployment.
4. THE Portfolio Site SHALL populate the Contact Form target email from an environment variable (`CONTACT_EMAIL`) stored in Vercel environment settings, not hardcoded in source code.
5. THE Portfolio Site SHALL store the Sanity project ID, dataset name, and API token as environment variables (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_TOKEN`) and SHALL NOT commit these values to source control.
6. THE Portfolio Site SHALL store the Resend or Formspree API key as an environment variable (`RESEND_API_KEY` or `FORMSPREE_ENDPOINT`) and SHALL NOT commit this value to source control.
7. THE Portfolio Site SHALL NOT use static TypeScript data files for project, experience, or skill content in production; all such content SHALL be fetched from Sanity CMS.
8. THE Portfolio Site MAY include a `src/data/seed/` directory with development seed data matching the Sanity schema shape for local development fallback only; this seed data SHALL NOT be used in production builds.

---

### Requirement 11: Sanity CMS Schema

**User Story:** As the site owner, I want all updatable content — projects, experience, skills, blog posts, and site settings — managed through Sanity Studio, so I can update my portfolio without touching code.

#### Acceptance Criteria

1. THE Sanity CMS SHALL define a `project` document type with fields: title (string, required), slug (slug, required, sourced from title), category (string: "systems" or "media", required), description (text, max 150 chars), fullDescription (Portable Text array), featuredImage (image with hotspot + alt), galleryImages (array of images with alt), tools (array of strings), order (number), featured (boolean), published (boolean).
2. THE Sanity CMS SHALL define an `experience` document type with fields: role (string, required), organisation (string, required), dateRange (string, required), description (string), category (string), order (number), current (boolean).
3. THE Sanity CMS SHALL define a `skill` document type with fields: label (string, required), order (number).
4. THE Sanity CMS SHALL define a `post` document type with fields: title (string, required), slug (slug, required), publishedAt (datetime, required), excerpt (text, max 300 chars), body (Portable Text + image blocks with alt), category (string), author (string, default "Taher Hussain").
5. THE Sanity CMS SHALL define a `siteSettings` singleton document type with fields: name, role, bio (Portable Text), portrait (image with hotspot + alt), email, linkedIn, metaDescription.
6. All document types SHALL be registered in the Sanity schema config.
7. IF a page fetches CMS content and Sanity is unreachable during ISR revalidation, THE Portfolio Site SHALL serve the last cached version without showing an error to the user.
