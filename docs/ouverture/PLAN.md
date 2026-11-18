# Account opening: build plan

The form is the Astro page `/ouverture` (`apps/web/src/pages/ouverture.astro`), inside the site header and footer.
Vendor scripts and side pages stay in `public/ouverture/` (see its `SOURCE.md`).
Payload (`apps/cms`) is the whole backend: API, storage, back office. No separate server.

API contract: `public/ouverture/engine.js`, object `api`. Endpoints: `apps/cms/src/ouverture/endpoints.ts`.

## Phase 1: intake and review (done, 17 Nov 2026)

- `POST /api/ouverture/dossiers` creates a draft and returns `{ id, jeton }`. Only the sha256 of the token is stored.
- `PUT|DELETE /api/ouverture/dossiers/:id/pieces/:cle`: real type checked from bytes (PDF, JPEG, PNG, HEIC), 4 MB max.
- `POST .../envoi` locks the file, gives a reference `EVF-YYYY-XXXXXXXX`, checks that every « jointe » piece arrived.
- `GET .../etat` answers `etape: "examen"` with no person: the client sees « dossier complet » directly.
- Back office: « Dossiers (ouverture) » (status, internal notes) and « Pièces (ouverture) » (staff-only files).
- Checks: `bun run check:ouverture` (helpers), `bun run --cwd apps/cms e2e:ouverture <base>` (API, writes to the DB).

Before going live:

1. Done 18 Nov 2026: private R2 bucket `everest-ouverture-pieces` (account awade@everestfin.com, r2.dev access off,
   no custom domain). Its 4 variables are on Vercel Preview (staging). Production needs the same 4.
2. Done 18 Nov 2026: schema pushed to the staging database (additive only, checked by a dry run).
3. Done 18 Nov 2026: the links to the old external form (`everest-account-opening.vercel.app`) point to `/ouverture`
   (Header ×2, InvestmentCalculator, AuthPage, ArticlePage). The Opportunités « Devenir client » still goes to `/contact`.

Known gaps (vendor copy, to decide with the team):

- On the last step, « Pourquoi cette étape ? » says « …terminer la simulation. Aucune demande réelle ne sera envoyée. » also in live mode (`engine.js`, `envoi`).
- The form's final screen says « un accusé de réception vous a été envoyé par courriel ». No email is sent yet (phase 2).

## Phase 2: emails and complement requests

- Email adapter in Payload (Resend, already used by the legacy app): acknowledgment to the client, alert to the team.
- Staff action « Demander un complément » on a file: list of pieces and questions, expiry date, personal link
  `/ouverture/complement.html#<id>.<token>`. Endpoints expected by `complement.js`: `GET /api/complement/:id`,
  `POST /acces` (date of birth check, returns a session), `PUT /pieces/:item`, `POST /reponse`.
- Decision fields: approved or refused, by whom, when. Opening notice email.
- Cleanup job: delete drafts never sent after 24 h, with their files.

## Phase 3: identity check (Didit)

- Derive the people to verify from the answers (holder, joint holders, legal representatives, signatories).
- `POST .../personnes/:cle/verification` creates a Didit session and returns `{ url }`; Didit webhook updates `kyc`.
- `etat` then lists people with `verifie: true` and their Didit status; `retour-verification.html` is the return page.
- Needs: Didit account, API key, webhook secret.

## Phase 4: contracts and e-signature (Zoho Sign)

- Generate the contracts listed in `documentsASigner` as PDF (templates from Legal).
- `GET .../personnes/:cle/documents`, `POST .../authentification` (Didit face check), `POST .../signature/zoho`,
  `GET .../documents/:doc`. Zoho webhook marks documents signed; `etat` moves to `examen` when all are signed.
- Needs: contract templates, Zoho Sign account and API keys.
