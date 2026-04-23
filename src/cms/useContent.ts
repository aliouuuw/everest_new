import { useCMS } from "./CMSProvider";
import type { SiteContentRow } from "./CMSProvider";

/**
 * Returns the override row for a given content ID, or undefined when no
 * override exists (callers render their fallback in that case).
 */
export function useContent(contentId: string): SiteContentRow | undefined {
  const { overrides } = useCMS();
  return overrides[contentId];
}
