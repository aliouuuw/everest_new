import type { Field } from 'payload'

export const slugField = (fieldToUse = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
  },
  hooks: {
    beforeValidate: [
      ({ data, value }) => {
        if (value) return value
        const source = data?.[fieldToUse]
        if (typeof source !== 'string') return value
        return source
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
      },
    ],
  },
})
