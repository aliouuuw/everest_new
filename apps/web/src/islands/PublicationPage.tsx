import {
  PublicationView,
  type PublicationViewData,
} from '@/routes/PublicationPage'

type Props = {
  publication: PublicationViewData
}

export default function PublicationPageIsland({ publication }: Props) {
  return <PublicationView publication={publication} />
}
