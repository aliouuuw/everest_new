import { useState } from 'react';
import { FiChevronDown, FiHelpCircle } from 'react-icons/fi';
import { useReveal } from '../Hooks/useReveal';

interface ServiceFAQProps {
  service: 'discretionary' | 'mandate' | 'assisted';
}

const faqData = {
  discretionary: [
    {
      question: "Quel est le minimum requis pour ouvrir un compte ?",
      answer: "Un minimum de 50 millions FCFA est requis pour la gestion libre, tandis que la gestion assistée nécessite un minimum de 20 millions FCFA."
    },
    {
      question: "Puis-je suivre mes investissements en temps réel ?",
      answer: "Oui, notre portail client vous permet de suivre l'évolution de vos investissements en temps réel, avec des rapports détaillés disponibles à tout moment."
    },
    {
      question: "Qu'est-ce que la gestion libre exactement ?",
      answer: "La gestion libre vous permet de garder le contrôle total de vos décisions d'investissement. Vous définissez les objectifs, les contraintes et le niveau de risque, puis nous exécutons vos ordres sur la BRVM selon vos instructions. Vous restez maître de votre stratégie d'investissement."
    },
    {
      question: "Quels sont les frais pour la gestion libre ?",
      answer: "Les frais varient selon votre montant investi : 0,60% pour les comptes jusqu'à 100 000 F CFA, 0,50% entre 100 000 et 1 000 000 F CFA, et 0,40% au-delà. Ces frais couvrent uniquement l'exécution des ordres et le reporting."
    },
    {
      question: "Comment passer mes ordres ?",
      answer: "Vous pouvez passer vos ordres via notre plateforme web sécurisée 24/7, par email, ou par téléphone. Nos équipes exécutent vos instructions dans les meilleurs délais sur la BRVM."
    },
    {
      question: "Quel est le montant minimum pour ouvrir un compte ?",
      answer: "Le montant minimum d'ouverture est de 100 000 F CFA pour la gestion libre. Cette somme permet de constituer un portefeuille diversifié sur la BRVM."
    },
    {
      question: "Puis-je retirer mon argent quand je veux ?",
      answer: "Oui, vous gardez le contrôle total de vos liquidités. Les retraits peuvent être effectués à tout moment, sous réserve des délais de règlement de la BRVM (généralement 48h)."
    },
    {
      question: "Quelle est la fréquence des rapports ?",
      answer: "Vous recevez un rapport mensuel détaillé de vos positions, transactions et performance. Vous avez également accès à votre portefeuille en temps réel via notre plateforme client."
    },
    {
      question: "Que se passe-t-il si je ne donne pas d'instructions ?",
      answer: "Nous ne prenons aucune initiative sans vos instructions. Votre portefeuille reste en attente de vos décisions. Nous pouvons vous contacter si nécessaire pour faire le point."
    }
  ],
  mandate: [
    {
      question: "Comment fonctionne la gestion sous-mandat ?",
      answer: "Dans la gestion sous-mandat, vous nous confiez la gestion complète de votre portefeuille selon un mandat précis que nous définissons ensemble. Vous gardez la propriété de vos titres, mais nous prenons les décisions d'investissement selon vos objectifs et contraintes."
    },
    {
      question: "Quels sont les profils de mandat disponibles ?",
      answer: "Nous proposons trois profils : Conservateur (préservation du capital), Équilibré (croissance mesurée), et Dynamique (performance long terme). Chaque profil correspond à différents niveaux de risque et d'objectifs de rendement."
    },
    {
      question: "Puis-je modifier mon profil de mandat ?",
      answer: "Oui, vous pouvez modifier votre profil à tout moment. Nous organiserons un point pour redéfinir ensemble vos objectifs et adapter votre stratégie d'investissement."
    },
    {
      question: "Quelle est la fréquence des comités d'investissement ?",
      answer: "Nous tenons des comités d'investissement périodiques (au minimum trimestriels) pour faire le point sur votre portefeuille et ajuster la stratégie si nécessaire. Vous êtes informé des décisions prises."
    },
    {
      question: "Quels sont les frais pour la gestion sous-mandat ?",
      answer: "Les frais sont de 0,80% à 1,20% par an selon le montant géré, avec un minimum de 500 000 F CFA. Ces frais couvrent la gestion active, le reporting détaillé et l'expertise de notre équipe."
    },
    {
      question: "Comment suis-je informé des décisions prises ?",
      answer: "Vous recevez un rapport détaillé après chaque comité d'investissement, ainsi qu'un reporting mensuel de vos positions, performance et risques. Nous organisons également des points téléphoniques réguliers."
    },
    {
      question: "Puis-je retirer mon argent en gestion sous-mandat ?",
      answer: "Oui, vous gardez le contrôle de vos liquidités. Cependant, pour maintenir la cohérence de la stratégie, nous recommandons de nous consulter avant les retraits importants."
    }
  ],
  assisted: [
    {
      question: "Quelle est la différence avec la gestion sous-mandat ?",
      answer: "Dans la gestion assistée, vous gardez le contrôle des décisions finales. Nous vous fournissons des analyses, recommandations et conseils, mais vous validez chaque opération. C'est un accompagnement personnalisé sans délégation complète."
    },
    {
      question: "Comment se déroule l'accompagnement ?",
      answer: "Après un diagnostic initial, nous vous proposons des recommandations régulières sur les actions à envisager. Vous décidez ensuite de valider ou non ces suggestions. Nous restons disponibles pour répondre à vos questions."
    },
    {
      question: "Quelle est la fréquence des recommandations ?",
      answer: "Nous vous envoyons des recommandations selon l'actualité des marchés : généralement 2-4 par mois, plus en période de forte volatilité. Vous pouvez également nous solliciter à tout moment."
    },
    {
      question: "Quels outils sont mis à ma disposition ?",
      answer: "Vous avez accès à notre plateforme client, aux publications d'analyses, à un flux d'alertes personnalisées, et à des simulations de portefeuille. Nous proposons également des sessions de formation sur l'investissement."
    },
    {
      question: "Puis-je avoir accès à des simulations ?",
      answer: "Oui, nous pouvons réaliser des simulations de portefeuille selon différents scénarios. Cela vous aide à prendre des décisions éclairées sans risque sur votre capital réel."
    },
    {
      question: "Quels sont les canaux de communication ?",
      answer: "Vous pouvez nous contacter par email, téléphone ou visioconférence. Nous nous engageons à répondre sous 24h ouvrées. Des points réguliers peuvent être planifiés selon vos préférences."
    },
    {
      question: "Les recommandations sont-elles personnalisées ?",
      answer: "Absolument. Chaque recommandation tient compte de votre profil d'investisseur, de vos objectifs, de votre horizon et de votre tolérance au risque. Nous adaptons nos conseils à votre situation personnelle."
    },
    {
      question: "Quels sont les frais pour la gestion assistée ?",
      answer: "Les frais sont de 0,60% à 0,80% par an selon le montant, avec un minimum de 250 000 F CFA. Ces frais couvrent l'accompagnement personnalisé, les analyses et l'accès aux outils."
    }
  ]
};

