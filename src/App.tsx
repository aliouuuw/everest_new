import { HeroSectionMountain } from './components/Hero';
import { CTA, FAQ, Insights, Services, ValueProps, NewsSection } from './components/Sections';

function App() {
  return (
    <>
      {/* Hero Section - Full viewport background */}
      <HeroSectionMountain />
      <ValueProps />
      <Services />
      <CTA scheme="ivory" secondaryHref="https://everest-account-opening.vercel.app/new-home" secondaryLabel={"Découvrir votre profil d'investisseur"} />
      <Insights />
      <NewsSection />
      <FAQ />
    </>
  );
}

export default App;
