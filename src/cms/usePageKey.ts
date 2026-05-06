import { useLocation } from "@tanstack/react-router";
import type { PageKey } from "./registry";

/**
 * Map a browser path to a logical CMS page key.
 *
 * Includes alias / legacy-redirect paths so saves are always attributed to the
 * correct bucket even if the user lands on a redirected URL.
 */
const PATH_TO_PAGE_KEY: Array<{ match: (path: string) => boolean; key: PageKey }> = [
  { match: (p) => p === "/" || p === "", key: "home" },
  { match: (p) => p === "/about", key: "about" },
  { match: (p) => p === "/services" || p === "/gestion-libre" || p === "/gestion-assistee", key: "services" },
  { match: (p) => p === "/offres", key: "offres" },
  { match: (p) => p === "/bourse", key: "bourse" },
  { match: (p) => p === "/marche-capitaux", key: "capital-markets" },
  { match: (p) => p === "/ingenieurie-financiere", key: "investment-banking" },
  { match: (p) => p === "/gestion-sous-mandat", key: "mandate" },
  { match: (p) => p === "/expertises", key: "expertises" },
  { match: (p) => p === "/faq", key: "faq" },
  { match: (p) => p.startsWith("/publications"), key: "publications" },
  { match: (p) => p.startsWith("/actualites"), key: "actualites" },
];

export function pathToPageKey(pathname: string): PageKey | null {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  for (const entry of PATH_TO_PAGE_KEY) {
    if (entry.match(normalized)) return entry.key;
  }
  return null;
}

export function usePageKey(): PageKey | null {
  const { pathname } = useLocation();
  return pathToPageKey(pathname);
}
