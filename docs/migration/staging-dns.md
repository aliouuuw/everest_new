# Staging: staging.everestfin.com

WordPress stays on `everestfin.com` / `www` at Gandi. Only the **staging** subdomain points at Vercel.

## Gandi (do not change apex / www)

| Type  | Host      | Value |
|-------|-----------|--------|
| CNAME | `staging` | `66e7bcf8cad27acc.vercel-dns-017.com.` (preferred) or `cname.vercel-dns.com.` |
| TXT   | `_vercel` | Value shown in Vercel → everest-web → Domains |

## Vercel

- Project: **everest-web** (unified Astro + Payload)
- Git branch: **staging** → Preview deploys
- Domain: **staging.everestfin.com** bound to branch `staging`

## URLs

- Site: https://staging.everestfin.com
- Admin: https://staging.everestfin.com/admin

## Local

- Dev: `bun run dev:migration` (unchanged)
- Pulled Vercel dev env: `.env.vercel` (gitignored, `vercel env pull`)
- Optional staging build: uncomment staging lines in `apps/web/.env`
