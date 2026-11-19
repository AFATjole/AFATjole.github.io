import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons/Tag'
import {requireDefaultLanguage} from '../objects/locale'

export const workCategory = defineType({
  name: 'workCategory',
  title: '作品分类 Work category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({name: 'title', title: 'Title', type: 'localeString', validation: requireDefaultLanguage}),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'e.g. gift-sets → /zh/work/gift-sets',
      options: {source: 'title.en'},
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'description', title: 'Description', type: 'localeText'}),
    defineField({name: 'coverImage', title: 'Cover image', type: 'figure'}),
    defineField({name: 'order', title: 'Sort order', type: 'number', initialValue: 0}),
  ],
  orderings: [{title: 'Sort order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title.zh', subtitle: 'title.en', media: 'coverImage'}},
})
