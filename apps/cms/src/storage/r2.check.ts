import assert from 'node:assert/strict'
import { r2ConfigFromEnv, r2FileUrl, r2StoragePlugins } from './r2.ts'

assert.equal(r2ConfigFromEnv({}), null)
assert.equal(
  r2ConfigFromEnv({
    R2_ACCOUNT_ID: 'acct',
    R2_ACCESS_KEY_ID: 'key',
    R2_SECRET_ACCESS_KEY: 'secret',
    R2_BUCKET_NAME: 'everest-media',
  }),
  null,
)

const ready = r2ConfigFromEnv({
  R2_ACCOUNT_ID: 'acct',
  R2_ACCESS_KEY_ID: 'key',
  R2_SECRET_ACCESS_KEY: 'secret',
  R2_BUCKET_NAME: 'everest-media',
  R2_PUBLIC_URL: 'https://cdn.example.com/',
})
assert.ok(ready)
assert.equal(ready.endpoint, 'https://acct.r2.cloudflarestorage.com')
assert.equal(ready.publicUrl, 'https://cdn.example.com')
assert.equal(r2FileUrl(ready.publicUrl, 'Revue-Hebdo-32.pdf'), 'https://cdn.example.com/Revue-Hebdo-32.pdf')
assert.equal(
  r2FileUrl(ready.publicUrl, 'Revue-Hebdo-32.pdf', 'media'),
  'https://cdn.example.com/media/Revue-Hebdo-32.pdf',
)

assert.equal(r2StoragePlugins({}).length, 0)
assert.equal(
  r2StoragePlugins({
    R2_ACCOUNT_ID: 'acct',
    R2_ACCESS_KEY_ID: 'key',
    R2_SECRET_ACCESS_KEY: 'secret',
    R2_BUCKET_NAME: 'everest-media',
    R2_PUBLIC_URL: 'https://cdn.example.com',
  }).length,
  1,
)

console.log('r2 storage: env gate and public URLs hold')
