import { FaChartLine, FaHandshake, FaShieldAlt } from "react-icons/fa";
import { useReveal } from "../Hooks/useReveal";
import type { IconType } from "react-icons";

type Feature = {
  icon: IconType;
  title: string;
  description: string;
};

const FeatureItem: React.FC<Feature> = ({ icon: Icon, title, description }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/20 bg-[var(--night)]/90 backdrop-blur-sm p-6 transition-all card-hover-dark flex items-start gap-5">
      {/* Decorative gold glow */}
      <div className="pointer-events-none absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[var(--gold-metallic)]/10 blur-2xl" />
      <div className="relative shrink-0">
        {/* Outer subtle disc */}
        <div className="w-24 h-24 rounded-full bg-[var(--night)] border border-[var(--gold-metallic)]/30 shadow-[0_0_15px_rgba(202,148,47,0.1)] grid place-content-center">
          {/* Inner badge for icon */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--night)] to-[#1a1d24] border border-[var(--gold-metallic)]/40 grid place-content-center text-[var(--gold-metallic)] text-3xl transition-transform duration-300 group-hover:scale-110 shadow-inner">
            <Icon />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[var(--gold-metallic)]/20 scale-110 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500" />
      </div>

      <div>
        <div className="font-display text-lg mb-1 text-white">{title}</div>
        <div className="text-secondary-dark text-sm">{description}</div>
      </div>
    </div>
  );
};

export const ValueProps: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();
  const listRef = useReveal<HTMLDivElement>();

  const features: Array<Feature> = [
    { icon: FaShieldAlt, title: "Sécurité", description: "Conformité et garde des actifs en toute transparence." },
    { icon: FaHandshake, title: "Accompagnement", description: "Conseil dédié, objectif et sur-mesure." },
    { icon: FaChartLine, title: "Performance", description: "Allocation optimale et exécution précise." },
  ];

  return (
    <section ref={sectionRef} className="reveal py-24 bg-[var(--night)] relative">
      {/* Cinematic subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-[var(--gold-metallic)]/5 blur-[120px] pointer-events-none" />
      
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Text */}
          <div>
            <span className="kicker text-[var(--gold-metallic)] tracking-[0.3em]">POURQUOI EVEREST FINANCE</span>
            <h2 className="luxury-heading-dark mt-4 mb-6">L'excellence au service de vos ambitions.</h2>
            <p className="luxury-subheading-dark text-lg text-white/60">Nous allions discipline de marché, ingénierie financière de pointe et accompagnement personnalisé pour créer une valeur durable dans un environnement complexe.</p>
          </div>

          {/* Visual side */}
          <div className="relative w-full h-[360px] rounded-2xl overflow-hidden border border-[var(--gold-metallic)]/20 bg-black">
            <img 
              src="/value_props.jpg" 
              alt="Salle de conférence moderne avec table de réunion" 
              className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
            />
            {/* Cinematic overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--night)] via-transparent to-[var(--night)]/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--night)]/80 to-transparent" />
          </div>
        </div>

        {/* Features strip spanning full width */}
        <div ref={listRef} className="reveal-stagger mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureItem key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};


