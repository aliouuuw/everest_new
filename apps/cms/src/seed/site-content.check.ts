import assert from 'node:assert/strict'
import { registry, registryIds } from '../../../../src/cms/registry.ts'
import { SITE_CONTENT_DEFAULTS } from './site-content-defaults.ts'

for (const id of registryIds) {
  const value = SITE_CONTENT_DEFAULTS[id]
  assert.ok(typeof value === 'string' && value.length > 0, `missing default: ${id}`)
}

const extra = Object.keys(SITE_CONTENT_DEFAULTS).filter((id) => !registryIds.has(id))
assert.deepEqual(extra, [], `defaults not in registry: ${extra.join(', ')}`)

const partners = JSON.parse(SITE_CONTENT_DEFAULTS['home.trust.partners']) as unknown
assert.ok(Array.isArray(partners) && partners.length > 0)

const registryCount = Object.values(registry).reduce((n, entries) => n + entries.length, 0)
assert.equal(Object.keys(SITE_CONTENT_DEFAULTS).length, registryCount)

console.log(`site-content defaults: ${registryCount} keys match the registry`)
