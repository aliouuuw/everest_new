/**
 * Expertises, referential V2.1 §3: a hub with the common intro, and four symmetric pages (§3.1 to §3.4).
 */
import { Link } from '@tanstack/react-router';
import type { TextId } from '../../content';
import { EXPERTISE_ITEMS, type ExpertiseKey } from '../../content/expertises';
import { ArrowUpRight, Label, N1, N2, PageHero, Pair, RULE, Section } from '../Referentiel';
import { SITE_NAV } from '../siteNav';

const KEYS = Object.keys(EXPERTISE_ITEMS) as Array<ExpertiseKey>;
const NAV = SITE_NAV.find((item) => item.children)!;
/** Nav children follow the referential order, like EXPERTISE_ITEMS. */
const PATH = Object.fromEntries(KEYS.map((k, i) => [k, NAV.children![i].to])) as Record<ExpertiseKey, string>;

/** Placeholder places (MEDIA-PLACEHOLDERS.md): the frame on the hub and the home, the head of each page. */
const PLACE: Record<ExpertiseKey, { frame: string; head: string; position: string }> = {
  mtp: { frame: 'exp-mtp', head: 'mtp', position: '60% 50%' },
  brvm: { frame: 'exp-brvm', head: 'brvm', position: '70% 55%' },
  structuration: { frame: 'exp-structuration', head: 'structuration', position: '78% 40%' },
  privateOffice: { frame: 'exp-private', head: 'private', position: '75% 60%' },
};

const Frame = ({ name, sizes }: { name: string; sizes: string }) => (
  <img
    src={`/home/${name}.webp`}
    srcSet={`/home/${name}-sm.webp 576w, /home/${name}.webp 960w`}
    sizes={sizes}
    alt=""
    aria-hidden="true"
    width={960}
    height={1200}
    loading="lazy"
    decoding="async"
  />
);

export const expertisePath = (key: ExpertiseKey) => PATH[key];
export const expertiseSlug = (key: ExpertiseKey) => PATH[key].split('/').pop()!;

export const ExpertisesHub = () => (
  <div className="bg-[var(--pure-white)] text-[var(--night)]">
    <PageHero title={NAV.label} media={{ name: 'hub', position: '70% 60%' }}>
      <N1 id="expertises.intro.n1" tone="dark" as="p" size="statement" />
      <N2 id="expertises.intro.n2" tone="dark" />
    </PageHero>

    {/* The home's index: one frame, four places. Pointer or focus on a row swaps the frame (CSS :has), no hydration needed. */}
    <Section tone="light">
      <div className="home-expertise-layout mt-0!">
        <div className="home-expertise-media lg:sticky! lg:top-[calc(var(--site-chrome-sticky)+2rem)] lg:self-start">
          {KEYS.map((k) => <Frame key={k} name={PLACE[k].frame} sizes="(max-width: 1023px) 0px, 36vw" />)}
        </div>
        <div className="home-expertise-list">
          {KEYS.map((k) => (
            <article key={k} id={expertiseSlug(k)} className="scroll-mt-[calc(var(--site-chrome-sticky)+1.5rem)] gap-4 py-8! lg:py-10!">
              <h2 className="home-expertise-title">
                <Link to={expertisePath(k)}>
                  <Label id={`expertises.${k}.heading` as TextId} tone="light" as="span" size="inherit" />
                  <ArrowUpRight />
                </Link>
              </h2>
              <N1 id={`expertises.${k}.chapeau` as TextId} tone="light" as="p" size="lead" />
            </article>
          ))}
        </div>
      </div>
    </Section>
  </div>
);

export const ExpertiseDetail = ({ expertise }: { expertise: ExpertiseKey }) => {
  const items = Array.from({ length: EXPERTISE_ITEMS[expertise] }, (_, i) => `expertises.${expertise}.i${i + 1}`);
  const others = KEYS.filter((k) => k !== expertise);
  return (
    <div className="bg-[var(--pure-white)] text-[var(--night)]">
      <PageHero
        media={{ name: PLACE[expertise].head, position: PLACE[expertise].position }}
        title={<Label id={`expertises.${expertise}.heading` as TextId} tone="dark" as="span" size="inherit" />}
        above={
          <Link
            to={NAV.to}
            className="mb-4 inline-flex min-h-11 items-center text-[15px] font-semibold text-[var(--home-gold-light)] transition-colors duration-200 hover:text-white"
          >
            {NAV.label}
          </Link>
        }
      >
        <N1 id={`expertises.${expertise}.chapeau` as TextId} tone="dark" as="p" size="statement" />
      </PageHero>

      {/* Each discipline is named at heading size and stays beside its text while it is read. */}
      <Section tone="light">
        <div className="flex flex-col gap-14 md:gap-20">
          {items.map((base) => (
            <div key={base} className={`grid grid-cols-1 gap-5 pt-6 md:pt-8 lg:grid-cols-12 lg:gap-16 ${RULE.light}`}>
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-[calc(var(--site-chrome-sticky)+2rem)]">
                  <Label id={`${base}.label` as TextId} tone="light" as="h2" size="section" />
                </div>
              </div>
              <div className="lg:col-span-7">
                <Pair n1={`${base}.n1` as TextId} n2={`${base}.n2` as TextId} tone="light" as="p" size="card" />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* The other three places, then the relationship. */}
      <Section tone="ivory">
        <nav aria-label={NAV.label} className="flex flex-col gap-10">
          <ul className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-3">
            {others.map((k) => (
              <li key={k}>
                <Link to={expertisePath(k)} className="group flex flex-col gap-4 text-[var(--home-ink)]">
                  <span className="block aspect-[4/3] overflow-hidden bg-[var(--home-ink)] [&>img]:h-full [&>img]:w-full [&>img]:object-cover [&>img]:transition-[filter] [&>img]:duration-500 group-hover:[&>img]:brightness-110">
                    <Frame name={PLACE[k].frame} sizes="(max-width: 639px) 100vw, 30vw" />
                  </span>
                  <span className="home-link min-h-0! text-[19px]! font-semibold tracking-[-0.015em] group-hover:text-[var(--home-mid)]">
                    {NAV.children![KEYS.indexOf(k)].label}
                    <ArrowUpRight />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div>
            <Link to="/contact" className="home-button">
              {SITE_NAV[SITE_NAV.length - 1].label}
              <ArrowUpRight />
            </Link>
          </div>
        </nav>
      </Section>
    </div>
  );
};
