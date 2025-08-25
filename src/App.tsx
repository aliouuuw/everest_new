import { HeroSection } from './components/Hero';

function App() {
  return (
    <div className="antialiased min-h-screen bg-[var(--pure-white)] text-[var(--night)] relative">
      {/* Hero Section - Full viewport background */}
      <main className="relative z-0">
        <HeroSection />
      </main>

      {/* Header - Overlays the hero */}
      <header className="fixed top-0 left-0 right-0 z-20">
        <div className="mx-auto max-w-6xl px-4 py-1 mt-5 rounded-xl flex items-center justify-between bg-white/70 backdrop-blur supports-[backdrop-filter]:glassmorphism border border-black/5">
          <div className="flex items-center gap-3">
            <img src="/logo-everest.png" alt="Everest Finance" className="h-16 w-18" />
          </div>
          <nav className="hidden sm:flex items-center gap-5 text-sm text-secondary">
            <a href="#services" className="transition-colors hover:text-[var(--gold-dark)]">Services</a>
            <a href="#insights" className="transition-colors hover:text-[var(--gold-dark)]">Marchés</a>
            <a href="#about" className="transition-colors hover:text-[var(--gold-dark)]">À propos</a>
            <a href="#contact" className="transition-colors hover:text-[var(--gold-dark)]">Contact</a>
          </nav>
          <div className="hidden sm:block">
            <a href="#get-started" className="btn-primary font-display tracking-wide">Commencer</a>
          </div>
        </div>
      </header>

      {/* Footer */}
      <footer className="mt-24 mb-10">
        <div className="mx-auto max-w-6xl px-5">
          <div className="border-t border-[var(--night)]/10 pt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="size-5 rounded-md gradient-gold" />
              <span className="kicker opacity-70">Everest Finance SGI — Dakar, Sénégal</span>
            </div>
            <div className="text-secondary text-sm">
              © {new Date().getFullYear()} Everest Finance. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;