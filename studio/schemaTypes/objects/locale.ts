import {defineArrayMember, defineField, defineType} from 'sanity'
import {defaultLanguage, languages} from '../../languages'

// Field-level localisation: every translatable field is an object with one
// sub-field per language, e.g. {zh: '礼盒套装', en: 'Gift Sets'}.
// The website falls back to the default language when a translation is missing.

const localeFields = (type: string, extra: Record<string, unknown> = {}) =>
  languages.map((lang) => defineField({name: lang.id, title: lang.title, type, ...extra} as any))

/** Use as `validation: requireDefaultLanguage` on a required localised field. */
export const requireDefaultLanguage = (rule: any) =>
  rule.custom((value?: Record<string, unknown>) =>
    value?.[defaultLanguage] ? true : `Required in ${defaultLanguage} / 必须填写中文`,
  )

export const localeString = defineType({
  name: 'localeString',
  title: 'Localised string',
  type: 'object',
  fields: localeFields('string'),
})

export const localeText = defineType({
  name: 'localeText',
  title: 'Localised text',
  type: 'object',
  fields: localeFields('text', {rows: 3}),
})

export const blockContent = defineType({
  name: 'blockContent',
  title: 'Rich text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'Quote', value: 'blockquote'},
      ],
    }),
    defineArrayMember({type: 'figure'}),
  ],
})

export const localeBlockContent = defineType({
  name: 'localeBlockContent',
  title: 'Localised rich text',
  type: 'object',
  fields: languages.map((lang) => defineField({name: lang.id, title: lang.title, type: 'blockContent'})),
})
