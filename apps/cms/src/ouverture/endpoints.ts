import type { Endpoint, PayloadRequest } from 'payload'
import {
  MAX_FILE_BYTES, MAX_JSON_BYTES, contact, hashToken, newReference, newToken, sha256, sniffType, tokenMatches, validKey,
} from './lib'

/**
 * Server side of the account-opening form (public/ouverture/, config api = "/api/ouverture").
 * Contract: public/ouverture/engine.js, object `api`.
 * Phase 1: intake only. Identity check (Didit) and e-signature are not wired yet, so `etat`
 * answers `etape: "examen"` with no person to verify: the client goes straight to "dossier reçu".
 */

const DOSSIERS = 'dossiers-ouverture'
const PIECES = 'pieces-ouverture'
const DELAI_TRAITEMENT_JOURS = 5

const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: { 'cache-control': 'no-store' } })
const fail = (status: number, erreur: string, code?: string) => json({ erreur, code }, status)

type Dossier = { id: number; statut: string; reference?: string | null; jetonHash: string }

/** Loads the dossier named in the URL and checks the client's bearer token. */
async function authorised(req: PayloadRequest): Promise<Dossier | Response> {
  const id = String(req.routeParams?.id ?? '')
  if (!/^\d+$/.test(id)) return fail(404, 'Dossier introuvable.')
  const dossier = (await req.payload
    .findByID({ collection: DOSSIERS, id, depth: 0, overrideAccess: true, showHiddenFields: true })
    .catch(() => null)) as Dossier | null
  if (!dossier || !tokenMatches(req.headers.get('authorization'), dossier.jetonHash))
    return fail(404, 'Dossier introuvable.')
  return dossier
}

const etat = (d: Dossier) => ({
  reference: d.reference,
  etape: 'examen',
  personnes: [],
  documents: [],
  delai_traitement: DELAI_TRAITEMENT_JOURS,
})

async function removePiece(req: PayloadRequest, dossierId: Dossier['id'], cle: string, keepId?: number) {
  await req.payload.delete({
    collection: PIECES,
    where: {
      and: [
        { dossier: { equals: dossierId } },
        { cle: { equals: cle } },
        ...(keepId ? [{ id: { not_equals: keepId } }] : []),
      ],
    },
    overrideAccess: true,
  })
}

/** Dossier still in draft, plus a valid piece key from the URL. */
async function draftPiece(req: PayloadRequest): Promise<{ d: Dossier; cle: string } | Response> {
  const d = await authorised(req)
  if (d instanceof Response) return d
  if (d.statut !== 'brouillon') return fail(409, 'Ce dossier est déjà envoyé.')
  const cle = String(req.routeParams?.cle ?? '')
  return validKey(cle) ? { d, cle } : fail(400, 'Pièce inconnue.')
}

/** Reads the `fichier` field and checks its size and real type. */
async function readFile(req: PayloadRequest) {
  if (Number(req.headers.get('content-length') || 0) > MAX_FILE_BYTES + 64 * 1024) return fail(413, 'Ce fichier dépasse 4 Mo.')
  const file = (await req.formData?.().catch(() => null))?.get('fichier')
  if (!(file instanceof Blob)) return fail(400, 'Aucun fichier reçu.')
  if (file.size > MAX_FILE_BYTES) return fail(413, 'Ce fichier dépasse 4 Mo.')
  const data = Buffer.from(await file.arrayBuffer())
  const type = sniffType(data)
  if (!type) return fail(415, 'Format non accepté. Joignez un PDF ou une photo JPEG, PNG ou HEIC.')
  const nom = file instanceof File && file.name ? file.name : `piece.${type.ext}`
  return { data, nom, hash: sha256(data), ...type }
}

type Piece = { cle: string; libelle: string; statut: string }

function parseEnvoi(text: string) {
  if (text.length > MAX_JSON_BYTES) return fail(413, 'Demande trop volumineuse.')
  let body: Record<string, unknown>
  try { body = JSON.parse(text) } catch { return fail(400, 'Demande illisible.') }
  const reponses = body?.reponses
  if (!reponses || typeof reponses !== 'object' || Array.isArray(reponses)) return fail(400, 'Réponses manquantes.')
  const pieces: Piece[] = (Array.isArray(body.pieces) ? body.pieces : [])
    .filter((p): p is Record<string, unknown> => !!p && typeof p === 'object')
    .map((p) => ({ cle: String(p.cle ?? ''), libelle: String(p.libelle ?? ''), statut: String(p.statut ?? '') }))
  return {
    reponses: reponses as Record<string, unknown>,
    pieces,
    profil: body.profil ?? null,
    schema: typeof body.schema === 'string' ? body.schema : null,
  }
}

