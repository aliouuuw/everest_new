import assert from 'node:assert/strict'
import { toInvestorLeadBody } from './investorLead.ts'

const valid = {
  firstName: ' Awa ',
  lastName: 'Ndiaye',
  email: 'awa@example.com',
  profileType: 'balanced' as const,
  profileTitle: 'Equilibre',
  riskLevel: 3,
  answers: [{ questionId: 'risk_reaction', value: 2 }],
  source: 'outils-investisseur',
}

const body = toInvestorLeadBody(valid)
assert.equal(body.firstName, 'Awa')
assert.equal(body.profileType, 'balanced')
assert.equal(body.answers.length, 1)

assert.throws(() => toInvestorLeadBody({ ...valid, email: 'nope' }), /Email/)
assert.throws(
  () => toInvestorLeadBody({ ...valid, answers: [] }),
  /Reponses/,
)

console.log('investorLead: validation holds')
