# Formulaire d'ouverture de compte (vendor copy)

Source: pack « Ouverture de compte 19-10-2026 », folder `serveur-ouverture/` (OneDrive, received 16 Nov 2026).

The form page is `/ouverture`, built by Astro from `apps/web/src/pages/ouverture.astro`, inside the site chrome
(header, footer, fonts). This folder keeps the vendor scripts, images and side pages.

Local changes to the vendor files:

- `index.html` is removed. Its markup lives in `apps/web/src/pages/ouverture.astro` (same text, same ids).
  The vendor header became the bar under the site header, asset paths are absolute, and the config is
  `{"api": "/api/ouverture", "maxMo": 4}` (Payload endpoints in `apps/cms/src/ouverture/`; Vercel refuses bodies over 4.5 MB).
- `SGI/2016-01` is replaced by `SGI/DA/2016/60` everywhere (referential: purge of « SGI/2016-01 » before going live).
- `app.css`: `--gold` `#c8a96b` is replaced by the charter gold `#b68a3e`.

Styles of `/ouverture`: `apps/web/src/styles/ouverture.vendor.css` (generated from `app.css`: scoped, charter colours)
and `apps/web/src/styles/ouverture.css` (brand layer, hand-written).

To update:

1. Replace the vendor files with the new `serveur-ouverture/`, and apply the changes above.
2. Copy the new `index.html` body into `ouverture.astro`. Keep the `.ouv-bar` and the absolute paths.
3. Run `bun apps/web/scripts/ouverture-css.mjs`. Then `bun run check:lexicon` after `bun run build:web`.
4. Run `bun run --cwd apps/cms e2e:ouverture <base url>` against a test database.

Server side and phases: `docs/ouverture/PLAN.md`.
