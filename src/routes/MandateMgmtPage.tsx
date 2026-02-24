import { getDepartmentBySlug } from '../data/departments'
import { DepartmentPage } from '../components/Sections/DepartmentPage'

export const MandateMgmtPage = () => {
  const department = getDepartmentBySlug('gestion-sous-mandat')
  if (!department) return null

  return <DepartmentPage department={department} />
}
