# L0 Audit: site vs referential V2.1

Date: 22 Oct 2026. Branch `staging` at `883cbef`.

Method: each Part III block was looked up in the repo, then checked
against the HTML served by https://staging.everestfin.com (same day).
The staging text matches the repo: the repo is the source of truth.

States: **absent** (no slot on the site), **different** (a slot exists,
the text is not the referential text), **conform** (word for word).

## How a text reaches the page

1. Shared JSX in `src/` (routes and components) holds the slot and a
   default text in an `EditableText id="..."`.
2. Payload `site-content` rows override that default. They are seeded
   from `apps/cms/src/seed/site-content-defaults.ts`.
3. Some texts are hard-coded arrays in JSX (cards, bullets, FAQ) and
   are not in the CMS.

A text change must update the JSX default and the seed, then re-seed
Payload. Otherwise the old Payload row keeps winning.

## Global frame (II.1, II.3, §9)

| Item | File | State | Note |
|------|------|-------|------|
| Menu: 8 entries | `src/components/Header/Header.tsx:285-330` | different | Today: Accueil, Insights, Expertises, Société, Ressources, plus « Ouvrir un compte » and « Accès Client » buttons |
| Footer: same 8 entries | `src/components/Footer.tsx:12-37` | different | Today: 4 columns « Marchés & opportunités », Expertises, Société, « Autres » |
| Signature « Encordés, vers le sommet » | `src/components/Footer.tsx` (under the logo) | different | Shows « Des idées et des valeurs au service de vos ambitions. » |
| Copyright line | `src/components/Footer.tsx` bottom bar | different | « Everest Finance SGI — Numéro d’agrément n° SGI /DA/2016/60 » (wrong case, stray space) |
| « Mentions légales », « Conditions générales d'utilisation », « Politique de Confidentialité » | `src/components/Footer.tsx` bottom bar | different | Shows « Termes et conditions. » and « Politique de Confidentialite » (no accent). Plain text, no link, no page |
| Home meta description | `apps/web/src/layouts/Layout.astro:12` | different | Default « Everest Finance — Gestion de patrimoine… » on every page |
| Page titles | each `apps/web/src/pages/*.astro` | different | « … — Everest Finance »: wrong case and em dash |
| Charter colors | `src/styles.css:16-18` and 4 files with hard-coded `#012d2a`, `#cb9824` or their `rgba` | different | `--everest-green: #012d2a`, `--jaune-or: #cb9824`. No `#C8A96B` found |
| Social links | `src/components/Footer.tsx` | different | LinkedIn, Facebook, TikTok all `href="#"`. TikTok waits on ADG (§10) |
| BRVM ticker | `src/components/Header/BRVMTicker.tsx` | different | Mock data with random changes every few seconds, shown as live quotes. Redistribution right waits on Legal (§10) |

## §1 Accueil

Island: `apps/web/src/islands/HomePage.tsx`. Current order: hero, logo
strip, positioning, counters, capacity, expertises, insights, CTA, FAQ.

| Block | File | State | Note |
|-------|------|-------|------|
| Hero N1 | `src/components/Hero/HeroSectionMountain.tsx`, seed `home.hero.title` | conform | |
| Hero N2 | same, `home.hero.subtitle` | different | « plateforme d'ingénierie… orientée performance » |
| Hero CTAs « Entrer en relation · Accéder aux opportunités » | same, `home.hero.ctaPrimary` | different | Only « Accéder aux opportunités » (links to `/offres`). « Entrer en relation » absent |
| Positionnement et identité N1/N2 | `src/components/Sections/Positioning.tsx`, `home.positioning.*` | different | Other title, intro and 4 cards (Structuration, Intermédiation…) |
| Preuves, markers 1 to 4 | `src/components/Sections/ValueProps.tsx`, `Capacity.tsx` | different | Counters « 10+ ans », « +500 Mds F CFA », « +200 Mds F CFA » and 4 capacity cards. Referential marker 3 replaces figures |
| Engagements bandeau | none | absent | |
| Analyses « Comprendre avant d'agir. » | `apps/web/src/islands/InsightsMergedStatic.tsx`, `home.insights.*` | different | Title « Insights ». Block sits after the expertises (must come before) |
| Expertises intro N1 | `src/components/Sections/Services.tsx`, `home.services.*` | different | « Nos expertises — marchés & patrimoine. » |
| 4 vignettes N1/N2 | `src/components/Sections/Services.tsx:16-57` | different | Short bullets, no N2. Order BRVM first, referential has MTP first. Typo « MTP UEMAO » |
| Segments | none | absent | |
| Sama Naffa block | none | absent | No mention of Sama Naffa anywhere in the repo |
| Gouvernance block | none | absent | |
| Final CTA « Entrer en relation avec nos équipes · Découvrir nos expertises » | `src/components/Sections/CTA.tsx`, `home.cta.*` | different | « Nous contacter » and « Évaluer mon profil d'investisseur ». Intro says « rendement » |
| Logo strip « La confiance d'émetteurs… » | `src/components/Sections/TrustStrip.tsx`, `home.trust.partners` | not in §1 | The 13 logos belong to §2.7 and wait on Legal |
| FAQ on home | `src/components/Sections/FAQ.tsx` | not in §1 | 6 entries, not the 8 of §9 |

