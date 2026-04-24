import { FiEdit3, FiLogOut, FiSidebar } from "react-icons/fi";
import { useCMS } from "./CMSProvider";

/**
 * Floating bottom-right “dock” for admins — matches landing soft-panel + pill
 * language (mauve / gold, trailing icon disc). Renders nothing when the current
 * user cannot edit.
 */
export function EditToggle() {
  const { canEdit, editMode, panelOpen, toggleEdit, togglePanel } = useCMS();

  if (!canEdit) return null;

  return (
    <div
      className="fixed z-[9998] w-[min(19rem,calc(100vw-1.5rem))] max-w-full pb-[max(1rem,env(safe-area-inset-bottom))] pl-[max(0.5rem,env(safe-area-inset-left))] pr-[max(0.5rem,env(safe-area-inset-right))] sm:w-[min(20rem,100%)]"
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))", right: "max(1rem, env(safe-area-inset-right))" }}
    >
      <div className="cms-editor-dock relative flex flex-col gap-2.5 p-3 pt-4">
        <div className="relative z-[1] px-0.5">
          <p className="font-primary text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--mauve-40)]">
            Contenu site
          </p>
        </div>

        <div className="relative z-[1] flex flex-col gap-2.5">
          {editMode && (
            <button
              type="button"
              onClick={togglePanel}
              className={[
                "cms-editor-pill",
                panelOpen ? "cms-editor-pill--goldSolid" : "cms-editor-pill--goldOutline",
              ].join(" ")}
              aria-pressed={panelOpen}
              aria-label={panelOpen ? "Fermer le panneau d'édition" : "Ouvrir le panneau d'édition"}
            >
              <span className="cms-editor-pill__label">
                {panelOpen ? "Fermer le panneau" : "Ouvrir le panneau"}
              </span>
              <span className="cms-editor-pill__disc" aria-hidden>
                <FiSidebar className="h-4 w-4" strokeWidth={2.25} />
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={toggleEdit}
            className={[
              "cms-editor-pill",
              editMode ? "cms-editor-pill--mauveGhost" : "cms-editor-pill--mauveSolid",
            ].join(" ")}
            aria-pressed={editMode}
            aria-label={editMode ? "Quitter le mode édition" : "Activer le mode édition"}
          >
            <span className="cms-editor-pill__label">
              {editMode ? "Quitter l'édition" : "Mode édition"}
            </span>
            <span className="cms-editor-pill__disc" aria-hidden>
              {editMode ? (
                <FiLogOut className="h-4 w-4" strokeWidth={2.25} />
              ) : (
                <FiEdit3 className="h-4 w-4" strokeWidth={2.25} />
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
