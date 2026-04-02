import { HeroSectionMountain } from './components/Hero';
import { CTA, Insights, Services, ValueProps, NewsSection, HomeFAQ } from './components/Sections';

function App() {
  return (
    <>
      <HeroSectionMountain />
      <ValueProps />
      <Services />
      <Insights />
      <NewsSection />
      <HomeFAQ />
      <CTA secondaryHref="https://everest-account-opening.vercel.app/new-home" secondaryLabel="Ouvrir un compte" />
    </>
  );
}

export default App;
