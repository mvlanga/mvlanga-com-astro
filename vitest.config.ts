import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [vue()],
	resolve: {
		tsconfigPaths: true,
	},
	test: {
		include: ["src/**/*.test.ts"],
		environment: "happy-dom",
		globals: true,
		mockReset: true,
	},
});
