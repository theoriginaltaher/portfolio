# Taher Hussain Portfolio

Production-ready portfolio built with Next.js 16, TypeScript, Tailwind CSS, Sanity, Portable Text, and Resend.

## Local development

```bash
npm install
copy .env.example .env.local
npm run dev
```

The application requires a configured Sanity project in every runtime. Portfolio content is authored directly in Sanity; the repository does not ship sample records or a production seeding command.

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

The five schemas are registered in `sanity.config.ts`: projects, experience, skills, posts, and site settings.

```bash
npm run studio
```

The configured project can be audited with:

```bash
npm run sanity:audit
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
