import assert from 'node:assert/strict'
import { mergeNews, type NewsItem } from './payload.ts'

const item = (
  title: string,
  publishedAt: string | null,
): NewsItem => ({
  href: `/${title}`,
  title,
  excerpt: title,
  category: 'Marchés',
  sourceName: 'Test',
  publishedAt,
  external: false,
})

assert.deepEqual(
  mergeNews([item('old', '2024-01-01'), item('new', '2026-08-01')]).map(
    (row) => row.title,
  ),
  ['new', 'old'],
)

assert.deepEqual(
  mergeNews([item('dated', '2026-01-01'), item('undated', null)]).map(
    (row) => row.title,
  ),
  ['dated', 'undated'],
)

assert.deepEqual(mergeNews([]), [])

console.log('mergeNews: all checks passed')
