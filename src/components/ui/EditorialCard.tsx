import { FiArrowRight } from 'react-icons/fi';

export type EditorialCardVariant = 'light' | 'dark';

type EditorialCardProps = {
  variant: EditorialCardVariant;
  icon: React.ElementType;
  kicker: string;
  title: string;
  bullets: string[];
  href: string;
  linkLabel: string;
  className?: string;
  /** e.g. Roman numeral accent for expertises */
  index?: string;
};

/** Icon frame — same structure as expertises (Services) cards; use on- or off-mauve surfaces. */
export const EDITORIAL_ICON_WELL_LIGHT =
  'w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-colors duration-500 ' +
  'bg-[var(--mauve-05)] border-[var(--mauve-10)] text-[var(--night-80)] ' +
  'group-hover:border-[var(--mauve)] group-hover:bg-[var(--mauve-10)]';

export const EDITORIAL_ICON_WELL_DARK =
  'w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border text-[var(--jaune-or)] transition-colors duration-500 ' +
  'bg-[rgba(203,152,36,0.12)] border-[rgba(203,152,36,0.25)] ' +
  'group-hover:border-[var(--jaune-or)] group-hover:bg-[var(--jaune-or)] group-hover:text-[var(--night)]';

const wellLight = EDITORIAL_ICON_WELL_LIGHT;
const wellDark = EDITORIAL_ICON_WELL_DARK;

export const EditorialCard: React.FC<EditorialCardProps> = ({
  variant,
  icon: Icon,
  kicker: _kicker,
  title,
  bullets,
  href,
  linkLabel,
  className = '',
  index: _index,
}) => {
  const isDark = variant === 'dark';
  const isExternal = /^https?:\/\//i.test(href);

  return (
    <article
      className={[
        'group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] p-7 md:p-8 transition-all duration-500',
        isDark
          ? 'border border-white/[0.08] bg-[rgba(255,255,255,0.02)] shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_20px_40px_-20px_rgba(1,45,42,0.5)] hover:-translate-y-1 backdrop-blur-2xl'
          : 'border border-[var(--mauve-10)] bg-[var(--pure-white)] shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:border-[var(--mauve-20)] hover:shadow-[var(--shadow-card-lift)]',
        className,
      ].join(' ')}
    >
      {!isDark && (
        <span
          aria-hidden
          className="absolute left-0 top-0 h-[2px] w-0 transition-[width] duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:w-full"
          style={{ background: 'linear-gradient(90deg, var(--jaune-or), transparent)' }}
        />
      )}
      {isDark && (
        <span
          aria-hidden
          className="absolute left-0 top-0 h-[2px] w-0 transition-[width] duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:w-full"
          style={{ background: 'linear-gradient(90deg, var(--jaune-or), transparent)' }}
        />
      )}

      <header className="mb-5 flex items-start justify-between gap-3">
        <div className={isDark ? wellDark : wellLight}>
          <Icon className="text-lg" aria-hidden />
        </div>
      </header>

      <h3
        className="mb-4 font-primary text-base font-semibold leading-snug text-[var(--night-80)] md:text-lg"
        style={isDark ? { color: 'var(--pure-white)' } : undefined}
      >
        {title}
      </h3>

      <ul
        className="mb-6 flex-1 space-y-2.5 font-primary text-sm font-light leading-relaxed text-[var(--night-60)]"
        style={isDark ? { color: 'rgba(255,255,255,0.62)' } : undefined}
      >
        {bullets.map((b) => (
          <li key={b} className="flex gap-2.5 pl-0.5">
            <span
              className="mt-2 h-1 w-1 shrink-0 rounded-full"
              style={{ background: isDark ? 'var(--jaune-or)' : 'var(--mauve)' }}
              aria-hidden
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <a
        href={href}
        className={[
          'mt-auto inline-flex items-center gap-2 font-primary text-sm font-semibold transition-all duration-300',
          isDark
            ? 'text-[var(--jaune-or)] group-hover:gap-3'
            : 'text-[var(--night-80)] group-hover:gap-3',
        ].join(' ')}
        {...(isExternal
          ? { target: '_blank' as const, rel: 'noopener noreferrer' }
          : {})}
      >
        {linkLabel}
        <FiArrowRight className="text-base opacity-80 transition-transform duration-300 group-hover:translate-x-0.5" />
      </a>
    </article>
  );
};
