// Department data structure following the unified JSON schema
// for Everest Finance's 3 main departments

export interface ExpertiseSolution {
  solution_number: number
  name: string
  description: string
  target_audience: string[]
  client_problem: string
  value_proposition: string
}

export interface Department {
  department_name: string
  slug: string
  presentation: string
  missions: string[]
  operations_selected: string[]
  expertise_solutions: ExpertiseSolution[]
  approach_methodology: string
  hero_background?: string
}

export interface DepartmentsData {
  project: string
  departments: Department[]
}

export const departmentsData: DepartmentsData = {
  project: "Everest Finance SGI",
  departments: [
    {
      department_name: "Marché des Capitaux",
      slug: "marche-capitaux",
      hero_background: "/bg-mc.jpg",
      presentation:
        "Le département Marché des Capitaux d'Everest Finance accompagne les émetteurs publics et privés dans leurs opérations de levée de fonds sur le marché financier régional de l'UEMOA. Fort d'une expertise reconnue en structuration, placement et suivi post-marché, notre équipe intervient sur l'ensemble du cycle de financement pour garantir le succès de chaque opération.",
      missions: [
        "Structurer des émissions obligataires et actions adaptées aux besoins des émetteurs",
        "Assurer le placement auprès d'investisseurs institutionnels et particuliers qualifiés",
        "Coordonner les interactions avec les autorités de régulation (CREPMF, BRVM, DC/BR)",
        "Gérer le processus de bookbuilding et d'allocation des titres",
        "Assurer le suivi post-marché et la relation investisseurs"
      ],
      operations_selected: [
        "Émissions obligataires (emprunts obligataires par appel public à l'épargne)",
        "Augmentations de capital et introductions en bourse",
        "Placements privés auprès d'investisseurs qualifiés",
        "Structuration de titres hybrides",
        "Opérations de refinancement sur le marché"
      ],
      expertise_solutions: [
        {
          solution_number: 1,
          name: "Structuration d'émissions",
          description:
            "Conception sur mesure des termes financiers, montage juridique et documentation complète pour instruments de dette et de capital. Optimisation fiscale et réglementaire adaptée au cadre UEMOA.",
          target_audience: [
            "Entreprises cotées et non cotées",
            "États et collectivités territoriales",
            "Institutions financières"
          ],
          client_problem:
            "Besoin de lever des capitaux sur le marché financier régional avec des conditions optimales et une conformité réglementaire rigoureuse.",
          value_proposition:
            "Un accompagnement de bout en bout, de l'analyse initiale à l'obtention du visa du régulateur, avec une structuration qui maximise l'attractivité de l'opération pour les investisseurs."
        },
        {
          solution_number: 2,
          name: "Placement & bookbuilding",
          description:
            "Accès privilégié aux investisseurs institutionnels de la zone UEMOA, constitution du livre d'ordres, allocation disciplinée et détermination du prix optimal.",
          target_audience: [
            "Émetteurs obligataires",
            "Sociétés en phase d'introduction en bourse",
            "Family offices et investisseurs institutionnels"
          ],
          client_problem:
            "Mobiliser un volume suffisant de souscriptions auprès d'investisseurs de qualité dans des délais contraints.",
          value_proposition:
            "Un réseau étendu d'investisseurs institutionnels et un processus de placement éprouvé qui assure la couverture intégrale des opérations."
        },
        {
          solution_number: 3,
          name: "Suivi post-marché",
          description:
            "Reporting périodique, facilitation de la liquidité secondaire, gestion de la relation investisseurs et communication corporate après l'opération.",
          target_audience: [
            "Émetteurs ayant réalisé une opération de marché",
            "Sociétés cotées à la BRVM"
          ],
          client_problem:
            "Maintenir la confiance des investisseurs et assurer la liquidité des titres après l'émission.",
          value_proposition:
            "Un suivi structuré qui renforce la crédibilité de l'émetteur et prépare les conditions favorables pour de futures opérations."
        }
      ],
      approach_methodology:
        "Notre approche repose sur un processus en quatre phases : diagnostic et cadrage stratégique, structuration et documentation réglementaire, placement et constitution du livre d'ordres, puis règlement-livraison et suivi post-opération. Chaque étape fait l'objet d'un reporting détaillé et d'une validation conjointe avec le client. Cette méthodologie, éprouvée sur plus de vingt-cinq opérations, garantit rigueur, transparence et respect des délais."
    },
    {
      department_name: "Ingénierie Financière",
      slug: "ingenieurie-financiere",
      presentation:
        "Le département Ingénierie Financière d'Everest Finance conçoit et exécute des opérations financières complexes pour les entreprises, institutions et investisseurs de la zone UEMOA. Notre équipe combine expertise technique et connaissance approfondie du marché régional pour proposer des solutions de financement et de restructuration sur mesure.",
      missions: [
        "Concevoir des montages financiers adaptés aux objectifs stratégiques des clients",
        "Structurer des opérations de levée de fonds (dette, fonds propres, instruments hybrides)",
        "Accompagner les entreprises dans leurs projets de fusion-acquisition et de restructuration",
        "Réaliser des évaluations d'entreprises et des analyses de faisabilité financière",
        "Conseiller sur la gouvernance financière et l'optimisation de la structure de capital"
      ],
      operations_selected: [
        "Structuration de financements complexes (dette subordonnée, mezzanine, convertibles)",
        "Conseil en fusions et acquisitions",
        "Évaluation d'entreprises et d'actifs",
        "Restructuration financière et refinancement",
        "Conseil en stratégie de financement et optimisation du bilan"
      ],
      expertise_solutions: [
        {
          solution_number: 1,
          name: "Structuration d'opérations",
          description:
            "Conception sur mesure des termes financiers, modélisation avancée, optimisation des instruments et évaluation des risques pour des opérations de financement complexes.",
          target_audience: [
            "Entreprises en phase de croissance",
            "Groupes industriels",
            "Investisseurs institutionnels"
          ],
          client_problem:
            "Besoin de solutions de financement innovantes qui dépassent les schémas classiques de crédit bancaire.",
          value_proposition:
            "Une ingénierie financière rigoureuse qui identifie la structure optimale en termes de coût, de risque et de flexibilité pour chaque situation."
        },
        {
          solution_number: 2,
          name: "Conseil stratégique",
          description:
            "Accompagnement dans la préparation d'opérations financières, la stratégie de communication, la gouvernance d'entreprise et la conformité réglementaire.",
          target_audience: [
            "Dirigeants d'entreprises",
            "Conseils d'administration",
            "Actionnaires de référence"
          ],
          client_problem:
            "Prendre des décisions financières stratégiques éclairées dans un environnement réglementaire et concurrentiel complexe.",
          value_proposition:
            "Un conseil indépendant et objectif, fondé sur une analyse rigoureuse et une connaissance fine du marché ouest-africain."
        },
        {
          solution_number: 3,
          name: "Placement et exécution",
          description:
            "Accès aux investisseurs, gestion du processus de bookbuilding, allocation optimale et exécution des opérations de financement.",
          target_audience: [
            "Émetteurs de titres",
            "Entreprises en recherche de financement",
            "Fonds d'investissement"
          ],
          client_problem:
            "Accéder aux capitaux nécessaires dans des conditions de marché optimales et dans les délais requis.",
          value_proposition:
            "Un réseau d'investisseurs qualifiés et un processus d'exécution discipliné qui maximise les chances de succès de l'opération."
        }
      ],
      approach_methodology:
        "Notre méthodologie s'articule autour de quatre étapes structurées : diagnostic et cadrage stratégique avec analyse des objectifs et contraintes du client, structuration et documentation avec modélisation financière et préparation réglementaire, placement et fixation des conditions via un roadshow ciblé et la constitution du livre d'ordres, puis clôture et suivi post-opération. Chaque phase est jalonnée de livrables précis et de points de validation avec le client."
    },
    {
      department_name: "Recherche & Analyses",
      slug: "recherche-analyses",
      presentation:
        "Le département Recherche & Analyses d'Everest Finance produit des études et analyses indépendantes sur les marchés financiers de la zone UEMOA. Nos publications couvrent l'évolution des indices BRVM, les dynamiques sectorielles et les valorisations d'entreprises, offrant aux investisseurs institutionnels et particuliers les éléments nécessaires à une prise de décision éclairée.",
      missions: [
        "Produire des notes de marché hebdomadaires et mensuelles sur la BRVM",
        "Réaliser des études sectorielles approfondies avec recommandations d'investissement",
        "Conduire des analyses sur mesure (valorisations, due diligences, études de faisabilité)",
        "Fournir un suivi macroéconomique de la zone UEMOA",
        "Alimenter les équipes internes et les clients en données fiables et actionnables"
      ],
      operations_selected: [
        "Notes et revues de marché (hebdomadaires, mensuelles)",
        "Études sectorielles (banques, télécoms, immobilier, énergie)",
        "Valorisations d'entreprises (DCF, comparables, sum-of-the-parts)",
        "Analyses sur mesure pour comités d'investissement",
        "Suivi macroéconomique et veille réglementaire UEMOA"
      ],
      expertise_solutions: [
        {
          solution_number: 1,
          name: "Notes & revues de marché",
          description:
            "Publications régulières sur l'évolution des indices BRVM, les volumes de transactions, les flux sur le marché primaire et l'analyse des valorisations.",
          target_audience: [
            "Investisseurs institutionnels",
            "Gérants de portefeuille",
            "Directions financières"
          ],
          client_problem:
            "Disposer d'une vision synthétique et actualisée de l'état du marché financier régional pour orienter les décisions d'investissement.",
          value_proposition:
            "Des publications concises, rigoureuses et régulières qui permettent un suivi efficace du marché sans mobiliser de ressources internes dédiées."
        },
        {
          solution_number: 2,
          name: "Études sectorielles approfondies",
          description:
            "Analyses fondamentales complètes avec benchmarks sectoriels, évaluation des tendances et recommandations d'investissement par secteur économique.",
          target_audience: [
            "Fonds d'investissement",
            "Banques et compagnies d'assurance",
            "Investisseurs étrangers intéressés par l'UEMOA"
          ],
          client_problem:
            "Comprendre les dynamiques sectorielles et identifier les opportunités d'investissement dans un marché où l'information publique reste limitée.",
          value_proposition:
            "Une recherche indépendante qui combine données quantitatives et analyse qualitative pour fournir une vision complète de chaque secteur."
        },
        {
          solution_number: 3,
          name: "Analyses sur mesure",
          description:
            "Études personnalisées pour comités d'investissement, due diligences financières, valorisations d'entreprises et analyses de marché spécifiques.",
          target_audience: [
            "Comités d'investissement",
            "Acquéreurs potentiels",
            "Conseils d'administration"
          ],
          client_problem:
            "Obtenir une analyse indépendante et approfondie sur un sujet précis pour étayer une décision d'investissement ou de cession.",
          value_proposition:
            "Des analyses sur mesure réalisées par des analystes expérimentés, avec une méthodologie transparente et des conclusions actionnables."
        }
      ],
      approach_methodology:
        "Notre processus de recherche suit quatre étapes : définition du périmètre et validation des hypothèses avec le client, collecte et traitement des données primaires et secondaires, analyse quantitative et qualitative approfondie (modélisation DCF, comparables, analyse de sensibilité), puis synthèse et formulation de recommandations stratégiques. Chaque livrable fait l'objet d'une revue interne avant diffusion pour garantir la qualité et l'objectivité de nos conclusions."
    }
  ]
}

// Helper to find a department by slug
export function getDepartmentBySlug(slug: string): Department | undefined {
  return departmentsData.departments.find((d) => d.slug === slug)
}
