import { FiGitBranch, FiGlobe, FiPieChart, FiSend } from 'react-icons/fi';
import { useReveal } from '../Hooks/useReveal';
import { PillBadge } from '../ui';
import { EditableText } from '../../cms';

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
            <div className="mb-6">
              <PillBadge>
                <EditableText id="home.positioning.badge" as="span">
                  Positionnement
                </EditableText>
              </PillBadge>
            </div>
            <h2 className="luxury-heading">
              <EditableText id="home.positioning.title" as="span">Un intermédiaire de référence</EditableText>
              <br />
              <EditableText
                id="home.positioning.titleAccent"
                as="span"
                style={{ color: 'var(--jaune-or)' }}
              >
                au service des flux de capitaux régionaux.
              </EditableText>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <EditableText
              id="home.positioning.intro"
              as="p"
              className="text-secondary text-base md:text-lg leading-relaxed max-w-md lg:ml-auto"
            >
              Agréée AMF-UMOA (n° SGI/DA/2016/60) et ancrée à Dakar, nous relayons depuis plus de 10 ans les
              flux entre émetteurs UEMOA et investisseurs institutionnels ou privés qualifiés.
            </EditableText>
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
            className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          >
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className={[
                  'group relative z-0 flex flex-col border-[var(--mauve-10)] bg-[var(--pure-white)] py-8 px-0 sm:px-6 lg:px-8',
                  'transition-[background-color,box-shadow] duration-500',
                  'hover:z-10 hover:bg-[var(--mauve)] hover:shadow-[0_20px_40px_-20px_rgba(70,29,76,0.35)]',
                  i > 0 ? 'border-t' : '',
                  i % 2 === 1 ? 'sm:border-l' : 'sm:border-l-0',
                  i >= 2 ? 'sm:border-t' : 'sm:border-t-0',
                  i > 0 ? 'lg:border-l' : 'lg:border-l-0',
                  'lg:border-t-0',
                ].join(' ')}
              >
                {/* Top accent — gold on light hover, lighter gold on mauve hover */}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-[2px] w-0 transition-[width] duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:w-full"
                  style={{ background: 'linear-gradient(90deg, var(--jaune-or), transparent)' }}
                />

                <div className="flex items-center gap-4 mb-10">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--mauve-10)] bg-[var(--mauve-05)] text-[var(--mauve)] transition-colors duration-500 group-hover:border-[rgba(203,152,36,0.25)] group-hover:bg-[rgba(203,152,36,0.12)] group-hover:text-[var(--jaune-or)]"
                  >
                    <Icon className="text-lg transition-transform duration-500 group-hover:-translate-y-0.5" aria-hidden />
                  </div>
                </div>

                <h3 className="font-primary text-xl md:text-2xl font-bold tracking-tight text-[var(--mauve)] transition-colors duration-500 group-hover:text-white mb-3 leading-tight">
                  {p.title}
                </h3>
                <p className="font-primary text-sm font-light leading-relaxed text-[var(--night-60)] transition-colors duration-500 group-hover:text-white/75 max-w-xs">
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