## §2 La société

Route today: `/about` (`src/routes/AboutPage.tsx`, seed `about.*`).

| Block | File | State | Note |
|-------|------|-------|------|
| 2.1 Histoire | `AboutPage.tsx:18-22` timeline, `about.histoire.*` | different | Timeline says **2013** for the creation. Referential: 2015 |
| 2.2 Mission | `about.mission.missionBody` | different | « solutions d'investissement performantes… » |
| 2.2 Récit du nom | none | absent | |
| 2.3 ADN (intro and 3 markers) | none | absent | Page has « Philosophie » cards instead (« Approche disciplinée », « Stress tests ») |
| 2.4 Six engagements | none | absent | |
| 2.5 Vision | `about.mission.visionBody` | different | |
| 2.5 Gouvernance | `AboutPage.tsx` « Équipe dirigeante » | different | 3 department cards, no governance text. Anchor `#gouvernance` points at the mission section |
| 2.6 Conformité & agrément | `AboutPage.tsx:261-330` | different | Spec table and bullets (CENTIF, BCEAO). No APSGI mention |
| 2.7 Références | `TrustStrip.tsx` on home | hidden (keep) | Waits on Legal (§10) |
| Counters « 11 ans / 500 Mds / 200 Mds » | `AboutPage.tsx` | not in §2 | |

## §3 Expertises

Route today: `/expertises` (`src/routes/ExpertisesPage.tsx`, seed
`expertises.*`). The 4 subroutes in `apps/web/src/pages/expertises/`
only redirect to anchors on that page. The referential asks for four
pages.

| Block | File | State | Note |
|-------|------|-------|------|
| Common intro N1/N2 | `expertises.hero.*` | different | |
| 3.1 MTP chapeau and 3 disciplines | `ExpertisesPage.tsx:45-60`, `expertises.marche-titres-publics.*` | different | « optimisation du rendement » (banned word, twice) |
| 3.2 BRVM chapeau and 4 functions | `ExpertisesPage.tsx:27-42` | different | |
| 3.3 Structuration chapeau and 3 domains | `ExpertisesPage.tsx:63-79` | different | |
| 3.4 Private Office chapeau and 2 approaches | `ExpertisesPage.tsx:82-98` | different | |
| CTA « Prendre rendez-vous » | `expertises.cta.*` | not in §3 | |

## §4 Analyses & Publications, §5 Actualités

| Block | File | State | Note |
|-------|------|-------|------|
| §4 N1/N2 | `src/routes/PublicationsPage.tsx`, `publications.hero.*` | different | « Nos revues & analyses. » |
| §4 Standard disclaimer | none | absent | Not on any publication |
| Publication summaries | `apps/cms/src/seed/publications.ts`, `src/data/publications.ts` | different | « performances » and « recommandations d'investissement » (allocation advice must stay in the reserved space) |
| §5 N1/N2 | `src/routes/ActualitesPage.tsx`, `actualites.hero.*` | different | « Actualités & Communiqués. » |
| Ad block « Publicité… meilleures opportunités » | `src/routes/ActualitesPage.tsx:342-350` | not in §5 | |
| Newsletter, « Rubriques » sidebar | `src/routes/ActualitesPage.tsx` | not in §5 | |

