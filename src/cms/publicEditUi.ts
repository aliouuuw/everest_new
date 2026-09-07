/**
 * Floating public-site CMS controls (toggle + panel).
 *
 * Set `VITE_PUBLIC_CMS_EDIT_UI=false` in `.env.local` to hide them and rely on
 * `/admin/site-content` only (recommended once the admin editor is stable).
 */
export function isPublicCmsEditUiEnabled(): boolean {
  return import.meta.env.VITE_PUBLIC_CMS_EDIT_UI !== "false";
}
