type LexicalTextNode = {
  type: 'text'
  text: string
  format: number
  detail: number
  mode: 'normal'
  style: string
  version: 1
}

type LexicalParagraph = {
  type: 'paragraph'
  children: LexicalTextNode[]
  direction: 'ltr'
  format: string
  indent: number
  version: 1
}

export type LexicalDocument = {
  root: {
    type: 'root'
    children: LexicalParagraph[]
    direction: 'ltr'
    format: string
    indent: number
    version: 1
  }
}

export function decodeEntities(value: string): string {
  return value
    .replace(/&nbsp;/gi, ' ')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&(?:apos|#x27|#39);/gi, "'")
    .replace(/&#(\d+);/g, (_, code: string) =>
      String.fromCharCode(Number.parseInt(code, 10)),
    )
    .replace(/&amp;/gi, '&')
}

function paragraph(text: string): LexicalParagraph {
  const children: LexicalTextNode[] = text
    ? [
        {
          type: 'text',
          text,
          format: 0,
          detail: 0,
          mode: 'normal',
          style: '',
          version: 1,
        },
      ]
    : []

  return { type: 'paragraph', children, direction: 'ltr', format: '', indent: 0, version: 1 }
}

function stripTags(html: string): string {
  return decodeEntities(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim()
}

// ponytail: block-level split only, so bold/links/lists flatten to plain
// paragraphs. Upgrade path is Payload's HTML-to-Lexical converter if editors
// need the original formatting preserved.
export function htmlToLexical(html: string | undefined | null): LexicalDocument {
  const blocks = (html ?? '')
    .split(/<\/p>|<\/h[1-6]>|<br\s*\/?>/i)
    .map(stripTags)
    .filter(Boolean)

  return {
    root: {
      type: 'root',
      children: (blocks.length > 0 ? blocks : ['']).map(paragraph),
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}
