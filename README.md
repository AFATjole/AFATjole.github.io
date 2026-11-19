# AFATjole website

Monorepo (npm workspaces) for the company website.

| Folder | What | Hosted on |
|---|---|---|
| `web/` | Astro + Tailwind frontend, zh/en | GitHub Pages now → Cloudflare Workers later |
| `studio/` | Sanity Studio (CMS) | `<host>.sanity.studio` |

## Getting started

Requires Node ≥ 22.23 (see `.nvmrc`).

```bash
npm install
npm run dev        # website on http://localhost:4321
npm run studio     # CMS on http://localhost:3333
```

Without a Sanity project the website builds with placeholder content.

## Connecting Sanity

1. Create a project at <https://www.sanity.io/manage> (or `npx sanity init` inside `studio/`).
2. `cp studio/.env.example studio/.env` and `cp web/.env.example web/.env`, fill in the project ID.
3. In the Sanity project's **API → CORS origins**, add `http://localhost:3333`.
4. `npm run studio:deploy` publishes the CMS to `https://<SANITY_STUDIO_HOST>.sanity.studio`.
5. `npm run typegen` regenerates `web/src/lib/sanity/sanity.types.ts` from the schema + queries.

## Content model (`studio/schemaTypes`)

- **Singletons**: `siteSettings`, `homePage`, and `page` documents with fixed IDs
  (`page-work`, `page-expertise`, `page-team`, `page-csr`, `page-about`, `page-contact`).
- **Collections**: `work` (belongs to one `workCategory`), `workCategory`, `expertise`, `teamMember`.
- Translatable fields are objects with one key per language (`{zh, en}`); the website
  falls back to `zh` when `en` is missing.

## Routes (`web/src/pages`)

```
/                         → redirects to /zh/
/[lang]/                  home
/[lang]/work/             all work
/[lang]/work/[category]/  gift-sets · bags-cases · retail-beauty (slugs come from Sanity)
/[lang]/work/[category]/[slug]/
/[lang]/expertise/  /[lang]/team/  /[lang]/csr/  /[lang]/about/  /[lang]/contact/
```

## Deploying (stage 1: GitHub Pages)

`.github/workflows/deploy.yml` builds `web/` and deploys it on every push to `main`.

One-time setup in the GitHub repo:

1. **Settings → Pages → Source: GitHub Actions**.
2. **Settings → Secrets and variables → Actions → Variables**: `SANITY_PROJECT_ID`
   (and `SANITY_DATASET` if not `production`).
3. Rebuild on publish: in Sanity **API → Webhooks**, add a webhook to
   `https://api.github.com/repos/AFATjole/AFATjole.github.io/dispatches`, method POST,
   body `{"event_type": "sanity-publish"}`, with headers
   `Authorization: Bearer <fine-grained token with Contents: read & write>` and
   `Accept: application/vnd.github+json`.

## Moving to Cloudflare Workers (stage 2)

1. `npm i @astrojs/cloudflare -w web` and add `adapter: cloudflare()` in `web/astro.config.mjs`.
2. Set `SITE_URL` to the new domain (used for canonical URLs and the sitemap).
3. Pages stay prerendered; routes that need a server (contact form, draft preview)
   opt out with `export const prerender = false`.
4. Add the domain to Sanity CORS origins and point the publish webhook at a Cloudflare deploy hook.
