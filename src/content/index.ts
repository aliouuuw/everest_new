import { HOME_TEXT } from './home'
import { SOCIETE_TEXT } from './societe'

/** Every referential text on the site, keyed by CMS id. */
export const TEXT = { ...HOME_TEXT, ...SOCIETE_TEXT } as const
export type TextId = keyof typeof TEXT
