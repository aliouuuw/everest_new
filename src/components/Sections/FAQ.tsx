import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { Link } from '@tanstack/react-router';
import { useReveal } from '../Hooks/useReveal';

type QA = { q: string; a: string };

const faqs: Array<QA> = [
  {
    q: 'Comment ouvrir un compte ?',
    a: 'Déposez une demande en ligne ou écrivez-nous : un conseiller vous guide pour les pièces (identité, KYC) et la signature des documents. Le délai dépend du type de compte et du profil.',
  },
  {
    q: 'Quels sont vos frais ?',
    a: 'Les frais varient selon le service (courtage, conseil, gestion sous mandat) et le profil. Une grille tarifaire détaillée vous est remise à l’ouverture du compte, avant tout engagement.',
  },
  {
    q: 'Comment accéder au portail client ?',
    a: 'Utilisez le lien « Accès client » dans le menu. Après activation de votre compte, vos identifiants vous sont envoyés par email ; en cas de perte, contactez le support par le même canal que pour une ouverture.',
  },
  {
    q: 'Offrez-vous la gestion sous mandat ?',
    a: 'Oui. Nous proposons des profils de gestion adaptés à votre horizon, à votre tolérance au risque et à vos contraintes réglementaires ; le détail est précisé en entretien préalable.',
  },
  {
    q: 'Puis-je recevoir des recommandations ?',
    a: 'Oui, selon le mandat : gestion assistée, conseil ponctuel ou accès à nos notes et revues (BRVM, obligations, macro UEMOA). Le périmètre est défini contractuellement.',
  },
  {
    q: 'Comment contacter un conseiller ?',
    a: 'Utilisez la section « Nous contacter » sur cette page, l’email contact@everestfin.com ou le téléphone indiqué en pied de page. Nous répondons en général sous 24 h ouvrées.',
  },
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
      className="reveal relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'var(--white-smoke)' }}
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-16 lg:px-24">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

          {/* LEFT — Sticky heading */}
          <div className="lg:w-[35%] lg:sticky">
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
              className="btn-primary-dark inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em]"
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
                      maxHeight: isOpen ? '360px' : '0px',
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
