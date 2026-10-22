/** Fallback copy matching JSX `EditableText` / `EditableImage` children. */

import { HOME_TEXT } from '../../../../src/content/home.ts'
import { SOCIETE_TEXT } from '../../../../src/content/societe.ts'
import { EXPERTISES_TEXT } from '../../../../src/content/expertises.ts'
import { ACTUALITES_TEXT, ANALYSES_TEXT } from '../../../../src/content/analyses.ts'

const offres: Record<string, string> = {
  'offres.hero.badge': "Services d'investissement",
  'offres.hero.title': 'Votre partenaire pour investir sur la BRVM.',
  'offres.hero.subtitle':
    "Découvrez nos trois approches d'investissement conçues pour s'adapter à votre style, votre expérience et vos objectifs financiers.",
  'offres.hero.ctaLabel': 'Explorer nos approches',
  'offres.overview.badge': 'Nos approches',
  'offres.overview.title': "Choisissez votre niveau d'accompagnement.",
  'offres.overview.intro':
    "Que vous soyez novice ou expérimenté, nous avons la solution adaptée à votre profil d'investisseur.",
  'offres.libre.title': 'Gestion Libre',
  'offres.libre.description':
    'Idéal pour les investisseurs autonomes qui veulent garder le contrôle total.',
  'offres.libre.fees': 'Frais: 0,40% - 0,60%',
  'offres.assistee.title': 'Gestion Assistée',
  'offres.assistee.description':
    "Parfait équilibre entre autonomie et conseils d'experts.",
  'offres.assistee.fees': 'Frais: 0,60% - 0,80%',
  'offres.mandat.title': 'Gestion Sous-Mandat',
  'offres.mandat.description':
    'Pour ceux qui préfèrent déléguer la gestion à nos experts.',
  'offres.mandat.fees': 'Frais: 0,80% - 1,20%',
}

const services = Object.fromEntries(
  Object.entries(offres).map(([id, value]) => [id.replace(/^offres\./, 'services.'), value]),
)

