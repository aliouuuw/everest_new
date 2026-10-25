/**
 * Opportunités (§6) and Sama Naffa (§7), in the page head and body styles of the validated site.
 */
import { FiArrowRight } from 'react-icons/fi';
import { Link } from '@tanstack/react-router';
import { EditableText } from '../../cms';
import { TEXT } from '../../content';
import { PageHead } from '../PageHead';
import { useReveal } from '../Hooks/useReveal';

const Body = ({ children }: { children: React.ReactNode }) => {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} className="reveal py-12 md:py-20 bg-[var(--pure-white)]">
      <div className="page-container">{children}</div>
    </section>
  );
};

export const OpportunitesPage = () => (
  <div className="bg-[var(--pure-white)] text-[var(--night)] font-primary">
    <PageHead
      badge="Opportunités"
      title="Opportunités"
      intro={<EditableText id="opportunites.n1" as="p">{TEXT['opportunites.n1']}</EditableText>}
    />
    <Body>
      <div className="flex max-w-3xl flex-col items-start gap-8">
        <EditableText id="opportunites.n2" as="p" className="text-lg leading-relaxed text-[var(--night-80)] font-light border-l-2 border-[var(--jaune-or)] pl-6">
          {TEXT['opportunites.n2']}
        </EditableText>
        {/* « Accéder à l'espace investisseur » waits on the investor space (PLAN decision 6). */}
        <Link to="/contact" className="btn-primary-dark inline-flex items-center justify-center gap-4 px-10 py-5 text-xs uppercase tracking-[0.2em] font-bold w-fit">
          <EditableText id="opportunites.cta2" as="span">{TEXT['opportunites.cta2']}</EditableText>
          <FiArrowRight className="text-lg" />
        </Link>
      </div>
    </Body>
  </div>
);

/** §7: logo, short text, one CTA to the Sama Naffa site. No N2 (ADG decision). Charters not mixed. */
export const SamaNaffaPage = () => (
  <div className="bg-[var(--pure-white)] text-[var(--night)] font-primary">
    <PageHead badge="Sama Naffa" title="Sama Naffa" />
    <Body>
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-4">
          <img src="/sama-naffa-logo.png" alt="Sama Naffa, par EVEREST Finance" width={410} height={230} className="h-auto w-full max-w-[320px]" />
        </div>
        <div className="flex flex-col items-start gap-8 md:col-span-8">
          <EditableText id="sama-naffa.n1" as="p" className="max-w-3xl text-lg md:text-xl leading-relaxed text-[var(--night-80)] border-l-2 border-[var(--jaune-or)] pl-6">
            {TEXT['sama-naffa.n1']}
          </EditableText>
          <a href="https://www.samanaffa.com" target="_blank" rel="noopener noreferrer" className="btn-primary-dark inline-flex items-center justify-center gap-4 px-10 py-5 text-xs uppercase tracking-[0.2em] font-bold w-fit">
            <EditableText id="sama-naffa.cta" as="span">{TEXT['sama-naffa.cta']}</EditableText>
          </a>
        </div>
      </div>
    </Body>
  </div>
);
