import { useEffect, useRef, useState } from 'react'
import { FiArrowDown, FiArrowUp, FiPlus, FiX } from 'react-icons/fi'
import {
  DEFAULT_TRUST_PARTNERS,
  parseTrustPartnerDrafts,
} from '../content/trustPartners'
import { useR2Upload } from '../hooks/useR2Upload'
import type { TrustPartner } from '../content/trustPartners'

interface TrustPartnersEditorProps {
  value: string
  onChange: (json: string) => void
  disabled?: boolean
}

export function TrustPartnersEditor({
  value,
  onChange,
  disabled,
}: TrustPartnersEditorProps) {
  const { upload, error: uploadError } = useR2Upload()
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])
  const [partners, setPartners] = useState<Array<TrustPartner>>([])
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null)
  const isUsingDefault = value.trim().length === 0
  const readyCount = partners.filter(
    (partner) => partner.name.trim() && partner.logo.trim(),
  ).length

  useEffect(() => {
    setPartners(parseTrustPartnerDrafts(value) ?? DEFAULT_TRUST_PARTNERS)
  }, [value])

  const updatePartners = (newPartners: Array<TrustPartner>) => {
    setPartners(newPartners)
    onChange(JSON.stringify(newPartners))
  }

  const handleAdd = () => {
    updatePartners([...partners, { name: '', logo: '' }])
  }

  const handleRemove = (index: number) => {
    updatePartners(partners.filter((_, i) => i !== index))
  }

  const handleMoveUp = (index: number) => {
    if (index === 0) return
    const newPartners = [...partners]
    ;[newPartners[index - 1], newPartners[index]] = [
      newPartners[index],
      newPartners[index - 1],
    ]
    updatePartners(newPartners)
  }

  const handleMoveDown = (index: number) => {
    if (index === partners.length - 1) return
    const newPartners = [...partners]
    ;[newPartners[index], newPartners[index + 1]] = [
      newPartners[index + 1],
      newPartners[index],
    ]
    updatePartners(newPartners)
  }

  const handleNameChange = (index: number, name: string) => {
    const newPartners = [...partners]
    newPartners[index] = { ...newPartners[index], name }
    updatePartners(newPartners)
  }

  const handleLogoChange = (index: number, logo: string) => {
    const newPartners = [...partners]
    newPartners[index] = { ...newPartners[index], logo }
    updatePartners(newPartners)
  }

  const handleLogoUpload = async (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      setUploadingIndex(index)
      const { publicUrl } = await upload(file, 'cms-images')
      const newPartners = [...partners]
      newPartners[index] = { ...newPartners[index], logo: publicUrl }
      updatePartners(newPartners)
    } catch {
      // error visible via uploadError
    } finally {
      setUploadingIndex(null)
      e.target.value = ''
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-[var(--mauve-10)] bg-[var(--mauve-05)] px-3 py-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-primary text-xs font-semibold uppercase tracking-[0.12em] text-[var(--mauve)]">
            {partners.length} partenaire{partners.length > 1 ? 's' : ''}
          </p>
          <span className="rounded-full bg-[var(--pure-white)] px-2.5 py-1 text-[11px] font-semibold text-[var(--night-60)]">
            {readyCount} prêt{readyCount > 1 ? 's' : ''}
          </span>
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-[var(--night-60)]">
          {isUsingDefault
            ? 'Liste par défaut affichée. Toute modification créera une version éditable.'
            : 'Liste personnalisée enregistrable pour la bande de partenaires.'}
        </p>
      </div>

      {uploadError && (
        <p className="font-primary text-[11px] text-[color-mix(in_srgb,var(--mauve)_85%,#000)]">
          {uploadError}
        </p>
      )}

      {partners.length === 0 && (
        <div className="rounded-xl border border-dashed border-[var(--mauve-20)] bg-[var(--command-surface)] px-4 py-5 text-center">
          <p className="font-primary text-sm font-semibold text-[var(--mauve)]">
            Aucun partenaire dans la liste
          </p>
          <p className="mt-1 text-xs leading-relaxed text-[var(--night-60)]">
            Ajoutez un partenaire, puis renseignez son nom et son logo.
          </p>
        </div>
      )}

      {partners.map((partner, index) => (
        <div
          key={index}
          className="rounded-xl border border-[var(--mauve-10)] bg-[var(--command-surface)] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
        >
          <div className="grid gap-3 sm:grid-cols-[96px_minmax(0,1fr)]">
            <div className="flex h-20 items-center justify-center rounded-lg border border-[var(--mauve-10)] bg-[var(--pure-white)] px-3">
              {partner.logo ? (
                <img
                  src={partner.logo}
                  alt={partner.name || 'Logo partenaire'}
                  className="max-h-12 max-w-full object-contain"
                />
              ) : (
                <span className="font-primary text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--mauve-40)]">
                  Logo
                </span>
              )}
            </div>

            <div className="min-w-0 space-y-2">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--mauve)] text-xs font-bold text-[var(--pure-white)]">
                  {index + 1}
                </span>
                <label className="sr-only" htmlFor={`partner-name-${index}`}>
                  Nom du partenaire
                </label>
                <input
                  id={`partner-name-${index}`}
                  type="text"
                  value={partner.name}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  placeholder="Nom du partenaire"
                  disabled={disabled}
                  className="font-primary min-w-0 flex-1 rounded-lg border border-[var(--mauve-20)] bg-[var(--pure-white)] px-3 py-2 text-sm text-[var(--night)] placeholder:text-[var(--mauve-40)] focus:outline-none focus:ring-2 focus:ring-[var(--mauve-30)] disabled:cursor-not-allowed disabled:opacity-40"
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="sr-only" htmlFor={`partner-logo-${index}`}>
                  URL du logo
                </label>
                <input
                  id={`partner-logo-${index}`}
                  type="url"
                  value={partner.logo}
                  onChange={(e) => handleLogoChange(index, e.target.value)}
                  placeholder="/partners/logo.jpg ou URL du logo"
                  disabled={disabled}
                  className="font-primary min-w-0 flex-1 rounded-lg border border-[var(--mauve-20)] bg-[var(--pure-white)] px-3 py-2 text-xs text-[var(--night)] placeholder:text-[var(--mauve-40)] focus:outline-none focus:ring-2 focus:ring-[var(--mauve-30)] disabled:cursor-not-allowed disabled:opacity-40"
                />
                <input
                  ref={(node) => {
                    inputRefs.current[index] = node
                  }}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleLogoUpload(index, e)}
                  disabled={disabled || uploadingIndex !== null}
                />
                <button
                  type="button"
                  disabled={disabled || uploadingIndex !== null}
                  onClick={() => inputRefs.current[index]?.click()}
                  className="font-primary inline-flex min-h-10 shrink-0 items-center justify-center rounded-lg border border-[var(--mauve-20)] bg-[var(--pure-white)] px-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--mauve)] transition-all duration-300 hover:border-[var(--mauve)] hover:bg-[var(--mauve-05)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mauve-30)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {uploadingIndex === index ? '...' : 'Upload'}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between gap-2 border-t border-[var(--mauve-10)] pt-3">
            <p className="text-[11px] text-[var(--night-40)]">
              {partner.name.trim() && partner.logo.trim()
                ? 'Prêt à afficher'
                : 'Nom et logo requis'}
            </p>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => handleMoveUp(index)}
                disabled={disabled || index === 0}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--mauve-20)] bg-[var(--pure-white)] text-[var(--mauve)] transition-colors hover:bg-[var(--mauve-05)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mauve-30)] disabled:cursor-not-allowed disabled:opacity-40"
                title="Remonter"
                aria-label={`Remonter ${partner.name || 'ce partenaire'}`}
              >
                <FiArrowUp className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => handleMoveDown(index)}
                disabled={disabled || index === partners.length - 1}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--mauve-20)] bg-[var(--pure-white)] text-[var(--mauve)] transition-colors hover:bg-[var(--mauve-05)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mauve-30)] disabled:cursor-not-allowed disabled:opacity-40"
                title="Descendre"
                aria-label={`Descendre ${partner.name || 'ce partenaire'}`}
              >
                <FiArrowDown className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                disabled={disabled}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--mauve-20)] bg-[var(--pure-white)] text-[color-mix(in_srgb,var(--mauve)_70%,#000)] transition-colors hover:bg-[color-mix(in_srgb,var(--mauve)_10%,#fff)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mauve-30)] disabled:cursor-not-allowed disabled:opacity-40"
                title="Supprimer"
                aria-label={`Supprimer ${partner.name || 'ce partenaire'}`}
              >
                <FiX className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAdd}
        disabled={disabled}
        className="font-primary inline-flex min-h-[2.25rem] w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[var(--mauve-30)] bg-[var(--mauve-05)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--mauve)] transition-all duration-300 hover:border-[var(--mauve)] hover:bg-[var(--mauve-10)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <FiPlus className="h-4 w-4" />
        Ajouter un partenaire
      </button>
    </div>
  )
}
