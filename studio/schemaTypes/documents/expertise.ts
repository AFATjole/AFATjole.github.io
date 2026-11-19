import {defineField, defineType} from 'sanity'
import {BulbOutlineIcon} from '@sanity/icons/BulbOutline'
import {requireDefaultLanguage} from '../objects/locale'

export const expertise = defineType({
  name: 'expertise',
  title: '专业能力 Expertise',
  type: 'document',
  icon: BulbOutlineIcon,
  fields: [
    defineField({name: 'title', title: 'Title', type: 'localeString', validation: requireDefaultLanguage}),
    defineField({name: 'summary', title: 'Summary', type: 'localeText'}),
    defineField({name: 'body', title: 'Details', type: 'localeBlockContent'}),
    defineField({name: 'image', title: 'Image', type: 'figure'}),
    defineField({name: 'order', title: 'Sort order', type: 'number', initialValue: 0}),
  ],
  orderings: [{title: 'Sort order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title.zh', subtitle: 'title.en', media: 'image'}},
})
