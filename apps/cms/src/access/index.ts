import type { Access } from 'payload'

type UserWithRole = {
  role?: 'admin' | 'editor' | 'viewer' | 'client'
}

export const isLoggedIn: Access = ({ req: { user } }) => Boolean(user)

export const isAdmin: Access = ({ req: { user } }) => {
  const role = (user as UserWithRole | null)?.role
  return role === 'admin'
}

export const isEditorOrAdmin: Access = ({ req: { user } }) => {
  const role = (user as UserWithRole | null)?.role
  return role === 'admin' || role === 'editor'
}

export const isStaff: Access = ({ req: { user } }) => {
  const role = (user as UserWithRole | null)?.role
  return role === 'admin' || role === 'editor' || role === 'viewer'
}
