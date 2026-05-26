# Frontend Agent Rules

This document defines working rules for AI coding agents contributing to this
TanStack Start / React codebase. Follow the patterns already present over introducing
cleaner but incompatible abstractions.

---

## Two Modes of Work

Always identify which mode applies before starting. Do not mix them.

### Logic Mode — bridging APIs, services, types, state

- Use TypeScript strictly. Define types and Zod schemas before writing logic.
- All API response shapes must be validated with Zod. Never trust raw responses.
- Map API errors explicitly — handle `AxiosError` status codes, surface useful messages.
- Add only the minimum component needed to exercise and verify the logic. No polish.
- Prefer server functions (`createServerFn`) for data fetching; keep cookie forwarding
intact via `createServerApi`.
- Query keys must be consistent with the existing `['resource', params]` convention.
- For PATCH/update mutations, only send changed fields. For FormData mutations,
follow the existing `toUserUpdateFormData` pattern.

### UI / Design Mode — layout, styling, visual polish

- Do not touch service layer, types, or query logic unless it is actively broken.
- Before writing a single class, read through the existing page and its sibling
components to understand spacing, sizing conventions, and recurring patterns.
- Sizes, spacing, and layout values must be proportional — derive from existing
scale rather than arbitrary pixel values.
- Prefer fewer Tailwind classes and shallower nesting. If you need more than three
levels of nesting in JSX, reconsider the structure.
- If a component library (e.g. shadcn) is present, treat it as already themed.
Do not override its variables or add wrapper styles that fight the theme.
- When a component library is absent, use CSS custom properties or a minimal utility
layer consistent with what already exists.

---

## Project Structure

```bash
src/
├── routes/           # File-based routes (TanStack Router)
│   ├── __root.tsx
│   ├── (public)/
│   ├── (apps)/
│   └── (users)/
├── pages/            # Page and section components, colocated by domain
├── services/         # API layer: *.ts (hooks/queryOptions) + *.functions.ts
├── types/            # TypeScript types + Zod schemas, colocated by domain
├── components/       # Shared/reusable components
│   └── ui/           # Component library files (do not edit unless intentional)
├── hooks/            # Shared hooks
└── lib/              # Utilities
```

Route files are thin — they import a page component and optionally define a `loader`
or `beforeLoad`. Business logic lives in `services/`, not in route files.

---

## Service Layer Conventions

Two files per domain:

- `*.functions.ts` — `createServerFn` handlers. Always use `createServerApi()` here,
never `createApi()` directly.
- `*.ts` — `queryOptions`, `useMutation` hooks. Client-side only.

`queryOptions` factories are named `useGet<Resource>QueryOptions`.
Mutation hooks are named `use<Action><Resource>Mutation`.

Query params go through `toApiParams` for camelCase → snake_case conversion and
empty value filtering.

---

## SSR Concerns

This codebase runs SSR via TanStack Start. Keep these in mind:

- Never access `window`, `document`, or browser APIs at module level.
Guard with `typeof window !== 'undefined'` or use `useEffect`.
- Theme and locale state that depends on browser storage must be deferred to the
client to avoid hydration mismatches. `suppressHydrationWarning` is already applied
at the root for theme.
- `createServerFn` handlers run on the server — no browser APIs, no client state.
- Do not store user-specific data in module-level singletons; each request must
be isolated (`createServerApi()` is called per request for this reason).
- Data prefetched in `loader` via `queryClient.ensureQueryData` will hydrate on
the client automatically — do not refetch the same data manually on mount.

---

## TypeScript Standards

- No `any`. Use `unknown` and narrow, or define the actual type.
- Prefer `type` over `interface` for API shapes and component props unless
extension is needed.
- Zod schemas live in `types/*.schema.ts`; derived TypeScript types are inferred
via `z.infer`.
- For shared response shapes use existing types: `ListResponse<T>`, `Pagination`,
`MessageResponse`.

---

## General Coding Standards

- Read enough context before editing. Check the domain's existing service, types,
and page files first.
- Batch related changes. Avoid micro-edits that require follow-up patches.
- Do not introduce new abstractions (custom hooks, utility functions, context)
unless reuse across two or more places is immediate and obvious.
- Prefer `rg` for searching the codebase.
