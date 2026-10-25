import { Link } from '@tanstack/react-router';
import { FiArrowRight } from 'react-icons/fi';
import { useReveal } from '../components/Hooks/useReveal';
import { HiArrowRight } from 'react-icons/hi2';
import { EditableImage, EditableText } from '../cms';
import { SITE_NAV } from '../components/siteNav';
import { EXPERTISES_TEXT, EXPERTISE_ITEMS, type ExpertiseKey, type ExpertisesTextId } from '../content/expertises';

/**
 * Expertises, referential V2.1 §3, in the layouts of the validated page:
 * the hub (common intro, one image block per expertise) and the four expertise pages.
 */
const KEYS = Object.keys(EXPERTISE_ITEMS) as Array<ExpertiseKey>;
const NAV = SITE_NAV.find((item) => item.children)!;
/** Nav children follow the referential order, like EXPERTISE_ITEMS. */
const PATH = Object.fromEntries(KEYS.map((k, i) => [k, NAV.children![i].to])) as Record<ExpertiseKey, string>;
export const expertisePath = (key: ExpertiseKey) => PATH[key];
export const expertiseSlug = (key: ExpertiseKey) => PATH[key].split('/').pop()!;

/** The images of the validated hub, by expertise. */
const IMAGES: Record<ExpertiseKey, { cms: string; src: string }> = {
  mtp: { cms: 'expertises.mtp.image', src: '/Assets_Website/mtp.jpg' },
  brvm: { cms: 'expertises.mfr.image', src: '/Assets_Website/mfr.jpg' },
  structuration: { cms: 'expertises.ing.image', src: '/Assets_Website/s-&-if.jpg' },
  privateOffice: { cms: 'expertises.po.image', src: '/Assets_Website/po.jpg' },
};

const titleStyle = { fontSize: 'clamp(2.375rem, 4.6vw + 1.2rem, 50px)' } as const;

const T = ({ id, as = 'span', className }: { id: ExpertisesTextId; as?: 'span' | 'p' | 'h2' | 'h3'; className?: string }) => (
  <EditableText id={id} as={as} className={className}>{EXPERTISES_TEXT[id]}</EditableText>
);

const items = (k: ExpertiseKey) => Array.from({ length: EXPERTISE_ITEMS[k] }, (_, i) => `expertises.${k}.i${i + 1}`);

/** The forest banner of the validated hub: title left, text right on a gold rule. */
const Banner = ({ title, children, above }: { title: React.ReactNode; children?: React.ReactNode; above?: React.ReactNode }) => {
  const heroRef = useReveal<HTMLElement>();
  return (
    <section ref={heroRef} className="relative pt-[200px] pb-12 md:pb-16 border-b border-black/10 bg-[var(--everest-green)]">
      <div className="relative z-10 page-container">
        {above}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-6">
            <h1 className="font-primary font-bold leading-[0.95] tracking-tight text-[var(--pure-white)]" style={titleStyle}>
              {title}
            </h1>
          </div>
          {children && <div className="lg:col-span-6 space-y-4">{children}</div>}
        </div>
      </div>
    </section>
  );
};

export const ExpertisesPage = () => (
  <div className="bg-[var(--pure-white)] text-[var(--night)] font-primary">
    <Banner title={NAV.label}>
      <T id="expertises.intro.n1" as="p" className="text-base md:text-lg leading-relaxed text-white/80 font-light border-l-2 border-[var(--jaune-or)] pl-6" />
      <T id="expertises.intro.n2" as="p" className="text-sm md:text-base leading-relaxed text-white/60 font-light pl-6" />
    </Banner>
    {KEYS.map((k, idx) => (
      <ExpertiseSection key={k} expertise={k} imageLeft={idx % 2 === 0} />
    ))}
  </div>
);

