import { HOME_TEXT } from './home'
import { SOCIETE_TEXT } from './societe'
import { EXPERTISES_TEXT } from './expertises'

/** Every referential text on the site, keyed by CMS id. */
export const TEXT = { ...HOME_TEXT, ...SOCIETE_TEXT, ...EXPERTISES_TEXT } as const
export type TextId = keyof typeof TEXT
