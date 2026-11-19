import {defineArrayMember, defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons/Home'

export const homePage = defineType({
  name: 'homePage',
  title: '首页 Home',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({name: 'heading', title: 'Heading', type: 'localeString'}),
        defineField({name: 'subheading', title: 'Subheading', type: 'localeText'}),
        defineField({name: 'image', title: 'Image', type: 'figure'}),
        defineField({name: 'video', title: 'Video (overrides image)', type: 'video'}),
      ],
    }),
    defineField({name: 'intro', title: 'Intro', type: 'localeBlockContent'}),
    defineField({
      name: 'featuredWorks',
      title: 'Featured works',
      description: 'Leave empty to show works marked “Show on home page”',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'work'}]})],
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  preview: {prepare: () => ({title: '首页 Home'})},
})
