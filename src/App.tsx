import { HeroSection } from './components/Hero';
import { CTA, ClientPortalPreview, Insights, MountainTransition, PerformanceDashboard, Services, ValueProps } from './components/Sections';

function App() {
  return (
    <>
      {/* Hero Section - Full viewport background */}
      <HeroSection />
      <ValueProps />
      <Services />
      <Insights />
      <MountainTransition />
      <PerformanceDashboard />
      <ClientPortalPreview />
      <CTA scheme="metallic" secondaryHref="/gestion-libre" secondaryLabel="Découvrir nos services" />
    </>
  );
}

export default App;
