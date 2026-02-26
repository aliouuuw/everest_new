import { useReveal } from "../Hooks/useReveal";

type Feature = {
  number: string;
  title: string;
  description: string;
};

const features: Array<Feature> = [
  { number: "01", title: "Sécurité", description: "Conformité réglementaire rigoureuse et garde sécurisée de vos actifs sous agrément CREPMF." },
  { number: "02", title: "Accompagnement", description: "Un conseiller dédié, une écoute permanente et une transparence totale sur chaque opération." },
  { number: "03", title: "Performance", description: "Allocation stratégique, exécution précise et recherche indépendante au service de vos rendements." },
];

export const ValueProps: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();
  const listRef = useReveal<HTMLDivElement>();

  return (
    <section
      ref={sectionRef}
      className="reveal relative py-28 md:py-36"
      style={{ background: 'var(--cream)' }}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">

        {/* Editorial two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Left — heading & image */}
          <div className="lg:col-span-5">
            <span
              className="block text-[10px] tracking-[0.3em] uppercase mb-5"
              style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--gold-metallic)' }}
            >
              Pourquoi Everest Finance
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                lineHeight: 1.0,
                letterSpacing: '-0.01em',
                color: 'var(--night)',
              }}
            >
              Exécution rigoureuse,{' '}
              <em style={{ fontWeight: 300, fontStyle: 'italic', color: 'var(--gold-dark)' }}>
                confiance durable.
              </em>
            </h2>

            {/* Gold rule */}
            <div
              className="h-[1px] w-16 mt-8 mb-8"
              style={{ background: 'linear-gradient(90deg, var(--gold-metallic), transparent)' }}
            />

            <p
              className="max-w-sm"
              style={{
                fontFamily: 'var(--font-primary)',
                fontWeight: 300,
                fontSize: '0.95rem',
                lineHeight: 1.8,
                color: 'var(--night-60)',
              }}
            >
              Nous allions discipline de marché, ingénierie financière et accompagnement client
              pour créer de la valeur sur le long terme.
            </p>

            {/* Image */}
            <div className="mt-10 relative w-full h-[280px] lg:h-[340px] overflow-hidden">
              <img
                src="/value_props.jpg"
                alt="Salle de conférence moderne"
                className="w-full h-full object-cover"
                style={{ filter: 'saturate(0.85) contrast(1.05)' }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top, var(--cream) 0%, transparent 40%)' }}
              />
            </div>
          </div>

          {/* Right — feature cards */}
          <div ref={listRef} className="reveal-stagger lg:col-span-7 flex flex-col gap-0 lg:pt-20">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="group py-8 md:py-10 flex items-start gap-6 md:gap-10"
                style={{
                  borderTop: i === 0 ? '1px solid var(--timberwolf)' : 'none',
                  borderBottom: '1px solid var(--timberwolf)',
                }}
              >
                {/* Number */}
                <span
                  className="shrink-0 mt-1"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 300,
                    fontSize: '2rem',
                    lineHeight: 1,
                    color: 'var(--gold-metallic)',
                    opacity: 0.5,
                  }}
                >
                  {f.number}
                </span>

                <div>
                  <h3
                    className="mb-2"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 500,
                      fontSize: '1.5rem',
                      lineHeight: 1.15,
                      color: 'var(--night)',
                    }}
                  >
                    {f.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontWeight: 300,
                      fontSize: '0.9rem',
                      lineHeight: 1.75,
                      color: 'var(--night-60)',
                      maxWidth: '28rem',
                    }}
                  >
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};


