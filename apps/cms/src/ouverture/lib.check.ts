import assert from 'node:assert/strict'
import { contact, hashToken, newReference, newToken, sniffType, tokenMatches, validKey } from './lib'

const t = newToken()
assert.ok(tokenMatches(`Bearer ${t}`, hashToken(t)))
assert.ok(!tokenMatches(`Bearer ${t}x`, hashToken(t)))
assert.ok(!tokenMatches(null, hashToken(t)))
assert.ok(!tokenMatches(`Bearer ${t}`, null))

assert.match(newReference(new Date('2026-11-17')), /^EVF-2026-[0-9A-F]{8}$/)

assert.equal(sniffType(Buffer.from('%PDF-1.7 ...'))?.mime, 'application/pdf')
assert.equal(sniffType(Buffer.from([0xff, 0xd8, 0xff, 0xe0]))?.mime, 'image/jpeg')
assert.equal(sniffType(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0]))?.mime, 'image/png')
assert.equal(sniffType(Buffer.from('\0\0\0\x18ftypheic....', 'latin1'))?.mime, 'image/heic')
assert.equal(sniffType(Buffer.from('<html><script>')), null)

assert.ok(validKey('pp.cni-recto'))
assert.ok(!validKey('../etc/passwd'))

assert.deepEqual(contact({ prenoms: 'Awa', nomNaissance: 'DIOP', courriel: 'a@x.sn', telephone: '+221' }), {
  titulaire: 'Awa DIOP', courriel: 'a@x.sn', telephone: '+221',
})
assert.equal(contact({ cotitulaires: [{ prenoms: 'Awa', nomNaissance: 'DIOP', courriel: 'a@x.sn' }] }).courriel, 'a@x.sn')
assert.equal(contact({ denomination: 'SOCIÉTÉ SA', interCourriel: 'f@x.sn' }).titulaire, 'SOCIÉTÉ SA')
assert.equal(contact({ denomination: 'SOCIÉTÉ SA', interCourriel: 'f@x.sn' }).courriel, 'f@x.sn')
assert.equal(contact({ enfant: { prenoms: 'Khadija', nomNaissance: 'DIOP' }, representants: [{ courriel: 'm@x.sn' }] }).titulaire, 'Khadija DIOP (mineur)')

console.log('ouverture lib: ok')
