import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import { useReveal } from '../Hooks/useReveal';
import { EditableText } from '../../cms';

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
      className="reveal relative bg-[var(--summit-ivory)] py-16 md:py-20"
    >
      <div className="page-container">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(240px,0.5fr)_1fr] lg:gap-16">

          {/* LEFT — Compact intro */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="luxury-heading mb-6">
              <EditableText id="home.faq.title" as="span">Questions</EditableText>{' '}
              <EditableText id="home.faq.titleAccent" as="span" style={{ color: 'var(--jaune-or)' }}>fréquentes.</EditableText>
            </h2>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[var(--mauve)] text-white">
                <HiOutlineChatBubbleLeftRight className="h-5 w-5" />
              </div>
              <EditableText
                id="home.faq.intro"
                as="p"
                className="max-w-xs font-primary text-sm font-light leading-relaxed text-[var(--night-70)] md:text-base"
              >
                Trouvez rapidement les réponses aux questions les plus fréquentes sur nos services et les marchés.
              </EditableText>
            </div>
          </div>

          {/* RIGHT — Stacked rounded cards */}
          <div className="flex flex-col gap-3">
            {faqs.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={item.q}
                  className="overflow-hidden rounded-xl border border-[var(--command-border)] bg-[var(--pure-white)] transition-colors duration-300 hover:border-[var(--mauve-20)]"
                >
                  <button
                    onClick={() => toggle(i)}
                    className="group flex w-full items-center justify-between gap-5 px-5 py-4 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mauve)] focus-visible:ring-offset-2 md:px-6"
                  >
                    <h3
                      className="pr-6 font-primary text-sm font-medium leading-relaxed transition-colors duration-300"
                      style={{ color: isOpen ? 'var(--mauve)' : 'var(--night)' }}
                    >
                      {item.q}
                    </h3>
                    <FiChevronDown
                      className="h-4 w-4 shrink-0 transition-all duration-300"
                      style={{
                        color: isOpen ? 'var(--mauve)' : 'var(--night-60)',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    />
                  </button>

                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: isOpen ? '320px' : '0px',
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <p className="max-w-2xl px-5 pb-5 font-primary text-xs font-light leading-relaxed text-[var(--night-60)] md:px-6 md:text-sm">
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
