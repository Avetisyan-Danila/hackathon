# Auth

Better Auth with the NestJS adapter `@thallesp/nestjs-better-auth`. Email and password. Cookie sessions. Prisma adapter on the injected `PrismaService`.

## Layout

- [create-auth.ts](create-auth.ts): `createAuth(prisma)` factory. App code injects `PrismaService` and does not construct `PrismaClient`
- [auth.ts](auth.ts): CLI entry only (`export const auth`). `npx auth@1.7.5 generate --config src/lib/auth/auth.ts` needs this file
- `AuthModule.forRootAsync` in `AppModule`, `inject: [PrismaService]`
- `bodyParser: false` in `main.ts` (required). The adapter re-adds parsers for non auth routes
- Global `AuthGuard`. Public routes use `@AllowAnonymous()`. Session via `@Session()`
- [user.controller.ts](../../module/user/user.controller.ts): `GET /users/me`

## Rules

Match installed `better-auth@1.7.5`. Re-run `npx auth@1.7.5 generate --config src/lib/auth/auth.ts --output prisma/schema.prisma --yes` after plugin or `additionalFields` changes, then `npx prisma@7 migrate dev`.

`user.role` is `UserRole` (`PARTICIPANT` | `ADMIN`), default `PARTICIPANT`. `input: false` so sign-up cannot set it. Change role through Prisma, not through Better Auth input.

`BETTER_AUTH_SECRET` and `BETTER_AUTH_URL` come from `.env`. Do not hardcode them. Do not set `secret` or `baseURL` in config while those env vars exist.

Auth HTTP lives at `/api/auth`. Check `GET /api/auth/ok`.

## Agent skills

- [better-auth-best-practices](../../../.grok/skills/better-auth-best-practices/): Better Auth config, adapters, sessions, plugins
- [create-auth](../../../.grok/skills/create-auth/): scaffold Better Auth in a TypeScript app

_Drafted by /sync from the introducing change, worth a quick human pass._
