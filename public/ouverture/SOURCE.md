# Formulaire d'ouverture de compte (vendor copy)

Source: pack « Ouverture de compte 19-10-2026 », folder `serveur-ouverture/` (OneDrive, received 16 Nov 2026).

Do not edit these files. One local change only:

- `index.html`, block `#ef-config`: `"api": "/api/ouverture"`, `"maxMo": 4`
  (Payload endpoints in `apps/cms/src/ouverture/`; Vercel refuses bodies over 4.5 MB).

To update: replace every file with the new `serveur-ouverture/`, apply the change above,
then run `bun run --cwd apps/cms e2e:ouverture <base url>` against a test database.

Server side and phases: `docs/ouverture/PLAN.md`.
