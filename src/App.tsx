import { FaEnvelope, FaLinkedin, FaMapMarkerAlt, FaPhone, FaTwitter } from 'react-icons/fa';
import { HeroSection } from './components/Hero';
import { BRVMTicker, Header } from './components/Header';
import { CTA, ClientPortalPreview, Insights, PerformanceDashboard, Services, ValueProps } from './components/Sections';
import { WhatsAppButton } from './components/WhatsAppButton';

function App() {
  return (
    <div className="antialiased min-h-screen bg-[var(--pure-white)] text-[var(--night)] relative">
      {/* Header - Overlays the hero */}
      <Header />
      
      {/* Hero Section - Full viewport background */}
      <main className="relative z-0">
        <HeroSection />
        <ValueProps />
        <Services />
        <Insights />
        <PerformanceDashboard />
        <ClientPortalPreview />
        <CTA scheme="ivory" />
      </main>


      {/* BRVM Live Ticker */}
      <BRVMTicker />
      {/* Footer */}
      <footer className="mt-24 mb-10">
        <div className="mx-auto max-w-6xl px-5">
          <div className="border-t border-[var(--night)]/10 pt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img src="/logo-everest.png" alt="Everest Finance" className="h-8 w-auto" />
                <span className="font-display">Everest Finance SGI</span>
              </div>
              <p className="text-secondary text-sm">Des idées et des valeurs au service de vos ambitions.</p>
            </div>

            {/* Links */}
            <div>
              <div className="font-display mb-3">Liens</div>
              <ul className="text-sm text-secondary space-y-2">
                <li><a className="hover:text-[var(--gold-dark)] transition-colors" href="#about">À propos</a></li>
                <li><a className="hover:text-[var(--gold-dark)] transition-colors" href="#newsroom">Newsroom</a></li>
                <li><a className="hover:text-[var(--gold-dark)] transition-colors" href="#faq">Abécédaire / FAQ</a></li>
                <li><a className="hover:text-[var(--gold-dark)] transition-colors" href="#performance">Performance</a></li>
                <li><a className="hover:text-[var(--gold-dark)] transition-colors" href="#portal-preview">Portail client</a></li>
              </ul>
            </div>

            {/* Offres & services */}
            <div>
              <div className="font-display mb-3">Offres & services</div>
              <ul className="text-sm text-secondary space-y-2">
                <li><a className="hover:text-[var(--gold-dark)] transition-colors" href="#marche-capitaux">Marché des capitaux</a></li>
                <li><a className="hover:text-[var(--gold-dark)] transition-colors" href="#ingenieurie-financiere">Ingénieurie financière</a></li>
                <li><a className="hover:text-[var(--gold-dark)] transition-colors" href="#recherche-analyses">Recherche et analyses</a></li>
                <li><a className="hover:text-[var(--gold-dark)] transition-colors" href="#gestion-libre">Gestion libre</a></li>
                <li><a className="hover:text-[var(--gold-dark)] transition-colors" href="#gestion-sous-mandat">Gestion sous-mandat</a></li>
                <li><a className="hover:text-[var(--gold-dark)] transition-colors" href="#gestion-assistee">Gestion assistée</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <div className="font-display mb-3">Contact</div>
              <ul className="text-sm text-secondary space-y-2">
                <li className="flex items-start gap-2"><FaMapMarkerAlt className="mt-0.5" /> 18 Boulevard de la République, Dakar, Sénégal</li>
                <li className="flex items-center gap-2"><FaEnvelope /> <a className="hover:text-[var(--gold-dark)] transition-colors" href="mailto:contact@everest-finance.sn">contact@everest-finance.sn</a></li>
                <li className="flex items-center gap-2"><FaPhone /> <a className="hover:text-[var(--gold-dark)] transition-colors" href="tel:+221000000000">+221 00 000 00 00</a></li>
              </ul>
              <div className="flex items-center gap-3 mt-4">
                <a href="#" aria-label="LinkedIn" className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[var(--night)]/10 hover:border-[var(--gold-dark)]/40 text-secondary hover:text-[var(--gold-dark)] transition-colors">
                  <FaLinkedin />
                </a>
                <a href="#" aria-label="Twitter" className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[var(--night)]/10 hover:border-[var(--gold-dark)]/40 text-secondary hover:text-[var(--gold-dark)] transition-colors">
                  <FaTwitter />
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-8 text-secondary text-sm">
            <div>© {new Date().getFullYear()} Everest Finance SGI — Dakar, Sénégal</div>
            <div>CREPMF: SGI/DA/2016/60</div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}

export default App;