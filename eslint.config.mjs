import eslintAstro from "eslint-plugin-astro";
import eslintReact from "eslint-plugin-react";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier/flat";

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
    eslintConfigPrettier,
];
