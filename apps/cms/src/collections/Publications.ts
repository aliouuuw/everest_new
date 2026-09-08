import type { CollectionConfig } from 'payload'
import { isEditorOrAdmin, publishedOrStaff } from '../access'
import { triggerSiteRebuild } from '../hooks/triggerSiteRebuild'

const frequencies = [
  { label: 'Hebdomadaire', value: 'hebdomadaire' },
  { label: 'Mensuelle', value: 'mensuelle' },
  { label: 'Semestrielle', value: 'semestrielle' },
] as const

const publicationStatuses = [
  { label: 'Brouillon', value: 'draft' },
  { label: 'Publié', value: 'published' },
  { label: 'Archivé', value: 'archived' },
] as const

export const Publications: CollectionConfig = {
  slug: 'publications',
  labels: {
    singular: 'Publication',
    plural: 'Publications',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'frequency', 'status', 'publishedAt'],
    description: 'PDF téléchargeable. Pas de page HTML publique.',
  },
  access: {
    read: publishedOrStaff,
    create: isEditorOrAdmin,
    update: isEditorOrAdmin,
    delete: isEditorOrAdmin,
  },
  hooks: {
    afterChange: [triggerSiteRebuild],
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Titre' },
    { name: 'description', type: 'textarea', required: true, label: 'Description' },
    {
      name: 'frequency',
      type: 'select',
      required: true,
      label: 'Fréquence',
      options: [...frequencies],
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Fichier PDF',
      filterOptions: {
        mimeType: { contains: 'pdf' },
      },
      admin: {
        description: 'Fichier PDF de la revue.',
      },
    },
    {
      name: 'pages',
      type: 'number',
      label: 'Pages',
      admin: { description: 'Nombre de pages (optionnel).' },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      label: 'Statut',
      options: [...publicationStatuses],
      admin: { position: 'sidebar' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'À la une',
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Date de publication',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
    },
  ],
  timestamps: true,
}
