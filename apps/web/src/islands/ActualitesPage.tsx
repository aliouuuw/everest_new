import { ActualitesView, type ActualitesArticle } from '@/routes/ActualitesPage'
import { StaticCMSProvider } from '../cms/StaticCMSProvider'
import { decodeHtmlEntities, type NewsItem, type SiteContent } from '../lib/payload'

type Props = {
  siteContent: SiteContent[]
  news: NewsItem[]
}

function toArticle(item: NewsItem): ActualitesArticle {
  const date = item.publishedAt ? item.publishedAt.slice(0, 10) : ''
  return {
    title: decodeHtmlEntities(item.title),
    excerpt: decodeHtmlEntities(item.excerpt),
    category: item.category,
    date,
    readTime: item.external ? item.sourceName : '3 min',
    imageUrl: item.imageUrl ?? '',
    slug: item.slug ?? undefined,
    href: item.href,
    external: item.external,
    featured: item.featured,
  }
}

export default function ActualitesPageIsland({ siteContent, news }: Props) {
  return (
    <StaticCMSProvider rows={siteContent} pageKey="actualites">
      <ActualitesView articles={news.map(toArticle)} />
    </StaticCMSProvider>
  )
}
