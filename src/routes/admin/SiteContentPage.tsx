import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { useMutation, useQuery } from 'convex/react'
import { FiExternalLink } from 'react-icons/fi'
import { api } from '../../../convex/_generated/api'
import EnhancedRichTextEditor from '../../components/CMS/Shared/EnhancedRichTextEditor'
import { TrustPartnersEditor } from '../../cms/TrustPartnersEditor'
import {
  MAX_VALUE_LENGTH,
  PAGE_KEYS,
  PAGE_KEY_LABELS,
  PAGE_KEY_PREVIEW_PATH,
  registry,
} from '../../cms/registry'
import { useR2Upload } from '../../hooks/useR2Upload'
import type { PageKey, RegistryEntry } from '../../cms/registry'
import type { SiteContentRow } from '../../cms/CMSProvider'

interface FieldState {
  value: string
  saving: boolean
  error?: string
  status?: 'saved' | 'reset'
}

function AdminImageFieldEditor({
  value,
  onChange,
  disabled,
}: {
  value: string
  onChange: (url: string) => void
  disabled?: boolean
}) {
  const { upload, isUploading, error: uploadError } = useR2Upload()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const { publicUrl } = await upload(file, 'cms-images')
      onChange(publicUrl)
    } catch {
      // error visible via uploadError
    } finally {
      e.target.value = ''
    }
  }

  return (
    <div className="space-y-3">
      {value ? (
        <div className="overflow-hidden rounded-xl border border-[var(--mauve-10)] bg-[var(--command-surface)]">
          <img
            src={value}
            alt="Aperçu"
            className="max-h-64 w-full object-contain"
          />
        </div>
      ) : (
        <div className="flex min-h-32 items-center justify-center rounded-xl border border-dashed border-[var(--mauve-20)] bg-[var(--white-smoke)]/60 px-4 py-8 text-center text-sm text-[var(--night-40)]">
          Aucune image personnalisée
        </div>
      )}

      <label className="sr-only" htmlFor="site-content-image-url">
        URL de l'image
      </label>
      <input
        id="site-content-image-url"
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="/image.jpg ou URL publique"
        disabled={disabled}
        className="font-primary w-full rounded-xl border border-[var(--mauve-15)] bg-[var(--pure-white)] px-3 py-2.5 text-sm leading-relaxed text-[var(--night)] placeholder:text-[var(--night-20)] transition-colors focus:border-[var(--mauve)] focus:outline-none focus:ring-2 focus:ring-[var(--mauve-20)] disabled:cursor-not-allowed disabled:opacity-40"
      />

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
        disabled={disabled || isUploading}
      />
      <button
        type="button"
        disabled={disabled || isUploading}
        onClick={() => inputRef.current?.click()}
        className="inline-flex min-h-10 items-center justify-center rounded-full border border-[var(--mauve-20)] bg-[var(--pure-white)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--mauve)] transition-all hover:border-[var(--mauve)] hover:bg-[var(--mauve-05)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isUploading
          ? 'Téléversement…'
          : value
            ? "Changer l'image"
            : 'Ajouter une image'}
      </button>

      {uploadError && (
        <p className="text-[11px] text-[color-mix(in_srgb,var(--mauve)_85%,#000)]">
          {uploadError}
        </p>
      )}
    </div>
  )
}

/**
 * Admin marketing copy editor: same Convex `siteContent` API as the public
 * floating panel, with page picker, filter, larger fields, and preview link.
 */
