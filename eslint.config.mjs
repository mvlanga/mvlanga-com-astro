import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintPluginAstro from "eslint-plugin-astro";
import eslintPluginVue from "eslint-plugin-vue";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
	{
		files: ["**/*.{astro}"],
		extends: [eslintPluginAstro.configs.recommended],
	},
	{
		extends: [
			eslint.configs.recommended,
			...tseslint.configs.recommended,
			...eslintPluginVue.configs["flat/recommended"],
		],
		files: ["**/*.{ts,collections}"],
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			globals: globals.browser,
			parserOptions: {
				parser: tseslint.parser,
			},
		},
	},
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
		"**/*.json",
	]),
]);
