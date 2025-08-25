import { HeroSection } from './components/Hero';

function App() {
  return (
    <div className="antialiased min-h-screen bg-[var(--pure-white)] text-[var(--night)]">
      {/* Subtle tech grid background */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              `linear-gradient(var(--night-10) 1px, transparent 1px), linear-gradient(90deg, var(--night-10) 1px, transparent 1px)`,
            backgroundSize: '72px 72px',
          }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-20">
        <div className="glassmorphism mx-auto max-w-6xl px-5 py-3 mt-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-7 rounded-md gradient-gold" />
            <div className="brand-heading text-base tracking-tight">Everest Finance</div>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-secondary">
            <a href="#services" className="hover:text-[var(--gold-metallic)] transition-colors">Services</a>
            <a href="#insights" className="hover:text-[var(--gold-metallic)] transition-colors">Insights</a>
            <a href="#about" className="hover:text-[var(--gold-metallic)] transition-colors">About</a>
            <a href="#contact" className="hover:text-[var(--gold-metallic)] transition-colors">Contact</a>
          </nav>
          <div className="hidden sm:block">
            <a href="#get-started" className="btn-primary rounded-lg shimmer-effect font-display tracking-wide">Get started</a>
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
              <span className="kicker opacity-70">Everest Finance</span>
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