/**
 * Self-check for the Convex HTML -> Lexical conversion. Run: bun run check:seed
 * These assertions are the gate on imported content: if tag stripping or entity
 * decoding regresses, imported markup leaks into the static site.
 */
import assert from 'node:assert/strict'
import { decodeEntities, htmlToLexical } from './htmlToLexical.js'

const paragraphs = (html: string | null) =>
  htmlToLexical(html).root.children.map(
    (block) => block.children[0]?.text ?? '',
  )

// Block elements become separate paragraphs.
assert.deepEqual(paragraphs('<p>One</p><p>Two</p>'), ['One', 'Two'])
assert.deepEqual(paragraphs('<h2>Title</h2><p>Body</p>'), ['Title', 'Body'])
assert.deepEqual(paragraphs('a<br />b'), ['a', 'b'])

// Markup is stripped, never carried through as text.
assert.deepEqual(paragraphs('<p>Hi <strong>there</strong></p>'), ['Hi there'])
assert.deepEqual(paragraphs('<p><script>alert(1)</script>safe</p>'), [
  'alert(1) safe',
])

// Empty input still yields a valid single-paragraph document.
assert.deepEqual(paragraphs(''), [''])
assert.deepEqual(paragraphs(null), [''])

// &amp; decodes last, so an escaped entity stays escaped instead of
// double-decoding into a real tag.
assert.equal(decodeEntities('&amp;lt;script&amp;gt;'), '&lt;script&gt;')
assert.equal(decodeEntities('Caf&#233; &nbsp;&amp; co'), 'Café  & co')
assert.equal(decodeEntities('&quot;a&#39;b&quot;'), '"a\'b"')

// Non-breaking spaces collapse instead of surviving as runs of whitespace.
assert.deepEqual(paragraphs('<p>a&nbsp;&nbsp;&nbsp;b</p>'), ['a b'])

console.log('htmlToLexical: all checks passed')
