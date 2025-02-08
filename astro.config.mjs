// @ts-check

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	site: "https://mvlanga.com",
	integrations: [mdx(), react()],
	vite: {
		plugins: [tailwindcss()],
	},
});
