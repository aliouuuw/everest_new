import { SimulateurView } from '@/routes/SimulateurPage'
import { submitInvestorLead } from '../lib/investorLead'

export default function OutilsInvestisseurPage() {
  return <SimulateurView onSubmitLead={submitInvestorLead} />
}
