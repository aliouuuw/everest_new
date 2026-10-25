import { useReveal } from '../Hooks/useReveal';
import { EditableText } from '../../cms';
import { HOME_TEXT } from '../../content/home';
import { TEXT } from '../../content';

/** Referential V2.1 §1 « Bloc Sama Naffa », in the split layout of the validated ValueProps block: the logo in the frame. */
export const SamaNaffaBlock: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();
  return (
    <section ref={sectionRef} className="reveal relative overflow-hidden bg-[var(--pure-white)] py-16 md:py-20">
      <div className="page-container">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
          <div className="relative flex min-h-[200px] items-center justify-center overflow-hidden rounded-2xl border border-[var(--command-border)] bg-[var(--everest-green)] p-10 sm:min-h-[280px] lg:col-span-5">
            <img src="/sama-naffa-logo.png" alt="Sama Naffa, par EVEREST Finance" width={410} height={230} className="h-auto w-full max-w-[280px]" loading="lazy" />
          </div>
          <div className="flex flex-col justify-center lg:col-span-7">
            <EditableText id="home.samaNaffa.n1" as="h2" className="luxury-heading mb-4 max-w-xl">
              {HOME_TEXT['home.samaNaffa.n1']}
            </EditableText>
            <EditableText id="home.samaNaffa.n2" as="p" className="mb-6 max-w-xl text-sm font-light leading-relaxed text-[var(--night-60)] md:text-base">
              {HOME_TEXT['home.samaNaffa.n2']}
            </EditableText>
            <a href="/sama-naffa" className="group inline-flex items-center gap-2 font-primary text-sm font-semibold text-[var(--night-80)] transition-all duration-300 hover:gap-3 hover:text-[var(--jaune-or)]">
              {/* The §7 CTA label, as the content lot used it on the home. */}
              {TEXT['sama-naffa.cta']}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