/* ───────── ExpertiseSection — mirrors ValueProps image + copy grid ───────── */
const ExpertiseSection: React.FC<{ expertise: ExpertiseKey; imageLeft: boolean }> = ({ expertise, imageLeft }) => {
  const sectionRef = useReveal<HTMLElement>();
  const href = expertisePath(expertise);
  return (
    <section id={expertiseSlug(expertise)} ref={sectionRef} className="reveal scroll-mt-40 bg-[var(--pure-white)] py-16 md:py-20">
      <div className="page-container">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
          <div className={`relative min-h-[320px] overflow-hidden rounded-2xl border border-[var(--command-border)] bg-[var(--command-surface)] lg:col-span-5 lg:min-h-[460px] ${imageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
            <EditableImage id={IMAGES[expertise].cms} src={IMAGES[expertise].src} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(14,40,38,0.35) 100%)' }} />
          </div>

          <div className={`flex flex-col justify-center lg:col-span-7 ${imageLeft ? 'lg:order-2' : 'lg:order-1'}`}>
            <h2 className="luxury-heading mb-4 max-w-xl">
              <Link to={href} className="hover:text-[var(--night-80)]">
                <T id={`expertises.${expertise}.heading` as ExpertisesTextId} />
              </Link>
            </h2>
            <T id={`expertises.${expertise}.chapeau` as ExpertisesTextId} as="p" className="mb-6 max-w-xl text-sm font-light leading-relaxed text-[var(--night-60)] md:text-base" />

            <ul className="max-w-xl divide-y divide-[var(--command-border)] border-b border-[var(--command-border)]">
              {items(expertise).map((base) => (
                <li key={base}>
                  <Link to={href} hash={base.split('.').pop()} className="group flex items-center gap-3 py-5 md:gap-4 md:py-6 hover:pl-4 transition-all duration-300">
                    <HiArrowRight className="text-[var(--night-80)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    <T id={`${base}.label` as ExpertisesTextId} className="font-primary text-sm font-light leading-relaxed text-[var(--night-80)] md:text-base" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

/** One expertise page: the hub banner, then each discipline in the editorial list of the validated La société page. */
export const ExpertiseDetailPage = ({ expertise }: { expertise: ExpertiseKey }) => {
  const listRef = useReveal<HTMLElement>();
  const others = KEYS.filter((k) => k !== expertise);
  return (
    <div className="bg-[var(--pure-white)] text-[var(--night)] font-primary">
      <Banner
        title={<T id={`expertises.${expertise}.heading` as ExpertisesTextId} />}
        above={
          <Link to={NAV.to} className="mb-6 inline-block text-xs font-bold tracking-[0.3em] uppercase text-[var(--jaune-or)]">
            {NAV.label}
          </Link>
        }
      >
        <T id={`expertises.${expertise}.chapeau` as ExpertisesTextId} as="p" className="text-base md:text-lg leading-relaxed text-white/80 font-light border-l-2 border-[var(--jaune-or)] pl-6" />
      </Banner>

      <section ref={listRef} className="reveal py-12 md:py-20 border-b border-black/10">
        <div className="page-container">
          <div className="border-t border-black/10">
            {items(expertise).map((base) => (
              <div key={base} id={base.split('.').pop()} className="grid grid-cols-1 gap-4 py-8 md:py-10 border-b border-black/10 lg:grid-cols-12 lg:gap-12 scroll-mt-40">
                <T id={`${base}.label` as ExpertisesTextId} as="h2" className="lg:col-span-4 font-primary font-bold text-2xl md:text-3xl text-[var(--night-80)] leading-snug!" />
                <div className="lg:col-span-8">
                  <T id={`${base}.n1` as ExpertisesTextId} as="p" className="font-primary font-bold text-xl md:text-2xl mb-3 text-[var(--night-80)] leading-snug" />
                  <T id={`${base}.n2` as ExpertisesTextId} as="p" className="text-[rgba(10,10,10,0.8)] leading-relaxed text-lg font-light max-w-2xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The other expertises, then the relationship: links in the dark band of the validated hub */}
      <section className="section-bg-light py-12 md:py-20">
        <div className="page-container relative z-10">
          <nav aria-label={NAV.label} className="flex flex-col gap-6 md:flex-row md:flex-wrap md:items-center md:gap-10">
            {others.map((k) => (
              <Link key={k} to={expertisePath(k)} className="group inline-flex items-center gap-3 text-lg font-bold text-white hover:text-[var(--jaune-or)]">
                {NAV.children![KEYS.indexOf(k)].label}
                <FiArrowRight className="text-base transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
            <Link to="/contact" className="btn-primary-dark inline-flex items-center justify-center gap-4 px-10 py-5 text-xs uppercase tracking-[0.2em] font-bold w-fit md:ml-auto">
              {SITE_NAV[SITE_NAV.length - 1].label}
              <FiArrowRight className="text-lg" />
            </Link>
          </nav>
        </div>
      </section>
    </div>
  );
};
