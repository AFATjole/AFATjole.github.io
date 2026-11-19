// Data access for pages. Every function returns placeholder content when
// Sanity is not configured yet (see `load` in ./client.ts).
import {load} from './client'
import {placeholder} from './placeholder'
import * as q from './queries'
import type {Category, Expertise, Home, Page, Settings, TeamMember, Work, WorkCard} from './types'

export type PageId = 'page-work' | 'page-expertise' | 'page-team' | 'page-csr' | 'page-about' | 'page-contact'

// Memoise per build so shared data (settings, categories) is fetched once.
const cache = new Map<string, Promise<unknown>>()
function once<T>(key: string, fn: () => Promise<T>): Promise<T> {
  if (!cache.has(key)) cache.set(key, fn())
  return cache.get(key) as Promise<T>
}

export const getSettings = () => once('settings', () => load<Settings>(q.settingsQuery, {}, placeholder.settings))
export const getHome = () => load<Home>(q.homeQuery, {}, placeholder.home)
export const getPage = (id: PageId) => load<Page>(q.pageQuery, {id}, placeholder.pages[id])
export const getCategories = () => once('categories', () => load<Category[]>(q.categoriesQuery, {}, placeholder.categories))
export const getWorks = () => once('works', () => load<WorkCard[]>(q.worksQuery, {}, placeholder.works))
export const getWork = (slug: string) =>
  load<Work | null>(q.workQuery, {slug}, placeholder.works.find((w) => w.slug === slug) ?? null)
export const getExpertise = () => load<Expertise[]>(q.expertiseQuery, {}, placeholder.expertise)
export const getTeam = () => load<TeamMember[]>(q.teamQuery, {}, placeholder.team)
