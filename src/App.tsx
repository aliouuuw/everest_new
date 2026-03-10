import { HeroSectionMountain } from './components/Hero';
import { CTA, Insights, Services, ValueProps, NewsSection } from './components/Sections';
import { InvestmentCalculator } from './components/Sections/InvestmentCalculator';

function App() {
  return (
    <>
      <HeroSectionMountain />
      <ValueProps />
      <Services />
      <Insights />
      <InvestmentCalculator calculatorOnly />
      <NewsSection />
      <CTA secondaryHref="https://everest-account-opening.vercel.app/new-home" secondaryLabel="Ouvrir un compte" />
    </>
  );
}

export default App;
