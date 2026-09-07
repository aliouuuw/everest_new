import { HeroSectionMountain } from './components/Hero';
import {
  Capacity,
  CTA,
  FAQ,
  InsightsMerged,
  Positioning,
  Services,
  TrustStrip,
  ValueProps,
} from './components/Sections';

function App() {
  return (
    <>
      {/* Hero Section - Full viewport background */}
      <HeroSectionMountain />
      <TrustStrip />
      {/* PM §2 — Positionnement (new) */}
      <Positioning />
      {/* ValueProps — image + animated stats (proof) */}
      <ValueProps />
      {/* PM §3 — Capacité d'intervention (new) */}
      <Capacity />
      {/* PM §4 — Nos expertises */}
      <Services />
      {/* PM §5-6 — Insights : actualités & publications */}
      <InsightsMerged />
      <CTA
        scheme="ivory"
        secondaryHref="https://everest-account-opening.vercel.app/new-home"
        secondaryLabel="Évaluer mon profil d'investisseur"
      />
      <FAQ />
    </>
  );
}

export default App;
