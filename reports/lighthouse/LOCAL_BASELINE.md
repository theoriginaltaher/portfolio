# Local production Lighthouse baseline

Audited against the production build at `http://localhost:3100` on 2026-08-07 with Lighthouse 12.8.2 desktop mode.

| Route | Performance | Accessibility |
| --- | ---: | ---: |
| `/` | 100 | 96 |
| `/projects` | 100 | 96 |
| `/about` | 100 | 96 |
| `/blog` | 100 | 95 |
| `/contact` | 100 | 96 |

Kiro thresholds: performance >= 85 and accessibility >= 90. All local production routes pass. The same command must be rerun against the deployed Vercel URL before Task 14.2 can be checked.
