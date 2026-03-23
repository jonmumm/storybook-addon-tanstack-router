import { describe, expect, it } from "vitest";
import { tanstackRouterParameters } from "./parameters.js";

describe("tanstackRouterParameters", () => {
  it("returns the config as-is (identity function for type safety)", () => {
    const config = {
      location: {
        path: "/users/$userId",
        params: { userId: "42" },
        search: { tab: "settings" },
      },
      loader: { data: { user: { id: "42", name: "Alice" } } },
    };

    expect(tanstackRouterParameters(config)).toEqual(config);
  });

  it("accepts minimal config", () => {
    const config = {};
    expect(tanstackRouterParameters(config)).toEqual({});
  });

  it("accepts location-only config", () => {
    const config = { location: { path: "/about" } };
    expect(tanstackRouterParameters(config)).toEqual(config);
  });

  it("accepts loader-only config", () => {
    const config = { loader: { data: [1, 2, 3] } };
    expect(tanstackRouterParameters(config)).toEqual(config);
  });
});
