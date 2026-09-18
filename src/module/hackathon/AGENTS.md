# Hackathon

Feature module for hackathon CRUD. Lives under `src/module/hackathon/`.

## Layout

- [hackathon.module.ts](hackathon.module.ts): imported from `AppModule`
- [hackathon.controller.ts](hackathon.controller.ts): `@Controller('hackathon')`
- [hackathon.service.ts](hackathon.service.ts)
- [dto/create-hackathon.dto.ts](dto/create-hackathon.dto.ts): `CreateHackathonDto`

## Rules

`CreateHackathonDto`: `name` min 3; optional `description` 10 to 1000; `startsAt` and `endsAt` as future `Date`s via `@Type(() => Date)` plus `@MinDate(() => new Date())`; optional `isActive`.

DTO date fields are `startsAt` / `endsAt`. Prisma columns are `startDate` / `endDate`. Map at the service boundary, do not rename the DTO to match the table.

_Drafted by /sync from the introducing change, worth a quick human pass._
