import type { Access } from 'payload'

type Role = 'admin' | 'editor' | 'viewer' | 'client'

const staffRoles: Role[] = ['admin', 'editor', 'viewer']

const hasRole =
  (...roles: Role[]): Access =>
  ({ req: { user } }) =>
    user !== null && roles.includes(user.role)

export const isLoggedIn: Access = ({ req: { user } }) => user !== null
export const isAdmin = hasRole('admin')
export const isEditorOrAdmin = hasRole('admin', 'editor')
export const isStaff = hasRole(...staffRoles)

export const publicRead: Access = () => true

/** Anonymous visitors see published documents only; staff see every draft. */
export const publishedOrStaff: Access = ({ req: { user } }) => {
  if (user !== null && staffRoles.includes(user.role)) return true
  return { status: { equals: 'published' } }
}
