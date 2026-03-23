import { cleanup, render, screen } from "@testing-library/react";
import { useParams, useSearch } from "@tanstack/react-router";
import { afterEach, describe, expect, it } from "vitest";
import { PARAM_KEY } from "./constants.js";
import { withTanStackRouter } from "./decorator.js";
import type { TanStackRouterParameters } from "./types.js";

afterEach(cleanup);

function callDecorator(Story: () => React.JSX.Element, config?: TanStackRouterParameters) {
  const context = {
    parameters: config ? { [PARAM_KEY]: config } : {},
  } as Parameters<typeof withTanStackRouter>[1];

  const result = withTanStackRouter(Story, context);
  return render(<>{result}</>);
}

describe("withTanStackRouter", () => {
  it("renders a story with default router context (no config)", async () => {
    function Story() {
      return <div>Default Router</div>;
    }

    callDecorator(Story);
    expect(await screen.findByText("Default Router")).toBeTruthy();
  });

  it("provides route params to the story", async () => {
    function Story() {
      const params = useParams({ strict: false });
      return <div>User ID: {(params as Record<string, string>).userId}</div>;
    }

    callDecorator(Story, {
      location: {
        path: "/users/$userId",
        params: { userId: "42" },
      },
    });
    expect(await screen.findByText("User ID: 42")).toBeTruthy();
  });

  it("provides search params to the story", async () => {
    function Story() {
      const search = useSearch({ strict: false });
      return <div>Tab: {(search as Record<string, string>).tab}</div>;
    }

    callDecorator(Story, {
      location: {
        path: "/",
        search: { tab: "settings" },
      },
    });
    expect(await screen.findByText("Tab: settings")).toBeTruthy();
  });

  it("provides both params and search together", async () => {
    function Story() {
      const params = useParams({ strict: false });
      const search = useSearch({ strict: false });
      return (
        <div>
          User: {(params as Record<string, string>).userId}, Tab:{" "}
          {(search as Record<string, string>).tab}
        </div>
      );
    }

    callDecorator(Story, {
      location: {
        path: "/users/$userId",
        params: { userId: "42" },
        search: { tab: "settings" },
      },
    });
    expect(await screen.findByText("User: 42, Tab: settings")).toBeTruthy();
  });
});
