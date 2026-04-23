import { useReveal } from '../Hooks/useReveal';
import { FiGitBranch, FiGlobe, FiSend, FiPieChart } from 'react-icons/fi';

const PILLARS = [
  {
    icon: FiGitBranch,
    num: '01',
    title: 'Structuration',
    desc: "Montages adaptés aux émetteurs publics et privés, coordination des acteurs de la chaîne d'investissement.",
  },
  {
    icon: FiGlobe,
    num: '02',
    title: 'Intermédiation',
    desc: "Discipline d'exécution sur les titres publics et intervention sur le marché financier régional (BRVM).",
  },
  {
    icon: FiSend,
    num: '03',
    title: 'Distribution',
    desc: "Placement d'instruments de dette et de capital auprès d'investisseurs qualifiés.",
  },
  {
    icon: FiPieChart,
    num: '04',
    title: 'Allocation',
    desc: "Conseil stratégique en allocation, alignement sur le profil de risque du portefeuille.",
  },
];

export const Positioning: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();
  const gridRef = useReveal<HTMLDivElement>();

  return (
    <section
      ref={sectionRef}
      className="reveal relative overflow-hidden py-24 md:py-32 bg-[var(--pure-white)]"
    >
      <div
        className="absolute left-0 top-0 h-[60%] w-[45%] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at top left, var(--mauve-05) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">
        {/* Header — tight full-width block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:items-end gap-8 lg:gap-16 mb-16 md:mb-20">
          <div className="lg:col-span-7">
            <h2 className="luxury-heading">
              Un intermédiaire de référence
              <br />
              <span style={{ color: 'var(--jaune-or)' }}>
                au service des flux de capitaux régionaux.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-secondary text-base md:text-lg leading-relaxed max-w-md lg:ml-auto">
              Agréée CREPMF (n° SGI/DA/2016/60) et ancrée à Dakar, nous relayons depuis plus de 10 ans les flux entre
              émetteurs UEMOA et investisseurs institutionnels ou privés qualifiés.
            </p>
          </div>
        </div>

        {/* 4 pillars — softened matrix (rounded shell + inner hairlines, matches EditorialCard radius) */}
        <div
          className="overflow-hidden rounded-[1.25rem] border border-[var(--mauve-10)] bg-[var(--pure-white)]"
          style={{
            boxShadow:
              '0 8px 32px -12px rgba(70,29,76,0.12), inset 0 1px 0 rgba(255,255,255,0.85)',
          }}
        >
          <div
            ref={gridRef}
            className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 [&>*]:border-[var(--mauve-10)]"
          >
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className={[
                  'group relative flex flex-col pt-8 pb-2 px-0 sm:px-6 lg:px-8 transition-colors duration-500 hover:bg-[var(--mauve-05)]',
                  i > 0 ? 'border-t' : '',
                  i % 2 === 1 ? 'sm:border-l' : 'sm:border-l-0',
                  i >= 2 ? 'sm:border-t' : 'sm:border-t-0',
                  i > 0 ? 'lg:border-l' : 'lg:border-l-0',
                  'lg:border-t-0',
                ].join(' ')}
              >
                {/* Top-accent gold line on hover */}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-[2px] w-0 transition-[width] duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:w-full"
                  style={{ background: 'linear-gradient(90deg, var(--jaune-or), transparent)' }}
                />

                {/* Header: numeric + icon */}
                <div className="flex items-center justify-between mb-10">
                  <span className="font-primary text-[11px] font-semibold tracking-[0.22em] text-[var(--mauve-40)]">
                    {p.num}
                  </span>
                  <Icon className="text-lg text-[var(--mauve)] opacity-80 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:text-[var(--jaune-or)]" />
                </div>

                <h3 className="font-primary text-xl md:text-2xl font-bold tracking-tight text-[var(--mauve)] mb-3 leading-tight">
                  {p.title}
                </h3>
                <p className="font-primary text-sm font-light leading-relaxed text-[var(--night-60)] max-w-xs">
                  {p.desc}
                </p>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
};
