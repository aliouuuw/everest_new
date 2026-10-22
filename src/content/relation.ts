/**
 * Opportunités (§6), Sama Naffa (§7) and Contact / Devenir client (§8), referential V2.1 Part III, word for word.
 * §6 CTA « Accéder à l'espace investisseur » is hidden until the investor space exists (22 Oct 2026 decision).
 * Em dashes replaced per the 22 Oct 2026 decision (pair -> parentheses, single -> comma).
 * Keys are CMS ids (page keys `opportunites`, `sama-naffa`, `contact`).
 */
export const OPPORTUNITES_TEXT = {
  'opportunites.n1':
    "Les marchés financiers de l'UEMOA offrent aux investisseurs un éventail d'instruments réglementés : titres publics, obligations d'entreprises, actions cotées, organismes de placement collectif. EVEREST Finance identifie, analyse et structure ces opportunités pour les rendre accessibles dans un cadre maîtrisé.",
  'opportunites.n2':
    "Les informations relatives aux opérations en cours (caractéristiques des instruments, conditions de souscription, documentation réglementaire) sont réservées aux clients de la maison et aux investisseurs enregistrés. Cet encadrement n'est pas une restriction de complaisance : il garantit que chaque investisseur reçoit une information complète, adaptée à sa situation, dans le respect de la réglementation de l'AMF-UMOA. L'espace investisseur donne accès, après identification, aux émissions en cours et à leur documentation, aux caractéristiques des instruments et aux modalités pratiques de souscription. L'inscription est gratuite ; elle nous permet de vérifier que l'information délivrée correspond à votre situation.",
  'opportunites.cta2': 'Devenir client',
} as const

export const SAMA_NAFFA_TEXT = {
  'sama-naffa.n1':
    "Sama Naffa est la solution d'épargne portée par EVEREST Finance. Elle permet à chacun d'épargner de manière structurée et d'accéder progressivement aux marchés financiers régionaux : commencer modestement, tenir dans la durée, construire un patrimoine. Sama Naffa dispose de son propre univers, avec ses parcours, son accompagnement et ses outils pédagogiques.",
  'sama-naffa.cta': 'Découvrir Sama Naffa →',
} as const

export const CONTACT_TEXT = {
  'contact.n1': "Nos équipes analysent votre besoin et vous répondent dans les délais que la maison s'impose.",
  'contact.n2':
    'Nos délais internes : accusé de réception sous quatre heures ouvrées ou avant 10 heures le jour ouvré suivant ; confirmation écrite de tout échange verbal sous vingt-quatre heures ouvrées. Un interlocuteur unique vous est désigné dès la prise de contact.',
  'contact.parcours.heading': 'Parcours Devenir client',
  'contact.step1.n1': 'Prise de contact.',
  'contact.step1.n2':
    "Vous nous écrivez ou nous appelez ; un interlocuteur unique vous est désigné. Il reste votre point d'entrée pour toute la durée de la relation.",
  'contact.step2.n1': 'Connaissance client.',
  'contact.step2.n2':
    "Nous constituons ensemble votre dossier réglementaire : identité, situation, objectifs, tolérance au risque. Cette étape est une obligation légale ; elle est aussi la base d'un conseil adapté. Le temps qu'elle prend est un investissement, pas une formalité.",
  'contact.step3.n1': 'Convention.',
  'contact.step3.n2':
    "La relation est formalisée par une convention d'ouverture de compte qui précise les services, les frais et les droits de chacun. Aucun frais n'est prélevé sans avoir été porté à votre connaissance.",
  'contact.step4.n1': 'Ouverture de compte.',
  'contact.step4.n2':
    'Votre compte titres et espèces est ouvert ; vos avoirs sont conservés de manière ségréguée, distincts des avoirs de la maison. Vous pouvez opérer.',
  'contact.coordonnees.heading': 'Coordonnées',
  'contact.coordonnees.n1':
    'EVEREST Finance, 18 Boulevard de la République, Dakar, Sénégal, BP 11659-13000. contact@everestfin.com. +221 33 822 87 00 / +221 33 822 87 01.',
} as const

export type OpportunitesTextId = keyof typeof OPPORTUNITES_TEXT
export type SamaNaffaTextId = keyof typeof SAMA_NAFFA_TEXT
export type ContactTextId = keyof typeof CONTACT_TEXT
