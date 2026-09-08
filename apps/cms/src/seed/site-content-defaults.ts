/** Fallback copy matching JSX `EditableText` / `EditableImage` children. */

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
  'home.hero.title': "Accès stratégique aux marchés financiers de l'UEMOA",
  'home.hero.subtitle':
    "EVEREST Finance est une plateforme d'ingénierie et d'intermédiation financière opérant au cœur du marché financier régional (SGI agréée AMF-UMOA, n° SGI/DA/2016/60). Nous structurons et facilitons l'accès aux opportunités d'investissement et de financement à travers une approche rigoureuse, sélective et orientée performance.",
  'home.hero.ctaPrimary': 'Accéder aux opportunités',
  'home.hero.ctaSecondary': 'Découvrir nos offres',
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
  'home.positioning.badge': 'Positionnement',
  'home.positioning.title':
    'Un intermédiaire de référence au service des flux de capitaux régionaux.',
  'home.positioning.intro':
    'Agréée AMF-UMOA (n° SGI/DA/2016/60) et ancrée à Dakar, nous relayons depuis plus de 10 ans les flux entre émetteurs UEMOA et investisseurs institutionnels ou privés qualifiés.',
  'home.valueProps.badge': 'Pourquoi Everest Finance',
  'home.valueProps.title': 'Exécution rigoureuse, confiance durable.',
  'home.valueProps.intro':
    "SGI agréée AMF-UMOA (n° SGI/DA/2016/60), nous combinons ancrage régional, discipline d'exécution et relations institutionnelles au service de nos mandats.",
  'home.valueProps.image': '/Assets_Website/Valueprops1.png',
  'home.capacity.badge': "Capacité d'intervention",
  'home.capacity.titleLead': 'Capacité opérationnelle & relationnelle.',
  'home.capacity.intro':
    "Exécution de marché éprouvée : présence MTP UEMOA et BRVM, réseau d'investisseurs qualifiés et ingénierie sur mesure — au service de +500 Mds F CFA levés par nos mandats d'émission.",
  'home.services.badge': 'Nos expertises',
  'home.services.title': 'Nos expertises — marchés & patrimoine.',
  'home.services.intro':
    "Quatre blocs — titres publics, BRVM, structuration et Private Office — pour couvrir l'origination, la distribution et le conseil patrimonial depuis une plateforme unique.",
  'home.insights.title': 'Insights',
  'home.insights.subtext':
    "Veille de marché, actualités BRVM et notes de recherche pour éclairer vos décisions d'investissement sur les marchés UEMOA.",
  'home.insights.actualitesKicker': 'Actualités',
  'home.insights.actualitesLink': 'Toutes les actualités',
  'home.insights.publicationsKicker': 'Publications',
  'home.insights.publicationsLink': 'Toutes les publications',
  'home.markets.badge': 'Marchés & opportunités',
  'home.markets.title': 'Marchés & opportunités.',
  'home.markets.intro':
    'Actualités BRVM, dette souveraine et financement régional : veille structurée sur les marchés UEMOA.',
  'home.markets.linkLabel': 'Voir toutes les actualités',
  'home.cta.badge': 'Prise de contact',
  'home.cta.title': 'Accéder à une expertise financière structurée.',
  'home.cta.intro':
    'Échangeons sur vos objectifs — rendement, horizon, contraintes réglementaires — et sur la formule la plus adaptée : courtage, conseil ou gestion sous mandat.',
  'home.cta.primary': 'Nous contacter',
  'home.cta.secondary': "Évaluer mon profil d'investisseur",
  'home.faq.badge': 'FAQ',
  'home.faq.title': 'Questions fréquentes.',
  'home.faq.intro':
    'Trouvez rapidement les réponses aux questions les plus fréquentes sur nos services et les marchés.',
  'home.faq.linkLabel': 'Toutes les questions',

  'about.hero.background': '/Assets_Website/À-propos.png',
  'about.hero.badge': 'À propos',
  'about.hero.title': 'Des idées et des valeurs au service de vos ambitions.',
  'about.hero.subtitle':
    "Société de Gestion et d'Intermédiation agréée AMF-UMOA. Nous allions discipline de marché, ingénierie financière et proximité client.",
  'about.hero.ctaLabel': 'Notre mission',
  'about.mission.badge': "Notre raison d'être",
  'about.mission.sectionTitle': 'Mission & Vision',
  'about.mission.missionTitle': 'Notre mission',
  'about.mission.missionBody':
    "Proposer des solutions d'investissement performantes et responsables, fondées sur la transparence, l'expertise et la proximité.",
  'about.mission.visionTitle': 'Notre vision',
  'about.mission.visionBody':
    "Devenir un partenaire de référence en Afrique de l'Ouest pour la gestion de patrimoine et l'accès aux marchés financiers.",
  'about.philosophie.badge': 'Philosophie',
  'about.philosophie.title': "Notre approche d'investissement.",
  'about.histoire.badge': 'Parcours',
  'about.histoire.title': 'Notre histoire',
  'about.equipe.badge': 'Leadership',
  'about.equipe.title': 'Équipe dirigeante',
  'about.conformite.badge': 'Réglementation',
  'about.conformite.title': 'Conformité & Sécurité',

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

  'expertises.hero.title': 'Nos expertises.',
  'expertises.hero.subtitle':
    "À l'interface des besoins de financement et des stratégies d'investissement — souveraine, BRVM, ingénierie et patrimoine dans la zone UEMOA.",
  'expertises.mtp.image': '/Assets_Website/mtp.jpg',
  'expertises.marche-titres-publics.title': 'Marché des Titres Publics.',
  'expertises.marche-titres-publics.intro':
    "Nous accompagnons les investisseurs dans leur accès aux émissions souveraines de l'UEMOA, en intégrant une analyse fine des dynamiques de taux et des conditions de marché.",
  'expertises.marche-titres-publics.approachLabel': 'Notre approche',
  'expertises.marche-titres-publics.approachText':
    'Sélection rigoureuse des maturités, gestion active du risque de taux et optimisation du rendement dans un cadre maîtrisé.',
  'expertises.marche-titres-publics.bullet1': 'Sélection rigoureuse des maturités',
  'expertises.marche-titres-publics.bullet2': 'Gestion active du risque de taux',
  'expertises.marche-titres-publics.bullet3':
    'Optimisation du rendement dans un cadre maîtrisé',
  'expertises.mfr.image': '/Assets_Website/mfr.jpg',
  'expertises.marche-financier-regional.title': 'Marché Financier Régional.',
  'expertises.marche-financier-regional.intro':
    "Nous intervenons sur la BRVM en assurant une exécution efficiente et un conseil éclairé pour les investisseurs institutionnels et privés qualifiés.",
  'expertises.marche-financier-regional.approachLabel': 'Notre apport',
  'expertises.marche-financier-regional.approachText':
    "Une capacité d'intermédiation fiable, une analyse indépendante et un accès structuré aux opportunités de marché.",
  'expertises.marche-financier-regional.bullet1': "Capacité d'intermédiation fiable",
  'expertises.marche-financier-regional.bullet2': 'Analyse indépendante',
  'expertises.marche-financier-regional.bullet3':
    'Accès structuré aux opportunités de marché',
  'expertises.ing.image': '/Assets_Website/s-&-if.jpg',
  'expertises.ingenierie-financiere.title': 'Structuration & Ingénierie financière.',
  'expertises.ingenierie-financiere.intro':
    'Nous concevons et mettons en œuvre des solutions de financement adaptées aux besoins des émetteurs publics et privés de la zone UEMOA.',
  'expertises.ingenierie-financiere.approachLabel': "Champs d'intervention",
  'expertises.ingenierie-financiere.approachText':
    'Émissions obligataires, structuration de dettes, titrisation et optimisation des conditions de financement.',
  'expertises.ingenierie-financiere.bullet1': 'Émissions obligataires',
  'expertises.ingenierie-financiere.bullet2': 'Structuration de dettes',
  'expertises.ingenierie-financiere.bullet3': 'Titrisation',
  'expertises.ingenierie-financiere.bullet4':
    'Optimisation des conditions de financement',
  'expertises.po.image': '/Assets_Website/po.jpg',
  'expertises.private-office.title': 'Private Office.',
  'expertises.private-office.intro':
    'Nous accompagnons une clientèle exigeante dans la structuration et la gestion de leur patrimoine, avec une approche disciplinée et long terme.',
  'expertises.private-office.approachLabel': 'Notre philosophie',
  'expertises.private-office.approachText':
    'Allocation disciplinée, diversification maîtrisée, gestion du risque intégrée et vision de long terme.',
  'expertises.private-office.bullet1': 'Allocation disciplinée',
  'expertises.private-office.bullet2': 'Diversification maîtrisée',
  'expertises.private-office.bullet3': 'Gestion du risque intégrée',
  'expertises.private-office.bullet4': 'Vision de long terme',
  'expertises.cta.title': "Besoin d'un accompagnement personnalisé ?",
  'expertises.cta.subtitle':
    "Nos équipes vous aident à structurer une stratégie adaptée à votre profil et vos objectifs d'investissement.",
  'expertises.cta.label': 'Prendre rendez-vous',

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

  'publications.hero.badge': 'Publications',
  'publications.hero.title': 'Nos revues & analyses.',
  'publications.hero.subtitle':
    "Consultez et téléchargez nos revues hebdomadaires, mensuelles et semestrielles pour suivre l'évolution des marchés.",

  'actualites.hero.background': '/Assets_Website/Actualités.png',
  'actualites.hero.badge': 'Centre de presse',
  'actualites.hero.title': 'Actualités & Communiqués.',
  'actualites.hero.subtitle':
    'Restez informé de nos derniers communiqués de presse, mises à jour et mentions dans les médias.',
}
