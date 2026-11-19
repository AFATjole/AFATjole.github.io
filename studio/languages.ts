// Keep in sync with web/src/lib/i18n.ts
export const languages = [
  {id: 'zh', title: '中文', isDefault: true},
  {id: 'en', title: 'English'},
] as const

export type LanguageId = (typeof languages)[number]['id']
export const defaultLanguage: LanguageId = 'zh'
