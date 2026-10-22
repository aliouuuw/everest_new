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

const GREEN_RULE = { light: 'var(--everest-green)', ivory: 'var(--everest-green)', dark: 'color-mix(in srgb, var(--everest-green-mid) 55%, white)' };

export const Filet = ({ color, children }: { color: string; children: ReactNode }) => (
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

export const N1 = ({ id, tone, as = 'h2', size = 'section' }: { id: TextId; tone: Tone; as?: ElementType; size?: keyof typeof N1_SIZE }) => (
  <Filet color="var(--jaune-or)">
    <EditableText
      id={id}
      as={as}
      className={`text-balance ${N1_SIZE[size]} ${tone === 'dark' ? 'text-white' : 'text-[var(--everest-green)]'}`}
    >
      {TEXT[id]}
    </EditableText>
  </Filet>
);

export const N2 = ({ id, tone }: { id: TextId; tone: Tone }) => (
  <Filet color={GREEN_RULE[tone]}>
    <EditableText
      id={id}
      as="p"
      className={`max-w-[62ch] text-base md:text-[1.0625rem] leading-relaxed ${tone === 'dark' ? 'text-white/75' : 'text-[var(--night-80)]'}`}
    >
      {TEXT[id]}
    </EditableText>
  </Filet>
);

export const Pair = ({ n1, n2, tone, as, size }: { n1: TextId; n2: TextId; tone: Tone; as?: ElementType; size?: keyof typeof N1_SIZE }) => (
  <div className="flex flex-col gap-5 md:gap-6">
    <N1 id={n1} tone={tone} as={as} size={size} />
    <N2 id={n2} tone={tone} />
  </div>
);

export const Section = ({ tone, children, id }: { tone: Tone; children: ReactNode; id?: string }) => (
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
export const ArrowUpRight = () => (
  <svg aria-hidden viewBox="0 0 16 16" className="ml-1 inline h-3.5 w-3.5 align-[-0.1em] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 11.5l7-7M6 4.5h5.5V10" />
  </svg>
);

export const TextLink = ({ to, children, tone = 'light', arrow = true }: { to: string; children: ReactNode; tone?: Tone; arrow?: boolean }) => (
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
