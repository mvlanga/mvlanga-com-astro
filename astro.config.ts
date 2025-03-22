import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { visualizer } from "rollup-plugin-visualizer";
import { EnumChangefreq } from "sitemap";

export default defineConfig({
	site: "https://mvlanga.com",
	integrations: [
		sitemap({
			serialize(item) {
				if (item.url === "https://mvlanga.com/") {
					item.changefreq = EnumChangefreq.MONTHLY;
					item.lastmod = new Date().toDateString();
					item.priority = 1;
				}

				if (/legal/.test(item.url)) {
					item.changefreq = EnumChangefreq.YEARLY;
					item.lastmod = new Date().toDateString();
					item.priority = 0.2;
				}

				if (/project/.test(item.url)) {
					item.changefreq = EnumChangefreq.DAILY;
					item.lastmod = new Date().toDateString();
					item.priority = 0.9;
				}

				return item;
			},
		}),
		mdx(),
		react(),
	],
	vite: {
		plugins: [
			tailwindcss(),
			visualizer({
				emitFile: true,
				filename: "stats.html",
			}),
		],
	},
});