/** First piece the client says is attached but the server never received. */
async function missingPiece(req: PayloadRequest, d: Dossier, pieces: Piece[]) {
  const recues = await req.payload.find({
    collection: PIECES, where: { dossier: { equals: d.id } }, depth: 0, limit: 200, overrideAccess: true,
  })
  const cles = new Set(recues.docs.map((p) => p.cle))
  return pieces.find((p) => p.statut === 'jointe' && !cles.has(p.cle))
}

export const ouvertureEndpoints: Endpoint[] = [
  {
    // ponytail: no rate limit on anonymous draft creation; add one (IP bucket in payload_kv) if abused.
    path: '/ouverture/dossiers',
    method: 'post',
    handler: async (req) => {
      const jeton = newToken()
      const doc = await req.payload.create({
        collection: DOSSIERS,
        data: { statut: 'brouillon', jetonHash: hashToken(jeton) },
        overrideAccess: true,
      })
      return json({ id: doc.id, jeton }, 201)
    },
  },
  {
    path: '/ouverture/dossiers/:id/pieces/:cle',
    method: 'put',
    handler: async (req) => {
      // On Vercel the local disk is temporary: without the private bucket, files would be lost.
      if (process.env.VERCEL && !process.env.R2_PRIVATE_BUCKET_NAME?.trim())
        return fail(503, 'L’envoi des pièces est momentanément indisponible. Cochez « Je l’apporterai ».')
      const target = await draftPiece(req)
      if (target instanceof Response) return target
      const file = await readFile(req)
      if (file instanceof Response) return file
      const { d, cle } = target
      const saved = await req.payload
        .create({
          collection: PIECES,
          data: { dossier: d.id, cle, sha256: file.hash },
          file: { data: file.data, mimetype: file.mime, name: `${d.id}-${cle.replace(/[^A-Za-z0-9-]/g, '_')}.${file.ext}`, size: file.data.length },
          overrideAccess: true,
        })
        .catch((e) => {
          req.payload.logger.warn({ err: e, dossier: d.id, cle }, 'ouverture: piece refused')
          return null
        })
      if (!saved) return fail(422, 'Ce fichier est illisible. Photographiez de nouveau la pièce, ou joignez un autre PDF.')
      // Save first, then drop the previous file for this key: a failed upload keeps the old one.
      await removePiece(req, d.id, cle, saved.id)
      return json({ nom: file.nom, taille: file.data.length, type: file.mime, sha256: file.hash })
    },
  },
  {
    path: '/ouverture/dossiers/:id/pieces/:cle',
    method: 'delete',
    handler: async (req) => {
      const target = await draftPiece(req)
      if (target instanceof Response) return target
      await removePiece(req, target.d.id, target.cle)
      return json({ ok: true })
    },
  },
  {
    path: '/ouverture/dossiers/:id/envoi',
    method: 'post',
    handler: async (req) => {
      const d = await authorised(req)
      if (d instanceof Response) return d
      if (d.statut !== 'brouillon') return json(etat(d))
      const body = parseEnvoi((await req.text?.()) ?? '')
      if (body instanceof Response) return body
      const manquante = await missingPiece(req, d, body.pieces)
      if (manquante) return fail(409, `La pièce « ${manquante.libelle} » n’a pas été reçue. Joignez-la de nouveau.`)
      const r = body.reponses
      const sent = (await req.payload.update({
        collection: DOSSIERS,
        id: d.id,
        overrideAccess: true,
        showHiddenFields: true,
        data: {
          statut: 'recu',
          reference: newReference(),
          envoyeLe: new Date().toISOString(),
          schemaVersion: body.schema,
          categorie: String(r.cat ?? ''),
          gestion: String(r.gestion ?? ''),
          residence: String(r.residence ?? ''),
          ...contact(r),
          reponses: r,
          profil: body.profil,
          pieces: body.pieces,
        },
      })) as unknown as Dossier
      return json(etat(sent))
    },
  },
  {
    path: '/ouverture/dossiers/:id/etat',
    method: 'get',
    handler: async (req) => {
      const d = await authorised(req)
      return d instanceof Response ? d : json(etat(d))
    },
  },
]
