# Kōe website

Marketing site for Kōe, built with Next.js 15 (App Router). Every route is prerendered as static HTML.

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Configure

Copy `.env.example` to `.env.local` and fill it in. On your host, set the same variables in its environment settings.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production URL, e.g. `https://koe.app`. Drives canonical URLs, the sitemap and social cards. On Vercel it falls back to the project's production domain. |
| `NEXT_PUBLIC_APP_VERSION` | Version shown next to the download buttons. |
| `NEXT_PUBLIC_DOWNLOAD_URL_APPLE_SILICON` | Direct `.dmg` link for Apple silicon. |
| `NEXT_PUBLIC_DOWNLOAD_URL_INTEL` | Direct `.dmg` link for Intel. |
| `NEXT_PUBLIC_RELEASE_NOTES_URL` | Optional footer link. Hidden when empty. |
| `NEXT_PUBLIC_CONTACT_URL` | Optional footer link, e.g. `mailto:hello@koe.app`. Hidden when empty. |

These are read at build time, so redeploy after changing them.

## SEO

- `app/layout.tsx`: title, description, keywords, canonical URL, Open Graph and Twitter metadata, robots directives
- `app/page.tsx`: JSON-LD structured data (`SoftwareApplication`, `FAQPage`, `WebSite`) and semantic sections
- `app/opengraph-image.tsx` / `twitter-image.tsx`: generated 1200×630 social preview
- `app/icon.svg`, `app/apple-icon.tsx`: favicon and Apple touch icon
- `app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts`: `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`

Page copy, models and FAQs live in `lib/site.ts`.

## Deploy

### Vercel (recommended)

1. Push this folder to a GitHub repository.
2. On vercel.com, choose **Add New → Project** and import the repository. The framework is detected automatically.
3. Add the environment variables above, then deploy.
4. Under **Settings → Domains**, add your domain and set `NEXT_PUBLIC_SITE_URL` to it.
5. Submit `https://<your-domain>/sitemap.xml` in Google Search Console.

Or deploy from the terminal:

```bash
npx vercel --prod
```

### Any Node host

```bash
npm ci
npm run build
npm start
```

This serves on port 3000 (set `PORT` to change it). Requires Node 18.18 or later.
