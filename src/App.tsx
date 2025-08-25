import { HeroSection } from './components/Hero';
import { Header } from './components/Header';
import { CTA, Insights, Services, ValueProps } from './components/Sections';

function App() {
  return (
    <div className="antialiased min-h-screen bg-[var(--pure-white)] text-[var(--night)] relative">
      {/* Hero Section - Full viewport background */}
      <main className="relative z-0">
        <HeroSection />
        <ValueProps />
        <Services />
        <Insights />
        <CTA scheme="metallic" />
      </main>

      {/* Header - Overlays the hero */}
      <Header />

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