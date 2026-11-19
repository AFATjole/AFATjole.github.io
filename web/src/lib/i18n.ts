// Keep in sync with studio/languages.ts
export const locales = ['zh', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'zh'

export const localeNames: Record<Locale, string> = {zh: '中文', en: 'EN'}
export const htmlLang: Record<Locale, string> = {zh: 'zh-CN', en: 'en'}

export const isLocale = (value: unknown): value is Locale => locales.includes(value as Locale)

/** For `getStaticPaths` of every page under src/pages/[lang]/. */
export const localeParams = () => locales.map((lang) => ({params: {lang}}))

/** A Sanity localised field: {zh: '...', en: '...'}. */
export type Localized<T = string> = Partial<Record<Locale, T>> | null | undefined

/** Pick the value for `lang`, falling back to the default language. */
export function pick<T>(field: Localized<T>, lang: Locale): T | undefined {
  if (!field) return undefined
  return field[lang] ?? field[defaultLocale]
}

/** `/zh/work` style path for a locale. `path` has no leading locale. */
export function localePath(lang: Locale, path = ''): string {
  const clean = path.replace(/^\/+|\/+$/g, '')
  return clean ? `/${lang}/${clean}/` : `/${lang}/`
}

/** The same page in another language. */
export function switchLocalePath(pathname: string, to: Locale): string {
  const rest = pathname.replace(new RegExp(`^/(${locales.join('|')})(?=/|$)`), '')
  return localePath(to, rest)
}

/** Static UI strings (not managed in the CMS). */
export const ui = {
  zh: {
    'nav.home': '首页',
    'nav.work': '作品',
    'nav.expertise': '专业能力',
    'nav.team': '团队',
    'nav.csr': '企业责任',
    'nav.about': '关于',
    'nav.contact': '联系',
    'work.all': '全部作品',
    'work.viewAll': '查看全部作品',
    'work.empty': '该分类暂无作品',
    'work.client': '客户',
    'work.year': '年份',
    'work.back': '返回',
    'contact.email': '邮箱',
    'contact.phone': '电话',
    'contact.address': '地址',
    'menu': '菜单',
    'notFound': '页面不存在',
    'backHome': '返回首页',
  },
  en: {
    'nav.home': 'Home',
    'nav.work': 'Our Work',
    'nav.expertise': 'Expertise',
    'nav.team': 'The Team',
    'nav.csr': 'CSR',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'work.all': 'All work',
    'work.viewAll': 'View all work',
    'work.empty': 'No work in this category yet',
    'work.client': 'Client',
    'work.year': 'Year',
    'work.back': 'Back',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.address': 'Address',
    'menu': 'Menu',
    'notFound': 'Page not found',
    'backHome': 'Back to home',
  },
} as const satisfies Record<Locale, Record<string, string>>

export type UiKey = keyof (typeof ui)['zh']
export const t = (lang: Locale, key: UiKey): string => ui[lang][key] ?? ui[defaultLocale][key]

/** Main navigation. `path` is relative to the locale root. */
export const navigation: {key: UiKey; path: string}[] = [
  {key: 'nav.work', path: 'work'},
  {key: 'nav.expertise', path: 'expertise'},
  {key: 'nav.team', path: 'team'},
  {key: 'nav.csr', path: 'csr'},
  {key: 'nav.about', path: 'about'},
  {key: 'nav.contact', path: 'contact'},
]
