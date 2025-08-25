import { FaCalculator, FaFileAlt, FaUsers } from "react-icons/fa";
import { useReveal } from "../Hooks/useReveal";

const services = [
  {
    icon: <FaCalculator />,
    title: 'Ingénierie financière',
    desc: "Structuration, émissions et placements primaires.",
  },
  {
    icon: <FaUsers />,
    title: 'Gestion sous-mandat',
    desc: "Mandats adaptés à vos objectifs et contraintes.",
  },
  {
    icon: <FaFileAlt />,
    title: 'Recherche & analyses',
    desc: "Veille, notes et tableaux de bord marchés.",
  },
];

export const Services: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();
  const gridRef = useReveal<HTMLDivElement>();

  return (
    <section ref={sectionRef} className="reveal py-24 bg-[var(--white-smoke)]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="kicker text-gradient-gold">Nos offres</span>
          <h2 className="luxury-heading mt-3">Solutions pour chaque profil investisseur</h2>
          <p className="luxury-subheading mt-5 pt-10">De la structuration d’opérations aux portefeuilles délégués, nous couvrons l’essentiel du cycle d’investissement.</p>
        </div>

        <div ref={gridRef} className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12">
          {services.map((s, i) => (
            <div key={i} className="stat-card card-hover">
              <div className="flex items-center gap-3 mb-2">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--white-smoke)] border border-gray-200 text-gray-700">{s.icon}</div>
                <div className="font-display">{s.title}</div>
              </div>
              <div className="text-secondary text-sm">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


