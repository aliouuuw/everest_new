# Home media placeholders

Status: **placeholders**, re-sourced 23 Oct 2026 after the critique (in-theme West
African subjects). Higgsfield was not connected. Replace them with generated or
cleared house imagery before any merge to `main`.

All four are public domain or CC0, so no attribution is legally required. They are
cropped and graded forest to paper by a PIL gradient map, decorative (`alt=""`,
`aria-hidden`), and carry no public text. The postcard's printed caption and credit
are cropped out.

| File in `public/home/` | Expertise frame | Source | Author | Licence |
|---|---|---|---|---|
| `exp-mtp.webp`, `-sm` | Marché des Titres Publics | [Dakar-Aerial1.jpg](https://commons.wikimedia.org/wiki/File:Dakar-Aerial1.jpg) | Ji-Elle | Public domain |
| `exp-brvm.webp`, `-sm` | Marché Financier Régional (BRVM) | [Abidjan Plateau.png](https://commons.wikimedia.org/wiki/File:Abidjan_Plateau.png) | ព្រះមហាក្សត្ររាជ | CC0 |
| `exp-structuration.webp`, `-sm` | Structuration & Ingénierie Financière | [Tour F en construction en janvier 2024 à Abidjan 01.jpg](https://commons.wikimedia.org/wiki/File:Tour_F_en_construction_en_janvier_2024_%C3%A0_Abidjan_01.jpg) | Dadrik | CC0 |
| `exp-private.webp`, `-sm` | Private Office | [Tombouctou-Arrivée d'une caravane de sel (AOF).jpg](https://commons.wikimedia.org/wiki/File:Tombouctou-Arriv%C3%A9e_d%27une_caravane_de_sel_(AOF).jpg) | François-Edmond Fortier (1862-1928) | Public domain |

The summit-line drawings (chain roof, routes, closing roof) are drawn for this site
in `HomeReferentiel.tsx` from the logo's geometry and have no external source.

# Inner page heads (23 Oct 2026)

Same status and treatment: **placeholders**, public domain or CC0, graded forest to
paper (gradient map), decorative (`alt=""`, `aria-hidden`), no public text. Files in
`public/pages/`: `head-<name>-lg.webp` (2400 px, or the source width) and `-sm.webp` (1200 px), cropped 2:1.

| Name | Page | Source | Author | Licence |
|---|---|---|---|---|
| `hub` | Expertises | [Le port de Dakar - btv1b10103360k.jpg](https://commons.wikimedia.org/wiki/File:Le_port_de_Dakar_-_btv1b10103360k.jpg) | Unknown (BnF Gallica) | Public domain |
| `mtp` | Marché des Titres Publics | [Dakar-Aerial1.jpg](https://commons.wikimedia.org/wiki/File:Dakar-Aerial1.jpg) | Ji-Elle | Public domain |
| `brvm` | Marché Financier Régional (BRVM) | [Abidjan Plateau.png](https://commons.wikimedia.org/wiki/File:Abidjan_Plateau.png) | ព្រះមហាក្សត្ររាជ | CC0 |
| `structuration` | Structuration & Ingénierie Financière | [Tour F en construction en janvier 2024 à Abidjan 01.jpg](https://commons.wikimedia.org/wiki/File:Tour_F_en_construction_en_janvier_2024_%C3%A0_Abidjan_01.jpg) | Dadrik | CC0 |
| `private` | Private Office | [Tombouctou-Arrivée d'une caravane de sel (AOF).jpg](https://commons.wikimedia.org/wiki/File:Tombouctou-Arriv%C3%A9e_d%27une_caravane_de_sel_(AOF).jpg) | François-Edmond Fortier | Public domain |
| `opps` | Opportunités | [Dakar-HarbourAerial.jpg](https://commons.wikimedia.org/wiki/File:Dakar-HarbourAerial.jpg) | Ji-Elle | Public domain |
| `contact` | Contact / Devenir client | [DakarPlateau.JPG](https://commons.wikimedia.org/wiki/File:DakarPlateau.JPG) (cropped to the skyline) | Ji-Elle | Public domain |
| `sama` + film `sama.webm`, `sama.mp4`, `sama-poster.webp` | Sama Naffa | [Sénégal - Bargny, un littoral menacé par la pollution et l'érosion côtière (1).webm](https://commons.wikimedia.org/wiki/File:S%C3%A9n%C3%A9gal_-_Bargny,_un_littoral_menac%C3%A9_par_la_pollution_et_l%27%C3%A9rosion_c%C3%B4ti%C3%A8re_(1).webm), 3.1 to 6.0 s, cropped to remove the VOA logo, no audio | VOA Afrique | Public domain (US government work) |

The film plays once, on desktop only, when reduced motion and Save-Data are off
(script in `apps/web/src/layouts/Layout.astro`). The still is the default.
Public-domain video on Commons is thin (mostly news and military b-roll); CC BY and
BY-SA clips were skipped because they need an on-page credit the referential does not have.
