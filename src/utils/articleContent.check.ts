import assert from 'node:assert/strict'
import { stripLeadingArticleImage } from './articleContent.ts'

const html =
  '<p><img src="https://example.com/a.jpg" alt="" width="600" /></p><p>Body text.</p>'

assert.equal(
  stripLeadingArticleImage(html, 'https://example.com/a.jpg'),
  '<p>Body text.</p>',
)

assert.equal(stripLeadingArticleImage('<p>Only text</p>', 'https://example.com/a.jpg'), '<p>Only text</p>')

console.log('stripLeadingArticleImage: ok')
