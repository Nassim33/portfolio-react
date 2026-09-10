# Project Instructions

## Stack

This is a modern frontend application built with:

- React
- TypeScript
- Vite
- TanStack Query
- Zustand
- Zod

## General principles

Write production-quality TypeScript.

Prefer simple, explicit and maintainable solutions.

Do not introduce dependencies unless they provide clear value.

Do not use `any` unless absolutely unavoidable.

Prefer composition over inheritance.

Prefer small, focused components.

Keep business logic out of UI components when possible.

Avoid unnecessary abstractions.

Do not create generic utilities prematurely.

---

## React

Follow Vercel React Best Practices.

Prioritize:

1. Eliminating request waterfalls
2. Reducing bundle size
3. Avoiding unnecessary re-renders
4. Efficient rendering
5. Proper memoization only when justified

Do not use `useMemo` or `useCallback` by default.

Only use memoization when there is a measurable or obvious reason.

Prefer derived values over duplicated state.

Keep components pure.

Prefer controlled data flow.

Avoid deeply nested component structures.

---

## TypeScript

Use strict TypeScript.

Prefer:

- interfaces for object contracts when appropriate
- type aliases for unions
- discriminated unions
- generics when they improve safety
- `unknown` instead of `any`

Never silence TypeScript errors with:

```ts
@ts-ignore