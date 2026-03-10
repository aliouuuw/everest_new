import { useReveal } from "../Hooks/useReveal";

type Service = {
  number: string;
  title: string;
  desc: string;
  href: string;
};

const services: Array<Service> = [
  {
    number: "I",
    title: 'Ingénierie financière',
    desc: "Structuration d'opérations, levées de fonds, émissions obligataires et placements primaires sur le marché régional.",
    href: "/ingenieurie-financiere",
  },
  {
    number: "II",
    title: 'Marché des capitaux',
    desc: "Gestion sous-mandat, courtage actions et obligations BRVM, émissions primaires et placements institutionnels.",
    href: "/marche-capitaux",
  },
  {
    number: "III",
    title: 'Recherche & analyses',
    desc: "Veille macroéconomique, notes sectorielles, analyses de valeurs et tableaux de bord des marchés UEMOA.",
    href: "/recherche-analyses",
  },
];

export const Services: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();
  const gridRef = useReveal<HTMLDivElement>();

  return (
    <section
      ref={sectionRef}
      className="reveal relative overflow-hidden"
      id="services"
      style={{
        background: 'linear-gradient(175deg, #0f0d12 0%, #1a1420 50%, #0f0d12 100%)',
        paddingTop: 'var(--section-gap)',
        paddingBottom: 'var(--section-gap)',
      }}
    >
      {/* Subtle atmospheric glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 50% at 20% 20%, rgba(70, 29, 76, 0.12) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 40% 40% at 80% 80%, rgba(202, 148, 47, 0.05) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">
        {/* Header */}
        <div className="max-w-xl mb-16 md:mb-20">
          <span
            className="inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase mb-6"
            style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--jaune-or)' }}
          >
            <span className="inline-block w-5 h-[1px]" style={{ background: 'var(--jaune-or)', opacity: 0.5 }} />
            Nos métiers
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.015em',
              color: 'var(--pure-white)',
            }}
          >
            Solutions pour chaque{' '}
            <em style={{ fontWeight: 300, fontStyle: 'italic', color: 'var(--jaune-or)' }}>
              profil investisseur.
            </em>
          </h2>
        </div>

        {/* Service grid */}
        <div ref={gridRef} className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-0">
          {services.map((s, i) => (
            <a
              key={s.title}
              href={s.href}
              className="group relative flex flex-col transition-all duration-500"
              style={{
                padding: 'clamp(2rem, 3vw, 2.5rem) 0',
                paddingRight: i < services.length - 1 ? 'clamp(1.5rem, 3vw, 2.5rem)' : '0',
                paddingLeft: i > 0 ? 'clamp(1.5rem, 3vw, 2.5rem)' : '0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                borderRight: i < services.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              {/* Roman numeral */}
              <span
                className="mb-5"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  fontSize: '0.95rem',
                  color: 'var(--jaune-or)',
                  opacity: 0.35,
                }}
              >
                {s.number}
              </span>

              {/* Title */}
              <h3
                className="mb-4 group-hover:text-[var(--jaune-or)] transition-colors duration-500"
                style={{
                  fontFamily: 'var(--font-display-aptos)',
                  fontWeight: 500,
                  fontSize: '1.4rem',
                  lineHeight: 1.2,
                  color: 'var(--pure-white)',
                }}
              >
                {s.title}
              </h3>

              {/* Description */}
              <p
                className="mb-8 flex-grow"
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontWeight: 300,
                  fontSize: '0.875rem',
                  lineHeight: 1.75,
                  color: 'rgba(255,255,255,0.4)',
                  maxWidth: '22rem',
                }}
              >
                {s.desc}
              </p>

              {/* Link */}
              <span
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase group-hover:text-[var(--jaune-or)] transition-colors duration-500"
                style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'rgba(255,255,255,0.35)' }}
              >
                En savoir plus
                <span className="inline-block w-4 h-[1px] bg-current group-hover:w-8 transition-all duration-500" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};


