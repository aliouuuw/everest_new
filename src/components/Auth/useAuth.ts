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
  
  // Only query for user data if authenticated, with error handling
  const user = useQuery(
    api.users.getCurrentUser,
    convexIsAuthenticated ? {} : "skip"
  )
  
  const signOut = async () => {
    try {
      await convexSignOut()
    } catch (error) {
      console.warn('Convex signout error (non-critical):', error)
      // Don't re-throw the error - just log it and continue
      // The user should still be considered signed out even if there's a backend error
    }
  }

  // Handle loading state more carefully to prevent errors during signout
  const isLoading = convexIsLoading || (convexIsAuthenticated && user === undefined)

  return {
    user: user as User | null | undefined,
    isLoading,
    signOut,
    isAuthenticated: convexIsAuthenticated
  }
}
