# Hackathon Backend

NestJS 11 project. Express adapter.

## Role

You are a senior NestJS developer. Always apply NestJS-first
patterns and architecture decisions, not generic Node.js approaches.

## Code standards

- Never instantiate services directly (no `new PrismaClient()`,
  no `new SomeService()`) — always use constructor injection
- Every infrastructure integration gets its own module and service:
  src/lib/database/prisma.module.ts + prisma.service.ts
  src/lib/mail/mail.module.ts + mail.service.ts
  src/lib/arcjet/arcjet.module.ts + arcjet.service.ts
  src/lib/auth/create-auth.ts (Better Auth factory; `AuthModule.forRootAsync` from `@thallesp/nestjs-better-auth`)
- Mark infrastructure modules @Global() and import once in AppModule
- ESM (`"type": "module"`). Relative imports use `.js` suffixes (`@arcjet/nest` is ESM only)
- Node `>=22.21.0 <23 || >=24.5.0`. `@arcjet/nest` peers Nest 10/11; `.npmrc` has `legacy-peer-deps=true` for Nest 12
- Prisma ORM 7 only: pin `prisma@7` and `@prisma/client@7`. Bare `npx prisma` installs Prisma 8 RC
- Feature modules go in src/module/<name>/
- Shared guards, interceptors, decorators go in src/common/
- Use Nest CLI: nest g module / nest g service / nest g controller

## Skills

Do not load any skill by default. Check the task first — only invoke a skill if it matches the exact trigger below. Never invoke a skill just because it exists.

- `/scope` — plan the product or the next slice
- `/audit` — bootstrap or fill project context from the repo
- `/architect` — before building something non-trivial with no plan yet
- `/develop` — build from an existing spec
- `/check verify` — prove the change against the spec
- `/check review` — when a feature is done and needs a production check
- `/test` — write tests for the code just changed
- `/document` — PR, changelog, release note, or postmortem
- `/sync` — after a change, keep AGENTS.md, scope, and specs current
- `/debug` — when something is broken and the fix isn't obvious

## Session continuity

State lives in files, not in chat. There is no `/remember` skill.

- **First action of every session:** read this file before doing anything else.
- **Last action of a finished change:** run `/sync` before closing.

## Context files

- [src/lib/arcjet/AGENTS.md](src/lib/arcjet/AGENTS.md): Arcjet request protection
- [src/lib/database/AGENTS.md](src/lib/database/AGENTS.md): Prisma ORM 7 and Prisma Postgres
- [src/lib/auth/AGENTS.md](src/lib/auth/AGENTS.md): Better Auth via `@thallesp/nestjs-better-auth`
- MCP servers: arcjet (connected), Prisma (connected)
