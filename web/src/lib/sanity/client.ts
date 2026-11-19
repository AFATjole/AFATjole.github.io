import {createClient, type QueryParams} from '@sanity/client'
import {createImageUrlBuilder} from '@sanity/image-url'

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production'

/** False until a Sanity project ID is configured; the site then uses placeholder content. */
export const sanityConfigured = Boolean(projectId)

export const client = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2026-11-01',
      // Static build: always read fresh, published content at build time.
      useCdn: false,
      perspective: 'published',
      token: import.meta.env.SANITY_API_READ_TOKEN,
    })
  : null

const builder = client ? createImageUrlBuilder(client) : null

/** Image URL builder; null when Sanity is not configured. */
export const urlFor = (source: Parameters<NonNullable<typeof builder>['image']>[0]) =>
  builder ? builder.image(source).auto('format') : null

/**
 * Run a GROQ query. Without a configured project it returns `fallback`, so the
 * site can be previewed before the CMS exists. Once configured, errors are
 * thrown so a broken build never ships empty pages.
 */
export async function load<T>(query: string, params: QueryParams = {}, fallback: T): Promise<T> {
  if (!client) return fallback
  const result = await client.fetch<T | null>(query, params)
  return result ?? fallback
}
