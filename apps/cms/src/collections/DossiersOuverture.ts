import type { CollectionConfig } from 'payload'
import { isAdmin, isEditorOrAdmin, isStaff } from '../access'

export const STATUTS = [
  { label: 'Brouillon (non envoyé)', value: 'brouillon' },
  { label: 'Reçu', value: 'recu' },
  { label: 'En examen', value: 'examen' },
  { label: 'Complément demandé', value: 'complement' },
  { label: 'Validé', value: 'valide' },
  { label: 'Refusé', value: 'refuse' },
] as const

/**
 * Account-opening requests sent by public/ouverture/ (the form).
 * Created and filled by the /api/ouverture endpoints; staff review them here.
 */
export const DossiersOuverture: CollectionConfig = {
  slug: 'dossiers-ouverture',
  labels: { singular: 'Dossier', plural: 'Dossiers (ouverture)' },
  admin: {
    group: 'Ouverture de compte',
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'titulaire', 'categorie', 'gestion', 'statut', 'envoyeLe'],
    listSearchableFields: ['reference', 'titulaire', 'courriel'],
  },
  access: {
    read: isStaff,
    create: () => false,
    update: isEditorOrAdmin,
    delete: isAdmin,
  },
  fields: [
    { name: 'reference', type: 'text', unique: true, index: true, admin: { readOnly: true } },
    {
      name: 'statut',
      type: 'select',
      required: true,
      defaultValue: 'brouillon',
      options: [...STATUTS],
      index: true,
      admin: { position: 'sidebar' },
    },
    { name: 'envoyeLe', type: 'date', admin: { position: 'sidebar', readOnly: true } },
    { name: 'notesInternes', type: 'textarea', admin: { position: 'sidebar', description: 'Visible par l’équipe seulement.' } },
    {
      type: 'row',
      fields: [
        { name: 'titulaire', type: 'text', admin: { readOnly: true } },
        { name: 'courriel', type: 'email', admin: { readOnly: true } },
        { name: 'telephone', type: 'text', admin: { readOnly: true } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'categorie', type: 'text', admin: { readOnly: true } },
        { name: 'gestion', type: 'text', admin: { readOnly: true } },
        { name: 'residence', type: 'text', admin: { readOnly: true } },
      ],
    },
    {
      name: 'pieces',
      type: 'array',
      admin: { readOnly: true, description: 'Pièces demandées et leur statut. Les fichiers sont dans « Pièces (ouverture) », filtrés par dossier.' },
      fields: [
        { name: 'cle', type: 'text' },
        { name: 'libelle', type: 'text' },
        { name: 'statut', type: 'text' },
      ],
    },
    { name: 'profil', type: 'json', admin: { readOnly: true } },
    { name: 'reponses', type: 'json', admin: { readOnly: true } },
    { name: 'schemaVersion', type: 'text', admin: { readOnly: true } },
    // sha256 of the client's bearer token; the token itself is never stored.
    { name: 'jetonHash', type: 'text', required: true, index: true, hidden: true },
  ],
  timestamps: true,
}
