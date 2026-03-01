import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintAstro from "eslint-plugin-astro";
import jsxA11y from "eslint-plugin-jsx-a11y";
import eslintReact from "eslint-plugin-react";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
	{
		...eslintAstro.configs.recommended,
		files: ["**/*.astro"],
	},
	{
		files: ["**/*.{ts,tsx}"],
		extends: [
			eslint.configs.recommended,
			tseslint.configs.recommended,
			jsxA11y.flatConfigs.recommended,
		],
	},
	{
		files: ["**/*.{tsx}"],
		...eslintReact.configs.flat.recommended,
		...eslintReact.configs.flat["jsx-runtime"],
		languageOptions: {
			...eslintReact.configs.flat.recommended.languageOptions,
			globals: {
				...globals.serviceworker,
				...globals.browser,
			},
		},
	},
	eslintConfigPrettier,
	globalIgnores([
		"**/dist",
		"**/.netlify",
		"**/node_modules",
		"**/.idea",
		"**/playwright-report",
		"**/test-results",
		"**/static",
	]),
]);
