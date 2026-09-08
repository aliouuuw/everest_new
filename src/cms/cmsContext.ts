import { createContext, useContext } from "react";
import type { PageKey } from "./registry";

export interface SiteContentRow {
  _id: string;
  contentId: string;
  pageKey: string;
  type: "text" | "richtext" | "image";
  value: string;
  updatedAt: number;
}

export interface CMSContextValue {
  pageKey: PageKey | null;
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

export const CMSContext = createContext<CMSContextValue | null>(null);

export function useCMS(): CMSContextValue {
  const ctx = useContext(CMSContext);
  if (!ctx) {
    throw new Error("useCMS must be used inside a <CMSProvider>");
  }
  return ctx;
}
