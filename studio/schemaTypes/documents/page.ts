import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {requireDefaultLanguage} from '../objects/locale'

/**
 * Fixed content pages. Each one is a singleton with a fixed document ID
 * (see `fixedPages`), wired into the desk in structure.ts and fetched by ID
 * on the website.
 */
export const fixedPages = [
  {id: 'page-work', title: '作品 Our Work'},
  {id: 'page-expertise', title: '专业能力 Expertise'},
  {id: 'page-team', title: '团队 The Team'},
  {id: 'page-csr', title: '企业责任 CSR'},
  {id: 'page-about', title: '关于 About'},
  {id: 'page-contact', title: '联系 Contact'},
] as const

export const page = defineType({
  name: 'page',
  title: '页面 Page',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({name: 'title', title: 'Title', type: 'localeString', validation: requireDefaultLanguage}),
    defineField({name: 'intro', title: 'Intro', type: 'localeText'}),
    defineField({name: 'heroImage', title: 'Hero image', type: 'figure'}),
    defineField({name: 'body', title: 'Body', type: 'localeBlockContent'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  preview: {select: {title: 'title.zh', subtitle: 'title.en'}},
})
