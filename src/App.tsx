import { HeroSection } from './components/Hero';
import { CTA, ClientPortalPreview, Insights, PerformanceDashboard, Services, ValueProps } from './components/Sections';

function App() {
  return (
    <>
      {/* Hero Section - Full viewport background */}
      <HeroSection />
      <ValueProps />
      <Services />
      <Insights />
      <PerformanceDashboard />
      <ClientPortalPreview />
      <CTA scheme="ivory" />
    </>
  );
}

export default App;