# Compliance of the site with referential V2.1

Source checked: `~/Downloads/SITEWEB-REFERENTIEL.docx` (EF-SITE-REFERENTIEL-2026-V2.1,
8 July 2026, status « soumis à validation ADG »). Its text is identical, line for line, to
`SITEWEB-REFERENTIEL-V2.1.md` (pandoc conversion and diff, 23 Oct 2026). The .docx has no
tracked changes, no comments and no images. Its only red text is the « [EN ATTENTE] » note
of §2.7. Its gold left rule is the « filet doré » of Part III.

Site checked: `staging` at `8e738dc` plus the fixes of 23 Oct 2026, built locally.

## Status key

| Status | Meaning |
|---|---|
| Done | The site does what the point says. |
| Done by decision | The site follows a recorded owner decision that adapts the point. |
| Blocked | The point needs an input from outside the dev team (Legal, ADG, data). |
| Gap: decide | The site differs from the point. Someone must decide. |
| Gap: fix | The site differs from the point. The dev team can fix it. |

## Summary

1. **Text (Part III):** 118 of 121 N1/N2 texts are on the site, word for word. The 3
   missing texts are held back by decision or by Legal (§2.7, investor-space CTA).
   Reverse check: every site text exists in the referential (`bun run check:copy`, 155 texts).
2. **Rules of the pen (I.6):** checked on every built page by `bun run check:lexicon`.
3. **Open gaps:** 4 to decide, 3 to fix, 9 blocked on inputs. See the last section.

## Part I: Positioning

| Point | Status | Evidence |
|---|---|---|
| I.1 The site never says « nous comprenons mieux le marché » | Done | No occurrence in the code or the content. |
| I.1 It shows the integrated chain and gives the analyses to read | Done | Home chain timeline (stations from the positioning N2); covers on home and /analyses. |
| I.1 Each expertise page ends on end-to-end responsibility | Done, 3 of 4 | MTP, Structuration and Private Office end on it. BRVM ends on « Fonction 4 », as the referential orders it; its end-to-end line is the page chapeau. |
| I.2 Audience order drives the home block order | Done | Hero, positioning, proofs, engagements, analyses, expertises, segments, Sama Naffa, governance, final CTA (Part III §1 order). |
| I.2 Analyses before the expertise vignettes | Done | Home order above. |
| I.2 Private Office is the second door put forward | Gap: decide | In the segments the private clientele comes second. In the expertise list (Part III order) Private Office is fourth. ADG to say which « door » I.2 means. |
| I.2 Savers reach Sama Naffa without lowering the register | Done | Sama Naffa block and gateway page; the register stays institutional. |
| I.3 Publications | Done | /analyses, real covers, standard disclaimer. |
| I.3 Abécédaire / FAQ | Blocked | The 8 entries of the V1.0 text are missing (PLAN.md « L7: what to send »). The current /faq is not referential text. |
| I.3 Investor space (full information after free registration) | Blocked | Not built; its CTA is hidden (PLAN decision 6). |
| I.3 Negative promise of Actualités | Done | §5 N2 on /actualites. |
| I.3 Fee rule | Done | §8 step 3 « Aucun frais n'est prélevé… » on /contact. |
| I.3 Pivot sentence at the head of Analyses | Done | « L'information est la première chose que nous devons au marché. » |
| I.4 Ten years, agrément SGI/DA/2016/60 of 30 March 2016, AMF-UMOA | Done | Home proofs 1 and 2; La société §2.1 and §2.6. |
| I.4 APSGI membership | Done | La société §2.6. |
| I.4 Full chain under one roof | Done | Home proof 3, chain timeline. |
| I.4 Thirteen institutional references | Blocked | §2.7 hidden until Legal confirms the agreements. |
| I.4 Custody figure excluded | Done | Not on the site. |
| I.4 Guinée operations data | Blocked | Not received. |
| I.5 Inclusion: « l'accès au marché financier ne doit pas être un privilège » | Done | Home positioning N2 and Sama Naffa N2; vision §2.5. |
| I.5 Footer signature « Encordés, vers le sommet » | Done | Under the footer logo. |
| I.5 Old baseline recycled in the history | Done | §2.1 N2. |
| I.5 Two frontal sentences (primary-placement loyalty, Actualités negative promise) | Done | BRVM « Fonction 2 » N2; §5 N2. |
| I.5 Full switch at go-live, with redirects, no coexistence | Done on staging; go-live pending | Old routes redirect (PLAN decision 3). Production `everestfin.com` is not switched yet. |
| I.6 Short sentences, proof before claim, no self-praise | Done | Text is Part III verbatim. |
| I.6 No performance lexicon in public zones | Done | `check:lexicon`: 0 hits on 14 pages. |
| I.6 French register; « Private Office » exception; vouvoiement | Done | |
| I.6 « EVEREST » in capitals; « AMF-UMOA »; « agréée »; « la maison » | Done | One lowercase « Everest Finance » found in the WhatsApp button label; fixed 23 Oct 2026. Legacy pages that still spell it so are redirected and not served. |
| I.6 No stylistic em dash | Done by decision | The referential's own em dashes are replaced by commas or parentheses (PLAN decision 1). |
| I.6 No mention of the BTD 2029 programme | Done | No occurrence. |

