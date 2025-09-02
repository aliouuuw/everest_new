import { useAuthActions } from '@convex-dev/auth/react'
import { useNavigate } from '@tanstack/react-router'
import { useConvexAuth, useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import type { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
  requiredRole?: 'admin' | 'editor' | 'viewer' | 'client'
  redirectTo?: string
}

interface User {
  _id: string
  email: string
  name: string
  role: 'admin' | 'editor' | 'viewer' | 'client'
  avatar?: string
  bio?: string
  lastLogin?: number
  createdAt: number
}

export function ProtectedRoute({ 
  children, 
  requiredRole, 
  redirectTo = '/auth' 
}: ProtectedRouteProps) {
  const { signOut } = useAuthActions()
  const navigate = useNavigate()
  const { isAuthenticated, isLoading } = useConvexAuth()
  
  // Fetch current user data using the correct API path
  const user = useQuery(api.api.users.getCurrentUser, isAuthenticated ? {} : "skip")

  // Handle loading state
  if (isLoading || user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--gold-metallic)] mx-auto"></div>
          <p className="mt-2 text-sm text-[var(--night-80)]/80">Vérification de l'authentification...</p>
        </div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    navigate({ to: redirectTo })
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--gold-metallic)] mx-auto"></div>
          <p className="mt-2 text-sm text-[var(--night-80)]/80">Redirection vers la connexion...</p>
        </div>
      </div>
    )
  }

  // Check if user has required role
  const hasRequiredRole = requiredRole ? user?.role === requiredRole : true

  // Show access denied if role is required but user doesn't have it
  if (requiredRole && !hasRequiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-[var(--night)] mb-2">Accès Refusé</h1>
          <p className="text-[var(--night-80)]/80 mb-6">
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
            <br />
            <span className="text-sm">Rôle requis: {requiredRole} | Votre rôle: {user?.role || 'non défini'}</span>
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate({ to: '/' })}
              className="w-full px-4 py-2 bg-[var(--gold-metallic)] text-[var(--night)] rounded-lg hover:bg-[var(--gold-metallic-80)] transition-colors"
            >
              Retour à l'accueil
            </button>
            <button
              onClick={() => navigate({ to: '/auth' })}
              className="w-full px-4 py-2 border border-[var(--gold-metallic)] text-[var(--night-80)] rounded-lg hover:bg-[var(--gold-metallic-10)] transition-colors"
            >
              Se connecter avec un autre compte
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Render children if authenticated and has required role
  return <>{children}</>
}
