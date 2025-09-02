import { useState } from 'react'
import { FiLock, FiMail } from 'react-icons/fi'
import { useNavigate } from '@tanstack/react-router'
import { useAuth } from './useAuth'

export function SigninForm() {
  const navigate = useNavigate()
  const { signIn, isTransitioning, user, isAuthenticated } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('password', {
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
        flow: 'signIn'
      })

      if (result.success) {
        // Wait a bit for user data to load
        await new Promise(resolve => setTimeout(resolve, 300))
        
        // Navigate based on role
        const currentUser: any = await new Promise(resolve => {
          const checkUser = setInterval(() => {
            if (user && user.role) {
              clearInterval(checkUser)
              resolve(user)
            }
          }, 100)
          // Timeout after 3 seconds
          setTimeout(() => {
            clearInterval(checkUser)
            resolve(user)
          }, 3000)
        })

        if (currentUser && currentUser.role) {
          if (currentUser.role === 'admin' || currentUser.role === 'editor') {
            navigate({ to: '/admin', replace: true })
          } else {
            navigate({ to: '/dashboard', replace: true })
          }
        } else {
          // Fallback navigation
          navigate({ to: '/admin', replace: true })
        }
      }
    } catch (err) {
      setError('Email ou mot de passe incorrect')
      console.error('Signin error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 sm:p-8">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-display text-xl">Accéder à votre espace</div>
          <p className="text-secondary text-sm mt-1">Connectez-vous à votre portail client.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-[var(--night-80)]/80">
          <FiLock /> Sécurisé
        </div>
      </div>

      {/* Formulaire de connexion */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}
        <div>
          <label htmlFor="email-login" className="text-xs font-medium text-[var(--night-80)]/80">Email</label>
          <input
            id="email-login"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="mt-1 w-full rounded-lg border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/90 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--gold-metallic)]/30"
            placeholder="Entrez votre email"
          />
        </div>
        <div>
          <label htmlFor="password-login" className="text-xs font-medium text-[var(--night-80)]/80">Mot de passe</label>
          <input
            id="password-login"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="mt-1 w-full rounded-lg border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/90 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--gold-metallic)]/30"
            placeholder="Entrez votre mot de passe"
          />
        </div>
        <div className="flex items-center justify-between gap-3">
          <label className="inline-flex items-center gap-2 text-xs text-[var(--night-80)]/80">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              className="accent-[var(--gold-dark)]"
            />
            Se souvenir de moi
          </label>
          <button
            type="submit"
            disabled={isLoading || isTransitioning}
            className="btn-primary font-display tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading || isTransitioning ? 'Connexion...' : 'Se connecter'}
          </button>
        </div>
        <div className="text-xs text-[var(--night-80)]/80 inline-flex items-center gap-2">
          <FiMail className="opacity-70" />
          <a className="underline hover:text-[var(--gold-metallic)]" href="#">Mot de passe oublié ?</a>
        </div>
      </form>
    </div>
  )
}
