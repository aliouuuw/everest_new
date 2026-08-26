import type { CollectionConfig } from 'payload'
import { isEditorOrAdmin, isStaff } from '../access'
import { slugField } from '../fields/slug'

const publicationCategories = [
  { label: 'Revues hebdo', value: 'revues-hebdo' },
  { label: 'Revues mensuelles', value: 'revues-mensuelles' },
  { label: 'Teaser dividende', value: 'teaser-dividende' },
  { label: 'Marchés', value: 'marches' },
  { label: 'Analyses', value: 'analyses' },
] as const

const publicationStatuses = [
  { label: 'Brouillon', value: 'draft' },
  { label: 'Publié', value: 'published' },
  { label: 'Archivé', value: 'archived' },
] as const

export const Publications: CollectionConfig = {
  slug: 'publications',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt'],
  },
  access: {
    read: isStaff,
    create: isEditorOrAdmin,
    update: isEditorOrAdmin,
    delete: isEditorOrAdmin,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    { name: 'description', type: 'textarea', required: true },
    { name: 'excerpt', type: 'textarea', required: true },
    { name: 'content', type: 'richText', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [...publicationCategories],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [...publicationStatuses],
      admin: { position: 'sidebar' },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'media',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
    },
    {
      name: 'attachments',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
    },
    { name: 'tags', type: 'text', hasMany: true },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    { name: 'readingTime', type: 'number', admin: { position: 'sidebar' } },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
    },
    { name: 'seoTitle', type: 'text' },
    { name: 'seoDescription', type: 'textarea' },
    { name: 'canonicalUrl', type: 'text' },
  ],
  timestamps: true,
}
