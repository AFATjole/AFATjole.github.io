import {defineField, defineType} from 'sanity'
import {UsersIcon} from '@sanity/icons/Users'

export const teamMember = defineType({
  name: 'teamMember',
  title: '团队成员 Team member',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({name: 'name', title: 'Name', type: 'localeString'}),
    defineField({name: 'role', title: 'Role', type: 'localeString'}),
    defineField({name: 'photo', title: 'Photo', type: 'figure'}),
    defineField({name: 'bio', title: 'Bio', type: 'localeText'}),
    defineField({name: 'order', title: 'Sort order', type: 'number', initialValue: 0}),
  ],
  orderings: [{title: 'Sort order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name.zh', subtitle: 'role.zh', media: 'photo'}},
})
