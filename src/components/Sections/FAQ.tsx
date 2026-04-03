import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { Link } from '@tanstack/react-router';
import { useReveal } from '../Hooks/useReveal';

type QA = { q: string; a: string };

const faqs: Array<QA> = [
  { q: 'Comment ouvrir un compte ?', a: 'Remplissez le formulaire en ligne, notre équipe vous accompagne pour la suite.' },
  { q: 'Quels sont vos frais ?', a: 'Frais transparents selon le service et le profil ; détail communiqué à l\u2019ouverture.' },
  { q: 'Comment accéder au portail client ?', a: 'Via le lien "Accès Client" en haut de page ; identifiants fournis à l\u2019activation.' },
  { q: 'Offrez-vous la gestion sous mandat ?', a: 'Oui, plusieurs profils sont disponibles selon vos objectifs et contraintes.' },
  { q: 'Puis-je recevoir des recommandations ?', a: 'Oui, via la gestion assistée et nos publications de recherche.' },
  { q: 'Comment contacter un conseiller ?', a: 'Par le formulaire de contact ou WhatsApp ; réponse sous 24h ouvrées.' },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useReveal<HTMLElement>();

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section
      ref={sectionRef}
      className="reveal relative py-28 md:py-36 overflow-hidden bg-[var(--summit-ivory)]"
    >
      {/* Subtle background orbs */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 20% 60%, var(--mauve-05) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 80% 30%, var(--jaune-or-05) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">
        {/* Header — centered pattern */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <span className="inline-block px-4 py-1.5 rounded-full text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[var(--mauve)] bg-[var(--mauve-10)] border border-[var(--mauve-20)]">
              Questions fréquentes
            </span>
          </div>
          <h2 className="luxury-heading mb-4">
            Vous avez des{' '}
            <span style={{ color: 'var(--jaune-or)' }}>questions ?</span>
          </h2>
          <p className="text-secondary text-base md:text-lg max-w-xl mx-auto">
            Retrouvez les réponses aux interrogations les plus courantes de nos clients.
          </p>
        </div>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.q}
                className="border-b border-[var(--mauve-10)]"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full py-6 flex items-center justify-between text-left group"
                >
                  <h3
                    className="font-primary font-semibold text-base md:text-lg transition-colors duration-300 pr-8"
                    style={{ color: isOpen ? 'var(--mauve)' : 'var(--night)' }}
                  >
                    {item.q}
                  </h3>
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300"
                    style={{
                      borderColor: isOpen ? 'var(--mauve)' : 'var(--mauve-20)',
                      background: isOpen ? 'var(--mauve-10)' : 'transparent',
                    }}
                  >
                    <FiChevronDown
                      className="w-4 h-4 transition-transform duration-300"
                      style={{
                        color: isOpen ? 'var(--mauve)' : 'var(--night-60)',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    />
                  </div>
                </button>

                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: isOpen ? '200px' : '0px',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p className="pb-6 font-primary font-light text-[var(--night-60)] text-base leading-relaxed max-w-2xl">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <p className="font-primary font-light text-sm text-[var(--night-60)] mb-4">
            Vous ne trouvez pas votre réponse ?
          </p>
          <Link
            to="/faq"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[0.75rem] font-medium uppercase tracking-[0.15em] border border-[var(--mauve-20)] text-[var(--mauve)] bg-[var(--pure-white)] hover:bg-[var(--mauve-05)] hover:border-[var(--mauve)] transition-all duration-300"
          >
            Voir toutes les questions
          </Link>
        </div>
      </div>
    </section>
  );
};
