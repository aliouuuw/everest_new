import { useReveal } from '../Hooks/useReveal';
import { FiAward, FiCheckCircle, FiHeart, FiMessageCircle, FiShield, FiZap } from 'react-icons/fi';
import { EDITORIAL_ICON_WELL_DARK } from '../ui/EditorialCard';
import { EditableText, useContent } from '../../cms';
import { frenchSpaces } from '../../cms/EditableText';
import { HOME_TEXT } from '../../content/home';

const ICONS = [FiAward, FiHeart, FiCheckCircle, FiMessageCircle, FiZap, FiShield];

/** Referential V2.1 §1 « Bloc engagements »: the six names of the N2, then its last sentences. */
export const Capacity: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();
  const gridRef = useReveal<HTMLDivElement>();
  const n2 = frenchSpaces(useContent('home.engagements.n2')?.value || HOME_TEXT['home.engagements.n2']);
  const end = n2.indexOf('. ');
  const names = end > 0 ? n2.slice(0, end).split(' · ') : [];
  const split = names.length === 6;
  const rest = split ? n2.slice(end + 2) : n2;
  const at = rest.lastIndexOf('La société');

  return (
    <section
      ref={sectionRef}
      className="reveal relative overflow-hidden bg-[var(--everest-green)] py-16 md:py-32"
    >
      {/* Footer-style atmospheric glow — bottom-centered, very subtle */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 100%, var(--everest-green-10) 0%, transparent 70%)',
        }}
      />
      {/* Gold top-right atmospheric accent to echo brand warmth */}
      <div
        className="absolute right-0 top-0 h-[45%] w-[45%] pointer-events-none opacity-60"
        style={{
          background:
            'radial-gradient(ellipse at top right, rgba(182,138,62,0.10) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">
        {/* Header — coherent with Positioning: 7/5 split, brand typography */}
        <div className="mb-10 grid grid-cols-1 gap-6 lg:mb-20 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <EditableText id="home.engagements.n1" as="h2" className="luxury-heading-dark">
              {HOME_TEXT['home.engagements.n1']}
            </EditableText>
          </div>
          <div className="lg:col-span-5">
            <p data-cms-id="home.engagements.n2" className="luxury-subheading-dark-left max-w-md lg:ml-auto">
              {split && <span className="sr-only">{names.join(' · ')}. </span>}
              {at > 0 ? <>{rest.slice(0, at)}<a href="/la-societe" className="underline decoration-[var(--jaune-or)] underline-offset-4 hover:text-white">La société</a>{rest.slice(at + 'La société'.length)}</> : rest}
            </p>
          </div>
        </div>

        {/* Capabilities matrix — rounded tray + inner hairlines (softened, same radius as EditorialCard) */}
        <div
          className="overflow-hidden rounded-[1.25rem] border border-white/[0.12] bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
        >
          <div
            ref={gridRef}
            aria-hidden={split ? true : undefined}
            className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 [&>*]:border-white/[0.08]"
          >
          {(split ? names : []).map((name, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={name}
                className={[
                  'group relative flex flex-col px-5 py-6 transition-colors duration-500 hover:bg-white/[0.06] sm:px-6 sm:py-8 lg:px-8',
                  // mobile (1 col): top border on all except first
                  i > 0 ? 'border-t' : '',
                  // sm (2 cols): left border on odd items (col 2), top border on items 2&3 (row 2)
                  i % 2 === 1 ? 'sm:border-l' : 'sm:border-l-0',
                  i >= 2 ? 'sm:border-t' : 'sm:border-t-0',
                  // lg (3 cols): left border except on each row start, top border on the second row
                  i % 3 !== 0 ? 'lg:border-l' : 'lg:border-l-0',
                  i >= 3 ? 'lg:border-t' : 'lg:border-t-0',
                ].join(' ')}
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-[2px] w-0 transition-[width] duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:w-full"
                  style={{ background: 'linear-gradient(90deg, var(--jaune-or), transparent)' }}
                />

                <div className="mb-4 md:mb-10">
                  <div className={`shrink-0 ${EDITORIAL_ICON_WELL_DARK}`}>
                    <Icon className="text-lg" aria-hidden />
                  </div>
                </div>

                <h3 className="font-primary text-xl md:text-2xl font-bold tracking-tight text-white leading-tight">
                  {name}
                </h3>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
};
