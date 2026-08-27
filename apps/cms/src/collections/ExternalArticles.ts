import type { CollectionConfig } from 'payload'
import { isAdmin, publicRead } from '../access'
import { triggerSiteRebuild } from '../hooks/triggerSiteRebuild'

export const ExternalArticles: CollectionConfig = {
  slug: 'external-articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'source', 'publishedAt', 'fetchedAt'],
  },
  access: {
    read: publicRead,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  hooks: {
    afterChange: [triggerSiteRebuild],
  },
  fields: [
    { name: 'guid', type: 'text', required: true, unique: true, index: true },
    { name: 'slug', type: 'text', index: true },
    { name: 'title', type: 'text', required: true },
    { name: 'excerpt', type: 'textarea', required: true },
    { name: 'content', type: 'textarea' },
    { name: 'url', type: 'text', required: true },
    { name: 'imageUrl', type: 'text', required: true },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'source',
      type: 'select',
      required: true,
      options: [
        { label: 'Sika Finance', value: 'sika-finance' },
        { label: 'Madis Invest', value: 'madis-invest' },
      ],
    },
    { name: 'sourceName', type: 'text', required: true },
    { name: 'category', type: 'text', required: true },
    {
      name: 'fetchedAt',
      type: 'date',
      required: true,
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
  ],
}
