import { useReveal } from "../Hooks/useReveal";
import { FiShield, FiUsers, FiTrendingUp } from "react-icons/fi";

type Feature = {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const features: Array<Feature> = [
  { 
    number: "01", 
    title: "Sécurité & Conformité", 
    description: "Garde sécurisée de vos actifs sous agrément CREPMF, avec une conformité réglementaire rigoureuse pour une tranquillité d'esprit totale.",
    icon: <FiShield className="w-5 h-5" />
  },
  { 
    number: "02", 
    title: "Conseil Privé", 
    description: "Un conseiller dédié, une écoute permanente et une transparence totale sur chaque opération et chaque décision stratégique.",
    icon: <FiUsers className="w-5 h-5" />
  },
  { 
    number: "03", 
    title: "Performance & Exécution", 
    description: "Allocation stratégique sur-mesure, exécution précise sur le marché et recherche indépendante au service de vos rendements.",
    icon: <FiTrendingUp className="w-5 h-5" />
  },
];

export const ValueProps: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();
  const listRef = useReveal<HTMLDivElement>();

  return (
    <section
      ref={sectionRef}
      className="reveal relative py-28 md:py-36 bg-white"
    >
      {/* Background grid for command center vibe */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%230F1115' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24 relative z-10">

        {/* Header Section */}
        <div className="max-w-3xl mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-8 bg-[var(--jaune-or)]" />
            <span
              className="text-[10px] tracking-[0.3em] uppercase"
              style={{ fontFamily: 'var(--font-primary)', fontWeight: 600, color: 'var(--night)' }}
            >
              Le standard Everest
            </span>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display-aptos)',
              fontWeight: 500,
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: 'var(--night)',
            }}
          >
            L'exigence institutionnelle,{' '}
            <span className="block text-[var(--night)]/40 mt-2">
              l'agilité d'un command center.
            </span>
          </h2>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left — Image Widget */}
          <div className="lg:col-span-5 h-[400px] lg:h-auto relative bg-[var(--night)] p-1 rounded-sm overflow-hidden group">
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <span className="w-2 h-2 rounded-full bg-white/20" />
              <span className="w-2 h-2 rounded-full bg-white/20" />
              <span className="w-2 h-2 rounded-full bg-white/20" />
            </div>
            
            <img
              src="/value_props.jpg"
              alt="Expertise financière"
              className="w-full h-full object-cover rounded-sm transition-transform duration-1000 group-hover:scale-105"
              style={{ filter: 'grayscale(0.2) contrast(1.1) brightness(0.9)' }}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--night)]/90 via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-end justify-between border-b border-white/10 pb-4 mb-4">
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-white/50 mb-1">Volume traité</span>
                  <span className="text-2xl font-light text-white tracking-tight">+150 Mds FCFA</span>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] uppercase tracking-widest text-[var(--jaune-or)] mb-1">Status</span>
                  <span className="text-xs text-white/80 font-mono">Actif</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Feature Dashboard Cards */}
          <div ref={listRef} className="reveal-stagger lg:col-span-7 grid grid-cols-1 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="group relative bg-[#f8f8f8] border border-black/5 p-8 md:p-10 transition-colors duration-300 hover:bg-white hover:border-[var(--jaune-or)]/30"
              >
                <div className="absolute top-0 left-0 w-1 h-0 bg-[var(--jaune-or)] transition-all duration-300 group-hover:h-full" />
                
                <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                  <div className="flex items-center gap-4 shrink-0">
                    <span
                      className="text-[10px] font-mono text-[var(--night)]/30 group-hover:text-[var(--jaune-or)] transition-colors"
                    >
                      {f.number}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center text-[var(--night)] group-hover:text-[var(--jaune-or)] group-hover:shadow-sm transition-all">
                      {f.icon}
                    </div>
                  </div>

                  <div>
                    <h3
                      className="mb-3"
                      style={{
                        fontFamily: 'var(--font-display-aptos)',
                        fontWeight: 500,
                        fontSize: '1.4rem',
                        lineHeight: 1.2,
                        color: 'var(--night)',
                      }}
                    >
                      {f.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-primary)',
                        fontWeight: 400,
                        fontSize: '0.95rem',
                        lineHeight: 1.6,
                        color: 'var(--night)',
                        opacity: 0.7,
                      }}
                    >
                      {f.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};


