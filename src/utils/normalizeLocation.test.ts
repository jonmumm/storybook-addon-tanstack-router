import { describe, expect, it } from "vitest";
import { normalizeLocation } from "./normalizeLocation.js";

describe("normalizeLocation", () => {
	it("returns '/' when no config is provided", () => {
		expect(normalizeLocation({})).toBe("/");
	});

	it("returns the path as-is when no params or search", () => {
		expect(normalizeLocation({ path: "/about" })).toBe("/about");
	});

	it("substitutes $paramName with param values", () => {
		expect(
			normalizeLocation({
				path: "/users/$userId",
				params: { userId: "42" },
			}),
		).toBe("/users/42");
	});

	it("substitutes multiple params", () => {
		expect(
			normalizeLocation({
				path: "/users/$userId/posts/$postId",
				params: { userId: "42", postId: "99" },
			}),
		).toBe("/users/42/posts/99");
	});

	it("encodes param values for URL safety", () => {
		expect(
			normalizeLocation({
				path: "/users/$userId",
				params: { userId: "hello world" },
			}),
		).toBe("/users/hello%20world");
	});

	it("appends search params as query string", () => {
		expect(
			normalizeLocation({
				path: "/search",
				search: { q: "test", page: 1 },
			}),
		).toBe("/search?q=test&page=1");
	});

	it("combines params and search", () => {
		expect(
			normalizeLocation({
				path: "/users/$userId",
				params: { userId: "42" },
				search: { tab: "settings" },
			}),
		).toBe("/users/42?tab=settings");
	});

	it("ignores empty search object", () => {
		expect(
			normalizeLocation({
				path: "/about",
				search: {},
			}),
		).toBe("/about");
	});

	it("appends hash fragment", () => {
		expect(
			normalizeLocation({
				path: "/docs",
				hash: "section-1",
			}),
		).toBe("/docs#section-1");
	});

	it("does not double-prefix hash with #", () => {
		expect(
			normalizeLocation({
				path: "/docs",
				hash: "#section-1",
			}),
		).toBe("/docs#section-1");
	});

	it("combines path, params, search, and hash", () => {
		expect(
			normalizeLocation({
				path: "/users/$userId",
				params: { userId: "42" },
				search: { tab: "settings" },
				hash: "bio",
			}),
		).toBe("/users/42?tab=settings#bio");
	});
});
