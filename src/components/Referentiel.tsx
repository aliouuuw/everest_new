/**
 * Building blocks for referential V2.1 pages.
 * Each N1 sits on a gold rule and each N2 on a green rule (Part III: « N1 sur filet doré, N2 sur filet vert »).
 * No reveal animation: every text is visible without JavaScript.
 * Global CSS beats Tailwind here: no `font-primary` class (it forces weight 400) and heading line-heights use `!`.
 */
import type { ElementType, ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { EditableText } from '../cms';
import { TEXT, type TextId } from '../content';

export type Tone = 'light' | 'ivory' | 'dark';

/** N2 rule: charter #1A3A35 on light grounds, a light tint of it on dark (DESIGN-PLAN 2.3). */
export const GREEN_RULE = { light: 'var(--everest-green-mid)', ivory: 'var(--everest-green-mid)', dark: 'color-mix(in srgb, var(--everest-green-mid) 45%, white)' };

/**
 * A text on its rule. In a Pair the N1 rule runs down through the gap into the N2 rule,
 * so the pair reads as one line: gold, then green.
 */
export const Filet = ({ color, width = 3, join, children }: { color: string; width?: 2 | 3; join?: 'down' | 'up'; knot?: boolean; children: ReactNode }) => (
  <div className="relative pl-5 md:pl-6">
    <span
      aria-hidden
      className={`absolute rounded-full ${width === 3 ? 'left-0 w-[3px]' : 'left-[0.5px] w-[2px]'} ${join === 'up' ? 'top-0' : 'top-[0.2em]'}`}
      style={{ background: color, bottom: join === 'down' ? 'calc(-1 * var(--pair-gap))' : '0.2em' }}
    />
    {children}
  </div>
);

const N1_SIZE = {
  section: 'text-[clamp(1.5rem,1.05rem+1.5vw,2.25rem)] font-bold leading-[1.18]! tracking-[-0.01em]',
  statement: 'text-[clamp(1.375rem,1rem+1.25vw,2rem)] font-semibold leading-[1.3]! tracking-[-0.01em]',
  card: 'text-lg md:text-xl font-semibold leading-snug!',
  /** The peaks of a page (home proofs, governance): one step above the section heading. */
  peak: 'text-[clamp(1.625rem,1rem+2.3vw,3rem)] font-bold leading-[1.08]! tracking-[-0.02em] [font-variant-numeric:lining-nums_tabular-nums]',
};

export const N1 = ({ id, tone, as = 'h2', size = 'section', joined }: { id: TextId; tone: Tone; as?: ElementType; size?: keyof typeof N1_SIZE; joined?: boolean; knot?: boolean }) => (
  <Filet color="var(--jaune-or)" join={joined ? 'down' : undefined}>
    <EditableText
      id={id}
      as={as}
      className={`text-balance ${N1_SIZE[size]} ${tone === 'dark' ? 'text-white' : 'text-[var(--everest-green)]'}`}
    >
      {TEXT[id]}
    </EditableText>
  </Filet>
);

export const N2 = ({ id, tone, joined }: { id: TextId; tone: Tone; joined?: boolean }) => (
  <Filet color={GREEN_RULE[tone]} width={2} join={joined ? 'up' : undefined}>
    <EditableText
      id={id}
      as="p"
      className={`max-w-[36em] text-pretty text-base md:text-[1.0625rem] leading-relaxed ${tone === 'dark' ? 'text-white/75' : 'text-[var(--night-80)]'}`}
    >
      {TEXT[id]}
    </EditableText>
  </Filet>
);

export const Pair = ({ n1, n2, tone, as, size }: { n1: TextId; n2: TextId; tone: Tone; as?: ElementType; size?: keyof typeof N1_SIZE; knot?: boolean }) => (
  <div className="flex flex-col gap-[var(--pair-gap)] [--pair-gap:1.25rem] md:[--pair-gap:1.5rem]">
    <N1 id={n1} tone={tone} as={as} size={size} joined />
    <N2 id={n2} tone={tone} joined />
  </div>
);

const GROUND = { light: 'var(--pure-white)', ivory: 'var(--summit-ivory)', dark: 'var(--everest-green)' };

export const Section = ({ tone, children, id, peak, className = '' }: { tone: Tone; children: ReactNode; id?: string; peak?: boolean; rope?: ReactNode | boolean; className?: string }) => (
  <section
    id={id}
    className={`${peak ? 'py-20 md:py-36' : 'py-16 md:py-28'} ${className}`}
    style={{ background: GROUND[tone] }}
  >
    <div className="page-container">{children}</div>
  </section>
);

/** Up-right arrow, drawn to match the 3px rules. */
export const ArrowUpRight = () => (
  <svg aria-hidden viewBox="0 0 16 16" className="ml-1 inline h-3.5 w-3.5 align-[-0.1em] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 11.5l7-7M6 4.5h5.5V10" />
  </svg>
);

export const TextLink = ({ to, children, tone = 'light', arrow = true }: { to: string; children: ReactNode; tone?: Tone; arrow?: boolean }) => (
  <Link
    to={to}
    className={`group inline py-3.5 text-[0.95rem] font-semibold transition-colors duration-300 ${
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


const LABEL_SIZE = {
  section: 'text-[clamp(1.75rem,1.2rem+1.8vw,2.75rem)] font-bold leading-[1.1]! tracking-[-0.015em]',
  sub: 'text-sm md:text-[0.95rem] font-bold',
};

/** A referential heading (section title or block label), shown without a rule. */
export const Label = ({ id, tone, as = 'h2', size = 'section' }: { id: TextId; tone: Tone; as?: ElementType; size?: keyof typeof LABEL_SIZE }) => (
  <EditableText
    id={id}
    as={as}
    className={`text-balance ${LABEL_SIZE[size]} ${
      tone === 'dark' ? (size === 'sub' ? 'text-[var(--or-clair)]' : 'text-white') : size === 'sub' ? 'text-[var(--everest-green)]/70' : 'text-[var(--everest-green)]'
    }`}
  >
    {TEXT[id]}
  </EditableText>
);

/** A labelled N1/N2 pair (label as a sub-heading above the pair). */
export const Block = ({ label, n1, n2, tone, size = 'statement' }: { label: TextId; n1: TextId; n2: TextId; tone: Tone; size?: 'statement' | 'card' }) => (
  <div className="flex flex-col gap-5">
    <Label id={label} tone={tone} as="h3" size="sub" />
    <Pair n1={n1} n2={n2} tone={tone} as="p" size={size} />
  </div>
);

/** Dark page hero: page title (a menu label), then the page N1/N2 or chapeau. */
export const PageHero = ({ title, children }: { title: string; children?: ReactNode }) => (
  <section className="bg-[var(--everest-green)] pt-[180px] pb-14 md:pb-20">
    <div className="page-container">
      <h1
        className={`font-bold leading-[0.95]! tracking-tight text-white ${children ? 'mb-10 md:mb-14' : ''}`}
        style={{ fontSize: 'clamp(2.375rem, 4.6vw + 1.2rem, 50px)' }}
      >
        {title}
      </h1>
      {children && <div className="flex max-w-4xl flex-col gap-6">{children}</div>}
    </div>
  </section>
);
