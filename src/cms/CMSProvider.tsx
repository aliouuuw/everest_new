import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { useMutation, useQuery } from "convex/react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { api } from "../../convex/_generated/api";
import { useCurrentUser } from "../hooks/useAuth";
import { usePageKey } from "./usePageKey";
import { getRegistryEntry, type PageKey } from "./registry";
import type { ReactNode } from "react";

export interface SiteContentRow {
  _id: string;
  contentId: string;
  pageKey: string;
  type: "text" | "richtext" | "image";
  value: string;
  updatedAt: number;
}

interface CMSContextValue {
  pageKey: PageKey | null;
  /** Sparse map: only keys with a Convex row are present. */
  overrides: Partial<Record<string, SiteContentRow>>;
  canEdit: boolean;
  editMode: boolean;
  panelOpen: boolean;
  toggleEdit: () => void;
  togglePanel: () => void;
  closeAll: () => void;
  saveContent: (args: { contentId: string; value: string }) => Promise<void>;
  resetContent: (contentId: string) => Promise<void>;
}

const CMSContext = createContext<CMSContextValue | null>(null);

export function useCMS(): CMSContextValue {
  const ctx = useContext(CMSContext);
  if (!ctx) {
    throw new Error("useCMS must be used inside a <CMSProvider>");
  }
  return ctx;
}

interface CMSProviderProps {
  children: ReactNode;
}

export function CMSProvider({ children }: CMSProviderProps) {
  const pageKey = usePageKey();
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  const search = useSearch({ strict: false });

  const isAuthenticated = !!currentUser;
  const isAdmin = currentUser?.role === "admin";
  const canEdit = isAuthenticated && isAdmin;

  const editMode = canEdit && search.edit === true;
  const panelOpen = editMode && search.panel === true;

  const rows = useQuery(
    api.siteContent.getByPage,
    pageKey ? { pageKey } : "skip",
  );

  const overrides = useMemo<Partial<Record<string, SiteContentRow>>>(() => {
    if (!rows) return {};
    const map: Partial<Record<string, SiteContentRow>> = {};
    for (const row of rows as Array<SiteContentRow>) {
      map[row.contentId] = row;
    }
    return map;
  }, [rows]);

  const upsertMutation = useMutation(api.siteContent.upsert);
  const removeMutation = useMutation(api.siteContent.remove);

  const updateSearch = useCallback(
    (next: { edit?: boolean; panel?: boolean }) => {
      navigate({
        to: ".",
        search: (prev: Record<string, unknown>) => {
          const merged: Record<string, unknown> = { ...prev };
          if (next.edit === undefined) {
            delete merged.edit;
          } else {
            merged.edit = next.edit;
          }
          if (next.panel === undefined) {
            delete merged.panel;
          } else {
            merged.panel = next.panel;
          }
          return merged;
        },
        replace: true,
      });
    },
    [navigate],
  );

  const toggleEdit = useCallback(() => {
    if (!canEdit) return;
    if (editMode) {
      updateSearch({ edit: undefined, panel: undefined });
    } else {
      updateSearch({ edit: true });
    }
  }, [canEdit, editMode, updateSearch]);

  const togglePanel = useCallback(() => {
    if (!canEdit || !editMode) return;
    updateSearch({ edit: true, panel: panelOpen ? undefined : true });
  }, [canEdit, editMode, panelOpen, updateSearch]);

  const closeAll = useCallback(() => {
    updateSearch({ edit: undefined, panel: undefined });
  }, [updateSearch]);

  // Drop edit state if the session disappears while editing.
  useEffect(() => {
    if (!canEdit && (search.edit || search.panel)) {
      updateSearch({ edit: undefined, panel: undefined });
    }
  }, [canEdit, search.edit, search.panel, updateSearch]);

  const saveContent = useCallback(
    async ({ contentId, value }: { contentId: string; value: string }) => {
      if (!pageKey) {
        throw new Error("Cannot save: unknown page key for current route");
      }
      const entry = getRegistryEntry(contentId);
      if (!entry) {
        throw new Error(`Unknown contentId: ${contentId}`);
      }
      await upsertMutation({
        contentId,
        pageKey,
        type: entry.type,
        value,
      });
    },
    [pageKey, upsertMutation],
  );

  const resetContent = useCallback(
    async (contentId: string) => {
      await removeMutation({ contentId });
    },
    [removeMutation],
  );

  const value = useMemo<CMSContextValue>(
    () => ({
      pageKey,
      overrides,
      canEdit,
      editMode,
      panelOpen,
      toggleEdit,
      togglePanel,
      closeAll,
      saveContent,
      resetContent,
    }),
    [
      pageKey,
      overrides,
      canEdit,
      editMode,
      panelOpen,
      toggleEdit,
      togglePanel,
      closeAll,
      saveContent,
      resetContent,
    ],
  );

  return <CMSContext.Provider value={value}>{children}</CMSContext.Provider>;
}
