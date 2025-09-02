import { ProtectedRoute } from '../../components/Auth/ProtectedRoute'
import { useAuth } from '../../components/Auth/useAuth'

export const AdminDashboard = () => {
  const { signOut } = useAuth()

  const handleLogout = async () => {
    await signOut()
    window.location.href = '/auth'
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[var(--night)] mb-4">Tableau de Bord Admin</h1>
          <p className="text-[var(--night-80)]/80 mb-8">Bienvenue dans l'espace d'administration</p>
          <button 
            onClick={handleLogout}
            className="px-6 py-3 bg-[var(--night)] text-white rounded-lg hover:bg-[var(--night-80)] transition-colors"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </ProtectedRoute>
  )
}
