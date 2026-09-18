# Hackathon

Feature module for hackathon CRUD. Lives under `src/module/hackathon/`.

## Layout

- [hackathon.module.ts](hackathon.module.ts): imported from `AppModule`
- [hackathon.controller.ts](hackathon.controller.ts): `@Controller('hackathon')`. `AuthGuard` on the class. `@Roles(['ADMIN'])` on write, `@Roles(['PARTICIPANT'])` on join
- [hackathon.service.ts](hackathon.service.ts): CRUD plus `join`. `create` takes `authorId` from the session
- [dto/create-hackathon.dto.ts](dto/create-hackathon.dto.ts): `CreateHackathonDto`
- [dto/update-hackathon.dto.ts](dto/update-hackathon.dto.ts): `UpdateHackathonDto`, all fields optional

## Rules

Read: any authenticated user, `GET /hackathon` and `GET /hackathon/:id`. Write: `ADMIN` only, `POST /hackathon`, `PATCH /hackathon/:id`, `DELETE /hackathon/:id`. Join: `PARTICIPANT` only, `POST /hackathon/:id/join`. Hackathon must exist, `isActive` true, `endDate` not passed. Duplicate join on `@@unique([hackathonId, userId])` is `BadRequestException`.

`CreateHackathonDto`: `name` min 3; optional `description` 10 to 1000; `startsAt` and `endsAt` as future `Date`s via `@Type(() => Date)` plus `@MinDate(() => new Date())`; optional `isActive`.

DTO date fields are `startsAt` / `endsAt`. Prisma columns are `startDate` / `endDate`. Map at the service boundary, do not rename the DTO to match the table.

_Drafted by /sync from the introducing change, worth a quick human pass._
