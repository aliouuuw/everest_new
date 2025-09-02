import { useConvexAuth, useQuery } from 'convex/react'
import { useAuthActions } from '@convex-dev/auth/react'
import { api } from '../../../convex/_generated/api'

export interface User {
  _id: string
  email: string
  name: string
  role: 'admin' | 'editor' | 'viewer' | 'client'
  avatar?: string
  bio?: string
  lastLogin?: number
  createdAt: number
}

export interface AuthState {
  user: User | null | undefined
  isLoading: boolean
  signOut: () => Promise<void>
  isAuthenticated: boolean
}

export function useAuth(): AuthState {
  const { signOut: convexSignOut } = useAuthActions()
  const { isAuthenticated: convexIsAuthenticated, isLoading: convexIsLoading } = useConvexAuth()
  
  // Only query for user data if authenticated
  const user = useQuery(
    api.api.users.getCurrentUser,
    convexIsAuthenticated ? {} : "skip"
  )
  
  const signOut = async () => {
    await convexSignOut()
  }

  return {
    user: user as User | null | undefined,
    isLoading: convexIsLoading || (convexIsAuthenticated && user === undefined),
    signOut,
    isAuthenticated: convexIsAuthenticated
  }
}
