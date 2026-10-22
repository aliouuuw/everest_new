/**
 * Home page blocks, referential V2.1 §1, in the referential order.
 * Each N1 sits on a gold rule and each N2 on a green rule (Part III: « N1 sur filet doré, N2 sur filet vert »).
 * No reveal animation: every text is visible without JavaScript.
 */
import type { ElementType, ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { EditableText } from '../../cms';
import { HOME_TEXT, type HomeTextId } from '../../content/home';
import { SITE_NAV } from '../siteNav';

type Tone = 'light' | 'ivory' | 'dark';

const GREEN_RULE = { light: 'var(--everest-green)', ivory: 'var(--everest-green)', dark: 'color-mix(in srgb, var(--everest-green-mid) 55%, white)' };

const Filet = ({ color, children }: { color: string; children: ReactNode }) => (
  <div className="relative pl-5 md:pl-6">
    <span aria-hidden className="absolute left-0 top-[0.2em] bottom-[0.2em] w-[3px] rounded-full" style={{ background: color }} />
    {children}
  </div>
);

const N1_SIZE = {
  section: 'text-[clamp(1.5rem,1.05rem+1.5vw,2.25rem)] font-bold leading-[1.18]! tracking-[-0.01em]',
  statement: 'text-[clamp(1.375rem,1rem+1.25vw,2rem)] font-semibold leading-[1.3]! tracking-[-0.01em]',
  card: 'text-lg md:text-xl font-semibold leading-snug!',
};

const N1 = ({ id, tone, as = 'h2', size = 'section' }: { id: HomeTextId; tone: Tone; as?: ElementType; size?: keyof typeof N1_SIZE }) => (
  <Filet color="var(--jaune-or)">
    <EditableText
      id={id}
      as={as}
      className={`text-balance ${N1_SIZE[size]} ${tone === 'dark' ? 'text-white' : 'text-[var(--everest-green)]'}`}
    >
      {HOME_TEXT[id]}
    </EditableText>
  </Filet>
);

const N2 = ({ id, tone }: { id: HomeTextId; tone: Tone }) => (
  <Filet color={GREEN_RULE[tone]}>
    <EditableText
      id={id}
      as="p"
      className={`max-w-[62ch] text-base md:text-[1.0625rem] leading-relaxed ${tone === 'dark' ? 'text-white/75' : 'text-[var(--night-80)]'}`}
    >
      {HOME_TEXT[id]}
    </EditableText>
  </Filet>
);

const Pair = ({ n1, n2, tone, as, size }: { n1: HomeTextId; n2: HomeTextId; tone: Tone; as?: ElementType; size?: keyof typeof N1_SIZE }) => (
  <div className="flex flex-col gap-5 md:gap-6">
    <N1 id={n1} tone={tone} as={as} size={size} />
    <N2 id={n2} tone={tone} />
  </div>
);

const Section = ({ tone, children, id }: { tone: Tone; children: ReactNode; id?: string }) => (
  <section
    id={id}
    className={`py-16 md:py-28 ${
      tone === 'dark' ? 'bg-[var(--everest-green)]' : tone === 'ivory' ? 'bg-[var(--summit-ivory)]' : 'bg-[var(--pure-white)]'
    }`}
  >
    <div className="page-container">{children}</div>
  </section>
);

/** Up-right arrow, drawn to match the 3px rules. */
const ArrowUpRight = () => (
  <svg aria-hidden viewBox="0 0 16 16" className="ml-1 inline h-3.5 w-3.5 align-[-0.1em] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 11.5l7-7M6 4.5h5.5V10" />
  </svg>
);

const TextLink = ({ to, children, tone = 'light', arrow = true }: { to: string; children: ReactNode; tone?: Tone; arrow?: boolean }) => (
  <Link
    to={to}
    className={`group inline text-[0.95rem] font-semibold transition-colors duration-300 ${
      tone === 'dark' ? 'text-[var(--or-clair)] hover:text-white' : 'text-[var(--everest-green)] hover:text-[var(--jaune-or)]'
    }`}
  >
    {children}
    {arrow && (
      <span className={`whitespace-nowrap ${tone === 'dark' ? '' : 'text-[var(--jaune-or)]'}`}>
        {'\u00a0'}
        <ArrowUpRight />
      </span>
    )}
  </Link>
);

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
