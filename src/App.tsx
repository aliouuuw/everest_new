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
      <CTA scheme="metallic" secondaryHref="https://everest-account-opening.vercel.app/new-home" secondaryLabel="Ouvrir un compte" />
    </>
  );
}

export default App;
