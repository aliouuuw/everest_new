import assert from 'node:assert/strict'
import {
  fetchNewsFeed,
  fetchPublishedArticles,
  fetchPublishedPublications,
  fetchSiteContent,
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

console.log('payload fetch: lists never throw')
