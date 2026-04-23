import { useReveal } from '../Hooks/useReveal';
import { FiTrendingUp, FiUsers, FiBarChart2, FiLayers } from 'react-icons/fi';
import { PillBadge } from '../ui';

const CAPABILITIES = [
  {
    icon: FiTrendingUp,
    num: 'I',
    kicker: 'MTP UEMOA',
    title: "Marché des titres publics",
    desc: "Présence active sur les émissions souveraines et lecture des dynamiques de taux sous-régionales.",
  },
  {
    icon: FiUsers,
    num: 'II',
    kicker: 'Réseau',
    title: "Investisseurs qualifiés",
    desc: "Accès direct à des institutionnels et investisseurs privés pour une distribution sélective.",
  },
  {
    icon: FiBarChart2,
    num: 'III',
    kicker: 'Exécution',
    title: "Obligations & bourse (BRVM)",
    desc: "Transactions sur le compartiment obligataire et intervention sur le marché actions régional.",
  },
  {
    icon: FiLayers,
    num: 'IV',
    kicker: 'Ingénierie',
    title: "Structuration sur mesure",
    desc: "Montage de dette, capital et offres ad hoc au sein d'un processus d'origination rigoureux.",
  },
];

export const Capacity: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();
  const gridRef = useReveal<HTMLDivElement>();

  return (
    <section
      ref={sectionRef}
      className="reveal relative overflow-hidden py-24 md:py-32 bg-[var(--mauve)]"
    >
      {/* Footer-style atmospheric glow — bottom-centered, very subtle */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 100%, var(--mauve-10) 0%, transparent 70%)',
        }}
      />
      {/* Gold top-right atmospheric accent to echo brand warmth */}
      <div
        className="absolute right-0 top-0 h-[45%] w-[45%] pointer-events-none opacity-60"
        style={{
          background:
            'radial-gradient(ellipse at top right, rgba(203,152,36,0.10) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">
        {/* Header — coherent with Positioning: 7/5 split, brand typography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:items-end gap-8 lg:gap-16 mb-16 md:mb-20">
          <div className="lg:col-span-7">
            <div className="mb-6">
              <PillBadge variant="gold">Capacité d&apos;intervention</PillBadge>
            </div>
            <h2 className="luxury-heading-dark">
              Capacité{' '}
              <span style={{ color: 'var(--jaune-or)' }}>opérationnelle</span>
              <br />
              &amp; relationnelle.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="luxury-subheading-dark-left max-w-md lg:ml-auto">
              Exécution de marché éprouvée : présence MTP UEMOA et BRVM, réseau d&apos;investisseurs qualifiés et
              ingénierie sur mesure — au service de +500&nbsp;Mds F CFA levés par nos mandats d&apos;émission.
            </p>
          </div>
        </div>

        {/* Capabilities matrix — rounded tray + inner hairlines (softened, same radius as EditorialCard) */}
        <div
          className="overflow-hidden rounded-[1.25rem] border border-white/[0.12] bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
        >
          <div
            ref={gridRef}
            className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 [&>*]:border-white/[0.08]"
          >
          {CAPABILITIES.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className={[
                  'group relative flex flex-col pt-8 pb-2 px-0 sm:px-6 lg:px-8 transition-colors duration-500 hover:bg-white/[0.06]',
                  // mobile (1 col): top border on all except first
                  i > 0 ? 'border-t' : '',
                  // sm (2 cols): left border on odd items (col 2), top border on items 2&3 (row 2)
                  i % 2 === 1 ? 'sm:border-l' : 'sm:border-l-0',
                  i >= 2 ? 'sm:border-t' : 'sm:border-t-0',
                  // lg (4 cols): left border on all except first, no top border
                  i > 0 ? 'lg:border-l' : 'lg:border-l-0',
                  'lg:border-t-0',
                ].join(' ')}
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-[2px] w-0 transition-[width] duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:w-full"
                  style={{ background: 'linear-gradient(90deg, var(--jaune-or), transparent)' }}
                />

                <div className="flex items-center justify-between mb-10">
                  <span
                    className="font-primary text-[11px] font-semibold tracking-[0.22em]"
                    style={{ color: 'rgba(255,255,255,0.35)' }}
                  >
                    {c.num}
                  </span>
                  <Icon className="text-lg text-[var(--jaune-or)] opacity-85 transition-transform duration-500 group-hover:-translate-y-0.5" />
                </div>

                <p
                  className="font-primary text-[10px] font-semibold uppercase tracking-[0.22em] mb-2"
                  style={{ color: 'var(--jaune-or)' }}
                >
                  {c.kicker}
                </p>

                <h3 className="font-primary text-xl md:text-2xl font-bold tracking-tight text-white mb-3 leading-tight">
                  {c.title}
                </h3>
                <p
                  className="font-primary text-sm font-light leading-relaxed max-w-xs"
                  style={{ color: 'rgba(255,255,255,0.62)' }}
                >
                  {c.desc}
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
