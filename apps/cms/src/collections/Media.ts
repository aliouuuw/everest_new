import type { CollectionConfig } from 'payload'
import { isEditorOrAdmin } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'fileName',
    defaultColumns: ['fileName', 'fileType', 'mimeType', 'createdAt'],
  },
  access: {
    read: () => true,
    create: isEditorOrAdmin,
    update: isEditorOrAdmin,
    delete: isEditorOrAdmin,
  },
  upload: {
    mimeTypes: ['image/*', 'video/*', 'application/pdf'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'tags',
      type: 'text',
      hasMany: true,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'cloudflareId',
      type: 'text',
      admin: {
        description: 'Legacy R2 object key from Convex migration',
      },
    },
    {
      name: 'cloudflareUrl',
      type: 'text',
      admin: {
        description: 'Direct CDN URL (legacy or external)',
      },
    },
    {
      name: 'fileName',
      type: 'text',
    },
    {
      name: 'fileType',
      type: 'select',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Video', value: 'video' },
        { label: 'Document', value: 'document' },
      ],
    },
    {
      name: 'fileSize',
      type: 'number',
    },
    {
      name: 'mimeType',
      type: 'text',
    },
    {
      name: 'publication',
      type: 'relationship',
      relationTo: 'publications',
    },
    {
      name: 'uploadedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: { position: 'sidebar' },
    },
    {
      name: 'deletedAt',
      type: 'date',
      admin: { position: 'sidebar' },
    },
    {
      name: 'deletedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: { position: 'sidebar' },
    },
  ],
  timestamps: true,
}
