/**
 * Building blocks for referential V2.1 pages, drawn in the home system (DESIGN.md):
 * one type scale at weight 500, 1px horizontal rules, square actions, the outward arrow.
 * Part III's « N1 sur filet doré, N2 sur filet vert » codes the levels of the source document;
 * here the N1 leads and the N2 follows in forest-mid, as on the home. No side rails.
 * No reveal animation: every text is visible without JavaScript.
 * Global CSS beats Tailwind here: no `font-primary` class (it forces weight 400) and heading line-heights use `!`.
 */
import type { ElementType, ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { EditableText } from '../cms';
import { TEXT, type TextId } from '../content';

export type Tone = 'light' | 'ivory' | 'dark';

const INK = { light: 'text-[var(--home-ink)]', ivory: 'text-[var(--home-ink)]', dark: 'text-white' };
/** Supporting text: forest-mid on light grounds, white mixed into forest on dark (home.css). */
const SOFT = {
  light: 'text-[var(--home-mid)]',
  ivory: 'text-[var(--home-mid)]',
  dark: 'text-[color-mix(in_srgb,var(--home-white)_82%,var(--home-ink))]',
};
/** The home's 1px rule, as an inset shadow so it never shifts layout. */
export const RULE = {
  light: 'shadow-[inset_0_1px_0_var(--home-rule)]',
  ivory: 'shadow-[inset_0_1px_0_var(--home-rule)]',
  dark: 'shadow-[inset_0_1px_0_color-mix(in_srgb,var(--home-white)_18%,transparent)]',
};

/** Home scale: heading 42, statement 28, title 22, display 68. */
const N1_SIZE = {
  section: 'text-[clamp(28px,2.9vw,42px)] font-medium leading-[1.15]! tracking-[-0.025em]',
  statement: 'text-[clamp(21px,1.95vw,28px)] font-normal leading-[1.45]! tracking-[-0.015em]',
  card: 'text-[19px] md:text-[22px] font-semibold leading-[1.35]! tracking-[-0.015em]',
  /** A chapeau read as text, in an index row. */
  lead: 'text-[17px] md:text-[19px] font-normal leading-[1.55]! tracking-[-0.005em]',
  peak: 'text-[clamp(34px,4.7vw,68px)] font-medium leading-[1.07]! tracking-[-0.035em]',
};

export const N1 = ({ id, tone, as = 'h2', size = 'section' }: { id: TextId; tone: Tone; as?: ElementType; size?: keyof typeof N1_SIZE }) => (
  <EditableText id={id} as={as} className={`max-w-[34em] text-balance ${N1_SIZE[size]} ${INK[tone]}`}>
    {TEXT[id]}
  </EditableText>
);

export const N2 = ({ id, tone }: { id: TextId; tone: Tone }) => (
  <EditableText id={id} as="p" className={`max-w-[36em] text-pretty text-[15px] md:text-base leading-[1.65] ${SOFT[tone]}`}>
    {TEXT[id]}
  </EditableText>
);

export const Pair = ({ n1, n2, tone, as, size }: { n1: TextId; n2: TextId; tone: Tone; as?: ElementType; size?: keyof typeof N1_SIZE }) => (
  <div className={`flex flex-col ${size === 'card' ? 'gap-3' : 'gap-5 md:gap-6'}`}>
    <N1 id={n1} tone={tone} as={as} size={size} />
    <N2 id={n2} tone={tone} />
  </div>
);

const GROUND = { light: 'var(--home-white)', ivory: 'var(--home-paper)', dark: 'var(--home-ink)' };

export const Section = ({ tone, children, id, peak, className = '' }: { tone: Tone; children: ReactNode; id?: string; peak?: boolean; className?: string }) => (
  <section
    id={id}
    className={`${peak ? 'py-20 md:py-36' : 'py-12 md:py-20 lg:py-28'} ${tone === 'dark' ? 'antialiased' : ''} ${className}`}
    style={{ background: GROUND[tone] }}
  >
    <div className="page-container">{children}</div>
  </section>
);

/** The home's outward arrow: straight strokes, square caps. */
export const ArrowUpRight = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M6 18 18 6M8 6h10v10" />
  </svg>
);

export const TextLink = ({ to, children, tone = 'light', arrow = true }: { to: string; children: ReactNode; tone?: Tone; arrow?: boolean }) => (
  <Link
    to={to}
    className={`home-link ${tone === 'dark' ? 'text-white hover:text-[var(--home-gold-light)]!' : 'text-[var(--home-ink)]'}`}
  >
    {children}
    {arrow && <ArrowUpRight />}
  </Link>
);

const LABEL_SIZE = {
  section: N1_SIZE.section,
  title: N1_SIZE.card,
  /** Takes the size of its parent (a page title). */
  inherit: '',
  sub: 'text-[15px] font-semibold leading-[1.4]!',
};

/** A referential heading (section title or block label). */
export const Label = ({ id, tone, as = 'h2', size = 'section' }: { id: TextId; tone: Tone; as?: ElementType; size?: keyof typeof LABEL_SIZE }) => (
  <EditableText
    id={id}
    as={as}
    className={`text-balance ${LABEL_SIZE[size]} ${size === 'sub' && tone === 'dark' ? 'text-[var(--home-gold-light)]' : INK[tone]}`}
  >
    {TEXT[id]}
  </EditableText>
);

/** A labelled N1/N2 pair on the home rule: label, then the pair. */
export const Block = ({ label, n1, n2, tone, size = 'statement' }: { label: TextId; n1: TextId; n2: TextId; tone: Tone; size?: 'statement' | 'card' }) => (
  <div className={`flex flex-col gap-4 pt-6 md:pt-8 ${RULE[tone]}`}>
    <Label id={label} tone={tone} as="h3" size="sub" />
    <Pair n1={n1} n2={n2} tone={tone} as="p" size={size} />
  </div>
);

/** Forest page head: page title (a menu label) at display size, then the page N1/N2 or chapeau. */
export const PageHero = ({ title, above, children }: { title: ReactNode; above?: ReactNode; children?: ReactNode }) => (
  <section className="antialiased bg-[var(--home-ink)] pt-[148px] pb-12 md:pt-[180px] md:pb-20">
    <div className="page-container">
      {above}
      <h1 className={`max-w-[18ch] text-balance text-[clamp(40px,4.7vw,68px)] font-medium leading-[1.07]! tracking-[-0.035em] text-white ${children ? 'mb-8 md:mb-12' : ''}`}>
        {title}
      </h1>
      {children && <div className="flex max-w-4xl flex-col gap-5 md:gap-6">{children}</div>}
    </div>
  </section>
);
