# Arcjet

Request protection for the NestJS HTTP API. `@arcjet/nest` via `protect()`.

## Layout

- [arcjet.module.ts](arcjet.module.ts): `@Global()` `ArcjetInfraModule`. Loads `.env`, registers `ArcjetModule.forRootAsync`, `APP_GUARD` = `ArcjetGuard`
- [arcjet.service.ts](arcjet.service.ts): injects `ARCJET`, exposes `protect()`
- [arcjet.logger.ts](arcjet.logger.ts): Nest `Logger` adapter for the SDK

## Rules

Default rules on every request (mode from `ARCJET_MODE`, default `DRY_RUN`):

- `shield()` WAF
- `slidingWindow({ max: 20, interval: "10s" })`

`DRY_RUN` logs and appears in Arcjet request logs but does not block. Set `ARCJET_MODE=LIVE` to enforce.

`ARCJET_KEY` comes from `.env` (site `hackathon`). Do not hardcode it.

Remote rules (MCP `create-rule`) only fire where the app already calls `protect()`. Guard policies / `guard()` are not used here.

_Drafted by /sync from the introducing change, worth a quick human pass._
