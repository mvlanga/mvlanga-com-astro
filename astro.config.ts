import db from "@astrojs/db";
import mdx from "@astrojs/mdx";
import netlify from "@astrojs/netlify";
import sitemap, { ChangeFreqEnum } from "@astrojs/sitemap";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { visualizer } from "rollup-plugin-visualizer";

const isE2E = process.env.E2E === "true";

export default defineConfig({
	output: "server",
	prefetch: {
		prefetchAll: true,
	},
	devToolbar: {
		enabled: !isE2E,
	},
	markdown: {
		shikiConfig: {
			themes: {
				light: "github-light-high-contrast",
			},
		},
	},
	site: "https://mvlanga.com",
	integrations: [
		sitemap({
			serialize(item) {
				if (item.url === "https://mvlanga.com/") {
					item.changefreq = ChangeFreqEnum.MONTHLY;
					item.lastmod = new Date().toISOString();
					item.priority = 1;
				}

				if (/legal/.test(item.url)) {
					item.changefreq = ChangeFreqEnum.YEARLY;
					item.lastmod = new Date().toISOString();
					item.priority = 0.2;
				}

				if (/blog/.test(item.url)) {
					item.changefreq = ChangeFreqEnum.MONTHLY;
					item.lastmod = new Date().toISOString();
					item.priority = 0.8;
				}

				return item;
			},
		}),
		mdx(),
		db(),
		vue(),
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
	adapter: netlify(),
	redirects: {
		"/:lang/personal-projects": "/",
		"/:lang/about-me": "/#about",
		"/assets/resume/*": "/moriz-von-langa_resume.pdf",

		"/:lang/legal/:slug": "/legal/:slug",

		"/en": "/",
		"/de": "/",

		"/blog/how-to-build-a-page-view-counter-with-astro-db-and-server-side-islands":
			"/blog/how-to-build-a-page-view-counter-with-astro-db-actions-and-server-side-islands",
	},
});
