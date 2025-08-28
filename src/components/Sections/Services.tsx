import { FaCalculator, FaFileAlt, FaUsers } from "react-icons/fa";
import { useReveal } from "../Hooks/useReveal";
import { useLenisContext } from "../Hooks/useLenisContext.tsx";
import type { IconType } from "react-icons";

type Service = {
  icon: IconType;
  title: string;
  desc: string;
  href: string;
};

const services: Array<Service> = [
  {
    icon: FaCalculator,
    title: 'Ingénierie financière',
    desc: "Structuration, émissions et placements primaires.",
    href: "/ingenieurie-financiere",
  },
  {
    icon: FaUsers,
    title: 'Marché des capitaux',
    desc: "Gestion sous-mandat, émissions primaires, placements.",
    href: "/marche-capitaux",
  },  
  {
    icon: FaFileAlt,
    title: 'Recherche & analyses',
    desc: "Veille, notes et tableaux de bord marchés.",
    href: "/recherche-analyses",
  },
];

const ServiceCard: React.FC<Service> = ({ icon: Icon, title, desc, href }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
      {/* Decorative gold glow */}
      <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />

      <div className="flex items-start gap-5">
        {/* Icon badge */}
        <div className="w-20 h-20 rounded-full bg-[var(--pure-white)] border border-[var(--gold-metallic)]/30 shadow-sm grid place-content-center shrink-0">
          <div className="w-14 h-14 rounded-full bg-[var(--white-smoke)]/80 border border-[var(--timberwolf)] grid place-content-center text-[var(--night)] text-2xl transition-transform duration-300 group-hover:scale-110">
            <Icon />
          </div>
        </div>

        <div>
          <div className="font-display text-lg mb-1">{title}</div>
          <p className="text-secondary text-sm">{desc}</p>
        </div>
      </div>

      {/* Subtle divider and affordance */}
      <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[var(--gold-metallic-10)] to-transparent" />
      <a href={href} className="mt-3 text-xs text-[var(--night-80)]/80 hover:text-[var(--gold-metallic)] transition-colors duration-200 cursor-pointer inline-flex items-center gap-1 group/link">
        En savoir plus
        <span className="text-[var(--night-80)]/60 group-hover/link:text-[var(--gold-metallic)] transition-colors duration-200">→</span>
      </a>
    </div>
  );
};

export const Services: React.FC = () => {
  const { lenis, isReady } = useLenisContext();
  const sectionRef = useReveal<HTMLElement>({
    lenis: isReady ? lenis : undefined,
    triggerOffset: -50
  });
  const gridRef = useReveal<HTMLDivElement>({
    lenis: isReady ? lenis : undefined,
    triggerOffset: -30
  });

  return (
    <section ref={sectionRef} className="reveal py-24 relative overflow-hidden" id="services">
      {/* Background image */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url(/background-sol.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Content overlay */}
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="kicker text-gradient-gold">Nos offres</span>
          <h2 className="luxury-heading mt-3">Solutions pour chaque profil investisseur</h2>
          <p className="luxury-subheading mt-5 pt-10">De la structuration d'opérations aux portefeuilles délégués, nous couvrons l'essentiel du cycle d'investissement.</p>
        </div>

        <div ref={gridRef} className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} href={s.href} />
          ))}
        </div>
      </div>
    </section>
  );
};


