import { useMemo, type ReactNode } from 'react'
import {
  CMSContext,
  type CMSContextValue,
  type SiteContentRow,
} from '@/cms/cmsContext'

type PayloadRow = {
  contentId: string
  pageKey: string
  type: string
  value: string
}

type Props = {
  rows: PayloadRow[]
  pageKey?: string
  children: ReactNode
}

const noop = () => {}
const noopAsync = async () => {}

/** Payload-backed CMS context for Astro (no Convex, no edit UI). */
export function StaticCMSProvider({ rows, pageKey, children }: Props) {
  const value = useMemo<CMSContextValue>(() => {
    const overrides: Partial<Record<string, SiteContentRow>> = {}
    for (const row of rows) {
      const type =
        row.type === 'richtext' || row.type === 'image' ? row.type : 'text'
      overrides[row.contentId] = {
        _id: row.contentId,
        contentId: row.contentId,
        pageKey: row.pageKey,
        type,
        value: row.value,
        updatedAt: 0,
      }
    }
    return {
      pageKey: pageKey ?? rows[0]?.pageKey ?? 'home',
      overrides,
      canEdit: false,
      editMode: false,
      panelOpen: false,
      toggleEdit: noop,
      togglePanel: noop,
      closeAll: noop,
      saveContent: noopAsync,
      resetContent: noopAsync,
    }
  }, [rows, pageKey])

  return <CMSContext.Provider value={value}>{children}</CMSContext.Provider>
}
