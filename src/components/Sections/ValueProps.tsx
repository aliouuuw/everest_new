import { FiAward, FiCalendar, FiLink, FiUsers } from 'react-icons/fi';
import { useReveal } from '../Hooks/useReveal';
import { EDITORIAL_ICON_WELL_LIGHT } from '../ui/EditorialCard';
import { EditableImage, EditableText } from '../../cms';
import { HOME_TEXT, type HomeTextId } from '../../content/home';

/** Referential V2.1 §1 « Bloc preuves »: the four markers, N1 then N2, in the row style of the validated page. */
const PROOFS: Array<{ k: 'proof1' | 'proof2' | 'proof3' | 'proof4'; icon: React.ElementType }> = [
  { k: 'proof1', icon: FiCalendar },
  { k: 'proof2', icon: FiAward },
  { k: 'proof3', icon: FiLink },
  { k: 'proof4', icon: FiUsers },
];

function ProofRow({ k, icon: Icon }: (typeof PROOFS)[number]) {
  const n1 = `home.${k}.n1` as HomeTextId;
  const n2 = `home.${k}.n2` as HomeTextId;
  return (
    <li className="group flex items-start gap-4 py-5 md:gap-5 md:py-6">
      <div className={`shrink-0 ${EDITORIAL_ICON_WELL_LIGHT}`}>
        <Icon className="text-lg" aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <EditableText id={n1} as="h3" className="mb-1 font-primary text-lg font-bold leading-snug! tracking-tight text-[var(--night-80)] md:text-xl">
          {HOME_TEXT[n1]}
        </EditableText>
        <EditableText id={n2} as="p" className="font-primary text-sm font-light leading-relaxed text-[var(--night-60)]">
          {HOME_TEXT[n2]}
        </EditableText>
      </div>
    </li>
  );
}

export const ValueProps: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();
  const contentRef = useReveal<HTMLDivElement>();

  return (
    <section
      ref={sectionRef}
      className="reveal relative overflow-hidden bg-[var(--pure-white)] py-16 md:py-20"
    >
      <div className="page-container">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
          {/* Left — image */}
          <div className="relative min-h-[200px] overflow-hidden rounded-2xl border border-[var(--command-border)] bg-[var(--command-surface)] sm:min-h-[320px] lg:col-span-5 lg:min-h-[460px]">
            <EditableImage
              id="home.valueProps.image"
              src="/Assets_Website/Valueprops1.png"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, transparent 55%, rgba(14,40,38,0.35) 100%)',
              }}
            />
          </div>

          {/* Right — the four proofs */}
          <div
            ref={contentRef}
            className="reveal flex flex-col justify-center lg:col-span-7"
          >
            <ul className="divide-y divide-[var(--command-border)] border-y border-[var(--command-border)]">
              {PROOFS.map((p) => (
                <ProofRow key={p.k} {...p} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
