# Common

Shared NestJS guards, interceptors, pipes, and decorators.

## Layout

- [interceptors/response.interceptor.ts](interceptors/response.interceptor.ts): global JSON envelope `{ statusCode, message, data }`
- [decorators/response-message.decorator.ts](decorators/response-message.decorator.ts): `@ResponseMessage('...')` for a custom message
- [pipes/validation-exception.factory.ts](pipes/validation-exception.factory.ts): `exceptionFactory` that maps class-validator errors to `{ property, message }[]`

## Rules

Register the interceptor in `src/main.ts` with `useGlobalInterceptors` and the app `Reflector`. Default message is `Success`. `StreamableFile` is not wrapped. Better Auth at `/api/auth` is middleware, not a controller, so it is not wrapped.

Register the global `ValidationPipe` in `src/main.ts` with `whitelist`, `transform`, and `validationExceptionFactory`. The 400 `message` is `{ property, message }[]`.

_Drafted by /sync from the introducing change, worth a quick human pass._
