import {
  ArticleView,
  type ArticleViewData,
  type RelatedArticle,
} from '@/routes/ArticlePage'

type Props = {
  article: ArticleViewData
  related: RelatedArticle[]
}

export default function ArticlePageIsland({ article, related }: Props) {
  return <ArticleView article={article} related={related} />
}
