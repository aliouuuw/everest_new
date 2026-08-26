const payloadUrl = import.meta.env.PAYLOAD_URL || 'http://localhost:3001'

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

export async function fetchPublishedArticles(limit = 10) {
  const params = new URLSearchParams({
    'where[status][equals]': 'published',
    limit: String(limit),
    sort: '-publishedAt',
    depth: '1',
  })

  return fetchPayload<PayloadListResponse<Record<string, unknown>>>(
    `/api/articles?${params.toString()}`,
  )
}
