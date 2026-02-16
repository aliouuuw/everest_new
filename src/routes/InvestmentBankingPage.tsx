import { getDepartmentBySlug } from '../data/departments'
import { DepartmentPage } from '../components/Sections/DepartmentPage'

export const InvestmentBankingPage = () => {
  const department = getDepartmentBySlug('ingenieurie-financiere')
  if (!department) return null

  return <DepartmentPage department={department} />
}
