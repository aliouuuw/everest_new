/**
 * Home page blocks, referential V2.1 §1, in the referential order.
 */
import { Link } from '@tanstack/react-router';
import { EditableText } from '../../cms';
import { HOME_TEXT, type HomeTextId } from '../../content/home';
import { SITE_NAV } from '../siteNav';
import { N1, N2, Pair, Section, TextLink } from '../Referentiel';

export const HomePositioning = () => (
  <Section tone="light">
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-7">
        <N1 id="home.positioning.n1" tone="light" size="statement" />
      </div>
      <div className="lg:col-span-5 lg:pt-2">
        <N2 id="home.positioning.n2" tone="light" />
      </div>
    </div>
  </Section>
);

const PROOFS = ['home.proof1', 'home.proof2', 'home.proof3', 'home.proof4'] as const;

export const HomeProofs = () => (
  <Section tone="dark">
    <div className="grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-2 md:gap-y-16">
      {PROOFS.map((key) => (
        <Pair key={key} n1={`${key}.n1` as HomeTextId} n2={`${key}.n2` as HomeTextId} tone="dark" as="h2" size="card" />
      ))}
    </div>
  </Section>
);

export const HomeEngagements = () => (
  <Section tone="ivory">
    <Pair n1="home.engagements.n1" n2="home.engagements.n2" tone="ivory" />
  </Section>
);

export const HomeAnalyses = () => (
  <Section tone="light">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
      <div className="lg:col-span-8">
        <Pair n1="home.analyses.n1" n2="home.analyses.n2" tone="light" />
      </div>
      <div className="pl-5 md:pl-6 lg:col-span-4 lg:justify-self-end lg:pl-0">
        <TextLink to="/analyses">Analyses &amp; Publications</TextLink>
      </div>
    </div>
  </Section>
);

const EXPERTISE_KEYS = ['mtp', 'brvm', 'structuration', 'privateOffice'] as const;
const EXPERTISE_LINKS = SITE_NAV.find((item) => item.children)?.children ?? [];

export const HomeExpertises = () => (
  <Section tone="ivory">
    <div className="mb-12 md:mb-16 max-w-4xl">
      <N1 id="home.expertises.n1" tone="ivory" />
    </div>
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
      {EXPERTISE_KEYS.map((key, i) => {
        const link = EXPERTISE_LINKS[i];
        return (
          <article
            key={key}
            className="flex flex-col gap-6 rounded-[1.25rem] border border-[var(--everest-green)]/10 bg-[var(--pure-white)] p-7 md:p-10"
          >
            <h3 className="text-sm font-bold text-[var(--everest-green)]">
              <TextLink to={link.to + (link.hash ? `#${link.hash}` : '')}>{link.label}</TextLink>
            </h3>
            <div className="flex flex-col gap-5">
              <N1 id={`home.expertises.${key}.n1` as HomeTextId} tone="light" as="p" size="card" />
              <N2 id={`home.expertises.${key}.n2` as HomeTextId} tone="light" />
            </div>
          </article>
        );
      })}
    </div>
  </Section>
);

export const HomeSegments = () => (
  <Section tone="dark">
    <Pair n1="home.segments.n1" n2="home.segments.n2" tone="dark" />
  </Section>
);

export const HomeSamaNaffa = () => (
  <Section tone="light">
    <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-16">
      <div className="md:col-span-4">
        <img src="/sama-naffa-logo.png" alt="Sama Naffa, par EVEREST Finance" width={410} height={230} loading="lazy" className="h-auto w-full max-w-[280px]" />
      </div>
      <div className="flex flex-col gap-8 md:col-span-8">
        <Pair n1="home.samaNaffa.n1" n2="home.samaNaffa.n2" tone="light" />
        <div className="pl-5 md:pl-6">
          <TextLink to="/sama-naffa" arrow={false}>Découvrir Sama Naffa →</TextLink>
        </div>
      </div>
    </div>
  </Section>
);

export const HomeGovernance = () => (
  <Section tone="dark">
    <Pair n1="home.governance.n1" n2="home.governance.n2" tone="dark" />
  </Section>
);

export const HomeFinalCta = () => (
  <Section tone="ivory">
    <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-center sm:gap-10">
      <Link
        to="/contact"
        className="btn-primary-dark inline-flex min-h-[3.5rem] items-center justify-center px-8 text-base font-semibold"
      >
        <EditableText id="home.finalCta.cta1" as="span">{HOME_TEXT['home.finalCta.cta1']}</EditableText>
      </Link>
      <TextLink to="/expertises">
        <EditableText id="home.finalCta.cta2" as="span">{HOME_TEXT['home.finalCta.cta2']}</EditableText>
      </TextLink>
    </div>
  </Section>
);
