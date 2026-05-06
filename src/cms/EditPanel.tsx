import { useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";
import { useCMS } from "./CMSProvider";
import { MAX_VALUE_LENGTH, PAGE_KEY_LABELS, registry } from "./registry";
import type { PageKey, RegistryEntry } from "./registry";
import EnhancedRichTextEditor from "../components/CMS/Shared/EnhancedRichTextEditor";
import { useR2Upload } from "../hooks/useR2Upload";

function ImageFieldEditor({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
}) {
  const { upload, isUploading, error: uploadError } = useR2Upload();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const { publicUrl } = await upload(file, "cms-images");
      onChange(publicUrl);
    } catch {
      // error visible via uploadError
    }
    e.target.value = "";
  };

  return (
    <div className="space-y-2">
      {value && (
        <div
          className="relative overflow-hidden rounded-xl border border-[var(--mauve-10)] bg-[var(--command-surface)]"
          style={{ aspectRatio: "16 / 6" }}
        >
          <img src={value} alt="Aperçu" className="h-full w-full object-cover" />
        </div>
      )}
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
        className="font-primary inline-flex min-h-[2.25rem] w-full items-center justify-center gap-2 rounded-xl border border-[var(--mauve-20)] bg-[var(--command-surface)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--mauve)] transition-all duration-300 hover:border-[var(--mauve)] hover:bg-[var(--mauve-05)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isUploading ? "Téléversement…" : value ? "Changer l'image" : "Choisir une image"}
      </button>
      {uploadError && (
        <p className="font-primary text-[11px] text-[color-mix(in_srgb,var(--mauve)_85%,#000)]">
          {uploadError}
        </p>
      )}
    </div>
  );
}

interface FieldState {
  value: string;
  saving: boolean;
  error?: string;
  status?: "saved" | "reset";
}

const btnReset =
  "font-primary inline-flex min-h-[2.25rem] items-center justify-center rounded-full border border-[var(--mauve-20)] bg-[var(--command-surface)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--mauve)] transition-all duration-300 hover:border-[var(--mauve)] hover:bg-[var(--mauve)] hover:text-[var(--pure-white)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[var(--mauve-20)] disabled:hover:bg-[var(--command-surface)] disabled:hover:text-[var(--mauve)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mauve-30)] focus-visible:ring-offset-2";

const btnSave =
  "font-primary inline-flex min-h-[2.25rem] items-center justify-center rounded-full border-0 bg-[var(--jaune-or)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--pure-white)] shadow-[0_4px_16px_rgba(202,148,47,0.28)] transition-all duration-300 hover:-translate-y-px hover:brightness-105 hover:shadow-[0_6px_20px_rgba(202,148,47,0.35)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:brightness-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--jaune-or-30)] focus-visible:ring-offset-2";

/**
 * Side panel listing every editable field defined for the current page. Only
 * rendered when the CMS context reports `editMode && panelOpen && canEdit`.
 *
 * Each field has an explicit Save (calls upsert) and a Reset (calls remove),
 * which removes the override and returns the block to its hardcoded fallback.
 */
