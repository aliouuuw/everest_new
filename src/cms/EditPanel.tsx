import { useEffect, useState } from "react";
import { useCMS } from "./CMSProvider";
import { MAX_VALUE_LENGTH, registry } from "./registry";
import type { RegistryEntry } from "./registry";

interface FieldState {
  value: string;
  saving: boolean;
  error?: string;
  status?: "saved" | "reset";
}

const btnReset =
  "font-primary rounded-full border border-[var(--mauve-20)] bg-[var(--pure-white)] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--mauve)] transition-all duration-300 hover:border-[var(--mauve)] hover:bg-[var(--mauve)] hover:text-[var(--pure-white)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[var(--mauve-20)] disabled:hover:bg-[var(--pure-white)] disabled:hover:text-[var(--mauve)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mauve-30)] focus-visible:ring-offset-2";

const btnSave =
  "font-primary rounded-full border-0 bg-[var(--jaune-or)] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--pure-white)] shadow-[0_4px_16px_rgba(202,148,47,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[0_8px_24px_rgba(202,148,47,0.35)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:brightness-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--jaune-or-30)] focus-visible:ring-offset-2";

/**
 * Side panel listing every editable field defined for the current page. Only
 * rendered when the CMS context reports `editMode && panelOpen && canEdit`.
 *
 * Each field has an explicit Save (calls upsert) and a Reset (calls remove),
 * which removes the override and returns the block to its hardcoded fallback.
 */
export function EditPanel() {
  const { canEdit, editMode, panelOpen, pageKey, overrides, closeAll, saveContent, resetContent } = useCMS();

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
      className="fixed right-0 top-0 z-[9999] flex h-[100dvh] w-[min(440px,100vw)] flex-col overscroll-contain border-l border-[var(--mauve-10)] bg-[var(--summit-ivory)] font-primary shadow-[-8px_0_32px_-12px_rgba(70,29,76,0.18)]"
    >
      <header className="flex shrink-0 items-center justify-between gap-4 border-b border-[var(--jaune-or-20)] bg-[var(--mauve)] px-5 py-4 text-[var(--pure-white)]">
        <div className="min-w-0">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--jaune-or)]">
            Contenu — page
          </div>
          <div className="truncate font-primary text-lg font-bold tracking-tight text-[var(--pure-white)]">
            {pageKey ?? "unknown"}
          </div>
        </div>
        <button
          type="button"
          onClick={closeAll}
          className="font-primary shrink-0 rounded-full border border-[color-mix(in_srgb,var(--jaune-or)_45%,transparent)] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--jaune-or)] transition-all duration-300 hover:bg-[var(--jaune-or-10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--jaune-or)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--mauve)]"
        >
          Fermer
        </button>
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
            <h3 className="font-primary mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--mauve-40)]">
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

                  <textarea
                    value={field.value}
                    maxLength={MAX_VALUE_LENGTH}
                    onChange={(e) => handleChange(entry.id, e.target.value)}
                    placeholder={override !== undefined ? "" : "(texte par défaut du code)"}
                    rows={3}
                    className="font-primary w-full resize-y rounded-xl border border-[var(--mauve-15)] bg-[var(--pure-white)] px-3 py-2.5 text-sm leading-relaxed text-[var(--night)] placeholder:text-[var(--night-20)] transition-colors duration-300 focus:border-[var(--mauve)] focus:outline-none focus:ring-2 focus:ring-[var(--mauve-20)]"
                  />

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
