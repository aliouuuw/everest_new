import { HOME_TEXT } from './home'
import { SOCIETE_TEXT } from './societe'
import { EXPERTISES_TEXT } from './expertises'
import { ACTUALITES_TEXT, ANALYSES_TEXT } from './analyses'
import { CONTACT_TEXT, OPPORTUNITES_TEXT, SAMA_NAFFA_TEXT } from './relation'

/** Every referential text on the site, keyed by CMS id. */
export const TEXT = { ...HOME_TEXT, ...SOCIETE_TEXT, ...EXPERTISES_TEXT, ...ANALYSES_TEXT, ...ACTUALITES_TEXT, ...OPPORTUNITES_TEXT, ...SAMA_NAFFA_TEXT, ...CONTACT_TEXT } as const
export type TextId = keyof typeof TEXT
