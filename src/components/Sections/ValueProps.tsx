import { useReveal } from "../Hooks/useReveal";

const stats = [
  { value: "8", unit: "ans", label: "d'expérience BRVM" },
  { value: "30+", unit: "", label: "années d'expertise cumulée" },
  { value: "3", unit: "", label: "pôles de compétence" },
];

export const ValueProps: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();
  const rightRef = useReveal<HTMLDivElement>();

  return (
    <section
      ref={sectionRef}
      className="reveal relative overflow-hidden"
      style={{ background: 'var(--white-smoke)' }}
    >
      {/* Full-bleed two-panel split — light themed */}
      <div className="flex flex-col lg:flex-row min-h-[80vh]">

        {/* LEFT PANEL — Cream, stat wall */}
        <div
          className="relative lg:w-[42%] flex flex-col justify-between px-8 md:px-14 lg:px-16 pt-20 pb-16 lg:pt-28 lg:pb-24"
          style={{ background: 'var(--cream)' }}
        >
          {/* Vertical gold rule */}
          <div
            className="absolute top-0 left-0 w-[2px] h-full"
            style={{ background: 'linear-gradient(to bottom, transparent, var(--jaune-or) 20%, var(--jaune-or) 80%, transparent)' }}
          />

          <div>
            <span
              className="block text-[10px] tracking-[0.35em] uppercase mb-12"
              style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--jaune-or)' }}
            >
              Pourquoi Everest Finance
            </span>

            {/* Oversized stat blocks */}
            <div className="flex flex-col gap-0">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="py-8 lg:py-10 flex items-baseline gap-4"
                  style={{ borderBottom: i < stats.length - 1 ? '1px solid var(--timberwolf)' : 'none' }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 300,
                      fontSize: 'clamp(4rem, 7vw, 6.5rem)',
                      lineHeight: 0.9,
                      letterSpacing: '-0.03em',
                      color: 'var(--mauve)',
                    }}
                  >
                    {s.value}
                  </span>
                  {s.unit && (
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 300,
                        fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)',
                        color: 'var(--jaune-or)',
                        lineHeight: 1,
                      }}
                    >
                      {s.unit}
                    </span>
                  )}
                  <span
                    className="ml-2"
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontWeight: 300,
                      fontSize: '0.8rem',
                      lineHeight: 1.4,
                      color: 'var(--night-60)',
                      letterSpacing: '0.02em',
                      maxWidth: '8rem',
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom credential strip */}
          <div className="mt-12 flex items-center gap-3">
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: 'var(--jaune-or)' }}
            />
            <span
              style={{
                fontFamily: 'var(--font-primary)',
                fontWeight: 400,
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--night-60)',
              }}
            >
              Agrément CREPMF · SGI/DA/2016/60
            </span>
          </div>
        </div>

        {/* RIGHT PANEL — White-smoke, manifesto text */}
        <div
          ref={rightRef}
          className="reveal lg:w-[58%] flex flex-col justify-center px-8 md:px-14 lg:px-20 py-20 lg:py-28 relative overflow-hidden"
          style={{ background: 'var(--white-smoke)' }}
        >
          <div className="relative z-10 max-w-xl">
            {/* Oversized Fraunces quote/manifesto */}
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                fontSize: 'clamp(2rem, 4vw, 3.4rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                color: 'var(--night)',
              }}
            >
              Exécution rigoureuse,{' '}
              <em
                style={{
                  fontStyle: 'italic',
                  color: 'var(--mauve)',
                }}
              >
                confiance durable.
              </em>
            </h2>

            <div
              className="my-10 h-[1px] w-16"
              style={{ background: 'linear-gradient(90deg, var(--jaune-or), transparent)' }}
            />

            <p
              style={{
                fontFamily: 'var(--font-primary)',
                fontWeight: 300,
                fontSize: '1rem',
                lineHeight: 1.85,
                color: 'var(--night-80)',
                maxWidth: '32rem',
              }}
            >
              Nous allions discipline de marché, ingénierie financière
              et accompagnement client pour créer de la valeur sur le long terme —
              avec la rigueur d'une institution et la réactivité d'un partenaire dédié.
            </p>

            {/* Three pillars — horizontal strip */}
            <div className="mt-14 grid grid-cols-3 gap-0">
              {[
                { label: 'Sécurité', sub: 'Agrément CREPMF' },
                { label: 'Accompagnement', sub: 'Conseiller dédié' },
                { label: 'Performance', sub: 'Recherche indépendante' },
              ].map((p, i) => (
                <div
                  key={p.label}
                  className="pr-6"
                  style={{ borderLeft: i > 0 ? '1px solid var(--timberwolf)' : 'none', paddingLeft: i > 0 ? '1.5rem' : 0 }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-display-aptos)',
                      fontWeight: 500,
                      fontSize: '0.95rem',
                      color: 'var(--night)',
                      marginBottom: '0.3rem',
                    }}
                  >
                    {p.label}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontWeight: 300,
                      fontSize: '0.7rem',
                      color: 'var(--night-60)',
                      letterSpacing: '0.03em',
                    }}
                  >
                    {p.sub}
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


