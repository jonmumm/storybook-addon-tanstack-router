# storybook-addon-tanstack-router

Storybook addon that provides TanStack Router context for stories — decorator, route params, search params, loader data, and navigation logging.

## Tech Stack

- **Toolchain**: vite-plus (format, lint, type-check, test, pack — all via `vp`)
- **Dead code**: knip
- **Package manager**: pnpm

## Feedback Commands

Run these in order before committing:

1. `pnpm check` — vp check (format + lint + type-check in one pass)
2. `pnpm knip` — unused exports/deps
3. `pnpm test` — vp test (vitest)
4. `pnpm build` — vp pack (tsdown)

Or all at once: `pnpm verify` (runs 1-3)

## Key Conventions

- **TDD**: Write failing test first, implement, refactor
- **No mocking what we own**: Tests use real TanStack Router APIs (createMemoryHistory, createRouter, etc.)
- **Vite+, not ESLint/Prettier/Biome**: All formatting and linting via vp check
- **Peer deps**: @tanstack/react-router, @storybook/react, react, react-dom are peer deps — never bundled

## Architecture

```
src/
├── index.ts              # Public API barrel export
├── preview.ts            # Storybook preview entry (auto-decorator)
├── types.ts              # TanStackRouterParameters, LocationConfig, etc.
├── constants.ts          # PARAM_KEY
├── decorator.tsx         # withTanStackRouter decorator + TanStackRouterDecorator component
├── parameters.ts         # tanstackRouterParameters() type-safe helper
└── utils/
    ├── normalizeLocation.ts      # { path, params, search } → URL string
    └── buildRouteTree.ts         # Config → TanStack route tree
```
