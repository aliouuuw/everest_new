import { HeroSection } from './components/Hero';
import { BRVMTicker, Header } from './components/Header';
import { CTA, ClientPortalPreview, Insights, PerformanceDashboard, Services, ValueProps } from './components/Sections';
import { Footer } from './components/Footer';
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
      <Footer />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}

export default App;