export const SITE_CONTENT_DEFAULTS: Record<string, string> = {
  ...HOME_TEXT,
  'home.trust.partners': JSON.stringify([
    { name: 'BRVM', logo: '/partners/BRVM.jpg' },
    { name: 'BDK', logo: '/partners/BDK.jpg' },
    { name: 'État du Sénégal', logo: '/partners/etat-du-senegal.jpg' },
    { name: 'Kalia', logo: '/partners/kalia.jpg' },
    { name: 'BHS', logo: '/partners/bhs.jpg' },
    { name: 'Sunu Group', logo: '/partners/sunu-group.jpg' },
    { name: 'BCI', logo: '/partners/bci.jpg' },
    { name: 'BNDE', logo: '/partners/bnde.jpg' },
    { name: 'BOAD', logo: '/partners/boad.jpg' },
    { name: 'Orabank', logo: '/partners/Orabank.jpg' },
    { name: 'Pagena', logo: '/partners/Pagena.jpg' },
    { name: 'CDE', logo: '/partners/CDE-1.jpg' },
    { name: 'Ville de Dakar', logo: '/partners/ville-de-dakar.jpg' },
  ]),

  ...SOCIETE_TEXT,

  ...services,
  ...offres,

  'bourse.hero.title': 'Cours Actions Temps Réel',
  'bourse.hero.subtitle':
    'Données de marché en temps réel, cours et volumes de transaction BRVM.',
  'bourse.assets.title': 'Cours des Actions BRVM',
  'bourse.assets.subtitle': 'Données de marché temps réel',

  'capital-markets.hero.background': '/Assets_Website/dmc.png',
  'capital-markets.hero.headline': 'Levez des capitaux. Accélérez votre croissance.',
  'capital-markets.hero.subtitle':
    'Accédez au marché financier régional avec un partenaire qui a structuré et placé plus de 25 opérations avec un taux de couverture de 100%.',
  'capital-markets.presentation':
    "Lever des fonds sur les marchés financiers ne s'improvise pas. Nous accompagnons les émetteurs publics et privés sur l'ensemble du cycle, de la structuration à la mise en marché et au suivi post-opération, afin d'optimiser chaque levée et d'en assurer le succès de chaque opération.",
  'capital-markets.cta.text': 'Discutons de votre prochaine opération',
  'capital-markets.cta.subtitle':
    'Nos experts en marché des capitaux sont prêts à structurer votre levée de fonds.',

  'investment-banking.hero.background': '/Assets_Website/Ingénierie-Financière.png',
  'investment-banking.hero.headline': 'Structurez. Optimisez. Transformez.',
  'investment-banking.hero.subtitle':
    'Des solutions de financement sur mesure pour les opérations complexes qui dépassent les schémas classiques du crédit bancaire.',
  'investment-banking.presentation':
    "Notre équipe d'ingénierie financière conçoit et exécute des opérations complexes pour les entreprises, institutions et investisseurs de la zone UEMOA. Nous combinons expertise technique et connaissance approfondie du marché régional pour proposer des solutions sur mesure.",
  'investment-banking.cta.text': 'Parlons de votre projet',
  'investment-banking.cta.subtitle':
    'Nos experts en ingénierie financière étudient votre situation et proposent la structure optimale.',

  'mandate.hero.background': '/Assets_Website/gsm.png',
  'mandate.hero.headline': 'Votre patrimoine. Notre expertise. Vos objectifs.',
  'mandate.hero.subtitle':
    "Confiez la gestion de vos actifs à une équipe qui aligne chaque décision d'investissement sur vos objectifs personnels.",
  'mandate.presentation':
    "Nous pilotons des portefeuilles d'investissement pour le compte d'investisseurs institutionnels, entreprises et particuliers fortunés. Notre approche structurée combine définition de profils d'investissement, allocation stratégique et suivi rigoureux pour optimiser la performance ajustée au risque.",
  'mandate.cta.text': 'Découvrez le mandat adapté à vos objectifs',
  'mandate.cta.subtitle':
    'Nos gestionnaires de portefeuille analysent votre profil et construisent une allocation sur mesure.',

  ...EXPERTISES_TEXT,

  'contact.hero.title': 'Parlons de vos projets.',
  'contact.hero.subtitle':
    "Nos équipes sont à votre disposition pour analyser vos besoins et vous accompagner dans vos projets d'investissement ou de financement.",
  'contact.form.title': 'Envoyer un message.',
  'contact.form.intro':
    "Décrivez brièvement votre demande — un conseiller prendra contact sous 24 h ouvrées pour cadrer l'échange.",
  'contact.form.privacy':
    'En envoyant ce message, vous acceptez que vos données soient utilisées pour répondre à votre demande.',
  'contact.form.submit': 'Envoyer la demande',
  'contact.info.badge': 'Coordonnées',
  'contact.info.company': 'EVEREST Finance SGI',
  'contact.info.license': 'Agrément AMF-UMOA n° SGI/DA/2016/60',
  'contact.hours.badge': 'Horaires',
  'contact.hours.title': 'Lundi — Vendredi · 08h30 → 17h30 GMT',
  'contact.hours.body':
    'Nous répondons en général sous 24 h ouvrées. Pour les demandes urgentes relatives à une opération en cours, privilégiez le téléphone.',

  'faq.hero.background': '/Assets_Website/Abécédaire-&-FAQ.png',
  'faq.hero.badge': 'Abécédaire & FAQ',
  'faq.hero.title': 'Comprendre nos services.',
  'faq.hero.subtitle':
    'Questions fréquentes et définitions clés pour mieux décider.',
  'faq.hero.ctaLabel': 'Voir les questions',
  'faq.qa.badge': 'Support',
  'faq.qa.title': 'Questions fréquentes.',
  'faq.glossary.badge': 'Définitions',
  'faq.glossary.title': 'Abécédaire',
  'faq.cta.title': "Besoin d'aide supplémentaire ?",
  'faq.cta.subtitle':
    'Notre équipe se tient à votre disposition pour répondre à toutes vos interrogations.',
  'faq.cta.ctaLabel': 'Nous contacter',

  ...ANALYSES_TEXT,
  ...ACTUALITES_TEXT,
}
