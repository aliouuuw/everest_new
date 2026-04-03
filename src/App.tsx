import { HeroSectionMountain } from './components/Hero';
import { CTA, FAQ, Insights, Services, ValueProps, NewsSection } from './components/Sections';

function App() {
  return (
    <>
      {/* Hero Section - Full viewport background */}
      <HeroSectionMountain />
      <ValueProps />
      <Services />
      <Insights />
      <NewsSection />
      <FAQ />
      <CTA scheme="metallic" secondaryHref="https://everest-account-opening.vercel.app/new-home" secondaryLabel="Ouvrir un compte" />
    </>
  );
}

export default App;
