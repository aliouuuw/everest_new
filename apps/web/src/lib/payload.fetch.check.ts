import assert from 'node:assert/strict'
import {
  fetchNewsFeed,
  fetchPublishedArticles,
  fetchPublishedPublications,
  fetchSiteContent,
  publicationToFile,
} from './payload.ts'

// CMS down must return empty lists, not throw. CMS up still returns arrays.
const news = await fetchNewsFeed(1)
assert.ok(Array.isArray(news))

const pubs = await fetchPublishedPublications(1)
assert.ok(Array.isArray(pubs.docs))

const articles = await fetchPublishedArticles(1)
assert.ok(Array.isArray(articles.docs))

const site = await fetchSiteContent('home')
assert.ok(Array.isArray(site.docs))

const mapped = publicationToFile({
  id: 1,
  title: 'Revue',
  description: 'Desc',
  frequency: 'hebdomadaire',
  status: 'published',
  publishedAt: '2026-04-24T00:00:00.000Z',
  pages: 10,
  file: { url: '/api/media/file/revue.pdf', filesize: 14_000_000 },
})
assert.equal(mapped?.frequency, 'hebdomadaire')
assert.ok(mapped?.fileUrl.includes('/api/media/file/revue.pdf'))
assert.equal(
  publicationToFile({
    id: 2,
    title: 'No file',
    description: 'Desc',
    frequency: 'hebdomadaire',
    status: 'published',
    file: null,
  }),
  null,
)

console.log('payload fetch: lists never throw')
