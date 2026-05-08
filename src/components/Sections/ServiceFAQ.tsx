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
    <section ref={sectionRef} className="reveal py-24 md:py-40 bg-[var(--pure-white)] font-primary">
      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-4">
            <span className="px-4 py-1.5 rounded-full bg-[var(--mauve-10)] text-[10px] font-bold tracking-[0.3em] text-[var(--night-80)] uppercase inline-block mb-8">FAQ</span>
            <h2 className="font-primary font-bold text-4xl md:text-6xl leading-[1.05] mb-8 text-[var(--night-80)]">
              Questions fréquentes.
            </h2>
            <p className="text-lg text-[rgba(10,10,10,0.8)] font-light mb-12">
              Retrouvez les réponses aux questions les plus courantes.
            </p>

            {/* Contact CTA */}
            <div className="border border-[var(--mauve)]/10 p-6 rounded-2xl hover:shadow-[0_8px_24px_rgba(1,45,42,0.06)] transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--mauve-10)] flex items-center justify-center shrink-0">
                  <FiHelpCircle className="text-[var(--night-80)] text-xl" />
                </div>
                <div>
                  <div className="font-primary font-bold text-lg text-[var(--night)] mb-1">Vous avez d'autres questions ?</div>
                  <div className="text-sm text-[rgba(10,10,10,0.6)] mb-6 font-medium">Notre équipe est là pour vous accompagner</div>
                  <a
                    href="/contact"
                    className="btn-primary inline-flex text-[10px] font-bold tracking-[0.2em] uppercase rounded-full"
                  >
                    Nous contacter
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-black/10">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-black/10"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full py-6 text-left flex items-center justify-between hover:text-[var(--night-80)] transition-colors group"
                  >
                    <h3 className="font-primary font-bold text-xl text-[var(--night)] group-hover:text-[var(--night-80)] transition-colors pr-8">
                      {faq.question}
                    </h3>
                    <div className={`transform transition-transform duration-200 flex-shrink-0 ${
                      openItems.has(index) ? 'rotate-180' : ''
                    }`}>
                      <FiChevronDown className="w-5 h-5 text-[var(--night-80)]" />
                    </div>
                  </button>

                  {openItems.has(index) && (
                    <div className="pb-6">
                      <p className="text-[rgba(10,10,10,0.8)] leading-relaxed font-light max-w-2xl">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
