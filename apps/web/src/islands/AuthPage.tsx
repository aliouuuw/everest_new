import { FiLock } from 'react-icons/fi'
import { Link } from '@tanstack/react-router'
import { AuthView } from '@/routes/AuthPage'

export default function AuthPageIsland() {
  return (
    <AuthView>
      <div className="group relative overflow-hidden rounded-2xl border border-[var(--jaune-or)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 sm:p-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-display-aptos text-xl">Accéder à votre espace</div>
            <p className="text-secondary text-sm mt-1">
              Le portail client n&apos;est pas encore sur ce site. Identifiants fournis à
              l&apos;activation.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-[rgba(10,10,10,0.8)]/80">
            <FiLock /> Sécurisé
          </div>
        </div>
        <Link
          to="/contact"
          className="btn-primary mt-6 inline-flex min-h-[3rem] items-center justify-center"
        >
          Nous contacter
        </Link>
      </div>
    </AuthView>
  )
}
