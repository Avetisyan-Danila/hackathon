# Prisma

Postgres via Prisma ORM 7 and `@prisma/adapter-pg`. App code injects `PrismaService`; it does not construct `PrismaClient`.

## Layout

- [prisma.module.ts](prisma.module.ts): `@Global()` `PrismaModule`. Import once from `AppModule`
- [prisma.service.ts](prisma.service.ts): extends generated `PrismaClient`, passes `PrismaPg` in `super({ adapter })`, `$connect()` on init
- [prisma/schema.prisma](../../../prisma/schema.prisma): models and `generator` output `src/generated/prisma`
- [prisma7.config.ts](../../../prisma7.config.ts): CLI config. `DATABASE_URL` via `env()`. Prisma 7.10 reads this file before `prisma.config.ts`

## Rules

Pin `prisma@7` and `@prisma/client@7`. Unpinned `npx prisma` installs Prisma 8 RC (no `schema.prisma`, no `migrate` / `generate`).

Import the client from `src/generated/prisma/client.js`, not from `@prisma/client`. That folder is gitignored; `postinstall` and `build` run `prisma generate`.

`DATABASE_URL` is the Prisma Postgres pooled TCP URL in `.env`. Do not hardcode it.

Better Auth owns `User`, `Session`, `Account`, `Verification`, and `UserRole` in `schema.prisma`. Add app models there, then `npx prisma@7 migrate dev`.

_Drafted by /sync from the introducing change, worth a quick human pass._
