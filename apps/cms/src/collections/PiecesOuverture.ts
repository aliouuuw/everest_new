import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import { isAdmin, isStaff } from '../access'

const dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Identity documents sent with an account-opening request.
 * Private: only staff can read them, through Payload (never a public URL).
 * Files are written by the /api/ouverture endpoints only (overrideAccess).
 */
export const PiecesOuverture: CollectionConfig = {
  slug: 'pieces-ouverture',
  labels: { singular: 'Pièce', plural: 'Pièces (ouverture)' },
  admin: {
    group: 'Ouverture de compte',
    useAsTitle: 'libelle',
    defaultColumns: ['libelle', 'dossier', 'filename', 'createdAt'],
  },
  access: {
    read: isStaff,
    create: () => false,
    update: () => false,
    delete: isAdmin,
  },
  upload: {
    // Local fallback outside the public folder. In production the private R2 bucket is used (see storage/r2.ts).
    staticDir: path.resolve(dirname, '../../private/pieces-ouverture'),
    mimeTypes: ['application/pdf', 'image/jpeg', 'image/png', 'image/heic', 'image/heif'],
  },
  fields: [
    { name: 'dossier', type: 'relationship', relationTo: 'dossiers-ouverture', required: true, index: true },
    { name: 'cle', type: 'text', required: true, admin: { description: 'Clé de la pièce dans le formulaire.' } },
    { name: 'libelle', type: 'text' },
    { name: 'sha256', type: 'text', admin: { readOnly: true } },
  ],
  timestamps: true,
}
