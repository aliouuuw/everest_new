/**
 * End-to-end check of the account-opening intake API, as the form calls it.
 * Usage: bun apps/cms/src/ouverture/endpoints.e2e.ts [base]   (default http://localhost:3001)
 * Writes one draft and one sent file into the target database: run it on a local or test DB.
 */
import assert from 'node:assert/strict'

const base = (process.argv[2] || 'http://localhost:3001') + '/api/ouverture'
// Smallest PDF that Payload's PDF validation accepts.
const PDF = Buffer.from(
  '%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n' +
    '3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 10 10]>>endobj\ntrailer<</Root 1 0 R>>\nstartxref\n0\n%%EOF\n',
)

async function call(method: string, path: string, token?: string, body?: unknown) {
  const headers: Record<string, string> = token ? { authorization: `Bearer ${token}` } : {}
  let payload: BodyInit | undefined
  if (body instanceof FormData) payload = body
  else if (body !== undefined) { headers['content-type'] = 'application/json'; payload = JSON.stringify(body) }
  const r = await fetch(base + path, { method, headers, body: payload })
  return { status: r.status, data: await r.json().catch(() => ({})) }
}
const fileForm = (bytes: Buffer, name: string) => {
  const fd = new FormData(); fd.append('fichier', new Blob([new Uint8Array(bytes)]), name); return fd
}

const created = await call('POST', '/dossiers')
assert.equal(created.status, 201)
const { id, jeton } = created.data as { id: number; jeton: string }

assert.equal((await call('GET', `/dossiers/${id}/etat`, 'wrong')).status, 404, 'bad token is refused')
assert.equal((await call('PUT', `/dossiers/${id}/pieces/pp.cni`, jeton, fileForm(Buffer.from('<html>'), 'x.pdf'))).status, 415, 'fake type is refused')
assert.equal((await call('PUT', `/dossiers/${id}/pieces/pp.cni`, jeton, fileForm(Buffer.from('%PDF-broken'), 'x.pdf'))).status, 422, 'broken PDF is refused')

const up = await call('PUT', `/dossiers/${id}/pieces/pp.cni`, jeton, fileForm(PDF, 'cni.pdf'))
assert.equal(up.status, 200, JSON.stringify(up.data))
assert.equal((up.data as { type: string }).type, 'application/pdf')

const pieces = [{ cle: 'pp.cni', statut: 'jointe', libelle: 'CNI' }, { cle: 'pp.rib', statut: 'jointe', libelle: 'RIB' }]
const reponses = { cat: 'pp', gestion: 'libre', residence: 'sn', prenoms: 'Test', nomNaissance: 'E2E', courriel: 'e2e@exemple.sn' }
assert.equal((await call('POST', `/dossiers/${id}/envoi`, jeton, { reponses, pieces })).status, 409, 'missing piece blocks the send')

pieces[1].statut = 'au rendez-vous'
const sent = await call('POST', `/dossiers/${id}/envoi`, jeton, { schema: 'e2e', reponses, pieces })
assert.equal(sent.status, 200)
assert.match((sent.data as { reference: string }).reference, /^EVF-\d{4}-[0-9A-F]{8}$/)
assert.equal((sent.data as { etape: string }).etape, 'examen')

assert.equal((await call('PUT', `/dossiers/${id}/pieces/pp.rib`, jeton, fileForm(PDF, 'rib.pdf'))).status, 409, 'sent file is locked')
assert.equal((await fetch(base.replace('/ouverture', '/dossiers-ouverture'))).status, 403, 'REST list is staff-only')
assert.equal((await fetch(base.replace('/ouverture', '/pieces-ouverture'))).status, 403, 'documents are staff-only')

console.log(`ouverture e2e: ok (dossier ${id}, ${(sent.data as { reference: string }).reference})`)
