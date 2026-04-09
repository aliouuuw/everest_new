// Department data structure following the unified JSON schema
// for Everest Finance's 3 main departments

export interface Metric {
  value: string
  label: string
  suffix?: string
}

export interface MethodStep {
  title: string
  description: string
}

export interface Allocation {
  name: string
  value: number
  color: string
}

export interface Differentiator {
  title: string
  description: string
}

export interface TargetPersona {
  label: string
  description: string
}

export interface ExpertiseSolution {
  solution_number: number
  name: string
  description: string
  target_audience: string[]
  client_problem: string
  value_proposition: string
  allocation?: Allocation[]
}

export interface Department {
  department_name: string
  slug: string
  hero_headline: string
  hero_subtitle: string
  presentation: string
  metrics?: Metric[]
  differentiators: Differentiator[]
  target_personas: TargetPersona[]
  missions: string[]
  operations_selected: string[]
  expertise_solutions: ExpertiseSolution[]
  approach_methodology: string
  method_steps?: MethodStep[]
  hero_background?: string
  cta_text: string
  cta_subtitle: string
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
      hero_background: "/Assets_Website/dmc.png",
      hero_headline: "Levez des capitaux. Accélérez votre croissance.",
      hero_subtitle: "Accédez au marché financier régional avec un partenaire qui a structuré et placé plus de 25 opérations avec un taux de couverture de 100%.",
      presentation:
        "Nous accompagnons les émetteurs publics et privés dans leurs opérations de levée de fonds sur le marché financier régional de l'UEMOA. De la structuration au suivi post-marché, notre équipe intervient sur l'ensemble du cycle de financement pour garantir le succès de chaque opération.",
      metrics: [
        { value: "+25", label: "Opérations réussies" },
        { value: "8", label: "Pays couverts", suffix: "UEMOA" },
        { value: "100%", label: "Taux de placement" }
      ],
      differentiators: [
        { title: "Réseau investisseurs étendu", description: "Accès privilégié aux institutionnels, fonds de pension et family offices de la zone UEMOA." },
        { title: "Track record éprouvé", description: "Plus de 25 opérations réussies avec un taux de couverture intégrale sur chaque émission." },
        { title: "Accompagnement de bout en bout", description: "De l'analyse initiale au suivi post-marché, un interlocuteur unique pour chaque étape." }
      ],
      target_personas: [
        { label: "Entreprises & Groupes", description: "Financez votre expansion via le marché obligataire ou une introduction en bourse." },
        { label: "États & Collectivités", description: "Structurez vos emprunts publics avec un placement optimal auprès des investisseurs." },
        { label: "Institutions Financières", description: "Renforcez vos fonds propres ou refinancez vos engagements sur le marché." }
      ],
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
        "Notre approche repose sur un processus en quatre phases : diagnostic et cadrage stratégique, structuration et documentation réglementaire, placement et constitution du livre d'ordres, puis règlement-livraison et suivi post-opération. Chaque étape fait l'objet d'un reporting détaillé et d'une validation conjointe avec le client. Cette méthodologie, éprouvée sur plus de vingt-cinq opérations, garantit rigueur, transparence et respect des délais.",
      method_steps: [
        { title: "Diagnostic et Cadrage", description: "Analyse des besoins de financement, structuration préliminaire et définition du calendrier de l'opération." },
        { title: "Structuration et Documentation", description: "Montage financier et juridique, rédaction des notes d'information et obtention des visas réglementaires (CREPMF)." },
        { title: "Placement et Bookbuilding", description: "Roadshow investisseurs, constitution du livre d'ordres et allocation optimale des titres." },
        { title: "Règlement et Suivi", description: "Dénouement financier, cotation à la BRVM (si applicable) et reporting post-opération régulier." }
      ],
      cta_text: "Discutons de votre prochaine opération",
      cta_subtitle: "Nos experts en marché des capitaux sont prêts à structurer votre levée de fonds."
    },
    {
      department_name: "Ingénierie Financière",
      slug: "ingenieurie-financiere",
      hero_background: "/Assets_Website/Ingénierie-Financière.png",
      hero_headline: "Structurez. Optimisez. Transformez.",
      hero_subtitle: "Des solutions de financement sur mesure pour les opérations complexes qui dépassent les schémas classiques du crédit bancaire.",
      presentation:
        "Notre équipe d'ingénierie financière conçoit et exécute des opérations complexes pour les entreprises, institutions et investisseurs de la zone UEMOA. Nous combinons expertise technique et connaissance approfondie du marché régional pour proposer des solutions sur mesure.",
      metrics: [
        { value: "360°", label: "Approche intégrée" },
        { value: "100%", label: "Conseil indépendant" },
        { value: "UEMOA", label: "Expertise régionale" }
      ],
      differentiators: [
        { title: "Conseil indépendant", description: "Aucun conflit d'intérêt — nos recommandations servent uniquement les objectifs de nos clients." },
        { title: "Modélisation avancée", description: "Des modèles financiers rigoureux pour évaluer chaque scénario et optimiser la structure." },
        { title: "Expertise réglementaire", description: "Maîtrise du cadre juridique et fiscal UEMOA pour sécuriser chaque opération." }
      ],
      target_personas: [
        { label: "Entreprises en croissance", description: "Structurez des financements innovants pour accélérer votre développement." },
        { label: "Dirigeants & Actionnaires", description: "Prenez des décisions stratégiques éclairées avec un conseil objectif et indépendant." },
        { label: "Investisseurs institutionnels", description: "Accédez à des opportunités structurées avec une analyse de risque approfondie." }
      ],
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
        "Notre méthodologie s'articule autour de quatre étapes structurées : diagnostic et cadrage stratégique avec analyse des objectifs et contraintes du client, structuration et documentation avec modélisation financière et préparation réglementaire, placement et fixation des conditions via un roadshow ciblé et la constitution du livre d'ordres, puis clôture et suivi post-opération. Chaque phase est jalonnée de livrables précis et de points de validation avec le client.",
      method_steps: [
        { title: "Diagnostic et Stratégie", description: "Analyse approfondie des objectifs, modélisation financière initiale et définition de la stratégie optimale." },
        { title: "Structuration et Documentation", description: "Montage juridique et financier détaillé, rédaction des mémorandums et term sheets." },
        { title: "Marketing et Négociation", description: "Approche des contreparties cibles, gestion des data rooms et négociation des conditions." },
        { title: "Closing et Suivi", description: "Finalisation des accords juridiques, transfert des fonds et accompagnement post-opération." }
      ],
      cta_text: "Parlons de votre projet",
      cta_subtitle: "Nos experts en ingénierie financière étudient votre situation et proposent la structure optimale."
    },
    {
      department_name: "Gestion Sous Mandat",
      slug: "gestion-sous-mandat",
      hero_background: "/Assets_Website/gsm.png",
      hero_headline: "Votre patrimoine. Notre expertise. Vos objectifs.",
      hero_subtitle: "Confiez la gestion de vos actifs à une équipe qui aligne chaque décision d'investissement sur vos objectifs personnels.",
      presentation:
        "Nous pilotons des portefeuilles d'investissement pour le compte d'investisseurs institutionnels, entreprises et particuliers fortunés. Notre approche structurée combine définition de profils d'investissement, allocation stratégique et suivi rigoureux pour optimiser la performance ajustée au risque.",
      metrics: [
        { value: "3", label: "Profils de mandat" },
        { value: "24/7", label: "Suivi des marchés" },
        { value: "100%", label: "Reporting transparent" }
      ],
      differentiators: [
        { title: "Gestion personnalisée", description: "Chaque portefeuille est construit sur mesure selon votre profil de risque et vos objectifs." },
        { title: "Pilotage actif", description: "Rééquilibrage continu et ajustements tactiques en fonction des conditions de marché." },
        { title: "Transparence totale", description: "Reporting détaillé, analyse d'attribution et réunions de suivi régulières." }
      ],
      target_personas: [
        { label: "Investisseurs institutionnels", description: "Optimisez la performance de vos réserves avec une gestion disciplinée et conforme." },
        { label: "Particuliers fortunés", description: "Déléguez la gestion de votre patrimoine à des experts dédiés." },
        { label: "Entreprises", description: "Faites fructifier votre trésorerie excédentaire avec un mandat adapté." }
      ],
      missions: [
        "Définir le profil d'investissement adapté aux objectifs et contraintes de chaque client",
        "Structurer des mandats de gestion (Prudent, Équilibré, Dynamique)",
        "Piloter les portefeuilles dans le temps avec discipline et rigueur",
        "Gérer les risques et assurer la conformité réglementaire",
        "Fournir un reporting régulier et transparent"
      ],
      operations_selected: [
        "Placements collectifs sur la BRVM",
        "Programmes d'épargne ciblés",
        "Gestion de portefeuilles sous mandat pour institutionnels",
        "Gestion de portefeuilles pour HNWI (High Net Worth Individuals)",
        "Gestion de trésorerie d'entreprises"
      ],
      expertise_solutions: [
        {
          solution_number: 1,
          name: "Mandat Prudent",
          description:
            "Allocation conservatrice privilégiant les obligations d'État et corporate de qualité, avec une exposition actions limitée. Objectif de préservation du capital avec rendement régulier.",
          target_audience: [
            "Investisseurs institutionnels à faible tolérance au risque",
            "Fonds de pension",
            "Particuliers proches de la retraite"
          ],
          client_problem:
            "Préserver le capital tout en générant un rendement supérieur aux placements monétaires classiques.",
          value_proposition:
            "Une gestion prudente et disciplinée qui privilégie la sécurité du capital avec des rendements prévisibles et réguliers.",
          allocation: [
            { name: "Obligations (État & Corporate)", value: 85, color: "#1e3a8a" },
            { name: "Monétaire", value: 10, color: "#94a3b8" },
            { name: "Actions", value: 5, color: "#c6a87c" }
          ]
        },
        {
          solution_number: 2,
          name: "Mandat Équilibré",
          description:
            "Allocation mixte combinant obligations (60%) et actions (40%) pour un équilibre entre croissance et stabilité. Diversification sectorielle et géographique au sein de l'UEMOA.",
          target_audience: [
            "Investisseurs institutionnels à horizon moyen terme",
            "Entreprises gérant leur trésorerie excédentaire",
            "Particuliers fortunés"
          ],
          client_problem:
            "Obtenir une croissance du capital à moyen terme tout en maîtrisant la volatilité.",
          value_proposition:
            "Un équilibre optimal entre performance et maîtrise du risque, avec une allocation dynamique ajustée aux conditions de marché."
        },
        {
          solution_number: 3,
          name: "Mandat Dynamique",
          description:
            "Allocation orientée croissance avec exposition actions majoritaire (70-80%). Sélection active de valeurs à fort potentiel sur la BRVM et gestion opportuniste.",
          target_audience: [
            "Investisseurs à horizon long terme",
            "Family offices",
            "Fonds d'investissement"
          ],
          client_problem:
            "Maximiser la croissance du capital sur le long terme en acceptant une volatilité plus élevée.",
          value_proposition:
            "Une gestion active et opportuniste qui vise à surperformer l'indice BRVM Composite grâce à une sélection rigoureuse de titres et un timing de marché discipliné.",
          allocation: [
            { name: "Actions", value: 80, color: "#c6a87c" },
            { name: "Obligations", value: 15, color: "#1e3a8a" },
            { name: "Monétaire", value: 5, color: "#94a3b8" }
          ]
        }
      ],
      approach_methodology:
        "Notre méthodologie de gestion sous mandat repose sur quatre piliers : définition du profil d'investissement avec analyse des objectifs, contraintes et tolérance au risque du client, construction du portefeuille avec allocation stratégique et sélection de titres selon des critères fondamentaux rigoureux, pilotage actif avec rééquilibrage périodique et ajustements tactiques en fonction des conditions de marché, et reporting transparent avec suivi de performance, analyse d'attribution et communication régulière. Cette approche structurée garantit l'alignement permanent entre le mandat et les objectifs du client.",
      method_steps: [
        { title: "Profil d'Investissement", description: "Évaluation de la tolérance au risque, de l'horizon de placement et des objectifs de rendement." },
        { title: "Construction du Portefeuille", description: "Allocation d'actifs stratégique et sélection rigoureuse des titres (actions et obligations)." },
        { title: "Pilotage Actif", description: "Suivi continu des marchés, ajustements tactiques et rééquilibrage périodique du portefeuille." },
        { title: "Reporting Transparent", description: "Relevés détaillés de performance, analyse d'attribution et réunions de suivi régulières." }
      ],
      cta_text: "Découvrez le mandat adapté à vos objectifs",
      cta_subtitle: "Nos gestionnaires de portefeuille analysent votre profil et construisent une allocation sur mesure."
    }
  ]
}

// Helper to find a department by slug
export function getDepartmentBySlug(slug: string): Department | undefined {
  return departmentsData.departments.find((d) => d.slug === slug)
}
