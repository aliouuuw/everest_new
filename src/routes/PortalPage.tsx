import { Header } from '../components/Header'

export const PortalPage = () => (
  <div className="min-h-screen bg-[var(--pure-white)] text-[var(--night)]">
    <Header />
    <main className="mx-auto max-w-6xl px-5 pt-32 pb-16">
      <h1 className="font-display text-3xl mb-4">Accès Client</h1>
      <p className="text-secondary">Connexion au portail client.</p>
    </main>
  </div>
)


