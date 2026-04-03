import { useReveal } from "../Hooks/useReveal";
import { PillBadge } from '../ui';

const stats = [
  { value: "08", unit: "ans", label: "d'expérience BRVM" },
  { value: "30+", unit: "", label: "années d'expertise cumulée" },
  { value: "03", unit: "", label: "pôles de compétence" },
];

export const ValueProps: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();
  const contentRef = useReveal<HTMLDivElement>();

  return (
    <section
      ref={sectionRef}
      className="reveal relative overflow-hidden bg-[var(--pure-white)]"
    >
      {/* Full-bleed two-panel split */}
      <div className="flex flex-col lg:flex-row min-h-[80vh]">

        {/* LEFT PANEL — Hero Image */}
        <div className="relative lg:w-[45%] min-h-[50vh] lg:min-h-0 overflow-hidden">
          <img
            src="/HERO-.png"
            alt="Sommet montagneux — Everest Finance"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Mauve overlay for brand cohesion */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'var(--gradient-image-overlay)' }}
          />
          {/* Right edge fade into white for seamless transition */}
          <div
            className="absolute inset-y-0 right-0 w-24 pointer-events-none hidden lg:block"
            style={{ background: 'linear-gradient(90deg, transparent 0%, var(--pure-white) 100%)' }}
          />
          {/* Bottom credential strip over image */}
          <div className="absolute bottom-0 left-0 right-0 px-8 md:px-12 py-6 z-10">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[var(--jaune-or)]" />
              <span className="kicker text-white/70">
                Agrément CREPMF · SGI/DA/2016/60
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — Content + Stats */}
        <div
          ref={contentRef}
          className="reveal lg:w-[55%] flex flex-col justify-center px-8 md:px-16 lg:px-20 py-20 lg:py-24 relative bg-[var(--pure-white)]"
        >
          {/* Subtle gradient orb */}
          <div
            className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full pointer-events-none opacity-[0.04] blur-[100px] translate-x-1/3 -translate-y-1/3"
            style={{ background: 'var(--mauve)' }}
          />

          <div className="relative z-10 max-w-2xl">
            {/* Pill badge */}
            <div className="mb-8">
              <PillBadge>Pourquoi Everest Finance</PillBadge>
            </div>

            {/* Heading */}
            <h2 className="luxury-heading mb-6">
              Exécution rigoureuse,<br />
              <span style={{ color: 'var(--jaune-or)' }}>
                confiance durable.
              </span>
            </h2>

            <p className="text-secondary text-base md:text-lg mb-12 max-w-xl">
              Nous allions discipline de marché, ingénierie financière
              et accompagnement client pour créer de la valeur sur le long terme —
              avec la rigueur d'une institution et la réactivité d'un partenaire dédié.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-x-10 gap-y-6 mb-14 pb-14 border-b border-[var(--mauve-10)]">
              {stats.map((s) => (
                <div key={s.label} className="group">
                  <div className="flex items-baseline">
                    <span className="font-primary font-bold text-[3.5rem] md:text-[4.5rem] leading-[0.85] tracking-tight text-[var(--mauve)] numeric-tabular transition-colors duration-500 group-hover:text-[var(--jaune-or)]">
                      {s.value}
                    </span>
                    {s.unit && (
                      <span className="font-primary font-bold text-lg md:text-xl text-[var(--jaune-or)] ml-1.5">
                        {s.unit}
                      </span>
                    )}
                  </div>
                  <span className="font-primary font-light text-sm leading-snug text-[var(--night-60)] mt-1 block max-w-[8rem]">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Three pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10">
              {[
                { label: 'Sécurité', sub: 'Agrément CREPMF', icon: 'shield' },
                { label: 'Accompagnement', sub: 'Conseiller dédié', icon: 'users' },
                { label: 'Performance', sub: 'Recherche indépendante', icon: 'trending-up' },
              ].map((p) => (
                <div
                  key={p.label}
                  className="flex flex-col gap-3 group"
                >
                  <div className="w-10 h-10 rounded-full border border-[var(--mauve-20)] flex items-center justify-center bg-[var(--mauve-05)] transition-colors duration-300 group-hover:border-[var(--mauve)] group-hover:bg-[var(--mauve-10)]">
                    <span className="w-2 h-2 rounded-full bg-[var(--mauve)] transition-transform duration-300 group-hover:scale-150" />
                  </div>
                  <div>
                    <h4 className="font-primary font-semibold text-[var(--mauve)] text-base mb-1">
                      {p.label}
                    </h4>
                    <p className="font-primary font-light text-sm text-[var(--night-60)]">
                      {p.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
