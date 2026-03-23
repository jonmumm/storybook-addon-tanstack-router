import { createRootRoute, createRoute } from "@tanstack/react-router";
import type { TanStackRouterParameters } from "../types.js";

/**
 * Builds a TanStack Router route tree from addon parameters.
 *
 * Creates a root route with an Outlet, and a child route that renders the story
 * component. Configures loader data and permissive search validation.
 */
export function buildRouteTree(
	storyComponent: () => React.JSX.Element,
	config?: TanStackRouterParameters,
) {
	const rootRoute = createRootRoute();

	const path = config?.location?.path ?? "/";
	const loaderData = config?.loader?.data;

	const storyRoute = createRoute({
		getParentRoute: () => rootRoute,
		path,
		component: storyComponent,
		...(loaderData !== undefined && {
			loader: () => loaderData,
		}),
		validateSearch: (search: Record<string, unknown>) => search,
	});

	return rootRoute.addChildren([storyRoute]);
}
