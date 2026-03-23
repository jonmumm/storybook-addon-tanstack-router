import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts", "src/preview.ts"],
	format: ["esm", "cjs"],
	dts: true,
	sourcemap: true,
	clean: true,
	external: ["react", "react-dom", "@tanstack/react-router", "@storybook/react", "storybook"],
});
