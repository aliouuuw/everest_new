import { createHash, randomBytes, timingSafeEqual } from 'crypto'

/** Hard cap per file. Vercel functions refuse request bodies over 4.5 MB. */
export const MAX_FILE_BYTES = 4 * 1024 * 1024
/** Cap for the JSON answers sent with the request. */
export const MAX_JSON_BYTES = 1024 * 1024

export const newToken = () => randomBytes(32).toString('base64url')
export const hashToken = (token: string) => createHash('sha256').update(token).digest('hex')
export const sha256 = (buf: Buffer) => createHash('sha256').update(buf).digest('hex')

export function tokenMatches(authorization: string | null, storedHash: string | null | undefined): boolean {
  const token = authorization?.match(/^Bearer (\S+)$/)?.[1]
  if (!token || !storedHash) return false
  const a = Buffer.from(hashToken(token), 'hex')
  const b = Buffer.from(storedHash, 'hex')
  return a.length === b.length && timingSafeEqual(a, b)
}

export const newReference = (now = new Date()) =>
  `EVF-${now.getFullYear()}-${randomBytes(4).toString('hex').toUpperCase()}`

/** Real file type from its first bytes. The client-declared type is not trusted. */
export function sniffType(buf: Buffer): { mime: string; ext: string } | null {
  if (buf.subarray(0, 5).toString('latin1') === '%PDF-') return { mime: 'application/pdf', ext: 'pdf' }
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return { mime: 'image/jpeg', ext: 'jpg' }
  if (buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])))
    return { mime: 'image/png', ext: 'png' }
  const brand = buf.subarray(4, 12).toString('latin1')
  if (/^ftyp(heic|heix|hevc|mif1|msf1)$/.test(brand)) return { mime: 'image/heic', ext: 'heic' }
  return null
}

/** The form's piece keys are short identifiers; anything else is refused. */
export const validKey = (k: string) => /^[A-Za-z0-9_.:-]{1,80}$/.test(k)

type Answers = Record<string, unknown>
const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '')

/** Main contact of the request, read from the form answers for the staff list view. */
export function contact(r: Answers) {
  const people = ['cotitulaires', 'representants', 'signataires']
    .flatMap((k) => (Array.isArray(r[k]) ? (r[k] as Answers[]) : []))
  const first = [r, ...people].find((p) => str(p.nomNaissance) || str(p.courriel)) ?? {}
  const personName = [str(first.prenoms), str(first.nomNaissance)].filter(Boolean).join(' ')
  const child = (r.enfant ?? {}) as Answers
  const childName = [str(child.prenoms), str(child.nomNaissance)].filter(Boolean).join(' ')
  return {
    titulaire: str(r.denomination) || (childName ? `${childName} (mineur)` : '') || personName,
    courriel: str(first.courriel) || str(r.interCourriel),
    telephone: str(first.telephone) || str(r.interTel),
  }
}
