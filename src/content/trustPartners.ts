export type TrustPartner = {
  name: string
  logo: string
}

export const DEFAULT_TRUST_PARTNERS: Array<TrustPartner> = [
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
]

export function parseTrustPartners(value?: string): Array<TrustPartner> | null {
  if (!value) return null

  try {
    const parsed: unknown = JSON.parse(value)
    if (!Array.isArray(parsed)) return null

    const partners = parsed
      .map((item): TrustPartner | null => {
        if (typeof item !== 'object' || item == null) return null
        const record = item as Partial<Record<keyof TrustPartner, unknown>>
        const name = typeof record.name === 'string' ? record.name.trim() : ''
        const logo = typeof record.logo === 'string' ? record.logo.trim() : ''
        if (!name || !logo) return null
        return { name, logo }
      })
      .filter((partner): partner is TrustPartner => partner !== null)

    return partners.length > 0 ? partners : null
  } catch {
    return null
  }
}

export function parseTrustPartnerDrafts(
  value?: string,
): Array<TrustPartner> | null {
  if (!value) return null

  try {
    const parsed: unknown = JSON.parse(value)
    if (!Array.isArray(parsed)) return null

    return parsed.map((item): TrustPartner => {
      if (typeof item !== 'object' || item == null) {
        return { name: '', logo: '' }
      }

      const record = item as Partial<Record<keyof TrustPartner, unknown>>
      return {
        name: typeof record.name === 'string' ? record.name : '',
        logo: typeof record.logo === 'string' ? record.logo : '',
      }
    })
  } catch {
    return null
  }
}
