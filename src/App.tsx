import { HeroSectionMountain } from './components/Hero';
import { CTA, Insights, MountainTransition, Services, ValueProps, NewsSection } from './components/Sections';
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
      <NewsSection />
      <CTA scheme="metallic" secondaryHref="https://everest-account-opening.vercel.app/new-home" secondaryLabel="Ouvrir un compte" />
    </>
  );
}

export default App;
