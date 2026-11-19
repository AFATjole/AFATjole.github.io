import {defineArrayMember, defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons/Cog'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: '站点设置 Site settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({name: 'siteName', title: 'Site name', type: 'localeString'}),
    defineField({name: 'tagline', title: 'Tagline', type: 'localeString'}),
    defineField({name: 'logo', title: 'Logo', type: 'image'}),
    defineField({
      name: 'contact',
      title: 'Contact details',
      type: 'object',
      description: 'Shown in the footer and on the Contact page',
      fields: [
        defineField({name: 'email', title: 'Email', type: 'string', validation: (rule) => rule.email()}),
        defineField({name: 'phone', title: 'Phone', type: 'string'}),
        defineField({name: 'address', title: 'Address', type: 'localeText'}),
      ],
    }),
    defineField({
      name: 'social',
      title: 'Social links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string'}),
            defineField({name: 'url', title: 'URL', type: 'url'}),
          ],
        }),
      ],
    }),
    defineField({name: 'seo', title: 'Default SEO', type: 'seo'}),
  ],
  preview: {prepare: () => ({title: '站点设置 Site settings'})},
})
