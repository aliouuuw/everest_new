import { useCMS } from "./CMSProvider";

const pillBase =
  "font-primary inline-flex items-center justify-center rounded-full px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--jaune-or)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--summit-ivory)]";

/**
 * Floating bottom-right controls for admins. Renders nothing when the current
 * user cannot edit (i.e. not authenticated or not an admin).
 */
export function EditToggle() {
  const { canEdit, editMode, panelOpen, toggleEdit, togglePanel } = useCMS();

  if (!canEdit) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9998] flex flex-col items-end gap-2 md:bottom-6 md:right-6">
      {editMode && (
        <button
          type="button"
          onClick={togglePanel}
          className={`${pillBase} shadow-[var(--shadow-card-lift)] ${
            panelOpen
              ? "border-2 border-[var(--jaune-or)] bg-transparent text-[var(--jaune-or)] hover:bg-[var(--jaune-or-10)]"
              : "border-2 border-[var(--jaune-or)] bg-[var(--jaune-or)] text-[var(--pure-white)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(202,148,47,0.35)] hover:brightness-105"
          }`}
        >
          {panelOpen ? "Fermer le panneau" : "Ouvrir le panneau"}
        </button>
      )}
      <button
        type="button"
        onClick={toggleEdit}
        className={`${pillBase} shadow-[var(--shadow-card-lift)] ${
          editMode
            ? "border-2 border-[var(--mauve)] bg-transparent text-[var(--mauve)] hover:bg-[var(--mauve-05)]"
            : "border-2 border-[var(--mauve)] bg-[var(--mauve)] text-[var(--pure-white)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]"
        }`}
      >
        {editMode ? "Quitter l’édition" : "Mode édition"}
      </button>
    </div>
  );
}
