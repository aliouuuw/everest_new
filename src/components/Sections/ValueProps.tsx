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
      className="reveal relative"
      style={{ background: 'var(--pure-white)', paddingTop: 'var(--section-gap)', paddingBottom: 'var(--section-gap)' }}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">

        {/* Structured two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">

          {/* Left — heading block */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <span
              className="inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase mb-6"
              style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--mauve)' }}
            >
              <span className="inline-block w-5 h-[1px]" style={{ background: 'var(--mauve)', opacity: 0.4 }} />
              Pourquoi Everest Finance
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.015em',
                color: 'var(--night)',
              }}
            >
              Exécution rigoureuse,{' '}
              <em style={{ fontWeight: 300, fontStyle: 'italic', color: 'var(--mauve)' }}>
                confiance durable.
              </em>
            </h2>

            <div
              className="h-[1px] w-16 mt-8 mb-7"
              style={{ background: 'linear-gradient(90deg, var(--jaune-or), transparent)' }}
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
          </div>

          {/* Right — feature rows */}
          <div ref={listRef} className="reveal-stagger lg:col-span-7 flex flex-col">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="group flex items-start gap-6 md:gap-8"
                style={{
                  paddingTop: i === 0 ? '0' : 'clamp(2rem, 3.5vw, 3rem)',
                  paddingBottom: 'clamp(2rem, 3.5vw, 3rem)',
                  borderBottom: '1px solid var(--command-border)',
                }}
              >
                {/* Number */}
                <span
                  className="shrink-0 mt-1"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 300,
                    fontSize: '1.6rem',
                    lineHeight: 1,
                    color: 'var(--mauve)',
                    opacity: 0.3,
                  }}
                >
                  {f.number}
                </span>

                <div>
                  <h3
                    className="mb-2"
                    style={{
                      fontFamily: 'var(--font-display-aptos)',
                      fontWeight: 600,
                      fontSize: '1.3rem',
                      lineHeight: 1.2,
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
                      maxWidth: '26rem',
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


