// @ts-check
import {defineConfig} from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

// Stage 1 (now): fully static build, deployed to GitHub Pages.
// Stage 2 (Cloudflare Workers): `npm i @astrojs/cloudflare -w web`, then add
//   `adapter: cloudflare()` and set `site` to the new domain. Pages stay
//   prerendered; opt individual routes into SSR with `export const prerender = false`.
export default defineConfig({
  site: process.env.SITE_URL || 'https://afatjole.github.io',
  output: 'static',
  trailingSlash: 'ignore',
  i18n: {
    locales: ['zh', 'en'],
    defaultLocale: 'zh',
    routing: {prefixDefaultLocale: true, redirectToDefaultLocale: false},
  },
  integrations: [
    sitemap({
      i18n: {defaultLocale: 'zh', locales: {zh: 'zh-CN', en: 'en'}},
    }),
  ],
  vite: {plugins: [tailwindcss()]},
})