export function SiteContentPage() {
  const [pageKey, setPageKey] = useState<PageKey>('home')
  const [filter, setFilter] = useState('')

  const rows = useQuery(api.siteContent.getByPage, { pageKey })
  const upsert = useMutation(api.siteContent.upsert)
  const remove = useMutation(api.siteContent.remove)

  const overrides = useMemo(() => {
    const map: Partial<Record<string, SiteContentRow>> = {}
    if (!rows) return map
    for (const row of rows as Array<SiteContentRow>) {
      map[row.contentId] = row
    }
    return map
  }, [rows])

  const entries = useMemo(() => registry[pageKey], [pageKey])
  const filteredEntries = useMemo(() => {
    const q = filter.trim().toLowerCase()
    if (!q) return entries
    return entries.filter(
      (e) =>
        e.id.toLowerCase().includes(q) ||
        e.label.toLowerCase().includes(q) ||
        e.section.toLowerCase().includes(q),
    )
  }, [entries, filter])

  const sections = useMemo(() => {
    return filteredEntries.reduce<Record<string, Array<RegistryEntry>>>(
      (acc, entry) => {
        const section = entry.section
        if (!Object.hasOwn(acc, section)) {
          acc[section] = []
        }
        acc[section].push(entry)
        return acc
      },
      {},
    )
  }, [filteredEntries])

  const [state, setState] = useState<Partial<Record<string, FieldState>>>({})

  useEffect(() => {
    const next: Partial<Record<string, FieldState>> = {}
    for (const entry of entries) {
      const row = overrides[entry.id]
      next[entry.id] = {
        value: row !== undefined ? row.value : '',
        saving: false,
      }
    }
    setState(next)
  }, [pageKey, entries, overrides])

  const previewPath = PAGE_KEY_PREVIEW_PATH[pageKey]

  const handleChange = (id: string, value: string) => {
    setState((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] ?? { saving: false, value: '' }),
        value,
        error: undefined,
        status: undefined,
      },
    }))
  }

  const handleSave = async (entry: RegistryEntry) => {
    const current = state[entry.id]
    if (current === undefined) return
    setState((prev) => ({
      ...prev,
      [entry.id]: {
        ...current,
        saving: true,
        error: undefined,
        status: undefined,
      },
    }))
    try {
      await upsert({
        contentId: entry.id,
        pageKey,
        type: entry.type,
        value: current.value,
      })
      setState((prev) => {
        const prevField = prev[entry.id]
        if (prevField === undefined) return prev
        return {
          ...prev,
          [entry.id]: { ...prevField, saving: false, status: 'saved' },
        }
      })
    } catch (err) {
      setState((prev) => {
        const prevField = prev[entry.id]
        if (prevField === undefined) return prev
        return {
          ...prev,
          [entry.id]: {
            ...prevField,
            saving: false,
            error:
              err instanceof Error ? err.message : 'Échec de l’enregistrement',
          },
        }
      })
    }
  }

  const handleReset = async (entry: RegistryEntry) => {
    const current = state[entry.id]
    setState((prev) => ({
      ...prev,
      [entry.id]: {
        ...(current !== undefined ? current : { value: '', saving: false }),
        saving: true,
        error: undefined,
        status: undefined,
      },
    }))
    try {
      await remove({ contentId: entry.id })
      setState((prev) => ({
        ...prev,
        [entry.id]: { value: '', saving: false, status: 'reset' },
      }))
    } catch (err) {
      setState((prev) => {
        const prevField = prev[entry.id]
        return {
          ...prev,
          [entry.id]: {
            ...(prevField ?? { value: '', saving: false }),
            saving: false,
            error:
              err instanceof Error
                ? err.message
                : 'Échec de la réinitialisation',
          },
        }
      })
    }
  }

  const fieldCount = entries.length
  const overrideCount = entries.filter(
    (e) => overrides[e.id] !== undefined,
  ).length

  return (
    <div className="space-y-6">
      <div className="border-b border-[var(--jaune-or)]/10 pb-4">
        <h1 className="font-display-aptos text-2xl font-semibold text-[var(--night)] sm:text-3xl">
          Contenu marketing
        </h1>
        <p className="mt-2 max-w-2xl text-base text-[var(--night-60)]">
          Textes publics (pages vitrine). Les changements sont visibles sur le
          site dès enregistrement. Les IDs sont contrôlés par le registre —
          seuls les champs listés peuvent être sauvegardés.
        </p>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-[var(--night)]/10 bg-white/80 p-4 shadow-sm sm:flex-row sm:flex-wrap sm:items-end">
        <div className="min-w-[200px] flex-1">
          <label
            htmlFor="site-content-page"
            className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[var(--night-60)]"
          >
            Page
          </label>
          <select
            id="site-content-page"
            value={pageKey}
            onChange={(e) => setPageKey(e.target.value as PageKey)}
            className="w-full rounded-xl border border-[var(--night)]/15 bg-[var(--pure-white)] px-3 py-2.5 font-primary text-sm text-[var(--night)] outline-none focus:border-[var(--mauve)] focus:ring-2 focus:ring-[var(--mauve-20)]"
          >
            {PAGE_KEYS.map((key) => (
              <option key={key} value={key}>
                {PAGE_KEY_LABELS[key]}
                {registry[key].length === 0 ? ' (aucun champ)' : ''}
              </option>
            ))}
          </select>
        </div>
        <div className="min-w-[200px] flex-1">
          <label
            htmlFor="site-content-filter"
            className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[var(--night-60)]"
          >
            Filtrer les champs
          </label>
          <input
            id="site-content-filter"
            type="search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Label, section ou ID…"
            className="w-full rounded-xl border border-[var(--night)]/15 bg-[var(--pure-white)] px-3 py-2.5 font-primary text-sm text-[var(--night)] outline-none placeholder:text-[var(--night-20)] focus:border-[var(--mauve)] focus:ring-2 focus:ring-[var(--mauve-20)]"
          />
        </div>
        <Link
          to={previewPath}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--mauve-20)] px-4 py-2.5 text-xs font-bold uppercase tracking-[0.1em] text-[var(--mauve)] transition-colors hover:bg-[var(--mauve-05)]"
        >
          Voir sur le site
          <FiExternalLink className="text-sm" aria-hidden />
        </Link>
      </div>

      <div className="rounded-xl border border-[var(--jaune-or)]/20 bg-[var(--jaune-or)]/5 px-4 py-3 text-sm text-[var(--night-60)]">
        <span className="font-semibold text-[var(--night)]">{fieldCount}</span>{' '}
        champ(s) sur cette page ·{' '}
        <span className="font-semibold text-[var(--night)]">
          {overrideCount}
        </span>{' '}
        surcharge(s) en base · max. {MAX_VALUE_LENGTH} caractères par champ
      </div>

      {entries.length === 0 && (
        <p className="rounded-xl border border-dashed border-[var(--night)]/15 bg-[var(--white-smoke)]/50 p-6 text-sm text-[var(--night-60)]">
          Aucun champ éditable n’est enregistré pour cette page. Ajoutez des
          entrées dans{' '}
          <code className="rounded bg-[var(--mauve-05)] px-1.5 py-0.5 font-mono text-xs text-[var(--night-80)]">
            src/cms/registry.ts
          </code>
          .
        </p>
      )}

      {entries.length > 0 && filteredEntries.length === 0 && (
        <p className="text-sm text-[var(--night-60)]">
          Aucun champ ne correspond au filtre.
        </p>
      )}

      <div className="space-y-8">
        {Object.entries(sections).map(([section, sectionEntries]) => (
          <details
            key={section}
            open
            className="group rounded-2xl border border-[var(--night)]/10 bg-white/90 shadow-sm"
          >
            <summary className="cursor-pointer list-none rounded-t-2xl border-b border-[var(--night)]/5 bg-[var(--summit-ivory)] px-4 py-3 font-primary text-xs font-bold uppercase tracking-[0.18em] text-[var(--night-80)] marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-2">
                {section}
                <span className="text-[10px] font-normal normal-case tracking-normal text-[var(--night-40)]">
                  {sectionEntries.length} champ(s)
                </span>
              </span>
            </summary>
            <div className="space-y-4 p-4">
              {sectionEntries.map((entry) => {
                const rawField = state[entry.id]
                const field =
                  rawField !== undefined
                    ? rawField
                    : { value: '', saving: false }
                const override = overrides[entry.id]
                const overrideValue =
                  override !== undefined ? override.value : ''
                const dirty = overrideValue !== field.value
                const lines = Math.min(
                  14,
                  Math.max(5, field.value.split('\n').length + 2),
                )

                return (
                  <div
                    key={entry.id}
                    className="rounded-xl border border-[var(--mauve-10)] bg-[var(--pure-white)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]"
                  >
                    <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <label className="font-primary text-sm font-semibold text-[var(--night-80)]">
                          {entry.label}
                        </label>
                        <div className="mt-0.5 break-all font-mono text-[10px] leading-snug text-[var(--night-20)]">
                          {entry.id}
                        </div>
                      </div>
                      <span className="text-[10px] text-[var(--night-40)]">
                        {field.value.length} / {MAX_VALUE_LENGTH}
                      </span>
                    </div>
                    {entry.id === 'home.trust.partners' ? (
                      <TrustPartnersEditor
                        value={field.value}
                        onChange={(json) => handleChange(entry.id, json)}
                        disabled={field.saving}
                      />
                    ) : entry.type === 'image' ? (
                      <AdminImageFieldEditor
                        value={field.value}
                        onChange={(url) => handleChange(entry.id, url)}
                        disabled={field.saving}
                      />
                    ) : entry.type === 'richtext' ? (
                      <EnhancedRichTextEditor
                        value={field.value}
                        onChange={(value) => handleChange(entry.id, value)}
                        placeholder={
                          override !== undefined
                            ? ''
                            : '(aucune surcharge — texte du code affiché sur le site)'
                        }
                        className="min-h-[14rem] w-full"
                      />
                    ) : (
                      <textarea
                        value={field.value}
                        maxLength={MAX_VALUE_LENGTH}
                        onChange={(e) => handleChange(entry.id, e.target.value)}
                        placeholder={
                          override !== undefined
                            ? ''
                            : '(aucune surcharge — texte du code affiché sur le site)'
                        }
                        rows={lines}
                        className="font-primary w-full resize-y rounded-xl border border-[var(--mauve-15)] bg-[var(--pure-white)] px-3 py-2.5 text-sm leading-relaxed text-[var(--night)] placeholder:text-[var(--night-20)] transition-colors focus:border-[var(--mauve)] focus:outline-none focus:ring-2 focus:ring-[var(--mauve-20)]"
                      />
                    )}
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                      <div className="min-h-[1.25rem] text-[11px] text-[var(--night-60)]">
                        {field.error && (
                          <span className="text-[color-mix(in_srgb,var(--mauve)_85%,#000)]">
                            {field.error}
                          </span>
                        )}
                        {!field.error && field.status === 'saved' && (
                          <span className="font-semibold text-[var(--jaune-or)]">
                            Enregistré
                          </span>
                        )}
                        {!field.error && field.status === 'reset' && (
                          <span className="text-[var(--mauve-60)]">
                            Réinitialisé (texte par défaut)
                          </span>
                        )}
                        {!field.error && !field.status && dirty && (
                          <span>Modifications non enregistrées</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleReset(entry)}
                          disabled={field.saving || override === undefined}
                          className="rounded-full border border-[var(--jaune-or)]/30 bg-[var(--pure-white)] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--night-80)] transition-all hover:border-[var(--jaune-or)] hover:bg-[var(--jaune-or)] hover:text-[var(--pure-white)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[var(--jaune-or)]/30 disabled:hover:bg-[var(--pure-white)] disabled:hover:text-[var(--night-80)]"
                        >
                          Réinitialiser
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSave(entry)}
                          disabled={field.saving || !dirty}
                          className="rounded-full border-0 bg-[var(--jaune-or)] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--pure-white)] shadow-[0_4px_16px_rgba(202,148,47,0.28)] transition-all hover:-translate-y-0.5 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                        >
                          {field.saving ? 'Enregistrement…' : 'Enregistrer'}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
