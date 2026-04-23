import { HeroSectionMountain } from './components/Hero';
import {
  Capacity,
  CTA,
  FAQ,
  Insights,
  MarketsOpportunities,
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
      {/* PM §5 — Marchés & opportunités (actualités) */}
      <MarketsOpportunities />
      {/* PM §6 — Insights / publications */}
      <Insights />
      <CTA
        scheme="ivory"
        secondaryHref="https://everest-account-opening.vercel.app/new-home"
        secondaryLabel={"Découvrir votre profil d'investisseur"}
      />
      <FAQ />
    </>
  );
}

export default App;