export function EditPanel() {
  const { canEdit, editMode, panelOpen, pageKey, overrides, closeAll, saveContent, resetContent } = useCMS();

  const pageTitle =
    pageKey != null && pageKey in PAGE_KEY_LABELS
      ? PAGE_KEY_LABELS[pageKey as PageKey]
      : (pageKey ?? "Page");

  const entries: ReadonlyArray<RegistryEntry> =
    pageKey != null ? registry[pageKey] : [];

  const [state, setState] = useState<Partial<Record<string, FieldState>>>({});

  // Seed local state from overrides whenever the page / overrides change.
  useEffect(() => {
    const next: Record<string, FieldState> = {};
    for (const entry of entries) {
      const row = overrides[entry.id];
      next[entry.id] = {
        value: row !== undefined ? row.value : "",
        saving: false,
      };
    }
    setState(next);
  }, [pageKey, overrides, entries]);

  if (!canEdit || !editMode || !panelOpen) return null;

  const handleChange = (id: string, value: string) => {
    setState((prev) => ({
      ...prev,
      [id]: { ...(prev[id] ?? { saving: false, value: "" }), value, error: undefined, status: undefined },
    }));
  };

  const handleSave = async (entry: RegistryEntry) => {
    const current = state[entry.id];
    if (current === undefined) return;
    setState((prev) => ({
      ...prev,
      [entry.id]: { ...current, saving: true, error: undefined, status: undefined },
    }));
    try {
      await saveContent({ contentId: entry.id, value: current.value });
      setState((prev) => {
        const prevField = prev[entry.id];
        if (prevField === undefined) return prev;
        return { ...prev, [entry.id]: { ...prevField, saving: false, status: "saved" } };
      });
    } catch (err) {
      setState((prev) => {
        const prevField = prev[entry.id];
        if (prevField === undefined) return prev;
        return {
          ...prev,
          [entry.id]: {
            ...prevField,
            saving: false,
            error: err instanceof Error ? err.message : "Save failed",
          },
        };
      });
    }
  };

  const handleReset = async (entry: RegistryEntry) => {
    const current = state[entry.id];
    setState((prev) => ({
      ...prev,
      [entry.id]: { ...(current !== undefined ? current : { value: "", saving: false }), saving: true, error: undefined, status: undefined },
    }));
    try {
      await resetContent(entry.id);
      setState((prev) => ({
        ...prev,
        [entry.id]: { value: "", saving: false, status: "reset" },
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        [entry.id]: {
          ...(prev[entry.id] ?? { value: "", saving: false }),
          saving: false,
          error: err instanceof Error ? err.message : "Reset failed",
        },
      }));
    }
  };

  // Group entries by section for readability.
  const sections = entries.reduce<Record<string, Array<RegistryEntry>>>((acc, entry) => {
    const section = entry.section;
    if (!Object.hasOwn(acc, section)) {
      acc[section] = [];
    }
    acc[section].push(entry);
    return acc;
  }, {});

  return (
    <aside
      data-lenis-prevent
      className="fixed right-0 top-0 z-[9999] flex h-[100dvh] w-[min(440px,100vw)] flex-col overscroll-contain border-l border-[var(--command-border)] bg-[var(--pure-white)] font-primary shadow-[-12px_0_40px_-16px_rgba(70,29,76,0.2)]"
    >
      <header className="relative shrink-0 border-b border-[var(--mauve-15)] bg-[var(--mauve)] px-5 py-5 text-[var(--pure-white)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--jaune-or)]/50 to-transparent"
        />
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 pr-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--jaune-or)]">
              Édition — contenu
            </p>
            <h2 className="mt-1.5 truncate font-primary text-xl font-bold leading-tight tracking-tight">
              {pageTitle}
            </h2>
            <p className="mt-1.5 text-xs font-light leading-relaxed text-white/75">
              Les changements s&apos;affichent sur le site après enregistrement.
            </p>
          </div>
          <button
            type="button"
            onClick={closeAll}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/[0.08] text-[var(--jaune-or)] transition-all duration-300 hover:border-[var(--jaune-or)]/50 hover:bg-[var(--jaune-or)]/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--jaune-or)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--mauve)]"
            aria-label="Fermer le panneau d'édition"
          >
            <FiX className="h-5 w-5" strokeWidth={2.25} />
          </button>
        </div>
      </header>

      <div
        data-lenis-prevent
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-[var(--gradient-ivory-section)] px-5 py-6 [touch-action:pan-y] [-webkit-overflow-scrolling:touch]"
      >
        {entries.length === 0 && (
          <p className="font-primary text-sm leading-relaxed text-[var(--night-60)]">
            Aucun champ éditable pour cette page. Ajoutez des entrées dans{" "}
            <code className="rounded-md bg-[var(--mauve-05)] px-1.5 py-0.5 font-mono text-xs text-[var(--mauve)]">
              src/cms/registry.ts
            </code>{" "}
            et enveloppez le texte avec{" "}
            <code className="rounded-md bg-[var(--mauve-05)] px-1.5 py-0.5 font-mono text-xs text-[var(--mauve)]">
              &lt;EditableText&gt;
            </code>
            .
          </p>
        )}

        {Object.entries(sections).map(([section, sectionEntries]) => (
          <section key={section} className="mb-8 last:mb-0">
            <h3 className="font-primary mb-3 border-l-2 border-[var(--jaune-or)] pl-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--mauve-40)]">
              {section}
            </h3>

            {sectionEntries.map((entry) => {
              const rawField = state[entry.id];
              const field =
                rawField !== undefined
                  ? rawField
                  : { value: "", saving: false };
              const override = overrides[entry.id];
              const overrideValue = override !== undefined ? override.value : "";
              const dirty = overrideValue !== field.value;

              return (
                <div
                  key={entry.id}
                  className="mb-3 rounded-2xl border border-[var(--mauve-10)] bg-[var(--pure-white)] p-4 shadow-[0_8px_32px_-12px_rgba(70,29,76,0.12),inset_0_1px_0_rgba(255,255,255,0.85)] last:mb-0"
                >
                  <label className="font-primary mb-1 block text-sm font-semibold text-[var(--mauve)]">
                    {entry.label}
                  </label>
                  <div className="mb-2 break-all font-mono text-[10px] leading-snug text-[var(--night-20)]">
                    {entry.id}
                  </div>

                  {entry.type === "image" ? (
                    <ImageFieldEditor
                      value={field.value}
                      onChange={(url) => handleChange(entry.id, url)}
                      disabled={field.saving}
                    />
                  ) : entry.type === "richtext" ? (
                    <EnhancedRichTextEditor
                      value={field.value}
                      onChange={(val) => handleChange(entry.id, val)}
                      placeholder={override !== undefined ? "" : "(texte par défaut du code)"}
                      className="min-h-[12rem] w-full"
                    />
                  ) : (
                    <textarea
                      value={field.value}
                      maxLength={MAX_VALUE_LENGTH}
                      onChange={(e) => handleChange(entry.id, e.target.value)}
                      placeholder={override !== undefined ? "" : "(texte par défaut du code)"}
                      rows={3}
                      className="font-primary w-full resize-y rounded-xl border border-[var(--mauve-15)] bg-[var(--pure-white)] px-3 py-2.5 text-sm leading-relaxed text-[var(--night)] placeholder:text-[var(--night-20)] transition-colors duration-300 focus:border-[var(--mauve)] focus:outline-none focus:ring-2 focus:ring-[var(--mauve-20)]"
                    />
                  )}

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <div className="font-primary min-h-[1.25rem] text-[11px] text-[var(--night-60)]">
                      {field.error && (
                        <span className="text-[color-mix(in_srgb,var(--mauve)_85%,#000)]">{field.error}</span>
                      )}
                      {!field.error && field.status === "saved" && (
                        <span className="font-semibold text-[var(--jaune-or)]">Enregistré</span>
                      )}
                      {!field.error && field.status === "reset" && (
                        <span className="text-[var(--mauve-60)]">Réinitialisé (texte par défaut)</span>
                      )}
                      {!field.error && !field.status && dirty && <span>Modifications non enregistrées</span>}
                    </div>
                    <div className="flex flex-shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() => handleReset(entry)}
                        disabled={field.saving || override === undefined}
                        className={btnReset}
                      >
                        Réinitialiser
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSave(entry)}
                        disabled={field.saving || !dirty}
                        className={btnSave}
                      >
                        {field.saving ? "Enregistrement…" : "Enregistrer"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        ))}
      </div>
    </aside>
  );
}
