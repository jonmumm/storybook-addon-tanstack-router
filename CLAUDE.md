# storybook-addon-tanstack-router

Storybook addon that provides TanStack Router context for stories — decorator, route params, search params, loader data, and navigation logging.

## Tech Stack

- **Language**: TypeScript (strict)
- **Build**: tsup (ESM + CJS)
- **Test**: vitest (jsdom)
- **Lint/Format**: biome
- **Dead code**: knip
- **Pre-commit**: husky + lint-staged
- **Package manager**: pnpm

## Feedback Commands

Run these in order before committing:

1. `pnpm check` — biome lint + format
2. `pnpm typecheck` — tsc --noEmit
3. `pnpm knip` — unused exports/deps
4. `pnpm test` — vitest run
5. `pnpm build` — tsup build

Or all at once: `pnpm verify` (runs 1-4)

## Key Conventions

- **TDD**: Write failing test first, implement, refactor
- **No mocking what we own**: Tests use real TanStack Router APIs (createMemoryHistory, createRouter, etc.)
- **Biome, not ESLint/Prettier**: All formatting and linting via biome
- **Peer deps**: @tanstack/react-router, @storybook/react, react, react-dom are peer deps — never bundled

## Architecture

```
src/
├── index.ts              # Public API barrel export
├── preview.ts            # Storybook preview entry (auto-decorator)
├── types.ts              # TanStackRouterParameters, LocationConfig, etc.
├── constants.ts          # ADDON_ID, PARAM_KEY
├── decorator.tsx         # withTanStackRouter decorator + TanStackRouterDecorator component
├── parameters.ts         # tanstackRouterParameters() type-safe helper
└── utils/
    ├── normalizeLocation.ts      # { path, params, search } → URL string
    └── buildRouteTree.ts         # Config → TanStack route tree
```
