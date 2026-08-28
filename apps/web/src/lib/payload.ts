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
}

async function fetchList<T>(
  collection: string,
  params: Record<string, string>,
): Promise<PayloadListResponse<T>> {
  const query = new URLSearchParams(params).toString()
  const response = await fetch(`${payloadUrl}/api/${collection}?${query}`)

  if (!response.ok) {
    throw new Error(
      `Payload request failed (${response.status}): ${collection}?${query}`,
    )
  }

  return (await response.json()) as PayloadListResponse<T>
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
  }
}

export function externalToNews(item: ExternalArticle): NewsItem {
  return {
    href: item.url,
    title: item.title,
    excerpt: item.excerpt,
    category: item.category,
    sourceName: item.sourceName,
    publishedAt: item.publishedAt,
    external: true,
  }
}

// ponytail: two list queries, merge in memory. Fine while each side is
// tens of items. Upgrade to a single SQL union if the feed grows past ~200.
export function mergeNews(items: NewsItem[]): NewsItem[] {
  return [...items].sort((a, b) => {
    const timeA = Date.parse(a.publishedAt ?? '') || 0
    const timeB = Date.parse(b.publishedAt ?? '') || 0
    return timeB - timeA
  })
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
