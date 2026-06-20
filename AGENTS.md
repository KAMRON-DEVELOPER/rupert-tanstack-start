# Frontend Agent Rules

Rules for AI coding agents working on this TanStack Start / React codebase.
Follow patterns already present over introducing new abstractions

---

<!-- intent-skills:start -->
## Skill Loading

Before substantial work:

- Skill check: run `npx @tanstack/intent@latest list`, or use skills already
  listed in context.
- Skill guidance: if one local skill clearly matches the task, run
  `npx @tanstack/intent@latest load <package>#<skill>` and follow the returned `SKILL.md`.
- Monorepos: when working across packages, run the skill check from the workspace
  root and prefer the local skill for the package being changed.
- Multiple matches: prefer the most specific local skill for the package or concern
  you are changing; load additional skills only when the task spans multiple
  packages or concerns.
<!-- intent-skills:end -->

---

## Two Modes of Work

Identify which mode applies before starting. Do not mix them.

### Logic Mode — APIs, state, types, data

- Define TypeScript types and Zod schemas **before** writing logic.
- All API responses must be validated with Zod. Never trust raw data.
- Use `createServerFn` for server-side fetching; always call
  `createServerApi()` inside `.functions.ts` files — never `createApi()`.
- Handle `AxiosError` status codes explicitly; surface useful messages.
- Add only the minimum UI needed to verify logic. No polish in this mode.
- Query keys follow `['resource', id?, subresource?]` — match existing ones.
- For PATCH mutations, send only changed fields.

### UI Mode — layout, styling, visual polish

- Do not touch service layer, types, or query logic unless it is broken.
- Read the target page and its siblings before writing a single class.
- Derive spacing and sizing from the existing scale — no arbitrary values.
- Prefer fewer Tailwind classes and shallower JSX nesting (max 3 levels).
- Treat shadcn/ui as already themed — do not override its CSS variables.

---

## Project Structure

```text
src/
├── routes/        # File-based routes (TanStack Router)
├── pages/         # Page and section components, colocated by domain
├── api/           # Service layer: *.ts (hooks) + *.functions.ts (server)
├── types/         # Zod schemas + inferred TS types, colocated by domain
├── components/    # Shared components; ui/ is generated — edit with care
├── hooks/         # Shared hooks (including WebSocket)
└── lib/           # Utilities
```

Route files are thin — they import a page component and optionally define
a `loader` or `beforeLoad`. All business logic lives in `api/`.

---

## Service Layer

Two files per domain:

- `*.functions.ts` — `createServerFn` handlers. Always use
  `createServerApi()` here for cookie-forwarding SSR correctness.
- `*.ts` — `queryOptions` factories and `useMutation` hooks (client only).

Naming conventions:

| Kind          | Pattern                         |
| ------------- | ------------------------------- |
| Query options | `useGet<Resource>QueryOptions`  |
| Mutation hook | `use<Action><Resource>Mutation` |

Query params go through `toApiParams` for camelCase → snake_case
conversion and empty-value filtering.

---

## Types and Schemas

- Schemas live in `types/<domain>/<name>.ts`; types are inferred with
  `z.infer<typeof schema>`.
- No `any`. Use `unknown` and narrow, or define the actual type.
- Prefer `type` over `interface` for API shapes and props.
- Reuse shared building blocks: `baseSchema`, `paginationQuerySchema`,
  `paginatedResponseSchema<T>`, `messageResponseSchema`, `uuid`,
  `isoDateTime`.

---

## WebSocket System

The WebSocket layer is split into four concerns — do not collapse them.

| File / folder          | Responsibility                               |
| ---------------------- | -------------------------------------------- |
| `connection.ts`        | Lifecycle, heartbeat, Zod parsing, send()    |
| `eventBus.ts`          | Typed mitt bus (no React imports)            |
| `events/`              | Zod schemas for incoming and outgoing events |
| `handlers/<domain>.ts` | Query-cache mutations per domain             |
| `index.tsx`            | `WebSocketProvider`, `useWebSocket()`,       |
|                        | `useWebSocketEvent()`                        |

Rules:

- `connection.ts` and `eventBus.ts` must have **zero React imports**.
- Adding a new domain means adding a handler file and registering it in
  the provider `useEffect` — nothing else changes.
- Components never touch the socket directly. They call `send()` from
  `useWebSocket()` and subscribe via `useWebSocketEvent(type, handler)`.
- New outgoing events: add a Zod schema in `outgoing-events.ts`, extend
  the discriminated union, export the inferred type.
- New incoming events: same pattern in `incoming-events.ts`.

---

## SSR Rules

- Never access `window`, `document`, or browser APIs at module level.
  Guard with `typeof window !== 'undefined'` or use `useEffect`.
- `createServerFn` handlers run on the server — no browser APIs.
- Do not store user-specific data in module-level singletons;
  `createServerApi()` is called per request deliberately.
- Data prefetched via `loader` → `queryClient.ensureQueryData` hydrates
  automatically — do not refetch the same key on mount.

---

## TanStack Router Conventions

- File-based routing only. Never edit `routeTree.gen.ts`.
- Route files are thin — loaders prefetch, `beforeLoad` guards.
- Use `(group)/` directories for organisation without affecting URLs.
- Use `_layout.tsx` pathless layouts for shared guards or wrappers.

Current top-level route groups: `(public)`, `(apps)`, `(users)`,
`(admin)`. Prefer extending an existing group over creating a new one.

---

## General Agent Behaviour

- Read enough context before editing: check domain's `api/`, `types/`,
  and `pages/` files first. Use `rg` to search the codebase.
- Batch related changes — avoid micro-edits that need follow-up patches.
- Do not introduce new abstractions (hooks, utils, context) unless
  immediate reuse across two or more call sites is obvious.
- Match existing naming conventions exactly.

## Stack Constraints

- **Zod** is the only validation library. Every external data boundary
  (API responses, WebSocket frames, route search params) must go through
  a Zod schema. Do not use `as`, type assertions, or raw casts to bypass
  this.
- **shadcn/ui** is the component library. Use its primitives before
  writing custom ones. Do not override its CSS variables or wrap its
  components in styles that fight the theme.
