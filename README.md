# Taher Hussain Portfolio

Production-ready portfolio built with Next.js 16, TypeScript, Tailwind CSS, Sanity, Portable Text, and Resend.

## Local development

```bash
npm install
copy .env.example .env.local
npm run dev
```

The application requires a configured Sanity project in every runtime. Portfolio content is authored in Sanity. The optional portfolio importer uploads selected assets from the original local archive without replacing existing documents.

## Environment

- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET`: Sanity dataset, normally `production`
- `SANITY_API_TOKEN`: server-only read token when the dataset is private
- `RESEND_API_KEY`: server-only Resend key
- `CONTACT_EMAIL`: destination for form submissions
- `CONTACT_FROM_EMAIL`: verified Resend sender used for portfolio enquiries
- `NEXT_PUBLIC_SITE_URL`: canonical production URL used by metadata and the sitemap

Never expose `SANITY_API_TOKEN` or `RESEND_API_KEY` with a `NEXT_PUBLIC_` prefix.

## Content Studio

The schemas in `sanity/schemas` include projects, media albums, career records, posts, and site settings. The Studio is available at `/admin` or through the standalone command below.

```bash
npm run studio
```

The configured project can be audited with:

```bash
npm run sanity:audit
npm run sanity:import-linkedin -- "C:\\path\\to\\extracted-linkedin-export"
```

## Verification

```bash
npm run check
```

This runs strict TypeScript checking, ESLint, property/component tests, and a production build. Additional production gates are available with:

```bash
npm run audit:lighthouse -- https://tahersportfolio.vercel.app
npm run verify:isr -- check-restored https://tahersportfolio.vercel.app
```

The contact API validates all fields server-side and sends through Resend using server-only environment variables.

## Digital Systems and Media Gallery

- **Digital project → Show on website** controls whether a digital project appears, including its direct URL. Add real screenshots or films under **Screenshots and films**; drag to reorder. The first visible item supplies the preview.
- **Media album → Show on website** controls a complete collection. Set its category, year/season, description, tags, and order. Lower order values appear first.
- Open an image or film and enable **Hide from website** to keep it in the editor while removing it from the site. Drag a visible item to the top to use it as the album cover. A film's **Video poster** is its preview. Albums with no visible media are omitted.
- Click **Publish** after editing. Cached pages normally refresh on the next request after the 60-second revalidation interval. Homepage counts, project previews, album navigation, direct pages, and the sitemap all use the same published content.
- Upload MP4/WebM films, optional posters, and WebVTT captions. Video players mount only when a visitor opens a film and are destroyed on navigation or close. Images open uncropped with zoom, keyboard navigation, touch swipes, and thumbnail selection.
- Hiding is editorial visibility, not private asset storage: existing public CDN asset URLs remain accessible.

### Importing the original archive

Requires FFmpeg on PATH and a server-side `SANITY_API_TOKEN` with asset/document write access. The command defaults to a dry run:

```powershell
node --env-file=.env.local scripts/import-portfolio.mjs --root "D:\GD - TH\03 - Taher\08 - Portfolio"
# Upload the selected assets and create documents:
node --env-file=.env.local scripts/import-portfolio.mjs --root "D:\GD - TH\03 - Taher\08 - Portfolio" --apply
```

The initial import includes five digital projects (25 screenshots), 18 photographs per event collection, the existing graphics collections, and 11 films across five collections. The photo edit in `data/portfolio-curation.json` chooses covers and hides four unsuitable frames; three graphics templates are hidden initially. Original files remain untouched. Images are converted to WebP; films are encoded as H.264/AAC MP4 with fast-start playback. Existing documents, including unpublished ones, are preserved on reruns. Local upload/encoding progress is cached under the ignored `reports/media/import-cache` directory.

`src/data/media-albums.ts` supplies metadata only to the importer; no public page reads this legacy Drive-based seed. New content and visibility changes belong in Sanity.

### Gallery browser checks

Run `node scripts/verify-gallery.mjs` against a server at `http://localhost:3100` (install the test browser with `npx playwright install chromium` if needed). `QA_BASE_URL`, `PLAYWRIGHT_MODULE`, and `CHROMIUM_PATH` can select a different server or an existing browser installation. Checks cover desktop/tablet/mobile layouts, search, filters, image zoom, keyboard/focus behavior, native film playback and cleanup, and 404s. Screenshots are written to the ignored `reports/media` directory. `npm test` also checks published-content queries, individual visibility, viewer behavior, and schema fields.
