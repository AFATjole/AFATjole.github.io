// Hand-written types for the query results in ./queries.ts.
// Once the Sanity project exists you can generate exact types instead with
// `npm run typegen` (writes ./sanity.types.ts) and switch imports over.
import type {Localized} from '../i18n'

export type PortableTextValue = unknown[]

export interface Figure {
  _type?: 'figure'
  asset?: {_id: string; url: string; metadata?: {lqip?: string; dimensions?: {width: number; height: number}}}
  alt?: Localized
  caption?: Localized
  hotspot?: unknown
  crop?: unknown
}

export interface Video {
  url?: string
  poster?: Figure
  caption?: Localized
}

export interface Seo {
  title?: Localized
  description?: Localized
  image?: Figure
}

export interface CategoryRef {
  title?: Localized
  slug: string
}

export interface WorkCard {
  _id: string
  slug: string
  title?: Localized
  summary?: Localized
  client?: string
  year?: number
  category?: CategoryRef
  coverImage?: Figure
}

export interface Work extends WorkCard {
  body?: Localized<PortableTextValue>
  gallery?: ((Figure & {_key: string; _type: 'figure'}) | (Video & {_key: string; _type: 'video'}))[]
  seo?: Seo
}

export interface Category {
  _id: string
  slug: string
  title?: Localized
  description?: Localized
  coverImage?: Figure
  count: number
}

export interface Page {
  title?: Localized
  intro?: Localized
  heroImage?: Figure
  body?: Localized<PortableTextValue>
  seo?: Seo
}

export interface Home {
  hero?: {heading?: Localized; subheading?: Localized; image?: Figure; video?: Video}
  intro?: Localized<PortableTextValue>
  featured?: WorkCard[]
  seo?: Seo
}

export interface Settings {
  siteName?: Localized
  tagline?: Localized
  contact?: {email?: string; phone?: string; address?: Localized}
  social?: {label?: string; url?: string}[]
  seo?: Seo
}

export interface Expertise {
  _id: string
  title?: Localized
  summary?: Localized
  body?: Localized<PortableTextValue>
  image?: Figure
}

export interface TeamMember {
  _id: string
  name?: Localized
  role?: Localized
  bio?: Localized
  photo?: Figure
}
