export type PublicationFrequency = 'hebdomadaire' | 'mensuelle' | 'semestrielle'

export type PublicationFile = {
  id: string
  title: string
  description: string
  frequency: PublicationFrequency
  date: string
  fileUrl: string
  fileSize: string
  pages?: number
}

export const PUBLICATION_FREQUENCY_LABELS: Record<PublicationFrequency, string> = {
  hebdomadaire: 'Hebdomadaire',
  mensuelle: 'Mensuelle',
  semestrielle: 'Semestrielle',
}

/** Public catalogue: uploaded PDFs only. No HTML slug pages. */
export const PUBLICATION_FILES: Array<PublicationFile> = [
  {
    id: 'revue-hebdo-32',
    title: 'Revue Hebdomadaire — 20 au 24 avril 2026',
    description:
      "Synthèse hebdomadaire des performances du marché boursier régional, tendances sectorielles et recommandations d'investissement.",
    frequency: 'hebdomadaire',
    date: '2026-04-24',
    fileUrl: '/publications/Revue-Hebdo-32.pdf',
    fileSize: '14.0 MB',
    pages: 10,
  },
  {
    id: 'revue-hebdo-example',
    title: 'Revue Hebdomadaire — 1 au 4 avril 2026',
    description:
      "Synthèse hebdomadaire des performances du marché boursier régional, tendances sectorielles et recommandations d'investissement.",
    frequency: 'hebdomadaire',
    date: '2026-04-04',
    fileUrl: '/publications/Revue-Hebdomadaire-example.pdf',
    fileSize: '13.2 MB',
    pages: 9,
  },
  {
    id: 'revue-semestrielle-sep-26',
    title: 'Revue Semestrielle — S1 2026',
    description:
      "Bilan semestriel complet : analyse macro-économique UEMOA, performances des indices, faits marquants et perspectives du second semestre.",
    frequency: 'semestrielle',
    date: '2026-09-20',
    fileUrl: '/publications/Revue-semestrielle-20.09.26-1.pdf',
    fileSize: '10.5 MB',
    pages: 16,
  },
]
