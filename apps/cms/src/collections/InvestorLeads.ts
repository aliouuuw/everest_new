import type { CollectionConfig } from 'payload'
import { isAdmin, isStaff } from '../access'

const profileTypes = [
  'conservative',
  'moderate',
  'balanced',
  'growth',
  'aggressive',
] as const

export const InvestorLeads: CollectionConfig = {
  slug: 'investor-leads',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['firstName', 'lastName', 'email', 'profileType', 'createdAt'],
  },
  access: {
    read: isStaff,
    create: () => true,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    { name: 'firstName', type: 'text', required: true },
    { name: 'lastName', type: 'text', required: true },
    { name: 'email', type: 'email', required: true, index: true },
    { name: 'phone', type: 'text' },
    {
      name: 'profileType',
      type: 'select',
      required: true,
      options: profileTypes.map((value) => ({ label: value, value })),
    },
    { name: 'profileTitle', type: 'text', required: true },
    { name: 'riskLevel', type: 'number', required: true },
    {
      name: 'answers',
      type: 'array',
      required: true,
      fields: [
        { name: 'questionId', type: 'text', required: true },
        { name: 'value', type: 'number', required: true },
      ],
    },
    { name: 'investmentAmount', type: 'number' },
    {
      name: 'emailSent',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    { name: 'emailSentAt', type: 'date', admin: { position: 'sidebar' } },
    { name: 'emailError', type: 'text' },
    {
      name: 'pdfGenerated',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    { name: 'pdfUrl', type: 'text' },
    { name: 'source', type: 'text' },
    { name: 'userAgent', type: 'text' },
  ],
  timestamps: true,
}
