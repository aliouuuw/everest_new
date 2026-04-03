import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { Link } from '@tanstack/react-router';
import { useReveal } from '../Hooks/useReveal';
import { PillBadge } from '../ui';

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
      className="reveal relative py-16 md:py-20 overflow-hidden flex items-center justify-center"
    >
      {/* Full-bleed background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/HERO-.png"
          alt="Montagnes — Questions fréquentes"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark mauve tint to make the white card pop */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'var(--gradient-image-overlay-heavy)' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1000px] px-6">
        {/* Floating Frosted Glass Card */}
        <div className="bg-[var(--pure-white)]/95 backdrop-blur-2xl rounded-[2rem] p-6 md:p-10 shadow-[0_40px_80px_rgba(0,0,0,0.3)] border border-white/40">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mb-4">
              <PillBadge>FAQ</PillBadge>
            </div>
            <h2 className="luxury-heading mb-3">
              Vous avez des{' '}
              <span style={{ color: 'var(--jaune-or)' }}>questions ?</span>
            </h2>
            <p className="text-secondary text-sm md:text-base max-w-xl mx-auto">
              Retrouvez les réponses aux interrogations les plus courantes de nos clients.
            </p>
          </div>

          {/* Accordion */}
          <div className="space-y-0 mb-8 max-w-3xl mx-auto">
            {faqs.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={item.q}
                  className="border-b border-[var(--mauve-10)] last:border-0"
                >
                  <button
                    onClick={() => toggle(i)}
                    className="w-full py-4 flex items-center justify-between text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mauve)] focus-visible:ring-offset-2 rounded-lg"
                  >
                    <h3
                      className="font-primary font-semibold text-sm md:text-base transition-colors duration-300 pr-6"
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
                        className="w-3.5 h-3.5 transition-transform duration-300"
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
                      maxHeight: isOpen ? '120px' : '0px',
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <p className="pb-4 font-primary font-light text-[var(--night-60)] text-xs md:text-sm leading-relaxed max-w-2xl">
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center pt-6 border-t border-[var(--mauve-10)] max-w-3xl mx-auto">
            <p className="font-primary font-light text-xs md:text-sm text-[var(--night-60)] mb-3">
              Vous ne trouvez pas votre réponse ?
            </p>
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[0.7rem] font-bold uppercase tracking-[0.15em] text-[var(--pure-white)] bg-[var(--mauve)] hover:bg-[var(--night)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mauve)] focus-visible:ring-offset-2"
            >
              Voir toutes les questions
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};
