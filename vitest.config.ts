import vue from "@vitejs/plugin-vue";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [vue(), tsconfigPaths()],
	test: {
		globals: true,
		include: ["src/**/*.test.ts"],
		environment: "happy-dom",
		setupFiles: ["@testing-library/jest-dom/vitest"],
	},
});
