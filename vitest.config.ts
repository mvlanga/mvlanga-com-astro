import vue from "@vitejs/plugin-vue";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [vue(), tsconfigPaths()],
	test: {
		include: ["src/**/*.test.ts"],
		environment: "happy-dom",
		globals: true,
		mockReset: true,
	},
});
