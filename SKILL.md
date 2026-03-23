---
name: storybook-addon-tanstack-router
description: >
  Use storybook-addon-tanstack-router to provide TanStack Router context in
  Storybook stories. Covers decorator setup, route params, search params,
  loader data, and integration with TanStack Start. Use when writing stories
  for components that use TanStack Router hooks (useParams, useSearch,
  useLoaderData, useNavigate).
---

# storybook-addon-tanstack-router

Provides TanStack Router context for Storybook stories via a decorator and type-safe parameter helper.

## Installation

```bash
pnpm add -D storybook-addon-tanstack-router
```

## Usage

### Global decorator

```typescript
// .storybook/preview.ts
import { withTanStackRouter } from "storybook-addon-tanstack-router";
export const decorators = [withTanStackRouter];
```

### Per-story parameters

```typescript
import { tanstackRouterParameters } from "storybook-addon-tanstack-router";

export const UserProfile: Story = {
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

### Default (no config)

Stories that don't need routing just work — the decorator provides a minimal router at `/`:

```typescript
export const Simple: Story = {
  // No tanstackRouter parameters needed
};
```

## API Reference

### `tanstackRouterParameters(config)`

| Config     | Property | Type                      | Description                                |
| ---------- | -------- | ------------------------- | ------------------------------------------ |
| `location` | `path`   | `string`                  | Route path pattern (e.g. `/users/$userId`) |
|            | `params` | `Record<string, string>`  | Route params                               |
|            | `search` | `Record<string, unknown>` | Query string params                        |
|            | `hash`   | `string`                  | URL hash fragment                          |
| `loader`   | `data`   | `unknown`                 | Static loader data                         |

## TanStack Start Integration

This addon handles Router context only. For TanStack Start (SSR, server functions, Cloudflare workers), you also need Vite-level mocking. See `/storybook-play-testing` skill for the complete setup.
