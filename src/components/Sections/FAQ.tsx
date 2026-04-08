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
      className="reveal relative py-20 md:py-28 overflow-hidden"
      style={{ background: 'var(--white-smoke)' }}
    >
      <div className="w-full max-w-[1320px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

          {/* LEFT — Sticky heading */}
          <div className="lg:w-[35%] lg:sticky">
            <div className="mb-6">
              <PillBadge>FAQ</PillBadge>
            </div>
            <h2
              className="mb-5"
              style={{
                fontFamily: 'var(--font-primary)',
                fontWeight: 700,
                fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                color: 'var(--mauve)',
              }}
            >
              Vous avez des questions ?<br />
              Nous pouvons y répondre.
            </h2>
            <p className="text-secondary text-sm md:text-base mb-10 max-w-sm">
              Retrouvez les réponses aux interrogations les plus courantes de nos clients.
            </p>
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[0.7rem] font-bold uppercase tracking-[0.15em] text-[var(--pure-white)] bg-[var(--jaune-or)] hover:bg-[var(--night)] transition-all duration-300"
            >
              Voir toutes les questions
            </Link>
          </div>

          {/* RIGHT — Bubble accordion */}
          <div className="lg:w-[65%] flex flex-col gap-3">
            {faqs.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={item.q}
                  className="rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    background: isOpen ? 'var(--pure-white)' : 'var(--pure-white)',
                    boxShadow: isOpen
                      ? '0 4px 24px rgba(70,29,76,0.10)'
                      : '0 1px 4px rgba(0,0,0,0.05)',
                  }}
                >
                  <button
                    onClick={() => toggle(i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mauve)] focus-visible:ring-offset-2 rounded-2xl group"
                  >
                    <h3
                      className="font-primary font-medium text-sm md:text-base pr-6 transition-colors duration-300"
                      style={{ color: isOpen ? 'var(--mauve)' : 'var(--night)' }}
                    >
                      {item.q}
                    </h3>
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300"
                      style={{
                        borderColor: isOpen ? 'var(--mauve)' : 'var(--mauve-20)',
                        background: isOpen ? 'var(--mauve)' : 'transparent',
                      }}
                    >
                      <FiChevronDown
                        className="w-3.5 h-3.5 transition-all duration-300"
                        style={{
                          color: isOpen ? 'var(--pure-white)' : 'var(--mauve)',
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
                    <p className="px-6 pb-5 font-primary font-light text-[var(--night-60)] text-xs md:text-sm leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
