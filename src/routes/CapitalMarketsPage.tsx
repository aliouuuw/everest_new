import { getDepartmentBySlug } from '../data/departments'
import { DepartmentPage } from '../components/Sections/DepartmentPage'

export const CapitalMarketsPage = () => {
  const department = getDepartmentBySlug('marche-capitaux')
  if (!department) return null

  return <DepartmentPage department={department} />
}
