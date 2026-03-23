import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import {
	createMemoryHistory,
	createRouter,
	RouterProvider,
	useLoaderData,
} from "@tanstack/react-router";
import { afterEach, describe, expect, it } from "vitest";
import { buildRouteTree } from "./buildRouteTree.js";

afterEach(cleanup);

function renderWithRouter(
	storyComponent: () => React.JSX.Element,
	config?: Parameters<typeof buildRouteTree>[1],
	initialEntry = "/",
) {
	const routeTree = buildRouteTree(storyComponent, config);
	const router = createRouter({
		routeTree,
		history: createMemoryHistory({ initialEntries: [initialEntry] }),
	});
	return render(<RouterProvider router={router} />);
}

describe("buildRouteTree", () => {
	it("renders the story component at the root path", async () => {
		function StoryComponent() {
			return <div>Hello Story</div>;
		}

		renderWithRouter(StoryComponent);
		expect(await screen.findByText("Hello Story")).toBeInTheDocument();
	});

	it("renders the story component at a custom path", async () => {
		function StoryComponent() {
			return <div>Custom Path</div>;
		}

		renderWithRouter(StoryComponent, { location: { path: "/about" } }, "/about");
		expect(await screen.findByText("Custom Path")).toBeInTheDocument();
	});

	it("provides loader data to the story component", async () => {
		const mockData = { user: { id: "42", name: "Alice" } };

		function StoryComponent() {
			const data = useLoaderData({ from: "/users/$userId" });
			return <div>User: {(data as typeof mockData).user.name}</div>;
		}

		renderWithRouter(
			StoryComponent,
			{
				location: { path: "/users/$userId" },
				loader: { data: mockData },
			},
			"/users/42",
		);
		expect(await screen.findByText("User: Alice")).toBeInTheDocument();
	});

	it("passes through search params via permissive validateSearch", async () => {
		function StoryComponent() {
			return <div>Search Story</div>;
		}

		// Should not throw with arbitrary search params
		renderWithRouter(StoryComponent, { location: { path: "/" } }, "/?tab=settings&page=2");
		expect(await screen.findByText("Search Story")).toBeInTheDocument();
	});
});
