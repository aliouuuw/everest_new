import { FaChartLine, FaHandshake, FaShieldAlt } from "react-icons/fa";
import type { IconType } from "react-icons";
import { useReveal } from "../Hooks/useReveal";

type Feature = {
  icon: IconType;
  title: string;
  description: string;
};

const FeatureItem: React.FC<Feature> = ({ icon: Icon, title, description }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover flex items-start gap-5">
      {/* Decorative gold glow */}
      <div className="pointer-events-none absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[var(--gold-metallic-10)] blur-xl" />
      <div className="relative shrink-0">
        {/* Outer subtle disc */}
        <div className="w-24 h-24 rounded-full bg-[var(--pure-white)] border border-[var(--gold-metallic)]/30 shadow-sm grid place-content-center">
          {/* Inner badge for icon */}
          <div className="w-16 h-16 rounded-full bg-[var(--white-smoke)]/80 border border-[var(--timberwolf)] grid place-content-center text-[var(--night)] text-3xl transition-transform duration-300 group-hover:scale-110">
            <Icon />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[var(--gold-metallic-10)]" />
      </div>

      <div>
        <div className="font-display text-lg mb-1">{title}</div>
        <div className="text-secondary text-sm">{description}</div>
      </div>
    </div>
  );
};

export const ValueProps: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();
  const listRef = useReveal<HTMLDivElement>();

  const features: Feature[] = [
    { icon: FaShieldAlt, title: "Sécurité", description: "Conformité et garde des actifs." },
    { icon: FaHandshake, title: "Accompagnement", description: "Conseil dédié et transparent." },
    { icon: FaChartLine, title: "Performance", description: "Allocation et exécution précises." },
  ];

  return (
    <section ref={sectionRef} className="reveal py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Text */}
          <div>
            <span className="kicker text-gradient-gold">Pourquoi Everest Finance</span>
            <h2 className="luxury-heading mt-3 mb-5">Exécution rigoureuse, confiance durable</h2>
            <p className="luxury-subheading">Nous allions discipline de marché, ingénierie financière et accompagnement client pour créer de la valeur sur le long terme.</p>
          </div>

          {/* Visual side */}
          <div className="relative w-full h-[360px] rounded-2xl overflow-hidden border border-[var(--gold-metallic)]/25 bg-[var(--white-smoke)]/80">
            <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(var(--night-10) 1px, transparent 1px), linear-gradient(90deg, var(--night-10) 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />
            <div className="absolute inset-0 flex items-center justify-center text-secondary">Image Placeholder</div>
          </div>
        </div>

        {/* Features strip spanning full width */}
        <div ref={listRef} className="reveal-stagger mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => (
            <FeatureItem key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};


