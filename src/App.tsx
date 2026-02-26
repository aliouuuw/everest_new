import { HeroSectionMountain } from './components/Hero';
import { CTA, ClientPortalPreview, Insights, MountainTransition, Services, ValueProps } from './components/Sections';
import { InvestmentCalculator } from './components/Sections/InvestmentCalculator';

function App() {
  return (
    <>
      {/* Hero Section - Full viewport background */}
      <HeroSectionMountain />
      <ValueProps />
      <Services />
      <Insights />
      <MountainTransition />
      <InvestmentCalculator calculatorOnly />
      <ClientPortalPreview />
      <CTA secondaryHref="https://everest-account-opening.vercel.app/new-home" secondaryLabel="Ouvrir un compte" />
    </>
  );
}

export default App;
