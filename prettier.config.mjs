/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
	trailingComma: "all",
	tabWidth: 4,
	bracketSameLine: true,
	useTabs: true,
	plugins: [
		"prettier-plugin-astro",
		"prettier-plugin-organize-imports",
		"prettier-plugin-tailwindcss",
	],
	overrides: [
		{
			files: ["**"],
			excludeFiles: [
				"**/dist",
				"**/.astro",
				"**/.netlify",
				"**/node_modules",
				"**/.idea",
				"**/playwright-report",
				"**/test-results",
				"**/static",
			],
		},
		{
			files: "*.astro",
			options: {
				parser: "astro",
			},
		},
	],
	tailwindStylesheet: "src/styles.css",
	tailwindFunctions: ["clsx", "twMerge"],
};
