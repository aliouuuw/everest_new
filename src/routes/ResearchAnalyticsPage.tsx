import { getDepartmentBySlug } from '../data/departments'
import { DepartmentPage } from '../components/Sections/DepartmentPage'

export const ResearchAnalyticsPage = () => {
  const department = getDepartmentBySlug('recherche-analyses')
  if (!department) return null

  return <DepartmentPage department={department} />
}
