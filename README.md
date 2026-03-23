# storybook-addon-tanstack-router

Storybook addon that provides [TanStack Router](https://tanstack.com/router) context for your stories. Configure route params, search params, and loader data declaratively.

## Install

```bash
pnpm add -D storybook-addon-tanstack-router
```

## Quick Start

### Global decorator (recommended)

```typescript
// .storybook/preview.ts
import { withTanStackRouter } from "storybook-addon-tanstack-router";

export const decorators = [withTanStackRouter];
```

Or register as an addon to auto-apply:

```typescript
// .storybook/main.ts
export default {
  addons: ["storybook-addon-tanstack-router"],
};
```

### Per-story configuration

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import { tanstackRouterParameters } from "storybook-addon-tanstack-router";
import { UserProfile } from "./UserProfile";

const meta: Meta<typeof UserProfile> = {
  component: UserProfile,
};
export default meta;

type Story = StoryObj<typeof UserProfile>;

export const Default: Story = {
  parameters: {
    tanstackRouter: tanstackRouterParameters({
      location: {
        path: "/users/$userId",
        params: { userId: "42" },
        search: { tab: "settings" },
      },
      loader: {
        data: { user: { id: "42", name: "Alice" } },
      },
    }),
  },
};
```

## API

### `withTanStackRouter`

A Storybook decorator that wraps stories with `RouterProvider` and a memory-based router. Apply globally or per-story.

### `tanstackRouterParameters(config)`

Type-safe helper for configuring the addon. Returns the config as-is — it exists purely for TypeScript autocompletion.

#### `config.location`

| Property | Type                      | Description                                 |
| -------- | ------------------------- | ------------------------------------------- |
| `path`   | `string`                  | Route path pattern, e.g. `'/users/$userId'` |
| `params` | `Record<string, string>`  | Route params to substitute into the path    |
| `search` | `Record<string, unknown>` | Search/query params                         |
| `hash`   | `string`                  | URL hash fragment                           |

#### `config.loader`

| Property | Type      | Description                                |
| -------- | --------- | ------------------------------------------ |
| `data`   | `unknown` | Static data returned by the route's loader |

## How It Works

The addon creates a minimal TanStack Router setup for each story:

1. Builds a route tree with `createRootRoute` + `createRoute`
2. Creates a `createMemoryHistory` with the configured location
3. Wraps the story in `RouterProvider`

This means your components can use all TanStack Router hooks (`useParams`, `useSearch`, `useLoaderData`, `useNavigate`, etc.) without any manual setup.

## TanStack Start

This addon handles the **Router** side. If you're using **TanStack Start** (the full-stack framework), you also need to mock server-side code (server functions, SSR, Cloudflare workers) at the Vite config level. See the [storybook-play-testing skill](https://github.com/jonmumm/skills/tree/main/storybook-play-testing) for a complete TanStack Start + Storybook setup guide.

## License

MIT
