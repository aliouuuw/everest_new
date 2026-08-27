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

function textNode(text: string): LexicalTextNode {
  return {
    type: 'text',
    text,
    format: 0,
    detail: 0,
    mode: 'normal',
    style: '',
    version: 1,
  }
}

function paragraph(text: string): LexicalParagraph {
  return {
    type: 'paragraph',
    children: text ? [textNode(text)] : [],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  }
}

function decodeEntities(value: string): string {
  return value
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'")
}

function stripTags(html: string): string {
  return decodeEntities(html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
}

export function htmlToLexical(html: string | undefined | null): LexicalDocument {
  const source = html ?? ''
  const blocks = source
    .split(/<\/p>|<\/h[1-6]>|<br\s*\/?>/i)
    .map((chunk) => stripTags(chunk))
    .filter(Boolean)

  const children = (blocks.length > 0 ? blocks : ['']).map((block) => paragraph(block))

  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}
