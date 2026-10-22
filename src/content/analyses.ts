/**
 * Analyses & Publications (§4) and Actualités (§5) copy, referential V2.1 Part III, word for word.
 * Em dashes replaced per the 22 Oct 2026 decision (single -> comma).
 * Keys are CMS ids (page keys `publications` and `actualites`): the registry and the Payload seed defaults read these objects.
 * The disclaimer is the one place where « performances » is allowed (I.6 exception).
 */
export const ANALYSES_TEXT = {
  'publications.n1': "L'information est la première chose que nous devons au marché.",
  'publications.n2':
    "Dans des marchés en transformation, une information fiable et structurée est un préalable à toute décision, et son accès ne doit pas être un privilège d'initiés. Nos publications suivent des formats constants : notes de conjoncture sur l'UEMOA, décryptages des émissions du marché des titres publics, points de marché sur la BRVM, fiches pédagogiques. La régularité est notre discipline éditoriale : mieux vaut une note courte et tenue qu'une étude brillante et sans lendemain. Les synthèses sont publiques ; l'intégralité des analyses est réservée à nos clients et aux investisseurs enregistrés.",
  'publications.disclaimer':
    "Ce document est publié par EVEREST Finance, Société de Gestion et d'Intermédiation agréée par l'AMF-UMOA sous le numéro SGI/DA/2016/60. Il a une vocation exclusivement informative. Il ne constitue ni un conseil en investissement personnalisé, ni une offre, ni une sollicitation d'achat ou de vente d'instruments financiers. Tout investissement sur les marchés financiers comporte des risques, y compris un risque de perte en capital. Les performances passées ne préjugent pas des performances futures.",
} as const

export const ACTUALITES_TEXT = {
  'actualites.n1': 'La vie de la maison et du marché.',
  'actualites.n2':
    "On y trouvera : les opérations menées à leur terme, les publications nouvelles, les événements de la maison, les nominations. On n'y trouvera pas : les opérations en cours dont la communication n'a pas été autorisée, ni les effets d'annonce. Les communications relatives aux opérations sont soumises à validation préalable de la fonction conformité.",
} as const

export type AnalysesTextId = keyof typeof ANALYSES_TEXT
export type ActualitesTextId = keyof typeof ACTUALITES_TEXT
