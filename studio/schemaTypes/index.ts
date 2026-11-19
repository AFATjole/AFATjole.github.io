import {blockContent, localeBlockContent, localeString, localeText} from './objects/locale'
import {figure, video} from './objects/media'
import {seo} from './objects/seo'
import {expertise} from './documents/expertise'
import {homePage} from './documents/homePage'
import {page} from './documents/page'
import {siteSettings} from './documents/siteSettings'
import {teamMember} from './documents/teamMember'
import {work} from './documents/work'
import {workCategory} from './documents/workCategory'

export const schemaTypes = [
  // objects
  localeString,
  localeText,
  blockContent,
  localeBlockContent,
  figure,
  video,
  seo,
  // singletons
  siteSettings,
  homePage,
  page,
  // collections
  work,
  workCategory,
  expertise,
  teamMember,
]

/** Document types that only exist as fixed, pre-defined documents. */
export const singletonTypes = new Set(['siteSettings', 'homePage', 'page'])
