import type { CollectionConfig } from 'payload'
import { isEditorOrAdmin, publicRead } from '../access'

export const SiteContent: CollectionConfig = {
  slug: 'site-content',
  admin: {
    useAsTitle: 'contentId',
    defaultColumns: ['contentId', 'pageKey', 'type', 'updatedAt'],
  },
  access: {
    read: publicRead,
    create: isEditorOrAdmin,
    update: isEditorOrAdmin,
    delete: isEditorOrAdmin,
  },
  fields: [
    {
      name: 'contentId',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'e.g. home.hero.title',
      },
    },
    {
      name: 'pageKey',
      type: 'text',
      required: true,
      index: true,
      admin: {
        description: 'e.g. home',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Text', value: 'text' },
        { label: 'Rich text', value: 'richtext' },
        { label: 'Image', value: 'image' },
      ],
    },
    { name: 'value', type: 'textarea', required: true },
    {
      name: 'updatedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: { position: 'sidebar' },
    },
  ],
  timestamps: true,
}
