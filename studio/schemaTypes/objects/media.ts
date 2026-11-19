import {defineField, defineType} from 'sanity'

/** Image with hotspot and localised alt text. */
export const figure = defineType({
  name: 'figure',
  title: 'Image',
  type: 'image',
  options: {hotspot: true},
  fields: [
    defineField({name: 'alt', title: 'Alt text', type: 'localeString'}),
    defineField({name: 'caption', title: 'Caption', type: 'localeString'}),
  ],
})

/** Uploaded video file (mp4/webm) with an optional poster image. */
export const video = defineType({
  name: 'video',
  title: 'Video',
  type: 'object',
  fields: [
    defineField({
      name: 'file',
      title: 'Video file',
      type: 'file',
      options: {accept: 'video/mp4,video/webm'},
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'poster', title: 'Poster image', type: 'figure'}),
    defineField({name: 'caption', title: 'Caption', type: 'localeString'}),
  ],
  preview: {
    select: {title: 'caption.zh', media: 'poster'},
    prepare: ({title, media}) => ({title: title || 'Video', media}),
  },
})
