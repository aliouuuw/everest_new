import { HeroSection } from './components/Hero';

function App() {
  return (
    <div className="antialiased min-h-screen bg-[var(--pure-white)] text-[var(--night)]">
      {/* Header */}
      <header className="sticky top-0 z-20">
        <div className="mx-auto max-w-6xl px-5 py-4 mt-5 rounded-xl flex items-center justify-between bg-white/70 backdrop-blur supports-[backdrop-filter]:glassmorphism border border-black/5">
          <div className="flex items-center gap-3">
            <div className="size-6 rounded-sm bg-[var(--night)]" />
            <div className="brand-heading text-sm tracking-tight">Everest Finance</div>
          </div>
          <nav className="hidden sm:flex items-center gap-5 text-sm text-secondary">
            <a href="#services" className="hover:text-[var(--night)] transition-colors">Services</a>
            <a href="#insights" className="hover:text-[var(--night)] transition-colors">Marchés</a>
            <a href="#about" className="hover:text-[var(--night)] transition-colors">À propos</a>
            <a href="#contact" className="hover:text-[var(--night)] transition-colors">Contact</a>
          </nav>
          <div className="hidden sm:block">
            <a href="#get-started" className="btn-primary font-display tracking-wide">Commencer</a>
          </div>
        </div>
      </header>

      <main>
        <HeroSection />
      </main>

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