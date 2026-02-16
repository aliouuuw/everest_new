import { HeroSection } from './components/Hero';
import { CTA, ClientPortalPreview, Insights, MountainTransition, Services, ValueProps } from './components/Sections';
import { InvestmentCalculator } from './components/Sections/InvestmentCalculator';

function App() {
  return (
    <>
      {/* Hero Section - Full viewport background */}
      <HeroSection />
      <ValueProps />
      <Services />
      <Insights />
      <MountainTransition />
      <InvestmentCalculator calculatorOnly />
      <ClientPortalPreview />
      <CTA scheme="metallic" secondaryHref="/gestion-libre" secondaryLabel="Découvrir nos services" />
    </>
  );
}

export default App;
