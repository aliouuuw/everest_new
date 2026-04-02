import { HeroSectionMountain } from './components/Hero';
import { CTA, Insights, Services, ValueProps, NewsSection, StatsBand } from './components/Sections';

function App() {
  return (
    <>
      <HeroSectionMountain />
      <ValueProps />
      <Services />
      <NewsSection />
      <Insights />
      <CTA secondaryHref="https://everest-account-opening.vercel.app/new-home" secondaryLabel="Ouvrir un compte" />
    </>
  );
}

export default App;
