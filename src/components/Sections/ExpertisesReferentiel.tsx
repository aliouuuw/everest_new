/**
 * Expertises, referential V2.1 §3: a hub with the common intro, and four symmetric pages (§3.1 to §3.4).
 */
import type { ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import type { TextId } from '../../content';
import { EXPERTISE_ITEMS, type ExpertiseKey } from '../../content/expertises';
import { Label, N1, N2, Pair, Section, TextLink } from '../Referentiel';
import { SITE_NAV } from '../siteNav';

const KEYS = Object.keys(EXPERTISE_ITEMS) as Array<ExpertiseKey>;
const NAV = SITE_NAV.find((item) => item.children)!;
/** Nav children follow the referential order, like EXPERTISE_ITEMS. */
const PATH = Object.fromEntries(KEYS.map((k, i) => [k, NAV.children![i].to])) as Record<ExpertiseKey, string>;

export const expertisePath = (key: ExpertiseKey) => PATH[key];
export const expertiseSlug = (key: ExpertiseKey) => PATH[key].split('/').pop()!;

const Hero = ({ children }: { children: ReactNode }) => (
  <section className="bg-[var(--everest-green)] pt-[180px] pb-14 md:pb-20">
    <div className="page-container">{children}</div>
  </section>
);

const H1_STYLE = { fontSize: 'clamp(2.375rem, 4.6vw + 1.2rem, 50px)' };

export const ExpertisesHub = () => (
  <div className="bg-[var(--pure-white)] text-[var(--night)]">
    <Hero>
      <h1 className="mb-10 font-bold leading-[0.95]! tracking-tight text-white md:mb-14" style={H1_STYLE}>
        {NAV.label}
      </h1>
      <div className="flex max-w-4xl flex-col gap-6">
        <N1 id="expertises.intro.n1" tone="dark" as="p" size="statement" />
        <N2 id="expertises.intro.n2" tone="dark" />
      </div>
    </Hero>

    <Section tone="ivory">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
        {KEYS.map((k) => (
          <article
            key={k}
            id={expertiseSlug(k)}
            className="flex scroll-mt-[calc(var(--site-chrome-sticky)+1.5rem)] flex-col gap-6 rounded-[1.25rem] border border-[var(--everest-green)]/10 bg-[var(--pure-white)] p-7 md:p-10"
          >
            <h2 className="text-lg font-bold md:text-xl">
              <TextLink to={expertisePath(k)}>
                <Label id={`expertises.${k}.heading` as TextId} tone="light" as="span" size="sub" />
              </TextLink>
            </h2>
            <N1 id={`expertises.${k}.chapeau` as TextId} tone="light" as="p" size="card" />
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
      <Hero>
        <Link
          to={NAV.to}
          className="mb-6 inline-block text-[0.95rem] font-semibold text-[var(--or-clair)] transition-colors duration-300 hover:text-white"
        >
          {NAV.label}
        </Link>
        <h1 className="mb-10 font-bold leading-[1.02]! tracking-tight text-white md:mb-14" style={H1_STYLE}>
          <Label id={`expertises.${expertise}.heading` as TextId} tone="dark" as="span" />
        </h1>
        <div className="max-w-4xl">
          <N1 id={`expertises.${expertise}.chapeau` as TextId} tone="dark" as="p" size="statement" />
        </div>
      </Hero>

      <Section tone="light">
        <div className="flex flex-col gap-14 md:gap-20">
          {items.map((base) => (
            <div key={base} className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-16">
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
        <nav aria-label={NAV.label} className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-x-10">
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
