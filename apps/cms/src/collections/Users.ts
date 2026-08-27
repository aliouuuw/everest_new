import type { Access, CollectionConfig } from 'payload'
import { isAdmin } from '../access'

/** Admins manage everyone; everyone else is scoped to their own record. */
const selfOrAdmin: Access = ({ req: { user } }) => {
  if (user === null) return false
  if (user.role === 'admin') return true
  return { id: { equals: user.id } }
}

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'role', 'updatedAt'],
  },
  auth: true,
  access: {
    read: selfOrAdmin,
    create: isAdmin,
    update: selfOrAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'viewer',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Viewer', value: 'viewer' },
        { label: 'Client', value: 'client' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'avatar',
      type: 'text',
    },
    {
      name: 'bio',
      type: 'textarea',
    },
    {
      name: 'lastLogin',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
  ],
  versions: false,
}
