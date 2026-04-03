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
      className="reveal relative py-24 md:py-36 overflow-hidden"
      style={{ background: 'linear-gradient(170deg, #150e1c 0%, #1e1028 100%)' }}
    >
      {/* Background Image with dramatic fade */}
      <div className="absolute inset-0 z-0">
        <img
          src="/HERO-.png"
          alt="Montagnes — Questions fréquentes"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, #150e1c 20%, transparent 100%)' }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(0deg, #1e1028 0%, transparent 50%, #150e1c 100%)' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Column — Sticky Header & CTA */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <div className="mb-6">
                <span className="inline-block px-4 py-1.5 rounded-full text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[var(--jaune-or)] bg-[var(--jaune-or-10)] border border-[var(--jaune-or-20)]">
                  FAQ
                </span>
              </div>
              
              <h2 className="luxury-heading-dark mb-6">
                Vous avez des{' '}
                <span style={{ color: 'var(--jaune-or)' }}>questions ?</span>
              </h2>
              
              <p className="font-primary font-light text-base md:text-lg mb-10 text-[var(--pure-white)] opacity-70 max-w-md">
                Retrouvez les réponses aux interrogations les plus courantes de nos clients. Notre équipe reste à votre entière disposition.
              </p>

              <Link
                to="/faq"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[0.75rem] font-bold uppercase tracking-[0.15em] text-[var(--night)] bg-[var(--jaune-or)] hover:bg-[var(--pure-white)] transition-all duration-300"
              >
                Toutes les questions
              </Link>
            </div>
          </div>

          {/* Right Column — Accordion */}
          <div className="lg:col-span-7">
            <div className="border-t border-white/10">
              {faqs.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                  <div
                    key={item.q}
                    className="border-b border-white/10"
                  >
                    <button
                      onClick={() => toggle(i)}
                      className="w-full py-6 flex items-center justify-between text-left group"
                    >
                      <h3
                        className="font-primary font-semibold text-lg md:text-xl transition-colors duration-300 pr-8"
                        style={{ color: isOpen ? 'var(--jaune-or)' : 'var(--pure-white)' }}
                      >
                        {item.q}
                      </h3>
                      <div
                        className="flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300"
                        style={{
                          borderColor: isOpen ? 'var(--jaune-or)' : 'rgba(255,255,255,0.2)',
                          background: isOpen ? 'var(--jaune-or-10)' : 'transparent',
                        }}
                      >
                        <FiChevronDown
                          className="w-5 h-5 transition-transform duration-300"
                          style={{
                            color: isOpen ? 'var(--jaune-or)' : 'var(--pure-white)',
                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          }}
                        />
                      </div>
                    </button>

                    <div
                      className="overflow-hidden transition-all duration-300"
                      style={{
                        maxHeight: isOpen ? '250px' : '0px',
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <p className="pb-8 font-primary font-light text-[var(--pure-white)] opacity-70 text-base md:text-lg leading-relaxed max-w-2xl">
                        {item.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
