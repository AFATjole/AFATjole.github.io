import {defineArrayMember, defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons/Images'
import {requireDefaultLanguage} from '../objects/locale'

export const work = defineType({
  name: 'work',
  title: '作品 Work',
  type: 'document',
  icon: ImagesIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'media', title: 'Media'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'title', title: 'Title', type: 'localeString', group: 'content', validation: requireDefaultLanguage}),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'content',
      options: {source: 'title.en'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'workCategory'}],
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'client', title: 'Client', type: 'string', group: 'content'}),
    defineField({name: 'year', title: 'Year', type: 'number', group: 'content'}),
    defineField({name: 'summary', title: 'Summary', type: 'localeText', group: 'content'}),
    defineField({name: 'body', title: 'Body', type: 'localeBlockContent', group: 'content'}),
    defineField({name: 'coverImage', title: 'Cover image', type: 'figure', group: 'media', validation: (rule) => rule.required()}),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      group: 'media',
      of: [defineArrayMember({type: 'figure'}), defineArrayMember({type: 'video'})],
      options: {layout: 'grid'},
    }),
    defineField({name: 'featured', title: 'Show on home page', type: 'boolean', group: 'content', initialValue: false}),
    defineField({name: 'order', title: 'Sort order', type: 'number', group: 'content', initialValue: 0}),
    defineField({name: 'seo', title: 'SEO', type: 'seo', group: 'seo'}),
  ],
  orderings: [
    {title: 'Sort order', name: 'order', by: [{field: 'order', direction: 'asc'}]},
    {title: 'Year (newest)', name: 'yearDesc', by: [{field: 'year', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'title.zh', subtitle: 'category.title.zh', media: 'coverImage'},
  },
})
