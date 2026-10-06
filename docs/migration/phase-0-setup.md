# Phase 0 — Local setup

Branch: `feat/astro-payload-migration`  
Legacy Vite app stays at repo root until cutover.

## Prerequisites

- Bun 1.4+ (`bun --version`)
- Docker Desktop running (for PostgreSQL)

## First run (~5 minutes)

```bash
# 1. Start Postgres (Docker Desktop must be running)
bun run db:up

# 2. CMS env
cp apps/cms/.env.example apps/cms/.env

# 3. Web env
cp apps/web/.env.example apps/web/.env

# 4. Install all workspace deps
bun install

# 5. Seed admin user (after Postgres is healthy)
bun run seed:admin
bun run seed:site-content
bun run seed:publications

# 6. Start CMS + Astro (two terminals or one command)
bun run dev:migration
```

## URLs

| Service | URL |
|---------|-----|
| Astro (public) | http://localhost:4321 |
| Payload admin | http://localhost:3001/admin |
| Payload REST | http://localhost:3001/api |

## Default admin (local only)

| Field | Value |
|-------|-------|
| Email | `admin@everest-finance.sn` |
| Password | `EverestAdmin2026!` |

Override via `SEED_ADMIN_*` in `apps/cms/.env`.

## What Phase 0 includes

- [x] `apps/web` — Astro + Tailwind v4 + React islands
- [x] `apps/cms` — Payload 3 + PostgreSQL
- [x] Collections mapped from Convex schema
- [x] `docker-compose.yml` — Postgres only
- [x] Admin seed script
- [x] R2 S3 adapter (Phase 4). Optional: set `R2_*` in `apps/cms/.env`. Unset keeps local `apps/cms/media`.
- [x] Convex data import (Phase 1)
- [x] Public pages port (Phase 3)

## Legacy app (unchanged)

```bash
bun run dev          # Vite on :3000 (Convex SPA)
bun run convex:dev   # Convex backend
```

Production still runs on Vercel + Convex until cutover.
