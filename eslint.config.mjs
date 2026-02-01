import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintAstro from "eslint-plugin-astro";
import jsxA11y from "eslint-plugin-jsx-a11y";
import eslintReact from "eslint-plugin-react";
import globals from "globals";

export default [
	...eslintAstro.configs.recommended,
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
	jsxA11y.flatConfigs.recommended,
	eslintConfigPrettier,
];
