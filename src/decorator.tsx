import type { Decorator } from "@storybook/react";
import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { PARAM_KEY } from "./constants.js";
import type { TanStackRouterParameters } from "./types.js";
import { buildRouteTree } from "./utils/buildRouteTree.js";
import { normalizeLocation } from "./utils/normalizeLocation.js";

/**
 * Internal component that creates and provides the TanStack Router context.
 */
function TanStackRouterDecorator({
	storyFn,
	config,
}: {
	storyFn: () => React.JSX.Element;
	config?: TanStackRouterParameters;
}) {
	const routeTree = buildRouteTree(storyFn, config);

	const initialEntry = config?.location ? normalizeLocation(config.location) : "/";

	const memoryHistory = createMemoryHistory({
		initialEntries: [initialEntry],
	});

	const router = createRouter({
		routeTree,
		history: memoryHistory,
	});

	return <RouterProvider router={router} />;
}

/**
 * Storybook decorator that wraps stories with TanStack Router context.
 *
 * Can be applied globally in preview.ts or per-story.
 *
 * @example
 * ```typescript
 * // Global usage in .storybook/preview.ts
 * import { withTanStackRouter } from 'storybook-addon-tanstack-router'
 * export const decorators = [withTanStackRouter]
 *
 * // Per-story parameters
 * export const MyStory: Story = {
 *   parameters: {
 *     tanstackRouter: tanstackRouterParameters({
 *       location: { path: '/users/$userId', params: { userId: '42' } },
 *     }),
 *   },
 * }
 * ```
 */
export const withTanStackRouter: Decorator = (Story, context) => {
	const config = context.parameters?.[PARAM_KEY] as TanStackRouterParameters | undefined;

	return <TanStackRouterDecorator storyFn={Story} config={config} />;
};
