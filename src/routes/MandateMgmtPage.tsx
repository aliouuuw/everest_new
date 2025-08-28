import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export const MandateMgmtPage = () => (
  <div className="min-h-screen bg-[var(--pure-white)] text-[var(--night)]">
    <Header />
    <main className="mx-auto max-w-6xl px-5 pt-32 pb-16">
      <h1 className="font-display text-3xl mb-4">Gestion sous-mandat</h1>
      <p className="text-secondary">Gestion discrétionnaire sous mandat.</p>
    </main>
    <Footer />
  </div>
)


