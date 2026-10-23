/**
 * Opportunités (§6), Sama Naffa (§7) and the §8 blocks of Contact / Devenir client.
 */
import { Fragment } from 'react';
import { Link } from '@tanstack/react-router';
import { EditableText, useContent } from '../../cms';
import { TEXT, type TextId } from '../../content';
import { ArrowUpRight, Label, N1, N2, PageHero, RULE, Section, type Tone } from '../Referentiel';

export const OpportunitesPage = () => (
  <div className="bg-[var(--pure-white)] text-[var(--night)]">
    <PageHero title="Opportunités">
      <N1 id="opportunites.n1" tone="dark" as="p" size="statement" />
    </PageHero>
    <Section tone="light">
      <div className="flex max-w-4xl flex-col gap-8">
        <N2 id="opportunites.n2" tone="light" />
        <div>
          <Link to="/contact" className="home-button">
            <EditableText id="opportunites.cta2" as="span">{TEXT['opportunites.cta2']}</EditableText>
            <ArrowUpRight />
          </Link>
        </div>
      </div>
    </Section>
  </div>
);

/** §7: logo, short text, one CTA to the Sama Naffa site. No N2 (ADG decision). Charters not mixed. */
export const SamaNaffaPage = () => (
  <div className="bg-[var(--pure-white)] text-[var(--night)]">
    <PageHero title="Sama Naffa" />
    {/* As on the home: the line and the action on paper, the mark on a flat forest field. */}
    <Section tone="ivory">
      <div className="home-sama-layout">
        <div className="home-sama-text">
          <N1 id="sama-naffa.n1" tone="ivory" as="p" size="statement" />
          <a href="https://www.samanaffa.com" target="_blank" rel="noopener noreferrer" className="home-button">
            {/* The referential copy ends on « → »: no second arrow. */}
            <EditableText id="sama-naffa.cta" as="span">{TEXT['sama-naffa.cta']}</EditableText>
          </a>
        </div>
        <div className="home-sama-mark">
          <img src="/sama-naffa-logo.png" alt="Sama Naffa, par EVEREST Finance" width={410} height={230} />
        </div>
      </div>
    </Section>
  </div>
);

const STEPS = [1, 2, 3, 4] as const;

/** §8 « Parcours Devenir client »: four numbered steps. */
export const Parcours = ({ tone = 'light' }: { tone?: Tone }) => (
  <Section tone={tone}>
    <div className="mb-10 md:mb-14">
      <Label id="contact.parcours.heading" tone={tone} />
    </div>
    <ol className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
      {STEPS.map((n) => (
        <li key={n} className={`flex flex-col gap-3 pt-6 ${RULE[tone]}`}>
          <span aria-hidden className="text-[28px] font-medium leading-none! tracking-[-0.02em] text-[var(--home-gold)] [font-variant-numeric:lining-nums_tabular-nums]">
            {n}
          </span>
          <N1 id={`contact.step${n}.n1` as TextId} tone={tone} as="h3" size="card" />
          <N2 id={`contact.step${n}.n2` as TextId} tone={tone} />
        </li>
      ))}
    </ol>
  </Section>
);

const LINKABLE = /([\w.-]+@[\w-]+\.[a-z]{2,}|\+\d{3}(?:\s\d{2,3}){4})/;

/** §8 « Coordonnées »: one CMS text; the e-mail address and phone numbers become links. */
export const Coordonnees = ({ tone = 'dark' }: { tone?: Tone }) => {
  const id = 'contact.coordonnees.n1';
  const override = useContent(id);
  const text = override?.value || TEXT[id];
  const linkClass =
    tone === 'dark'
      ? 'text-white underline decoration-[var(--home-gold-light)] decoration-1 underline-offset-[0.2em] transition-colors hover:text-[var(--home-gold-light)]'
      : 'text-[var(--home-ink)] underline decoration-[var(--home-gold)] decoration-1 underline-offset-[0.2em] transition-colors hover:text-[var(--home-gold)]';
  return (
    <div className="flex flex-col gap-5">
      <Label id="contact.coordonnees.heading" tone={tone} as="h2" size="sub" />
      <p
        data-cms-id={id}
        className={`text-base leading-[1.65] ${tone === 'dark' ? 'text-[color-mix(in_srgb,var(--home-white)_86%,var(--home-ink))]' : 'text-[var(--home-mid)]'}`}
      >
        {text.split(LINKABLE).map((part, i) => {
          if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>;
          const href = part.includes('@') ? `mailto:${part}` : `tel:${part.replace(/\s/g, '')}`;
          return (
            <a key={i} href={href} className={linkClass}>
              {part}
            </a>
          );
        })}
      </p>
    </div>
  );
};
