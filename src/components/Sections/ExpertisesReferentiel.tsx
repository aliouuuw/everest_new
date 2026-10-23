/**
 * Expertises, referential V2.1 §3: a hub with the common intro, and four symmetric pages (§3.1 to §3.4).
 */
import { Link } from '@tanstack/react-router';
import type { TextId } from '../../content';
import { EXPERTISE_ITEMS, type ExpertiseKey } from '../../content/expertises';
import { ArrowUpRight, Label, N1, N2, PageHero, Pair, RULE, Section, TextLink } from '../Referentiel';
import { SITE_NAV } from '../siteNav';

const KEYS = Object.keys(EXPERTISE_ITEMS) as Array<ExpertiseKey>;
const NAV = SITE_NAV.find((item) => item.children)!;
/** Nav children follow the referential order, like EXPERTISE_ITEMS. */
const PATH = Object.fromEntries(KEYS.map((k, i) => [k, NAV.children![i].to])) as Record<ExpertiseKey, string>;

export const expertisePath = (key: ExpertiseKey) => PATH[key];
export const expertiseSlug = (key: ExpertiseKey) => PATH[key].split('/').pop()!;

export const ExpertisesHub = () => (
  <div className="bg-[var(--pure-white)] text-[var(--night)]">
    <PageHero title={NAV.label}>
      <N1 id="expertises.intro.n1" tone="dark" as="p" size="statement" />
      <N2 id="expertises.intro.n2" tone="dark" />
    </PageHero>

    {/* An index, as on the home: one row per expertise, the name links to its page. */}
    <Section tone="light">
      <div className="shadow-[inset_0_-1px_0_var(--home-rule)]">
        {KEYS.map((k) => (
          <article
            key={k}
            id={expertiseSlug(k)}
            className={`group grid scroll-mt-[calc(var(--site-chrome-sticky)+1.5rem)] grid-cols-1 gap-3 py-8 transition-shadow duration-200 hover:shadow-[inset_0_1px_0_var(--home-gold)] focus-within:shadow-[inset_0_1px_0_var(--home-gold)] lg:grid-cols-12 lg:gap-16 lg:py-10 ${RULE.light}`}
          >
            <h2 className="lg:col-span-5">
              <Link to={expertisePath(k)} className="home-link text-[var(--home-ink)]">
                <Label id={`expertises.${k}.heading` as TextId} tone="light" as="span" size="title" />
                <ArrowUpRight />
              </Link>
            </h2>
            <div className="lg:col-span-7">
              <N1 id={`expertises.${k}.chapeau` as TextId} tone="light" as="p" size="lead" />
            </div>
          </article>
        ))}
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

      <Section tone="light">
        <div className="flex flex-col gap-12 md:gap-16">
          {items.map((base) => (
            <div key={base} className={`grid grid-cols-1 gap-4 pt-6 md:pt-8 lg:grid-cols-12 lg:gap-16 ${RULE.light}`}>
              <div className="lg:col-span-4">
                <Label id={`${base}.label` as TextId} tone="light" as="h2" size="sub" />
              </div>
              <div className="lg:col-span-8">
                <Pair n1={`${base}.n1` as TextId} n2={`${base}.n2` as TextId} tone="light" as="p" size="card" />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="ivory">
        <nav aria-label={NAV.label} className="flex flex-col sm:flex-row sm:flex-wrap sm:gap-x-10">
          {others.map((k) => (
            <TextLink key={k} to={expertisePath(k)}>
              {NAV.children![KEYS.indexOf(k)].label}
            </TextLink>
          ))}
          <TextLink to="/contact">{SITE_NAV[SITE_NAV.length - 1].label}</TextLink>
        </nav>
      </Section>
    </div>
  );
};
