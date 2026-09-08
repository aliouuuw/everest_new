const payloadUrl = process.env.PAYLOAD_URL || 'http://localhost:3001'

export type PayloadListResponse<T> = {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export type Publication = {
  id: number | string
  title: string
  slug: string
  description: string
  excerpt: string
  content: unknown
  category: string
  status: string
  featured: boolean
  publishedAt?: string | null
  seoTitle?: string | null
  seoDescription?: string | null
  readingTime?: number | null
  tags?: string[] | null
  author?: { name?: string | null } | number | null
}

export type Article = {
  id: number | string
  title: string
  slug: string
  excerpt: string
  content: unknown
  imageUrl?: string | null
  category: string
  status: string
  featured: boolean
  publishedAt?: string | null
  tags?: string[] | null
}

export type SiteContent = {
  id: number | string
  contentId: string
  pageKey: string
  type: string
  value: string
}

export type ExternalArticle = {
  id: number | string
  guid: string
  slug?: string | null
  title: string
  excerpt: string
  url: string
  imageUrl: string
  publishedAt: string
  sourceName: string
  category: string
}

export type NewsItem = {
  href: string
  title: string
  excerpt: string
  category: string
  sourceName: string
  publishedAt: string | null
  external: boolean
  imageUrl?: string | null
  slug?: string | null
  featured?: boolean
}

function emptyList<T>(): PayloadListResponse<T> {
  return {
    docs: [],
    totalDocs: 0,
    limit: 0,
    totalPages: 0,
    page: 1,
    pagingCounter: 0,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null,
  }
}

async function fetchList<T>(
  collection: string,
  params: Record<string, string>,
): Promise<PayloadListResponse<T>> {
  const query = new URLSearchParams(params).toString()
  const url = `${payloadUrl}/api/${collection}?${query}`
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(8_000),
    })
    if (!response.ok) {
      console.error(`Payload ${response.status} for ${collection} at ${payloadUrl}`)
      return emptyList()
    }
    return (await response.json()) as PayloadListResponse<T>
  } catch (error) {
    // ponytail: empty list so public pages stay up when CMS is down.
    // Static builds also succeed empty — add a CI ping to /api if you need a hard gate.
    const reason =
      error instanceof Error ? (error.cause ?? error.message) : error
    console.error(`Payload unreachable (${collection} at ${payloadUrl}):`, reason)
    return emptyList()
  }
}

const publishedList = (limit: number) => ({
  'where[status][equals]': 'published',
  limit: String(limit),
  sort: '-publishedAt',
  depth: '1',
})

export const fetchPublishedPublications = (limit = 20) =>
  fetchList<Publication>('publications', publishedList(limit))

export const fetchPublishedArticles = (limit = 20) =>
  fetchList<Article>('articles', publishedList(limit))

export const fetchSiteContent = (pageKey: string) =>
  fetchList<SiteContent>('site-content', {
    'where[pageKey][equals]': pageKey,
    limit: '100',
  })

export const fetchExternalArticles = (limit = 20) =>
  fetchList<ExternalArticle>('external-articles', {
    limit: String(limit),
    sort: '-publishedAt',
  })

export function articleToNews(article: Article): NewsItem {
  return {
    href: `/actualites/${article.slug}`,
    title: article.title,
    excerpt: article.excerpt,
    category: article.category,
    sourceName: 'Everest Finance',
    publishedAt: article.publishedAt ?? null,
    external: false,
    imageUrl: article.imageUrl,
    slug: article.slug,
    featured: article.featured,
  }
}

export function externalToNews(item: ExternalArticle): NewsItem {
  return {
    href: item.slug ? `/actualites/${item.slug}` : item.url,
    title: item.title,
    excerpt: item.excerpt,
    category: item.category,
    sourceName: item.sourceName,
    publishedAt: item.publishedAt,
    external: true,
    imageUrl: item.imageUrl,
    slug: item.slug,
  }
}

