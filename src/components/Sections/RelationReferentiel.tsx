/**
 * Opportunités (§6), Sama Naffa (§7) and the §8 blocks of Contact / Devenir client.
 */
import { Fragment } from 'react';
import { Link } from '@tanstack/react-router';
import { EditableText, useContent } from '../../cms';
import { TEXT, type TextId } from '../../content';
import { Filet, Label, N1, N2, PageHero, Section, type Tone } from '../Referentiel';

export const OpportunitesPage = () => (
  <div className="bg-[var(--pure-white)] text-[var(--night)]">
    <PageHero title="Opportunités">
      <N1 id="opportunites.n1" tone="dark" as="p" size="statement" />
    </PageHero>
    <Section tone="light">
      <div className="flex max-w-4xl flex-col gap-10">
        <N2 id="opportunites.n2" tone="light" />
        <div className="pl-5 md:pl-6">
          <Link
            to="/contact"
            className="btn-primary-dark inline-flex min-h-[3.5rem] items-center justify-center px-8 text-base"
          >
            <EditableText id="opportunites.cta2" as="span">{TEXT['opportunites.cta2']}</EditableText>
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
    <Section tone="light">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-4">
          <img src="/sama-naffa-logo.png" alt="Sama Naffa, par EVEREST Finance" width={410} height={230} className="h-auto w-full max-w-[320px]" />
        </div>
        <div className="flex flex-col gap-10 md:col-span-8">
          <N1 id="sama-naffa.n1" tone="light" as="p" size="card" />
          <div className="pl-5 md:pl-6">
            <a
              href="https://www.samanaffa.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-dark inline-flex min-h-[3.5rem] items-center justify-center px-8 text-base"
            >
              <EditableText id="sama-naffa.cta" as="span">{TEXT['sama-naffa.cta']}</EditableText>
            </a>
          </div>
        </div>
      </div>
    </Section>
  </div>
);

const STEPS = [1, 2, 3, 4] as const;

/** §8 « Parcours Devenir client »: four numbered steps. */
export const Parcours = ({ tone = 'light' }: { tone?: Tone }) => (
  <Section tone={tone}>
    <div className="mb-12 md:mb-16">
      <Label id="contact.parcours.heading" tone={tone} />
    </div>
    <ol className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-10">
      {STEPS.map((n) => (
        <li key={n} className="flex flex-col gap-5">
          <span aria-hidden className="text-[2.5rem] font-bold leading-none! text-[var(--jaune-or)]">
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
      ? 'text-white underline decoration-white/30 underline-offset-4 transition-colors hover:text-[var(--or-clair)]'
      : 'text-[var(--everest-green)] underline decoration-[var(--everest-green)]/30 underline-offset-4 transition-colors hover:text-[var(--jaune-or)]';
  return (
    <div className="flex flex-col gap-5">
      <Label id="contact.coordonnees.heading" tone={tone} as="h2" size="sub" />
      <Filet color="var(--jaune-or)">
        <p
          data-cms-id={id}
          className={`text-base leading-relaxed md:text-[1.0625rem] ${tone === 'dark' ? 'text-white/85' : 'text-[var(--night-80)]'}`}
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
      </Filet>
    </div>
  );
};
