import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintPluginAstro from "eslint-plugin-astro";
import jsxA11y from "eslint-plugin-jsx-a11y";
import eslintReact from "eslint-plugin-react";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
	eslint.configs.recommended,
	tseslint.configs.recommended,
	eslintPluginAstro.configs.recommended,
	{
		files: ["**/*.{ts,tsx}"],
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
	jsxA11y.flatConfigs.recommended,
	eslintConfigPrettier,
	globalIgnores([
		"**/dist",
		"**/.astro",
		"**/.netlify",
		"**/node_modules",
		"**/.idea",
		"**/playwright-report",
		"**/test-results",
		"**/static",
		"**/*.json"
	]),
]);