## §6 Opportunités, §7 Sama Naffa, §8 Contact

| Block | File | State | Note |
|-------|------|-------|------|
| §6 N1/N2 and CTAs | none | absent | `/marches-opportunites` redirects to `/actualites`. Hero CTA « Accéder aux opportunités » goes to `/offres` |
| `/offres` page | `src/routes/OffresPage.tsx`, seed `offres.*` | not in referential | Fees (« 0,40% - 0,60% »), client testimonials, performance chart, « rendements ». Breaks the §6 rule: no return, no access condition in the public zone |
| §7 Sama Naffa page | none | absent | No route |
| §8 N1/N2 | `src/routes/ContactPage.tsx`, `contact.hero.*` | different | « Parlons de vos projets. » |
| §8 4 steps « Devenir client » | none | absent | |
| §8 Contact details | `ContactPage.tsx`, `Footer.tsx` | different | Data correct. Label « EVEREST Finance SGI », layout differs from the one-line N1 |
| Hours « Lundi — Vendredi… », « sous 24 h ouvrées » | `contact.hours.*`, `contact.form.intro` | not in §8 | Conflicts with the §8 delays (4 business hours) |

## §9 Footer pages

| Block | File | State | Note |
|-------|------|-------|------|
| Mentions légales | none | absent | Structure from V1.0 not in the repo. Legal data waits on Legal (§10) |
| Politique de confidentialité | none | absent | Same |
| FAQ: 8 entries | `src/routes/FAQPage.tsx:18-23` | different | 6 other entries. Source V1.0 text not in the repo |
| Abécédaire (glossary) | `src/routes/FAQPage.tsx:27-…` | not in §9 | « performance » (Indice) and « rendement » (Spread) in definitions |

## Pages with no referential entry

| Route | Content | Proposal |
|-------|---------|----------|
| `/offres` | Gestion libre / assistée / sous mandat, fees, testimonials, charts | Redirect to Opportunités |
| `/bourse` | BRVM quotes table | Keep out of the menu, or redirect. Same legal check as the ticker |
| `/outils-investisseur` | Investor profile quiz | Redirect, or keep unlinked |
| `/marche-capitaux`, `/ingenieurie-financiere`, `/gestion-sous-mandat` | Old department pages (« plus de 25 opérations… taux de couverture de 100% », « rendements ») | Redirect to the matching expertise page |
| `/auth` (« Accès Client ») | Login page | Keep only if the investor space is built (§10) |

## Lexicon on staging (22 Oct 2026)

| Check | Pages with hits |
|-------|-----------------|
| « rendement » | `/`, `/expertises`, `/faq`, `/offres`, `/gestion-sous-mandat` |
| « performance » | `/`, `/publications`, `/faq`, `/offres`, `/gestion-sous-mandat` |
| « attractif », « compétitif » | none |
| `#C8A96B` | none |
| « Everest Finance » (wrong case) | every page (title tag, footer, logo alt) |
| Em dash « — » | every page, 2 to 10 per page. See question 1 in `PLAN.md` |

## Other findings (not text)

1. The home counters render « 0 » in the served HTML. They count up only
   after JavaScript runs. The referential markers replace them in L2.
2. `/actualites` shows « Aucun article » in the served HTML, and the
   home news column is empty. Check the news feed at build time.
3. The footer link « Vision & gouvernance » lands on the mission section
   (`id="gouvernance"` sits on it).

## Effect on the lots

1. Almost every block is **different** or **absent**. Only the home hero
   N1 is conform. Each lot is a rewrite, not a fix.
2. L1 needs the route decision first (question 3 in `PLAN.md`).
3. L2 must drop the logo strip from the home page (§2.7 waits on Legal).
4. L4 needs four real expertise pages, not anchors on one page.
5. L6 must remove the fees, testimonials and charts of `/offres` from the
   public zone.
6. The ticker shows invented quotes as live data. Decide before L1: hide
   it, or connect a real feed after the legal check.
