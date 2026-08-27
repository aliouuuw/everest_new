# Phase 2 — News job + publish rebuild

## External news

Port of the Convex 6-hour Sika Finance + Madis Invest fetch.

```bash
bun run jobs:fetch-news
```

Upserts by `guid`. Does not wipe older items.

Schedule later with cron (`0 */6 * * * bun run jobs:fetch-news`) or a Payload job.

## Publish → rebuild

`afterChange` on publications, articles, site-content, and external-articles:

- If `SITE_REBUILD_URL` is set, POST that URL (Vercel Deploy Hook).
- If it is not set, log: `bun run build:web`

Vite `/admin` stays until public-page parity is done.