// ponytail: two list queries, merge in memory. Fine while each side is
// tens of items. Upgrade to a single SQL union if the feed grows past ~200.
export function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&Agrave;/g, 'À')
    .replace(/&agrave;/g, 'à')
    .replace(/&Eacute;/g, 'É')
    .replace(/&eacute;/g, 'é')
    .replace(/&Ecirc;/g, 'Ê')
    .replace(/&ecirc;/g, 'ê')
    .replace(/&Ouml;/g, 'Ö')
    .replace(/&ouml;/g, 'ö')
    .replace(/&Uuml;/g, 'Ü')
    .replace(/&uuml;/g, 'ü')
    .replace(/&Ccedil;/g, 'Ç')
    .replace(/&ccedil;/g, 'ç')
}

export function mergeNews(items: NewsItem[]): NewsItem[] {
  return [...items].sort((a, b) => {
    const timeA = Date.parse(a.publishedAt ?? '') || 0
    const timeB = Date.parse(b.publishedAt ?? '') || 0
    return timeB - timeA
  })
}

export function publicationToView(publication: Publication) {
  const html = lexicalToHtml(publication.content)
  const words = html.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length
  const author =
    publication.author && typeof publication.author === 'object'
      ? publication.author.name ?? undefined
      : undefined
  return {
    title: decodeHtmlEntities(publication.title),
    description: decodeHtmlEntities(publication.description || publication.excerpt),
    category: publication.category,
    featured: Boolean(publication.featured),
    date: publication.publishedAt ?? '',
    authorName: author,
    readingTime: publication.readingTime ?? Math.max(1, Math.ceil(words / 200)),
    tags: publication.tags ?? [],
    content: html,
  }
}

export function articleToView(article: Article) {
  const html = lexicalToHtml(article.content)
  const words = html.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length
  return {
    title: decodeHtmlEntities(article.title),
    excerpt: decodeHtmlEntities(article.excerpt),
    category: article.category,
    date: (article.publishedAt ?? '').slice(0, 10),
    readTime: `${Math.max(1, Math.ceil(words / 200))} min`,
    imageUrl: article.imageUrl ?? '',
    content: html,
  }
}

import { stripLeadingArticleImage } from '@/utils/articleContent'

export function externalArticleToView(article: ExternalArticle) {
  const raw = article.content ?? `<p>${article.excerpt}</p>`
  const content = stripLeadingArticleImage(raw, article.imageUrl)
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length
  return {
    title: decodeHtmlEntities(article.title),
    excerpt: decodeHtmlEntities(article.excerpt),
    category: article.category,
    date: article.publishedAt.slice(0, 10),
    readTime: `${Math.max(1, Math.ceil(words / 200))} min`,
    imageUrl: article.imageUrl,
    content,
    source: article.sourceName,
    sourceUrl: article.url,
  }
}

export async function fetchNewsFeed(eachLimit = 50): Promise<NewsItem[]> {
  const [articles, externals] = await Promise.all([
    fetchPublishedArticles(eachLimit),
    fetchExternalArticles(eachLimit),
  ])
  return mergeNews([
    ...articles.docs.map(articleToNews),
    ...externals.docs.map(externalToNews),
  ])
}

type LexicalNode = {
  type?: string
  tag?: string
  text?: string
  children?: LexicalNode[]
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const headingTags = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])

function renderNode(node: LexicalNode): string {
  if (node.type === 'text') return escapeHtml(node.text ?? '')
  if (node.type === 'linebreak') return '<br />'

  const inner = (node.children ?? []).map(renderNode).join('')
  if (node.type === 'paragraph') return `<p>${inner}</p>`
  if (node.type === 'heading') {
    const tag = headingTags.has(node.tag ?? '') ? node.tag : 'h2'
    return `<${tag}>${inner}</${tag}>`
  }
  return inner
}

// ponytail: handles the node types our content actually uses. Swap in
// @payloadcms/richtext-lexical's convertLexicalToHTML if editors start using
// lists, tables, or uploads.
export function lexicalToHtml(value: unknown): string {
  const root = (value as { root?: LexicalNode } | null)?.root
  if (!root?.children) return ''
  return root.children.map(renderNode).join('')
}
