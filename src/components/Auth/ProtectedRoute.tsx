import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useConvexAuth, useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import type { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
  requiredRole?: 'admin' | 'editor' | 'viewer' | 'client'
  redirectTo?: string
}



export function ProtectedRoute({ 
  children, 
  requiredRole, 
  redirectTo = '/auth' 
}: ProtectedRouteProps) {
  const navigate = useNavigate()
  const { isAuthenticated, isLoading } = useConvexAuth()
  
  // Fetch current user data using the correct API path
  const user = useQuery(api.users.getCurrentUser, isAuthenticated ? {} : "skip")

  // Handle redirect for unauthenticated users
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate({ to: redirectTo })
    }
  }, [isLoading, isAuthenticated, navigate, redirectTo])

  // Determine what to render based on state
  let content: ReactNode

  if (isLoading) {
    // Show loading while checking auth state
    content = (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--gold-metallic)] mx-auto"></div>
          <p className="mt-2 text-sm text-[var(--night-80)]/80">Vérification de l'authentification...</p>
        </div>
      </div>
    )
  } else if (!isAuthenticated) {
    // If not authenticated, show redirect message briefly
    content = (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--gold-metallic)] mx-auto"></div>
          <p className="mt-2 text-sm text-[var(--night-80)]/80">Redirection vers la connexion...</p>
        </div>
      </div>
    )
  } else if (user === undefined) {
    // Show loading while fetching user data
    content = (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--gold-metallic)] mx-auto"></div>
          <p className="mt-2 text-sm text-[var(--night-80)]/80">Chargement des données utilisateur...</p>
        </div>
      </div>
    )
  } else if (user === null) {
    // User is authenticated but user data couldn't be found - this is an error state
    content = (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-[var(--night)] mb-2">Erreur de chargement</h1>
          <p className="text-[var(--night-80)]/80 mb-6">
            Impossible de charger vos données utilisateur.
            <br />
            Veuillez vous reconnecter.
          </p>
          <button
            onClick={() => navigate({ to: '/auth' })}
            className="w-full px-4 py-2 bg-[var(--gold-metallic)] text-[var(--night)] rounded-lg hover:bg-[var(--gold-metallic-80)] transition-colors"
          >
            Se reconnecter
          </button>
        </div>
      </div>
    )
  } else {
    // User data is loaded, now check role
    console.log('ProtectedRoute Debug:', { 
      requiredRole, 
      userRole: user.role, 
      userEmail: user.email,
      hasRequiredRole: requiredRole ? (user.role || 'client') === requiredRole : true 
    })
    const hasRequiredRole = requiredRole ? (user.role || 'client') === requiredRole : true

    if (requiredRole && !hasRequiredRole) {
      // Show access denied if role is required but user doesn't have it
      content = (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="text-6xl mb-4">🔒</div>
            <h1 className="text-2xl font-bold text-[var(--night)] mb-2">Accès Refusé</h1>
            <p className="text-[var(--night-80)]/80 mb-6">
              Vous n'avez pas les permissions nécessaires pour accéder à cette page.
              <br />
              <span className="text-sm">Rôle requis: {requiredRole} | Votre rôle: {user.role || 'non défini'}</span>
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
    } else {
      // Render children if authenticated and has required role
      content = <>{children}</>
    }
  }

  return content
}