export const ServiceFAQ: React.FC<ServiceFAQProps> = ({ service }) => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const sectionRef = useReveal<HTMLElement>();

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqs = faqData[service];

  return (
    <section ref={sectionRef} className="reveal py-14 sm:py-18 bg-[var(--white-smoke)]">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="kicker text-gradient-gold">FAQ</span>
          <h2 className="luxury-heading mt-3">Questions fréquentes</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm transition-all card-hover"
            >
              <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />

              <button
                onClick={() => toggleItem(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-[var(--gold-light)]/5 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="icon-badge text-[var(--night)] text-xl flex-shrink-0 mt-0.5">
                    <FiHelpCircle />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-[var(--night)] group-hover:text-[var(--gold-dark)] transition-colors">
                      {faq.question}
                    </h3>
                  </div>
                </div>
                <div className={`transform transition-transform duration-200 flex-shrink-0 ${
                  openItems.has(index) ? 'rotate-180' : ''
                }`}>
                  <FiChevronDown className="w-5 h-5 text-[var(--gold-dark)]" />
                </div>
              </button>

              {openItems.has(index) && (
                <div className="px-6 pb-6 border-t border-[var(--gold-metallic)]/25">
                  <div className="pt-4">
                    <p className="text-secondary leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-[var(--pure-white)]/60 backdrop-blur-sm rounded-xl border border-[var(--gold-metallic)]/25">
            <FiHelpCircle className="text-[var(--gold-dark)]" />
            <div className="text-left">
              <div className="font-display text-sm text-[var(--night)]">Vous avez d'autres questions ?</div>
              <div className="text-xs text-secondary">Notre équipe est là pour vous accompagner</div>
            </div>
            <a
              href="#contact"
              className="btn-secondary font-display tracking-wide text-sm ml-4"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
