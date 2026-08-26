import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access'

type UserWithRole = {
  id: string
  role?: 'admin' | 'editor' | 'viewer' | 'client'
}

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'role', 'updatedAt'],
  },
  auth: true,
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false
      if ((user as UserWithRole).role === 'admin') return true
      return { id: { equals: user.id } }
    },
    create: isAdmin,
    update: ({ req: { user } }) => {
      if (!user) return false
      if ((user as UserWithRole).role === 'admin') return true
      return { id: { equals: user.id } }
    },
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