## Part II: Site plan

| Point | Status | Evidence |
|---|---|---|
| II.1 Eight main entries, same labels and same order in menu and footer | Gap: decide | The footer lists the 8 entries in order. The header shows 6: « La société », « Analyses & Publications » and « Actualités » are grouped in one menu, and the bar says « Contact » for « Contact / Devenir client » (header pass, 23 Oct 2026). This breaks « taxonomie unique » (II.1, II.3). Choose: restore 8 flat entries, or have ADG accept the grouping. |
| II.1 Expertises: four symmetric pages | Done | Hub and 4 pages, same structure. |
| II.1 Footer: legal notice, privacy policy, Abécédaire / FAQ, Carrières (to confirm) | Blocked | Labels present as plain text; the pages wait for Legal and the FAQ text. Carrières waits for ADG / RRHA. |
| II.1 Copyright line | Done by decision | « © 2026 EVEREST Finance, SGI agréée AMF-UMOA n° SGI/DA/2016/60. Tous droits réservés. » (em dash → comma, decision 1). |
| II.1 Pages « Groupe » and « Transactions » removed | Done | No such routes. |
| II.2 Accueil: live BRVM quotes band | Blocked | Hidden until the redistribution right is confirmed (PLAN decision 4). |
| II.2 La société: chronology 2015 / 30 March 2016 | Done | §2.1. |
| II.2 Expertises: written by function, never by name; no promise of result | Done | |
| II.2 Analyses: standard disclaimer on every publication | Done | Under the list and in each preview. |
| II.2 Analyses: allocation recommendations only in the controlled space | Done | CMS summaries are hidden on the cards. |
| II.2 Analyses: filters by the formats §4 names | Gap: decide | Filters are Hebdomadaire / Mensuelle / Semestrielle; §4 names notes de conjoncture, décryptages, points de marché, fiches pédagogiques (DESIGN-PLAN 4.3). Needs a format field on publications. |
| II.2 Actualités: no communication on open operations | Done | 0 articles on staging; empty state shows no toolbar. |
| II.2 Opportunités: no yield, no access condition, no calendar in public | Done | §6 text only; the instrument ledger repeats N1 words. |
| II.2 Sama Naffa: register « construire », never « gagner » | Done | |
| II.2 Sama Naffa: charters not mixed | Gap: decide | Since 23 Oct 2026 the /sama-naffa page head shows Sama Naffa's own full-colour hero image inside the EVEREST layout. Either ADG accepts it, or the head returns to a charter image. |
| II.2 Contact: the form feeds the prospection system (follow-ups D+3, D+7, D+14) | Gap: fix | The form opens the visitor's e-mail client (`mailto:`). Nothing records the request or schedules follow-ups. Needs a backend and the CRM target. |
| II.2 Contact: data protection compliant | Blocked | The consent line under the form is not referential text; it waits for Legal's privacy policy wording. |
| II.3 Server rendering: the delivered HTML holds all the content | Done | No-JS checks (`home-design.check.ts`, `pages.check.ts`). |
| II.3 Own metadata per page; exact home description | Done except /faq | Home description is the exact II.3 sentence. /contact got its own description on 23 Oct 2026. /faq still uses the home description: it has no referential text yet. |
| II.3 Duplicates « Insights » / « Marchés & Opportunités », « Ressources » / « Autres » removed | Done | Redirects. |
| II.3 Charter colours only; #C8A96B replaced | Done, one exception | No #C8A96B in the code. The WhatsApp bubble stays off-charter green by owner decision (DESIGN-HANDOFF-2 §3). |
| II.3 Reserved space: authentication, permissions, ten-year logging | Blocked | Not in this project's scope yet. |
| II.3 Pre-production corrections (home title, « Mentions légales », « Conditions générales d'utilisation », « Politique de Confidentialité », « EVEREST Finance », agrément number) | Done | |
| II.3 All content from Part III; no copy by the dev team | Gap: fix | Part III text is verbatim. Interface strings remain that are not in the referential: the contact form (labels, the 6 subject choices, consent line, placeholder), the /analyses search and filters, « Accès Client » in the header, the skip link « Aller au contenu ». The first two need Legal / ADG wording or approval; the last two are navigation and accessibility. |

## Part III: Content

| Point | Status | Evidence |
|---|---|---|
| Texts word for word | Done | 118 of 121 present; reverse check 155 / 155. |
| « N1 sur filet doré, N2 sur filet vert » | Gap: decide | The .docx draws these rules; the site dropped them for the home and inner-page design (owner-approved home, 23 Oct 2026). Part III states it as a presentation rule, so ADG should confirm the design reading. |
| N2 « sous l'accroche ou au dépliage » | Done | All N2 visible, except the 4 home expertise vignettes (native disclosure, owner decision). |
| §1 Home | Done | All blocks; hero CTAs and final CTAs present. |
| §2.1 to §2.6 La société | Done | |
| §2.7 Références | Blocked | Legal (§10). |
| §3 Expertises | Done | Hub intro and four pages. |
| §4 Analyses & Publications, disclaimer | Done | |
| §5 Actualités | Done | |
| §6 Opportunités | Done by decision | « Accéder à l'espace investisseur » hidden until the space exists; « Devenir client » present. |
| §7 Sama Naffa (no N2, ADG ruling) | Done | Logo, short text, CTA « Découvrir Sama Naffa → ». |
| §8 Contact / Devenir client | Done | N1, N2, four steps, contact details with links. |
| §9 Copyright and signature | Done | See II.1. |
| §9 Legal notice and privacy policy | Blocked | Legal inputs. |
| §9 Abécédaire / FAQ, eight entries unchanged | Blocked | V1.0 text not received; the current /faq is off-referential and must not be read as compliant. |

## §10 Open actions

| Action | Owner | Site status |
|---|---|---|
| Guinée support data | ADG | Not received; proofs ship without it. |
| Legal data (form, capital, RCCM, tax id, publisher, host) | Legal / developer | Not received; legal pages unpublished. |
| Thirteen references cover the new site | Legal | Not confirmed; §2.7 hidden. |
| BRVM quotes redistribution right | Legal | Not confirmed; band hidden. |
| Purge of « SGI/2016-01 » | Legal / RCI | Not on the site (internal documents only). |
| TikTok among the site's networks | ADG | Social icons removed until the real URLs arrive (PLAN decision 7). |
| Carrières section | ADG / RRHA | Not built. |
| Off-scope pages (FAQ, Actualités, Conformité, Vision) sent for compliance control | Dev team | Actualités, Conformité and Vision now use Part III text; FAQ still off-referential. Send the FAQ for control or replace it with the V1.0 text. |

## Open gaps, in one list

**To decide (ADG or owner)**

1. Header taxonomy: 6 grouped entries against the 8 flat entries of II.1.
2. Sama Naffa page head with Sama Naffa's own image (« chartes non mélangées »).
3. Gold and green rules of Part III: confirm the design reading without rules.
4. « Private Office, deuxième porte » (I.2): which door is meant.

**To fix (dev team)**

1. Contact form: connect it to the prospection system (needs the target system).
2. Interface strings outside the referential: get wording approved (contact form, consent line, /analyses filters).
3. /analyses filters: follow the §4 formats once publications carry a format field.

**Blocked on inputs:** FAQ V1.0 text, legal pages, references, BRVM rights, investor
space, Guinée data, Carrières, TikTok, production switch.
