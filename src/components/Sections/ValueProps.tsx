import { FaChartLine, FaHandshake, FaShieldAlt } from "react-icons/fa";
import { useReveal } from "../Hooks/useReveal";

export const ValueProps: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();
  const listRef = useReveal<HTMLDivElement>();

  return (
    <section ref={sectionRef} className="reveal py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Text */}
          <div>
            <span className="kicker text-gradient-gold">Pourquoi Everest Finance</span>
            <h2 className="luxury-heading mt-3 mb-5">Exécution rigoureuse, confiance durable</h2>
            <p className="luxury-subheading mb-10">Nous allions discipline de marché, ingénierie financière et accompagnement client pour créer de la valeur sur le long terme.</p>

            <div ref={listRef} className="reveal-stagger pt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="stat-card card-hover">
                <div className="flex items-center gap-3 mb-2">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--white-smoke)] border border-gray-200 text-gray-700"><FaShieldAlt /></div>
                  <div className="font-display">Sécurité</div>
                </div>
                <div className="text-secondary text-sm">Conformité et garde des actifs.</div>
              </div>
              <div className="stat-card card-hover">
                <div className="flex items-center gap-3 mb-2">
                  <div className="border border-[var(--night)]/20 rounded-full p-2"><FaHandshake /></div>
                  <div className="font-display">Accompagnement</div>
                </div>
                <div className="text-secondary text-sm">Conseil dédié et transparent.</div>
              </div>
              <div className="stat-card card-hover">
                <div className="flex items-center gap-3 mb-2">
                  <div className="icon-badge"><FaChartLine /></div>
                  <div className="font-display">Performance</div>
                </div>
                <div className="text-secondary text-sm">Allocation et exécution précises.</div>
              </div>
            </div>
          </div>

          {/* Image placeholder */}
          <div className="relative w-full h-[360px] rounded-2xl overflow-hidden border border-[var(--gold-metallic)]/25 bg-[var(--white-smoke)]/80">
            <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(var(--night-10) 1px, transparent 1px), linear-gradient(90deg, var(--night-10) 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />
            <div className="absolute inset-0 flex items-center justify-center text-secondary">Image Placeholder</div>
          </div>
        </div>
      </div>
    </section>
  );
};


