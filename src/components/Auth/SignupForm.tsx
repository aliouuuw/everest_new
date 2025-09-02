import { useState } from 'react'
import { useAuthActions } from '@convex-dev/auth/react'
import { FiShield } from 'react-icons/fi'
import { useNavigate } from '@tanstack/react-router'

export function SignupForm() {
  const { signIn } = useAuthActions()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      setIsLoading(false)
      return
    }

    // Validate terms agreement
    if (!formData.agreeToTerms) {
      setError('Vous devez accepter les conditions d\'utilisation')
      setIsLoading(false)
      return
    }

    try {
      // Sign up with password provider
      await signIn('password', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        flow: 'signUp'
      })
      
      // Redirect to dashboard after successful signup
      navigate({ to: '/dashboard' })
    } catch (err) {
      setError('Une erreur est survenue lors de l\'inscription')
      console.error('Signup error:', err)
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
          <div className="font-display text-xl">Créer votre compte</div>
          <p className="text-secondary text-sm mt-1">Inscrivez-vous pour accéder à votre portail client.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-[var(--night-80)]/80">
          <FiShield /> Sécurisé
        </div>
      </div>

      {/* Formulaire d'inscription */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}
        <div>
          <label htmlFor="name" className="text-xs font-medium text-[var(--night-80)]/80">Nom complet</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="mt-1 w-full rounded-lg border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/90 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--gold-metallic)]/30"
            placeholder="Entrez votre nom complet"
          />
        </div>
        <div>
          <label htmlFor="email-signup" className="text-xs font-medium text-[var(--night-80)]/80">Email</label>
          <input
            id="email-signup"
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
          <label htmlFor="password-signup" className="text-xs font-medium text-[var(--night-80)]/80">Mot de passe</label>
          <input
            id="password-signup"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="mt-1 w-full rounded-lg border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/90 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--gold-metallic)]/30"
            placeholder="Créez un mot de passe"
          />
        </div>
        <div>
          <label htmlFor="confirm-password" className="text-xs font-medium text-[var(--night-80)]/80">Confirmer le mot de passe</label>
          <input
            id="confirm-password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            className="mt-1 w-full rounded-lg border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/90 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--gold-metallic)]/30"
            placeholder="Confirmez votre mot de passe"
          />
        </div>
        <div className="flex items-start gap-3">
          <input
            id="agree-terms"
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleInputChange}
            required
            className="mt-1 accent-[var(--gold-dark)]"
          />
          <label htmlFor="agree-terms" className="text-xs text-[var(--night-80)]/80 leading-relaxed">
            Je reconnais avoir lu et accepté les <a href="#" className="underline hover:text-[var(--gold-metallic)]">conditions d'utilisation</a> et la <a href="#" className="underline hover:text-[var(--gold-metallic)]">politique de confidentialité</a>
          </label>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary font-display tracking-wide disabled:opacity-50 disabled:cursor-not-allowed w-full"
        >
          {isLoading ? 'Création du compte...' : 'Créer mon compte'}
        </button>
        <div className="text-center text-xs text-[var(--night-80)]/80">
          Vous avez déjà un compte ?{' '}
          <button
            type="button"
            onClick={() => navigate({ to: '/auth' })}
            className="underline hover:text-[var(--gold-metallic)] font-medium"
          >
            Connectez-vous
          </button>
        </div>
      </form>
    </div>
  )
}
