import type { TanStackRouterParameters } from "./types.js";

/**
 * Type-safe helper for configuring TanStack Router parameters in stories.
 *
 * @example
 * ```typescript
 * export const MyStory: Story = {
 *   parameters: {
 *     tanstackRouter: tanstackRouterParameters({
 *       location: {
 *         path: '/users/$userId',
 *         params: { userId: '42' },
 *         search: { tab: 'settings' },
 *       },
 *       loader: { data: { user: { id: '42', name: 'Alice' } } },
 *     }),
 *   },
 * }
 * ```
 */
export function tanstackRouterParameters(
  config: TanStackRouterParameters,
): TanStackRouterParameters {
  return config;
}
