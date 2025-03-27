import db from "@astrojs/db";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { visualizer } from "rollup-plugin-visualizer";
import { EnumChangefreq } from "sitemap";
import netlify from "@astrojs/netlify";
import d2 from "astro-d2";

export default defineConfig({
	markdown: {
		shikiConfig: {
			theme: "github-dark-default",
		},
	},
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

				if (/blog/.test(item.url)) {
					item.changefreq = EnumChangefreq.WEEKLY;
					item.lastmod = new Date().toDateString();
					item.priority = 0.8;
				}

				return item;
			},
		}),
		mdx(),
		react(),
		db(),
		d2({
			layout: "elk",
			sketch: true,
			pad: 50,
		}),
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
	adapter: netlify({
		edgeMiddleware: true,
	}),
	redirects: {
		"/en/*": "/",
		"/en": "/",
		"/de/*": "/",
		"/de": "/",
	},
});
