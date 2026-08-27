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

export async function fetchPayload<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`${payloadUrl}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`Payload request failed (${response.status}): ${path}`)
  }

  return (await response.json()) as T
}

export async function fetchPublishedPublications(limit = 20) {
  const params = new URLSearchParams({
    'where[status][equals]': 'published',
    limit: String(limit),
    sort: '-publishedAt',
    depth: '1',
  })
  return fetchPayload<PayloadListResponse<Publication>>(
    `/api/publications?${params.toString()}`,
  )
}

export async function fetchPublicationBySlug(slug: string) {
  const params = new URLSearchParams({
    'where[slug][equals]': slug,
    'where[status][equals]': 'published',
    limit: '1',
    depth: '1',
  })
  const result = await fetchPayload<PayloadListResponse<Publication>>(
    `/api/publications?${params.toString()}`,
  )
  return result.docs[0] ?? null
}

export async function fetchPublishedArticles(limit = 20) {
  const params = new URLSearchParams({
    'where[status][equals]': 'published',
    limit: String(limit),
    sort: '-publishedAt',
    depth: '1',
  })
  return fetchPayload<PayloadListResponse<Article>>(
    `/api/articles?${params.toString()}`,
  )
}

export async function fetchArticleBySlug(slug: string) {
  const params = new URLSearchParams({
    'where[slug][equals]': slug,
    'where[status][equals]': 'published',
    limit: '1',
    depth: '1',
  })
  const result = await fetchPayload<PayloadListResponse<Article>>(
    `/api/articles?${params.toString()}`,
  )
  return result.docs[0] ?? null
}

export async function fetchSiteContent(pageKey: string) {
  const params = new URLSearchParams({
    'where[pageKey][equals]': pageKey,
    limit: '100',
  })
  return fetchPayload<PayloadListResponse<SiteContent>>(
    `/api/site-content?${params.toString()}`,
  )
}

type LexicalNode = {
  type?: string
  text?: string
  children?: LexicalNode[]
}

export function lexicalToHtml(value: unknown): string {
  if (!value || typeof value !== 'object') return ''
  const root = (value as { root?: LexicalNode }).root
  if (!root?.children) return ''

  const walk = (node: LexicalNode): string => {
    if (node.type === 'text') return escapeHtml(node.text ?? '')
    const inner = (node.children ?? []).map(walk).join('')
    if (node.type === 'paragraph') return `<p>${inner}</p>`
    if (node.type === 'heading') return `<p>${inner}</p>`
    return inner
  }

  return root.children.map(walk).join('')
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
