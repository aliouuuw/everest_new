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
      style={{ background: 'var(--pure-white)' }}
    >
      {/* Mauve atmospheric wash — visible brand presence */}
      <div
        className="absolute top-0 right-0 w-2/3 h-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(70,29,76,0.08) 0%, transparent 65%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-1/2 h-1/2 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at bottom left, rgba(202,148,47,0.06) 0%, transparent 60%)',
        }}
      />

      {/* Full-bleed two-panel split — light themed */}
      <div className="flex flex-col lg:flex-row min-h-[80vh]">

        {/* LEFT PANEL — Full mauve brand surface */}
        <div
          className="relative lg:w-[42%] flex flex-col justify-between px-8 md:px-14 lg:px-16 pt-20 pb-16 lg:pt-28 lg:pb-24"
          style={{ background: 'linear-gradient(160deg, var(--mauve) 0%, #2e1133 100%)' }}
        >
          {/* Gold accent orb */}
          <div
            className="absolute top-0 right-0 w-2/3 h-1/2 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at top right, rgba(202,148,47,0.15) 0%, transparent 60%)' }}
          />
          {/* Vertical gold rule */}
          <div
            className="absolute top-0 left-0 w-[3px] h-full"
            style={{ background: 'linear-gradient(to bottom, transparent, var(--jaune-or) 30%, rgba(202,148,47,0.3) 70%, transparent)' }}
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
                  className="py-8 lg:py-10 flex items-baseline gap-4 group"
                  style={{ borderBottom: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.12)' : 'none' }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 300,
                      fontSize: 'clamp(4rem, 7vw, 6.5rem)',
                      lineHeight: 0.9,
                      letterSpacing: '-0.03em',
                      color: 'var(--pure-white)',
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
                      color: 'rgba(255,255,255,0.65)',
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
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: 'var(--jaune-or)' }}
            />
            <span
              style={{
                fontFamily: 'var(--font-primary)',
                fontWeight: 400,
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              Agrément CREPMF · SGI/DA/2016/60
            </span>
          </div>
        </div>

        {/* Gradient divider between panels */}
        <div 
          className="hidden lg:block w-[1px] self-stretch"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--mauve-40) 50%, transparent)' }}
        />

        {/* RIGHT PANEL — Pure white with mauve gradient accent */}
        <div
          ref={rightRef}
          className="reveal lg:w-[58%] flex flex-col justify-center px-8 md:px-14 lg:px-20 py-20 lg:py-28 relative overflow-hidden"
          style={{ background: 'var(--pure-white)' }}
        >
          {/* Mauve-gold gradient orb */}
          <div
            className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none opacity-30 blur-3xl"
            style={{
              background: 'radial-gradient(circle, var(--mauve-20) 0%, var(--jaune-or-10) 50%, transparent 70%)',
            }}
          />

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
                  background: 'linear-gradient(135deg, var(--mauve) 0%, var(--jaune-or) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                confiance durable.
              </em>
            </h2>

            <div
              className="my-10 h-[2px] w-24"
              style={{ background: 'linear-gradient(90deg, var(--jaune-or), var(--mauve), transparent)' }}
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

            {/* Three pillars — horizontal strip with gradient borders */}
            <div className="mt-14 grid grid-cols-3 gap-0">
              {[
                { label: 'Sécurité', sub: 'Agrément CREPMF' },
                { label: 'Accompagnement', sub: 'Conseiller dédié' },
                { label: 'Performance', sub: 'Recherche indépendante' },
              ].map((p, i) => (
                <div
                  key={p.label}
                  className="pr-6"
                  style={{ 
                    borderLeft: i > 0 ? '1px solid transparent' : 'none', 
                    paddingLeft: i > 0 ? '1.5rem' : 0,
                    background: i > 0 ? 'linear-gradient(to bottom, transparent, rgba(70,29,76,0.25) 50%, transparent) 0 0 / 1px 100% no-repeat' : 'none'
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-display-aptos)',
                      fontWeight: 500,
                      fontSize: '0.95rem',
                      background: 'linear-gradient(135deg, var(--night) 0%, var(--mauve) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
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


