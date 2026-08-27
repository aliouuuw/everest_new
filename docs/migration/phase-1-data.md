# Phase 1 — Convex data → Payload → Astro pages

## What this phase does

1. Snapshot Convex **dev** (`animated-woodpecker-454`) to JSONL.
2. Import into Payload collections (idempotent by email/slug/guid/contentId).
3. Serve first public pages from Payload at build/dev time.

Convex **production** (`dashing-tern-979`) currently has no documents. We import from the development snapshot.

## Commands

```bash
# 1. CMS must be running on :3001
bun run dev:cms

# 2. Export (optional if scripts/migration/.exports/convex-dev already exists)
bun run migrate:export
unzip -o scripts/migration/.exports/convex-dev.zip -d scripts/migration/.exports/convex-dev

# 3. Import
bun run migrate:import

# 4. Public site
bun run dev:web
```

## URLs

| Page | URL |
|------|-----|
| Home | http://localhost:4321 |
| Publications list | http://localhost:4321/publications |
| Publication | http://localhost:4321/publications/[slug] |
| Actualités list | http://localhost:4321/actualites |
| Article | http://localhost:4321/actualites/[slug] |

## Import notes

- Convex HTML `content` converts to Lexical paragraphs (formatting is flattened).
- Imported Convex users get a random password. They cannot log into Payload until an admin resets it.
- Media table in this snapshot is empty. R2 object import is Phase 2.
- Re-running `migrate:import` updates existing slugs instead of duplicating.
