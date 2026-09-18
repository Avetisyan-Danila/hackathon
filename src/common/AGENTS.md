# Common

Shared NestJS guards, interceptors, and decorators.

## Layout

- [interceptors/response.interceptor.ts](interceptors/response.interceptor.ts): global JSON envelope `{ statusCode, message, data }`
- [decorators/response-message.decorator.ts](decorators/response-message.decorator.ts): `@ResponseMessage('...')` for a custom message
- [schema/api-response.schema.ts](schema/api-response.schema.ts): OpenAPI `ApiResponseDto` and `@ApiWrappedOkResponse()`

## Rules

Register the interceptor in `src/main.ts` with `useGlobalInterceptors` and the app `Reflector`. Default message is `Success`. `StreamableFile` is not wrapped. Better Auth at `/api/auth` is middleware, not a controller, so it is not wrapped.

Document wrapped 200 responses with `@ApiWrappedOkResponse(Dto)` (or `{ isArray: true }`), not `@ApiOkResponse({ type: Dto })`.

_Drafted by /sync from the introducing change, worth a quick human pass._
