import { useEffect, useState } from 'react'

interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'editor' | 'viewer'
  avatar?: string
  bio?: string
  lastLogin?: number
  createdAt: number
}

interface AuthState {
  user: User | null
  isLoading: boolean
  signOut: () => Promise<void>
  isAuthenticated: boolean
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real implementation, this would fetch the current user from Convex Auth
    const checkAuth = async () => {
      try {
        // Mock user data for development
        const mockUser: User = {
          id: '1',
          email: 'admin@everest-finance.com',
          name: 'Admin User',
          role: 'admin',
          createdAt: Date.now()
        }
        setUser(mockUser)
      } catch (error) {
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const signOut = async () => {
    setUser(null)
    // In a real implementation, this would call Convex Auth signOut
  }

  return {
    user,
    isLoading,
    signOut,
    isAuthenticated: !!user
  }
}
