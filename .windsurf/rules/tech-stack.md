---
trigger: always_on
---

<tech_stack>

## Core
- **Language:** TypeScript 5.9
- **Runtime:** Bun
- **Package Manager:** Bun (workspaces)
- **Monorepo:** apps/api, apps/web, packages/database, packages/shared

## Frontend (apps/web)
- **Framework:** React 19 + Vite (rolldown-vite)
- **Routing:** TanStack Router
- **Server State:** TanStack Query
- **Workflow State:** XState 5
- **Styling:** TailwindCSS 4
- **Icons:** Lucide React
- **i18n:** i18next + react-i18next (fr primary, en secondary)
- **Font:** Plus Jakarta Sans

## Backend (apps/api)
- **Framework:** Hono
- **ORM:** Drizzle ORM
- **Database:** PostgreSQL
- **Auth:** better-auth
- **PDF:** PDFKit
- **QR:** qrcode

## Packages
- **@prescriptos/database:** Drizzle schema, migrations, seed
- **@prescriptos/shared:** Shared types, validators (Zod)

## Testing (TO BE SET UP)
- **Unit:** Vitest (planned)
- **E2E:** Playwright (planned)

</tech_stack>

<coding_conventions>

## Code Style
- React is view layer only — no business logic in components
- No useEffect for workflows — use XState state machines
- Server state in TanStack Query, never duplicated locally
- Audit trails mandatory for all healthcare operations
- Immutability enforced for validated prescriptions
- French is the primary UI language

## File Organization
- Features in `apps/web/src/features/{domain}/`
- Services in `apps/api/src/services/`
- Routes in `apps/api/src/routes/`
- Shared types in `packages/shared/src/`

## Git Workflow
- Commit format: `type(scope): description` (conventional commits)
- Types: feat, fix, docs, test, refactor, chore
- Run `tsc --noEmit` before committing

## Verification Commands
```bash
# Type check all packages
bun run type-check

# Type check API
cd apps/api && bunx tsc --noEmit

# Type check Web
cd apps/web && bunx tsc --noEmit

# Run dev servers
bun run dev

# Database migrations
bun run db:migrate
```

</coding_conventions>
